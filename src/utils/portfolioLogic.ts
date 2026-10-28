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
  minDistanceOnly?: boolean
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
  return raw.map(([x, y, pinned]) => ({
    x,
    y,
    ox: x,
    oy: y,
    pinned,
  }));
}

export function createDualStrapConstraints(
  cardH: number,
  scale = 1
): DualStrapConstraint[] {
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

export function relaxDualStrapConstraints(
  nodes: DualStrapNode[],
  constraints: DualStrapConstraint[]
): void {
  for (const [idxA, idxB, restLen, minOnly] of constraints) {
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
} {
  const {
    anchorX,
    anchorY,
    cardH,
    scale,
    damping = 0.985,
    gravity = 0.42,
    cardGravity = 0.55,
    dragState = null,
  } = opts;

  nodes[0].x = anchorX - 36 * scale;
  nodes[0].y = anchorY;
  nodes[4].x = anchorX + 36 * scale;
  nodes[4].y = anchorY;

  for (let i = 0; i < nodes.length; i++) {
    const p = nodes[i];
    if (p.pinned) continue;
    const vx = (p.x - p.ox) * damping;
    const vy = (p.y - p.oy) * damping;
    p.ox = p.x;
    p.oy = p.y;
    const g = i === 10 ? cardGravity : gravity;
    p.x += vx;
    p.y += vy + g;
  }

  if (dragState) {
    const targetCx = dragState.pointerX - dragState.grabOffsetX;
    const targetCy = dragState.pointerY - dragState.grabOffsetY;
    nodes[9].x += (targetCx - nodes[9].x) * 0.35;
    nodes[9].y += (targetCy - cardH / 2 - nodes[9].y) * 0.35;
    nodes[10].x += (targetCx - nodes[10].x) * 0.35;
    nodes[10].y += (targetCy + cardH / 2 - nodes[10].y) * 0.35;
  }

  for (let iter = 0; iter < 14; iter++) {
    relaxDualStrapConstraints(nodes, constraints);
  }

  const topNode = nodes[9];
  const botNode = nodes[10];
  const cardCenterX = (topNode.x + botNode.x) * 0.5;
  const cardCenterY = (topNode.y + botNode.y) * 0.5;
  const angleRad =
    Math.atan2(botNode.y - topNode.y, botNode.x - topNode.x) - Math.PI / 2;
  const vxCard =
    (topNode.x - topNode.ox + (botNode.x - botNode.ox)) * 0.5;

  return {
    cardCenterX,
    cardCenterY,
    angleRad,
    vxCard,
  };
}

export function catmullRomSpline(
  points: { x: number; y: number }[],
  subdivisions = 8
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
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      out.push({ x, y });
    }
  }
  out.push(points[n - 1]);
  return out;
}

export interface ProjectItem {
  id: string;
  slug: string;
  year: string;
  stars: number;
  featured: boolean;
  title: string;
  shortDesc: string;
  details: string;
  metrics: string[];
  tags: string[];
  codeUrl: string;
  liveUrl: string;
  category: 'frontend' | 'ai-systems' | 'product';
  architectureNotes: string[];
}

export interface EssayItem {
  id: string;
  slug: string;
  date: string;
  isoDate: string;
  readTime: string;
  tags: string[];
  title: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface TakeItem {
  id: string;
  quote: string;
  context: string;
  date: string;
  topic: string;
}

export function filterProjectsByCategory(projects: ProjectItem[], category: string): ProjectItem[] {
  if (!category || category === 'all') return projects;
  return projects.filter((p) => p.category === category || p.tags.some((t) => t.toLowerCase().includes(category.toLowerCase())));
}

export function filterEssaysByTag(essays: EssayItem[], tag: string): EssayItem[] {
  if (!tag || tag === 'all') return essays;
  const normalized = tag.replace(/^#/, '').toLowerCase();
  return essays.filter((e) =>
    e.tags.some((t) => t.replace(/^#/, '').toLowerCase() === normalized)
  );
}

export function generateDeterministicContributions(weeks = 34, daysPerWeek = 7): number[][] {
  const grid: number[][] = [];
  let seed = 23115; // CE23B115 deterministic seed
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      seed = (seed * 16807 + 13) % 2147483647;
      const r = (seed % 100) / 100;
      const recencyBoost = w > weeks * 0.5 ? 0.18 : 0;
      const val = r + recencyBoost;
      let level = 0;
      if (val > 0.92) level = 5;
      else if (val > 0.80) level = 4;
      else if (val > 0.65) level = 3;
      else if (val > 0.45) level = 2;
      else if (val > 0.28) level = 1;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}
