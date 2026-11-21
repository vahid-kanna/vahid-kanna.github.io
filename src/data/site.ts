export const SITE = {
  name: 'Shaik Vahid Basha',
  shortName: 'Vahid',
  affiliation: "IIT Madras '27",
  location: 'Chennai, India',
  roleLine: 'Product & business builder',
  email: 'vahidbashaunique@gmail.com',
  url: 'https://vahidbasha.me',
  links: {
    github: 'https://github.com/vahid-kanna',
    linkedin: 'https://www.linkedin.com/in/shaik-vahid-basha',
    syncpro: 'https://syncpro.org/',
    railraksha: 'https://railraksha.tech/',
    railrakshaRepo: 'https://github.com/vahid-kanna/RailRaksha',
    zamp: 'https://zamp.vahidbasha.me/',
    zampRepo: 'https://github.com/vahid-kanna/complete-case-study-request-2',
  },
  resumeMailto:
    'mailto:vahidbashaunique@gmail.com?subject=Resume%20request%20%E2%80%94%20vahidbasha.me&body=Hi%20Vahid%2C%0A%0ACould%20you%20share%20your%20latest%20resume%20for%20%5Brole%20%2F%20team%5D%3F',
  contactMailto:
    'mailto:vahidbashaunique@gmail.com?subject=Hello%20from%20vahidbasha.me',
} as const;

export interface ExperienceEntry {
  period: string;
  role: string;
  organization: string;
  kind: 'Venture' | 'Internship' | 'Campus Operations';
  summary: string;
}

export const EXPERIENCE_LEDGER: ExperienceEntry[] = [
  {
    period: 'Jan 2026 – Present',
    role: 'Co-Founder & Business Lead',
    organization: 'SyncPro · Nirmaan Pre-Incubator, IIT Madras',
    kind: 'Venture',
    summary:
      'Leading customer discovery (25+ site interviews), product scoping, contractor pilot workflows, and commercial modeling for a construction project-controls workspace.',
  },
  {
    period: 'May 2026 – Jul 2026',
    role: 'Product & Strategy Intern',
    organization: 'ZeroEka · B2B EdTech SaaS',
    kind: 'Internship',
    summary:
      'Wrote PRDs for an AI-assisted document-to-course studio, audited onboarding funnel drop-offs in PostHog, and structured 3-tier B2B pricing with a 30-day PoC framework.',
  },
  {
    period: 'Jul 2025 – Apr 2026',
    role: 'Super Coordinator',
    organization: 'CMGFS · IIT Madras',
    kind: 'Campus Operations',
    summary:
      'Led a 25-member student team running campus facility audits, food-vendor price benchmarking, and Food Carnival operations drawing 900+ students per season.',
  },
  {
    period: 'Aug 2024 – Feb 2025',
    role: 'Events & Workshops Coordinator',
    organization: 'Shaastra · IIT Madras',
    kind: 'Campus Operations',
    summary:
      'Handled international speaker outreach, workshop logistics for 300+ attendees, and coordination with faculty editors on AIJR conference proceedings.',
  },
  {
    period: 'Apr 2024 – May 2025',
    role: 'Chief Inspector & Coordinator',
    organization: 'MMCC · IIT Madras',
    kind: 'Campus Operations',
    summary:
      'Ran weekly kitchen hygiene and SLA compliance audits across campus dining halls and served as the student liaison resolving dining grievances.',
  },
];

export const ABOUT_CONTENT = {
  intro:
    "I'm Shaik Vahid Basha — most people call me Vahid. I'm a student at IIT Madras (Class of 2027), originally from Ulavapadu in Andhra Pradesh.",
  paragraphs: [
    'Most of the software I build starts with watching someone struggle through a repetitive, poorly supported real-world workflow. My father works on railway track maintenance along the SKM–UPD corridor; watching how field crews actually work in low-signal stretches led to RailRaksha. Talking with site engineers and planners who reconcile daily progress over scattered WhatsApp voice notes led to SyncPro.',
    'My work sits across three habits: talking to users before writing code, checking whether the business numbers actually make sense, and building working prototypes so assumptions get tested against real inputs instead of staying in slide decks.',
    'Recently I have focused on operational AI workflows — systems where an application reads real documents, checks rules against structured records, and knows when to pause for a human reviewer instead of guessing.',
    'Outside building and studying, I grew up competing in state-level karate, still enjoy interhostel dance at IIT Madras, and spend whatever free time I get back home with my dog, Raju.',
  ],
  principles: [
    {
      title: 'Start at the workflow, not the model',
      detail:
        'Before picking an architecture, watch how the job happens today — usually a phone call, a spreadsheet, or a notebook — and design for that reality.',
    },
    {
      title: 'Separate observed facts from models',
      detail:
        'A financial model, a historical backtest, and a live customer pilot are three different kinds of evidence. Labeling them honestly makes product decisions sharper.',
    },
    {
      title: 'Fail safely when inputs are messy',
      detail:
        'In construction schedules, railway field tools, or invoice approvals, halting cleanly and asking a human is far better than silently writing a confident mistake.',
    },
  ],
};
