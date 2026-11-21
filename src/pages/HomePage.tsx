import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ABOUT_CONTENT, EXPERIENCE_LEDGER, SITE } from '../data/site';
import { CASE_STUDIES, LAB_ITEMS } from '../data/work';
import { FIELD_NOTES, estimateReadMinutes } from '../data/writing';
import { CopyEmailButton } from '../components/CopyEmailButton';
import { Link } from '../components/Link';
import { ProductPlate } from '../components/ProductPlate';
import { StageBadge } from '../components/StageBadge';
import { ZeroEkaSchematic } from '../components/ZeroEkaSchematic';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* HERO — clear identity, proposition, and actions immediately on first screen */}
      <section className="mx-auto max-w-[1080px] px-5 pt-10 pb-14 sm:px-8 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p className="font-mono-meta flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[var(--ink-muted)]">
              <span>{SITE.roleLine}</span>
              <span aria-hidden="true" className="text-[var(--border-strong)]">/</span>
              <span>{SITE.affiliation}</span>
              <span aria-hidden="true" className="hidden text-[var(--border-strong)] sm:inline">/</span>
              <span className="hidden sm:inline">{SITE.location}</span>
            </p>
            <h1 className="font-display mt-4 max-w-[18ch] text-[clamp(2.35rem,4.9vw,3.75rem)] leading-[1.07] font-normal tracking-[-0.028em] text-[var(--ink)]">
              I turn messy operational workflows into{' '}
              <em className="italic">practical software.</em>
            </h1>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.65] text-[var(--ink-secondary)] sm:text-[18px]">
              I’m Vahid — co-founder &amp; business lead at SyncPro and creator of RailRaksha. I combine customer discovery, commercial thinking, and hands-on prototyping to build tools for real-world operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] bg-[var(--accent)] px-5 py-2.5 text-[15px] font-medium text-[var(--on-accent)] hover:bg-[var(--accent-hover)]"
              >
                <span>Explore selected work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.resumeMailto}
                className="inline-flex min-h-[44px] items-center rounded-[6px] border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-[15px] font-medium text-[var(--ink)] hover:bg-[var(--surface-subtle)]"
              >
                Request resume
              </a>
              <CopyEmailButton />
            </div>
          </div>

          {/* Quiet architectural margin ledger — factual, scannable, WCAG >= 28px inline links */}
          <aside aria-label="At a glance" className="lg:col-span-4">
            <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)] text-[14px]">
              <div className="py-3.5">
                <dt className="font-mono-meta text-[12px] text-[var(--ink-muted)]">Current</dt>
                <dd className="mt-1 text-[var(--ink)]">
                  Co-Founder &amp; Business Lead at{' '}
                  <Link
                    to="/work/syncpro"
                    onNavigate={onNavigate}
                    className="editorial-link inline-flex min-h-[28px] items-center font-medium"
                  >
                    SyncPro
                  </Link>{' '}
                  (Nirmaan, IIT Madras)
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="font-mono-meta text-[12px] text-[var(--ink-muted)]">Live deployments</dt>
                <dd className="mt-0.5 flex flex-wrap gap-x-3.5 gap-y-0.5">
                  <a
                    href={SITE.links.syncpro}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[28px] items-center text-[var(--ink)]"
                  >
                    syncpro.org
                  </a>
                  <a
                    href={SITE.links.railraksha}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[28px] items-center text-[var(--ink)]"
                  >
                    railraksha.tech
                  </a>
                  <a
                    href={SITE.links.zamp}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[28px] items-center text-[var(--ink)]"
                  >
                    zamp.vahidbasha.me
                  </a>
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="font-mono-meta text-[12px] text-[var(--ink-muted)]">Elsewhere</dt>
                <dd className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5">
                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[28px] items-center gap-0.5 text-[var(--ink)]"
                  >
                    GitHub <ArrowUpRight className="h-3.5 w-3.5 text-[var(--ink-muted)]" aria-hidden="true" />
                  </a>
                  <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[28px] items-center gap-0.5 text-[var(--ink)]"
                  >
                    LinkedIn <ArrowUpRight className="h-3.5 w-3.5 text-[var(--ink-muted)]" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* SECTION 1: SELECTED WORK — editorial case plates with real screenshots */}
      <section id="work" aria-labelledby="work-heading" className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="work-heading"
                className="font-display text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)]"
              >
                Selected work
              </h2>
              <p className="mt-2 max-w-[58ch] text-[16px] text-[var(--ink-secondary)]">
                Four projects spanning startup customer discovery, offline field tooling, operational AI workflows, and B2B SaaS product strategy.
              </p>
            </div>
            <Link
              to="/lab"
              onNavigate={onNavigate}
              className="inline-flex min-h-[44px] w-fit items-center gap-1.5 text-[15px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              <span>All engineering builds</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {CASE_STUDIES.map((study, idx) => (
              <article
                key={study.slug}
                className="grid grid-cols-1 gap-7 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
              >
                {/* Visual plate appears first on mobile so visitors immediately see real software; sits on right 7 cols on desktop */}
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

                <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono-meta text-[13px] text-[var(--ink-muted)]">
                        {study.index}
                      </span>
                      <StageBadge label={study.stageLabel} tone={study.stageTone} />
                      <span className="font-mono-meta text-[12px] text-[var(--ink-muted)]">
                        {study.period}
                      </span>
                    </div>

                    <h3 className="font-display mt-3 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.16] tracking-[-0.02em] text-[var(--ink)]">
                      <Link
                        to={`/work/${study.slug}`}
                        onNavigate={onNavigate}
                        className="hover:text-[var(--accent)]"
                      >
                        {study.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-[14px] font-medium text-[var(--ink-secondary)]">
                      {study.role} · {study.domain}
                    </p>

                    <p className="mt-4 text-[16px] leading-[1.65] text-[var(--ink-secondary)]">
                      {study.summary}
                    </p>

                    <dl className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                      {study.evidenceStrip.map((ev) => (
                        <div
                          key={ev.label}
                          className="grid grid-cols-[112px_1fr] items-baseline gap-3 py-2.5 text-[14px]"
                        >
                          <dt className="font-mono-meta text-[12px] text-[var(--ink-muted)]">
                            {ev.label}
                          </dt>
                          <dd className="font-medium text-[var(--ink)]">{ev.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <Link
                      to={`/work/${study.slug}`}
                      onNavigate={onNavigate}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="editorial-link inline-flex min-h-[44px] items-center gap-1 text-[14px] text-[var(--ink-secondary)] hover:text-[var(--ink)]"
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
                        className="editorial-link inline-flex min-h-[44px] items-center gap-1 text-[14px] text-[var(--ink-secondary)] hover:text-[var(--ink)]"
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

      {/* SECTION 2: ENGINEERING LAB — distinct scannable typographic index */}
      <section
        id="lab"
        aria-labelledby="lab-heading"
        className="border-t border-[var(--border)] bg-[var(--surface-subtle)]/50"
      >
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="lab-heading"
                className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)] leading-[1.16] tracking-[-0.02em] text-[var(--ink)]"
              >
                Engineering lab &amp; research
              </h2>
              <p className="mt-2 max-w-[58ch] text-[15px] text-[var(--ink-secondary)]">
                Smaller practical tools, local retrieval prototypes, and historical quantitative research — open to inspect on GitHub.
              </p>
            </div>
            <Link
              to="/lab"
              onNavigate={onNavigate}
              className="inline-flex min-h-[44px] w-fit items-center gap-1.5 text-[15px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              <span>Full lab archive</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {LAB_ITEMS.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="font-mono-meta text-[13px] text-[var(--ink-muted)] md:col-span-2">
                  {item.year}
                </span>
                <div className="md:col-span-4">
                  <h3 className="text-[16px] font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="font-mono-meta mt-0.5 text-[12px] text-[var(--ink-muted)]">
                    {item.stage}
                  </p>
                </div>
                <p className="text-[15px] leading-[1.55] text-[var(--ink-secondary)] md:col-span-4">
                  {item.summary}
                </p>
                <div className="md:col-span-2 md:text-right">
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-link inline-flex min-h-[44px] items-center gap-1 text-[14px] font-medium text-[var(--ink)]"
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

      {/* SECTION 3: EXPERIENCE & LEADERSHIP — compact chronological ledger */}
      <section id="experience" aria-labelledby="exp-heading" className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2
                id="exp-heading"
                className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)] leading-[1.16] tracking-[-0.02em] text-[var(--ink)]"
              >
                Experience &amp; leadership
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-[var(--ink-secondary)]">
                Venture building, product internship experience, and operational leadership across IIT Madras.
              </p>
            </div>

            <ol className="divide-y divide-[var(--border)] border-t border-[var(--border)] lg:col-span-8 lg:border-t-0">
              {EXPERIENCE_LEDGER.map((entry) => (
                <li
                  key={`${entry.role}-${entry.period}`}
                  className="grid grid-cols-1 gap-2 py-5 first:pt-0 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="font-mono-meta text-[13px] text-[var(--ink-muted)] sm:col-span-4">
                    {entry.period}
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="text-[16px] font-semibold text-[var(--ink)]">{entry.role}</h3>
                    <p className="text-[14px] font-medium text-[var(--ink-secondary)]">
                      {entry.organization}
                    </p>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[var(--ink-secondary)]">
                      {entry.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 4: FIELD NOTES — newest first, real computed read times */}
      <section id="writing" aria-labelledby="writing-heading" className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2
                id="writing-heading"
                className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)] leading-[1.16] tracking-[-0.02em] text-[var(--ink)]"
              >
                Field notes
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-[var(--ink-secondary)]">
                Short essays on what actually changed when software met real users and messy inputs.
              </p>
              <Link
                to="/writing"
                onNavigate={onNavigate}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
              >
                <span>All notes</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="divide-y divide-[var(--border)] border-t border-[var(--border)] lg:col-span-8 lg:border-t-0">
              {FIELD_NOTES.map((note) => {
                const mins = estimateReadMinutes(note.paragraphs);
                return (
                  <article key={note.slug} className="py-6 first:pt-0">
                    <div className="font-mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--ink-muted)]">
                      <time dateTime={note.isoDate}>{note.date}</time>
                      <span aria-hidden="true">·</span>
                      <span>{mins} min read</span>
                      <span aria-hidden="true">·</span>
                      <span>{note.topic}</span>
                    </div>
                    <h3 className="font-display mt-2 text-[1.4rem] leading-[1.25] tracking-[-0.015em] text-[var(--ink)]">
                      <Link
                        to={`/writing/${note.slug}`}
                        onNavigate={onNavigate}
                        className="inline-block py-1 hover:text-[var(--accent)]"
                      >
                        {note.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-[var(--ink-secondary)]">
                      {note.summary}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONCISE ABOUT PREVIEW */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-t border-[var(--border)] bg-[var(--surface-subtle)]/50"
      >
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2
                id="about-heading"
                className="font-display text-[clamp(1.7rem,2.8vw,2.2rem)] leading-[1.16] tracking-[-0.02em] text-[var(--ink)]"
              >
                About
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="max-w-[62ch] text-[17px] leading-[1.68] text-[var(--ink)]">
                {ABOUT_CONTENT.intro}
              </p>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.68] text-[var(--ink-secondary)]">
                {ABOUT_CONTENT.paragraphs[0]}
              </p>
              <Link
                to="/about"
                onNavigate={onNavigate}
                className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
              >
                <span>Read full background &amp; how I work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
