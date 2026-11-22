import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SITE } from '../data/site';
import { playTactileClick } from '../lib/soundEngine';

interface CopyEmailButtonProps {
  className?: string;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({ className = '' }) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'fallback'>('idle');

  const handleCopy = async () => {
    playTactileClick(1.05);
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

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-2 text-[14px] font-medium text-[var(--fg)] hover:border-white/40 hover:bg-[var(--surface-elevated)] ${className}`}
        aria-label={`Copy email address ${SITE.email}`}
      >
        {status === 'copied' ? (
          <>
            <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            <span className="text-emerald-200">Email copied</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-[var(--mut)]" aria-hidden="true" />
            <span>Copy email</span>
          </>
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? `Copied ${SITE.email} to clipboard.` : ''}
      </span>
      {status === 'fallback' && (
        <span className="font-mono-meta rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-[12.5px] text-[var(--fg)] select-all">
          {SITE.email}
        </span>
      )}
    </div>
  );
};
