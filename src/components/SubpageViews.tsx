import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Clock, ArrowUpRight, Globe } from 'lucide-react';
import {
  ProjectItem,
  EssayItem,
  filterProjectsByCategory,
  filterEssaysByTag,
} from '../utils/portfolioLogic';
import {
  PROJECTS_DATA,
  ESSAYS_DATA,
  ABOUT_DATA,
  PROFILE_DATA,
} from '../utils/portfolioData';
import { TiltCard } from './TiltCard';
import {
  SyncProSimulatorWidget,
  RailRakshaVectorWidget,
} from './ProductSimulators';
import { playTactileClick } from '../utils/soundEngine';

interface WorkPageViewProps {
  onSelectProjectModal: (project: ProjectItem) => void;
}

export const WorkPageView: React.FC<WorkPageViewProps> = ({ onSelectProjectModal }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  const filteredProjects = filterProjectsByCategory(PROJECTS_DATA, categoryFilter);

  const toggleExpand = (id: string) => {
    setExpandedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-12 font-sans relative z-10">
      <header className="border-b border-[var(--line)] pb-5 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mut)] mb-2">
              SYS.ARCHIVE // PRODUCT, VENTURES &amp; SYSTEMS CASE STUDIES
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-normal tracking-[-0.03em] leading-[1.08] text-[var(--fg)] text-halo">
              Work &amp; Ventures
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--fg)]/80 font-normal leading-relaxed text-halo">
              Deep-dive case studies across B2B construction SaaS (SyncPro.org), Indian Railways safety (RailRaksha.tech), quantitative alpha engines, and product telemetry.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--mut)] shrink-0 sm:pb-1 tabular-nums">
            <span>{filteredProjects.length} case studies</span>
          </div>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--line)] bg-[var(--bg)]/80 w-fit font-mono text-xs">
          {[
            { id: 'all', label: 'All Work' },
            { id: 'product', label: 'Ventures & Product Strategy' },
            { id: 'ai-systems', label: 'Quant & Autonomous Systems' },
            { id: 'frontend', label: 'Safety PWAs & Tactile UI' },
          ].map((tab) => {
            const active = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[var(--fg)] text-[var(--bg)] font-medium'
                    : 'text-[var(--mut)] hover:text-[var(--fg)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isOpen = !!expandedCardIds[project.id];
          const hasExternalLive = project.liveUrl.startsWith('http');
          return (
            <TiltCard
              key={project.id}
              intensity={6}
              palette="blueprint"
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-colors duration-300 h-full border-[var(--line)] bg-[#111113]/90 hover:border-[var(--fg)]/35 shadow-sm backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--mut)] mb-4 pb-2 border-b border-[var(--line)]/60 tabular-nums">
                  <span>{project.year}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[var(--mut)]">
                      <span>★</span>
                      <span>{project.stars}</span>
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--fg)] font-medium">
                      {project.category === 'product' ? 'VENTURE / PM' : 'SYSTEMS'}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.03em] text-[var(--fg)] group-hover:text-halo transition-colors mb-2.5">
                  {project.title}
                </h2>

                <p className="text-sm text-[var(--fg)]/85 leading-relaxed mb-4">
                  {project.shortDesc}
                </p>

                {isOpen && (
                  <div className="mb-4 pt-3 border-t border-[var(--line)]/60 text-xs text-[var(--fg)]/80 space-y-2.5">
                    <p className="leading-relaxed">{project.details}</p>
                    <ul className="space-y-1 font-mono text-[11px] text-[var(--fg)]/90 tabular-nums">
                      {project.metrics.map((m) => (
                        <li key={m}>· {m}</li>
                      ))}
                    </ul>
                    {project.id === 'syncpro' && <SyncProSimulatorWidget />}
                    {project.id === 'railraksha' && <RailRakshaVectorWidget />}
                  </div>
                )}

                {/* Unboxed metadata with middle dot separators */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5 font-mono text-[11px] text-[var(--mut)]">
                  {project.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className="text-[var(--fg)]/85">{tag}</span>
                      {idx < project.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]/60 mt-2 font-mono text-xs">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleExpand(project.id)}
                  className="text-[var(--mut)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>{isOpen ? 'Collapse' : 'Metrics'}</span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>

                <div className="flex items-center gap-3">
                  {hasExternalLive && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <Globe className="w-3 h-3" aria-hidden="true" />
                      <span>Live</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectProjectModal(project)}
                    className="text-[var(--fg)] hover:underline inline-flex items-center gap-1 group/link cursor-pointer whitespace-nowrap"
                  >
                    <span>Case Study</span>
                    <ArrowRight
                      className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
};

interface WritingPageViewProps {
  onSelectEssay: (essay: EssayItem) => void;
}

export const WritingPageView: React.FC<WritingPageViewProps> = ({ onSelectEssay }) => {
  const [tagFilter, setTagFilter] = useState<string>('all');
  const filteredEssays = filterEssaysByTag(ESSAYS_DATA, tagFilter);

  const availableTags = [
    'all',
    '#product',
    '#pwa',
    '#safety-systems',
    '#saas',
    '#founders',
    '#quant',
    '#telemetry',
    '#strategy',
  ];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-24 pb-12 font-sans relative z-10">
      <header className="border-b border-[var(--line)] pb-5 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mut)] mb-2">
              SYS.WRITING // FIELD MEMOS, PRDS &amp; QUANT AUDITS
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-normal tracking-[-0.03em] leading-[1.08] text-[var(--fg)] text-halo">
              Writing
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--fg)]/80 font-normal leading-relaxed text-halo">
              Field dispatches on railway safety PWAs, construction delay prediction, False Discovery Rate (FDR) backtesting, and macro-governance.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--mut)] shrink-0 sm:pb-1 tabular-nums">
            <span>{filteredEssays.length} posts</span>
          </div>
        </div>

        {/* Interactive Tag Filter */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--line)] bg-[var(--bg)]/80 w-fit font-mono text-xs">
          {availableTags.map((tag) => {
            const active = tagFilter === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setTagFilter(tag)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[var(--fg)] text-[var(--bg)] font-medium'
                    : 'text-[var(--mut)] hover:text-[var(--fg)]'
                }`}
              >
                {tag === 'all' ? 'All dispatches' : tag}
              </button>
            );
          })}
        </div>
      </header>

      <div className="divide-y divide-[var(--line)] border-b border-[var(--line)]">
        {filteredEssays.map((essay) => (
          <article key={essay.id} className="group relative w-full transition-all duration-300">
            <button
              type="button"
              onClick={() => onSelectEssay(essay)}
              className="block w-full text-left px-4 sm:px-6 py-7 transition-all duration-300 bg-transparent hover:bg-[var(--fg)]/[0.02] cursor-pointer"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--mut)] tabular-nums">
                  <div className="flex items-center gap-2.5">
                    <time dateTime={essay.isoDate}>{essay.date}</time>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 opacity-70" aria-hidden="true" />
                      <span>{essay.readTime}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {essay.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {idx < essay.tags.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 mt-1">
                  <h2 className="text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-[-0.025em] leading-snug group-hover:underline underline-offset-4">
                    {essay.title}
                  </h2>
                  <ArrowUpRight className="w-4 h-4 text-[var(--mut)] group-hover:text-[var(--fg)] shrink-0 mt-1" />
                </div>

                <p className="text-[14px] sm:text-[15px] text-[var(--fg)]/80 leading-relaxed mt-1">
                  {essay.excerpt}
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export const AboutPageView: React.FC = () => {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-5 sm:px-8 pt-24 pb-12 flex flex-col justify-between font-sans relative z-10">
      <div>
        <div className="mb-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mut)] mb-2">
            SYS.DOSSIER // SHAIK VAHID BASHA · IIT MADRAS (&apos;27) · PRODUCT &amp; SYSTEMS
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-[var(--fg)] text-halo">
              About Vahid
            </h1>
            <a
              href={PROFILE_DATA.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)]/90 font-mono text-xs text-[var(--fg)] hover:border-[var(--fg)] transition-colors whitespace-nowrap"
            >
              <span>View Product &amp; Strategy Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="space-y-6 text-[16px] sm:text-[17.5px] leading-[1.78] text-[var(--fg)]/90 max-w-[66ch]">
            {ABOUT_DATA.introParagraphs.map((para, i) => (
              <p key={i} className="text-halo font-normal">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* HOW I WORK */}
        <div className="py-8 border-t border-[var(--line)] mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--mut)] mb-6">
            Product &amp; Systems Philosophy ("Engineering with Feeling")
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_DATA.howIWork.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--line)] bg-[#111113]/85 backdrop-blur-md shadow-sm"
              >
                <div className="font-medium text-[15px] text-[var(--fg)] mb-1.5">
                  {item.title}
                </div>
                <p className="text-[13.5px] text-[var(--fg)]/80 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TECHNICAL & PRODUCT STACK */}
        <div className="py-8 border-t border-[var(--line)] mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--mut)] mb-5">
            Product, Quantitative &amp; Engineering Craft
          </h2>
          <div className="space-y-4">
            {ABOUT_DATA.skillsMatrix.map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[var(--line)]/50"
              >
                <span className="font-mono text-xs text-[var(--fg)] font-medium shrink-0">
                  {row.label}
                </span>
                <span className="font-mono text-xs text-[var(--mut)] sm:text-right">
                  {row.items}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LEADERSHIP & SCALE AT IIT MADRAS */}
        <div className="py-8 border-t border-[var(--line)] mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--mut)] mb-5">
            Venture Leadership &amp; Institutional Scale at IIT Madras
          </h2>
          <div className="space-y-5">
            {ABOUT_DATA.leadershipAndScale.map((lead) => (
              <div
                key={lead.role}
                className="p-5 rounded-xl border border-[var(--line)] bg-[#111113]/75"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="text-[15px] font-medium text-[var(--fg)]">{lead.role}</span>
                  <span className="font-mono text-[11px] text-[var(--mut)] tabular-nums">
                    {lead.period}
                  </span>
                </div>
                <p className="text-[13.5px] text-[var(--fg)]/80 leading-relaxed">
                  {lead.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION, ROOTS & PERSONAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-t border-[var(--line)] mb-10">
          <div className="p-5 rounded-xl border border-[var(--line)] bg-[#111113]/75 backdrop-blur-sm">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--mut)] mb-3">
              Education &amp; Campus Coordinates
            </h2>
            <div className="space-y-2.5 text-[13.5px] text-[var(--fg)]/90 leading-relaxed">
              <div>
                <div className="font-medium">Indian Institute of Technology Madras</div>
                <div className="font-mono text-xs text-[var(--mut)] tabular-nums">
                  Undergraduate Program (2023–2027) · IIT Madras (&apos;27)
                </div>
                <div className="font-mono text-[11px] text-[var(--mut)] mt-0.5">
                  Minors: Personal &amp; Professional Development · International Relations
                </div>
              </div>
              <div className="pt-2 border-t border-[var(--line)]/50">
                <div className="font-medium">Bhashyam Junior College &amp; High School</div>
                <div className="font-mono text-xs text-[var(--mut)] tabular-nums">
                  Class XII: 95.84% (2023) · Class X: 10.0 CGPA (2021)
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[var(--line)] bg-[#111113]/75 backdrop-blur-sm">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--mut)] mb-3">
              Roots, Horizons &amp; Personal
            </h2>
            <ul className="space-y-2 text-xs font-mono text-[var(--fg)]/85">
              {ABOUT_DATA.funFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-2">
                  <span className="text-[var(--mut)] font-bold">·</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ELSEWHERE & LIVE PLATFORMS */}
        <div className="pt-8 border-t border-[var(--line)]">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--mut)] mb-6">
            Live Ventures &amp; Coordinates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href={PROFILE_DATA.socials.syncproLive}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-[var(--line)] hover:border-[var(--fg)]/40 transition-all flex items-center justify-between font-mono text-xs bg-[#111113]/80 backdrop-blur-sm"
            >
              <div>
                <span className="text-[var(--fg)] font-medium block">SyncPro</span>
                <span className="text-[10px] text-emerald-300">syncpro.org</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--mut)] group-hover:text-[var(--fg)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE_DATA.socials.railrakshaLive}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-[var(--line)] hover:border-[var(--fg)]/40 transition-all flex items-center justify-between font-mono text-xs bg-[#111113]/80 backdrop-blur-sm"
            >
              <div>
                <span className="text-[var(--fg)] font-medium block">RailRaksha</span>
                <span className="text-[10px] text-cyan-300">railraksha.tech</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--mut)] group-hover:text-[var(--fg)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-[var(--line)] hover:border-[var(--fg)]/40 transition-all flex items-center justify-between font-mono text-xs bg-[#111113]/80 backdrop-blur-sm"
            >
              <div>
                <span className="text-[var(--fg)] font-medium block">GitHub</span>
                <span className="text-[10px] text-[var(--mut)]">@vahid-kanna</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--mut)] group-hover:text-[var(--fg)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-[var(--line)] hover:border-[var(--fg)]/40 transition-all flex items-center justify-between font-mono text-xs bg-[#111113]/80 backdrop-blur-sm"
            >
              <div>
                <span className="text-[var(--fg)] font-medium block">LinkedIn</span>
                <span className="text-[10px] text-[var(--mut)]">shaik-vahid-basha</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--mut)] group-hover:text-[var(--fg)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
