import React from 'react';
import { StageTone } from '../data/work';

interface StageBadgeProps {
  label: string;
  tone: StageTone;
}

export const StageBadge: React.FC<StageBadgeProps> = ({ label, tone }) => {
  const styles: Record<StageTone, string> = {
    live: 'bg-[var(--status-live-bg)] text-[var(--status-live-fg)]',
    pilot: 'bg-[var(--status-proto-bg)] text-[var(--status-proto-fg)]',
    prototype: 'bg-[var(--status-proto-bg)] text-[var(--status-proto-fg)]',
    archive: 'bg-[var(--surface-subtle)] text-[var(--ink-secondary)]',
  };

  return (
    <span
      className={`font-mono-meta inline-flex items-center rounded-[4px] px-2 py-0.5 text-[12px] font-medium ${styles[tone]}`}
    >
      {label}
    </span>
  );
};
