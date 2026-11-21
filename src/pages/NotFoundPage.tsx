import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../components/Link';

interface NotFoundPageProps {
  path: string;
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ path, onNavigate }) => {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-24 sm:px-8">
      <p className="font-mono-meta text-[13px] text-[var(--ink-muted)]">404 · Not found</p>
      <h1 className="font-display mt-3 text-[clamp(2rem,4vw,2.8rem)] leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
        That page doesn’t exist here.
      </h1>
      <p className="mt-4 text-[16px] leading-[1.65] text-[var(--ink-secondary)]">
        No route matched <code className="font-mono-meta text-[14px] text-[var(--ink)]">{path}</code>. You can head back to the homepage or open any case study from the navigation bar.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] bg-[var(--accent)] px-5 py-2.5 text-[15px] font-medium text-[var(--on-accent)] hover:bg-[var(--accent-hover)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
};
