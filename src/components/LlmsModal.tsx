import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';

interface LlmsModalProps {
  open: boolean;
  onClose: () => void;
}

export const LlmsModal: React.FC<LlmsModalProps> = ({ open, onClose }) => {
  const [content, setContent] = useState<string>('Loading /llms.txt...');
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    window.setTimeout(() => closeRef.current?.focus(), 10);

    fetch('/llms.txt')
      .then((r) => r.text())
      .then((t) => setContent(t))
      .catch(() => setContent('Unable to fetch /llms.txt — open https://vahidbasha.me/llms.txt directly.'));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="llms-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#131312] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <h2 id="llms-modal-title" className="font-mono-meta text-[13px] font-medium text-white">
              /llms.txt
            </h2>
            <a
              href="/llms-full.txt"
              target="_blank"
              rel="noreferrer"
              className="font-mono-meta inline-flex min-h-[28px] items-center gap-1 rounded-md border border-white/15 px-2 text-[11px] text-[var(--fg-secondary)] hover:text-white"
            >
              <span>llms-full.txt</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="font-mono-meta inline-flex min-h-[30px] cursor-pointer items-center gap-1.5 rounded-md border border-white/15 px-2.5 text-[11px] text-[var(--fg)] hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close llms.txt dialog"
              className="inline-flex min-h-[30px] min-w-[30px] cursor-pointer items-center justify-center rounded-md text-[var(--mut)] hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <pre className="font-mono-meta flex-1 overflow-auto p-5 text-[12.5px] leading-[1.65] whitespace-pre-wrap text-[var(--fg-secondary)]">
          {content}
        </pre>
      </div>
    </div>
  );
};
