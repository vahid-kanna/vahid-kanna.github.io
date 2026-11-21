import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SITE } from '../data/site';

interface CopyEmailButtonProps {
  variant?: 'default' | 'subtle';
  className?: string;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  variant = 'default',
  className = '',
}) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'fallback'>('idle');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SITE.email);
        setStatus('copied');
        window.setTimeout(() => setStatus('idle'), 2400);
        return;
      }
      throw new Error('Clipboard unavailable');
    } catch {
      setStatus('fallback');
    }
  };

  const baseClasses =
    variant === 'default'
      ? 'inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[var(--border-strong)] bg-transparent px-4 py-2 text-[15px] font-medium text-[var(--ink)] hover:bg-[var(--surface-subtle)] cursor-pointer'
      : 'inline-flex min-h-[44px] items-center gap-1.5 rounded-[6px] px-2.5 py-2 text-[14px] font-medium text-[var(--ink-secondary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--ink)] cursor-pointer';

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={`${baseClasses} ${className}`}
        aria-label={`Copy email address ${SITE.email}`}
      >
        {status === 'copied' ? (
          <>
            <Check className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            <span className="text-[var(--accent)]">Email copied</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-[var(--ink-muted)]" aria-hidden="true" />
            <span>Copy email</span>
          </>
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? `Copied ${SITE.email} to clipboard.` : ''}
      </span>
      {status === 'fallback' && (
        <span className="font-mono-meta rounded-[4px] border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-[13px] text-[var(--ink)] select-all">
          {SITE.email}
        </span>
      )}
    </div>
  );
};
