import { useEffect } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * Stages every [data-reveal] element as it enters and leaves the viewport.
 * Re-runs on `key` so route changes pick up newly mounted nodes.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      nodes.forEach((n) => n.setAttribute('data-reveal', 'in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in');
            return;
          }
          entry.target.setAttribute(
            'data-reveal',
            entry.boundingClientRect.bottom < 0 ? 'after' : 'before',
          );
        });
      },
      { rootMargin: '-4% 0px -10% 0px', threshold: [0, 0.08, 0.45] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [key]);
}

/** Restores scroll to the top on navigation, honouring in-page hash links. */
export function useScrollReset(pathname: string, hash: string) {
  useEffect(() => {
    // A JS-supplied `behavior: 'smooth'` overrides the stylesheet, so
    // reduced-motion has to be honoured here rather than left to CSS.
    const reduced = prefersReducedMotion();

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
}
