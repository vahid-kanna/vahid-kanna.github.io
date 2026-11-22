import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ABOUT_CONTENT, EXPERIENCE_LEDGER } from '../data/site';
import { CASE_STUDIES, LAB_ITEMS } from '../data/work';
import { FIELD_NOTES, estimateReadMinutes } from '../data/writing';
import { LanyardBadgeHero } from '../components/LanyardBadgeHero';
import { Link } from '../components/Link';
import { ProductPlate } from '../components/ProductPlate';
import { StageBadge } from '../components/StageBadge';
import { ZeroEkaSchematic } from '../components/ZeroEkaSchematic';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenLlms: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLlms }) => {
  return (
    <div>
      {/* HERO — Draggable & flippable Verlet Lanyard ID Badge customized to Vahid */}
      <LanyardBadgeHero onNavigate={onNavigate} onOpenLlms={onOpenLlms} />

      {/* SECTION 1: SELECTED WORK — Clean dark editorial plates, zero AI-slop boxes, zero accordion lag */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="relative z-10 border-t border-[var(--line)] bg-[var(--bg)]/84"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-meta text-[12px] tracking-[0.08em] text-[var(--mut)] uppercase">
                Selected work · 01–04
              </p>
              <h2
                id="work-heading"
                className="text-halo mt-2 text-[clamp(2rem,3.6vw,2.85rem)] leading-[1.08] font-normal tracking-[-0.03em] text-[var(--fg)]"
              >
                Products &amp; case studies
              </h2>
              <p className="mt-2.5 max-w-[58ch] text-[15.5px] leading-[1.6] text-[var(--fg-secondary)]">
                Four builds spanning customer discovery, offline field software, operational AI workflows, and B2B SaaS product strategy.
              </p>
            </div>
            <Link
              to="/lab"
              onNavigate={onNavigate}
              className="font-mono-meta inline-flex min-h-[40px] w-fit items-center gap-1.5 text-[13px] text-[var(--p0)] hover:text-white"
            >
              <span>All engineering builds</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-[var(--line)]">
            {CASE_STUDIES.map((study, idx) => (
              <article
                key={study.slug}
                className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
              >
                {/* Visual evidence plate first on mobile; right 7 cols on desktop */}
                <div className="order-1 lg:order-2 lg:col-span-7">
                  {study.primaryImage ? (
                    <ProductPlate
                      image={study.primaryImage}
                      priority={idx === 0}
                      href={`/work/${study.slug}`}
                      linkLabel={`Read ${study.title} case study`}
                      onNavigate={onNavigate}
                    />
                  ) : study.useZeroEkaSchematic ? (
                    <ZeroEkaSchematic />
                  ) : null}
                </div>

                {/* Grounded human product story — left 5 cols */}
                <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono-meta text-[12px] text-[var(--mut)]">
                        {study.index}
                      </span>
                      <StageBadge label={study.stageLabel} tone={study.stageTone} />
                      <span className="font-mono-meta text-[12px] text-[var(--mut)]">
                        {study.period}
                      </span>
                    </div>

                    <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.15] font-medium tracking-[-0.025em] text-[var(--fg)]">
                      <Link
                        to={`/work/${study.slug}`}
                        onNavigate={onNavigate}
                        className="hover:text-[var(--p0)]"
                      >
                        {study.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-[14px] text-[var(--mut)]">
                      {study.role} · {study.domain}
                    </p>

                    <p className="mt-4 text-[15.5px] leading-[1.68] text-[var(--fg-secondary)]">
                      {study.summary}
                    </p>

                    <dl className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                      {study.evidenceStrip.map((ev) => (
                        <div
                          key={ev.label}
                          className="grid grid-cols-[112px_1fr] items-baseline gap-3 py-2.5 text-[13.5px]"
                        >
                          <dt className="font-mono-meta text-[11.5px] text-[var(--mut)]">
                            {ev.label}
                          </dt>
                          <dd className="font-medium text-[var(--fg)]">{ev.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <Link
                      to={`/work/${study.slug}`}
                      onNavigate={onNavigate}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-[14.5px] font-semibold text-[var(--p0)] hover:text-white"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="editorial-link inline-flex min-h-[40px] items-center gap-1 text-[14px] text-[var(--fg-secondary)] hover:text-white"
                      >
                        <span>{study.liveLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}

                    {study.repoUrl && (
                      <a
                        href={study.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="editorial-link inline-flex min-h-[40px] items-center gap-1 text-[14px] text-[var(--fg-secondary)] hover:text-white"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: ENGINEERING LAB — Clean hairline rows, visually distinct from flagships */}
      <section
        id="lab"
        aria-labelledby="lab-heading"
        className="relative z-10 border-t border-[var(--line)] bg-[#111110]/88"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-meta text-[12px] tracking-[0.08em] text-[var(--mut)] uppercase">
                Open source &amp; research
              </p>
              <h2
                id="lab-heading"
                className="text-halo mt-2 text-[clamp(1.85rem,3vw,2.45rem)] leading-[1.1] font-normal tracking-[-0.03em] text-[var(--fg)]"
              >
                Engineering lab
              </h2>
              <p className="mt-2 max-w-[58ch] text-[15px] text-[var(--fg-secondary)]">
                Practical campus utilities, local retrieval experiments, and audited historical backtests.
              </p>
            </div>
            <Link
              to="/lab"
              onNavigate={onNavigate}
              className="font-mono-meta inline-flex min-h-[40px] w-fit items-center gap-1.5 text-[13px] text-[var(--p0)] hover:text-white"
            >
              <span>Full lab archive</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {LAB_ITEMS.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="font-mono-meta text-[12.5px] text-[var(--mut)] md:col-span-2">
                  {item.year}
                </span>
                <div className="md:col-span-4">
                  <h3 className="text-[15.5px] font-semibold text-[var(--fg)]">{item.title}</h3>
                  <p className="font-mono-meta mt-0.5 text-[11.5px] text-[var(--mut)]">
                    {item.stage}
                  </p>
                </div>
                <p className="text-[14.5px] leading-[1.58] text-[var(--fg-secondary)] md:col-span-4">
                  {item.summary}
                </p>
                <div className="md:col-span-2 md:text-right">
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[36px] items-center gap-1 text-[13.5px] font-medium text-[var(--fg)]"
                  >
                    <span>Repository</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: EXPERIENCE & LEADERSHIP — Grounded chronological ledger (zero Civil Engineering / CEA) */}
      <section
        id="experience"
        aria-labelledby="exp-heading"
        className="relative z-10 border-t border-[var(--line)] bg-[var(--bg)]/84"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono-meta text-[12px] tracking-[0.08em] text-[var(--mut)] uppercase">
                Track record
              </p>
              <h2
                id="exp-heading"
                className="text-halo mt-2 text-[clamp(1.85rem,3vw,2.45rem)] leading-[1.1] font-normal tracking-[-0.03em] text-[var(--fg)]"
              >
                Experience &amp; leadership
              </h2>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[var(--fg-secondary)]">
                Venture building, product internship work, and large-scale campus operations at IIT Madras.
              </p>
            </div>

            <ol className="divide-y divide-[var(--line)] border-t border-[var(--line)] lg:col-span-8 lg:border-t-0">
              {EXPERIENCE_LEDGER.map((entry) => (
                <li
                  key={`${entry.role}-${entry.period}`}
                  className="grid grid-cols-1 gap-2 py-5 first:pt-0 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="font-mono-meta text-[12.5px] text-[var(--mut)] sm:col-span-4">
                    {entry.period}
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="text-[16px] font-semibold text-[var(--fg)]">{entry.role}</h3>
                    <p className="text-[14px] text-[var(--mut)]">{entry.organization}</p>
                    <p className="mt-2 text-[14.5px] leading-[1.62] text-[var(--fg-secondary)]">
                      {entry.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 4: FIELD NOTES — Reverse-chronological, real computed read times */}
      <section
        id="writing"
        aria-labelledby="writing-heading"
        className="relative z-10 border-t border-[var(--line)] bg-[#111110]/88"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono-meta text-[12px] tracking-[0.08em] text-[var(--mut)] uppercase">
                Writing
              </p>
              <h2
                id="writing-heading"
                className="text-halo mt-2 text-[clamp(1.85rem,3vw,2.45rem)] leading-[1.1] font-normal tracking-[-0.03em] text-[var(--fg)]"
              >
                Field notes
              </h2>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[var(--fg-secondary)]">
                Short essays on what changed when software met real users and messy inputs.
              </p>
              <Link
                to="/writing"
                onNavigate={onNavigate}
                className="font-mono-meta mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-[var(--p0)] hover:text-white"
              >
                <span>All notes</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)] lg:col-span-8 lg:border-t-0">
              {FIELD_NOTES.map((note) => {
                const mins = estimateReadMinutes(note.paragraphs);
                return (
                  <article key={note.slug} className="py-6 first:pt-0">
                    <div className="font-mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--mut)]">
                      <time dateTime={note.isoDate}>{note.date}</time>
                      <span aria-hidden="true">·</span>
                      <span>{mins} min read</span>
                      <span aria-hidden="true">·</span>
                      <span>{note.topic}</span>
                    </div>
                    <h3 className="mt-2 text-[1.3rem] leading-[1.28] font-medium tracking-[-0.02em] text-[var(--fg)]">
                      <Link
                        to={`/writing/${note.slug}`}
                        onNavigate={onNavigate}
                        className="inline-block py-1 hover:text-[var(--p0)]"
                      >
                        {note.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.62] text-[var(--fg-secondary)]">
                      {note.summary}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL ABOUT — Replaces "Views nobody asked for" with genuine human story */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative z-10 border-t border-[var(--line)] bg-[var(--bg)]/84"
      >
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono-meta text-[12px] tracking-[0.08em] text-[var(--mut)] uppercase">
                Background
              </p>
              <h2
                id="about-heading"
                className="text-halo mt-2 text-[clamp(1.85rem,3vw,2.45rem)] leading-[1.1] font-normal tracking-[-0.03em] text-[var(--fg)]"
              >
                About Vahid
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p className="max-w-[62ch] text-[17px] leading-[1.68] text-[var(--fg)]">
                {ABOUT_CONTENT.intro}
              </p>
              <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.68] text-[var(--fg-secondary)]">
                {ABOUT_CONTENT.paragraphs[0]}
              </p>
              <Link
                to="/about"
                onNavigate={onNavigate}
                className="font-mono-meta mt-5 inline-flex min-h-[40px] items-center gap-1.5 text-[13.5px] text-[var(--p0)] hover:text-white"
              >
                <span>Read full background &amp; how I work</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
