import { useEffect } from 'react';
import seo from '@/data/seo.json';
import { byslug } from '@/data/work';

/*
  The build already writes a real HTML file per route with its own title,
  description and canonical (scripts/postbuild.mjs), so a crawler's first
  request is right before any JavaScript runs. This hook keeps the same fields
  right *after* a client-side navigation — otherwise every route reached via
  the nav keeps the head of whichever page the visitor landed on, which is what
  ends up in browser history, shared links, and the rendered DOM Google reads.

  Both readers draw from src/data/seo.json and src/data/work.ts, so the head
  React writes and the head the build wrote cannot say different things.
*/

type Head = { title: string; description: string; canonical: string | null; index: boolean };

function headFor(pathname: string): Head {
  const trailing = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const page = (seo.pages as Record<string, { title: string; description: string }>)[trailing];
  if (page) {
    return { ...page, canonical: `${seo.origin}${trailing}`, index: true };
  }

  const match = trailing.match(/^\/work\/([^/]+)\/$/);
  const study = match ? byslug(match[1]) : undefined;
  if (study) {
    return {
      title: `${study.title} — Pradeep Rajasekar`,
      description: study.teaser,
      canonical: `${seo.origin}${trailing}`,
      index: true,
    };
  }

  return {
    title: `Page not found — ${seo.siteName}`,
    description: 'That page does not exist on this site.',
    canonical: null,
    index: false,
  };
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

export function useDocumentHead(pathname: string) {
  useEffect(() => {
    const head = headFor(pathname);

    document.title = head.title;
    setMeta('meta[name="description"]', 'content', head.description);
    setMeta('meta[property="og:title"]', 'content', head.title);
    setMeta('meta[property="og:description"]', 'content', head.description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical && head.canonical) canonical.href = head.canonical;
    if (head.canonical) setMeta('meta[property="og:url"]', 'content', head.canonical);

    /*
      Unknown paths ship the 404 shell with a real 404 status from the host, so
      crawlers already drop them; the noindex here covers the client-side case
      where a bad link inside the app lands on NotFound without a fetch.
    */
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!head.index) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      robots.content = 'noindex';
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);
}
