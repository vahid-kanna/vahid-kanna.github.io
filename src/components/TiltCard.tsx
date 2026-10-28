import React, { useEffect, useRef, useState } from 'react';

export type TiltPaletteType = 'blueprint' | 'editorial' | 'opinion';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
  palette?: TiltPaletteType;
}

const PALETTES: Record<TiltPaletteType, string[]> = {
  blueprint: [
    'rgba(179, 166, 255, 0.9)',
    'rgba(166, 230, 242, 0.9)',
    'rgba(213, 176, 245, 0.9)',
  ],
  opinion: [
    'rgba(255, 179, 220, 0.9)',
    'rgba(213, 176, 245, 0.9)',
    'rgba(179, 166, 255, 0.9)',
  ],
  editorial: [
    'rgba(213, 176, 245, 0.9)',
    'rgba(179, 166, 255, 0.9)',
    'rgba(166, 230, 242, 0.9)',
    'rgba(255, 179, 220, 0.9)',
  ],
};

interface OrbitParticle {
  angle: number;
  speed: number;
  baseRadius: number;
  radiusJitter: number;
  size: number;
  colorIdx: number;
  phase: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  intensity = 10,
  disabled = false,
  palette = 'blueprint',
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [transformStr, setTransformStr] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [isHovered, setIsHovered] = useState(false);

  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isRunning = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);

    const colors = PALETTES[palette] || PALETTES.blueprint;
    const particles: OrbitParticle[] = Array.from({ length: 42 }, (_, idx) => ({
      angle: (idx / 42) * Math.PI * 2,
      speed: (0.008 + Math.random() * 0.014) * (idx % 2 === 0 ? 1 : -1),
      baseRadius: 18 + Math.random() * 105,
      radiusJitter: Math.random() * 18,
      size: 1 + Math.random() * 1.4,
      colorIdx: idx % colors.length,
      phase: Math.random() * Math.PI * 2,
    }));

    let alpha = 0;

    const render = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      if (isHoveredRef.current) {
        alpha += (1 - alpha) * 0.08;
      } else {
        alpha += (0 - alpha) * 0.12;
      }

      if (alpha > 0.01) {
        const m = mousePosRef.current;
        m.x += (m.targetX - m.x) * 0.14;
        m.y += (m.targetY - m.y) * 0.14;

        const time = performance.now() * 0.002;
        ctx.save();

        const grad = ctx.createRadialGradient(m.x, m.y, 2, m.x, m.y, 130);
        grad.addColorStop(0, `rgba(179, 166, 255, ${(0.08 * alpha).toFixed(3)})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 130, 0, Math.PI * 2);
        ctx.fill();

        for (const p of particles) {
          p.angle += p.speed;
          const r = p.baseRadius + Math.sin(time + p.phase) * p.radiusJitter;
          const px = m.x + Math.cos(p.angle) * r;
          const py = m.y + Math.sin(p.angle) * r;
          const distFactor = Math.max(0, 1 - r / 140);
          ctx.globalAlpha =
            alpha * distFactor * (0.45 + 0.55 * Math.sin(time * 2 + p.phase));
          ctx.fillStyle = colors[p.colorIdx];
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (isHoveredRef.current || alpha > 0.01) {
        rafId = window.requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = window.requestAnimationFrame(render);
      }
    };

    const el = containerRef.current;
    el?.addEventListener('mouseenter', startLoop);

    return () => {
      ro.disconnect();
      el?.removeEventListener('mouseenter', startLoop);
      window.cancelAnimationFrame(rafId);
    };
  }, [disabled, palette]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    mousePosRef.current.targetX = rx;
    mousePosRef.current.targetY = ry;
    if (!isHovered) {
      mousePosRef.current.x = rx;
      mousePosRef.current.y = ry;
    }
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((ry - cy) / cy) * -intensity;
    const rotY = ((rx - cx) / cx) * intensity;
    setTransformStr(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2
      )}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e);
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    mousePosRef.current.x = rx;
    mousePosRef.current.y = ry;
    mousePosRef.current.targetX = rx;
    mousePosRef.current.targetY = ry;
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    if (disabled) return;
    setIsHovered(false);
    setTransformStr(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        transform: disabled ? undefined : transformStr,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: disabled ? undefined : 'transform',
      }}
      {...rest}
    >
      {!disabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-0"
          style={{ width: '100%', height: '100%' }}
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
