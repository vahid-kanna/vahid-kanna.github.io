import React from 'react';
import { PROFILE_DATA } from '../utils/portfolioData';

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenLlms: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenBooking,
  onOpenLlms,
}) => {
  const scrollToTop = () => {
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
            <span>Open for chats · Frontend &amp; Product Engineering</span>
          </div>
          <h2
            id="footer-heading"
            className="text-[clamp(38px,6vw,64px)] leading-[0.98] font-normal tracking-[-0.045em] text-[var(--fg)]"
          >
            Let's talk
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--mut)] sm:text-base">
            Pick a time. Bring a frontend architecture challenge or product problem, I'll bring code &amp; opinions.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenBooking}
          className="group inline-flex w-fit shrink-0 items-center gap-2 border-b border-[var(--fg)] pb-1.5 font-mono text-[13px] text-[var(--fg)] transition-opacity hover:opacity-65 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[var(--fg)] cursor-pointer whitespace-nowrap"
        >
          <span>Book a call</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </button>
      </section>

      <div className="flex flex-col gap-5 border-t border-[var(--line)] py-5 font-mono text-[11.5px] text-[var(--mut)] sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>GitHub</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href={PROFILE_DATA.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)] whitespace-nowrap"
          >
            <span>X</span>
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
            href={PROFILE_DATA.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
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
            onClick={onOpenLlms}
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
    </footer>
  );
};
