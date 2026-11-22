import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ABOUT_CONTENT, EXPERIENCE_LEDGER, SITE } from '../data/site';
import { Link } from '../components/Link';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 mx-auto max-w-[780px] px-5 pt-24 pb-20 sm:px-8 sm:pt-28">
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

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/92 p-6 sm:p-10">
        <header>
          <p className="font-mono-meta text-[12px] text-[var(--mut)]">
            {SITE.affiliation} · {SITE.location}
          </p>
          <h1 className="mt-3 text-[clamp(2.1rem,4vw,2.9rem)] leading-[1.1] font-medium tracking-[-0.03em] text-[var(--fg)]">
            About {SITE.shortName}
          </h1>
        </header>

        <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-[var(--fg-secondary)]">
          <p className="text-[17.5px] leading-[1.68] text-[var(--fg)]">{ABOUT_CONTENT.intro}</p>
          {ABOUT_CONTENT.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <section
          aria-labelledby="principles-heading"
          className="mt-12 border-t border-[var(--line)] pt-9"
        >
          <h2
            id="principles-heading"
            className="text-[1.45rem] leading-[1.2] font-medium tracking-[-0.02em] text-[var(--fg)]"
          >
            How I approach building
          </h2>
          <ol className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {ABOUT_CONTENT.principles.map((item, idx) => (
              <li
                key={item.title}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
              >
                <span className="font-mono-meta text-[12.5px] text-[var(--p0)] sm:col-span-1">
                  0{idx + 1}
                </span>
                <div className="sm:col-span-11">
                  <h3 className="text-[15.5px] font-semibold text-[var(--fg)]">{item.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.65] text-[var(--fg-secondary)]">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="about-exp-heading"
          className="mt-12 border-t border-[var(--line)] pt-9"
        >
          <h2
            id="about-exp-heading"
            className="text-[1.45rem] leading-[1.2] font-medium tracking-[-0.02em] text-[var(--fg)]"
          >
            Timeline
          </h2>
          <ol className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {EXPERIENCE_LEDGER.map((entry) => (
              <li
                key={`${entry.role}-${entry.period}`}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
              >
                <span className="font-mono-meta text-[12.5px] text-[var(--mut)] sm:col-span-4">
                  {entry.period}
                </span>
                <div className="sm:col-span-8">
                  <h3 className="text-[15.5px] font-semibold text-[var(--fg)]">{entry.role}</h3>
                  <p className="text-[13.5px] text-[var(--mut)]">{entry.organization}</p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-[var(--fg-secondary)]">
                    {entry.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};
