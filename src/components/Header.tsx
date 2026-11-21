import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '../data/site';
import { RouteMatch } from '../lib/router';
import { Link } from './Link';

interface HeaderProps {
  route: RouteMatch;
  onNavigate: (path: string) => void;
}

const NAV_LINKS = [
  { label: 'Work', path: '/#work', match: ['home', 'case-study'] as const },
  { label: 'Lab', path: '/lab', match: ['lab'] as const },
  { label: 'Writing', path: '/writing', match: ['writing', 'article'] as const },
  { label: 'About', path: '/about', match: ['about'] as const },
];

export const Header: React.FC<HeaderProps> = ({ route, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    firstMenuLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setMenuOpen(false);
    if (path === '/#work') {
      e.preventDefault();
      if (route.name === 'home') {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('/');
        window.setTimeout(() => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
      return;
    }
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          onNavigate={onNavigate}
          className="inline-flex min-h-[44px] items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--ink)] hover:text-[var(--accent)]"
        >
          <span>{SITE.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            const isActive =
              item.path === '/#work'
                ? route.name === 'case-study'
                : (item.match as readonly string[]).includes(route.name);

            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleNav(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-[6px] px-3 text-[15px] ${
                  isActive
                    ? 'font-medium text-[var(--accent)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <span
            aria-hidden="true"
            className="mx-2 h-4 w-px bg-[var(--border-strong)]"
          />
          <a
            href={SITE.contactMailto}
            className="inline-flex min-h-[44px] items-center rounded-[6px] px-3 text-[15px] font-medium text-[var(--accent)] hover:bg-[var(--accent-tint)]"
          >
            Email
          </a>
        </nav>

        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface-subtle)] md:hidden cursor-pointer"
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((item, idx) => (
              <li key={item.label}>
                <a
                  ref={idx === 0 ? firstMenuLinkRef : undefined}
                  href={item.path}
                  onClick={(e) => handleNav(e, item.path)}
                  className="flex min-h-[44px] items-center rounded-[6px] px-3 text-[16px] font-medium text-[var(--ink)] hover:bg-[var(--surface-subtle)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-[var(--border)] pt-2">
              <a
                href={SITE.contactMailto}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-[6px] px-3 text-[16px] font-medium text-[var(--accent)] hover:bg-[var(--accent-tint)]"
              >
                Email ({SITE.email})
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
