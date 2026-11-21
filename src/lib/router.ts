import { getCaseStudyBySlug } from '../data/work';
import { getFieldNoteBySlug } from '../data/writing';
import { SITE } from '../data/site';

export type RouteMatch =
  | { name: 'home' }
  | { name: 'case-study'; slug: string }
  | { name: 'lab' }
  | { name: 'writing' }
  | { name: 'article'; slug: string }
  | { name: 'about' }
  | { name: 'not-found'; path: string };

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export function matchRoute(pathname: string): RouteMatch {
  const path = normalizePath(pathname);

  if (path === '/') return { name: 'home' };
  if (path === '/lab') return { name: 'lab' };
  if (path === '/writing') return { name: 'writing' };
  if (path === '/about') return { name: 'about' };

  const workMatch = path.match(/^\/work\/([a-z0-9-]+)$/);
  if (workMatch) {
    const slug = workMatch[1];
    if (getCaseStudyBySlug(slug)) {
      return { name: 'case-study', slug };
    }
    return { name: 'not-found', path };
  }

  const noteMatch = path.match(/^\/writing\/([a-z0-9-]+)$/);
  if (noteMatch) {
    const slug = noteMatch[1];
    if (getFieldNoteBySlug(slug)) {
      return { name: 'article', slug };
    }
    return { name: 'not-found', path };
  }

  return { name: 'not-found', path };
}

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
}

export function getRouteMeta(route: RouteMatch): RouteMeta {
  switch (route.name) {
    case 'home':
      return {
        title: `${SITE.name} — Product & Business Builder`,
        description:
          "Portfolio of Shaik Vahid Basha (IIT Madras '27). Turning messy operational workflows into practical software — SyncPro, RailRaksha, Zamp AP Workbench, and ZeroEka.",
        canonical: `${SITE.url}/`,
      };
    case 'case-study': {
      const study = getCaseStudyBySlug(route.slug);
      return {
        title: study ? `${study.title} — ${SITE.name}` : `Case Study — ${SITE.name}`,
        description: study?.tagline ?? 'Selected product case study.',
        canonical: `${SITE.url}/work/${route.slug}`,
      };
    }
    case 'lab':
      return {
        title: `Engineering Lab — ${SITE.name}`,
        description:
          'Supporting engineering builds, automation utilities, and historical backtest research by Shaik Vahid Basha.',
        canonical: `${SITE.url}/lab`,
      };
    case 'writing':
      return {
        title: `Field Notes — ${SITE.name}`,
        description:
          'Short field notes on product discovery, offline-first design, and building operational AI workflows that fail safely.',
        canonical: `${SITE.url}/writing`,
      };
    case 'article': {
      const note = getFieldNoteBySlug(route.slug);
      return {
        title: note ? `${note.title} — ${SITE.name}` : `Field Note — ${SITE.name}`,
        description: note?.summary ?? 'Field note by Shaik Vahid Basha.',
        canonical: `${SITE.url}/writing/${route.slug}`,
      };
    }
    case 'about':
      return {
        title: `About — ${SITE.name}`,
        description:
          "Background, working approach, and campus operations leadership of Shaik Vahid Basha (IIT Madras '27).",
        canonical: `${SITE.url}/about`,
      };
    case 'not-found':
      return {
        title: `Page Not Found — ${SITE.name}`,
        description: 'The requested page could not be found on vahidbasha.me.',
        canonical: `${SITE.url}${route.path}`,
      };
  }
}
