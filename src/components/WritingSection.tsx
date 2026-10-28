import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { EssayItem } from '../utils/portfolioLogic';
import { ESSAYS_DATA } from '../utils/portfolioData';
import { TiltCard } from './TiltCard';

interface WritingSectionProps {
  onViewAllWriting: () => void;
  onSelectEssay: (essay: EssayItem) => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  onViewAllWriting,
  onSelectEssay,
}) => {
  return (
    <section
      id="writing"
      data-section="writing"
      className="relative z-10 mx-auto w-full max-w-6xl border-t border-[var(--line)] px-5 py-[clamp(80px,12vh,140px)] sm:px-8"
    >
      <header className="border-b border-[var(--line)] pb-4 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-[50px] font-normal tracking-[-0.03em] leading-[1.08] text-[var(--fg)] text-halo">
              Writing
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--fg)]/80 font-normal leading-relaxed text-halo">
              Engineering dispatches on offline-first PWAs, telemetry UX, and quant backtesting.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--mut)] shrink-0 sm:pb-1">
            <button
              type="button"
              onClick={onViewAllWriting}
              className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--mut)] transition-colors hover:text-[var(--fg)] cursor-pointer whitespace-nowrap"
            >
              <span>all essays &amp; dispatches</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </header>

      <div className="divide-y divide-[var(--line)] border-b border-[var(--line)]">
        {ESSAYS_DATA.map((essay) => (
          <article key={essay.id} className="group relative w-full transition-all duration-300">
            <TiltCard intensity={2.5} palette="editorial">
              <button
                type="button"
                onClick={() => onSelectEssay(essay)}
                className="block w-full text-left px-4 sm:px-6 py-7 transition-all duration-300 bg-transparent hover:bg-[var(--fg)]/[0.025] focus-visible:outline-2 focus-visible:outline-[var(--fg)] cursor-pointer"
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

                    {/* Clean unboxed hashtags separated by middle dots */}
                    <div className="flex items-center gap-2">
                      {essay.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span className="text-[11px] font-mono text-[var(--mut)] group-hover:text-[var(--fg)] transition-colors">
                            {tag}
                          </span>
                          {idx < essay.tags.length - 1 && (
                            <span aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 mt-1">
                    <h3 className="text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-[-0.025em] leading-snug group-hover:text-halo transition-colors duration-200">
                      <span className="group-hover:underline underline-offset-4 decoration-[var(--line)] transition-all">
                        {essay.title}
                      </span>
                    </h3>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-transparent group-hover:border-[var(--line)] transition-all duration-200 mt-1">
                      <ArrowUpRight
                        className="w-4 h-4 text-[var(--mut)] group-hover:text-[var(--fg)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <p className="text-[14px] sm:text-[15px] text-[var(--fg)]/80 leading-relaxed line-clamp-2 mt-1 font-normal group-hover:text-[var(--fg)]/90 transition-colors">
                    {essay.excerpt}
                  </p>
                </div>
              </button>
            </TiltCard>
          </article>
        ))}
      </div>
    </section>
  );
};
