import React, { useEffect, useRef, useState } from 'react';
import { FileText, Mail, Menu, Terminal, Volume2, VolumeX, X } from 'lucide-react';
import { SITE } from '../data/site';
import { RouteMatch } from '../lib/router';
import { isSoundEnabled, playTactileClick, setSoundEnabled } from '../lib/soundEngine';

interface TopNotchNavProps {
  route: RouteMatch;
  onNavigate: (path: string) => void;
  onOpenLlms: () => void;
  onOpenCmdPalette: () => void;
}

const MASCOT_COLORS = ['#b3a6ff', '#d5b0f5', '#ffb3dc', '#a6e6f2'];

const MASCOT_QUIPS = [
  "Shaik Vahid Basha · IIT Madras '27",
  'Co-founder @ SyncPro (Nirmaan)',
  'Creator @ RailRaksha.tech',
  'Built Zamp AP Workbench',
];

const NAV_ITEMS = [
  { label: 'index', path: '/', match: ['home'] as const },
  { label: 'work', path: '/#work', match: ['case-study'] as const },
  { label: 'lab', path: '/lab', match: ['lab'] as const },
  { label: 'writing', path: '/writing', match: ['writing', 'article'] as const },
  { label: 'about', path: '/about', match: ['about'] as const },
];

export const TopNotchNav: React.FC<TopNotchNavProps> = ({
  route,
  onNavigate,
  onOpenLlms,
  onOpenCmdPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mascotIdx, setMascotIdx] = useState(0);
  const [showQuip, setShowQuip] = useState(false);
  const [sfxOn, setSfxOn] = useState<boolean>(() => isSoundEnabled());
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    playTactileClick(1.0);
    setMobileMenuOpen(false);
    if (path === '/#work') {
      if (route.name === 'home') {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('/');
        window.setTimeout(() => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
      return;
    }
    onNavigate(path);
  };

  const handleMascotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playTactileClick(1.2);
    setMascotIdx((prev) => (prev + 1) % MASCOT_COLORS.length);
    setShowQuip(true);
    onNavigate('/');
    window.dispatchEvent(
      new CustomEvent('stipple-impulse', {
        detail: { x: window.innerWidth * 0.5, y: 36 },
      })
    );
    window.setTimeout(() => setShowQuip(false), 1800);
  };

  const handleToggleSfx = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSoundEnabled(next);
    if (next) playTactileClick(1.15);
  };

  const currentColor = MASCOT_COLORS[mascotIdx];

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center select-none">
      <div className="pointer-events-auto relative flex items-start">
        {/* Left concave ear */}
        <div className="shrink-0 overflow-hidden" style={{ width: 16 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="block shrink-0 fill-[var(--fg)]"
            aria-hidden="true"
          >
            <path d="M0 0H16V16A16 16 0 0 0 0 0Z" />
          </svg>
        </div>

        {/* Center inverted ivory notch */}
        <nav
          aria-label="Primary navigation"
          className="font-mono-meta relative flex flex-col items-center rounded-b-[20px] bg-[var(--fg)] px-3.5 pt-[7px] pb-[9px] text-[12px] text-[var(--bg)] shadow-[0_10px_30px_rgba(0,0,0,0.55)] sm:px-5"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Interactive pixel sprite -> Home + stipple ripple */}
            <a
              href="/"
              onClick={handleMascotClick}
              aria-label="Home — Shaik Vahid Basha"
              title="Home (click for ripple)"
              className="relative inline-flex min-h-[28px] min-w-[28px] items-center justify-center rounded-full hover:bg-black/8"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 8 8"
                className="block"
                aria-hidden="true"
                style={{
                  shapeRendering: 'crispEdges',
                  color: currentColor,
                  filter: `drop-shadow(0 0 2px ${currentColor})`,
                }}
              >
                <g fill="currentColor">
                  <rect x="2" y="0" width="4" height="1" opacity="0.65" />
                  <rect x="1" y="1" width="2" height="1" opacity="0.8" />
                  <rect x="5" y="1" width="2" height="1" opacity="0.8" />
                  <rect x="0" y="2" width="8" height="2" opacity="0.72" />
                  <rect x="0" y="4" width="1" height="1" opacity="0.7" />
                  <rect x="7" y="4" width="1" height="1" opacity="0.7" />
                  <rect x="1" y="5" width="6" height="1" opacity="0.8" />
                  <rect x="2" y="6" width="4" height="1" opacity="0.55" />
                  <rect x="2" y="2" width="1" height="1" fill="#0d0d0c" />
                  <rect x="5" y="2" width="1" height="1" fill="#0d0d0c" />
                  <rect x="3" y="4" width="2" height="1" fill="#0d0d0c" />
                </g>
              </svg>
              {showQuip && (
                <span className="pointer-events-none absolute top-9 left-0 rounded-full border border-white/20 bg-[#141413] px-2.5 py-1 text-[11px] whitespace-nowrap text-[#eeece6] shadow-lg">
                  {MASCOT_QUIPS[mascotIdx]}
                </span>
              )}
            </a>

            {/* Primary Links */}
            <div className="hidden items-center gap-0.5 sm:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = (item.match as readonly string[]).includes(route.name);
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleNav(e, item.path)}
                    className={`inline-flex min-h-[28px] items-center rounded-full px-2.5 whitespace-nowrap ${
                      isActive
                        ? 'bg-[var(--bg)]/15 font-medium text-[var(--bg)]'
                        : 'text-[var(--bg)]/70 hover:text-[var(--bg)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mx-1 hidden h-3.5 w-px bg-[var(--bg)]/20 sm:block" aria-hidden="true" />

            {/* Crisp utility actions (all >= 28px touch/pointer size) */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.1);
                  onOpenCmdPalette();
                }}
                aria-label="Open command palette"
                title="Command palette (Ctrl/Cmd + K)"
                className="inline-flex min-h-[28px] min-w-[28px] cursor-pointer items-center gap-1 rounded-md border border-[var(--bg)]/20 px-2 text-[11px] text-[var(--bg)]/85 hover:bg-[var(--bg)]/10 hover:text-[var(--bg)]"
              >
                <Terminal className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>⌘K</span>
              </button>

              <button
                type="button"
                onClick={handleToggleSfx}
                aria-pressed={sfxOn}
                aria-label={sfxOn ? 'Mute click sound' : 'Enable subtle click sound'}
                title={sfxOn ? 'Sound: ON' : 'Sound: OFF (click to enable)'}
                className="inline-flex min-h-[28px] min-w-[28px] cursor-pointer items-center justify-center rounded-md px-1.5 text-[11px] text-[var(--bg)]/75 hover:bg-[var(--bg)]/10 hover:text-[var(--bg)]"
              >
                {sfxOn ? (
                  <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 opacity-65" aria-hidden="true" />
                )}
              </button>

              <a
                href={SITE.contactMailto}
                aria-label={`Email ${SITE.email}`}
                title={`Email ${SITE.email}`}
                className="inline-flex min-h-[28px] min-w-[28px] items-center justify-center rounded-md px-1.5 text-[var(--bg)]/75 hover:bg-[var(--bg)]/10 hover:text-[var(--bg)]"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.05);
                  onOpenLlms();
                }}
                aria-label="Open llms.txt profile summary"
                title="Open llms.txt summary"
                className="hidden min-h-[28px] cursor-pointer items-center gap-1 rounded-md px-2 text-[11px] text-[var(--bg)]/75 hover:bg-[var(--bg)]/10 hover:text-[var(--bg)] sm:inline-flex"
              >
                <FileText className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>llms.txt</span>
              </button>

              <button
                ref={toggleBtnRef}
                type="button"
                onClick={() => {
                  playTactileClick(1.0);
                  setMobileMenuOpen((v) => !v);
                }}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                className="inline-flex min-h-[30px] min-w-[30px] cursor-pointer items-center justify-center rounded-full text-[var(--bg)]/85 hover:bg-[var(--bg)]/10 sm:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-1 border-t border-[var(--bg)]/15 pt-2 sm:hidden">
              {NAV_ITEMS.map((item) => {
                const isActive = (item.match as readonly string[]).includes(route.name);
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleNav(e, item.path)}
                    className={`inline-flex min-h-[32px] items-center rounded-full px-3 text-[12px] whitespace-nowrap ${
                      isActive
                        ? 'bg-[var(--bg)]/18 font-medium text-[var(--bg)]'
                        : 'text-[var(--bg)]/75'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLlms();
                }}
                className="inline-flex min-h-[32px] cursor-pointer items-center rounded-full border border-[var(--bg)]/20 px-2.5 text-[11px] text-[var(--bg)]/80"
              >
                llms.txt
              </button>
            </div>
          )}
        </nav>

        {/* Right concave ear */}
        <div className="shrink-0 overflow-hidden" style={{ width: 16 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="block shrink-0 scale-x-[-1] fill-[var(--fg)]"
            aria-hidden="true"
          >
            <path d="M0 0H16V16A16 16 0 0 0 0 0Z" />
          </svg>
        </div>
      </div>
    </header>
  );
};
