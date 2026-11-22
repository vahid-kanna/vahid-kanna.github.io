import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Copy, FileText, Mail, RotateCw, Search, X } from 'lucide-react';
import { SITE } from '../data/site';
import { CASE_STUDIES } from '../data/work';
import { FIELD_NOTES } from '../data/writing';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenLlms: () => void;
}

interface CmdItem {
  id: string;
  group: string;
  label: string;
  hint: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onNavigate,
  onOpenLlms,
}) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CmdItem[] = useMemo(
    () => [
      ...CASE_STUDIES.map((c) => ({
        id: `work-${c.slug}`,
        group: 'Case studies',
        label: c.title,
        hint: c.role,
        action: () => {
          onNavigate(`/work/${c.slug}`);
          onClose();
        },
      })),
      {
        id: 'nav-lab',
        group: 'Pages',
        label: 'Engineering lab & research',
        hint: '/lab',
        action: () => {
          onNavigate('/lab');
          onClose();
        },
      },
      {
        id: 'nav-about',
        group: 'Pages',
        label: 'About Vahid & experience',
        hint: '/about',
        action: () => {
          onNavigate('/about');
          onClose();
        },
      },
      ...FIELD_NOTES.map((n) => ({
        id: `note-${n.slug}`,
        group: 'Field notes',
        label: n.title,
        hint: n.date,
        action: () => {
          onNavigate(`/writing/${n.slug}`);
          onClose();
        },
      })),
      {
        id: 'act-flip',
        group: 'Actions',
        label: 'Flip ID badge',
        hint: 'Hero lanyard',
        action: () => {
          onNavigate('/');
          window.setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.dispatchEvent(new CustomEvent('lanyard-flip-cmd'));
          }, 80);
          onClose();
        },
      },
      {
        id: 'act-copy-email',
        group: 'Actions',
        label: `Copy email (${SITE.email})`,
        hint: 'Clipboard',
        action: () => {
          void navigator.clipboard?.writeText(SITE.email).catch(() => {});
          onClose();
        },
      },
      {
        id: 'act-resume',
        group: 'Actions',
        label: 'Request resume via email',
        hint: 'Mailto draft',
        action: () => {
          window.location.href = SITE.resumeMailto;
          onClose();
        },
      },
      {
        id: 'act-llms',
        group: 'Actions',
        label: 'View llms.txt plain-text dossier',
        hint: '/llms.txt',
        action: () => {
          onClose();
          onOpenLlms();
        },
      },
    ],
    [onClose, onNavigate, onOpenLlms]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIdx(0);
    const prevFocus = document.activeElement as HTMLElement | null;
    window.setTimeout(() => inputRef.current?.focus(), 10);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter' && filtered[activeIdx]) {
      e.preventDefault();
      filtered[activeIdx].action();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-[#131312] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-[var(--mut)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={handleInputKey}
            placeholder="Jump to a case study, field note, or action..."
            className="w-full bg-transparent text-[14px] text-[var(--fg)] placeholder:text-[var(--mut)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="inline-flex min-h-[28px] min-w-[28px] cursor-pointer items-center justify-center rounded-md text-[var(--mut)] hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="max-h-[360px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-[13px] text-[var(--mut)]">
              No matches for “{query}”.
            </li>
          ) : (
            filtered.map((item, idx) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={item.action}
                  className={`flex min-h-[40px] w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 text-left text-[13.5px] ${
                    idx === activeIdx
                      ? 'bg-white/10 text-white'
                      : 'text-[var(--fg-secondary)] hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5 truncate">
                    {item.id === 'act-flip' ? (
                      <RotateCw className="h-3.5 w-3.5 shrink-0 text-[var(--p0)]" aria-hidden="true" />
                    ) : item.id === 'act-copy-email' ? (
                      <Copy className="h-3.5 w-3.5 shrink-0 text-[var(--p0)]" aria-hidden="true" />
                    ) : item.id === 'act-resume' ? (
                      <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--p0)]" aria-hidden="true" />
                    ) : item.id === 'act-llms' ? (
                      <FileText className="h-3.5 w-3.5 shrink-0 text-[var(--p0)]" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--mut)]" aria-hidden="true" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                  <span className="font-mono-meta shrink-0 text-[11px] text-[var(--mut)]">
                    {item.hint}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
