import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { capabilities } from '@/data/research';
import CapabilityStack from './CapabilityStack';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SPRING, STILL } from '@/lib/motion';

/**
 * Capabilities.
 *
 * TWO COLUMNS, AND THE RIGHT ONE ANSWERS THE LEFT.
 *
 * This was a five-row matrix — the correct shape for reference material, and it
 * threw away the one genuinely interesting thing about this particular list:
 * it is *ordered*. "Mathematical foundations" is not a peer of "Deployment &
 * inference"; it is what deployment is standing on. The site's positioning
 * claim is that the foundation is the part that transferred between generative
 * models, retail vision, biomechanics and agentic systems — and five equal rows
 * in a table say the opposite.
 *
 * The `Features2` shape is what fixed it: claim and accordion on the left,
 * a drawing on the right, one row. Opening an area lights its layer in the
 * stack, and pressing a layer opens its area — the two halves are one control
 * with two faces, which is the thing a matrix and a picture side by side never
 * manage to be.
 *
 * The accordion is Features2's, with one change: theirs holds two items in a
 * row and this holds five in a column, because five side by side at this width
 * gives each a 14-character measure.
 */
export default function Capabilities() {
  const [open, setOpen] = useState(0);
  const still = useReducedMotion();

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 bg-deep/40 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="capabilities-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Capabilities
          </h2>
          <p className="tag-sm text-dim">Five layers · the base is the one that moved</p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — the claim, then the areas as a column of disclosures */}
          <div className="lg:col-span-7" data-reveal>
            {/*
              No ch-cap: the accordion beneath this already runs the full
              column width, so capping only the lede at 46ch forced a 3-line
              wrap above content that uses the other two-thirds of the same
              column just fine.
            */}
            <p className="copy-lead">
              These are not five things I know. They are a stack, and the bottom of it is
              the reason the top could change four times without starting over.
            </p>

            {/*
              THE LIST READS IN THE SAME DIRECTION THE STACK IS BUILT.

              It did not, and the two were exactly inverted: the accordion ran
              Mathematical foundations → Research leadership top to bottom while
              the drawing beside it put Mathematical foundations at the base and
              Research leadership on top. Two orderings of one set, side by
              side, mirrored — so pressing the first row lit the last layer.

              Rendered top-down from the top of the stack, so row *n* and layer
              *n* are at the same height on the screen. The numbers count down
              to 01 at the base, which also says the thing the section is
              about: the foundation is the first layer, not the fifth.
            */}
            <ul className="mt-8 space-y-2">
              {[...capabilities].reverse().map((c, r) => {
                const i = capabilities.length - 1 - r;
                const on = i === open;
                return (
                  <li key={c.area}>
                    <div
                      className={`rounded-sm border transition-colors duration-500 ${
                        on ? 'border-amber/40 bg-amber/[0.06]' : 'border-cyan/20 bg-void/40'
                      }`}
                    >
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(on ? -1 : i)}
                          aria-expanded={on}
                          aria-controls={`cap-panel-${i}`}
                          className="flex min-h-[3.25rem] w-full items-center justify-between gap-4 px-4 text-left"
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="font-mono text-micro tabular-nums text-amber/70">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`font-display text-lead font-bold leading-snug transition-colors duration-300 ${
                                on ? 'text-amber' : 'text-cyan'
                              }`}
                            >
                              {c.area}
                            </span>
                          </span>
                          <ChevronDown
                            size={17}
                            strokeWidth={2}
                            aria-hidden
                            className={`shrink-0 text-amber transition-transform duration-500 ${
                              on ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </h3>

                      {/*
                        Height animated by motion rather than by the
                        `grid-rows-[0fr→1fr]` trick used elsewhere on the site.
                        Both are correct; this one is here because the panel has
                        to stay in step with the stack lighting up beside it, and
                        one spring driving both keeps them together.
                      */}
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            id={`cap-panel-${i}`}
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={still ? STILL : SPRING.panel}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4">
                              {/* No ch-cap: same reasoning as the section lede above — nothing shares this row. */}
                              <p className="copy-sm">{c.detail}</p>
                              <ul className="mt-3 flex flex-wrap gap-1.5">
                                {c.items.map((item) => (
                                  <li
                                    key={item}
                                    className="rounded-sm border border-cyan/20 bg-void/50 px-2 py-1 font-mono text-micro text-cyan/75"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/*
            RIGHT — the drawing, in a recessed panel.

            `sticky` from `lg` up: the accordion column is taller than the stack,
            so without it opening the fifth area scrolls the picture it is
            supposed to be lighting off the top of the screen.
          */}
          <div className="lg:col-span-5" data-reveal>
            <div className="well p-5 sm:p-6 lg:sticky lg:top-28">
              <CapabilityStack
                areas={capabilities.map((c) => c.area)}
                activeIndex={open}
                onSelect={(i) => setOpen(i)}
              />
              <p className="mt-4 border-t border-cyan/20 pt-3 font-mono text-micro leading-relaxed text-dim">
                Each layer is narrower than the one beneath it — the higher up, the more
                domain-specific and the less it travels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
