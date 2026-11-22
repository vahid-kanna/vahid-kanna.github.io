import React from 'react';
import { StageTone } from '../data/work';

interface StageBadgeProps {
  label: string;
  tone: StageTone;
}

export const StageBadge: React.FC<StageBadgeProps> = ({ label, tone }) => {
  const styles: Record<StageTone, string> = {
    live: 'border-emerald-400/30 bg-emerald-500/12 text-emerald-200',
    pilot: 'border-amber-300/30 bg-amber-400/12 text-amber-200',
    prototype: 'border-purple-300/30 bg-purple-400/12 text-purple-200',
    archive: 'border-white/15 bg-white/[0.05] text-[var(--fg-secondary)]',
  };

  return (
    <span
      className={`font-mono-meta inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${styles[tone]}`}
    >
      {label}
    </span>
  );
};
