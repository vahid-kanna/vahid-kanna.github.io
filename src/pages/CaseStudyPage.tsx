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
    <article className="relative z-10 mx-auto max-w-[1120px] px-5 pt-24 pb-20 sm:px-8 sm:pt-28">
      <div className="mb-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="font-mono-meta inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-[var(--mut)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to selected work</span>
        </Link>
      </div>

      <header className="max-w-[780px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono-meta text-[12px] text-[var(--mut)]">Case {study.index}</span>
          <StageBadge label={study.stageLabel} tone={study.stageTone} />
          <span className="font-mono-meta text-[12px] text-[var(--mut)]">{study.period}</span>
        </div>

        <h1 className="text-halo mt-4 text-[clamp(2.2rem,4.5vw,3.35rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[var(--fg)]">
          {study.title}
        </h1>
        <p className="mt-3 text-[18.5px] leading-[1.58] text-[var(--fg-secondary)]">
          {study.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-[var(--fg)] px-4 py-2 text-[14px] font-semibold text-[var(--bg)] hover:bg-white"
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
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-2 text-[14px] font-medium text-[var(--fg)] hover:border-white/40 hover:bg-[var(--surface-elevated)]"
            >
              <span>{study.repoLabel ?? 'View source'}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      {/* Valid <dl> Evidence Strip */}
      <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-[var(--line)] bg-[var(--bg)]/80 py-6 sm:grid-cols-3">
        {study.evidenceStrip.map((ev) => (
          <div key={ev.label}>
            <dt className="font-mono-meta text-[11.5px] text-[var(--mut)]">{ev.label}</dt>
            <dd className="mt-1">
              <span className="block text-[16.5px] font-semibold text-[var(--fg)]">{ev.value}</span>
              <span className="mt-1 block text-[13.5px] leading-[1.55] text-[var(--fg-secondary)]">
                {ev.qualifier}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        {study.primaryImage ? (
          <ProductPlate image={study.primaryImage} priority />
        ) : study.useZeroEkaSchematic ? (
          <ZeroEkaSchematic />
        ) : null}
      </div>

      <div className="mt-14 max-w-[740px] space-y-12 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/92 p-6 sm:p-10">
        <section aria-labelledby="sec-problem">
          <h2
            id="sec-problem"
            className="text-[1.55rem] leading-[1.2] font-medium tracking-[-0.025em] text-[var(--fg)]"
          >
            Context &amp; problem
          </h2>
          <div className="mt-4 space-y-4 text-[15.5px] leading-[1.72] text-[var(--fg-secondary)]">
            {study.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="sec-ownership" className="border-t border-[var(--line)] pt-8">
          <h2
            id="sec-ownership"
            className="text-[1.55rem] leading-[1.2] font-medium tracking-[-0.025em] text-[var(--fg)]"
          >
            Role &amp; ownership ({study.role})
          </h2>
          <ul className="mt-4 space-y-3 text-[15.5px] leading-[1.68] text-[var(--fg-secondary)]">
            {study.ownership.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono-meta mt-1 text-[12px] text-[var(--p0)]">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="sec-decision"
          className="rounded-xl border border-white/[0.12] bg-[#0e0e0d] p-6"
        >
          <p className="font-mono-meta text-[11.5px] text-[var(--p0)] uppercase">
            Key product decision
          </p>
          <h2
            id="sec-decision"
            className="mt-1.5 text-[1.35rem] leading-[1.25] font-medium tracking-[-0.02em] text-[var(--fg)]"
          >
            {study.keyDecision.title}
          </h2>
          <dl className="mt-5 space-y-4 text-[14.5px] leading-[1.65]">
            <div>
              <dt className="font-semibold text-[var(--fg)]">What we chose</dt>
              <dd className="mt-1 text-[var(--fg-secondary)]">{study.keyDecision.chosen}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--fg)]">Alternative rejected</dt>
              <dd className="mt-1 text-[var(--fg-secondary)]">{study.keyDecision.rejected}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--fg)]">Reasoning</dt>
              <dd className="mt-1 text-[var(--fg-secondary)]">{study.keyDecision.why}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="sec-architecture" className="border-t border-[var(--line)] pt-8">
          <h2
            id="sec-architecture"
            className="text-[1.55rem] leading-[1.2] font-medium tracking-[-0.025em] text-[var(--fg)]"
          >
            How it works
          </h2>
          <ul className="mt-4 space-y-3 text-[15.5px] leading-[1.68] text-[var(--fg-secondary)]">
            {study.architectureNotes.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono-meta mt-1 text-[12px] text-[var(--mut)]">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {study.secondaryImages && study.secondaryImages.length > 0 && (
          <section aria-labelledby="sec-artifacts" className="border-t border-[var(--line)] pt-8">
            <h2
              id="sec-artifacts"
              className="text-[1.55rem] leading-[1.2] font-medium tracking-[-0.025em] text-[var(--fg)]"
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

        <section aria-labelledby="sec-limits" className="border-t border-[var(--line)] pt-8">
          <h2
            id="sec-limits"
            className="text-[1.45rem] leading-[1.2] font-medium tracking-[-0.02em] text-[var(--fg)]"
          >
            Boundaries &amp; limitations
          </h2>
          <ul className="mt-4 space-y-2.5 text-[14.5px] leading-[1.65] text-[var(--fg-secondary)]">
            {study.limitations.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono-meta mt-1 text-[12px] text-[var(--mut)]">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14.5px] leading-[1.65] text-[var(--fg)]">
            <span className="font-semibold">Next step:</span> {study.nextStep}
          </p>
        </section>
      </div>

      <nav
        aria-label="Next case study"
        className="mt-14 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center"
      >
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-[14.5px] text-[var(--fg-secondary)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All selected work</span>
        </Link>

        <Link
          to={`/work/${nextStudy.slug}`}
          onNavigate={onNavigate}
          className="inline-flex min-h-[40px] items-center gap-2 text-[15px] font-semibold text-[var(--p0)] hover:text-white"
        >
          <span>Next: {nextStudy.title}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
};
