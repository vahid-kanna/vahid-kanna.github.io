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
  calculateSyncProRisk,
  evaluateRailRakshaVector,
} from './portfolioLogic';
import { PROFILE_DATA, PROJECTS_DATA, ESSAYS_DATA } from './portfolioData';

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

  const leftCurve = catmullRomSpline([nodes[0], nodes[1], nodes[2], nodes[3]], 8);
  const rightCurve = catmullRomSpline([nodes[4], nodes[5], nodes[6], nodes[3]], 8);
  assert.equal(leftCurve.length, 25);
  assert.equal(rightCurve.length, 25);
});

test('Authentic profile and venture links match Shaik Vahid Basha specifications', () => {
  assert.equal(PROFILE_DATA.name, 'Shaik Vahid Basha');
  assert.equal(PROFILE_DATA.shortName, 'Vahid Basha');
  assert.equal(PROFILE_DATA.institution, "IIT Madras ('27)");
  assert.equal(PROFILE_DATA.roleLine, 'Product Lead & Systems Builder');
  assert.deepEqual(PROFILE_DATA.chips, [
    "IIT Madras ('27)",
    'Co-founder @ SyncPro',
    'Creator @ RailRaksha',
  ]);
  assert.equal(PROFILE_DATA.email, 'vahidbashaunique@gmail.com');
  assert.equal(PROFILE_DATA.socials.github, 'https://github.com/vahid-kanna');
  assert.equal(PROFILE_DATA.socials.railrakshaLive, 'https://railraksha.tech');
  assert.equal(PROFILE_DATA.socials.syncproLive, 'https://syncpro.org');

  const syncpro = PROJECTS_DATA.find((p) => p.id === 'syncpro');
  const railraksha = PROJECTS_DATA.find((p) => p.id === 'railraksha');
  assert.ok(syncpro);
  assert.ok(railraksha);
  assert.equal(syncpro.liveUrl, 'https://syncpro.org');
  assert.equal(railraksha.liveUrl, 'https://railraksha.tech');
  assert.equal(railraksha.codeUrl, 'https://github.com/vahid-kanna/RailRaksha');
});

test('Project category filtering returns expected subsets', () => {
  const all = filterProjectsByCategory(PROJECTS_DATA, 'all');
  assert.equal(all.length, PROJECTS_DATA.length);

  const frontendOnly = filterProjectsByCategory(PROJECTS_DATA, 'frontend');
  assert.ok(frontendOnly.length >= 2);
  assert.ok(frontendOnly.some((p) => p.id === 'railraksha'));

  const productOnly = filterProjectsByCategory(PROJECTS_DATA, 'product');
  assert.ok(productOnly.some((p) => p.id === 'syncpro'));
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

test('SyncPro Delay & Loss Simulator bounds daily holding loss between ₹34,000 and ₹1,50,000', () => {
  const minCase = calculateSyncProRisk({
    projectValueCr: 10,
    scheduleMonths: 36,
    weeklyDelayVariance: 1,
  });
  assert.equal(minCase.dailyHoldingLossInr, 34000);
  assert.equal(minCase.riskIndex, 'Low');

  const defaultCase = calculateSyncProRisk({
    projectValueCr: 45,
    scheduleMonths: 18,
    weeklyDelayVariance: 2,
  });
  assert.ok(defaultCase.dailyHoldingLossInr >= 34000 && defaultCase.dailyHoldingLossInr <= 150000);
  assert.equal(defaultCase.riskIndex, 'Elevated');
  assert.ok(defaultCase.daysSaved >= 14);

  const maxCase = calculateSyncProRisk({
    projectValueCr: 200,
    scheduleMonths: 12,
    weeklyDelayVariance: 6,
  });
  assert.equal(maxCase.dailyHoldingLossInr, 150000);
  assert.equal(maxCase.riskIndex, 'Critical');
});

test('RailRaksha Receding Vector Geometry triggers on approaching and suppresses receding trains', () => {
  const approaching = evaluateRailRakshaVector('approaching', 450, 130);
  assert.equal(approaching.warningTriggered, true);
  assert.ok(approaching.dotProduct < 0);
  assert.ok(approaching.timeToImpactSec !== null && approaching.timeToImpactSec > 0);

  const receding = evaluateRailRakshaVector('receding', 450, 130);
  assert.equal(receding.warningTriggered, false);
  assert.ok(receding.dotProduct > 0);
  assert.equal(receding.timeToImpactSec, null);
});

test('Recruiter-grade privacy sanitization: zero PII or banned strings in portfolio data', () => {
  const combinedPayload = JSON.stringify({
    PROFILE_DATA,
    PROJECTS_DATA,
    ESSAYS_DATA,
  });
  const banned = [
    'CE23B115',
    'Godavari',
    'Ulavapadu',
    'Singarayakonda',
    'Andhra Pradesh',
    'Civil Engineering',
  ];
  for (const term of banned) {
    assert.equal(
      combinedPayload.toLowerCase().includes(term.toLowerCase()),
      false,
      `Expected banned term "${term}" to be absent from portfolio data`
    );
  }
});


