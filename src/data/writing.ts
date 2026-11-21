export interface FieldNote {
  slug: string;
  date: string;
  isoDate: string;
  title: string;
  summary: string;
  topic: string;
  paragraphs: string[];
}

const RAW_FIELD_NOTES: FieldNote[] = [
  {
    slug: 'shadow-schedule-trust',
    date: 'October 2026',
    isoDate: '2026-10-18',
    title: 'Why site teams ignore software that overwrites their schedule',
    summary:
      'What 25+ conversations with construction planners and site engineers taught us about designing SyncPro around a review gate instead of blind automation.',
    topic: 'Product discovery · SyncPro',
    paragraphs: [
      'When we first started talking to site engineers and project planners for SyncPro, our naive instinct sounded clean on a whiteboard: collect daily field updates over WhatsApp, parse them with an AI pipeline, and update the master construction schedule automatically.',
      'It took fewer than ten interviews to realize almost no experienced planner would ever let that touch a live project.',
      'On paper, automating schedule updates sounds like pure upside. In practice, a master Primavera P6 or MS Project baseline is not just a to-do list — it is a legal and commercial reference document. Dates inside that file govern subcontractor billing milestones, extension-of-time claims, and liquidated damages disputes. If an automated system misreads a short voice note from a noisy site and shifts a critical-path activity by four days, the planner does not save time; they inherit an audit mess they now have to explain to a project director.',
      'Meanwhile, the person sending the update on site has the opposite constraint. Site supervisors are coordinating crews, concrete pours, and material deliveries in real time. They will never log into a complex desktop scheduling tool at 7 PM to update activity IDs. Their real tool is already in their pocket: a quick voice note, a photo, and a group chat.',
      'That tension gave us the most important product decision in SyncPro: separating capture from commitment through a parallel Shadow Schedule.',
      'Instead of overwriting the official baseline, field updates land in a structured review queue. Each incoming message is matched against candidate activities in the schedule graph, checked against corroborating context like photos or prerequisite tasks, and assigned a transparent confidence breakdown. Nothing modifies the contractual baseline without crossing an explicit gate — either a planner clicks to approve, or only high-confidence corroborated items qualify under rules the team controls.',
      'The lesson generalized far beyond construction. Whenever you introduce AI into an operational workflow with financial or legal stakes, "fully autonomous" is often the fastest way to get rejected. Designing a calm, inspectable review boundary does not make the product weaker — it is usually the reason people adopt it at all.',
    ],
  },
  {
    slug: 'offline-first-skm-upd',
    date: 'September 2026',
    isoDate: '2026-09-26',
    title: 'Designing for dead zones and bright sunlight on the SKM–UPD corridor',
    summary:
      'Field constraints from building RailRaksha with my father’s railway maintenance work in mind — and why honesty about technical limits matters most.',
    topic: 'Field UX · RailRaksha',
    paragraphs: [
      'Most software gets designed on a bright laptop screen inside a room with reliable Wi-Fi. RailRaksha started from the opposite environment: watching how my father works as a Gang Mate along the SKM–UPD railway section in Andhra Pradesh.',
      'Out on the track, three constraints hit immediately. First, cellular signal disappears across rural stretches and cuttings right when you need a page to open. Second, midday glare washes out subtle gray-on-gray interfaces within seconds. Third, the people doing the work think and speak naturally in Telugu, not English technical jargon, and use modest Android phones where heavy web bundles stall or reload.',
      'Those three facts dictated almost every engineering choice in RailRaksha. Rather than wrapping the app in a large client framework, I built it in plain JavaScript with a Service Worker cache and local IndexedDB storage so the shell boots quickly even in airplane mode. Every primary label pairs English and Telugu directly on screen — large buttons, high contrast, zero decorative clutter.',
      'In practice, splitting the UI into clear single-purpose bottom tabs — Alert, Defect, Diary, Weather, and Manual — kept cognitive load low when someone only has one free hand. The Gang Diary writes entries straight to local IndexedDB first so a supervisor can capture daily work notes in Telugu without waiting on a spinner, and only syncs or calls cloud classification when signal returns.',
      'Equally important was being honest about what a personal browser app can and cannot do. Offline storage solves opening the app, reviewing cached corridor references, and recording daily gang diary entries without signal. It cannot magically fetch live train locations without a network, and it cannot detect unscheduled goods and freight trains that never appear on public passenger feeds.',
      'Early versions of my own portfolio copy overstated what a prototype like this could guarantee. Auditing that honestly forced a better standard: build the offline documentation and language features as solidly as possible, put the freight-train and GPS limits right inside the interface, and never present an experimental personal tool as a certified safety system.',
      'Real user empathy is not adding prettier colors to a screen. It is respecting the user’s actual phone, language, signal bars, and safety boundaries.',
    ],
  },
  {
    slug: 'failing-safely-operational-ai',
    date: 'November 2026',
    isoDate: '2026-11-12',
    title: 'Why failing safely beats guessing in operational AI',
    summary:
      'What building an Accounts Payable invoice engine and auditing quantitative backtests taught me about the hidden cost of confident mistakes.',
    topic: 'Applied AI · Evaluation',
    paragraphs: [
      'In November 2026 I built an Accounts Payable invoice workbench (zamp.vahidbasha.me) designed to move real PDF invoices from intake to a payment decision: extracting supplier and line-item totals, matching against purchase orders, checking variance rules, catching duplicates, and routing exceptions.',
      'The easiest scenario to build was the happy path — a clean digital invoice whose PO number and dollar total match to the cent. The real engineering started with the ugly edge cases: an invoice arriving with a 3.5% freight overage, a vendor omitting the PO number altogether, a resubmitted invoice formatted differently to look new, and a scanned image-only PDF containing zero selectable text.',
      'That scanned PDF case is where many AI demos quietly cheat. Rather than admitting the pipeline has no OCR engine attached, a sloppy build either guesses numbers from metadata or fabricates a plausible extraction to keep the demo looking smooth. In my workbench, image-only scans halt cleanly before matching and route straight to Manual Data Keying with an explicit reason.',
      'To keep those rules honest across changes, I paired the backend with a 14-case automated pytest regression suite covering exact 2-way matches, the 5% freight tolerance band, heuristic PO lookup, reformatted duplicate detection, and milestone drawdowns against blanket POs. Every decision writes a plain-English reason code alongside the ledger entry so an AP reviewer can inspect why the workflow approved, paused, or rejected a document in under ten seconds.',
      'I ran into the exact same principle months earlier while auditing my own Python backtesting scripts on BSE historical filings. Before auditing, backtests looked unrealistically smooth because subtle lookahead leaks — recycling 3:15 PM exit cash into 9:15 AM morning entries, ignoring gap-down openings past stop prices, or omitting statutory transaction costs — quietly inflated results. Fixing six lookahead biases and enforcing realistic friction lowered headline numbers, but turned a toy script into research I could actually defend.',
      'Whether you are processing invoices, reconciling construction progress, or evaluating a statistical signal, the hardest discipline is refusing to paper over uncertainty. Users can work with a system that says "I stopped here because the text layer is missing." They cannot trust a system that guesses quietly and hopes nobody notices.',
    ],
  },
];

export const FIELD_NOTES: FieldNote[] = [...RAW_FIELD_NOTES].sort((a, b) =>
  b.isoDate.localeCompare(a.isoDate)
);

export function countWords(paragraphs: string[]): number {
  return paragraphs
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function estimateReadMinutes(paragraphs: string[]): number {
  const words = countWords(paragraphs);
  return Math.max(1, Math.round(words / 210));
}

export function getFieldNoteBySlug(slug: string): FieldNote | undefined {
  return FIELD_NOTES.find((n) => n.slug === slug);
}
