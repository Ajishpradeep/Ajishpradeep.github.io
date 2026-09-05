import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { springOr, SPRING } from '@/lib/motion';
import { cn } from '@/lib/cn';

export type CarouselCard = {
  id: string;
  /** The tile face. Kept short — this is what is scanned. */
  tile: ReactNode;
  /** The opened face. Everything the tile could not hold. */
  panel: ReactNode;
  /** Tailwind classes for the card's fill and text. */
  tone: string;
};

type MinimalCarouselProps = {
  cards: CarouselCard[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
  /** Accessible name for the grid. */
  label: string;
  className?: string;
};

/**
 * A grid of tiles; press one and it lifts into a full-width panel above while
 * the rest reflow tighter beneath it.
 *
 * The mechanism is one `layoutId` per card and a grid that changes its column
 * count, so the tile you pressed *becomes* the panel rather than opening a
 * second thing next to it, and the remaining tiles shuffle into their new
 * positions rather than jumping. That is the whole idea and it is kept exactly.
 *
 * What changed from the upstream, and why:
 *
 * - **The state is lifted.** The demo owns `activeId` internally. Here the
 *   caller owns it, because Method has to be able to open a specific principle
 *   from outside — a deep link, or the command deck.
 * - **The tiles are buttons.** The demo puts `onClick` on a `div`, which is
 *   unreachable by keyboard and unannounced to a screen reader. Six findings
 *   behind a control nobody can tab to is worse than six findings in a list.
 * - **Escape closes, and focus comes back.** A tile that expands in place and
 *   traps nothing still owes the reader a way out that is not the mouse.
 * - **`grid-cols-2 → 3` inverted.** Upstream tightens to three columns when a
 *   card opens. That is right for four cards and wrong for six: at three
 *   columns the five remaining tiles leave a hole in the last row. Six goes to
 *   *two* rows of three closed and stays there open, so the grid never reflows
 *   into a ragged shape.
 */
export default function MinimalCarousel({
  cards,
  activeId,
  onSelect,
  label,
  className,
}: MinimalCarouselProps) {
  const still = useReducedMotion();
  const active = cards.find((c) => c.id === activeId) ?? null;
  const rest = activeId ? cards.filter((c) => c.id !== activeId) : cards;

  /*
    FOCUS COMES BACK TO THE TILE, AND IT IS STORED BY ID, NOT BY ELEMENT.

    The first version kept a ref to the button that was pressed and called
    `.focus()` on it after closing. That element does not exist any more: the
    open tile is *removed* from the grid — it has become the panel — so when it
    returns React mounts a new node and the stored reference points at a
    detached one. `.focus()` on a detached element silently does nothing, and
    Escape dropped the keyboard user back to the top of the document.

    The id survives the round trip. `data-card-id` lets the effect find whatever
    node is standing in that position now, one frame after the grid has
    re-rendered with it.
  */
  const rootRef = useRef<HTMLDivElement>(null);
  const previous = useRef<string | null>(activeId);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelect(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, onSelect]);

  /*
    Restore on *any* close, not only on Escape — the panel also carries its own
    close button, and a keyboard user who presses it has focus on a control that
    is about to stop existing. Tracking the previous id covers Escape, the
    button and a programmatic close with one rule.

    One frame, because the grid has to re-render with the returning tile in it
    before there is anything to focus.
  */
  useEffect(() => {
    const was = previous.current;
    previous.current = activeId;
    if (activeId !== null || was === null) return;

    const frame = requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`[data-card-id="${CSS.escape(was)}"]`)
        ?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeId]);

  const t = springOr(still, SPRING.panel);

  return (
    <motion.div ref={rootRef} layout className={cn('flex flex-col gap-4', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {active && (
          <motion.div
            key={active.id}
            layoutId={`carousel-${active.id}`}
            transition={t}
            className={cn(
              'relative overflow-hidden rounded-sm border p-5 sm:p-7',
              active.tone,
            )}
          >
            {/*
              The panel's contents did not exist on the tile and so cannot morph
              from anything. They arrive once the geometry has settled, which is
              the same 120ms the dossier uses — the site has one way of
              resolving content into a shape that has just finished moving.
            */}
            <motion.div
              initial={still ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={still ? { duration: 0.001 } : { ...SPRING.panel, delay: 0.12 }}
            >
              {active.panel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul
        layout
        aria-label={label}
        transition={t}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {rest.map((card) => (
          <motion.li key={card.id} layoutId={`carousel-${card.id}`} transition={t}>
            <button
              type="button"
              data-card-id={card.id}
              onClick={() => onSelect(card.id)}
              aria-expanded={false}
              className={cn(
                /*
                  `justify-start`, not `justify-between`. The grid matches row
                  heights to the tallest tile in the row, so a one-line finding
                  sitting next to a two-line one had its title pushed to the
                  bottom of the card while its neighbours' sat at the top — the
                  number and the thing it numbers drifting apart by 40px for no
                  reason the reader can see. Tight at the top, trailing space
                  below, identical on every tile.
                */
                'flex h-full w-full flex-col justify-start rounded-sm border p-4 text-left transition-transform duration-300',
                'hover:-translate-y-0.5 focus-visible:-translate-y-0.5',
                card.tone,
              )}
            >
              {card.tile}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
