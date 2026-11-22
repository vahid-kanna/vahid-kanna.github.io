import React, { useEffect, useRef } from 'react';

interface ImpulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

const ACCENT_HEX = ['#b3a6ff', '#d5b0f5', '#ffb3dc', '#a6e6f2'];
const SPACING = 28;
const POINTER_RADIUS = 165;
const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;

export const StippleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    let count = 0;
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let phaseA = new Float32Array(0);
    let phaseB = new Float32Array(0);
    let accentIdx = new Uint8Array(0);

    const buildGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);
      count = cols * rows;
      xs = new Float32Array(count);
      ys = new Float32Array(count);
      phaseA = new Float32Array(count);
      phaseB = new Float32Array(count);
      accentIdx = new Uint8Array(count);

      let k = 0;
      for (let r = 0; r < rows; r++) {
        const py = r * SPACING + SPACING * 0.5;
        for (let c = 0; c < cols; c++) {
          xs[k] = c * SPACING + SPACING * 0.5;
          ys[k] = py;
          phaseA[k] = c * 0.32 + r * 0.24;
          phaseB[k] = c * 0.18 - r * 0.28;
          accentIdx[k] = (c + r) & 3;
          k++;
        }
      }
    };

    buildGrid();

    const pointer = { x: -9999, y: -9999 };
    const impulses: ImpulseWave[] = [];
    let rafId = 0;
    let time = 0;
    let idleFrames = 0;
    let isLoopRunning = false;

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(238, 236, 230, 0.24)';
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const x = xs[i];
        const y = ys[i];
        ctx.moveTo(x + 1.25, y);
        ctx.arc(x, y, 1.25, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    if (prefersReduced) {
      drawStatic();
      window.addEventListener('resize', () => {
        buildGrid();
        drawStatic();
      });
      return;
    }

    const drawFrame = () => {
      time += 0.022;
      ctx.clearRect(0, 0, width, height);

      for (let i = impulses.length - 1; i >= 0; i--) {
        const imp = impulses[i];
        imp.radius += 16;
        imp.strength *= 0.93;
        if (imp.radius > imp.maxRadius || imp.strength < 0.02) {
          impulses.splice(i, 1);
        }
      }

      const px = pointer.x;
      const py = pointer.y;
      const hasImpulses = impulses.length > 0;

      // Pass 1: single batched path for all calm ambient dots (zero string allocs, 1 fill call!)
      ctx.fillStyle = 'rgba(238, 236, 230, 0.26)';
      ctx.beginPath();

      // Store reactive dot indices for fast color-halo Pass 2
      const reactive: number[] = [];

      for (let i = 0; i < count; i++) {
        const ox = xs[i];
        const oy = ys[i];
        const dx = ox - px;
        const dy = oy - py;

        let isReactive =
          dx > -POINTER_RADIUS &&
          dx < POINTER_RADIUS &&
          dy > -POINTER_RADIUS &&
          dy < POINTER_RADIUS &&
          dx * dx + dy * dy < POINTER_RADIUS_SQ;

        if (!isReactive && hasImpulses) {
          for (let j = 0; j < impulses.length; j++) {
            const imp = impulses[j];
            const idist = Math.hypot(ox - imp.x, oy - imp.y);
            if (Math.abs(idist - imp.radius) < 75) {
              isReactive = true;
              break;
            }
          }
        }

        if (isReactive) {
          reactive.push(i);
          continue;
        }

        // Subtle calm dot radius variation without per-dot fillStyle swaps
        const r = 1.15 + (Math.sin(phaseA[i] + time) * 0.25 + 0.25);
        ctx.moveTo(ox + r, oy);
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
      }
      ctx.fill();

      // Pass 2: only the ~40–100 dots near cursor or shockwave get magnetic displacement + pastel halo
      for (let rIdx = 0; rIdx < reactive.length; rIdx++) {
        const i = reactive[rIdx];
        const ox = xs[i];
        const oy = ys[i];
        let offsetX = 0;
        let offsetY = 0;
        let radius = 1.3;
        let alpha = 0.28;
        let color = ACCENT_HEX[accentIdx[i]];

        const dx = ox - px;
        const dy = oy - py;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_RADIUS_SQ && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const factor = (1 - dist / POINTER_RADIUS) ** 2;
          offsetX += (dx / dist) * factor * 11;
          offsetY += (dy / dist) * factor * 11;
          radius += factor * 1.6;
          alpha = Math.min(0.88, alpha + factor * 0.56);
        }

        if (hasImpulses) {
          for (let j = 0; j < impulses.length; j++) {
            const imp = impulses[j];
            const ix = ox - imp.x;
            const iy = oy - imp.y;
            const idist = Math.hypot(ix, iy) || 1;
            const bandDist = Math.abs(idist - imp.radius);
            if (bandDist < 75) {
              const bandFactor = (1 - bandDist / 75) * imp.strength;
              offsetX += (ix / idist) * bandFactor * 9;
              offsetY += (iy / idist) * bandFactor * 9;
              radius += bandFactor * 1.35;
              alpha = Math.min(0.9, alpha + bandFactor * 0.5);
              color = ACCENT_HEX[(accentIdx[i] + 1) & 3];
            }
          }
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(ox + offsetX, oy + offsetY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const renderLoop = () => {
      drawFrame();
      idleFrames++;
      if (impulses.length > 0 || idleFrames < 40) {
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

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      wakeUp();
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      wakeUp();
    };

    const onResize = () => {
      buildGrid();
      wakeUp();
    };

    const onImpulse = (e: Event) => {
      const custom = e as CustomEvent<{ x: number; y: number }>;
      impulses.push({
        x: custom.detail?.x ?? width * 0.5,
        y: custom.detail?.y ?? height * 0.45,
        radius: 20,
        maxRadius: Math.max(width, height) * 0.72,
        strength: 1,
      });
      wakeUp();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('stipple-impulse', onImpulse);

    wakeUp();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
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
