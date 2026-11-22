import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../components/Link';

interface NotFoundPageProps {
  path: string;
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ path, onNavigate }) => {
  return (
    <div className="relative z-10 mx-auto max-w-[720px] px-5 pt-32 pb-24 sm:px-8">
      <p className="font-mono-meta text-[12.5px] text-[var(--mut)]">404 · Not found</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.03em] text-[var(--fg)]">
        That page doesn’t exist here.
      </h1>
      <p className="mt-4 text-[15.5px] leading-[1.65] text-[var(--fg-secondary)]">
        No route matched <code className="font-mono-meta text-[14px] text-[var(--fg)]">{path}</code>. Head back home or open any section from the navigation bar.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-[14px] font-semibold text-[var(--bg)] hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
};
