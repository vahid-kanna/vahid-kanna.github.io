import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FIELD_NOTES, estimateReadMinutes } from '../data/writing';
import { Link } from '../components/Link';

interface WritingIndexPageProps {
  onNavigate: (path: string) => void;
}

export const WritingIndexPage: React.FC<WritingIndexPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-[780px] px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
      <div className="mb-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to home</span>
        </Link>
      </div>

      <header>
        <h1 className="font-display text-[clamp(2.1rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em] text-[var(--ink)]">
          Field notes
        </h1>
        <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.65] text-[var(--ink-secondary)]">
          Short notes written from direct product discovery, offline field design, and workflow audits. Reading times reflect actual word count.
        </p>
      </header>

      <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {FIELD_NOTES.map((note) => {
          const mins = estimateReadMinutes(note.paragraphs);
          return (
            <article key={note.slug} className="py-8">
              <div className="font-mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--ink-muted)]">
                <time dateTime={note.isoDate}>{note.date}</time>
                <span aria-hidden="true">·</span>
                <span>{mins} min read</span>
                <span aria-hidden="true">·</span>
                <span>{note.topic}</span>
              </div>
              <h2 className="font-display mt-2.5 text-[1.6rem] leading-[1.22] tracking-[-0.02em] text-[var(--ink)]">
                <Link
                  to={`/writing/${note.slug}`}
                  onNavigate={onNavigate}
                  className="inline-block py-1 hover:text-[var(--accent)]"
                >
                  {note.title}
                </Link>
              </h2>
              <p className="mt-2.5 text-[16px] leading-[1.65] text-[var(--ink-secondary)]">
                {note.summary}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};
