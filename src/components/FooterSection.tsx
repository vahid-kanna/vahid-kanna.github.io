import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { PROFILE_DATA } from '../utils/portfolioData';
import { playTactileClick } from '../utils/soundEngine';

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenLlms: () => void;
  onOpenCmdPalette: () => void;
}

function formatIstClock(date: Date): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    return date.toTimeString().slice(0, 8);
  }
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenBooking,
  onOpenLlms,
  onOpenCmdPalette,
}) => {
  const [istTime, setIstTime] = useState<string>(() => formatIstClock(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIstTime(formatIstClock(new Date()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playTactileClick(1.0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      data-section="footer"
      className="relative z-10 mx-auto mt-[clamp(64px,8vw,112px)] w-full max-w-6xl px-5 pb-[max(24px,env(safe-area-inset-bottom))] sm:px-8"
    >
      <section
        aria-labelledby="footer-heading"
        className="grid gap-10 border-t border-[var(--line)] py-[clamp(48px,7vw,80px)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
      >
        <div className="max-w-2xl">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-[var(--mut)]">
            <span>
              OPEN FOR CHATS · PRODUCT MANAGEMENT, STRATEGY, QUANT &amp; INFRASTRUCTURE AI
            </span>
          </div>
          <h2
            id="footer-heading"
            className="text-[clamp(38px,6vw,64px)] leading-[0.98] font-normal tracking-[-0.045em] text-[var(--fg)]"
          >
            Let's talk
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--mut)] sm:text-base">
            Bring a product strategy problem, a 0-to-1 venture thesis, or a mission-critical system to architect—I'll bring ground-truth discovery, unit economics, and shipping code.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playTactileClick(1.1);
            onOpenBooking();
          }}
          className="group inline-flex w-fit shrink-0 items-center gap-2 border-b border-[var(--fg)] pb-1.5 font-mono text-[13px] text-[var(--fg)] transition-opacity hover:opacity-65 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[var(--fg)] cursor-pointer whitespace-nowrap"
        >
          <span>Book a strategy chat</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </button>
      </section>

      {/* Primary Links Bar */}
      <div className="flex flex-col gap-5 border-t border-[var(--line)] py-5 font-mono text-[11.5px] text-[var(--mut)] sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={PROFILE_DATA.socials.syncproLive}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1.0)}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>SyncPro.org</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href={PROFILE_DATA.socials.railrakshaLive}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1.0)}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>RailRaksha.tech</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1.0)}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>GitHub (@vahid-kanna)</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href={PROFILE_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1.0)}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>LinkedIn</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            onClick={() => playTactileClick(1.0)}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>{PROFILE_DATA.email}</span>
          </a>
          <a
            href={PROFILE_DATA.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1.0)}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>Resume PDF</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              playTactileClick(1.05);
              onOpenLlms();
            }}
            className="group inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>llms.txt</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </button>
        </nav>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:justify-end">
          <span>© 2026 Shaik Vahid Basha · IIT Madras</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
            aria-label="up we go, back to top"
          >
            <span>up we go</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-y-[3px]"
            >
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* hancore.dev-inspired Live Telemetry Footer & Status Ticker */}
      <div className="mt-2 pt-4 border-t border-[var(--line)]/60 flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] text-[var(--mut)] tabular-nums">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[var(--fg)]/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>IIT MADRAS · CHENNAI · IST (UTC+05:30) // {istTime}</span>
          </span>
          <span className="hidden sm:inline text-[var(--line)]">|</span>
          <span>Co-founder @ SyncPro · Creator @ RailRaksha · IIT Madras (&apos;27)</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span>Product Management · Systems Strategy</span>
          <button
            type="button"
            onClick={() => {
              playTactileClick(1.1);
              onOpenCmdPalette();
            }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--line)] bg-white/[0.03] text-[var(--fg)]/85 hover:border-[var(--fg)]/40 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Terminal className="w-3 h-3 text-purple-300" aria-hidden="true" />
            <span>⌘K Command Palette</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
