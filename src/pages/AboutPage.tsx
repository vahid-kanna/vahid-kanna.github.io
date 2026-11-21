import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ABOUT_CONTENT, EXPERIENCE_LEDGER, SITE } from '../data/site';
import { Link } from '../components/Link';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-[780px] px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
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

      <header>
        <p className="font-mono-meta text-[13px] text-[var(--ink-muted)]">
          {SITE.affiliation} · {SITE.location}
        </p>
        <h1 className="font-display mt-3 text-[clamp(2.1rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em] text-[var(--ink)]">
          About {SITE.shortName}
        </h1>
      </header>

      <div className="mt-8 space-y-5 text-[16.5px] leading-[1.72] text-[var(--ink-secondary)]">
        <p className="text-[18px] leading-[1.65] text-[var(--ink)]">{ABOUT_CONTENT.intro}</p>
        {ABOUT_CONTENT.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section aria-labelledby="principles-heading" className="mt-14 border-t border-[var(--border)] pt-10">
        <h2
          id="principles-heading"
          className="font-display text-[1.65rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
        >
          How I approach building
        </h2>
        <ol className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {ABOUT_CONTENT.principles.map((item, idx) => (
            <li key={item.title} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6">
              <span className="font-mono-meta text-[13px] text-[var(--accent)] sm:col-span-1">
                0{idx + 1}
              </span>
              <div className="sm:col-span-11">
                <h3 className="text-[16px] font-semibold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.65] text-[var(--ink-secondary)]">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about-exp-heading" className="mt-14 border-t border-[var(--border)] pt-10">
        <h2
          id="about-exp-heading"
          className="font-display text-[1.65rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
        >
          Timeline
        </h2>
        <ol className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {EXPERIENCE_LEDGER.map((entry) => (
            <li
              key={`${entry.role}-${entry.period}`}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
            >
              <span className="font-mono-meta text-[13px] text-[var(--ink-muted)] sm:col-span-4">
                {entry.period}
              </span>
              <div className="sm:col-span-8">
                <h3 className="text-[16px] font-semibold text-[var(--ink)]">{entry.role}</h3>
                <p className="text-[14px] font-medium text-[var(--ink-secondary)]">
                  {entry.organization}
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-[var(--ink-secondary)]">
                  {entry.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
