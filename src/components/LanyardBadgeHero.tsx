import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Mail, RotateCw } from 'lucide-react';
import { SITE } from '../data/site';
import {
  catmullRomSpline,
  createDualStrapConstraints,
  createDualStrapNodes,
  DualStrapNode,
  generateBadgePattern,
  stepDualStrapVerlet,
} from '../lib/lanyardPhysics';
import { playFlipSound, playTactileClick } from '../lib/soundEngine';

interface LanyardBadgeHeroProps {
  onNavigate: (path: string) => void;
  onOpenLlms: () => void;
}

const STARBURST_POINTS =
  '125.9,67.0 99.6,78.4 123.5,95.4 95.3,94.0 109.7,119.5 85.4,104.2 87.9,133.5 72.1,108.9 62.6,136.6 58.3,107.6 38.0,127.7 46.1,99.5 18.8,108.6 37.9,86.7 9.0,83.4 35.8,71.2 12.1,53.9 40.3,55.8 26.2,30.1 50.3,45.7 48.2,16.4 63.7,41.2 73.5,13.6 77.5,42.7 98.1,22.8 89.6,50.9 117.0,42.1 97.6,63.8';

function shadeHex(hex: string, factor: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, Math.round(((num >> 16) & 255) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((num >> 8) & 255) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((num & 255) * factor)));
  return `rgb(${r},${g},${b})`;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

interface StrapOptions {
  width: number;
  front: string;
  back: string;
  stitch: string;
  twist: (u: number) => number;
  print?: { text: string; color: string; scale: number };
}

function drawTwistedStrap(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
  opts: StrapOptions
) {
  const n = pts.length;
  if (n < 2) return;
  const w = opts.width;
  const s = new Float32Array(n);
  for (let i = 1; i < n; i++) {
    s[i] = s[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  const totalLen = s[n - 1] || 1;
  const tx = new Float32Array(n);
  const ty = new Float32Array(n);
  const nx = new Float32Array(n);
  const ny = new Float32Array(n);
  const c = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const prev = pts[i > 0 ? i - 1 : 0];
    const next = pts[i < n - 1 ? i + 1 : n - 1];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    tx[i] = dx / len;
    ty[i] = dy / len;
    nx[i] = -ty[i];
    ny[i] = tx[i];
    c[i] = Math.cos(opts.twist(s[i] / totalLen));
  }

  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const f0 = c[i];
    const f1 = c[i + 1];
    const w0 = (w / 2) * Math.max(0.12, Math.abs(f0));
    const w1 = (w / 2) * Math.max(0.12, Math.abs(f1));

    const midCos = (f0 + f1) * 0.5;
    const isFront = midCos >= 0;
    const shade = 0.72 + Math.abs(midCos) * 0.34 - (isFront ? 0 : 0.14);
    const fillCol = shadeHex(isFront ? opts.front : opts.back, shade);

    ctx.beginPath();
    ctx.moveTo(p0.x + nx[i] * w0, p0.y + ny[i] * w0);
    ctx.lineTo(p1.x + nx[i + 1] * w1, p1.y + ny[i + 1] * w1);
    ctx.lineTo(p1.x - nx[i + 1] * w1, p1.y - ny[i + 1] * w1);
    ctx.lineTo(p0.x - nx[i] * w0, p0.y - ny[i] * w0);
    ctx.closePath();
    ctx.fillStyle = fillCol;
    ctx.fill();
  }

  ctx.save();
  ctx.strokeStyle = opts.stitch;
  ctx.lineWidth = 0.8;
  ctx.setLineDash([2.5, 3]);
  for (const dir of [-1, 1]) {
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < n; i++) {
      const f = c[i];
      if (Math.abs(f) < 0.25) {
        started = false;
        continue;
      }
      const off = Math.max(0, (w / 2) * Math.abs(f) - 2.5);
      const sx = pts[i].x + nx[i] * off * dir;
      const sy = pts[i].y + ny[i] * off * dir;
      if (!started) {
        ctx.moveTo(sx, sy);
        started = true;
      } else {
        ctx.lineTo(sx, sy);
      }
    }
    ctx.stroke();
  }
  ctx.restore();

  if (opts.print && totalLen > 24) {
    const label = opts.print.text;
    const sc = opts.print.scale;
    const charStep = 7.2 * sc;
    ctx.save();
    ctx.font = `600 ${(8.4 * sc).toFixed(1)}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = opts.print.color;
    let charIdx = 0;
    for (let dist = 12; dist < totalLen - 12; dist += charStep) {
      let lo = 0;
      let hi = n - 1;
      while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1;
        if (s[mid] <= dist) lo = mid;
        else hi = mid;
      }
      const segLen = s[hi] - s[lo] || 1;
      const frac = (dist - s[lo]) / segLen;
      const px = pts[lo].x + (pts[hi].x - pts[lo].x) * frac;
      const py = pts[lo].y + (pts[hi].y - pts[lo].y) * frac;
      const cosVal = c[lo] + (c[hi] - c[lo]) * frac;
      const ch = label[charIdx % label.length];
      charIdx++;
      if (ch === ' ' || Math.abs(cosVal) < 0.3) continue;
      const angle = Math.atan2(
        ty[lo] + (ty[hi] - ty[lo]) * frac,
        tx[lo] + (tx[hi] - tx[lo]) * frac
      );
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      const isBack = cosVal < 0;
      ctx.scale(1, Math.max(0.25, Math.abs(cosVal)) * (isBack ? -1 : 1));
      ctx.globalAlpha = Math.min(1, (Math.abs(cosVal) - 0.25) * 1.5) * (isBack ? 0.32 : 0.85);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }
}

function drawMetallicHardware(
  ctx: CanvasRenderingContext2D,
  nodes: DualStrapNode[],
  scale: number
) {
  const n3 = nodes[3];
  const n7 = nodes[7];
  const n8 = nodes[8];
  const n9 = nodes[9];
  const claspAngle = Math.atan2(n7.y - n3.y, n7.x - n3.x) - Math.PI / 2;

  ctx.save();
  ctx.translate(n3.x, n3.y);
  ctx.rotate(claspAngle);
  const cw = 24 * scale;
  const ch = 10 * scale;
  const grad = ctx.createLinearGradient(-cw / 2, 0, cw / 2, 0);
  grad.addColorStop(0, '#5a5a63');
  grad.addColorStop(0.35, '#d9d9e0');
  grad.addColorStop(0.7, '#8d8d98');
  grad.addColorStop(1, '#4b4b53');
  drawRoundedRect(ctx, -cw / 2, -ch / 2, cw, ch, 3 * scale);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  const clipAngle = Math.atan2(n9.y - n8.y, n9.x - n8.x) - Math.PI / 2;
  ctx.save();
  ctx.translate((n8.x + n9.x) * 0.5, (n8.y + n9.y) * 0.5);
  ctx.rotate(clipAngle);
  const lw = 11 * scale;
  const lh = 18 * scale;
  const clipGrad = ctx.createLinearGradient(-lw / 2, 0, lw / 2, 0);
  clipGrad.addColorStop(0, '#62626c');
  clipGrad.addColorStop(0.5, '#e2e2e8');
  clipGrad.addColorStop(1, '#52525b');
  drawRoundedRect(ctx, -lw / 2, -lh / 2, lw, lh, 4 * scale);
  ctx.fillStyle = clipGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 0.9;
  ctx.stroke();
  ctx.restore();
}

export const LanyardBadgeHero: React.FC<LanyardBadgeHeroProps> = ({
  onNavigate,
  onOpenLlms,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const ropeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const flipRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const eyesRef = useRef<HTMLDivElement | null>(null);
  const mascotLayersRef = useRef<(SVGPolygonElement | null)[]>([]);

  const targetFlipDegRef = useRef(0);
  const currentFlipDegRef = useRef(0);
  const wakeRef = useRef<(() => void) | null>(null);

  const badgeGrid = useMemo(() => generateBadgePattern(30, 6), []);

  const triggerFlip = () => {
    playFlipSound();
    setIsFlipped((prev) => {
      const next = !prev;
      targetFlipDegRef.current = next ? 180 : 0;
      return next;
    });
    wakeRef.current?.();
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('stipple-impulse', {
          detail: { x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.5 },
        })
      );
    }
  };

  const handleCopyEmail = async () => {
    playTactileClick(1.05);
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = SITE.contactMailto;
    }
  };

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = ropeCanvasRef.current;
    const card = cardRef.current;
    const flipEl = flipRef.current;
    const glareEl = glareRef.current;
    const eyesEl = eyesRef.current;
    if (!stage || !canvas || !card || !flipEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stageW = 0;
    let stageH = 0;
    let stageLeft = 0;
    let stageTop = 0;
    let cardW = 560;
    let cardH = 364;
    let K = 1;
    let anchorX = 0;
    let anchorY = 0;
    let cardTopY = 0;
    let lastCardCx = 0;
    let lastCardCy = 0;

    const measureLayout = () => {
      const rect = stage.getBoundingClientRect();
      stageW = rect.width || window.innerWidth;
      stageH = rect.height || window.innerHeight;
      stageLeft = rect.left;
      stageTop = rect.top;

      canvas.width = Math.round(stageW * dpr);
      canvas.height = Math.round(stageH * dpr);
      canvas.style.width = `${stageW}px`;
      canvas.style.height = `${stageH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = stageW < 640;
      if (isMobile) {
        const availW = Math.min(stageW - 24, 360);
        const maxH = Math.max(330, Math.min(392, stageH - 255));
        const scaleMobile = Math.min(1, availW / 348);
        cardW = Math.round(availW);
        cardH = Math.round(maxH);
        card.style.setProperty('--card-w', `${cardW}px`);
        card.style.setProperty('--card-h', `${cardH}px`);
        card.style.setProperty('--card-scale', `${scaleMobile}`);
      } else {
        const targetW = Math.max(540, stageW * 0.46 + 20);
        const maxByHeight = (stageH - 255) / 0.65;
        cardW = Math.round(Math.max(460, Math.min(targetW, 650, maxByHeight)));
        cardH = Math.round(cardW * 0.62);
        card.style.setProperty('--card-w', `${cardW}px`);
        card.style.setProperty('--card-h', `${cardH}px`);
        card.style.setProperty('--card-scale', `${cardW / 560}`);
      }

      K = Math.max(0.6, Math.min(1, stageH / 840));
      anchorX = stageW / 2;
      anchorY = 12;
      cardTopY = Math.round(
        isMobile
          ? Math.max(122, (stageH - cardH - 135) * 0.56)
          : Math.max(152, (stageH - cardH - 130) * 0.52)
      );
      lastCardCx = anchorX;
      lastCardCy = cardTopY + cardH * 0.5;
    };

    measureLayout();

    const nodes = createDualStrapNodes(anchorX, anchorY, cardTopY, cardH, K);
    let constraints = createDualStrapConstraints(cardH, K);
    // Gentle initial sway on load
    nodes[10].x = anchorX + 38 * K;
    nodes[10].ox = anchorX + 38 * K;

    let isDraggingLocal = false;
    let grabOffsetX = 0;
    let grabOffsetY = 0;
    let pointerX = anchorX;
    let pointerY = cardTopY + cardH / 2;
    let downX = 0;
    let downY = 0;
    let downTime = 0;
    let smoothVx = 0;

    let targetEyeX = 0;
    let targetEyeY = 0;
    let curEyeX = 0;
    let curEyeY = 0;
    let blinkScaleY = 1;
    let isBlinking = false;
    let nextBlinkTime = performance.now() + 2000 + Math.random() * 2000;

    let rafId = 0;
    let activeFrames = 0;
    let isRunning = false;

    const wakeLoop = () => {
      activeFrames = 0;
      if (!isRunning) {
        isRunning = true;
        rafId = window.requestAnimationFrame(stepAndRender);
      }
    };
    wakeRef.current = wakeLoop;

    const handleResize = () => {
      const prevAnchorX = anchorX;
      measureLayout();
      const dx = anchorX - prevAnchorX;
      for (const p of nodes) {
        p.x += dx;
        p.ox += dx;
      }
      nodes[0].x = anchorX - 36 * K;
      nodes[0].y = anchorY;
      nodes[4].x = anchorX + 36 * K;
      nodes[4].y = anchorY;
      constraints = createDualStrapConstraints(cardH, K);
      wakeLoop();
    };

    const onStagePointerMove = (e: PointerEvent) => {
      // Pure arithmetic — zero getBoundingClientRect() calls during pointermove!
      const scrollY = window.scrollY || 0;
      pointerX = e.clientX - stageLeft;
      pointerY = e.clientY - (stageTop - scrollY);

      if (eyesEl) {
        const ex = stageLeft + lastCardCx + cardW * 0.34;
        const ey = stageTop - scrollY + lastCardCy - cardH * 0.27;
        const dx = e.clientX - ex;
        const dy = e.clientY - ey;
        const dist = Math.hypot(dx, dy) || 1;
        const amp = Math.min(1, dist / 220);
        targetEyeX = (dx / dist) * 4.5 * amp;
        targetEyeY = (dy / dist) * 3.2 * amp;
      }
      wakeLoop();
    };

    const onCardPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) return;
      isDraggingLocal = true;
      setIsDragging(true);
      card.setPointerCapture?.(e.pointerId);

      const scrollY = window.scrollY || 0;
      pointerX = e.clientX - stageLeft;
      pointerY = e.clientY - (stageTop - scrollY);
      downX = pointerX;
      downY = pointerY;
      downTime = performance.now();

      const cx = (nodes[9].x + nodes[10].x) * 0.5;
      const cy = (nodes[9].y + nodes[10].y) * 0.5;
      grabOffsetX = pointerX - cx;
      grabOffsetY = pointerY - cy;
      wakeLoop();
    };

    const onWindowPointerUp = (e: PointerEvent) => {
      if (!isDraggingLocal) return;
      isDraggingLocal = false;
      setIsDragging(false);
      const scrollY = window.scrollY || 0;
      const upX = e.clientX - stageLeft;
      const upY = e.clientY - (stageTop - scrollY);
      const dist = Math.hypot(upX - downX, upY - downY);
      const elapsed = performance.now() - downTime;
      if (dist < 8 && elapsed < 380) {
        triggerFlip();
        nodes[10].ox -= 6;
      }
      wakeLoop();
    };

    const stepAndRender = (now: number) => {
      const scrollY = window.scrollY || 0;
      const effectiveAnchorY = anchorY - scrollY * 0.85;

      const { cardCenterX, cardCenterY, angleRad, vxCard, energy } = stepDualStrapVerlet(
        nodes,
        constraints,
        {
          anchorX,
          anchorY: effectiveAnchorY,
          cardH,
          scale: K,
          dragState: isDraggingLocal
            ? { pointerX, pointerY, grabOffsetX, grabOffsetY }
            : null,
        }
      );

      lastCardCx = cardCenterX;
      lastCardCy = cardCenterY;
      smoothVx += (vxCard - smoothVx) * 0.2;

      const flipDiff = targetFlipDegRef.current - currentFlipDegRef.current;
      if (Math.abs(flipDiff) < 0.08) {
        currentFlipDegRef.current = targetFlipDegRef.current;
      } else {
        currentFlipDegRef.current += flipDiff * 0.22;
      }

      const velocityTiltDeg = Math.max(-28, Math.min(28, smoothVx * 3.8));
      const totalFlipDeg = currentFlipDegRef.current + velocityTiltDeg;

      const tx = cardCenterX - cardW / 2;
      const ty = cardCenterY - cardH / 2;
      card.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${angleRad.toFixed(4)}rad)`;
      flipEl.style.transform = `translate3d(0, 0, 0) rotateY(${totalFlipDeg.toFixed(2)}deg)`;

      if (glareEl) {
        const glarePos = 50 + velocityTiltDeg * 1.4 + Math.sin(angleRad) * 38;
        glareEl.style.backgroundPosition = `${glarePos.toFixed(1)}% 50%`;
      }

      const extrudeX = 4 - velocityTiltDeg * 0.2;
      const layers = mascotLayersRef.current;
      for (let i = 0; i < layers.length; i++) {
        const poly = layers[i];
        if (!poly) continue;
        const depthFrac = (layers.length - i) / layers.length;
        poly.setAttribute(
          'transform',
          `translate(${(depthFrac * extrudeX).toFixed(2)}, ${(depthFrac * 6.5).toFixed(2)})`
        );
      }

      if (eyesEl) {
        curEyeX += (targetEyeX - curEyeX) * 0.16;
        curEyeY += (targetEyeY - curEyeY) * 0.16;
        if (!isBlinking && now >= nextBlinkTime) isBlinking = true;
        if (isBlinking) {
          blinkScaleY -= 0.24;
          if (blinkScaleY <= 0.1) {
            blinkScaleY = 0.1;
            isBlinking = false;
            nextBlinkTime = now + 2600 + Math.random() * 2800;
          }
        } else if (blinkScaleY < 1) {
          blinkScaleY = Math.min(1, blinkScaleY + 0.2);
        }
        eyesEl.style.transform = `translate3d(${curEyeX.toFixed(1)}px, ${curEyeY.toFixed(1)}px, 0) scaleY(${blinkScaleY.toFixed(2)})`;
      }

      ctx.clearRect(0, 0, stageW, stageH);
      const leftCurve = catmullRomSpline([nodes[0], nodes[1], nodes[2], nodes[3]], 5);
      const rightCurve = catmullRomSpline([nodes[4], nodes[5], nodes[6], nodes[3]], 5);
      const neckCurve = catmullRomSpline([nodes[3], nodes[7], nodes[8]], 5);

      const flipRad = (currentFlipDegRef.current * Math.PI) / 180;
      const swingTwist = angleRad * 2.0 + smoothVx * 0.08;
      const printText = "SHAIK VAHID BASHA · IIT MADRAS '27 · SYNCPRO · RAILRAKSHA · ";

      drawTwistedStrap(ctx, leftCurve, {
        width: 19 * K,
        front: '#232327',
        back: '#17171a',
        stitch: 'rgba(255,255,255,0.16)',
        twist: (u) => flipRad * 0.45 * u + swingTwist * u + Math.sin(u * Math.PI) * 0.25,
        print: { text: printText, color: 'rgba(238,236,230,0.68)', scale: K },
      });

      drawTwistedStrap(ctx, rightCurve, {
        width: 19 * K,
        front: '#202024',
        back: '#151518',
        stitch: 'rgba(255,255,255,0.14)',
        twist: (u) => flipRad * 0.45 * u + swingTwist * u - Math.sin(u * Math.PI) * 0.25 + 0.12,
        print: { text: printText, color: 'rgba(238,236,230,0.58)', scale: K },
      });

      drawTwistedStrap(ctx, neckCurve, {
        width: 13 * K,
        front: '#1e1e22',
        back: '#141417',
        stitch: 'rgba(255,255,255,0.14)',
        twist: (u) => swingTwist * u + flipRad * u,
      });

      drawMetallicHardware(ctx, nodes, K);

      activeFrames++;
      const flipDelta = Math.abs(targetFlipDegRef.current - currentFlipDegRef.current);
      if (isDraggingLocal || flipDelta > 0.1 || energy > 0.12 || activeFrames < 110) {
        rafId = window.requestAnimationFrame(stepAndRender);
      } else {
        isRunning = false;
      }
    };

    const onScroll = () => wakeLoop();
    const onFlipCmd = () => triggerFlip();

    const ro = new ResizeObserver(handleResize);
    ro.observe(stage);
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', onStagePointerMove, { passive: true });
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('lanyard-flip-cmd', onFlipCmd);
    card.addEventListener('pointerdown', onCardPointerDown);

    wakeLoop();

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onStagePointerMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('lanyard-flip-cmd', onFlipCmd);
      card.removeEventListener('pointerdown', onCardPointerDown);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction and interactive ID badge"
      className="relative flex min-h-[100svh] w-full flex-col justify-end pb-6"
    >
      <div className="pointer-events-none absolute inset-0 z-20">
        <div ref={stageRef} className="badge-stage">
          <canvas ref={ropeCanvasRef} className="badge-rope" />

          {/* Non-button drag wrapper so inner controls never trigger nested-interactive axe errors */}
          <div ref={cardRef} className={`badge-card ${isDragging ? 'is-dragging' : ''}`}>
            <div className="badge-slot" />
            <div className="badge-ring" />
            <div className="badge-dots" />
            <div ref={glareRef} className="badge-glare" />

            <div className="badge-perspective">
              <div ref={flipRef} className="badge-flip">
                {/* FRONT FACE — Customized 100% to Vahid's real details, zero AI buzzwords */}
                <div
                  aria-hidden={isFlipped}
                  className="badge-face front flex flex-col justify-between overflow-hidden p-5 sm:p-6 md:p-7"
                  style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
                >
                  {/* Top identity + starburst mascot */}
                  <div className="relative z-10 flex shrink-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-mono-meta flex flex-col gap-0.5 text-[11px] tracking-[0.09em] text-white uppercase sm:flex-row sm:items-center sm:gap-2 sm:text-xs">
                        <span className="font-semibold">{SITE.name}</span>
                        <span className="hidden text-zinc-500 sm:inline" aria-hidden="true">·</span>
                        <span className="text-zinc-400">{SITE.affiliation}</span>
                      </div>
                      <p className="font-mono-meta mt-1 text-[11px] text-zinc-400">
                        {SITE.roleLine}
                        <span className="hidden sm:inline"> · {SITE.location}</span>
                      </p>
                    </div>

                    <div className="pointer-events-none relative h-14 w-14 shrink-0 sm:h-20 sm:w-20">
                      <svg viewBox="0 0 134 134" className="h-full w-full overflow-visible" aria-hidden="true">
                        <defs>
                          <linearGradient id="mascot-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4b2fd6" />
                            <stop offset="100%" stopColor="#b43bd0" />
                          </linearGradient>
                          <linearGradient id="mascot-top" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e2d8ff" />
                            <stop offset="50%" stopColor="#ff9ed6" />
                            <stop offset="100%" stopColor="#8fe3f5" />
                          </linearGradient>
                          <radialGradient id="mascot-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        {[0, 1, 2, 3, 4, 5, 6].map((layerIdx) => (
                          <polygon
                            key={layerIdx}
                            ref={(el) => {
                              mascotLayersRef.current[layerIdx] = el;
                            }}
                            points={STARBURST_POINTS}
                            fill="url(#mascot-edge)"
                            stroke="url(#mascot-edge)"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        ))}
                        <polygon points={STARBURST_POINTS} fill="url(#mascot-top)" />
                        <ellipse cx="44.3" cy="40.3" rx="28" ry="16" fill="url(#mascot-glow)" />
                      </svg>
                      <div ref={eyesRef} className="pointer-events-none absolute top-[40%] left-[50%]">
                        <div className="absolute -top-2.5 -left-3 h-4 w-2 rounded-full bg-white shadow-sm sm:h-5 sm:w-2.5" />
                        <div className="absolute -top-2.5 left-1.5 h-4 w-2 rounded-full bg-white shadow-sm sm:h-5 sm:w-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Center headline & crisp grounded bio */}
                  <div className="relative z-10 my-auto max-w-[94%] py-1 sm:max-w-[88%]">
                    <h1 className="text-[19px] leading-[1.16] font-normal tracking-[-0.03em] text-white [text-wrap:balance] sm:text-[24px] md:text-[27px]">
                      Hi, I’m Vahid. I turn messy operational workflows into{' '}
                      <span className="badge-accent">practical software.</span>
                    </h1>
                    <p className="mt-2.5 text-[12.5px] leading-[1.55] text-zinc-300 sm:text-[13.5px]">
                      Co-founder &amp; Business Lead at SyncPro (Nirmaan, IIT Madras) and creator of RailRaksha. Working across customer discovery, strategy, and applied AI.
                    </p>
                  </div>

                  {/* Bottom credentials + accessible flip button */}
                  <div className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                    <div className="font-mono-meta flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-200 sm:text-[10.5px]">
                      {['SyncPro', 'RailRaksha', 'Zamp AP', 'ZeroEka'].map((chip, idx) => (
                        <span
                          key={chip}
                          className={`rounded-full border border-white/20 bg-white/[0.04] px-2 py-0.5 whitespace-nowrap sm:px-2.5 ${
                            idx === 3 ? 'hidden sm:inline-block' : ''
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      tabIndex={isFlipped ? -1 : 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFlip();
                      }}
                      className="font-mono-meta ml-auto inline-flex min-h-[28px] cursor-pointer items-center gap-1.5 rounded-full px-2 text-[11px] text-zinc-300 hover:bg-white/10 hover:text-white"
                      aria-label="Flip ID badge to see links and details"
                    >
                      <span>flip</span>
                      <RotateCw className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* BACK FACE — Real links, honest currently-building card, zero fake booking modal */}
                <div
                  aria-hidden={!isFlipped}
                  className="badge-face back flex flex-col justify-between overflow-hidden p-5 text-white sm:p-6 md:p-7"
                  style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
                >
                  <div className="relative z-10 flex shrink-0 items-center justify-between gap-2">
                    <a
                      tabIndex={isFlipped ? 0 : -1}
                      href={SITE.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono-meta inline-flex min-h-[26px] items-center gap-1 text-[11px] tracking-[0.08em] text-zinc-200 uppercase hover:text-[var(--p0)]"
                    >
                      <span className="sm:hidden">@vahid-kanna</span>
                      <span className="hidden sm:inline">github.com/vahid-kanna</span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-400" aria-hidden="true" />
                    </a>
                    <span className="font-mono-meta text-[10.5px] whitespace-nowrap text-zinc-400 uppercase">
                      <span>{SITE.affiliation}</span>
                      <span className="hidden sm:inline"> · Chennai</span>
                    </span>
                  </div>

                  {/* Compact visual pattern strip */}
                  <div className="relative z-10 my-1 shrink-0 rounded-xl border border-white/10 bg-white/[0.025] p-2">
                    <div className="flex justify-between gap-[3px] overflow-hidden">
                      {badgeGrid.map((col, wIdx) => (
                        <div
                          key={wIdx}
                          className={`flex flex-col gap-[3px] ${wIdx >= 20 ? 'hidden sm:flex' : ''}`}
                        >
                          {col.map((level, dIdx) => (
                            <div
                              key={dIdx}
                              data-level={level}
                              className="badge-contrib-cell h-2 w-2 rounded-[2px] sm:h-2.5 sm:w-2.5"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real verified live links */}
                  <div className="relative z-10 flex flex-col gap-2.5">
                    <div className="font-mono-meta flex flex-wrap items-center gap-1.5 text-[10.5px]">
                      <a
                        tabIndex={isFlipped ? 0 : -1}
                        href={SITE.links.syncpro}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[26px] items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/12 px-2.5 text-emerald-200 hover:bg-emerald-500/22"
                      >
                        <span>syncpro.org</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a
                        tabIndex={isFlipped ? 0 : -1}
                        href={SITE.links.railraksha}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[26px] items-center gap-1 rounded-full border border-cyan-300/30 bg-cyan-500/12 px-2.5 text-cyan-200 hover:bg-cyan-500/22"
                      >
                        <span>railraksha.tech</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a
                        tabIndex={isFlipped ? 0 : -1}
                        href={SITE.links.zamp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[26px] items-center gap-1 rounded-full border border-purple-300/30 bg-purple-500/15 px-2.5 text-purple-200 hover:bg-purple-500/25"
                      >
                        <span>zamp.vahidbasha.me</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a
                        tabIndex={isFlipped ? 0 : -1}
                        href={SITE.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[26px] items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 text-white/90 hover:bg-white/15"
                      >
                        <span>LinkedIn</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <a
                        tabIndex={isFlipped ? 0 : -1}
                        href={SITE.contactMailto}
                        className="inline-flex min-h-[26px] items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 text-white/90 hover:bg-white/15"
                      >
                        <Mail className="h-3 w-3" aria-hidden="true" />
                        <span>Email</span>
                      </a>
                    </div>

                    <div className="flex flex-col justify-between gap-2.5 pt-0.5 sm:flex-row sm:items-center">
                      <div className="font-mono-meta grid grid-cols-2 gap-1 text-[11px] text-white/90 sm:flex sm:flex-col">
                        <a
                          tabIndex={isFlipped ? 0 : -1}
                          href="#work"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex min-h-[26px] items-center gap-1.5 hover:text-[var(--p0)]"
                        >
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>selected work</span>
                        </a>
                        <a
                          tabIndex={isFlipped ? 0 : -1}
                          href={SITE.resumeMailto}
                          className="inline-flex min-h-[26px] items-center gap-1.5 hover:text-[var(--p0)]"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>request resume</span>
                        </a>
                        <button
                          type="button"
                          tabIndex={isFlipped ? 0 : -1}
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenLlms();
                          }}
                          className="inline-flex min-h-[26px] cursor-pointer items-center gap-1.5 text-left hover:text-[var(--p0)]"
                        >
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>llms.txt profile</span>
                        </button>
                        <button
                          type="button"
                          tabIndex={isFlipped ? 0 : -1}
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('/about');
                          }}
                          className="inline-flex min-h-[26px] cursor-pointer items-center gap-1.5 text-left hover:text-[var(--p0)]"
                        >
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>about vahid</span>
                        </button>
                      </div>

                      {/* Honest status block replacing fake Spotify disc */}
                      <div className="hidden w-full max-w-[255px] rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 sm:block">
                        <div className="font-mono-meta text-[10px] tracking-wider text-[var(--p0)] uppercase">
                          Currently building
                        </div>
                        <div className="mt-0.5 text-[12px] font-medium text-white">
                          SyncPro · Nirmaan IITM
                        </div>
                        <div className="mt-0.5 text-[11px] text-zinc-400">
                          Shadow Schedule pilots &amp; GTM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back footer with explicit flip-back button */}
                  <div className="font-mono-meta relative z-10 flex shrink-0 items-center justify-between border-t border-white/10 pt-2 text-[10.5px] text-zinc-400">
                    <span>{SITE.name}</span>
                    <button
                      type="button"
                      tabIndex={isFlipped ? 0 : -1}
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFlip();
                      }}
                      className="inline-flex min-h-[26px] cursor-pointer items-center gap-1 rounded-full px-2 text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      <span>flip back ↺</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Hero Bottom Strip — Direct visible actions & factual coordinates without needing to flip */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1120px] flex-col items-center gap-3.5 px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              playTactileClick(1.0);
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[var(--fg)] px-4 text-[13.5px] font-semibold text-[var(--bg)] hover:bg-white"
          >
            <span>Explore selected work</span>
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href={SITE.resumeMailto}
            className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--line-strong)] bg-[var(--bg)]/85 px-4 text-[13.5px] font-medium text-[var(--fg)] backdrop-blur-xs hover:border-white/40 hover:bg-white/[0.06]"
          >
            Request resume
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="font-mono-meta inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg)]/85 px-3.5 text-[12px] text-[var(--fg-secondary)] backdrop-blur-xs hover:border-white/30 hover:text-white"
          >
            {copiedEmail ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                <span className="text-emerald-200">Copied {SITE.email}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[var(--mut)]" aria-hidden="true" />
                <span>{SITE.email}</span>
              </>
            )}
          </button>
        </div>

        <dl className="font-mono-meta hidden w-full grid-cols-4 gap-4 border-t border-[var(--line)] pt-3 text-[11px] md:grid">
          <div className="flex items-center gap-2 truncate">
            <dt className="text-[var(--mut)]">Based</dt>
            <dd className="truncate text-[var(--fg)]">IIT Madras ’27 · Chennai</dd>
          </div>
          <div className="flex items-center gap-2 truncate">
            <dt className="text-[var(--mut)]">Venture</dt>
            <dd className="truncate text-[var(--fg)]">SyncPro (Nirmaan)</dd>
          </div>
          <div className="flex items-center gap-2 truncate">
            <dt className="text-[var(--mut)]">Shipped</dt>
            <dd className="truncate text-[var(--fg)]">RailRaksha · Zamp AP</dd>
          </div>
          <div className="flex items-center gap-2 truncate">
            <dt className="text-[var(--mut)]">Focus</dt>
            <dd className="truncate text-[var(--fg)]">Product, Strategy &amp; Applied AI</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
