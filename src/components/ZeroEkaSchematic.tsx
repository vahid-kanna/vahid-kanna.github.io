import React from 'react';

const STEPS = [
  {
    code: '01',
    title: 'Document Ingestion PRD',
    detail: 'Scoped PDF and slide-deck ingestion into structured course outlines with reviewer approval gates.',
    artifact: 'PRD & edge-case spec',
  },
  {
    code: '02',
    title: 'PostHog Funnel Telemetry',
    detail: 'Defined onboarding event taxonomy to pinpoint learner drop-off steps and prioritize engineering fixes.',
    artifact: 'Event taxonomy & audit',
  },
  {
    code: '03',
    title: '3-Tier B2B Pricing',
    detail: 'Structured seat and team tiers anchored to delivery economics rather than ad-hoc discounting.',
    artifact: 'Unit-economics sheet',
  },
  {
    code: '04',
    title: '30-Day Enterprise PoC',
    detail: 'Packaged a time-boxed pilot with explicit ingestion and completion criteria to convert prospects.',
    artifact: 'Pilot conversion playbook',
  },
];

export const ZeroEkaSchematic: React.FC = () => {
  return (
    <figure className="m-0">
      <div className="product-plate overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface-subtle)]/60 px-5 py-3.5 sm:px-6">
          <span className="font-mono-meta text-[12px] tracking-[0.04em] text-[var(--ink)]">
            ZEROEKA · PRODUCT &amp; STRATEGY SPECIFICATION
          </span>
          <span className="font-mono-meta text-[12px] text-[var(--ink-muted)]">
            Proprietary UI omitted
          </span>
        </div>

        <ol className="grid grid-cols-1 divide-y divide-[var(--border)] sm:grid-cols-2 sm:divide-y-0">
          {STEPS.map((step, idx) => {
            const borderClasses = [
              idx >= 2 ? 'sm:border-t sm:border-[var(--border)]' : '',
              idx % 2 === 1 ? 'sm:border-l sm:border-[var(--border)]' : '',
            ].join(' ');

            return (
              <li key={step.code} className={`flex flex-col justify-between p-5 sm:p-6 ${borderClasses}`}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-meta text-[12px] font-medium text-[var(--accent)]">
                      {step.code}
                    </span>
                    <span className="font-mono-meta text-[11px] text-[var(--ink-muted)]">
                      {step.artifact}
                    </span>
                  </div>
                  <h4 className="mt-2.5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-[var(--ink-secondary)]">
                    {step.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-[var(--ink-muted)]">
        Conceptual summary of product &amp; strategy scope at ZeroEka (May–Jul 2026). Internal client UI and proprietary telemetry are intentionally omitted.
      </figcaption>
    </figure>
  );
};
