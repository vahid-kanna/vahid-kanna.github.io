import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FIELD_NOTES, estimateReadMinutes } from '../data/writing';
import { Link } from '../components/Link';

interface WritingIndexPageProps {
  onNavigate: (path: string) => void;
}

export const WritingIndexPage: React.FC<WritingIndexPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 mx-auto max-w-[780px] px-5 pt-24 pb-20 sm:px-8 sm:pt-28">
      <div className="mb-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="font-mono-meta inline-flex min-h-[40px] items-center gap-1.5 text-[13px] text-[var(--mut)] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to home</span>
        </Link>
      </div>

      <header>
        <h1 className="text-halo text-[clamp(2.1rem,4vw,3rem)] leading-[1.1] font-medium tracking-[-0.03em] text-[var(--fg)]">
          Field notes
        </h1>
        <p className="mt-4 max-w-[58ch] text-[16.5px] leading-[1.65] text-[var(--fg-secondary)]">
          Short notes written from product discovery, offline field design, and workflow audits. Reading times reflect actual word count.
        </p>
      </header>

      <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)] bg-[var(--bg)]/84">
        {FIELD_NOTES.map((note) => {
          const mins = estimateReadMinutes(note.paragraphs);
          return (
            <article key={note.slug} className="py-8">
              <div className="font-mono-meta flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--mut)]">
                <time dateTime={note.isoDate}>{note.date}</time>
                <span aria-hidden="true">·</span>
                <span>{mins} min read</span>
                <span aria-hidden="true">·</span>
                <span>{note.topic}</span>
              </div>
              <h2 className="mt-2.5 text-[1.5rem] leading-[1.24] font-medium tracking-[-0.02em] text-[var(--fg)]">
                <Link
                  to={`/writing/${note.slug}`}
                  onNavigate={onNavigate}
                  className="inline-block py-1 hover:text-[var(--p0)]"
                >
                  {note.title}
                </Link>
              </h2>
              <p className="mt-2 text-[15.5px] leading-[1.65] text-[var(--fg-secondary)]">
                {note.summary}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};
