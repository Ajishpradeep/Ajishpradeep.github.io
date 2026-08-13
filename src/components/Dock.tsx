import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BadgeCheck, BookOpen, Compass, FlaskConical, Layers, Mail, Search } from 'lucide-react';
import { useSectionSpy } from '../hooks/useSectionSpy';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { springOr, SPRING } from '../lib/motion';
import { Dock as DockBar, DockIcon, DockItem, DockLabel } from './motion/Dock';
import { OPEN_DECK } from './Nav';

/**
 * Keyed by section id, never by array position.
 *
 * DESIGN.md records deleting an index-mapped icon array in the lab — a leaf for
 * CarbonPass, a music note for Magic Shuffle, silently reassigned the moment an
 * entry moved. `nav` in site.ts is a list somebody will reorder; this is a map,
 * so reordering it moves the icons with the sections instead of shuffling them.
 */
const icons: Record<string, typeof Layers> = {
  work: Layers,
  impact: BadgeCheck,
  method: Compass,
  research: BookOpen,
  lab: FlaskConical,
  contact: Mail,
};

/**
 * The dock.
 *
 * `SectionRail` is gated at 1600px for a good reason — below that there is no
 * side margin for it to stand in without landing on the content — and the
 * consequence was that a 1440px laptop and every phone on earth had no
 * persistent sense of where they were in a 9,000px document. The header nav
 * scrolls away; the mobile drawer has to be opened to answer a question the
 * visitor did not ask.
 *
 * So this occupies the width the rail could not: horizontal, at the bottom,
 * below 1600px only. The two are never on screen together and never disagree —
 * both read `useSectionSpy`.
 *
 * It appears when there is something to navigate *between*: `active` is empty
 * until the first section clears the 40% line, which means the dock is absent
 * over the hero and arrives exactly when the page becomes a document you are
 * somewhere inside of. That is a content condition, not a scroll threshold, and
 * it does not need a magic number.
 */
export default function Dock() {
  const { active, present } = useSectionSpy();
  const still = useReducedMotion();
  const [retreated, setRetreated] = useState(false);
  const lastY = useRef(0);

  /*
    Reading down is the one time this is in the way — it sits over the last
    56px of a page whose content runs to the bottom edge. It retreats on a
    downward scroll and returns on an upward one, which is the gesture a
    visitor already makes when they want to go somewhere else.

    AND IT RETURNS WHEN THE SCROLLING STOPS, which the first version did not.
    Retreat-on-down alone meant the dock was absent for the entire descent
    through a 9,000px document — that is, for the whole time its answer to
    "where am I" was worth having, and it only reappeared if the visitor
    happened to scroll back up. A bar that hides while you read and returns the
    moment you pause is out of the way exactly when it is in the way.

    24px of slack: without it, the sub-pixel jitter a trackpad produces at rest
    flips the state several times a second.
  */
  useEffect(() => {
    let settle = 0;

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) > 24) {
        setRetreated(y > lastY.current && y > 0);
        lastY.current = y;
      }
      window.clearTimeout(settle);
      settle = window.setTimeout(() => setRetreated(false), 700);
    };

    lastY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (present.length < 2) return null;

  const shown = Boolean(active) && !retreated;

  return (
    <nav
      aria-label="Section dock"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 min-[1600px]:hidden"
    >
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ y: 72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 72, opacity: 0 }}
            transition={springOr(still, SPRING.panel)}
            /*
              The card surface written out rather than `.card`, and the reason
              is `overflow-hidden`: it is part of that class, and every one of
              these items hangs its name *above* the bar. Under `.card` all six
              labels were clipped to nothing — the affordance existed in the
              markup and had never once been visible.

              `bg-deep/95`, not /85. At 85 the prose underneath read straight
              through the bar; the backdrop blur turned it into illegible
              texture rather than removing it, which is worse than either. The
              blur is doing a real job at 95 — softening what remains behind a
              near-solid surface — which is the "specific effect" exemption
              rather than glass for its own sake.
            */
            className="pointer-events-auto rounded-md border border-cyan/28 bg-deep/95 px-2 py-1.5 shadow-[0_8px_32px_-8px_rgb(var(--void)/0.9)] backdrop-blur-md"
          >
            {/*
              APPLE-STYLE MAGNIFICATION.

              The first version gave each item its own `whileHover={{ y: -4 }}`,
              which is six independent hover states pretending to be a dock.
              The real mechanism is one shared pointer position that every item
              measures its distance to, so the tiles either side of the one you
              are on grow as well, by less — the bar deforms as a surface
              rather than one cell popping out of a row.

              It magnifies width rather than scale, so the neighbours are
              pushed aside instead of being covered over. See the note in
              `motion/Dock.tsx` for why 44 → 60 rather than the library's
              48 → 80.
            */}
            <DockBar className="gap-0.5 sm:gap-1">
              {present.map((s) => {
                const Icon = icons[s.id] ?? Layers;
                const on = s.id === active;

                return (
                  <DockItem key={s.id}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      aria-current={on ? 'true' : undefined}
                      className="group/dock flex h-full w-full items-center justify-center rounded-sm"
                    >
                      {/*
                        An icon-only control is a guess until it is pressed.
                        `aria-label` carries the name for assistive tech; this
                        carries it for a pointer and a keyboard, and is
                        `aria-hidden` so it is not announced twice.
                      */}
                      <DockLabel>{s.label}</DockLabel>

                      <DockIcon>
                        <Icon
                          size={19}
                          strokeWidth={1.9}
                          className={`shrink-0 transition-colors duration-300 ${
                            on ? 'text-amber' : 'text-cyan/70 group-hover/dock:text-cyan'
                          }`}
                        />
                      </DockIcon>

                      {/*
                        THE TRAVELLING MARKER.

                        One dot, shared across six anchors by `layoutId`, so it
                        slides from section to section rather than blinking out
                        here and in over there. Same device as the work
                        console's rail and the header's underline: the site has
                        one way of saying "this one", and it moves.

                        Position alone carries the state for anyone who cannot
                        see the amber; `aria-current` carries it for anyone who
                        cannot see the dot.
                      */}
                      {on && (
                        <motion.span
                          layoutId="dock-marker"
                          transition={springOr(still, SPRING.marker)}
                          className="absolute bottom-0.5 h-[3px] w-4 rounded-full bg-amber"
                        />
                      )}
                    </a>
                  </DockItem>
                );
              })}

              <span aria-hidden className="mx-1 hidden h-6 w-px self-center bg-cyan/20 sm:block" />

              {/*
                The command deck, which until now announced itself only in the
                header — and the header is 6,000px above wherever the visitor
                actually is by the time they want it. Hidden below `sm`: a
                palette driven by typing is a poor trade for 44px of a 375px
                dock, and the drawer already covers that case.
              */}
              <DockItem className="hidden sm:flex">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event(OPEN_DECK))}
                  aria-label="Open the command deck"
                  className="group/dock flex h-full w-full items-center justify-center rounded-sm"
                >
                  <DockLabel>Command</DockLabel>
                  <DockIcon>
                    <Search
                      size={18}
                      strokeWidth={1.9}
                      className="shrink-0 text-cyan/70 transition-colors duration-300 group-hover/dock:text-cyan"
                    />
                  </DockIcon>
                </button>
              </DockItem>
            </DockBar>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
