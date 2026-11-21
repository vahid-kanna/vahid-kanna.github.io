import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { LAB_ITEMS } from '../data/work';
import { Link } from '../components/Link';

interface LabPageProps {
  onNavigate: (path: string) => void;
}

export const LabPage: React.FC<LabPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-[1080px] px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
      <div className="mb-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to home</span>
        </Link>
      </div>

      <header className="max-w-[680px]">
        <h1 className="font-display text-[clamp(2.1rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em] text-[var(--ink)]">
          Engineering lab &amp; research
        </h1>
        <p className="mt-4 text-[17px] leading-[1.65] text-[var(--ink-secondary)]">
          Supporting builds, practical campus utilities, and quantitative backtest audits. Smaller in scope than my flagship product work, with public repositories you can inspect directly.
        </p>
      </header>

      <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {LAB_ITEMS.map((item) => (
          <article
            key={item.id}
            className="grid grid-cols-1 gap-4 py-10 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <p className="font-mono-meta text-[13px] text-[var(--ink-muted)]">{item.year}</p>
              <h2 className="font-display mt-1.5 text-[1.55rem] leading-[1.2] tracking-[-0.015em] text-[var(--ink)]">
                {item.title}
              </h2>
              <p className="mt-1 text-[14px] text-[var(--ink-secondary)]">{item.category}</p>
              <p className="font-mono-meta mt-2 inline-block rounded-[4px] bg-[var(--surface-subtle)] px-2 py-0.5 text-[12px] text-[var(--ink-secondary)]">
                {item.stage}
              </p>
            </div>

            <div className="lg:col-span-8">
              <p className="text-[16px] leading-[1.68] text-[var(--ink)]">{item.summary}</p>
              <p className="mt-3 text-[15px] leading-[1.68] text-[var(--ink-secondary)]">
                {item.details}
              </p>
              {item.caveat && (
                <p className="mt-3 rounded-[6px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[14px] leading-[1.55] text-[var(--ink-secondary)]">
                  <span className="font-semibold text-[var(--ink)]">Scope note:</span> {item.caveat}
                </p>
              )}
              <div className="mt-4">
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-link inline-flex min-h-[44px] items-center gap-1.5 font-mono-meta text-[14px] font-medium text-[var(--accent)]"
                >
                  <span>{item.repoName}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
