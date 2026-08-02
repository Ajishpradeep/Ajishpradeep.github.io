import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

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
