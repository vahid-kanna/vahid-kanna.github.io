import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCw, Calendar, ArrowRight, FileText, ArrowUpRight, Disc3, Mail } from 'lucide-react';
import {
  createDualStrapNodes,
  createDualStrapConstraints,
  stepDualStrapVerlet,
  catmullRomSpline,
  generateDeterministicContributions,
  DualStrapNode,
} from '../utils/portfolioLogic';
import { PROFILE_DATA } from '../utils/portfolioData';
import { playTactileClick, playLanyardWhoosh } from '../utils/soundEngine';

interface LanyardBadgeHeroProps {
  onOpenBooking: () => void;
  onOpenLlms: () => void;
  onOpenCmdPalette?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const STARBURST_POINTS =
  '67.0,8.7 69.6,9.3 72.1,10.9 74.3,13.3 76.2,16.5 77.7,20.0 79.0,23.5 80.1,26.7 81.1,29.4 82.2,31.4 83.6,32.6 85.3,32.9 87.6,32.6 90.3,31.7 93.5,30.5 97.1,29.3 100.8,28.3 104.4,27.9 107.7,28.0 110.5,29.0 112.6,30.7 113.8,33.0 114.0,35.9 113.5,39.2 112.2,42.7 110.5,46.1 108.5,49.3 106.6,52.1 105.1,54.6 104.3,56.7 104.2,58.5 105.1,60.1 106.7,61.6 109.2,63.2 112.1,65.0 115.2,67.0 118.3,69.3 120.9,71.9 122.9,74.6 123.9,77.3 123.8,80.0 122.7,82.4 120.6,84.4 117.7,86.0 114.2,87.2 110.5,87.9 106.7,88.4 103.3,88.7 100.5,89.1 98.3,89.7 96.9,90.8 96.1,92.5 96.0,94.7 96.3,97.6 96.7,101.0 97.1,104.7 97.2,108.5 96.8,112.2 95.9,115.4 94.4,117.9 92.3,119.5 89.7,120.1 86.8,119.8 83.7,118.5 80.7,116.5 77.7,114.0 75.1,111.4 72.7,108.9 70.6,106.9 68.7,105.6 67.0,105.2 65.3,105.6 63.4,106.9 61.3,108.9 58.9,111.4 56.3,114.0 53.3,116.5 50.3,118.5 47.2,119.8 44.3,120.1 41.7,119.5 39.6,117.9 38.1,115.4 37.2,112.2 36.8,108.5 36.9,104.7 37.3,101.0 37.7,97.6 38.0,94.7 37.9,92.5 37.1,90.8 35.7,89.7 33.5,89.1 30.7,88.7 27.3,88.4 23.5,87.9 19.8,87.2 16.3,86.0 13.4,84.4 11.3,82.4 10.2,80.0 10.1,77.3 11.1,74.6 13.1,71.9 15.7,69.3 18.8,67.0 21.9,65.0 24.8,63.2 27.3,61.6 28.9,60.1 29.8,58.5 29.7,56.7 28.9,54.6 27.4,52.1 25.5,49.3 23.5,46.1 21.8,42.7 20.5,39.2 20.0,35.9 20.2,33.0 21.4,30.7 23.5,29.0 26.3,28.0 29.6,27.9 33.2,28.3 36.9,29.3 40.5,30.5 43.7,31.7 46.4,32.6 48.7,32.9 50.4,32.6 51.8,31.4 52.9,29.4 53.9,26.7 55.0,23.5 56.3,20.0 57.8,16.5 59.7,13.3 61.9,10.9 64.4,9.3';

function parseHexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function shadeColor(hex: string, factor: number): string {
  const [r, g, b] = parseHexToRgb(hex);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `rgb(${clamp(r * factor)}, ${clamp(g * factor)}, ${clamp(b * factor)})`;
}

function drawRoundedRectPath(
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

interface StrapRenderOptions {
  width: number;
  twist: (u: number) => number;
  front: string;
  back: string;
  stitching: string;
  print: {
    text: string;
    color: string;
    font: string;
    scale: number;
  } | null;
}

function drawTwistedStrap(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
  opts: StrapRenderOptions
) {
  const n = pts.length;
  if (n < 2) return;

  const w = opts.width;
  const s = new Array<number>(n).fill(0);
  for (let i = 1; i < n; i++) {
    s[i] = s[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  const totalLen = s[n - 1] || 1;

  const tx = new Array<number>(n);
  const ty = new Array<number>(n);
  const nx = new Array<number>(n);
  const ny = new Array<number>(n);
  const c = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(n - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    tx[i] = dx / len;
    ty[i] = dy / len;
    nx[i] = -ty[i];
    ny[i] = tx[i];
    const u = s[i] / totalLen;
    c[i] = Math.cos(opts.twist(u));
  }

  ctx.save();
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const f0 = c[i];
    const f1 = c[i + 1];
    const w0 = (w / 2) * Math.max(0.12, Math.abs(f0));
    const w1 = (w / 2) * Math.max(0.12, Math.abs(f1));

    const x0L = p0.x + nx[i] * w0;
    const y0L = p0.y + ny[i] * w0;
    const x0R = p0.x - nx[i] * w0;
    const y0R = p0.y - ny[i] * w0;

    const x1L = p1.x + nx[i + 1] * w1;
    const y1L = p1.y + ny[i + 1] * w1;
    const x1R = p1.x - nx[i + 1] * w1;
    const y1R = p1.y - ny[i + 1] * w1;

    const midCos = (f0 + f1) * 0.5;
    const isFront = midCos >= 0;
    const baseHex = isFront ? opts.front : opts.back;
    const shade =
      (0.58 + 0.42 * Math.pow(Math.abs(midCos), 0.7)) *
      (1 + 0.08 * -(nx[i] + nx[i + 1]) * 0.5);
    const fillCol = shadeColor(baseHex, shade);

    ctx.fillStyle = fillCol;
    ctx.strokeStyle = fillCol;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(x0L, y0L);
    ctx.lineTo(x1L, y1L);
    ctx.lineTo(x1R, y1R);
    ctx.lineTo(x0R, y0R);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    ctx.moveTo(x0L, y0L);
    ctx.lineTo(x1L, y1L);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.moveTo(x0R, y0R);
    ctx.lineTo(x1R, y1R);
    ctx.stroke();
  }

  // Edge stitching
  ctx.strokeStyle = opts.stitching;
  ctx.lineWidth = 0.8;
  ctx.setLineDash([2.5, 3]);
  for (const dir of [-1, 1]) {
    ctx.beginPath();
    let penDown = false;
    for (let i = 0; i < n; i++) {
      const f = c[i];
      if (Math.abs(f) < 0.35) {
        penDown = false;
        continue;
      }
      const stitchOffset = Math.max(0, (w / 2) * Math.abs(f) - 2.5);
      const sx = pts[i].x + nx[i] * stitchOffset * dir;
      const sy = pts[i].y + ny[i] * stitchOffset * dir;
      if (penDown) {
        ctx.lineTo(sx, sy);
      } else {
        ctx.moveTo(sx, sy);
        penDown = true;
      }
    }
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Curved 3D foreshortened text printing along the lanyard straps
  if (opts.print && opts.print.text) {
    const label = opts.print.text;
    const sc = opts.print.scale || 1;
    const charStep = 7 * sc;
    ctx.fillStyle = opts.print.color;
    ctx.font = opts.print.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let charIdx = 0;
    for (let dist = 10 * sc; dist < totalLen - 8 * sc; dist += charStep) {
      let lo = 0;
      let hi = n - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (s[mid] <= dist) lo = mid;
        else hi = mid;
      }
      const segLen = s[hi] - s[lo] || 1;
      const frac = (dist - s[lo]) / segLen;
      const px = pts[lo].x + (pts[hi].x - pts[lo].x) * frac;
      const py = pts[lo].y + (pts[hi].y - pts[lo].y) * frac;
      const curTx = tx[lo] + (tx[hi] - tx[lo]) * frac;
      const curTy = ty[lo] + (ty[hi] - ty[lo]) * frac;
      const cosVal = c[lo] + (c[hi] - c[lo]) * frac;

      const ch = label[charIdx % label.length];
      charIdx++;

      if (Math.abs(cosVal) < 0.28) continue;

      let angle = Math.atan2(curTy, curTx);
      const isBackFace = cosVal < 0;
      if (Math.sin(angle) < 0) {
        angle += Math.PI;
      }

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.scale(Math.abs(cosVal), 1);
      ctx.globalAlpha =
        Math.min(1, (Math.abs(cosVal) - 0.25) * 1.6) * (isBackFace ? 0.35 : 0.9);
      if (isBackFace) {
        ctx.scale(-1, 1);
      }
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    }
  }

  ctx.restore();
}

function drawMetallicHardware(
  ctx: CanvasRenderingContext2D,
  nodes: DualStrapNode[],
  scale = 1
) {
  const n3 = nodes[3];
  const n7 = nodes[7];
  const n8 = nodes[8];
  const n9 = nodes[9];

  ctx.save();

  // 1. Metallic V-convergence clasp at node 3
  const claspAngle = Math.atan2(n7.y - n3.y, n7.x - n3.x) - Math.PI / 2;
  ctx.save();
  ctx.translate(n3.x, n3.y);
  ctx.rotate(claspAngle);
  const cw = 24 * scale;
  const ch = 10 * scale;
  const grad = ctx.createLinearGradient(-cw / 2, 0, cw / 2, 0);
  grad.addColorStop(0, '#2a2a2e');
  grad.addColorStop(0.22, '#d8d8de');
  grad.addColorStop(0.5, '#48484f');
  grad.addColorStop(0.78, '#b0b0b8');
  grad.addColorStop(1, '#1f1f22');
  ctx.fillStyle = grad;
  ctx.strokeStyle = 'rgba(0,0,0,0.65)';
  ctx.lineWidth = 1;
  drawRoundedRectPath(ctx, -cw / 2, -ch / 2, cw, ch, 2.5 * scale);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(-cw / 2 + 3 * scale, -1 * scale, cw - 6 * scale, 2 * scale);
  ctx.restore();

  // 2. Metallic O-ring at node 8
  ctx.save();
  ctx.strokeStyle = '#b8b8c0';
  ctx.lineWidth = 2.5 * scale;
  ctx.beginPath();
  ctx.arc(n8.x, n8.y + 2 * scale, 6.5 * scale, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1 * scale;
  ctx.beginPath();
  ctx.arc(n8.x, n8.y + 2 * scale, 6.5 * scale, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();
  ctx.restore();

  // 3. Lobster clip body between node 8 and node 9
  const clipAngle = Math.atan2(n9.y - n8.y, n9.x - n8.x) - Math.PI / 2;
  const midX = (n8.x + n9.x) * 0.5;
  const midY = (n8.y + n9.y) * 0.5;
  ctx.save();
  ctx.translate(midX, midY);
  ctx.rotate(clipAngle);
  const lw = 11 * scale;
  const lh = 18 * scale;
  const clipGrad = ctx.createLinearGradient(-lw / 2, 0, lw / 2, 0);
  clipGrad.addColorStop(0, '#2a2a2e');
  clipGrad.addColorStop(0.3, '#d4d4dc');
  clipGrad.addColorStop(0.6, '#52525a');
  clipGrad.addColorStop(1, '#1e1e22');
  ctx.fillStyle = clipGrad;
  ctx.strokeStyle = 'rgba(0,0,0,0.7)';
  ctx.lineWidth = 1;
  drawRoundedRectPath(ctx, -lw / 2, -lh / 2, lw, lh, 3 * scale);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1a1a1d';
  ctx.beginPath();
  ctx.arc(0, 0, 1.6 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

export const LanyardBadgeHero: React.FC<LanyardBadgeHeroProps> = ({
  onOpenBooking,
  onOpenLlms,
  onNavigateSection,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLElement | null>(null);
  const ropeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const flipRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const eyesRef = useRef<HTMLDivElement | null>(null);
  const mascotLayersRef = useRef<(SVGPolygonElement | null)[]>([]);

  const targetFlipDegRef = useRef(0);
  const currentFlipDegRef = useRef(0);

  const contribGrid = useMemo(() => generateDeterministicContributions(34, 7), []);

  const triggerFlip = () => {
    playTactileClick(1.12);
    setIsFlipped((prev) => {
      const next = !prev;
      targetFlipDegRef.current = next ? 180 : 0;
      return next;
    });

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('stipple-impulse', {
          detail: {
            x: rect.left + rect.width * 0.5,
            y: rect.top + rect.height * 0.5,
          },
        })
      );
    }
    window.dispatchEvent(new CustomEvent('lanyard-wake'));
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
    let cardW = 560;
    let cardH = 380;
    let K = 1;
    let anchorX = 0;
    let anchorY = 0;
    let cardTopY = 0;

    const measureLayout = () => {
      const rect = stage.getBoundingClientRect();
      stageW = rect.width || window.innerWidth;
      stageH = rect.height || window.innerHeight;
      canvas.width = stageW * dpr;
      canvas.height = stageH * dpr;
      canvas.style.width = `${stageW}px`;
      canvas.style.height = `${stageH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = stageW < 640;
      const topClearance = isMobile
        ? Math.max(40, stageH * 0.06)
        : Math.max(56, stageH * 0.08);

      if (isMobile) {
        const availW = Math.min(stageW - 28, 356);
        const maxH = Math.max(350, stageH - topClearance - 150);
        const scaleMobile = Math.min(1, availW / 340, maxH / 410);
        cardW = Math.round(340 * scaleMobile);
        cardH = Math.round(410 * scaleMobile);
        card.style.setProperty('--card-w', `${cardW}px`);
        card.style.setProperty('--card-h', `${cardH}px`);
        card.style.setProperty('--card-scale', `${scaleMobile}`);
      } else {
        const targetW = Math.max(540, stageW * 0.48 + 24);
        const maxByHeight = (stageH - topClearance + 24) / 0.96;
        cardW = Math.round(Math.max(320, Math.min(targetW, 680, maxByHeight)));
        cardH = Math.round(cardW * 0.65);
        card.style.setProperty('--card-w', `${cardW}px`);
        card.style.setProperty('--card-h', `${cardH}px`);
        card.style.setProperty('--card-scale', `${cardW / 560}`);
      }

      K = Math.max(0.62, Math.min(1, stageH / 820));
      anchorX = stageW / 2;
      anchorY = 12;
      cardTopY = Math.round(
        isMobile
          ? Math.max(168, (stageH - cardH) * 0.46)
          : Math.max(198, (stageH - cardH) * 0.50)
      );
    };

    measureLayout();

    let nodes = createDualStrapNodes(anchorX, anchorY, cardTopY, cardH, K);
    let constraints = createDualStrapConstraints(cardH, K);

    // Initial horizontal offset so the dual-strap lanyard swings and twists on first load
    nodes[10].x = anchorX + 52 * K;
    nodes[10].ox = anchorX + 52 * K;

    let isDraggingLocal = false;
    let grabOffsetX = 0;
    let grabOffsetY = 0;
    let pointerX = anchorX;
    let pointerY = cardTopY + cardH / 2;
    let downX = 0;
    let downY = 0;
    let downTime = 0;
    let smoothVx = 0;

    // Eye tracking & autonomous blink state
    let targetEyeX = 0;
    let targetEyeY = 0;
    let curEyeX = 0;
    let curEyeY = 0;
    let blinkScaleY = 1;
    let isBlinking = false;
    let nextBlinkTime = performance.now() + 1800 + Math.random() * 2000;

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

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(stage);
    window.addEventListener('resize', handleResize);

    const onStagePointerMove = (e: PointerEvent) => {
      const stageRect = stage.getBoundingClientRect();
      pointerX = e.clientX - stageRect.left;
      pointerY = e.clientY - stageRect.top;

      if (eyesEl) {
        const er = eyesEl.getBoundingClientRect();
        const ex = er.left + er.width / 2;
        const ey = er.top + er.height / 2;
        const dx = e.clientX - ex;
        const dy = e.clientY - ey;
        const dist = Math.hypot(dx, dy) || 1;
        const amp = Math.min(1, dist / 220);
        targetEyeX = (dx / dist) * 5 * amp;
        targetEyeY = (dy / dist) * 3.5 * amp;
      }
      wakeLoop();
    };

    const onCardPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button[data-badge-action="true"]')) {
        return;
      }
      isDraggingLocal = true;
      setIsDragging(true);
      card.setPointerCapture?.(e.pointerId);

      const stageRect = stage.getBoundingClientRect();
      pointerX = e.clientX - stageRect.left;
      pointerY = e.clientY - stageRect.top;
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

      const stageRect = stage.getBoundingClientRect();
      const upX = e.clientX - stageRect.left;
      const upY = e.clientY - stageRect.top;
      const dist = Math.hypot(upX - downX, upY - downY);
      const elapsed = performance.now() - downTime;

      if (dist < 8 && elapsed < 400) {
        triggerFlip();
        nodes[10].ox -= 7;
      } else if (dist >= 8) {
        playLanyardWhoosh();
      }
      wakeLoop();
    };

    window.addEventListener('pointermove', onStagePointerMove, { passive: true });
    window.addEventListener('pointerup', onWindowPointerUp);
    card.addEventListener('pointerdown', onCardPointerDown);

    let rafId = 0;
    let activeFrames = 0;
    let isRunning = false;

    const stepAndRender = (now: number) => {
      const scrollY = window.scrollY || 0;
      const effectiveAnchorY = anchorY - scrollY * 0.9;

      const { cardCenterX, cardCenterY, angleRad, vxCard } = stepDualStrapVerlet(
        nodes,
        constraints,
        {
          anchorX,
          anchorY: effectiveAnchorY,
          cardH,
          scale: K,
          dragState: isDraggingLocal
            ? {
                pointerX,
                pointerY,
                grabOffsetX,
                grabOffsetY,
              }
            : null,
        }
      );

      smoothVx = smoothVx * 0.82 + vxCard * 0.18;

      // Butter-smooth 60fps spring interpolation for flip angle
      const flipDiff = targetFlipDegRef.current - currentFlipDegRef.current;
      if (Math.abs(flipDiff) < 0.05) {
        currentFlipDegRef.current = targetFlipDegRef.current;
      } else {
        currentFlipDegRef.current += flipDiff * 0.2;
      }

      const velocityTiltDeg = Math.max(-32, Math.min(32, smoothVx * 4.2));
      const totalFlipDeg = currentFlipDegRef.current + velocityTiltDeg;

      const tx = cardCenterX - cardW / 2;
      const ty = cardCenterY - cardH / 2;

      card.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(
        2
      )}px, 0) rotate(${((angleRad * 180) / Math.PI).toFixed(3)}deg)`;

      flipEl.style.transform = `translate3d(0, 0, 0) rotateY(${totalFlipDeg.toFixed(2)}deg)`;

      if (glareEl) {
        const glarePos = 50 + velocityTiltDeg * 1.4 + Math.sin(angleRad) * 40;
        glareEl.style.backgroundPosition = `${glarePos.toFixed(1)}% 0`;
      }

      // Mascot 8-layer 3D extrusion parallax
      const extrudeX = 4 - velocityTiltDeg * 0.22;
      const layers = mascotLayersRef.current;
      const numLayers = layers.length;
      for (let i = 0; i < numLayers; i++) {
        const poly = layers[i];
        if (!poly) continue;
        const depthFrac = (numLayers - i) / numLayers;
        poly.setAttribute(
          'transform',
          `translate(${(extrudeX * depthFrac).toFixed(2)}, ${(7 * depthFrac).toFixed(2)})`
        );
      }

      // Eye tracking & autonomous blink
      if (eyesEl) {
        if (!isBlinking && now >= nextBlinkTime) {
          isBlinking = true;
          nextBlinkTime = now + 2600 + Math.random() * 2600;
        }
        if (isBlinking) {
          blinkScaleY += (0.08 - blinkScaleY) * 0.45;
          if (blinkScaleY < 0.14) {
            isBlinking = false;
          }
        } else {
          blinkScaleY += (1 - blinkScaleY) * 0.28;
        }
        curEyeX += (targetEyeX - curEyeX) * 0.18;
        curEyeY += (targetEyeY - curEyeY) * 0.18;
        eyesEl.style.transform = `translate3d(${curEyeX.toFixed(2)}px, ${curEyeY.toFixed(
          2
        )}px, 0) scaleY(${blinkScaleY.toFixed(3)})`;
      }

      // Render Dual-Strap V-Shaped Twisting Lanyard on 2D Canvas (lightweight 6-subdivision spline)
      ctx.clearRect(0, 0, stageW, stageH);

      const leftCurve = catmullRomSpline([nodes[0], nodes[1], nodes[2], nodes[3]], 6);
      const rightCurve = catmullRomSpline([nodes[4], nodes[5], nodes[6], nodes[3]], 6);
      const neckCurve = catmullRomSpline([nodes[3], nodes[7], nodes[8]], 6);

      const flipRad = (currentFlipDegRef.current * Math.PI) / 180;
      const swingTwist = angleRad * 2.2 + smoothVx * 0.1;

      const baseStrapOpts: StrapRenderOptions = {
        width: 20 * K,
        twist: (u: number) =>
          swingTwist * u +
          flipRad * 0.5 * u +
          Math.sin(now / 900 + u * 4) * 0.3,
        front: '#eeece6',
        back: '#cfcdc6',
        stitching: 'rgba(0,0,0,0.3)',
        print: {
          text: 'SHAIK VAHID BASHA · IIT MADRAS · SYNCPRO · RAILRAKSHA · ',
          color: 'rgba(18,18,18,0.88)',
          font: `500 ${Math.round(11 * K)}px var(--font-mono), monospace`,
          scale: K,
        },
      };

      const rightStrapOpts: StrapRenderOptions = {
        ...baseStrapOpts,
        twist: (u: number) =>
          swingTwist * u +
          flipRad * 0.5 * u +
          Math.sin(now / 900 + u * 4 + 2) * 0.3,
      };

      const neckStrapOpts: StrapRenderOptions = {
        ...baseStrapOpts,
        width: 13 * K,
        print: null,
        twist: (u: number) => swingTwist * u + flipRad * u,
      };

      drawTwistedStrap(ctx, leftCurve, baseStrapOpts);
      drawTwistedStrap(ctx, rightCurve, rightStrapOpts);
      drawTwistedStrap(ctx, neckCurve, neckStrapOpts);
      drawMetallicHardware(ctx, nodes, K);

      activeFrames++;
      const flipDelta = Math.abs(targetFlipDegRef.current - currentFlipDegRef.current);
      if (isDraggingLocal || flipDelta > 0.1 || activeFrames < 180) {
        rafId = window.requestAnimationFrame(stepAndRender);
      } else {
        isRunning = false;
      }
    };

    function wakeLoop() {
      activeFrames = 0;
      if (!isRunning) {
        isRunning = true;
        rafId = window.requestAnimationFrame(stepAndRender);
      }
    }

    const onScrollOrWake = () => wakeLoop();
    const onFlipCmd = () => {
      triggerFlip();
      nodes[10].ox -= 16;
      wakeLoop();
    };
    window.addEventListener('scroll', onScrollOrWake, { passive: true });
    window.addEventListener('lanyard-wake', onScrollOrWake);
    window.addEventListener('lanyard-flip-cmd', onFlipCmd);

    wakeLoop();

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onStagePointerMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      window.removeEventListener('scroll', onScrollOrWake);
      window.removeEventListener('lanyard-wake', onScrollOrWake);
      window.removeEventListener('lanyard-flip-cmd', onFlipCmd);
      card.removeEventListener('pointerdown', onCardPointerDown);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerFlip();
    }
  };

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-end pb-6"
    >
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="w-full h-full">
          <section ref={stageRef} className="badge-stage">
            <canvas ref={ropeCanvasRef} className="badge-rope" />

            <div
              ref={cardRef}
              role="button"
              tabIndex={0}
              aria-label="Interactive ID badge. Drag to swing, or press Enter or click to flip."
              aria-pressed={isFlipped}
              onKeyDown={handleKeyDown}
              className={`badge-card ${isDragging ? 'is-dragging' : ''}`}
            >
              <div className="badge-slot" />
              <div className="badge-ring" />
              <div className="badge-dots" />
              <div ref={glareRef} className="badge-glare" />

              <div className="badge-perspective">
                <div ref={flipRef} className="badge-flip">
                  {/* FRONT FACE — Tightened geometry & zero text overflow */}
                  <div
                    className="badge-face front p-5 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden"
                    style={{
                      pointerEvents: isFlipped ? 'none' : 'auto',
                    }}
                  >
                    {/* Top Row: Name + Institution + Role Line + Mascot */}
                    <div className="flex items-start justify-between gap-3 relative z-10 shrink-0">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] sm:text-xs text-white tracking-[0.12em] uppercase font-medium">
                            {PROFILE_DATA.name}
                          </span>
                          <span className="font-mono text-[10.5px] text-zinc-400 tracking-wider uppercase">
                            · {PROFILE_DATA.institution}
                          </span>
                        </div>
                        <div className="font-mono text-[10.5px] sm:text-xs text-zinc-400 mt-1 flex flex-wrap items-center gap-2">
                          <span>{PROFILE_DATA.roleLine}</span>
                        </div>
                      </div>

                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 pointer-events-none">
                        <svg
                          viewBox="0 0 134 134"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full overflow-visible"
                        >
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
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                              <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>
                          </defs>
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((layerIdx) => (
                            <polygon
                              key={layerIdx}
                              ref={(el) => {
                                mascotLayersRef.current[layerIdx] = el;
                              }}
                              points={STARBURST_POINTS}
                              fill="url(#mascot-edge)"
                              stroke="url(#mascot-edge)"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                              transform={`translate(${(
                                ((8 - layerIdx) / 8) *
                                4
                              ).toFixed(2)}, ${(((8 - layerIdx) / 8) * 7).toFixed(2)})`}
                            />
                          ))}
                          <polygon points={STARBURST_POINTS} fill="url(#mascot-top)" />
                          <ellipse cx="44.3" cy="40.3" rx="28" ry="16" fill="url(#mascot-glow)" />
                        </svg>
                        {/* Interactive Eyes with Autonomous Blink */}
                        <div
                          ref={eyesRef}
                          className="absolute top-[40%] left-[50%] pointer-events-none"
                        >
                          <div className="w-2 sm:w-2.5 h-5 sm:h-6 rounded-full bg-white absolute -top-2.5 sm:-top-3 -left-3 sm:-left-3.5 shadow-sm" />
                          <div className="w-2 sm:w-2.5 h-5 sm:h-6 rounded-full bg-white absolute -top-2.5 sm:-top-3 left-1.5 sm:left-2 shadow-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Center Headline & 2-Line Curated Bio */}
                    <div className="my-auto py-1 max-w-[92%] sm:max-w-[84%] relative z-10 min-h-0">
                      <h1 className="text-[17px] sm:text-[22px] md:text-[26px] font-normal tracking-[-0.03em] text-white leading-[1.15] [text-wrap:balance]">
                        {PROFILE_DATA.headlinePrefix}
                        <span className="badge-accent">{PROFILE_DATA.headlineAccent}</span>
                      </h1>
                      <p className="mt-2 sm:mt-2.5 text-[11.5px] sm:text-[12.5px] text-zinc-300 leading-[1.52] line-clamp-2">
                        {PROFILE_DATA.bio}
                      </p>
                    </div>

                    {/* Bottom Credentials & Flip Cue (with >= 16px bottom clearance from container p-5/p-6/p-7) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 relative z-10 shrink-0">
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] sm:text-[10.5px] text-zinc-200">
                        {PROFILE_DATA.chips.map((chip) => (
                          <span
                            key={chip}
                            className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/25 whitespace-nowrap"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="font-mono text-[10.5px] text-zinc-400 inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span>psst, flip me</span>
                        <RotateCw className="w-3 h-3 text-white/60" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE — Clean Heatmap, Quick Links & Status without vertical overflow */}
                  <div
                    className="badge-face back p-5 sm:p-6 md:p-7 flex flex-col justify-between text-white overflow-hidden"
                    style={{
                      pointerEvents: isFlipped ? 'auto' : 'none',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 relative z-10 shrink-0">
                      <div className="font-mono text-[10.5px] sm:text-[11px] text-zinc-200 tracking-[0.12em] uppercase">
                        GITHUB.COM/VAHID-KANNA · TELEMETRY
                      </div>
                      <div className="font-mono text-[10px] text-zinc-400 tracking-[0.06em] uppercase truncate">
                        IIT MADRAS (&apos;27) · CHENNAI
                      </div>
                    </div>

                    {/* GitHub Contribution Heatmap Grid */}
                    <div className="my-1 relative z-10 shrink-0">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 overflow-x-auto">
                        <div className="flex justify-between gap-[3px] min-w-[300px]">
                          {contribGrid.map((col, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-[3px]">
                              {col.map((level, dIdx) => (
                                <div
                                  key={dIdx}
                                  data-level={level}
                                  title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Level ${level} activity`}
                                  className="badge-contrib-cell w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[2px] transition-transform hover:scale-125"
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Real Ventures, Socials & Quick Actions */}
                    <div className="flex flex-col gap-2 relative z-10 min-h-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <a
                          href={PROFILE_DATA.socials.syncproLive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] text-emerald-200 bg-emerald-500/15 border border-emerald-300/30 hover:bg-emerald-500/25 transition-colors whitespace-nowrap"
                        >
                          <span>SyncPro.org</span>
                          <span className="opacity-70 text-[9px]">↗</span>
                        </a>
                        <a
                          href={PROFILE_DATA.socials.railrakshaLive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] text-cyan-200 bg-cyan-500/15 border border-cyan-300/30 hover:bg-cyan-500/25 transition-colors whitespace-nowrap"
                        >
                          <span>RailRaksha.tech</span>
                          <span className="opacity-70 text-[9px]">↗</span>
                        </a>
                        <a
                          href={PROFILE_DATA.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] text-white/90 bg-white/[0.06] border border-white/15 hover:bg-white/15 transition-colors whitespace-nowrap"
                        >
                          <span>GitHub @vahid-kanna</span>
                          <span className="opacity-60 text-[9px]">↗</span>
                        </a>
                        <a
                          href={PROFILE_DATA.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] text-white/90 bg-white/[0.06] border border-white/15 hover:bg-white/15 transition-colors whitespace-nowrap"
                        >
                          <span>LinkedIn</span>
                          <span className="opacity-60 text-[9px]">↗</span>
                        </a>
                        <a
                          href={PROFILE_DATA.resumePdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] text-purple-200 bg-purple-500/20 border border-purple-300/30 hover:bg-purple-500/30 transition-colors whitespace-nowrap"
                        >
                          <span>Resume PDF</span>
                          <span className="opacity-70 text-[9px]">↗</span>
                        </a>
                        <a
                          href={`mailto:${PROFILE_DATA.email}`}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[10.5px] text-white/90 bg-white/[0.06] border border-white/15 hover:bg-white/15 transition-colors whitespace-nowrap"
                        >
                          <Mail className="w-2.5 h-2.5 opacity-75" />
                          <span>Email</span>
                        </a>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-0.5">
                        <div className="grid grid-cols-2 sm:flex sm:flex-col gap-1 font-mono text-[11px] text-white/90">
                          <button
                            type="button"
                            data-badge-action="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking();
                            }}
                            className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors text-left cursor-pointer whitespace-nowrap"
                          >
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>book a strategy chat</span>
                          </button>
                          <button
                            type="button"
                            data-badge-action="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateSection('writing');
                            }}
                            className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors text-left cursor-pointer whitespace-nowrap"
                          >
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            <span>product &amp; quant dispatches</span>
                          </button>
                          <button
                            type="button"
                            data-badge-action="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLlms();
                            }}
                            className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors text-left cursor-pointer whitespace-nowrap"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span>llms.txt dossier</span>
                          </button>
                          <button
                            type="button"
                            data-badge-action="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateSection('about');
                            }}
                            className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors text-left cursor-pointer whitespace-nowrap"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                            <span>unsolicited views ↗</span>
                          </button>
                        </div>

                        {/* Status / Telemetry Monitor */}
                        <div className="hidden sm:flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/90 border border-white/15 max-w-[275px] w-full shadow-lg">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-cyan-500/30 border border-white/15 flex items-center justify-center shrink-0">
                            <Disc3 className="w-4 h-4 text-purple-200 animate-spin" style={{ animationDuration: '8s' }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-mono text-[9px] uppercase tracking-wider text-purple-300 truncate">
                              {PROFILE_DATA.currentlyPlaying.status}
                            </div>
                            <div className="text-[11px] font-medium text-white truncate mt-0.5">
                              {PROFILE_DATA.currentlyPlaying.track}
                            </div>
                            <div className="text-[9.5px] text-zinc-400 truncate">
                              {PROFILE_DATA.currentlyPlaying.album}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Footer */}
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/45 relative z-10 shrink-0">
                      <span>{PROFILE_DATA.name} · {PROFILE_DATA.institution}</span>
                      <span>click card to flip back ↺</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* hancore.dev-inspired Monospace Status Monitors + Scroll Cue */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 flex flex-col items-center gap-3">
        <div className="hidden md:grid grid-cols-4 gap-3 w-full border-t border-[var(--line)] pt-3 font-mono text-[10.5px] text-[var(--mut)] tabular-nums">
          {PROFILE_DATA.statusMonitors.map((mon) => (
            <div key={mon.label} className="flex items-center gap-2 truncate">
              <span className="text-[var(--fg)]/50 uppercase">{mon.label}</span>
              <span className="text-[var(--fg)]/85 truncate">{mon.value}</span>
            </div>
          ))}
        </div>

        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('work');
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg)]/85 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-[var(--mut)] hover:text-[var(--fg)] shadow-sm backdrop-blur-md transition-colors whitespace-nowrap"
        >
          <span>scroll. the badge will survive.</span>
          <span className="inline-block animate-bounce text-[10px]">↓</span>
        </a>
      </div>
    </section>
  );
};
