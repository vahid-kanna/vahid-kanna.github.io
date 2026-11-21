export type StageTone = 'live' | 'pilot' | 'prototype' | 'archive';

export interface EvidenceItem {
  label: string;
  value: string;
  qualifier: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  role: string;
  period: string;
  stageLabel: string;
  stageTone: StageTone;
  domain: string;
  summary: string;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
  primaryImage?: ProjectImage;
  secondaryImages?: ProjectImage[];
  useZeroEkaSchematic?: boolean;
  evidenceStrip: EvidenceItem[];
  problem: string[];
  ownership: string[];
  keyDecision: {
    title: string;
    chosen: string;
    rejected: string;
    why: string;
  };
  architectureNotes: string[];
  limitations: string[];
  nextStep: string;
}

export interface LabItem {
  id: string;
  year: string;
  title: string;
  category: string;
  stage: string;
  summary: string;
  details: string;
  caveat?: string;
  repoUrl: string;
  repoName: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'syncpro',
    index: '01',
    title: 'SyncPro',
    shortTitle: 'SyncPro',
    tagline: 'Turning fragmented jobsite updates into schedule decisions planners can trust.',
    role: 'Co-Founder & Business Lead',
    period: 'Jan 2026 – Present',
    stageLabel: 'Incubated · Pilot stage',
    stageTone: 'pilot',
    domain: 'Construction project controls · B2B SaaS',
    summary:
      'Construction master schedules live in desktop tools like Primavera P6, while ground reality arrives in WhatsApp voice notes and daily logs. SyncPro reconciles field updates against schedule logic in a parallel review queue before anything touches the baseline.',
    liveUrl: 'https://syncpro.org/',
    liveLabel: 'syncpro.org',
    primaryImage: {
      src: '/images/work/syncpro-shadow-schedule.webp',
      alt: 'SyncPro Shadow Schedule interface concept showing field signals mapped to schedule activities with a confidence review gate',
      caption:
        'SyncPro Shadow Schedule interface concept — field signals mapped against schedule activities with an explicit review threshold before baseline commit.',
      width: 1600,
      height: 1000,
    },
    secondaryImages: [
      {
        src: '/images/work/syncpro-hero.webp',
        alt: 'Live landing page of syncpro.org explaining schedule gap reconciliation and DCMA health checks',
        caption: 'Live public landing page at syncpro.org.',
        width: 1600,
        height: 1016,
      },
      {
        src: '/images/work/syncpro-hub.webp',
        alt: 'SyncPro multi-project schedule health overview showing DCMA-14 grades across uploaded schedule files',
        caption: 'Multi-project schedule health concept tracking uploaded .xer, .mpp, and .xml schedules.',
        width: 1600,
        height: 1000,
      },
    ],
    evidenceStrip: [
      {
        label: 'Discovery',
        value: '25+ site interviews',
        qualifier: 'Conducted with site teams and project planners to map reporting bottlenecks',
      },
      {
        label: 'Incubation',
        value: 'Nirmaan, IIT Madras',
        qualifier: 'Part-incubated venture; advanced to final stage of ₹5L grant evaluation',
      },
      {
        label: 'Pilot focus',
        value: '5 validation workflows',
        qualifier: 'Testing 4–8 hrs/week reporting reduction; commercial pricing still under iteration',
      },
    ],
    problem: [
      'Mid-to-large construction projects run on baseline schedules containing hundreds or thousands of linked tasks. Yet once execution begins, site supervisors report progress through phone calls, regional-language voice notes, and handwritten diaries.',
      'Planning engineers spend hours every week manually reconciling those informal messages into Daily Progress Reports and desktop schedule software. By the time head office sees a critical-path slip, it is often one to three weeks old — leaving little room to recover before contractual delay penalties kick in.',
    ],
    ownership: [
      'Led 25+ discovery interviews across site engineers, project planners, and contractors to locate where schedule updates actually stall.',
      'Scoped the product around zero-friction field capture and a human-reviewed Shadow Schedule rather than asking site staff to learn desktop planning software.',
      'Built the commercial strategy, market-sizing model, delay holding-cost analysis, and investor pitches for Nirmaan evaluation panels.',
      'Coordinated closely with my technical co-founder (Balaji), who leads the core backend and Neo4j schedule graph implementation, while I own discovery, product direction, landing presence, and pilot conversations.',
    ],
    keyDecision: {
      title: 'A parallel Shadow Schedule instead of automatic schedule edits',
      chosen:
        'Route every parsed field update into a parallel Shadow Schedule with confidence scoring and one-tap planner sign-off before updating the contractual master file.',
      rejected:
        'Directly auto-updating Primavera P6 / MS Project schedules whenever a voice note or photo arrived.',
      why:
        'Interviews made one constraint unmistakable: contractual schedules carry legal weight in delay disputes. Planners will reject any tool that silently mutates baseline dates. Earning trust meant keeping the official baseline untouched until evidence is corroborated.',
    },
    architectureNotes: [
      'Ingests master schedules (.xer / .mpp / .xml) into a graph model to check relationship integrity and critical-path dependencies.',
      'Maps unstructured site signals (voice notes, logs, geotagged photos) to candidate schedule activities and surfaces supporting evidence.',
      'Separates modeled case-study unit economics (delay holding-cost scenarios and hybrid site-retainer pricing) from realized pilot metrics while commercial terms are tested with contractors.',
    ],
    limitations: [
      'Active contractor pilots are still early-stage validation workflows rather than large-scale multi-year production deployments.',
      'Commercial pricing (site retainer plus tiered seats) and long-term retention remain working hypotheses being calibrated during pilots, not proven recurring SaaS economics.',
      'The Shadow Schedule interface shown above is a product design prototype from our active workspace, distinct from production telemetry.',
    ],
    nextStep:
      'Convert ongoing pilot workflows into repeatable paid site deployments and measure actual planner hours saved across a full multi-month project cycle.',
  },
  {
    slug: 'railraksha',
    index: '02',
    title: 'RailRaksha',
    shortTitle: 'RailRaksha',
    tagline: 'An offline-first field tool built with my father’s railway maintenance work in mind.',
    role: 'Solo Creator & Developer',
    period: '2025 – 2026',
    stageLabel: 'Live personal PWA',
    stageTone: 'live',
    domain: 'Offline-first PWA · Field worker UX',
    summary:
      'My father is a Gang Mate on the SKM–UPD section of Indian Railways. RailRaksha explores practical offline-first tools for track crews working on budget Android devices across dead zones: bilingual Telugu/English controls, local gang diary drafts, defect capture, and an experimental schedule-referenced alert interface.',
    liveUrl: 'https://railraksha.tech/',
    liveLabel: 'railraksha.tech',
    repoUrl: 'https://github.com/vahid-kanna/RailRaksha',
    repoLabel: 'View source on GitHub',
    primaryImage: {
      src: '/images/work/railraksha-dual.webp',
      alt: 'Two live mobile captures of railraksha.tech side by side: the bilingual track-alert corridor view and the Telugu voice Gang Diary view',
      caption:
        'Live mobile captures of railraksha.tech — corridor alert screen (left) and Telugu voice Gang Diary (right), with offline storage and explicit freight-train safety notices.',
      width: 1600,
      height: 1000,
    },
    evidenceStrip: [
      {
        label: 'Architecture',
        value: 'Vanilla JS + IndexedDB',
        qualifier: 'Zero-framework offline bundle using Service Workers & Cache API for fast cold boots',
      },
      {
        label: 'Usability',
        value: 'Telugu + English UI',
        qualifier: 'High-contrast layout and large touch controls designed for outdoor glare and low-end phones',
      },
      {
        label: 'Safety boundary',
        value: 'Experimental prototype',
        qualifier: 'Personal project; explicitly never substitutes for official railway rules or visual lookout',
      },
    ],
    problem: [
      'Track maintenance crews work in stretches where cellular coverage drops without warning, under harsh sunlight, and mostly on modest Android phones. Most software designed in offices assumes stable 5G, English literacy, and tiny desktop controls.',
      'Watching my father manage daily gang logs, track defect notes, and corridor awareness highlighted two separate jobs: recording field work cleanly in Telugu even when offline, and exploring clearer directional corridor awareness without overwhelming the user.',
    ],
    ownership: [
      'Designed, built, tested, and deployed every layer solo — from field observation and Telugu UX copy to Service Worker caching, IndexedDB persistence, and GitHub-to-Cloudflare deployment.',
      'Rebuilt the architecture through five major revisions (v5.0), stripping out brittle assumptions and adding clear in-app warnings wherever data limits exist.',
    ],
    keyDecision: {
      title: 'Plain JavaScript + local storage over a heavy SPA framework, with explicit offline/online boundaries',
      chosen:
        'Keep the core shell, corridor reference data, and Telugu gang-diary queue 100% local in Service Worker cache + IndexedDB, while clearly marking schedule feeds and cloud defect classification as network-dependent.',
      rejected:
        'Building a cloud-dependent React app that fails to open in rural dead zones or blurs simulated alerts with live telemetry.',
      why:
        'On a low-memory phone with intermittent signal, boot reliability matters more than developer ergonomics. Just as importantly, a safety-adjacent tool must never pretend a cached timetable is live radar.',
    },
    architectureNotes: [
      'Offline layer: Service Worker asset cache + IndexedDB local persistence for gang diary entries and static corridor geometry.',
      'Network-dependent layer: External train schedule lookups and Gemini multimodal defect-photo assistance only run when connectivity is available.',
      'Directional vector filtering attempts to reduce alerts for trains moving away from a selected track beat, alongside prominent reminders that unscheduled freight/goods trains do not appear on passenger feeds.',
    ],
    limitations: [
      'RailRaksha is an experimental personal software prototype — not an Indian Railways approved, certified, or officially deployed safety instrument.',
      'Consumer phone GPS drift, parallel-track ambiguity, background OS throttling, and unscheduled freight trains mean software cannot guarantee collision prevention or eliminate false alerts.',
      'Visual lookout and official railway protection procedures remain mandatory at all times.',
    ],
    nextStep:
      'Keep improving the offline Telugu voice gang diary and defect-documentation flow, where software can deliver immediate day-to-day usefulness without carrying life-safety assumptions.',
  },
  {
    slug: 'zamp-ap',
    index: '03',
    title: 'Zamp AP Invoice Workbench',
    shortTitle: 'Zamp AP Workbench',
    tagline: 'An operational AI workflow that processes real PDF invoices and halts safely on edge cases.',
    role: 'Solo Builder',
    period: 'Nov 2026',
    stageLabel: 'Live interactive prototype',
    stageTone: 'live',
    domain: 'Operational AI · Document workflows',
    summary:
      'Built as an end-to-end Accounts Payable automation workbench ("PDF to Decision"). Upload any invoice PDF or run prepared edge cases to inspect supplier lookup, arithmetic verification, PO matching, variance tolerances, duplicate blocking, and human-in-the-loop review.',
    liveUrl: 'https://zamp.vahidbasha.me/',
    liveLabel: 'zamp.vahidbasha.me',
    repoUrl: 'https://github.com/vahid-kanna/complete-case-study-request-2',
    repoLabel: 'View source on GitHub',
    primaryImage: {
      src: '/images/work/zamp-workbench.webp',
      alt: 'Live Zamp AP Invoice Workbench at zamp.vahidbasha.me showing PDF upload dropzone, prepared edge-case scenarios, and browser-local prototype notes',
      caption:
        'Live capture of zamp.vahidbasha.me — real PDF intake, 7 prepared happy-path and exception scenarios, and explicit handling for image-only scanned PDFs.',
      width: 1600,
      height: 1000,
    },
    evidenceStrip: [
      {
        label: 'Live demo',
        value: 'Runnable in browser',
        qualifier: 'Inspectable now at zamp.vahidbasha.me with PDF upload and 7 test scenarios',
      },
      {
        label: 'Verification',
        value: '14/14 pytest tests passing',
        qualifier: 'Automated regression coverage across FastAPI + SQLite + PyPDF decision rules',
      },
      {
        label: 'Core scenarios',
        value: '5 exception pathways',
        qualifier: 'Exact 2-way match, +3.5% freight variance, missing PO, duplicate guard, scanned PDF halt',
      },
    ],
    problem: [
      'Accounts Payable teams spend most of their time on exceptions, not clean invoices: a vendor forgets a PO number, freight adds 3.5% to the total, an invoice gets resubmitted with different formatting, or a scanned image-only PDF arrives with no selectable text.',
      'Many AI workflow demos show a smooth animation over a clean sample and ignore what happens when inputs break. The goal here was to build a transparent, inspectable workflow where every step, rule threshold, and escalation trigger is visible.',
    ],
    ownership: [
      'Designed the operational policy rules (2-way match, 5% freight tolerance, duplicate fingerprinting, blanket PO drawdown, and scanned-PDF halt gate).',
      'Built both the Python FastAPI + SQLite + PyPDF + ReportLab backend (including printable disbursement vouchers and automated pytest suite) and the interactive Cloudflare Pages browser workbench.',
    ],
    keyDecision: {
      title: 'Halt image-only scanned PDFs before matching rather than guessing totals',
      chosen:
        'Detect PDFs without a text layer during intake and route them immediately to Manual Data Keying with a clear explanation when no OCR engine is attached.',
      rejected:
        'Silently falling back to brittle heuristics or letting an extraction step invent line-item numbers.',
      why:
        'In finance operations, a silent wrong disbursement is far more costly than a paused queue item. Explicit boundaries build operator confidence.',
    },
    architectureNotes: [
      'Full local backend: FastAPI, SQLite ledger, PyPDF parser, ReportLab voucher export, and 14/14 passing pytest regression tests.',
      'Hosted edge demo (`zamp.vahidbasha.me`): Browser-local prototype evaluating real uploaded PDFs and prepared scenarios against sample supplier and PO reference tables in localStorage, with explicit disclosures that no live ERP posting occurs.',
    ],
    limitations: [
      'The public web deployment evaluates against bundled sample supplier/PO reference data in browser localStorage rather than connecting to a live ERP or bank rail.',
      'Image-only scanned PDFs intentionally route to manual keying because no OCR backend is bundled in the lightweight edge build.',
    ],
    nextStep:
      'Add an optional OCR worker stage with field-level confidence thresholds while keeping the same strict halt-on-low-confidence guarantee.',
  },
  {
    slug: 'zeroeka',
    index: '04',
    title: 'ZeroEka — Product & Strategy',
    shortTitle: 'ZeroEka',
    tagline: 'AI content ingestion PRDs, onboarding telemetry, and B2B SaaS pricing.',
    role: 'Product & Strategy Intern',
    period: 'May 2026 – Jul 2026',
    stageLabel: 'Internship · 2026',
    stageTone: 'archive',
    domain: 'B2B EdTech SaaS · Product & GTM',
    summary:
      'Worked across product specification, PostHog funnel analysis, and commercial packaging for a B2B EdTech SaaS platform. Proprietary client UI is intentionally omitted; the focus here is on the product decisions and structured artifacts I owned.',
    useZeroEkaSchematic: true,
    evidenceStrip: [
      {
        label: 'Product specs',
        value: 'AI Content Studio PRDs',
        qualifier: 'Scoped automated document-to-course ingestion to cut manual setup steps',
      },
      {
        label: 'Analytics',
        value: 'PostHog funnel audits',
        qualifier: 'Mapped event telemetry across onboarding flows to locate and prioritize drop-offs',
      },
      {
        label: 'Commercial',
        value: '3-tier pricing & 30-day PoC',
        qualifier: 'Structured unit-economics tiers and an enterprise pilot conversion playbook',
      },
    ],
    problem: [
      'B2B training teams adopting the platform faced two recurring friction points: converting raw PDFs and internal manuals into structured courses took too much manual work, and new learners dropped off partway through early onboarding.',
      'On the commercial side, enterprise prospects hesitated to sign annual contracts before seeing course completion results inside their own teams.',
    ],
    ownership: [
      'Authored Product Requirement Documents (PRDs) defining the AI-assisted document ingestion pipeline, edge-case validation states, and reviewer controls for the Content Studio.',
      'Defined event taxonomy and analyzed user-journey funnels in PostHog to identify where onboarding friction clustered and sequence fixes with engineering.',
      'Built a 3-tier B2B SaaS pricing model alongside a structured 30-day Proof-of-Concept playbook to lower buyer friction during enterprise evaluations.',
    ],
    keyDecision: {
      title: 'Package a time-boxed 30-day PoC instead of discounting annual contracts upfront',
      chosen:
        'Give enterprise buyers a clean 30-day pilot with explicit ingestion and completion success criteria before transitioning into tiered annual pricing.',
      rejected:
        'Cutting annual seat prices early to close skeptical buyers without proving workflow adoption.',
      why:
        'Price cuts lock in weak unit economics without solving buyer skepticism. A structured PoC aligns sales around measurable adoption milestones.',
    },
    architectureNotes: [
      'Internal internship tracking targeted a 35% reduction in course-creation time via document ingestion and a 24% improvement in course completion after onboarding funnel fixes.',
      'Because this work was completed inside a private company codebase and commercial data is confidential, screenshots and internal metrics tables are intentionally not published here.',
    ],
    limitations: [
      'As an intern working alongside engineering and leadership, product outcomes reflect team execution rather than solo attribution.',
      'Public live demo and raw telemetry screenshots are unavailable due to client confidentiality.',
    ],
    nextStep:
      'Happy to walk through the redacted PRD structure, funnel-instrumentation approach, and SaaS pricing trade-offs in a conversation.',
  },
];

export const LAB_ITEMS: LabItem[] = [
  {
    id: 'bse-quant-engine',
    year: '2025 – 2026',
    title: 'BSE Event-Driven Quant Engine',
    category: 'Quantitative research · Python',
    stage: 'Config E · Historical backtest research',
    summary:
      'Audited an event-driven equity research pipeline across 649 BSE sessions, eliminating 6 lookahead biases and enforcing realistic statutory costs.',
    details:
      'Parsed corporate disclosure histories, enforced strict pre-open capital snapshots (no same-day cash recycling), modeled gap-through stop fills at min(stop, open), added 60 bps slippage plus full Indian statutory fees (STT, CDSL DP, GST, stamp duty), and applied Benjamini-Hochberg False Discovery Rate (FDR) filtering across hypothesis tests.',
    caveat:
      'Strictly historical backtest research — not live trading results, not audited fund performance, and not investment advice.',
    repoUrl: 'https://github.com/vahid-kanna/bse-quant-engine',
    repoName: 'vahid-kanna/bse-quant-engine',
  },
  {
    id: 'iitm-course-monitor',
    year: '2025 – 2026',
    title: 'IITM Elective Vacancy Monitor',
    category: 'Browser automation · GitHub Actions',
    stage: 'Utility · Open source',
    summary:
      'Headless Playwright monitor polling 20+ oversubscribed IIT Madras electives (~280 checks/day) and sending SMTP email alerts when seats open.',
    details:
      'Built after watching students manually refresh registration tables all week. Uses deduplicated state checks on a scheduled GitHub Actions cron and dispatched vacancy alerts that helped 15+ peers and myself catch open elective slots.',
    caveat:
      'Detection speed depends on cron polling cadence; portal HTML changes still require selector updates.',
    repoUrl: 'https://github.com/vahid-kanna/iitm-course-monitor',
    repoName: 'vahid-kanna/iitm-course-monitor',
  },
  {
    id: 'kivi-memory',
    year: '2026',
    title: 'Kivi Semantic Memory Engine',
    category: 'Applied AI · Local retrieval',
    stage: 'Prototype · 28/28 guardrail tests',
    summary:
      'Local-first 3-tier memory prototype (SQLite + BM25 FTS5) with temporal query resolution and a calibrated 28-case guardrail suite.',
    details:
      'Explored fast local memory retrieval for voice/agent workflows without external vector database infrastructure, prioritizing deterministic SQLite full-text ranking, temporal expression handling, and reproducible automated evaluation.',
    repoUrl: 'https://github.com/vahid-kanna/Kivi_Golden_Goose',
    repoName: 'vahid-kanna/Kivi_Golden_Goose',
  },
  {
    id: 'opportunity-radar',
    year: '2026',
    title: 'Autonomous Opportunity Radar',
    category: 'Workflow automation · SQLite',
    stage: 'Personal tool',
    summary:
      'Dual-pipeline scanner indexing campus/national postings and global remote openings into local SQLite state and clean static HTML dashboards.',
    details:
      'Replaces repetitive manual job-board checking with scheduled ingestion, deduplication by posting ID, geo-eligibility filtering, and lightweight local review dashboards.',
    repoUrl: 'https://github.com/vahid-kanna/opportunity-radar',
    repoName: 'vahid-kanna/opportunity-radar',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
