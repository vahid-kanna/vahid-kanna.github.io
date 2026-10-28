import { ProjectItem, EssayItem, TakeItem } from './portfolioLogic';

export const PROFILE_DATA = {
  name: 'Shaik Vahid Basha',
  shortName: 'Vahid Basha',
  rollNo: 'CE23B115',
  institution: 'IIT Madras',
  roleLine: 'Frontend engineer · Product & AI systems.',
  headlinePrefix: "Hi, I'm Vahid. I build interfaces & AI systems that feel ",
  headlineAccent: 'crafted & instant.',
  bio: 'Frontend & product engineer at IIT Madras. Co-founded SyncPro (Nirmaan Pre-Incubator) and engineered offline-first PWAs, autonomous Playwright bots, and high-frequency quant dashboards. I live where systems engineering meets tactile UI.',
  chips: ['IIT Madras · 27', 'Co-founder @ SyncPro', 'Offline-First PWAs'],
  email: 'vahidbashakanna@gmail.com',
  resumePdfUrl: '/assets/aistudio/Product_Management__uploaded_now_523c560a.pdf',
  socials: {
    github: 'https://github.com/vahidbasha',
    x: 'https://x.com/vahidbasha_iitm',
    linkedin: 'https://www.linkedin.com/in/shaik-vahid-basha',
  },
  currentlyPlaying: {
    track: 'Veridis Quo',
    artist: 'Daft Punk',
    album: 'Discovery · Late Night Build Session',
    status: 'CODING AT NIRMAAN LAB · IITM',
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'railraksha',
    slug: 'railraksha-pwa',
    year: '2026',
    stars: 42,
    featured: true,
    title: 'railraksha-pwa',
    shortDesc:
      'An offline-first AI safety PWA mitigating track collision hazards for railway maintenance crews near 130 km/h trains with zero false alarms.',
    details:
      'Engineered an offline-first Progressive Web App with directional receding vector math and a local IndexedDB synchronization engine. Integrated multimodal Gemini AI for IRPWM defect classification and Telugu vernacular voice daily gang diary logs in zero-connectivity zones.',
    metrics: [
      '130 km/h predictive vector collision alerts',
      '0 false alarms via receding vector filtering',
      '100% offline-capable local IndexedDB storage',
    ],
    tags: ['TypeScript', 'React PWA', 'IndexedDB', 'Gemini Multimodal'],
    codeUrl: 'https://github.com/vahidbasha/railraksha-pwa',
    liveUrl: '#work/railraksha-pwa',
    category: 'frontend',
    architectureNotes: [
      'Service Worker cache-first strategy with background sync queues for rural rail corridors.',
      'Real-time GPS heading & Haversine receding vector computation running at 60fps on low-end Android devices.',
      'Web Speech API + Gemini multimodal pipeline translating vernacular voice logs into structured IRPWM inspection tables.',
    ],
  },
  {
    id: 'syncpro',
    slug: 'syncpro-cloud',
    year: '2026',
    stars: 31,
    featured: true,
    title: 'syncpro-workspace',
    shortDesc:
      'B2B SaaS construction project-management workspace incubated at Nirmaan Pre-Incubator, IIT Madras. Saves field teams 4–8 hrs/week.',
    details:
      'Co-founded and architected the frontend workflow engine for SyncPro, advancing to the final stage for a ₹5,00,000 grant round. Validated across 25+ site engineer interviews to digitize daily site progress, milestone-linked RTGS billing, and real-time delay telemetry.',
    metrics: [
      '₹5,00,000 Nirmaan IITM incubation finalist',
      '4–8 hrs/week saved per construction project team',
      '126% gross ROI proved via 4-day delay reduction',
    ],
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'PostHog Telemetry'],
    codeUrl: 'https://github.com/vahidbasha/syncpro-workspace',
    liveUrl: '#work/syncpro-workspace',
    category: 'product',
    architectureNotes: [
      'Optimistic UI state mutations for instant field progress logging over unstable 3G site connections.',
      'Interactive Gantt & critical-path delay visualizer quantifying ₹34,000/day holding loss exposure in real time.',
      'Granular PostHog event telemetry funnels tracking onboarding drop-offs and daily active site supervisor retention.',
    ],
  },
  {
    id: 'quant-alpha',
    slug: 'bse-quant-engine',
    year: '2026',
    stars: 28,
    featured: true,
    title: 'alpha-quant-terminal',
    shortDesc:
      '0-to-1 BSE quantitative research engine & backtest visualizer parsing 857K+ corporate filings and 301K statistical hypothesis tests.',
    details:
      'Directed the build of an agentic quantitative research pipeline and interactive backtest audit interface. Eliminated 6 lookahead biases, modeled pre-market cash locks, gap-down fills, and 60 bps slippage to deliver +43.6% 12M net ROI with a 9.4x Calmar ratio.',
    metrics: [
      '857K+ BSE filings parsed & indexed',
      '+43.6% 12M net ROI · 59% win rate · 4.6% max DD',
      '3 FDR-certified setups isolated from 301K tests',
    ],
    tags: ['TypeScript', 'Python', 'FastAPI', 'Canvas 2D Charts'],
    codeUrl: 'https://github.com/vahidbasha/alpha-quant-terminal',
    liveUrl: '#work/bse-quant-engine',
    category: 'ai-systems',
    architectureNotes: [
      'High-density Canvas 2D equity curve & drawdown inspector capable of rendering 300,000+ test permutations without main-thread frame drops.',
      'False Discovery Rate (Benjamini-Hochberg) statistical filter visualizers preventing p-hacking across multi-factor scans.',
      'Strict point-in-time timestamp auditor flagging survivorship and restatement lookahead leaks.',
    ],
  },
  {
    id: 'this-site',
    slug: 'vahid-portfolio-system',
    year: '2026',
    stars: 19,
    featured: true,
    title: 'This site',
    shortDesc:
      'A monochrome personal design system featuring Verlet lanyard physics, 2D canvas stipple morphing, and an adaptive liquid-glass notch nav.',
    details:
      'Case study for this portfolio build: custom 60fps Verlet rope physics for a draggable 3D-flippable ID badge, responsive 2D canvas stipple particle engine with cursor repulsion, and an interactive flex-accordion project showcase.',
    metrics: [
      '10-iteration Verlet constraint solver at 60fps',
      'Zero external physics libraries — pure TypeScript',
      'Full keyboard & screen-reader accessible landmarks',
    ],
    tags: ['React 19', 'Verlet Physics', 'Canvas 2D', 'Tailwind CSS'],
    codeUrl: 'https://github.com/vahidbasha/vahid-portfolio',
    liveUrl: '#hero',
    category: 'frontend',
    architectureNotes: [
      'Decoupled Verlet integrator with 10 relaxation passes per frame and pointer-capture drag handoff.',
      '3D CSS perspective card flip with dynamic cursor glare and real-time eye-tracking mascot SVG.',
      'Machine-readable llms.txt specification modal for AI recruiter agents and automated crawlers.',
    ],
  },
  {
    id: 'zeroeka-studio',
    slug: 'zeroeka-content-studio',
    year: '2026',
    stars: 16,
    featured: true,
    title: 'zeroeka-content-studio',
    shortDesc:
      'AI-native Content Studio & telemetry instrumentation for a B2B EdTech SaaS that cut course generation time by 35% and lifted completion by 24%.',
    details:
      'Architected end-to-end product specs, interactive ingestion workflows, and PostHog event telemetry across learner journeys at ZeroEka. Resolved critical onboarding friction and structured a 3-tier SaaS pricing calculator for 30-day enterprise PoCs.',
    metrics: [
      '-35% course generation time via automated ingestion',
      '+24% course completion lift from telemetry fixes',
      '30-day enterprise PoC unit economics framework',
    ],
    tags: ['Product Engineering', 'PostHog', 'RAG Pipelines', 'Figma'],
    codeUrl: 'https://github.com/vahidbasha/zeroeka-studio-specs',
    liveUrl: '#work/zeroeka-content-studio',
    category: 'product',
    architectureNotes: [
      'Document-to-curriculum streaming UI with inline chunk citation previews and human-in-the-loop approval gates.',
      'Funnel cohort instrumentation pinpointing exact DOM interaction drop-offs during learner onboarding.',
      'Interactive 3-tier SaaS pricing & gross-margin simulator built for enterprise sales pilots.',
    ],
  },
  {
    id: 'elective-monitor',
    slug: 'elective-monitor-bot',
    year: '2025',
    stars: 22,
    featured: true,
    title: 'elective-seat-monitor',
    shortDesc:
      'Autonomous headless Playwright web bot running 280+ daily checks to snipe oversubscribed IIT Madras elective seats in real time.',
    details:
      'Built a resilient 24/7 tracking system monitoring 20+ high-demand IITM core and minor electives. Scheduled via GitHub Actions cron with session persistence and instant SMTP/Telegram alert dispatches, helping 15+ students secure seats.',
    metrics: [
      '280+ automated headless checks every day',
      '20+ oversubscribed IITM courses monitored 24/7',
      '15+ students secured seats via sub-minute alerts',
    ],
    tags: ['Playwright', 'GitHub Actions', 'TypeScript', 'Node.js'],
    codeUrl: 'https://github.com/vahidbasha/elective-seat-monitor',
    liveUrl: '#work/elective-monitor-bot',
    category: 'ai-systems',
    architectureNotes: [
      'Deterministic DOM selector engine resilient to legacy academic portal table shifts.',
      'Zero-cost serverless cron orchestration on GitHub Actions with state diffing to prevent duplicate alert spam.',
      'Low-latency SMTP notification dispatcher with direct registration deep-links.',
    ],
  },
];

export const ESSAYS_DATA: EssayItem[] = [
  {
    id: 'essay-1',
    slug: 'offline-first-pwa-130kmh',
    date: 'Feb 18, 2026',
    isoDate: '2026-02-18',
    readTime: '5 min read',
    tags: ['#frontend', '#pwa', '#architecture'],
    title: 'Engineering Offline-First PWAs for 130 km/h Railway Corridors',
    excerpt:
      'How we built RailRaksha with local IndexedDB queues, directional receding vectors, and Gemini multimodal voice logs to protect track maintenance crews in dead-zone rail sections.',
    content: [
      'When a track maintenance crew is working along a high-speed rail corridor with trains approaching at 130 km/h, a loading spinner or a failed fetch request is not a minor UX annoyance—it is a life-critical failure. Cellular connectivity along rural railway sections drops out unpredictably, which meant RailRaksha had to be architected as a true offline-first Progressive Web Application from day one.',
      'The most common failure mode in proximity warning systems is alert fatigue caused by false positives. If a train is on an adjacent loop or receding after passing the crew, naive radius checks keep screaming. We solved this on the client by computing directional receding vectors over a rolling window of high-frequency GPS coordinates directly in the browser, suppressing alerts the moment the radial velocity vector flips away from the work zone.',
      'For daily maintenance reporting (gang diaries), trackmen needed to log defects according to the Indian Railways Permanent Way Manual (IRPWM) without typing into tiny form fields with dirty gloves. We paired a local IndexedDB outbox with a multimodal Gemini pipeline that accepts Telugu vernacular voice notes and track defect photos, queues them locally with zero data loss, and syncs structured inspection rows the instant edge connectivity returns.',
    ],
    keyTakeaways: [
      'Never trust the network in field software: treat IndexedDB as the primary source of truth and the server as an asynchronous replica.',
      'Eliminate false alarms with vector kinematics (approach vs. recede dot-product checks) rather than naive geofence circles.',
      'Vernacular voice + multimodal vision turns 15-minute manual form entry into a 10-second field interaction.',
    ],
  },
  {
    id: 'essay-2',
    slug: 'telemetry-driven-ux-zeroeka',
    date: 'Jul 14, 2026',
    isoDate: '2026-07-14',
    readTime: '4 min read',
    tags: ['#product', '#telemetry', '#ux'],
    title: 'Telemetry-Driven Frontend UX: Lifting Course Completion by 24%',
    excerpt:
      'Using PostHog event telemetry, session funnels, and AI-assisted document ingestion at ZeroEka to cut course creation time by 35% and eliminate learner onboarding drop-offs.',
    content: [
      'Most frontend teams instrument analytics as an afterthought—sprinkling generic pageview tags after launch and wondering why conversion stalls. At ZeroEka, we treated user telemetry as a first-class engineering primitive inside our React component tree.',
      'On the creator side, subject-matter experts were spending hours copying raw PDFs into structured module blocks. By authoring a tight PRD and frontend workflow for an AI-native Content Studio—complete with streaming section previews and inline source citations—we automated document ingestion and cut end-to-end course generation time by 35%.',
      'On the learner side, PostHog funnel telemetry revealed a sharp drop-off between module enrollment and the first interactive checkpoint. The culprit was cognitive overload on the initial syllabus screen. By collapsing secondary metadata, pre-fetching the first lesson payload, and introducing a resume-state banner, we lifted overall course completion by 24% within a single release cycle.',
    ],
    keyTakeaways: [
      'Instrument intent, not just clicks: track time-to-first-action and hesitations on complex form steps.',
      'Streaming AI interfaces need deterministic skeleton states and instant user override controls to feel trustworthy.',
      'Every UI simplification should map to a measurable cohort retention delta.',
    ],
  },
  {
    id: 'essay-3',
    slug: 'auditing-lookahead-bias-quant-ui',
    date: 'Jan 29, 2026',
    isoDate: '2026-01-29',
    readTime: '6 min read',
    tags: ['#systems', '#quant', '#data-viz'],
    title: 'Eliminating 6 Lookahead Biases Across 857K+ BSE Filings',
    excerpt:
      'Lessons from building a 0-to-1 quantitative research engine and Canvas 2D backtest inspector: why 99% of naive backtests lie and how False Discovery Rate (FDR) filtering saves capital.',
    content: [
      'When you run 301,000 hypothesis tests across 857,000+ Bombay Stock Exchange corporate filings, standard p-value thresholds guarantee you will discover hundreds of "miracle" trading strategies that are pure statistical noise. Building our quantitative alpha engine from 0 to 1 required treating data hygiene and visualization with extreme skepticism.',
      'During our backtest audit, we uncovered and eliminated 6 distinct lookahead biases—ranging from filing timestamp vs. exchange broadcast lag to unadjusted corporate actions and gap-down illiquidity locks. We modeled pre-market cash locks and a strict 60 bps slippage penalty directly into the execution simulator.',
      'To inspect these runs without choking the browser DOM, we built a custom Canvas 2D visualization layer that renders drawdown underwater plots, trade distribution histograms, and Benjamini-Hochberg False Discovery Rate (FDR) thresholds. Only 3 setups survived FDR certification—delivering +43.6% 12M net ROI, a 59% win rate, and a 9.4x Calmar ratio across 61 live-modeled trades.',
    ],
    keyTakeaways: [
      'At scale (300K+ tests), multiple-hypothesis correction (FDR) is mandatory to separate structural alpha from lucky variance.',
      'Model friction pessimistically: 60 bps slippage and cash-lock constraints kill fragile paper edges early.',
      'Use HTML5 Canvas 2D over heavy SVG DOM nodes when rendering tens of thousands of time-series data points.',
    ],
  },
  {
    id: 'essay-4',
    slug: 'digitizing-construction-workflows-syncpro',
    date: 'Apr 04, 2026',
    isoDate: '2026-04-04',
    readTime: '4 min read',
    tags: ['#saas', '#frontend', '#founders'],
    title: 'What 25+ Site Engineer Interviews Taught Me About B2B SaaS UI',
    excerpt:
      'Why enterprise construction software fails in the field, and how we designed SyncPro at IITM Nirmaan to save project teams 4–8 hours every week.',
    content: [
      'Before writing a single component for SyncPro at the Nirmaan Pre-Incubator (IIT Madras), we interviewed 25+ civil site engineers and project managers. Their unanimous complaint was not a lack of features in legacy ERP tools—it was that logging a 30-second site update required 14 clicks across desktop-only tables.',
      'A single day of uncoordinated site delay costs mid-sized projects roughly ₹34,000 in holding losses. Yet field engineers defaulted to WhatsApp photos and voice notes because existing B2B SaaS interfaces fought their daily habits. We designed SyncPro around a thumb-friendly, WhatsApp-speed daily progress card that automatically rolls up into executive Gantt timelines and milestone-linked RTGS billing schedules.',
      'By aligning the frontend UX with how site engineers actually walk a project floor, pilot teams cut weekly reporting overhead by 4 to 8 hours—and our unit economics model demonstrated an 82% gross margin with a 1.8-month payback period.',
    ],
    keyTakeaways: [
      'In field B2B SaaS, your real competitor is not Oracle or Procore—it is WhatsApp and Excel.',
      'Design for glaring sunlight, one-handed thumb reach, and intermittent connectivity.',
      'Tie every UI workflow directly to a quantified business outcome (₹34,000/day delay reduction).',
    ],
  },
];

export const TAKES_DATA: TakeItem[] = [
  {
    id: 'take-001',
    quote:
      '“If your B2B SaaS needs a 40-page onboarding PDF, you didn’t build a product—you built a database schema and made the user your data-entry clerk.”',
    context: 'Learned the hard way after watching 25+ construction site engineers abandon legacy ERPs for WhatsApp groups.',
    date: 'Oct 2026 · Field UX',
    topic: '#product-engineering',
  },
  {
    id: 'take-002',
    quote:
      '“An offline-first PWA isn’t a ‘nice-to-have’ progressive enhancement when your user is standing next to a 130 km/h railway track with zero bars of LTE.”',
    context: 'Why IndexedDB and deterministic local vector math beat cloud round-trips every single time in safety-critical UI.',
    date: 'Sep 2026 · RailRaksha',
    topic: '#offline-first',
  },
  {
    id: 'take-003',
    quote:
      '“Running 301,000 backtests without False Discovery Rate filtering is just astrology with Python and a Bloomberg terminal aesthetic.”',
    context: 'Only 3 setups out of 301K survived our lookahead-bias and 60 bps slippage audit. Respect the null hypothesis.',
    date: 'Aug 2026 · Quant Alpha',
    topic: '#systems-rigor',
  },
  {
    id: 'take-004',
    quote:
      '“The fastest way to learn headless browser internals is trying to snipe an oversubscribed IIT Madras elective seat at 8:00:01 AM.”',
    context: '280+ automated Playwright checks a day via GitHub Actions cron. 15+ friends got their courses. Zero regrets.',
    date: 'Jul 2026 · Automation',
    topic: '#playwright',
  },
  {
    id: 'take-005',
    quote:
      '“Designers who write TypeScript and engineers who obsess over 1px hairline borders and unit economics will out-ship 10-person handoff chains.”',
    context: 'Living at the intersection of frontend craft, PostHog telemetry, and LTV/CAC math.',
    date: 'Jun 2026 · Craft',
    topic: '#frontend',
  },
  {
    id: 'take-006',
    quote:
      '“A Civil Engineer at IIT Madras building AI PWAs, quant engines, and Verlet physics portfolios makes total sense once you realize it’s all structural mechanics.”',
    context: 'Whether it is a prestressed bridge or a React state machine: isolate the load paths, test the failure modes, and ship.',
    date: 'May 2026 · IITM',
    topic: '#first-principles',
  },
];

export const ABOUT_DATA = {
  introParagraphs: [
    "I'm Shaik Vahid Basha, a frontend & product engineer at the Indian Institute of Technology Madras (B.Tech '27, pursuing dual minors in Personal & Professional Development and International Relations). I care deeply about the first ten seconds a user spends with an interface—and the systems math that keeps it fast under load.",
    'I co-founded SyncPro at the Nirmaan Pre-Incubator (IIT Madras), where we interviewed 25+ site engineers, digitized field workflows to save 4–8 hours a week, and advanced to the final stage for a ₹5,00,000 grant round. Alongside that, I drove product & frontend telemetry strategy at ZeroEka, cutting AI course generation time by 35% and lifting learner completion by 24%.',
    "I'm happiest where tactile frontend engineering meets high-leverage automation—whether that's engineering an offline-first railway safety PWA (RailRaksha), auditing 857K+ BSE filings in a 0-to-1 quant engine (+43.6% 12M net ROI), or writing a 24/7 Playwright bot so my friends don't miss oversubscribed IITM electives.",
  ],
  howIWork: [
    {
      title: 'Latency is a UX bug.',
      desc: 'Optimistic updates, IndexedDB caching, and 60fps compositor animations make complex tools feel physical.',
    },
    {
      title: 'Instrument before you guess.',
      desc: 'PostHog telemetry funnels tell you where users actually hesitate. Ship fixes that move completion metrics.',
    },
    {
      title: 'Audit your own assumptions.',
      desc: 'Whether eliminating 6 lookahead biases in a quant backtest or validating TAM with 25+ users, verify first.',
    },
    {
      title: 'Sweat the 1px details.',
      desc: 'Typography, tabular numerals, keyboard focus rings, and spring physics are what separate tools people tolerate from tools they love.',
    },
  ],
  leadershipAndScale: [
    {
      role: 'Publicity & Design Core · CEA IIT Madras',
      period: 'Jul 2025 – Apr 2026',
      highlight:
        'Directed an 11-member creative & design division, delivered keynotes across 30+ campuses in 6 cities, and drove a 3x YoY rise in national fest registrations.',
    },
    {
      role: 'Super Coordinator · CMGFS IIT Madras',
      period: 'Jul 2025 – Apr 2026',
      highlight:
        'Headed a 25-member team overseeing campus facility operations and vendor diligence; led ground logistics for Food Carnival Seasons 1–2 with 900+ footfall.',
    },
    {
      role: 'Events & Workshops Coordinator · Shaastra IITM',
      period: 'Aug 2024 – Feb 2025',
      highlight:
        'Commanded international PR & outreach onboarding global thought leaders and CXOs; managed technical panels and AIJR Proceedings for 300+ delegates.',
    },
  ],
  funFacts: [
    'Secured State Rank 1 in the State-Level Math & Science Olympiad across 500+ schools.',
    'Won two Gold Medals in the Fighting Category at the A.P. State Level Karate Championships.',
    'Certified Level VII in Excel Abacus IQR mental arithmetic after a 3-year national curriculum.',
    'Led the "Mute the Myth" empirical awareness campaign across 200+ surveyed IITM students.',
  ],
  skillsMatrix: [
    { label: 'Frontend & UI Craft', items: 'TypeScript · React 19 · Tailwind CSS · HTML5 Canvas 2D · PWA / IndexedDB · Figma' },
    { label: 'AI & Automation', items: 'Gemini Multimodal API · Playwright · LangGraph · RAG / ChromaDB · Ollama / GGUF · n8n' },
    { label: 'Backend & Telemetry', items: 'Python · FastAPI · REST APIs · SQL · GitHub Actions CI/CD · PostHog Telemetry' },
  ],
};

export const LLMS_TXT_SHORT = `# Shaik Vahid Basha — Frontend & Product Engineer (IIT Madras)

> I build interfaces & AI systems that feel crafted, resilient, and instant.

- **Name**: Shaik Vahid Basha (Roll No: CE23B115)
- **Institution**: Indian Institute of Technology Madras (B.Tech, Class of 2027 · CGPA 7.15 · Minors in Personal & Professional Development and International Relations)
- **Focus**: Frontend Engineering, Interactive Web Systems (React, TypeScript, Canvas 2D, Offline-First PWAs), AI Agentic Workflows, & Product Telemetry
- **Email**: vahidbashakanna@gmail.com
- **Location**: IIT Madras, Chennai, India

## Key Experience
- **Co-Founder & Business/Product Lead @ SyncPro (Jan 2026 – Present)**: B2B SaaS construction project-management venture incubated at Nirmaan Pre-Incubator, IIT Madras. Finalist for ₹5,00,000 grant round; validated with 25+ site engineers; saves 4–8 hrs/week per project team.
- **Product & Strategy Intern @ ZeroEka (May 2026 – Jul 2026)**: Architected AI-native Content Studio PRDs & workflows (-35% course generation time) and PostHog event telemetry (+24% course completion lift).

## Selected Engineering Projects
1. **RailRaksha AI Safety PWA**: Offline-first PWA with directional receding vector math, local IndexedDB sync, and multimodal Gemini AI for 130 km/h railway crew safety (zero false alarms).
2. **Quantitative Alpha Agentic Research**: 0-to-1 BSE quant engine & backtest visualizer across 857K+ filings and 301K tests (+43.6% 12M net ROI, 59% Win Rate, 9.4x Calmar).
3. **Elective Monitor AI Automation**: Autonomous Playwright web bot running 280+ daily checks via GitHub Actions cron, helping 15+ IITM students secure oversubscribed electives.
4. **This Portfolio System**: Custom Verlet rope physics ID badge, 2D canvas stipple field, and interactive accordion showcase in React 19 + TypeScript.
`;

export const LLMS_TXT_FULL = `${LLMS_TXT_SHORT}
## Technical Stack & Tooling
- **Languages & Core**: TypeScript, JavaScript (ES2024), Python, C, SQL, HTML5, CSS3
- **Frontend Architecture**: React 19, Tailwind CSS, Canvas 2D Rendering, Progressive Web Apps (Service Workers, IndexedDB), Verlet Physics, Accessibility (WCAG AA / ARIA)
- **AI & Agentic Systems**: Google Gemini Multimodal SDK (@google/genai), LangGraph, RAG Pipelines, ChromaDB, Hugging Face, Ollama, LM Studio
- **Automation & Analytics**: Playwright Headless Browser Automation, GitHub Actions Cron, FastAPI, n8n, PostHog Event Telemetry, Figma, Google Stitch

## Scholastic & Leadership Highlights
- **State Rank 1**: State-Level Math & Science Olympiad across 500+ schools.
- **1st Place**: District Chekumuki Science Championship '21 (AIPSN & NCSTC).
- **Class X**: 10.0 CGPA · **Class XII**: 95.84% (Bhashyam Junior College).
- **Publicity & Design Core (CEA, IIT Madras)**: Led 11-member creative division across 30+ campuses in 6 cities, achieving 3x YoY rise in fest registrations.
- **Super Coordinator (CMGFS, IIT Madras)**: Led 25-member operations team; managed logistics for 900+ student footfall at Food Carnival Seasons 1–2.
- **Athletics**: Two-time Gold Medalist in Fighting Category at A.P. State Level Karate Championships.
`;
