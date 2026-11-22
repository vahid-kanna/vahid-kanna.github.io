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
    <article className="relative z-10 mx-auto max-w-[740px] px-5 pt-24 pb-20 sm:px-8 sm:pt-28">
      <div className="mb-8">
        <Link
          to="/writing"
          onNavigate={onNavigate}
          className="font-mono-meta inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-[var(--mut)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All field notes</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/92 p-6 sm:p-10">
        <header>
          <div className="font-mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--mut)]">
            <time dateTime={note.isoDate}>{note.date}</time>
            <span aria-hidden="true">·</span>
            <span>
              {mins} min read ({words} words)
            </span>
            <span aria-hidden="true">·</span>
            <span>{note.topic}</span>
          </div>
          <h1 className="mt-4 text-[clamp(1.9rem,3.8vw,2.65rem)] leading-[1.14] font-medium tracking-[-0.03em] text-[var(--fg)]">
            {note.title}
          </h1>
          <p className="mt-4 text-[17.5px] leading-[1.6] text-[var(--fg-secondary)]">
            {note.summary}
          </p>
        </header>

        <div className="mt-9 space-y-5 border-t border-[var(--line)] pt-9 text-[16px] leading-[1.78] text-[var(--fg)]/92">
          {note.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <nav
        aria-label="Next field note"
        className="mt-12 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center"
      >
        <Link
          to="/writing"
          onNavigate={onNavigate}
          className="inline-flex min-h-[40px] items-center gap-1.5 text-[14.5px] text-[var(--fg-secondary)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>All field notes</span>
        </Link>
        <Link
          to={`/writing/${nextNote.slug}`}
          onNavigate={onNavigate}
          className="inline-flex min-h-[40px] items-center gap-2 text-[14.5px] font-semibold text-[var(--p0)] hover:text-white"
        >
          <span>Next: {nextNote.title}</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
};
