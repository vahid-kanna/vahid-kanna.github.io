import React, { useEffect, useRef } from 'react';

interface ImpulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

export const StippleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupSize();

    const pointer = { x: -9999, y: -9999 };
    const impulses: ImpulseWave[] = [];
    let rafId = 0;
    let time = 0;

    const spacing = 28;
    const baseColor = '238, 236, 230';
    const accentColors = [
      '179, 166, 255',
      '213, 176, 245',
      '255, 179, 220',
      '166, 230, 242',
    ];

    let idleFrames = 0;
    let isLoopRunning = false;

    const drawFrame = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Update active radial shockwave impulses
      for (let i = impulses.length - 1; i >= 0; i--) {
        const imp = impulses[i];
        imp.radius += 14;
        imp.strength *= 0.94;
        if (imp.radius > imp.maxRadius || imp.strength < 0.02) {
          impulses.splice(i, 1);
        }
      }

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const origX = c * spacing + spacing * 0.5;
          const origY = r * spacing + spacing * 0.5;

          const wave =
            Math.sin(c * 0.32 + r * 0.24 + time) * 0.5 +
            Math.cos(c * 0.18 - r * 0.28 + time * 0.8) * 0.5;
          const normWave = (wave + 1) * 0.5;

          let radius = 1.15 + normWave * 0.4;
          let offsetX = 0;
          let offsetY = 0;
          // High-visibility dark mode stipple alpha (0.22 - 0.34)
          let alpha = 0.22 + normWave * 0.12;
          let colorStr = baseColor;

          // Pointer halo & magnetic displacement
          const dx = origX - pointer.x;
          const dy = origY - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 165 && dist > 1) {
            const factor = (1 - dist / 165) ** 2;
            offsetX += (dx / dist) * factor * 11;
            offsetY += (dy / dist) * factor * 11;
            radius += factor * 1.55;
            alpha = Math.min(0.85, alpha + factor * 0.52);
            colorStr = accentColors[(c + r) % accentColors.length];
          }

          // Shockwave impulse ripple from badge flip
          for (let i = 0; i < impulses.length; i++) {
            const imp = impulses[i];
            const idx = origX - imp.x;
            const idy = origY - imp.y;
            const idist = Math.hypot(idx, idy) || 1;
            const bandDist = Math.abs(idist - imp.radius);
            if (bandDist < 75) {
              const bandFactor = (1 - bandDist / 75) * imp.strength;
              offsetX += (idx / idist) * bandFactor * 9;
              offsetY += (idy / idist) * bandFactor * 9;
              radius += bandFactor * 1.3;
              alpha = Math.min(0.88, alpha + bandFactor * 0.48);
              colorStr = accentColors[(c * 3 + r) % accentColors.length];
            }
          }

          ctx.fillStyle = `rgba(${colorStr}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(origX + offsetX, origY + offsetY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const renderLoop = () => {
      drawFrame();
      idleFrames++;
      if (impulses.length > 0 || idleFrames < 60) {
        rafId = window.requestAnimationFrame(renderLoop);
      } else {
        isLoopRunning = false;
      }
    };

    const wakeUp = () => {
      idleFrames = 0;
      if (!isLoopRunning) {
        isLoopRunning = true;
        rafId = window.requestAnimationFrame(renderLoop);
      }
    };

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      wakeUp();
    };

    const onResize = () => {
      setupSize();
      wakeUp();
    };

    const onImpulse = (e: Event) => {
      const custom = e as CustomEvent<{ x: number; y: number }>;
      const x = custom.detail?.x ?? width * 0.5;
      const y = custom.detail?.y ?? height * 0.45;
      impulses.push({
        x,
        y,
        radius: 20,
        maxRadius: Math.max(width, height) * 0.75,
        strength: 1,
      });
      wakeUp();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', wakeUp, { passive: true });
    window.addEventListener('stipple-impulse', onImpulse);

    wakeUp();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', wakeUp);
      window.removeEventListener('stipple-impulse', onImpulse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};
