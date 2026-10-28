import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDualStrapNodes,
  createDualStrapConstraints,
  stepDualStrapVerlet,
  catmullRomSpline,
  filterProjectsByCategory,
  filterEssaysByTag,
  generateDeterministicContributions,
} from './portfolioLogic';
import { PROJECTS_DATA, ESSAYS_DATA } from './portfolioData';

test('Dual-strap 11-node Verlet lanyard initializes V-anchors and relaxes constraints', () => {
  const anchorX = 720;
  const anchorY = 0;
  const cardTopY = 180;
  const cardH = 380;
  const scale = 1;

  const nodes = createDualStrapNodes(anchorX, anchorY, cardTopY, cardH, scale);
  const constraints = createDualStrapConstraints(cardH, scale);

  assert.equal(nodes.length, 11);
  assert.equal(nodes[0].pinned, true);
  assert.equal(nodes[4].pinned, true);
  assert.equal(nodes[0].x, anchorX - 36);
  assert.equal(nodes[4].x, anchorX + 36);
  assert.equal(nodes[3].x, anchorX);

  // Give initial swing to node 10 and step physics
  nodes[10].x += 50;
  const step1 = stepDualStrapVerlet(nodes, constraints, {
    anchorX,
    anchorY,
    cardH,
    scale,
  });

  assert.ok(Number.isFinite(step1.cardCenterX));
  assert.ok(Number.isFinite(step1.cardCenterY));
  assert.ok(Number.isFinite(step1.angleRad));

  // Verify Catmull-Rom spline smooths left and right straps
  const leftCurve = catmullRomSpline([nodes[0], nodes[1], nodes[2], nodes[3]], 8);
  const rightCurve = catmullRomSpline([nodes[4], nodes[5], nodes[6], nodes[3]], 8);
  assert.equal(leftCurve.length, 25);
  assert.equal(rightCurve.length, 25);
});

test('Project category filtering returns expected subsets', () => {
  const all = filterProjectsByCategory(PROJECTS_DATA, 'all');
  assert.equal(all.length, PROJECTS_DATA.length);

  const frontendOnly = filterProjectsByCategory(PROJECTS_DATA, 'frontend');
  assert.ok(frontendOnly.length >= 2);
  assert.ok(frontendOnly.some((p) => p.id === 'railraksha'));
});

test('Essay tag filtering handles hash prefixes cleanly', () => {
  const pwaEssays = filterEssaysByTag(ESSAYS_DATA, '#pwa');
  assert.equal(pwaEssays.length, 1);
  assert.equal(pwaEssays[0].id, 'essay-1');

  const allEssays = filterEssaysByTag(ESSAYS_DATA, 'all');
  assert.equal(allEssays.length, ESSAYS_DATA.length);
});

test('Deterministic contribution grid produces valid activity levels 0-5', () => {
  const grid = generateDeterministicContributions(34, 7);
  assert.equal(grid.length, 34);
  assert.equal(grid[0].length, 7);
  for (const col of grid) {
    for (const cell of col) {
      assert.ok(cell >= 0 && cell <= 5);
    }
  }
});
