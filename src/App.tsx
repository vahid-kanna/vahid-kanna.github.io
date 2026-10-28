/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { StippleCanvas } from './components/StippleCanvas';
import { TopNotchNav, NavTab } from './components/TopNotchNav';
import { LanyardBadgeHero } from './components/LanyardBadgeHero';
import { ShippedWorkSection } from './components/ShippedWorkSection';
import { WritingSection } from './components/WritingSection';
import { UnsolicitedViewsSection } from './components/UnsolicitedViewsSection';
import { FooterSection } from './components/FooterSection';
import {
  WorkPageView,
  WritingPageView,
  AboutPageView,
} from './components/SubpageViews';
import {
  LlmsModal,
  BookingModal,
  ProjectDetailModal,
  EssayReaderModal,
} from './components/Modals';
import { ProjectItem, EssayItem } from './utils/portfolioLogic';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('index');
  const [llmsOpen, setLlmsOpen] = useState<boolean>(false);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeEssay, setActiveEssay] = useState<EssayItem | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLlmsOpen(false);
        setBookingOpen(false);
        setActiveProject(null);
        setActiveEssay(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    if (activeTab !== 'index') {
      setActiveTab('index');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-[var(--fg)] selection:text-[var(--bg)] relative">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--fg)] focus:text-[var(--bg)] font-mono text-xs"
      >
        Skip to content
      </a>

      {/* Interactive 2D Stipple Background Canvas */}
      <StippleCanvas />

      {/* Top Concave Notch Navigation */}
      <TopNotchNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenLlms={() => setLlmsOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10 w-full">
        {activeTab === 'index' && (
          <div className="relative w-full">
            <LanyardBadgeHero
              onOpenBooking={() => setBookingOpen(true)}
              onOpenLlms={() => setLlmsOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            <ShippedWorkSection
              onViewAllWork={() => {
                setActiveTab('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProjectModal={(project) => setActiveProject(project)}
            />

            <WritingSection
              onViewAllWriting={() => {
                setActiveTab('writing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectEssay={(essay) => setActiveEssay(essay)}
            />

            <UnsolicitedViewsSection />
          </div>
        )}

        {activeTab === 'work' && (
          <WorkPageView onSelectProjectModal={(project) => setActiveProject(project)} />
        )}

        {activeTab === 'writing' && (
          <WritingPageView onSelectEssay={(essay) => setActiveEssay(essay)} />
        )}

        {activeTab === 'about' && <AboutPageView />}

        <FooterSection
          onOpenBooking={() => setBookingOpen(true)}
          onOpenLlms={() => setLlmsOpen(true)}
        />
      </main>

      {/* Modals */}
      <LlmsModal isOpen={llmsOpen} onClose={() => setLlmsOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
      <EssayReaderModal
        essay={activeEssay}
        onClose={() => setActiveEssay(null)}
      />
    </div>
  );
}
