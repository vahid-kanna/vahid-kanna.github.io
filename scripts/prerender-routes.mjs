import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const ROUTES = [
  {
    route: '/work/syncpro',
    title: 'SyncPro — Shaik Vahid Basha',
    description:
      'Turning fragmented jobsite updates into schedule decisions planners can trust. Co-Founder & Business Lead at SyncPro (Nirmaan, IIT Madras).',
  },
  {
    route: '/work/railraksha',
    title: 'RailRaksha — Shaik Vahid Basha',
    description:
      'An experimental offline-first Progressive Web App built with my father’s railway field work in mind — bilingual Telugu/English controls and local IndexedDB storage.',
  },
  {
    route: '/work/zamp-ap',
    title: 'Zamp AP Invoice Workbench — Shaik Vahid Basha',
    description:
      'An operational AI workflow processing real PDF invoices through PO matching, variance tolerances, duplicate blocking, and safe escalation.',
  },
  {
    route: '/work/zeroeka',
    title: 'ZeroEka — Product & Strategy — Shaik Vahid Basha',
    description:
      'Product & Strategy internship covering AI document ingestion PRDs, PostHog onboarding telemetry, and B2B SaaS pricing.',
  },
  {
    route: '/lab',
    title: 'Engineering Lab — Shaik Vahid Basha',
    description:
      'Supporting engineering builds, automation utilities, and historical backtest research by Shaik Vahid Basha.',
  },
  {
    route: '/writing',
    title: 'Field Notes — Shaik Vahid Basha',
    description:
      'Short essays on product discovery, offline-first design, and building operational AI workflows that fail safely.',
  },
  {
    route: '/writing/shadow-schedule-trust',
    title: 'Why site teams ignore software that overwrites their schedule — Shaik Vahid Basha',
    description:
      'What 25+ conversations with construction planners and site engineers taught us about designing SyncPro around a review gate.',
  },
  {
    route: '/writing/offline-first-skm-upd',
    title: 'Designing for dead zones and bright sunlight on the SKM–UPD corridor — Shaik Vahid Basha',
    description:
      'Field constraints from building RailRaksha and why honesty about technical limits matters most.',
  },
  {
    route: '/writing/failing-safely-operational-ai',
    title: 'Why failing safely beats guessing in operational AI — Shaik Vahid Basha',
    description:
      'Lessons from building an Accounts Payable invoice engine and auditing quantitative backtests.',
  },
  {
    route: '/about',
    title: 'About — Shaik Vahid Basha',
    description:
      "Background, working principles, and campus operations leadership of Shaik Vahid Basha (IIT Madras '27).",
  },
];

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function renderMetaHtml(html, { route, title, description }) {
  const canonical = `https://vahidbasha.me${route}`;
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  return html
    .replace(/<title>.*?<\/title>/, `<title>${t}</title>`)
    .replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${d}" />`)
    .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/, `<meta property="og:title" content="${t}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/, `<meta name="twitter:title" content="${t}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/, `<meta name="twitter:description" content="${d}" />`);
}

for (const entry of ROUTES) {
  const targetDir = path.join(distDir, entry.route.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), renderMetaHtml(baseHtml, entry), 'utf-8');
}

// Honest 404.html for Cloudflare Pages unknown routes
fs.writeFileSync(
  path.join(distDir, '404.html'),
  renderMetaHtml(baseHtml, {
    route: '/404',
    title: 'Page Not Found — Shaik Vahid Basha',
    description: 'The requested page could not be found on vahidbasha.me.',
  }),
  'utf-8'
);

// Automated exclusion & anti-slop verification across ALL built text assets in dist/
const FORBIDDEN = [
  /civil\s+engineering/i,
  /\bupsc\b/i,
  /civil\s+services/i,
  /\bcea\b/i,
  /autocad/i,
  /sys\.portfolio/i,
  /10x\s+force/i,
  /zero\s+false\s+alarms/i,
  /book a strategy chat/i,
];

function walk(dir) {
  let out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out = out.concat(walk(full));
    else out.push(full);
  }
  return out;
}

const textExts = new Set(['.html', '.js', '.css', '.txt', '.xml', '.json', '.svg']);
const violations = [];
for (const file of walk(distDir)) {
  if (!textExts.has(path.extname(file).toLowerCase())) continue;
  const content = fs.readFileSync(file, 'utf-8');
  for (const rx of FORBIDDEN) {
    if (rx.test(content)) {
      violations.push(`${path.relative(distDir, file)} matched ${rx}`);
    }
  }
}

if (violations.length > 0) {
  console.error('EXCLUSION / ANTI-SLOP AUDIT FAILED:');
  for (const v of violations) console.error('  -', v);
  process.exit(1);
}

console.log(`Prerendered ${ROUTES.length} routes + 404.html. Exclusion & anti-slop scan passed (0 violations).`);
