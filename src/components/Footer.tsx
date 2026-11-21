import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';
import { CopyEmailButton } from './CopyEmailButton';
import { Link } from './Link';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
              Get in touch
            </h2>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-[var(--ink-secondary)]">
              Open to conversations about product management, product strategy, analytics, and early-stage building. The fastest way to reach me is direct email.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={SITE.contactMailto}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[6px] bg-[var(--accent)] px-4 py-2 text-[15px] font-medium text-[var(--on-accent)] hover:bg-[var(--accent-hover)]"
              >
                Email me
              </a>
              <CopyEmailButton />
            </div>
            <p className="font-mono-meta mt-3 text-[13px] text-[var(--ink-muted)]">
              {SITE.email}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-items-end">
            <div>
              <h3 className="font-mono-meta text-[12px] font-medium text-[var(--ink-muted)]">
                Pages
              </h3>
              <ul className="mt-2.5 space-y-0.5 text-[15px]">
                <li>
                  <Link to="/work/syncpro" onNavigate={onNavigate} className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]">
                    SyncPro
                  </Link>
                </li>
                <li>
                  <Link to="/work/railraksha" onNavigate={onNavigate} className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]">
                    RailRaksha
                  </Link>
                </li>
                <li>
                  <Link to="/work/zamp-ap" onNavigate={onNavigate} className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]">
                    Zamp AP Workbench
                  </Link>
                </li>
                <li>
                  <Link to="/lab" onNavigate={onNavigate} className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]">
                    Engineering Lab
                  </Link>
                </li>
                <li>
                  <Link to="/writing" onNavigate={onNavigate} className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]">
                    Field Notes
                  </Link>
                </li>
                <li>
                  <Link to="/about" onNavigate={onNavigate} className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono-meta text-[12px] font-medium text-[var(--ink-muted)]">
                Elsewhere
              </h3>
              <ul className="mt-2.5 space-y-0.5 text-[15px]">
                <li>
                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[30px] items-center gap-1 text-[var(--ink-secondary)] hover:text-[var(--accent)]"
                  >
                    GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[30px] items-center gap-1 text-[var(--ink-secondary)] hover:text-[var(--accent)]"
                  >
                    LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.resumeMailto}
                    className="inline-flex min-h-[30px] items-center text-[var(--ink-secondary)] hover:text-[var(--accent)]"
                  >
                    Request resume
                  </a>
                </li>
                <li>
                  <a
                    href="/llms.txt"
                    className="font-mono-meta inline-flex min-h-[30px] items-center text-[13px] text-[var(--ink-muted)] hover:text-[var(--accent)]"
                  >
                    llms.txt
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-[var(--border)] pt-6 text-[13px] text-[var(--ink-muted)] sm:flex-row sm:items-center">
          <p>
            {SITE.name} · {SITE.affiliation} · {SITE.location}
          </p>
          <p className="font-mono-meta">vahidbasha.me</p>
        </div>
      </div>
    </footer>
  );
};
