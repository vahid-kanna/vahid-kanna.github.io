import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Menu, X, Volume2, VolumeX, Terminal } from 'lucide-react';
import {
  isSoundEnabled,
  setSoundEnabled,
  playTactileClick,
} from '../utils/soundEngine';

export type NavTab = 'index' | 'work' | 'writing' | 'about';

interface TopNotchNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenLlms: () => void;
  onOpenBooking: () => void;
  onOpenCmdPalette: () => void;
}

const MASCOT_COLORS = [
  'rgb(179, 166, 255)',
  'rgb(213, 176, 245)',
  'rgb(255, 179, 220)',
  'rgb(166, 230, 242)',
];

const MASCOT_QUIPS = [
  "IIT Madras ('27) · Product Lead",
  'Co-founder @ SyncPro.org (Nirmaan)',
  'RailRaksha.tech · 130 km/h Safety',
  'PM · Strategy · Quant · Systems',
];

export const TopNotchNav: React.FC<TopNotchNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenLlms,
  onOpenBooking,
  onOpenCmdPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mascotIdx, setMascotIdx] = useState(0);
  const [showQuip, setShowQuip] = useState(false);
  const [sfxOn, setSfxOn] = useState<boolean>(true);

  useEffect(() => {
    setSfxOn(isSoundEnabled());
  }, []);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'index', label: 'index' },
    { id: 'work', label: 'work' },
    { id: 'writing', label: 'writing' },
    { id: 'about', label: 'about' },
  ];

  const handleNavClick = (e: React.MouseEvent, tab: NavTab) => {
    e.preventDefault();
    playTactileClick(1.0);
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMascotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playTactileClick(1.25);
    setMascotIdx((prev) => (prev + 1) % MASCOT_COLORS.length);
    setShowQuip(true);
    onSelectTab('index');
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
    if (next) {
      playTactileClick(1.15);
    }
  };

  const currentColor = MASCOT_COLORS[mascotIdx];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none select-none">
      <div className="relative flex items-start pointer-events-auto">
        {/* Left curved concave ear */}
        <div className="overflow-hidden shrink-0" style={{ width: 16 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block shrink-0 fill-[var(--fg)] transition-colors duration-500"
            aria-hidden="true"
          >
            <path d="M0 0H16V16A16 16 0 0 0 0 0Z" />
          </svg>
        </div>

        {/* Center Top Notch Bar */}
        <nav
          aria-label="Main navigation"
          className="relative flex flex-col items-center font-mono text-[12px] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-250 ease-out bg-[var(--fg)] text-[var(--bg)] rounded-b-[22px] px-4 pt-[9px] pb-[11px] sm:px-5 shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Pixel Avatar / Status Home Link with Interactive Color Cycle */}
            <a
              href="#top"
              onClick={handleMascotClick}
              aria-label="Home · Shaik Vahid Basha"
              className="relative flex items-center pl-1 pr-1 sm:pr-1.5 transition-opacity focus-visible:rounded opacity-95 hover:opacity-100"
            >
              <span
                className="inline-flex items-center justify-center relative group cursor-pointer select-none w-4.5 h-4.5 transition-transform active:scale-90"
                title="Status: open for Product, Strategy & Systems roles (click to ping)"
                aria-label="Status: open for chats"
                role="status"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 8 8"
                  className="block transition-all duration-300 opacity-95"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{
                    shapeRendering: 'crispEdges',
                    color: currentColor,
                    filter: `drop-shadow(${currentColor} 0px 0px 2px)`,
                  }}
                >
                  <g fill="currentColor">
                    <rect x="2" y="0" width="2" height="1" opacity="0.6" />
                    <rect x="4" y="0" width="2" height="1" opacity="0.6" />
                    <rect x="1" y="1" width="2" height="1" opacity="0.75" />
                    <rect x="5" y="1" width="2" height="1" opacity="0.75" />
                    <rect x="0" y="2" width="2" height="1" opacity="0.65" />
                    <rect x="3" y="2" width="2" height="1" opacity="0.65" />
                    <rect x="6" y="2" width="2" height="1" opacity="0.65" />
                    <rect x="0" y="3" width="2" height="1" opacity="0.65" />
                    <rect x="3" y="3" width="2" height="1" opacity="0.65" />
                    <rect x="6" y="3" width="2" height="1" opacity="0.65" />
                    <rect x="0" y="4" width="1" height="1" opacity="0.65" />
                    <rect x="7" y="4" width="1" height="1" opacity="0.65" />
                    <rect x="1" y="5" width="2" height="1" opacity="0.75" />
                    <rect x="5" y="5" width="2" height="1" opacity="0.75" />
                    <rect x="2" y="6" width="4" height="1" opacity="0.5" />
                    <rect x="3" y="7" width="2" height="1" opacity="0.5" />
                    <rect x="2" y="2" width="1" height="1" opacity="1" />
                    <rect x="5" y="2" width="1" height="1" opacity="1" />
                    <rect x="2" y="4" width="2" height="1" opacity="0.92" />
                    <rect x="4" y="4" width="2" height="1" opacity="0.92" />
                    <rect x="3" y="5" width="2" height="1" opacity="0.88" />
                  </g>
                </svg>
              </span>

              {showQuip && (
                <span className="absolute top-8 left-0 px-2.5 py-1 rounded-full bg-[#151517] text-[#eeece6] border border-white/20 font-mono text-[10px] whitespace-nowrap shadow-lg pointer-events-none">
                  {MASCOT_QUIPS[mascotIdx % MASCOT_QUIPS.length]}
                </span>
              )}
            </a>

            {/* Primary Nav Links */}
            <div className="hidden sm:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-current whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[var(--bg)] font-medium'
                        : 'text-[var(--bg)]/65 hover:text-[var(--bg)]'
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full -z-10 bg-[var(--bg)]/18"
                        style={{ opacity: 1 }}
                      />
                    )}
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="hidden sm:block w-px h-3 my-auto bg-[var(--bg)]/20" aria-hidden="true" />

            {/* Action Icons & Tactile Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.1);
                  onOpenCmdPalette();
                }}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--bg)]/20 text-[10px] transition-all focus-visible:outline-2 focus-visible:outline-current cursor-pointer text-[var(--bg)]/80 hover:text-[var(--bg)] hover:bg-[var(--bg)]/10 whitespace-nowrap shrink-0"
                aria-label="Open Command Palette (Cmd+K)"
                title="Open Command Palette (Cmd+K)"
              >
                <Terminal className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                <span>⌘K</span>
              </button>

              <button
                type="button"
                onClick={handleToggleSfx}
                aria-pressed={sfxOn}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-all focus-visible:outline-2 focus-visible:outline-current cursor-pointer text-[var(--bg)]/75 hover:text-[var(--bg)] whitespace-nowrap shrink-0"
                aria-label={sfxOn ? 'Mute tactile sound effects' : 'Enable tactile sound effects'}
                title={sfxOn ? 'Tactile Web Audio: ON' : 'Tactile Web Audio: MUTED'}
              >
                {sfxOn ? (
                  <Volume2 className="w-3 h-3 shrink-0" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-3 h-3 shrink-0 opacity-60" aria-hidden="true" />
                )}
                <span className="hidden md:inline">{sfxOn ? 'SFX' : 'MUTE'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.05);
                  onOpenBooking();
                }}
                className="p-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-current cursor-pointer text-[var(--bg)]/70 hover:text-[var(--bg)]"
                aria-label="Book a call"
                title="Book a call"
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.05);
                  onOpenLlms();
                }}
                className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-all focus-visible:outline-2 focus-visible:outline-current cursor-pointer text-[var(--bg)]/70 hover:text-[var(--bg)] whitespace-nowrap shrink-0"
                aria-label="For the robots (and the curious)"
                title="For the robots (and the curious)"
              >
                <FileText className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>llms.txt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.0);
                  setMobileMenuOpen((v) => !v);
                }}
                className="sm:hidden p-1.5 rounded-full transition-opacity focus-visible:outline-2 focus-visible:outline-current text-[var(--bg)]/80 hover:text-[var(--bg)]"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Menu className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer inside Notch */}
          {mobileMenuOpen && (
            <div className="sm:hidden flex items-center gap-2 pt-2.5 mt-2 border-t border-[var(--bg)]/15 w-full justify-center">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap ${
                      isActive
                        ? 'bg-[var(--bg)]/20 text-[var(--bg)] font-medium'
                        : 'text-[var(--bg)]/70'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1.05);
                  setMobileMenuOpen(false);
                  onOpenLlms();
                }}
                className="px-2 py-1 rounded text-[10px] text-[var(--bg)]/75 border border-[var(--bg)]/20 whitespace-nowrap"
              >
                llms.txt
              </button>
            </div>
          )}
        </nav>

        {/* Right curved concave ear */}
        <div className="overflow-hidden shrink-0" style={{ width: 16 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block shrink-0 fill-[var(--fg)] transition-colors duration-500 scale-x-[-1]"
            aria-hidden="true"
          >
            <path d="M0 0H16V16A16 16 0 0 0 0 0Z" />
          </svg>
        </div>
      </div>
    </header>
  );
};
