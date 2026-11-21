import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/work';
import { Link } from '../components/Link';
import { ProductPlate } from '../components/ProductPlate';
import { StageBadge } from '../components/StageBadge';
import { ZeroEkaSchematic } from '../components/ZeroEkaSchematic';

interface CaseStudyPageProps {
  study: CaseStudy;
  onNavigate: (path: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ study, onNavigate }) => {
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === study.slug);
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <article className="mx-auto max-w-[1080px] px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
      <div className="mb-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to selected work</span>
        </Link>
      </div>

      <header className="max-w-[780px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono-meta text-[13px] text-[var(--ink-muted)]">
            Case {study.index}
          </span>
          <StageBadge label={study.stageLabel} tone={study.stageTone} />
          <span className="font-mono-meta text-[13px] text-[var(--ink-muted)]">
            {study.period}
          </span>
        </div>

        <h1 className="font-display mt-4 text-[clamp(2.2rem,4.5vw,3.35rem)] leading-[1.08] tracking-[-0.025em] text-[var(--ink)]">
          {study.title}
        </h1>
        <p className="mt-3 text-[19px] leading-[1.55] text-[var(--ink-secondary)]">
          {study.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[6px] bg-[var(--accent)] px-4 py-2 text-[15px] font-medium text-[var(--on-accent)] hover:bg-[var(--accent-hover)]"
            >
              <span>{study.liveLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {study.repoUrl && (
            <a
              href={study.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[6px] border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2 text-[15px] font-medium text-[var(--ink)] hover:bg-[var(--surface-subtle)]"
            >
              <span>{study.repoLabel ?? 'View source'}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      {/* Evidence & scope bar */}
      <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-[var(--border)] py-6 sm:grid-cols-3">
        {study.evidenceStrip.map((ev) => (
          <div key={ev.label}>
            <dt className="font-mono-meta text-[12px] text-[var(--ink-muted)]">{ev.label}</dt>
            <dd className="mt-1">
              <span className="block text-[17px] font-semibold text-[var(--ink)]">{ev.value}</span>
              <span className="mt-1 block text-[14px] leading-[1.5] text-[var(--ink-secondary)]">
                {ev.qualifier}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {/* Primary product plate */}
      <div className="mt-10">
        {study.primaryImage ? (
          <ProductPlate image={study.primaryImage} priority />
        ) : study.useZeroEkaSchematic ? (
          <ZeroEkaSchematic />
        ) : null}
      </div>

      {/* Main editorial narrative at comfortable 66ch measure */}
      <div className="mt-14 max-w-[720px] space-y-12">
        <section aria-labelledby="sec-problem">
          <h2
            id="sec-problem"
            className="font-display text-[1.65rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
          >
            Context &amp; problem
          </h2>
          <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-[var(--ink-secondary)]">
            {study.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="sec-ownership">
          <h2
            id="sec-ownership"
            className="font-display text-[1.65rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
          >
            Role &amp; ownership ({study.role})
          </h2>
          <ul className="mt-4 space-y-3 text-[16px] leading-[1.68] text-[var(--ink-secondary)]">
            {study.ownership.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono-meta mt-1 text-[12px] text-[var(--accent)]">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="sec-decision"
          className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
        >
          <p className="font-mono-meta text-[12px] text-[var(--accent)]">Key product decision</p>
          <h2
            id="sec-decision"
            className="font-display mt-1.5 text-[1.45rem] leading-[1.25] tracking-[-0.015em] text-[var(--ink)]"
          >
            {study.keyDecision.title}
          </h2>
          <dl className="mt-5 space-y-4 text-[15px] leading-[1.65]">
            <div>
              <dt className="font-semibold text-[var(--ink)]">What we chose</dt>
              <dd className="mt-1 text-[var(--ink-secondary)]">{study.keyDecision.chosen}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ink)]">Alternative rejected</dt>
              <dd className="mt-1 text-[var(--ink-secondary)]">{study.keyDecision.rejected}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--ink)]">Reasoning</dt>
              <dd className="mt-1 text-[var(--ink-secondary)]">{study.keyDecision.why}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="sec-architecture">
          <h2
            id="sec-architecture"
            className="font-display text-[1.65rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
          >
            How it works
          </h2>
          <ul className="mt-4 space-y-3 text-[16px] leading-[1.68] text-[var(--ink-secondary)]">
            {study.architectureNotes.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono-meta mt-1 text-[12px] text-[var(--ink-muted)]">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {study.secondaryImages && study.secondaryImages.length > 0 && (
          <section aria-labelledby="sec-artifacts">
            <h2
              id="sec-artifacts"
              className="font-display text-[1.65rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
            >
              Additional captures
            </h2>
            <div className="mt-5 space-y-8">
              {study.secondaryImages.map((img) => (
                <ProductPlate key={img.src} image={img} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="sec-limits" className="border-t border-[var(--border)] pt-8">
          <h2
            id="sec-limits"
            className="font-display text-[1.5rem] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
          >
            Boundaries &amp; limitations
          </h2>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-[1.65] text-[var(--ink-secondary)]">
            {study.limitations.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono-meta mt-1 text-[12px] text-[var(--ink-muted)]">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-[1.65] text-[var(--ink)]">
            <span className="font-semibold">Next step:</span> {study.nextStep}
          </p>
        </section>
      </div>

      {/* Next case study navigation */}
      <nav
        aria-label="Next case study"
        className="mt-16 flex flex-col justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center"
      >
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] text-[var(--ink-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All selected work</span>
        </Link>

        <Link
          to={`/work/${nextStudy.slug}`}
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-2 text-[16px] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          <span>Next: {nextStudy.title}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
};
