import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getCaseStudyBySlug } from './data/work';
import { getFieldNoteBySlug } from './data/writing';
import { getRouteMeta, matchRoute, normalizePath, RouteMatch } from './lib/router';
import { StippleCanvas } from './components/StippleCanvas';
import { TopNotchNav } from './components/TopNotchNav';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { LlmsModal } from './components/LlmsModal';
import { HomePage } from './pages/HomePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { LabPage } from './pages/LabPage';
import { WritingIndexPage } from './pages/WritingIndexPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [pathname, setPathname] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [cmdOpen, setCmdOpen] = useState(false);
  const [llmsOpen, setLlmsOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  const route: RouteMatch = matchRoute(pathname);

  const navigate = useCallback((to: string) => {
    const next = normalizePath(to);
    if (next === normalizePath(window.location.pathname)) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.history.pushState({}, '', next);
    setPathname(next);
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(window.location.pathname));
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    const meta = getRouteMeta(route);
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', meta.canonical);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', meta.canonical);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, route]);

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <HomePage onNavigate={navigate} onOpenLlms={() => setLlmsOpen(true)} />;
      case 'case-study': {
        const study = getCaseStudyBySlug(route.slug);
        return study ? (
          <CaseStudyPage study={study} onNavigate={navigate} />
        ) : (
          <NotFoundPage path={pathname} onNavigate={navigate} />
        );
      }
      case 'lab':
        return <LabPage onNavigate={navigate} />;
      case 'writing':
        return <WritingIndexPage onNavigate={navigate} />;
      case 'article': {
        const note = getFieldNoteBySlug(route.slug);
        return note ? (
          <ArticlePage note={note} onNavigate={navigate} />
        ) : (
          <NotFoundPage path={pathname} onNavigate={navigate} />
        );
      }
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'not-found':
        return <NotFoundPage path={route.path} onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg)] text-[var(--fg)]">
      <StippleCanvas />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopNotchNav
        route={route}
        onNavigate={navigate}
        onOpenLlms={() => setLlmsOpen(true)}
        onOpenCmdPalette={() => setCmdOpen(true)}
      />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="relative z-10 flex-1 outline-none">
        {renderPage()}
      </main>
      <Footer
        onNavigate={navigate}
        onOpenLlms={() => setLlmsOpen(true)}
        onOpenCmdPalette={() => setCmdOpen(true)}
      />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={navigate}
        onOpenLlms={() => setLlmsOpen(true)}
      />
      <LlmsModal open={llmsOpen} onClose={() => setLlmsOpen(false)} />
    </div>
  );
}
