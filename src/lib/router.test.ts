import { createDualStrapNodes, createDualStrapConstraints, stepDualStrapVerlet } from './lanyardPhysics';
import test from 'node:test';
import assert from 'node:assert/strict';
import { matchRoute, getRouteMeta } from './router';
import { CASE_STUDIES, LAB_ITEMS } from '../data/work';
import { FIELD_NOTES, countWords, estimateReadMinutes } from '../data/writing';
import { SITE, EXPERIENCE_LEDGER, ABOUT_CONTENT } from '../data/site';

test('routes match all valid pages and return not-found for unknown paths', () => {
  assert.deepEqual(matchRoute('/'), { name: 'home' });
  assert.deepEqual(matchRoute('/work/syncpro'), { name: 'case-study', slug: 'syncpro' });
  assert.deepEqual(matchRoute('/work/railraksha/'), { name: 'case-study', slug: 'railraksha' });
  assert.deepEqual(matchRoute('/work/zamp-ap'), { name: 'case-study', slug: 'zamp-ap' });
  assert.deepEqual(matchRoute('/work/zeroeka'), { name: 'case-study', slug: 'zeroeka' });
  assert.deepEqual(matchRoute('/lab'), { name: 'lab' });
  assert.deepEqual(matchRoute('/writing'), { name: 'writing' });
  assert.deepEqual(matchRoute('/writing/shadow-schedule-trust'), {
    name: 'article',
    slug: 'shadow-schedule-trust',
  });
  assert.deepEqual(matchRoute('/about'), { name: 'about' });
  assert.equal(matchRoute('/does-not-exist').name, 'not-found');
  assert.equal(matchRoute('/work/unknown').name, 'not-found');
});

test('every route produces unique titles and canonical URLs', () => {
  const routes = [
    matchRoute('/'),
    ...CASE_STUDIES.map((c) => matchRoute(`/work/${c.slug}`)),
    matchRoute('/lab'),
    matchRoute('/writing'),
    ...FIELD_NOTES.map((n) => matchRoute(`/writing/${n.slug}`)),
    matchRoute('/about'),
  ];
  const titles = new Set(routes.map((r) => getRouteMeta(r).title));
  const canonicals = new Set(routes.map((r) => getRouteMeta(r).canonical));
  assert.equal(titles.size, routes.length);
  assert.equal(canonicals.size, routes.length);
});

test('field notes have substantive word counts and accurate reading times', () => {
  for (const note of FIELD_NOTES) {
    const words = countWords(note.paragraphs);
    const mins = estimateReadMinutes(note.paragraphs);
    assert.ok(words >= 280, `${note.slug} should have >= 280 words, got ${words}`);
    assert.ok(mins >= 2 && mins <= 5, `${note.slug} read time should match text (${mins} min)`);
  }
});

test('editorial exclusions are strictly absent from all data modules', () => {
  const corpus = JSON.stringify({
    SITE,
    EXPERIENCE_LEDGER,
    ABOUT_CONTENT,
    CASE_STUDIES,
    LAB_ITEMS,
    FIELD_NOTES,
  });

  const forbidden = [
    /civil\s+engineering/i,
    /\bupsc\b/i,
    /civil\s+services/i,
    /\bcea\b/i,
    /autocad/i,
    /10x\s+force/i,
    /sys\.portfolio/i,
    /book a strategy chat/i,
  ];

  for (const rx of forbidden) {
    assert.equal(rx.test(corpus), false, `Forbidden pattern matched in data corpus: ${rx}`);
  }
});

test('lanyard Verlet physics settles cleanly without NaN', () => {
  const nodes = createDualStrapNodes(720, 12, 180, 360, 1);
  const constraints = createDualStrapConstraints(360, 1);
  nodes[10].x += 40;
  let last = stepDualStrapVerlet(nodes, constraints, { anchorX: 720, anchorY: 12, cardH: 360, scale: 1 });
  for (let i = 0; i < 60; i++) {
    last = stepDualStrapVerlet(nodes, constraints, { anchorX: 720, anchorY: 12, cardH: 360, scale: 1 });
  }
  assert.ok(Number.isFinite(last.cardCenterX) && Number.isFinite(last.cardCenterY));
  assert.ok(Number.isFinite(last.angleRad));
});
