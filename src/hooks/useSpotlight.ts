import type { MouseEvent } from 'react';

/**
 * Writes the pointer position onto the hovered element as --mx/--my so the
 * `.spot` gradient can follow it. Pair with className="card spot".
 */
export function useSpotlight() {
  return (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
}
