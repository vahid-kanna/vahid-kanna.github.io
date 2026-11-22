import React from 'react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { SITE } from '../data/site';
import { CopyEmailButton } from './CopyEmailButton';
import { Link } from './Link';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenLlms: () => void;
  onOpenCmdPalette: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLlms,
  onOpenCmdPalette,
}) => {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[var(--bg)]/92">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.06] font-normal tracking-[-0.035em] text-[var(--fg)]">
              Let’s talk
            </h2>
            <p className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.65] text-[var(--fg-secondary)]">
              Open to conversations about product management, product strategy, analytics, and early-stage building. Direct email is the fastest way to reach me.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={SITE.contactMailto}
                className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[var(--fg)] px-4 py-2 text-[14px] font-semibold text-[var(--bg)] hover:bg-white"
              >
                Email me
              </a>
              <CopyEmailButton />
              <a
                href={SITE.resumeMailto}
                className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-[var(--line)] px-4 py-2 text-[14px] font-medium text-[var(--fg-secondary)] hover:border-white/30 hover:text-white"
              >
                Request resume
              </a>
            </div>
            <p className="font-mono-meta mt-3.5 text-[12.5px] text-[var(--mut)]">
              {SITE.email}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-items-end">
            <div>
              <h3 className="font-mono-meta text-[11.5px] tracking-wider text-[var(--mut)] uppercase">
                Pages
              </h3>
              <ul className="mt-3 space-y-1 text-[14.5px]">
                <li>
                  <Link
                    to="/work/syncpro"
                    onNavigate={onNavigate}
                    className="inline-flex min-h-[30px] items-center text-[var(--fg-secondary)] hover:text-white"
                  >
                    SyncPro
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work/railraksha"
                    onNavigate={onNavigate}
                    className="inline-flex min-h-[30px] items-center text-[var(--fg-secondary)] hover:text-white"
                  >
                    RailRaksha
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work/zamp-ap"
                    onNavigate={onNavigate}
                    className="inline-flex min-h-[30px] items-center text-[var(--fg-secondary)] hover:text-white"
                  >
                    Zamp AP Workbench
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lab"
                    onNavigate={onNavigate}
                    className="inline-flex min-h-[30px] items-center text-[var(--fg-secondary)] hover:text-white"
                  >
                    Engineering Lab
                  </Link>
                </li>
                <li>
                  <Link
                    to="/writing"
                    onNavigate={onNavigate}
                    className="inline-flex min-h-[30px] items-center text-[var(--fg-secondary)] hover:text-white"
                  >
                    Field Notes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onNavigate={onNavigate}
                    className="inline-flex min-h-[30px] items-center text-[var(--fg-secondary)] hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono-meta text-[11.5px] tracking-wider text-[var(--mut)] uppercase">
                Elsewhere
              </h3>
              <ul className="mt-3 space-y-1 text-[14.5px]">
                <li>
                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[30px] items-center gap-1 text-[var(--fg-secondary)] hover:text-white"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--mut)]" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[30px] items-center gap-1 text-[var(--fg-secondary)] hover:text-white"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--mut)]" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenLlms}
                    className="font-mono-meta inline-flex min-h-[30px] cursor-pointer items-center text-[13px] text-[var(--fg-secondary)] hover:text-[var(--p0)]"
                  >
                    llms.txt
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenCmdPalette}
                    className="font-mono-meta inline-flex min-h-[30px] cursor-pointer items-center gap-1.5 text-[13px] text-[var(--fg-secondary)] hover:text-[var(--p0)]"
                  >
                    <Terminal className="h-3 w-3" aria-hidden="true" />
                    <span>Command ⌘K</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="font-mono-meta mt-12 flex flex-col justify-between gap-2 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--mut)] sm:flex-row sm:items-center">
          <p>
            {SITE.name} · {SITE.affiliation} · {SITE.location}
          </p>
          <p>vahidbasha.me</p>
        </div>
      </div>
    </footer>
  );
};
