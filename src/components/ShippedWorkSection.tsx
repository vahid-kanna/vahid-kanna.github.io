import React, { useState } from 'react';
import { Code2, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../utils/portfolioLogic';
import { PROJECTS_DATA } from '../utils/portfolioData';
import { TiltCard } from './TiltCard';

interface ShippedWorkSectionProps {
  onViewAllWork: () => void;
  onSelectProjectModal: (project: ProjectItem) => void;
}

export const ShippedWorkSection: React.FC<ShippedWorkSectionProps> = ({
  onViewAllWork,
  onSelectProjectModal,
}) => {
  const featuredProjects = PROJECTS_DATA.slice(0, 4);
  const [expandedId, setExpandedId] = useState<string | null>(featuredProjects[0].id);

  const toggleCard = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, idx: number, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(id);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = featuredProjects[(idx + 1) % featuredProjects.length];
      setExpandedId(next.id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev =
        featuredProjects[(idx - 1 + featuredProjects.length) % featuredProjects.length];
      setExpandedId(prev.id);
    }
  };

  return (
    <section
      id="work"
      data-section="work"
      className="relative z-10 mx-auto w-full max-w-6xl px-5 py-[clamp(80px,12vh,140px)] sm:px-8"
    >
      <header className="border-b border-[var(--line)] pb-4 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-[50px] font-normal tracking-[-0.03em] leading-[1.08] text-[var(--fg)] text-halo">
              Things I've shipped
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--fg)]/80 font-normal leading-relaxed text-halo">
              Selected work across offline-first PWAs, B2B SaaS, and agentic systems.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--mut)] shrink-0 sm:pb-1">
            <button
              type="button"
              onClick={onViewAllWork}
              className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--mut)] transition-colors hover:text-[var(--fg)] cursor-pointer whitespace-nowrap"
            >
              <span>view all case studies</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className="w-full flex flex-col md:flex-row items-stretch gap-4 md:min-h-[450px]"
        role="tablist"
        aria-label="Interactive project showcase"
      >
        {featuredProjects.map((project, idx) => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              aria-label={`${project.title}. Press Enter or Space to expand, or use Arrow keys to switch.`}
              onClick={() => toggleCard(project.id)}
              onKeyDown={(e) => handleCardKeyDown(e, idx, project.id)}
              className="group relative outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 rounded-2xl cursor-pointer select-none transition-all duration-300 md:min-w-[145px]"
              style={{
                flex: isExpanded ? '2.8 1 0%' : '1 1 0%',
                transition: 'flex 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <TiltCard
                intensity={isExpanded ? 4 : 7}
                palette="blueprint"
                className="h-full w-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md bg-[#111113]/90 border-[var(--line)] hover:border-[var(--mut)] shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
              >
                {/* Top Metadata Row */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--mut)] pb-3 border-b border-[var(--line)]/60 shrink-0 tabular-nums">
                  <span>{project.year}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1 font-mono text-[var(--mut)]">
                      <span>★</span>
                      <span>{project.stars}</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--fg)] font-medium hidden xl:inline-block">
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* Middle Content */}
                <div className="my-auto py-4 flex flex-col justify-center min-w-0">
                  <h3
                    className={`font-normal tracking-[-0.03em] text-[var(--fg)] transition-all duration-300 leading-tight group-hover:text-halo ${
                      isExpanded
                        ? 'text-xl sm:text-2xl md:text-[26px]'
                        : 'text-base sm:text-lg md:text-[17px] md:truncate'
                    }`}
                    title={project.title}
                  >
                    {project.title}
                  </h3>

                  {!isExpanded && (
                    <div className="flex items-center gap-1.5 mt-2 opacity-75 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-[var(--mut)]">
                      <span className="truncate max-w-[95px]">{project.tags[0]}</span>
                      <span>·</span>
                      <span>+{project.tags.length - 1}</span>
                    </div>
                  )}

                  {isExpanded && (
                    <div className="mt-3 flex flex-col transition-all duration-300">
                      <p className="text-sm sm:text-[15px] text-[var(--fg)]/85 leading-relaxed font-sans mb-4">
                        {project.shortDesc}
                      </p>

                      <div className="mb-4 pt-3 border-t border-[var(--line)]/50">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--mut)] mb-1.5">
                          Impact &amp; Architecture
                        </div>
                        <p className="text-xs text-[var(--fg)]/75 leading-relaxed font-sans mb-2.5">
                          {project.details}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[var(--fg)]/90 tabular-nums">
                          {project.metrics.map((m, mIdx) => (
                            <React.Fragment key={m}>
                              <span>{m}</span>
                              {mIdx < project.metrics.length - 1 && (
                                <span className="text-[var(--mut)]" aria-hidden="true">
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Unboxed clean tech stack metadata */}
                      <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-[11px] text-[var(--mut)]">
                        {project.tags.map((tag, tIdx) => (
                          <React.Fragment key={tag}>
                            <span className="text-[var(--fg)]/85">{tag}</span>
                            {tIdx < project.tags.length - 1 && (
                              <span aria-hidden="true">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Links */}
                      <div
                        className="flex flex-wrap items-center gap-5 text-xs font-mono pt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--mut)] hover:text-[var(--fg)] transition-colors hover:underline whitespace-nowrap"
                        >
                          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Code</span>
                          <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden="true" />
                        </a>

                        <button
                          type="button"
                          onClick={() => onSelectProjectModal(project)}
                          className="inline-flex items-center gap-1.5 text-[var(--fg)] font-medium hover:underline cursor-pointer whitespace-nowrap"
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Inspect Architecture</span>
                          <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Footer Bar */}
                <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-mono shrink-0">
                  <span className="text-[10px] text-[var(--mut)] group-hover:text-[var(--fg)] uppercase tracking-wider transition-colors">
                    {isExpanded ? 'COLLAPSE' : 'EXPAND'}
                  </span>
                  <span className="text-xs text-[var(--mut)] group-hover:text-[var(--fg)] transition-all">
                    {isExpanded ? '−' : '+'}
                  </span>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};
