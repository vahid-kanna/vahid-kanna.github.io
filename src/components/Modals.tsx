import React, { useEffect, useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  ExternalLink,
  X,
  Coffee,
  ArrowUpRight,
  Code2,
  Clock,
  Send,
  Terminal,
  Search,
} from 'lucide-react';
import { ProjectItem, EssayItem } from '../utils/portfolioLogic';
import {
  LLMS_TXT_SHORT,
  LLMS_TXT_FULL,
  PROFILE_DATA,
  PROJECTS_DATA,
} from '../utils/portfolioData';
import {
  SyncProSimulatorWidget,
  RailRakshaVectorWidget,
} from './ProductSimulators';
import { playTactileClick, playLanyardWhoosh } from '../utils/soundEngine';

interface LlmsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LlmsModal: React.FC<LlmsModalProps> = ({ isOpen, onClose }) => {
  const [docMode, setDocMode] = useState<'short' | 'full'>('short');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawText = docMode === 'short' ? LLMS_TXT_SHORT : LLMS_TXT_FULL;
  const lines = rawText.split('\n');

  const handleCopy = () => {
    playTactileClick(1.1);
    navigator.clipboard?.writeText(rawText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="llms-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex h-[90svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] border border-black/20 bg-[#f1eee6] text-[#171716] shadow-[0_32px_90px_rgba(0,0,0,0.45)] sm:h-[min(82vh,760px)] sm:rounded-[24px]"
      >
        <header className="flex-none bg-[#151516] text-white">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.06]">
                <FileText className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="llms-modal-title" className="truncate text-sm font-medium tracking-[-0.01em]">
                  llms.txt
                </h2>
                <p className="hidden font-mono text-[10px] tracking-[0.08em] text-white/45 uppercase sm:block">
                  Plain-text context for humans, recruiters, and AI agents
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-xs text-white/80 transition-colors hover:bg-white/15 hover:text-white cursor-pointer whitespace-nowrap"
                aria-label="Copy document"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>

              <a
                href={PROFILE_DATA.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-xs text-white/75 transition-colors hover:bg-white/15 hover:text-white whitespace-nowrap"
                aria-label="Open Resume PDF in a new tab"
              >
                <span className="hidden sm:inline">Resume.pdf</span>
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(0.9);
                  onClose();
                }}
                className="grid size-9 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Close document"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav
            className="flex gap-1 border-t border-white/[0.07] px-4 pt-2 sm:px-6"
            aria-label="LLM documents"
          >
            <button
              type="button"
              aria-pressed={docMode === 'short'}
              onClick={() => {
                playTactileClick(1.0);
                setDocMode('short');
              }}
              className={`relative rounded-t-lg px-3 py-2 font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                docMode === 'short'
                  ? 'bg-[#f1eee6] text-[#171716] font-medium'
                  : 'text-white/50 hover:text-white/85'
              }`}
            >
              llms.txt
            </button>
            <button
              type="button"
              aria-pressed={docMode === 'full'}
              onClick={() => {
                playTactileClick(1.05);
                setDocMode('full');
              }}
              className={`relative rounded-t-lg px-3 py-2 font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                docMode === 'full'
                  ? 'bg-[#f1eee6] text-[#171716] font-medium'
                  : 'text-white/50 hover:text-white/85'
              }`}
            >
              llms-full.txt
            </button>
          </nav>
        </header>

        <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#f1eee6]">
          <ol className="min-w-full py-5 font-mono text-[12px] leading-6 sm:py-7 sm:text-[13px] sm:leading-7 tabular-nums">
            {lines.map((line, idx) => (
              <li
                key={idx}
                className="grid grid-cols-[3rem_minmax(0,1fr)] px-3 transition-colors hover:bg-black/[0.035] sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:px-6"
              >
                <span className="border-r border-black/10 pr-3 text-right text-black/30 select-none sm:pr-5">
                  {idx + 1}
                </span>
                <code className="block pl-3 break-words whitespace-pre-wrap text-black/80 sm:pl-5">
                  {line || ' '}
                </code>
              </li>
            ))}
          </ol>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 bg-[#e8e4da] px-4 py-2.5 font-mono text-[11px] text-black/55 sm:px-6 tabular-nums">
          <span>Public · UTF-8</span>
          <span>
            {lines.length} lines · {rawText.length.toLocaleString()} characters
          </span>
        </footer>
      </section>
    </div>
  );
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow · 4:00 PM IST');
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !senderEmail.includes('@')) {
      setErrorMsg('Please enter your name and a valid email address.');
      return;
    }
    playTactileClick(1.2);
    setErrorMsg('');
    setSubmitted(true);
  };

  const resetAndClose = () => {
    playTactileClick(0.9);
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={resetAndClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-[460px] max-w-[94vw] rounded-2xl sm:rounded-3xl border border-[var(--line)] bg-[var(--bg)] text-[var(--fg)] shadow-2xl p-6 flex flex-col font-sans"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
          <div className="flex items-center gap-2.5">
            <h2
              id="booking-modal-title"
              className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--fg)]"
            >
              Coffee Chat · Shaik Vahid Basha
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="p-1 rounded-full text-[var(--mut)] hover:text-[var(--fg)] hover:bg-[var(--line)]/60 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto w-11 h-11 rounded-full bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-[var(--fg)]">
              Slot Requested for {selectedSlot}
            </h3>
            <p className="text-xs text-[var(--mut)] leading-relaxed max-w-sm mx-auto">
              Thanks, <span className="text-[var(--fg)] font-medium">{senderName}</span>! A calendar
              invite details packet has been prepared for{' '}
              <span className="font-mono">{senderEmail}</span>.
            </p>
            <div className="pt-3 flex flex-col gap-2 font-mono text-xs">
              <a
                href={`mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
                  `Strategy / Product Chat with ${senderName} (${selectedSlot})`
                )}&body=${encodeURIComponent(note || 'Hi Vahid, would love to connect regarding Product Management, Strategy, or Venture systems!')}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Email ({PROFILE_DATA.email})</span>
              </a>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-2 text-center text-[11px] text-[var(--mut)] hover:text-[var(--fg)] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--line)]/50 text-[var(--fg)]">
                <Coffee className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-medium text-[var(--fg)] leading-snug">
                  Strategy &amp; Product Coffee Chat
                </h3>
                <p className="text-xs text-[var(--mut)]">
                  Product Management · Strategy · Quant &amp; Infrastructure AI · 20 min
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label
                  htmlFor="booking-name"
                  className="block font-mono text-[11px] text-[var(--mut)] mb-1"
                >
                  Your Name *
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-transparent text-sm text-[var(--fg)] focus:outline-2 focus:outline-[var(--fg)]"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-email"
                  className="block font-mono text-[11px] text-[var(--mut)] mb-1"
                >
                  Work Email *
                </label>
                <input
                  id="booking-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="ada@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-transparent text-sm text-[var(--fg)] focus:outline-2 focus:outline-[var(--fg)]"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-slot"
                  className="block font-mono text-[11px] text-[var(--mut)] mb-1"
                >
                  Preferred Slot
                </label>
                <select
                  id="booking-slot"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-sm text-[var(--fg)] focus:outline-2 focus:outline-[var(--fg)]"
                >
                  <option value="Tomorrow · 4:00 PM IST">Tomorrow · 4:00 PM IST</option>
                  <option value="Tomorrow · 7:30 PM IST">Tomorrow · 7:30 PM IST</option>
                  <option value="This Friday · 5:00 PM IST">This Friday · 5:00 PM IST</option>
                  <option value="Next Monday · 11:00 AM IST">Next Monday · 11:00 AM IST</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="booking-note"
                  className="block font-mono text-[11px] text-[var(--mut)] mb-1"
                >
                  Context / Role Details (Optional)
                </label>
                <textarea
                  id="booking-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Product role, venture strategy chat, or infrastructure AI collab..."
                  className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-transparent text-sm text-[var(--fg)] focus:outline-2 focus:outline-[var(--fg)] resize-none"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-mono text-rose-500">
                  {errorMsg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span>Confirm Coffee Chat</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-1.5 text-center text-[11px] text-[var(--mut)] hover:text-[var(--fg)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={() => {
        playTactileClick(0.9);
        onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--bg)] text-[var(--fg)] shadow-2xl p-6 sm:p-8 font-sans"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-5">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--mut)] tabular-nums">
            <span>{project.year}</span>
            <span>·</span>
            <span>★ {project.stars}</span>
            <span>·</span>
            <span className="uppercase text-[var(--fg)]">Case Study &amp; PRD</span>
          </div>
          <button
            type="button"
            onClick={() => {
              playTactileClick(0.9);
              onClose();
            }}
            aria-label="Close case study modal"
            className="p-1.5 rounded-full text-[var(--mut)] hover:text-[var(--fg)] hover:bg-[var(--line)]/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h2
          id="project-modal-title"
          className="text-2xl sm:text-3xl font-normal tracking-[-0.03em] text-[var(--fg)] mb-3"
        >
          {project.title}
        </h2>

        <p className="text-[15px] text-[var(--fg)]/85 leading-relaxed mb-5">{project.details}</p>

        {/* Interactive Product Simulation Widgets */}
        {project.id === 'syncpro' && <SyncProSimulatorWidget />}
        {project.id === 'railraksha' && <RailRakshaVectorWidget />}

        <div className="mb-6 p-4 rounded-xl border border-[var(--line)] bg-[var(--fg)]/[0.02]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--mut)] mb-2.5">
            Key Quantitative Outcomes
          </div>
          <ul className="space-y-1.5 font-mono text-xs text-[var(--fg)] tabular-nums">
            {project.metrics.map((m) => (
              <li key={m}>· {m}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--mut)] mb-2.5">
            Product &amp; Systems Architecture
          </div>
          <ul className="space-y-2 text-sm text-[var(--fg)]/85 leading-relaxed">
            {project.architectureNotes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span className="font-mono text-[var(--mut)]">→</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--line)] font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2 text-[var(--mut)]">
            {project.tags.map((t, i) => (
              <React.Fragment key={t}>
                <span className="text-[var(--fg)]">{t}</span>
                {i < project.tags.length - 1 && <span>·</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl.startsWith('http') && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-200 font-medium hover:bg-emerald-500/25 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Platform</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EssayReaderModalProps {
  essay: EssayItem | null;
  onClose: () => void;
}

export const EssayReaderModal: React.FC<EssayReaderModalProps> = ({ essay, onClose }) => {
  if (!essay) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={() => {
        playTactileClick(0.9);
        onClose();
      }}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="essay-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--bg)] text-[var(--fg)] shadow-2xl p-6 sm:p-8 font-sans"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-5 font-mono text-xs text-[var(--mut)] tabular-nums">
          <div className="flex items-center gap-2.5">
            <time dateTime={essay.isoDate}>{essay.date}</time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{essay.readTime}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playTactileClick(0.9);
              onClose();
            }}
            aria-label="Close essay reader"
            className="p-1.5 rounded-full text-[var(--mut)] hover:text-[var(--fg)] hover:bg-[var(--line)]/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h2
          id="essay-modal-title"
          className="text-2xl sm:text-3xl font-normal tracking-[-0.03em] text-[var(--fg)] leading-snug mb-5"
        >
          {essay.title}
        </h2>

        <div className="space-y-4 text-[15px] text-[var(--fg)]/85 leading-[1.75] mb-6">
          {essay.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--fg)]/[0.02]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--mut)] mb-2">
            Product &amp; Systems Takeaways
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--fg)]/90">
            {essay.keyTakeaways.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="font-mono text-[var(--mut)]">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenLlms: () => void;
  onOpenBooking: () => void;
  onFlipBadge: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenLlms,
  onOpenBooking,
  onFlipBadge,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      key: '1',
      label: 'SyncPro Case Study & Delay Risk Simulator',
      sub: 'syncpro.org · Nirmaan IIT Madras ₹5L Finalist',
      run: () => {
        const p = PROJECTS_DATA.find((item) => item.id === 'syncpro');
        if (p) onSelectProject(p);
      },
    },
    {
      key: '2',
      label: 'RailRaksha Safety PWA & Vector Visualizer',
      sub: 'railraksha.tech · 130 km/h Receding Vector Math',
      run: () => {
        const p = PROJECTS_DATA.find((item) => item.id === 'railraksha');
        if (p) onSelectProject(p);
      },
    },
    {
      key: '3',
      label: 'BSE / NSE Quant Alpha Terminal',
      sub: '857K+ Filings · 301K Tests · +43.6% 12M Net ROI',
      run: () => {
        const p = PROJECTS_DATA.find((item) => item.id === 'quant-alpha');
        if (p) onSelectProject(p);
      },
    },
    {
      key: '4',
      label: 'llms.txt AI Dossier',
      sub: 'Machine-readable plain-text context for AI agents & recruiters',
      run: () => onOpenLlms(),
    },
    {
      key: 'R',
      label: 'Download Product Management Resume PDF',
      sub: "Shaik Vahid Basha · IIT Madras ('27)",
      run: () => {
        const a = document.createElement('a');
        a.href = PROFILE_DATA.resumePdfUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
      },
    },
    {
      key: 'F',
      label: 'Flip ID Badge (Trigger Verlet Swing)',
      sub: '11-node Dual-Strap Verlet Physics + Impulse Wave',
      run: () => {
        playLanyardWhoosh();
        onFlipBadge();
      },
    },
    {
      key: 'B',
      label: 'Book a Strategy / Coffee Chat',
      sub: 'vahidbashaunique@gmail.com · 20 min slot',
      run: () => onOpenBooking(),
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.sub.toLowerCase().includes(query.toLowerCase()) ||
      a.key.toLowerCase() === query.trim().toLowerCase()
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        playTactileClick(1.05);
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playTactileClick(0.95);
        setSelectedIndex(
          (prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length)
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        playTactileClick(1.2);
        onClose();
        filtered[selectedIndex].run();
      } else if (!query.trim()) {
        const upper = e.key.toUpperCase();
        const match = actions.find((a) => a.key === upper);
        if (match && !(e.metaKey || e.ctrlKey || e.altKey)) {
          e.preventDefault();
          playTactileClick(1.2);
          onClose();
          match.run();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, selectedIndex, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center pt-[12vh] p-4 bg-black/70 backdrop-blur-md"
      onClick={() => {
        playTactileClick(0.9);
        onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cmd-palette-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-[#111113] text-[var(--fg)] shadow-[0_32px_90px_rgba(0,0,0,0.75)] font-mono"
      >
        {/* Live Status Header */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-[#18181b] border-b border-white/10 text-[10px] uppercase tracking-wider text-[var(--mut)]">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-3.5 h-3.5 text-purple-300 shrink-0" />
            <span id="cmd-palette-title" className="truncate text-white/85">
              SYS.TERMINAL // SHAIK VAHID BASHA · IIT MADRAS (&apos;27) · NIRMAAN LAB
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-emerald-300 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ONLINE</span>
          </span>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-[var(--mut)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or press [1-4, R, F, B]..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none font-mono"
          />
          <button
            type="button"
            onClick={() => {
              playTactileClick(0.9);
              onClose();
            }}
            className="px-1.5 py-0.5 rounded border border-white/15 text-[10px] text-zinc-400 hover:text-white cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Actions List */}
        <div className="max-h-[340px] overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.map((item, idx) => {
            const active = idx === selectedIndex;
            return (
              <button
                key={item.key}
                type="button"
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => {
                  playTactileClick(1.18);
                  onClose();
                  item.run();
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  active ? 'bg-white/[0.08] text-white' : 'text-zinc-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-[13px] font-medium truncate">
                    {item.label}
                  </div>
                  <div className="text-[10.5px] text-zinc-400 truncate mt-0.5">
                    {item.sub}
                  </div>
                </div>
                <kbd className="px-2 py-1 rounded-md bg-black/60 border border-white/15 text-[10.5px] text-purple-200 shrink-0">
                  [{item.key}]
                </kbd>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#161618] border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
          <span>↑↓ to navigate · ENTER to execute</span>
          <span>IIT Madras (&apos;27) · Product &amp; Systems</span>
        </div>
      </div>
    </div>
  );
};
