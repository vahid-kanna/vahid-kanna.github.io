export interface DualStrapNode {
  x: number;
  y: number;
  ox: number;
  oy: number;
  pinned: boolean;
}

export type DualStrapConstraint = [
  indexA: number,
  indexB: number,
  restLength: number,
  minDistanceOnly?: boolean,
];

export function createDualStrapNodes(
  anchorX: number,
  anchorY: number,
  cardTopY: number,
  cardH: number,
  scale = 1
): DualStrapNode[] {
  const s = scale;
  const raw: [number, number, boolean][] = [
    [anchorX - 36 * s, anchorY, true],
    [anchorX - 24 * s, anchorY + 34 * s, false],
    [anchorX - 12 * s, anchorY + 68 * s, false],
    [anchorX, anchorY + 102 * s, false],
    [anchorX + 36 * s, anchorY, true],
    [anchorX + 24 * s, anchorY + 34 * s, false],
    [anchorX + 12 * s, anchorY + 68 * s, false],
    [anchorX, cardTopY - 48 * s, false],
    [anchorX, cardTopY - 24 * s, false],
    [anchorX, cardTopY, false],
    [anchorX, cardTopY + cardH, false],
  ];
  return raw.map(([x, y, pinned]) => ({ x, y, ox: x, oy: y, pinned }));
}

export function createDualStrapConstraints(cardH: number, scale = 1): DualStrapConstraint[] {
  const s = scale;
  return [
    [0, 1, 35 * s, false],
    [1, 2, 35 * s, false],
    [2, 3, 35 * s, false],
    [4, 5, 35 * s, false],
    [5, 6, 35 * s, false],
    [6, 3, 35 * s, false],
    [3, 7, 24 * s, false],
    [7, 8, 24 * s, false],
    [8, 9, 24 * s, false],
    [9, 10, cardH, false],
    [8, 10, cardH + 12 * s, true],
  ];
}

function relaxDualStrapConstraints(
  nodes: DualStrapNode[],
  constraints: DualStrapConstraint[]
): void {
  for (let i = 0; i < constraints.length; i++) {
    const [idxA, idxB, restLen, minOnly] = constraints[i];
    const a = nodes[idxA];
    const b = nodes[idxB];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    if (minOnly && dist >= restLen) continue;
    const diff = (dist - restLen) / dist;
    if (a.pinned && b.pinned) continue;
    if (a.pinned) {
      b.x -= dx * diff;
      b.y -= dy * diff;
    } else if (b.pinned) {
      a.x += dx * diff;
      a.y += dy * diff;
    } else {
      const ox = dx * diff * 0.5;
      const oy = dy * diff * 0.5;
      a.x += ox;
      a.y += oy;
      b.x -= ox;
      b.y -= oy;
    }
  }
}

export interface DualStrapStepOptions {
  anchorX: number;
  anchorY: number;
  cardH: number;
  scale: number;
  damping?: number;
  gravity?: number;
  cardGravity?: number;
  dragState?: {
    pointerX: number;
    pointerY: number;
    grabOffsetX: number;
    grabOffsetY: number;
  } | null;
}

export function stepDualStrapVerlet(
  nodes: DualStrapNode[],
  constraints: DualStrapConstraint[],
  opts: DualStrapStepOptions
): {
  cardCenterX: number;
  cardCenterY: number;
  angleRad: number;
  vxCard: number;
  energy: number;
} {
  const {
    anchorX,
    anchorY,
    cardH,
    scale,
    damping = 0.982,
    gravity = 0.44,
    cardGravity = 0.58,
    dragState = null,
  } = opts;

  nodes[0].x = anchorX - 36 * scale;
  nodes[0].y = anchorY;
  nodes[4].x = anchorX + 36 * scale;
  nodes[4].y = anchorY;

  let energy = 0;
  for (let i = 0; i < nodes.length; i++) {
    const p = nodes[i];
    if (p.pinned) continue;
    const vx = (p.x - p.ox) * damping;
    const vy = (p.y - p.oy) * damping;
    energy += Math.abs(vx) + Math.abs(vy);
    p.ox = p.x;
    p.oy = p.y;
    const g = i === 10 ? cardGravity : gravity;
    p.x += vx;
    p.y += vy + g;
  }

  if (dragState) {
    const targetCx = dragState.pointerX - dragState.grabOffsetX;
    const targetCy = dragState.pointerY - dragState.grabOffsetY;
    nodes[9].x += (targetCx - nodes[9].x) * 0.42;
    nodes[9].y += (targetCy - cardH / 2 - nodes[9].y) * 0.42;
    nodes[10].x += (targetCx - nodes[10].x) * 0.42;
    nodes[10].y += (targetCy + cardH / 2 - nodes[10].y) * 0.42;
    energy += 10;
  }

  for (let iter = 0; iter < 12; iter++) {
    relaxDualStrapConstraints(nodes, constraints);
  }

  const topNode = nodes[9];
  const botNode = nodes[10];
  const cardCenterX = (topNode.x + botNode.x) * 0.5;
  const cardCenterY = (topNode.y + botNode.y) * 0.5;
  const angleRad = Math.atan2(botNode.y - topNode.y, botNode.x - topNode.x) - Math.PI / 2;
  const vxCard = (topNode.x - topNode.ox + (botNode.x - botNode.ox)) * 0.5;

  return { cardCenterX, cardCenterY, angleRad, vxCard, energy };
}

export function catmullRomSpline(
  points: { x: number; y: number }[],
  subdivisions = 6
): { x: number; y: number }[] {
  if (points.length < 2) return points;
  const out: { x: number; y: number }[] = [];
  const n = points.length;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];
    for (let j = 0; j < subdivisions; j++) {
      const t = j / subdivisions;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(points[n - 1]);
  return out;
}

export function generateBadgePattern(weeks = 32, days = 6): number[][] {
  let seed = 20260413;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const cols: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = rand();
      const wave = Math.sin(w * 0.35 + d * 0.45) * 0.25 + 0.5;
      const score = r * 0.72 + wave * 0.28;
      if (score < 0.34) col.push(0);
      else if (score < 0.56) col.push(1);
      else if (score < 0.74) col.push(2);
      else if (score < 0.88) col.push(3);
      else col.push(4);
    }
    cols.push(col);
  }
  return cols;
}
