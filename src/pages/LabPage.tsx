import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { LAB_ITEMS } from '../data/work';
import { Link } from '../components/Link';

interface LabPageProps {
  onNavigate: (path: string) => void;
}

export const LabPage: React.FC<LabPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 mx-auto max-w-[1120px] px-5 pt-24 pb-20 sm:px-8 sm:pt-28">
      <div className="mb-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="font-mono-meta inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-[var(--mut)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to home</span>
        </Link>
      </div>

      <header className="max-w-[680px]">
        <h1 className="text-halo text-[clamp(2.1rem,4vw,3rem)] leading-[1.1] font-medium tracking-[-0.03em] text-[var(--fg)]">
          Engineering lab &amp; research
        </h1>
        <p className="mt-4 text-[16.5px] leading-[1.65] text-[var(--fg-secondary)]">
          Supporting builds, practical campus utilities, and quantitative backtest audits. Smaller in scope than flagship product work, with public repositories you can inspect directly.
        </p>
      </header>

      <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)] bg-[var(--bg)]/84">
        {LAB_ITEMS.map((item) => (
          <article
            key={item.id}
            className="grid grid-cols-1 gap-4 py-10 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <p className="font-mono-meta text-[12.5px] text-[var(--mut)]">{item.year}</p>
              <h2 className="mt-1.5 text-[1.45rem] leading-[1.2] font-medium tracking-[-0.02em] text-[var(--fg)]">
                {item.title}
              </h2>
              <p className="mt-1 text-[13.5px] text-[var(--mut)]">{item.category}</p>
              <p className="font-mono-meta mt-2.5 inline-block rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[11.5px] text-[var(--fg-secondary)]">
                {item.stage}
              </p>
            </div>

            <div className="lg:col-span-8">
              <p className="text-[16px] leading-[1.68] text-[var(--fg)]">{item.summary}</p>
              <p className="mt-3 text-[15px] leading-[1.68] text-[var(--fg-secondary)]">
                {item.details}
              </p>
              {item.caveat && (
                <p className="mt-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[13.5px] leading-[1.58] text-[var(--fg-secondary)]">
                  <span className="font-semibold text-[var(--fg)]">Scope note:</span> {item.caveat}
                </p>
              )}
              <div className="mt-4">
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-link font-mono-meta inline-flex min-h-[40px] items-center gap-1.5 text-[13.5px] font-medium text-[var(--p0)]"
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
