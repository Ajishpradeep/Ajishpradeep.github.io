import { useSyncExternalStore } from 'react';
import { sections } from '../data/site';

export type SectionSpy = {
  /** id of the section being read, or '' while above the first one. */
  active: string;
  /** 0–100, whole numbers. Decoration; never the sole carrier of anything. */
  pct: number;
  /** The nav entries whose sections actually exist in this document. */
  present: typeof sections;
};

/*
  ONE LISTENER, ONE ANSWER.

  "Which section is being read" was computed in two places with two different
  definitions: the header nav marked a section active once its top passed 140px
  (just under the header), and the rail waited until 40% of the viewport. Nobody
  noticed while the rail was gated at 1400px and the nav at 1024px, because the
  only window where both were visible was 376px wide and few people resize into
  it. The dock is visible from 320px to 1400px, so all three are now on screen
  together and any disagreement is a bug the visitor can see.

  It is also three scroll listeners doing the same six `getBoundingClientRect`
  reads on every frame of every scroll. This is one listener and one snapshot,
  which is both correct and cheaper.

  `useSyncExternalStore` rather than a context provider: there is no tree to
  wrap — the three consumers are siblings under App — and a store needs no
  provider to be a single source of truth.
*/

let snapshot: SectionSpy = { active: '', pct: 0, present: [] };
const listeners = new Set<() => void>();

const SERVER_SNAPSHOT: SectionSpy = { active: '', pct: 0, present: [] };

function measure() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;

  /*
    Resolved on every measurement, not once at mount. These components outlive
    a route change — App renders them outside the <Outlet /> — so a mount-time
    snapshot taken on `/about` would leave the dock permanently empty after
    navigating home.
  */
  const present = sections.filter((s) => document.getElementById(s.id));

  let active = '';
  for (const s of present) {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) active = s.id;
  }

  const samePresent =
    present.length === snapshot.present.length &&
    present.every((s, k) => s.id === snapshot.present[k]?.id);

  // Referential stability matters: useSyncExternalStore re-renders on every
  // snapshot identity change, and scroll fires a lot.
  if (active === snapshot.active && pct === snapshot.pct && samePresent) return;

  snapshot = { active, pct, present: samePresent ? snapshot.present : present };
  listeners.forEach((fn) => fn());
}

function subscribe(onChange: () => void) {
  const first = listeners.size === 0;
  listeners.add(onChange);

  if (first) {
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
  }
  // A late subscriber needs the current answer, and the first one needs any
  // answer at all — the sections may already be laid out and scrolled past.
  measure();

  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    }
  };
}

export function useSectionSpy(): SectionSpy {
  return useSyncExternalStore(subscribe, () => snapshot, () => SERVER_SNAPSHOT);
}

/**
 * Re-read the document. App calls this on every route change.
 *
 * The store only recomputes on scroll and resize, and a client-side navigation
 * is neither. Going from `/about` back to `/` with the window already at the
 * top fires no event at all, so without this the dock and the rail would stay
 * empty on a page that is full of their destinations — and stay that way until
 * the visitor happened to scroll.
 *
 * Two frames: one for React to commit the new route's DOM, one for layout to
 * settle under it. The sections must exist before `getElementById` can find
 * them.
 */
export function remeasureSections() {
  requestAnimationFrame(() => requestAnimationFrame(measure));
}
