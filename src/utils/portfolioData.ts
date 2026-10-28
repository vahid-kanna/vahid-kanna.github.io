import { ProjectItem, EssayItem, TakeItem } from './portfolioLogic';

export const PROFILE_DATA = {
  name: 'Shaik Vahid Basha',
  shortName: 'Vahid Basha',
  institution: "IIT Madras ('27)",
  roleLine: 'Product Lead & Systems Builder',
  headlinePrefix: "Hi, I'm Vahid. I build products & intelligent systems that ",
  headlineAccent: 'solve high-friction operational problems.',
  bio: 'Product Lead and venture builder at IIT Madras. Co-founder & Business Lead at SyncPro (AI delay forecasting for construction infrastructure) and creator of RailRaksha (offline-first track safety PWA). I operate where product strategy, quantitative systems, and tactile engineering converge.',
  chips: ["IIT Madras ('27)", 'Co-founder @ SyncPro', 'Creator @ RailRaksha'],
  statusMonitors: [
    { label: '[LOCATION]', value: 'IIT MADRAS · CHENNAI' },
    { label: '[VENTURE]', value: 'SYNCPRO // NIRMAAN PRE-INCUBATOR' },
    { label: '[IMPACT]', value: 'RAILRAKSHA // OFFLINE-FIRST PWA' },
    { label: '[FOCUS]', value: 'PRODUCT MANAGEMENT · SYSTEMS STRATEGY' },
  ],
  heritageNote:
    'Son of an Indian Railways Gang Mate (South Central Railway, SKM–UPD section) — which inspired RailRaksha.tech. Driven by ground-truth product discovery at Nirmaan Pre-Incubator, macro-infrastructure strategy, and quantitative systems design.',
  email: 'vahidbashaunique@gmail.com',
  resumePdfUrl: '/assets/aistudio/Product_Management__uploaded_now_523c560a.pdf',
  socials: {
    github: 'https://github.com/vahid-kanna',
    railrakshaRepo: 'https://github.com/vahid-kanna/RailRaksha',
    railrakshaLive: 'https://railraksha.tech',
    syncproLive: 'https://syncpro.org',
    linkedin: 'https://www.linkedin.com/in/shaik-vahid-basha',
    x: 'https://x.com/vahidbasha_iitm',
  },
  currentlyPlaying: {
    track: 'Product Strategy & Systems',
    artist: 'Nirmaan Pre-Incubator · IIT Madras',
    album: 'SyncPro.org & RailRaksha.tech Telemetry',
    status: "IIT MADRAS ('27) · PRODUCT LEAD",
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'syncpro',
    slug: 'syncpro-org',
    year: '2026',
    stars: 48,
    featured: true,
    title: 'SyncPro (syncpro.org)',
    shortDesc:
      'AI-powered construction delay-prediction & site-to-schedule reconciliation platform incubated at Nirmaan Pre-Incubator, IIT Madras.',
    details:
      'Co-founded and led Product, GTM & Business Strategy for SyncPro, advancing to the final stage for a ₹5,00,000 grant round at IIT Madras. Conducted 25+ customer discovery interviews with enterprise contractors and project directors to architect AI delay-prediction models, contractor risk scoring, and automated daily site-to-schedule reconciliation across multi-crore infrastructure builds.',
    metrics: [
      '₹5,00,000 Nirmaan IITM incubation finalist',
      '4–8 hrs/week saved per field engineering team',
      '₹34,000/day holding loss exposure mitigated · 82% GM',
    ],
    tags: ['Product Strategy', 'AI Delay Prediction', 'B2B SaaS', 'Unit Economics'],
    codeUrl: 'https://github.com/vahid-kanna',
    liveUrl: 'https://syncpro.org',
    category: 'product',
    architectureNotes: [
      'AI-driven critical-path delay prediction & contractor risk scoring reconciling field logs against baseline CPM/Gantt schedules.',
      'Validated ₹4,200 Cr Indian construction tech TAM ($11.7B global) with a 1.8-month CAC payback and 126% customer gross ROI.',
      'WhatsApp-speed mobile field capture paired with milestone-linked RTGS billing and executive portfolio telemetry.',
    ],
  },
  {
    id: 'railraksha',
    slug: 'railraksha-pwa',
    year: '2026',
    stars: 64,
    featured: true,
    title: 'RailRaksha (railraksha.tech)',
    shortDesc:
      'Offline-first AI railway crew safety PWA built for Indian Railways trackmen on the SKM–UPD corridor—preventing 130 km/h collisions with zero false alarms.',
    details:
      'Deeply personal mission: built for my father, a Gang Mate on the Indian Railways (South Central Railway, SKM–UPD section), and thousands of track maintenance workers. Engineered directional receding vector collision math to alert crews of approaching 130 km/h express trains with zero false alarms, paired with an offline-first IndexedDB gang diary and vernacular voice + Gemini multimodal IRPWM defect logging.',
    metrics: [
      '130 km/h directional vector collision foresight',
      '0 false alarms via receding dot-product filtering',
      'Vernacular voice gang diary + IRPWM AI vision',
    ],
    tags: ['Offline-First PWA', 'Vector Kinematics', 'Gemini Multimodal', 'Safety Systems'],
    codeUrl: 'https://github.com/vahid-kanna/RailRaksha',
    liveUrl: 'https://railraksha.tech',
    category: 'frontend',
    architectureNotes: [
      'Service Worker + local IndexedDB outbox guaranteeing 100% reliability in zero-connectivity railway sections.',
      'Real-time GPS heading & Haversine receding vector computation suppressing false alarms from receding or adjacent-loop trains.',
      'Vernacular speech-to-IRPWM structured inspection tables built for gloved hands under harsh trackside sunlight.',
    ],
  },
  {
    id: 'quant-alpha',
    slug: 'bse-quant-engine',
    year: '2026',
    stars: 39,
    featured: true,
    title: 'BSE / NSE Quant Alpha Engine',
    shortDesc:
      '0-to-1 quantitative corporate filing & order-book anomaly engine parsing 857K+ BSE filings and 301K statistical hypothesis tests.',
    details:
      'Directed the architecture of an agentic quantitative research pipeline and high-density backtest audit workbench. Eliminated 6 distinct lookahead biases (broadcast lag, unadjusted corporate actions, survivorship leaks), modeled pre-market cash locks, gap-down fills, and 60 bps slippage to isolate 3 False Discovery Rate (FDR) certified strategies delivering +43.6% 12M net ROI.',
    metrics: [
      '857K+ BSE filings parsed · 301K hypothesis tests',
      '+43.6% 12M net ROI · 59% win rate · 4.6% max DD',
      '9.4x Calmar ratio across 61 live-modeled trades',
    ],
    tags: ['Quantitative Modeling', 'FDR Statistics', 'Python / FastAPI', 'Canvas 2D'],
    codeUrl: 'https://github.com/vahid-kanna',
    liveUrl: 'https://github.com/vahid-kanna',
    category: 'ai-systems',
    architectureNotes: [
      'Benjamini-Hochberg False Discovery Rate (FDR) statistical certification pipeline eliminating p-hacked noise across 301,000+ scans.',
      'Point-in-time exchange broadcast timestamp auditor with pessimistic 60 bps slippage and illiquidity gap modeling.',
      'Custom HTML5 Canvas 2D underwater drawdown & equity surface renderer handling 300K+ permutations at 60fps.',
    ],
  },
  {
    id: 'elective-monitor',
    slug: 'elective-monitor-bot',
    year: '2025',
    stars: 29,
    featured: true,
    title: 'IITM Course & Elective Monitor',
    shortDesc:
      'Autonomous headless Playwright seat-vacancy monitor running 280+ daily checks to capture oversubscribed IIT Madras electives.',
    details:
      'Identified acute student friction during IIT Madras add/drop registration windows and engineered a 24/7 autonomous Playwright monitoring bot. Orchestrated via zero-cost GitHub Actions cron jobs with stateful DOM diffing and sub-minute SMTP/Telegram alerts, enabling 15+ students to secure high-demand interdisciplinary electives.',
    metrics: [
      '280+ automated headless checks every 24 hours',
      '20+ oversubscribed IITM courses tracked continuously',
      '15+ students placed via sub-minute vacancy alerts',
    ],
    tags: ['Playwright Automation', 'Systems Design', 'GitHub Actions', 'TypeScript'],
    codeUrl: 'https://github.com/vahid-kanna',
    liveUrl: 'https://github.com/vahid-kanna',
    category: 'ai-systems',
    architectureNotes: [
      'Resilient headless browser session & DOM state-diffing engine immune to legacy academic portal layout shifts.',
      'Zero-cost serverless cron scheduling on GitHub Actions with deduplicated alert locks.',
      'Instant multi-channel notification dispatch with direct registration action links.',
    ],
  },
  {
    id: 'zeroeka-studio',
    slug: 'zeroeka-content-studio',
    year: '2026',
    stars: 24,
    featured: true,
    title: 'ZeroEka AI Content Studio & Telemetry',
    shortDesc:
      'Product strategy, PRDs, and PostHog funnel instrumentation for a B2B EdTech SaaS—cutting course creation time by 35% and lifting completion by 24%.',
    details:
      'Led Product & Strategy execution at ZeroEka: authored comprehensive PRDs for an AI-native Content Studio automating raw document ingestion (-35% creation time) and instrumented full-funnel PostHog event telemetry across learner cohorts (+24% completion lift). Built a 3-tier enterprise pricing calculator for 30-day B2B PoCs.',
    metrics: [
      '-35% course generation time via AI ingestion PRD',
      '+24% learner completion lift from PostHog funnels',
      '3-tier B2B SaaS pricing & 30-day PoC ROI model',
    ],
    tags: ['Product Management', 'PostHog Analytics', 'B2B Pricing', 'RAG Workflows'],
    codeUrl: 'https://github.com/vahid-kanna',
    liveUrl: 'https://github.com/vahid-kanna',
    category: 'product',
    architectureNotes: [
      'Cohort drop-off diagnostics pinpointing exact onboarding hesitation states and pre-fetching initial lesson payloads.',
      'AI document-to-syllabus pipeline spec with inline source citations and human-in-the-loop quality gates.',
      'Enterprise unit-economics simulator mapping token compute costs against tiered seat licensing.',
    ],
  },
  {
    id: 'this-site',
    slug: 'vahid-systems-portfolio',
    year: '2026',
    stars: 31,
    featured: true,
    title: 'Tactile Systems Portfolio (This Site)',
    shortDesc:
      'Custom 11-node dual-strap Verlet lanyard physics, 2D stipple particle field, and machine-readable llms.txt specification.',
    details:
      'Designed and engineered from first principles to blend industrial hardware aesthetics with product storytelling: 11-node V-shaped Verlet physics lanyard with 3D foreshortened strap typography, interactive 2D canvas stipple field with shockwave ripples, 3D orbital particle cards, and an AI-agent-ready llms.txt modal.',
    metrics: [
      '14-iteration dual-strap Verlet solver at 60fps',
      'Zero external physics engines — pure TypeScript',
      'Full WCAG AA keyboard & AI agent (llms.txt) parity',
    ],
    tags: ['Verlet Physics', 'Canvas 2D', 'React 19', 'Industrial UI'],
    codeUrl: 'https://github.com/vahid-kanna',
    liveUrl: '#hero',
    category: 'frontend',
    architectureNotes: [
      'Catmull-Rom spline interpolation with 3D cosine twist shading and character-by-character curved text projection.',
      'DPR-aware 2D stipple matrix responding to cursor repulsion and custom event impulse waves.',
      'Structured llms.txt / llms-full.txt dossier for automated recruiter agents and LLM context ingestion.',
    ],
  },
];

export const ESSAYS_DATA: EssayItem[] = [
  {
    id: 'essay-1',
    slug: 'building-railraksha-for-my-father-130kmh',
    date: 'Feb 18, 2026',
    isoDate: '2026-02-18',
    readTime: '6 min read',
    tags: ['#product', '#pwa', '#safety-systems'],
    title: 'Building RailRaksha.tech for My Father: Offline-First Safety Near 130 km/h Trains',
    excerpt:
      'My father is a Gang Mate on the Indian Railways (SKM–UPD section). Here is how we engineered directional receding vector math, local IndexedDB sync, and vernacular voice AI so track crews get zero false alarms.',
    content: [
      'Railway track safety was never an abstract case study for me—my father works as a Gang Mate on the Indian Railways (South Central Railway, SKM–UPD section). When a maintenance gang is working on live ballast with express trains approaching at 130 km/h, a cloud timeout or a false alarm is life-critical.',
      'Traditional proximity apps fail in two ways: they assume continuous 4G coverage along rail corridors, and they trigger constant false positives whenever a train is receding or running on an adjacent loop. To fix both, we architected RailRaksha (railraksha.tech) as an offline-first Progressive Web App powered by local IndexedDB queues and directional receding vector kinematics. By computing the dot product of the relative position and velocity vectors over a rolling GPS window, RailRaksha immediately suppresses alerts the instant a train passes the crew.',
      'Beyond collision warnings, Gang Mates spend hours every evening transcribing track defects into Indian Railways Permanent Way Manual (IRPWM) registers. We integrated a vernacular voice diary and multimodal Gemini vision pipeline that works with dirty gloves in bright sunlight—queuing defect reports locally offline and syncing structured IRPWM rows the moment connectivity returns.',
    ],
    keyTakeaways: [
      'First-principles empathy beats desk research: design for gloved hands, 42°C trackside glare, and zero-bar dead zones.',
      'Replace naive geofence circles with directional receding vector math to achieve zero false alarms.',
      'Pair local-first IndexedDB storage with vernacular voice interfaces so field crews never fight a keyboard.',
    ],
  },
  {
    id: 'essay-2',
    slug: 'syncpro-delay-prediction-unit-economics',
    date: 'Apr 04, 2026',
    isoDate: '2026-04-04',
    readTime: '5 min read',
    tags: ['#product', '#saas', '#founders'],
    title: 'From 25+ Site Interviews to SyncPro.org: Predicting Construction Delays Before They Compound',
    excerpt:
      'How we validated a ₹4,200 Cr construction-tech market at IITM Nirmaan, modeled ₹34,000/day delay exposure, and built AI site-to-schedule reconciliation.',
    content: [
      'When we started SyncPro (syncpro.org) at the Nirmaan Pre-Incubator at IIT Madras, we resisted the urge to write code on day one. Instead, we spent weeks interviewing 25+ site engineers, contractors, and project directors. Their unanimous bottleneck was not a lack of desktop Gantt charts—it was the chasm between daily field reality on WhatsApp and the master schedule in the head office.',
      'Every uncoordinated day of delay on a mid-sized infrastructure project burns roughly ₹34,000 in holding and equipment standby losses. Yet legacy ERPs require 14 clicks to log a single update. We architected SyncPro around automated site-to-schedule reconciliation and AI delay-prediction models that score contractor slippage risk weeks before a milestone breaches.',
      'By tying field progress directly to milestone-linked RTGS billing and executive risk dashboards, pilot teams saved 4 to 8 hours per week. Our commercial model proved an 82% gross margin, a 1.8-month CAC payback period, and a 126% net ROI for contractors by preventing just 4 days of project slippage—propelling SyncPro to the final stage of the ₹5,00,000 Nirmaan grant round.',
    ],
    keyTakeaways: [
      'In infrastructure B2B SaaS, your real competitor is WhatsApp + Excel: match WhatsApp’s speed while delivering ERP-grade auditability.',
      'Anchor pricing and product specs to a hard financial metric (₹34,000/day holding loss prevention).',
      'Predictive contractor risk scoring turns passive project tracking into an active margin-protection engine.',
    ],
  },
  {
    id: 'essay-3',
    slug: 'auditing-lookahead-bias-quant-ui',
    date: 'Jan 29, 2026',
    isoDate: '2026-01-29',
    readTime: '6 min read',
    tags: ['#quant', '#systems', '#product'],
    title: 'Eliminating 6 Lookahead Biases Across 857K+ BSE Filings & 301K Hypothesis Tests',
    excerpt:
      'Why 99% of retail and academic backtests fail in live markets—and how Benjamini-Hochberg False Discovery Rate (FDR) filtering isolated +43.6% net alpha.',
    content: [
      'When you test 301,000 quantitative hypotheses across 857,000+ Bombay Stock Exchange corporate filings, standard p-value thresholds guarantee hundreds of false "miracle" strategies. Building our BSE/NSE quantitative research engine from 0 to 1 required treating every backtest as guilty of data leakage until proven innocent.',
      'Our audit uncovered and systematically eliminated 6 subtle lookahead biases—including exchange broadcast timestamp lag versus PDF creation time, unadjusted corporate actions, and gap-down illiquidity locks. We enforced pre-market cash-lock accounting and a strict 60 bps round-trip slippage penalty inside the execution engine.',
      'Applying Benjamini-Hochberg False Discovery Rate (FDR) certification pruned 301,000 candidates down to just 3 structural setups. Across 61 live-modeled trades, the certified portfolio delivered +43.6% 12M net ROI, a 59% win rate, a 4.6% maximum drawdown, and a 9.4x Calmar ratio.',
    ],
    keyTakeaways: [
      'At scale (300K+ tests), False Discovery Rate (FDR) control is mandatory to separate structural edge from variance.',
      'Bake execution friction (60 bps slippage + cash locks) into the core simulator, never as a post-hoc footnote.',
      'Productizing quant research requires visual diagnostics that make failure modes and drawdowns impossible to hide.',
    ],
  },
  {
    id: 'essay-4',
    slug: 'telemetry-driven-pm-zeroeka-macro-systems',
    date: 'Jul 14, 2026',
    isoDate: '2026-07-14',
    readTime: '4 min read',
    tags: ['#product', '#telemetry', '#strategy'],
    title: 'Telemetry-First Product Management: Lifting Completion by 24% & Macro Systems Thinking',
    excerpt:
      'Lessons from ZeroEka and macro-policy analysis: how granular PostHog funnels, AI ingestion PRDs, and institutional incentive design solve adoption bottlenecks.',
    content: [
      'Whether you are diagnosing learner drop-off in a B2B EdTech SaaS or analyzing last-mile public infrastructure delivery, the core analytical failure is identical: mistaking supply-side output for demand-side adoption.',
      'At ZeroEka, subject-matter experts were bottlenecked by manual curriculum authoring, while learners dropped off between enrollment and their first interactive checkpoint. By authoring the PRD for an AI-native Content Studio with automated document ingestion, we cut course creation time by 35%. Simultaneously, PostHog cohort telemetry pinpointed onboarding cognitive overload—and our targeted UX interventions lifted course completion by 24%.',
      'Pairing micro-level product telemetry (PostHog funnels, unit economics, 30-day enterprise PoC calculators) with macro-level institutional thinking (infrastructure systems, public governance, and Indian Railways safety) is the exact lens I bring to every product I build.',
    ],
    keyTakeaways: [
      'Measure systems by completed outcomes (+24% completion), never by features shipped.',
      'Pair AI workflow automation (-35% authoring time) with clear human-in-the-loop verification gates.',
      'The best Product Managers think simultaneously at the 10-millisecond UI level and the 10-year macro-incentive level.',
    ],
  },
];

export const TAKES_DATA: TakeItem[] = [
  {
    id: 'take-001',
    quote:
      '“When your user is my father standing beside a 130 km/h railway track on the SKM–UPD corridor, an offline-first PWA isn’t a ‘progressive enhancement’—it’s the entire product.”',
    context: 'Why we built RailRaksha.tech with local IndexedDB queues, vernacular voice logs, and directional receding vector math.',
    date: '2026 · RailRaksha.tech',
    topic: '#mission-critical-pm',
  },
  {
    id: 'take-002',
    quote:
      '“In Indian infrastructure SaaS, your real competitor isn’t Oracle or Procore—it’s a site engineer’s WhatsApp group and a crumpled pocket notebook.”',
    context: 'Validated across 25+ construction site interviews while building SyncPro.org at IIT Madras Nirmaan.',
    date: '2026 · SyncPro.org',
    topic: '#b2b-strategy',
  },
  {
    id: 'take-003',
    quote:
      '“Running 301,000 quant backtests without False Discovery Rate (FDR) filtering and 60 bps slippage is just astrology with Python and a dark-mode chart.”',
    context: 'How eliminating 6 lookahead biases across 857K+ BSE filings isolated 3 real setups (+43.6% net ROI, 9.4x Calmar).',
    date: '2026 · Quant Alpha',
    topic: '#quantitative-rigor',
  },
  {
    id: 'take-004',
    quote:
      '“A Product Manager who can write the PRD, model the LTV/CAC unit economics, query PostHog SQL, and ship the TypeScript prototype is a 10x force multiplier.”',
    context: 'Why collapsing the wall between business strategy and systems engineering is the ultimate unfair advantage.',
    date: '2026 · Product Craft',
    topic: '#product-leadership',
  },
  {
    id: 'take-005',
    quote:
      '“Studying macro-governance by morning and shipping AI construction & rail-safety systems by night teaches you one truth: incentives and last-mile friction govern everything.”',
    context: 'At IIT Madras—connecting public-sector infrastructure scale with venture velocity.',
    date: '2026 · Macro Horizons',
    topic: '#systems-thinking',
  },
  {
    id: 'take-006',
    quote:
      '“If an academic portal makes 500 students refresh a table at 8:00 AM for elective seats, the correct product response is a 24/7 Playwright cron bot.”',
    context: '280+ automated checks/day on GitHub Actions. 15+ peers secured their IITM electives. Friction is optional.',
    date: '2025 · IITM Automation',
    topic: '#agency',
  },
];

export const ABOUT_DATA = {
  introParagraphs: [
    "I'm Shaik Vahid Basha (Vahid)—a Product Lead, Venture Co-Founder, and Systems Builder at IIT Madras ('27), pursuing dual minors in Personal & Professional Development and International Relations.",
    'My work sits at the intersection of Product Management, Business Strategy, Quantitative Modeling, and Infrastructure AI. At the Nirmaan Pre-Incubator (IIT Madras), I co-founded SyncPro (syncpro.org)—interviewing 25+ construction site engineers, building AI delay-prediction & site-to-schedule reconciliation workflows that save 4–8 hours/week, and advancing as a finalist for a ₹5,00,000 grant round.',
    'My proudest build is deeply personal: my father serves as a Gang Mate on the Indian Railways (South Central Railway, SKM–UPD section). Seeing the hazards track maintenance crews face daily inspired me to build RailRaksha (railraksha.tech)—an offline-first PWA using directional receding vector math and vernacular voice AI to prevent accidents near 130 km/h express trains with zero false alarms.',
    'Beyond startups and shipping code, I explore macro-infrastructure policy, public governance, and quantitative market microstructure (+43.6% 12M net ROI across 857K+ BSE filings).',
  ],
  howIWork: [
    {
      title: 'Ground-Truth Discovery First.',
      desc: 'Whether walking 25+ construction sites for SyncPro or designing for railway Gang Mates on the SKM–UPD line, real product specs come from the field—not a slide deck.',
    },
    {
      title: 'Unit Economics & Strategy Built-In.',
      desc: 'Every feature must map to a P&L lever: ₹34,000/day delay mitigation, 82% SaaS gross margin, 1.8-month payback, or +24% cohort completion lift.',
    },
    {
      title: 'Statistical & Quantitative Honesty.',
      desc: 'Eliminate lookahead bias, enforce False Discovery Rate (FDR) controls across 301K tests, and instrument PostHog funnels before claiming impact.',
    },
    {
      title: 'Full-Stack Agency ("Engineering with Feeling").',
      desc: 'I bridge boardroom strategy and terminal execution—writing the PRD, modeling the TAM, and shipping the offline-first PWA or Playwright system myself.',
    },
  ],
  leadershipAndScale: [
    {
      role: 'Co-Founder & Business / Product Lead · SyncPro (Nirmaan IITM)',
      period: 'Jan 2026 – Present',
      highlight:
        'Spearheaded GTM, unit economics (82% GM, 126% ROI), and AI delay-prediction product specs; finalist for ₹5,00,000 Nirmaan seed grant at IIT Madras.',
    },
    {
      role: 'Publicity & Design Core · CEA IIT Madras',
      period: 'Jul 2025 – Apr 2026',
      highlight:
        'Directed an 11-member creative & outreach division across 30+ campuses in 6 cities, delivering keynotes and driving a 3x YoY surge in national fest registrations.',
    },
    {
      role: 'Super Coordinator · CMGFS IIT Madras',
      period: 'Jul 2025 – Apr 2026',
      highlight:
        'Headed a 25-member operations team overseeing campus facility governance, vendor diligence, and Food Carnival Seasons 1–2 for 900+ students.',
    },
    {
      role: 'Events & Workshops Coordinator · Shaastra IITM',
      period: 'Aug 2024 – Feb 2025',
      highlight:
        'Led international PR & speaker outreach onboarding global CXOs and policy leaders; managed technical panels and AIJR Proceedings for 300+ delegates.',
    },
  ],
  funFacts: [
    'Son of an Indian Railways Gang Mate (SCR SKM–UPD section) — the inspiration behind RailRaksha.tech.',
    'Secured State Rank 1 in the State-Level Math & Science Olympiad across 500+ schools.',
    'Two-time State Gold Medalist (Fighting Category) at the State-Level Karate Championships.',
    'Focused on macro-infrastructure strategy, public policy & quantitative systems · Dog dad to Raju.',
  ],
  skillsMatrix: [
    {
      label: 'Product & Strategy',
      items: 'PRD Architecture · GTM & TAM Sizing · SaaS Unit Economics (LTV/CAC) · PostHog Funnel Telemetry · User Discovery · Figma',
    },
    {
      label: 'Quant & AI Systems',
      items: 'Hypothesis Testing (FDR) · Backtest Auditing · Gemini Multimodal SDK · LangGraph · RAG / ChromaDB · Playwright Automation',
    },
    {
      label: 'Full-Stack Execution',
      items: 'TypeScript · React 19 · Python / FastAPI · Offline-First PWAs (IndexedDB) · SQL · HTML5 Canvas 2D · GitHub Actions CI/CD',
    },
  ],
};

export const LLMS_TXT_SHORT = `# Shaik Vahid Basha (Vahid Basha) — Product Lead & Systems Builder · IIT Madras ('27)

> Hi, I'm Vahid. I build products & intelligent systems that solve high-friction operational problems.

- **Name**: Shaik Vahid Basha (Vahid Basha)
- **Institution**: IIT Madras ('27) · Dual Minors in Personal & Professional Development and International Relations
- **Title / Role**: Product Lead & Systems Builder
- **Career Focus**: Product Management (PM), Business Strategy, Management Consulting, Quantitative & Analytics Systems, Infrastructure AI
- **Email**: vahidbashaunique@gmail.com
- **GitHub**: https://github.com/vahid-kanna
- **LinkedIn**: https://www.linkedin.com/in/shaik-vahid-basha
- **Live Ventures**: https://syncpro.org | https://railraksha.tech (Repo: https://github.com/vahid-kanna/RailRaksha)

## Flagship Ventures & Product Impact
1. **SyncPro (https://syncpro.org) — Co-Founder & Business/Product Lead (Nirmaan Pre-Incubator, IIT Madras)**:
   - AI-driven construction delay prediction, contractor risk scoring, and automated site-to-schedule reconciliation for multi-crore infrastructure projects.
   - Finalist for ₹5,00,000 grant round; validated across 25+ site engineer interviews; saves 4–8 hrs/week per team; mitigates ₹34,000/day holding loss exposure with 82% gross margin and 126% customer ROI.
2. **RailRaksha (https://railraksha.tech | https://github.com/vahid-kanna/RailRaksha) — Creator & Product Architect**:
   - Offline-first AI safety PWA built for my father (Gang Mate, Indian Railways SCR SKM–UPD section) and track maintenance crews.
   - Uses directional receding vector collision math to warn crews of approaching 130 km/h express trains with zero false alarms, plus vernacular voice gang diaries and Gemini multimodal IRPWM defect classification.
3. **ZeroEka — Product & Strategy Intern**:
   - Authored AI-native Content Studio PRDs (-35% course generation time), instrumented PostHog cohort telemetry (+24% course completion lift), and structured 3-tier B2B SaaS pricing unit economics.
4. **BSE / NSE Quantitative Alpha Engine — Lead Researcher & Systems Architect**:
   - 0-to-1 quant engine parsing 857K+ BSE filings and 301K statistical hypothesis tests. Eliminated 6 lookahead biases, modeled 60 bps slippage, and isolated 3 FDR-certified setups (+43.6% 12M net ROI, 59% win rate, 4.6% max DD, 9.4x Calmar).
5. **IITM Course & Elective Vacancy Monitor**:
   - Autonomous headless Playwright bot running 280+ daily checks via GitHub Actions cron across 20+ oversubscribed IITM courses, helping 15+ students secure seats.
`;

export const LLMS_TXT_FULL = `${LLMS_TXT_SHORT}
## Product, Quantitative & Engineering Capabilities
- **Product Management & Consulting**: Customer Discovery (25+ field interviews), PRD Specification, TAM/SAM/SOM Sizing (₹4,200 Cr Indian Construction Tech), B2B SaaS Pricing & Unit Economics (LTV/CAC, 82% GM, 1.8-mo payback), PostHog Funnel & Cohort Telemetry
- **Quantitative & AI Systems**: Statistical Hypothesis Testing, Benjamini-Hochberg False Discovery Rate (FDR), Lookahead Bias Auditing, Google Gemini Multimodal SDK, LangGraph, RAG / ChromaDB, Playwright Automation
- **Engineering Stack**: TypeScript, Python, SQL, React 19, FastAPI, Offline-First PWAs (Service Workers, IndexedDB), HTML5 Canvas 2D, GitHub Actions

## Scholastic & Institutional Leadership at IIT Madras
- **Publicity & Design Core (CEA, IIT Madras)**: Directed 11-member division across 30+ campuses in 6 cities; drove 3x YoY rise in national fest registrations.
- **Super Coordinator (CMGFS, IIT Madras)**: Led 25-member team overseeing campus facility operations and Food Carnival Seasons 1–2 (900+ footfall).
- **Events & Workshops Coordinator (Shaastra, IIT Madras)**: Led international outreach & AIJR Proceedings for 300+ delegates.
- **Honors**: State Rank 1 in State-Level Math & Science Olympiad (500+ schools); 1st Place District Chekumuki Science Championship; 2x State Gold Medalist in Karate (Fighting Category); Class X 10.0 CGPA & Class XII 95.84%.
`;
