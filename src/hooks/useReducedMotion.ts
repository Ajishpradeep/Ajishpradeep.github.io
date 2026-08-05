import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * One-shot read, for the places that need the answer inside an effect rather
 * than as reactive state — a scroll that should not re-fire because the
 * visitor changed the setting afterwards.
 *
 * It exists so those call sites share this module's query string instead of
 * writing `matchMedia('(prefers-reduced-motion: reduce)')` again. The site had
 * three hand-rolled copies of that string; two of them never updated.
 */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * The stylesheet can neutralise CSS animations and transitions, but it has no
 * reach into SVG SMIL or anything driven from JavaScript. Components that own
 * either read this instead, and it tracks changes to the setting rather than
 * sampling once at mount.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
