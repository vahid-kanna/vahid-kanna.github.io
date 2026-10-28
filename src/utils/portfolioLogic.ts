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
  category: 'product' | 'infrastructure' | 'quant' | 'ai-systems' | 'frontend';
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
  let seed = 202701; // Deterministic contribution seed
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

export interface SyncProSimulationInput {
  projectValueCr: number; // 10 to 200 Cr
  scheduleMonths: number; // 12 to 36 months
  weeklyDelayVariance: number; // 1 to 6 weeks
}

export interface SyncProSimulationOutput {
  dailyHoldingLossInr: number; // ₹34,000 to ₹1,50,000/day
  riskIndex: 'Low' | 'Elevated' | 'Critical';
  daysSaved: number;
  netCapitalSavedLakhs: number;
  netCapitalSavedCr: string;
}

export function calculateSyncProRisk(
  input: SyncProSimulationInput
): SyncProSimulationOutput {
  const valCr = Math.max(10, Math.min(200, input.projectValueCr));
  const months = Math.max(12, Math.min(36, input.scheduleMonths));
  const varianceWks = Math.max(1, Math.min(6, input.weeklyDelayVariance));

  // Scale daily holding loss between ₹34,000/day and ₹1,50,000/day based on capital intensity & schedule compression
  const intensity = (valCr - 10) / 190; // 0..1
  const compression = (36 - months) / 24; // 0..1
  const varianceFactor = (varianceWks - 1) / 5; // 0..1
  const blended = Math.min(
    1,
    Math.max(0, intensity * 0.68 + compression * 0.17 + varianceFactor * 0.15)
  );
  const dailyHoldingLossInr = Math.round((34000 + blended * (150000 - 34000)) / 500) * 500;

  // Risk index classification
  const riskScore = varianceWks * 14 + (valCr / months) * 2.5;
  let riskIndex: 'Low' | 'Elevated' | 'Critical' = 'Low';
  if (varianceWks >= 4 || riskScore >= 62) {
    riskIndex = 'Critical';
  } else if (varianceWks >= 2 || riskScore >= 36) {
    riskIndex = 'Elevated';
  }

  // Days saved via SyncPro AI delay forewarning & daily site-to-schedule reconciliation
  const daysSaved = Math.round(8 + varianceWks * 4.5 + (months / 12) * 2);

  // Total capital saved (holding loss + LD mitigation)
  const totalSavedInr = dailyHoldingLossInr * daysSaved * (1 + varianceWks * 0.08);
  const netCapitalSavedLakhs = Math.round((totalSavedInr / 100000) * 10) / 10;
  const netCapitalSavedCr = (totalSavedInr / 10000000).toFixed(2);

  return {
    dailyHoldingLossInr,
    riskIndex,
    daysSaved,
    netCapitalSavedLakhs,
    netCapitalSavedCr,
  };
}

export type VectorMode = 'approaching' | 'receding';

export interface RailRakshaVectorState {
  mode: VectorMode;
  trainSpeedKmh: number;
  distanceMeters: number;
  radialVelocityMs: number;
  dotProduct: number;
  warningTriggered: boolean;
  timeToImpactSec: number | null;
  statusLabel: string;
}

export function evaluateRailRakshaVector(
  mode: VectorMode,
  distanceMeters = 420,
  trainSpeedKmh = 130
): RailRakshaVectorState {
  const speedMs = +(trainSpeedKmh / 3.6).toFixed(1); // 130 km/h -> 36.1 m/s
  const dist = Math.max(40, Math.min(1200, distanceMeters));
  // Let r_vec be vector from crew to train, and v_vec be train velocity vector.
  // Approaching: v_vec points opposite to r_vec -> dot(r_hat, v_vec) < 0
  // Receding: v_vec points in same direction as r_vec -> dot(r_hat, v_vec) > 0
  const isApproaching = mode === 'approaching';
  const radialVelocityMs = isApproaching ? -speedMs : speedMs;
  const dotProduct = Math.round(dist * radialVelocityMs);
  const warningTriggered = dotProduct < 0;
  const timeToImpactSec = isApproaching ? +(dist / speedMs).toFixed(1) : null;

  return {
    mode,
    trainSpeedKmh,
    distanceMeters: dist,
    radialVelocityMs,
    dotProduct,
    warningTriggered,
    timeToImpactSec,
    statusLabel: warningTriggered
      ? 'WARNING TRIGGERED · APPROACHING 130 KM/H VECTOR'
      : 'FILTERED: 0 FALSE ALARM · RECEDING VECTOR SUPPRESSED',
  };
}

