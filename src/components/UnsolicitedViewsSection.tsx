import React, { useState } from 'react';
import { TAKES_DATA } from '../utils/portfolioData';
import { TiltCard } from './TiltCard';

export const UnsolicitedViewsSection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeTake = TAKES_DATA[selectedIdx] || TAKES_DATA[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIdx((idx + 1) % TAKES_DATA.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIdx((idx - 1 + TAKES_DATA.length) % TAKES_DATA.length);
    }
  };

  return (
    <section
      id="about"
      data-section="views"
      aria-label="Views nobody asked for"
      className="relative z-10 mx-auto w-full max-w-6xl px-5 py-[clamp(80px,12vh,140px)] sm:px-8"
    >
      <header className="border-b border-[var(--line)] pb-4 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-[50px] font-normal tracking-[-0.03em] leading-[1.08] text-[var(--fg)] text-halo">
              Views nobody asked for
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--fg)]/80 font-normal leading-relaxed text-halo">
              Unsolicited, unreviewed, occasionally correct field notes.
            </p>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        {/* Left Quote Stage */}
        <TiltCard
          id="take-panel"
          role="tabpanel"
          aria-labelledby={`take-tab-${activeTake.id}`}
          intensity={4}
          palette="opinion"
          className="border border-[var(--line)] bg-[#111113]/90 shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-xl"
        >
          <div className="relative flex min-h-[320px] flex-col justify-between p-6 sm:p-8 md:min-h-[370px] md:p-10">
            <div className="py-6 md:py-8">
              <blockquote className="max-w-4xl font-normal tracking-[-0.035em] text-[var(--fg)] whitespace-pre-line [text-wrap:balance] text-[clamp(22px,3vw,34px)] leading-[1.18]">
                {activeTake.quote}
              </blockquote>
              <p className="mt-5 text-sm text-[var(--mut)] leading-relaxed max-w-xl">
                {activeTake.context}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-4 font-mono text-xs text-[var(--mut)]">
              <span>{activeTake.date}</span>
              <span>{activeTake.topic}</span>
            </div>
          </div>
        </TiltCard>

        {/* Right Tablist Index */}
        <div className="border-y border-[var(--line)]">
          <div
            role="tablist"
            aria-label="Unsolicited takes index"
            className="divide-y divide-[var(--line)]"
          >
            {TAKES_DATA.map((take, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={take.id}
                  id={`take-tab-${take.id}`}
                  type="button"
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  aria-selected={isSelected}
                  aria-controls="take-panel"
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className="group relative flex w-full items-start gap-4 px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-[-2px] sm:px-5 sm:py-4 cursor-pointer"
                >
                  {isSelected && (
                    <span
                      className="absolute inset-0 bg-[var(--fg)]/[0.045]"
                      style={{ opacity: 1 }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-3 bottom-3 w-px origin-center transition-transform duration-300 ${
                      isSelected
                        ? 'scale-y-100 bg-[var(--fg)]'
                        : 'scale-y-0 bg-[var(--mut)] group-hover:scale-y-100'
                    }`}
                  />
                  <div className="relative z-10 min-w-0 flex-1">
                    <div
                      className={`line-clamp-2 text-[14.5px] leading-[1.4] tracking-[-0.015em] transition-[transform,color] duration-200 sm:text-[15.5px] ${
                        isSelected ? 'text-[var(--fg)] font-medium' : 'text-[var(--fg)]/75'
                      } group-hover:translate-x-0.5`}
                    >
                      {take.quote.replace(/[“”]/g, '')}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
