import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FIELD_NOTES, FieldNote, countWords, estimateReadMinutes } from '../data/writing';
import { Link } from '../components/Link';

interface ArticlePageProps {
  note: FieldNote;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ note, onNavigate }) => {
  const mins = estimateReadMinutes(note.paragraphs);
  const words = countWords(note.paragraphs);
  const idx = FIELD_NOTES.findIndex((n) => n.slug === note.slug);
  const nextNote = FIELD_NOTES[(idx + 1) % FIELD_NOTES.length];

  return (
    <article className="mx-auto max-w-[720px] px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
      <div className="mb-8">
        <Link
          to="/writing"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-[var(--ink-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All field notes</span>
        </Link>
      </div>

      <header>
        <div className="font-mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--ink-muted)]">
          <time dateTime={note.isoDate}>{note.date}</time>
          <span aria-hidden="true">·</span>
          <span>{mins} min read ({words} words)</span>
          <span aria-hidden="true">·</span>
          <span>{note.topic}</span>
        </div>
        <h1 className="font-display mt-4 text-[clamp(2rem,4vw,2.85rem)] leading-[1.12] tracking-[-0.024em] text-[var(--ink)]">
          {note.title}
        </h1>
        <p className="mt-4 text-[18px] leading-[1.6] text-[var(--ink-secondary)]">
          {note.summary}
        </p>
      </header>

      <div className="mt-10 space-y-5 border-t border-[var(--border)] pt-10 text-[16.5px] leading-[1.75] text-[var(--ink)]">
        {note.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <nav
        aria-label="Next field note"
        className="mt-14 flex flex-col justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center"
      >
        <Link
          to="/writing"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] text-[var(--ink-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All field notes</span>
        </Link>
        <Link
          to={`/writing/${nextNote.slug}`}
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          <span>Next: {nextNote.title}</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
};
