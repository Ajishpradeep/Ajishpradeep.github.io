import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X, Expand } from 'lucide-react';
import { research, type Entry } from '../data/research';
import ResearchPlate from './ResearchPlate';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDialog } from '../hooks/useDialog';
import { springOr, SPRING, STILL } from '../lib/motion';

const statusStyle: Record<string, string> = {
  published: 'border-cyan/50 text-cyan',
  presented: 'border-amber/60 text-amber',
  'in-progress': 'border-dim/60 text-dim',
};

const statusLabel: Record<string, string> = {
  published: 'Published',
  presented: 'Presented',
  'in-progress': 'In progress',
};

/**
 * Research log.
 *
 * IMAGE-LED EXPANDABLE CARDS, WHERE THE IMAGE IS DRAWN.
 *
 * This was a dated log with a year gutter, and the chronology was the argument.
 * The chronology is still here — the cards are in order and every one leads with
 * its year — but a list of five titles and five summaries was the least
 * illustrated part of a site whose subject is things you can only understand by
 * seeing them.
 *
 * `ExpandableEventCard` is built around a photograph that morphs into a larger
 * photograph. There are two images on this entire site, so instead each entry
 * carries a *plate*: a small diagram of what the work actually is, drawn from
 * the same ingredients as the case-study visuals. A GAN's hole and the context
 * pulled across it. A shelf and the embedding space a new SKU lands in. Two
 * views and the body lifted out of them.
 *
 * The plate is what morphs. Press a card and its geometry — frame, plate,
 * title — travels into a reader where the summary has room and the venue,
 * status and repository sit together.
 */
function Plate({ entry, big }: { entry: Entry; big?: boolean }) {
  return (
    <div
      className={`w-full overflow-hidden rounded-[3px] bg-void ${
        big ? 'aspect-[200/112]' : 'aspect-[200/112]'
      }`}
    >
      <ResearchPlate kind={entry.plate} />
    </div>
  );
}

export default function Research() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const still = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const entry = openIdx === null ? null : research[openIdx];
  useDialog(Boolean(entry), panelRef);

  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entry]);

  const t = springOr(still, SPRING.panel);

  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="research-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Research log
          </h2>
          <p className="tag-sm text-dim">Work that left the building</p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {research.map((r, i) => {
            const on = openIdx === i;
            return (
              <li
                key={r.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                <motion.div
                  layoutId={`paper-${i}`}
                  transition={t}
                  animate={{ opacity: on ? 0.2 : 1 }}
                  className="card group h-full cursor-pointer"
                  onClick={() => setOpenIdx(i)}
                >
                  <motion.div layoutId={`paper-plate-${i}`} transition={t} className="p-3 pb-0">
                    <Plate entry={r} />
                  </motion.div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <motion.span
                        layoutId={`paper-year-${i}`}
                        transition={t}
                        className="font-mono text-micro tabular-nums text-amber"
                      >
                        {r.year}
                      </motion.span>
                      <span
                        className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-micro ${statusStyle[r.status]}`}
                      >
                        {statusLabel[r.status]}
                      </span>
                    </div>

                    <h3 className="mt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenIdx(i);
                        }}
                        aria-haspopup="dialog"
                        className="text-left"
                      >
                        <motion.span
                          layoutId={`paper-title-${i}`}
                          transition={t}
                          className="block text-balance font-display text-lead font-bold leading-snug text-cyan transition-colors duration-300 group-hover:text-amber"
                        >
                          {r.title}
                        </motion.span>
                      </button>
                    </h3>

                    <p className="mt-2 font-mono text-micro leading-snug text-dim">{r.venue}</p>

                    <p className="mt-4 flex items-center gap-2 border-t border-cyan/20 pt-3 font-mono text-micro text-dim transition-colors duration-300 group-hover:text-amber">
                      <Expand size={13} strokeWidth={2} className="shrink-0" />
                      Open entry
                    </p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* THE OPEN ENTRY */}
      <AnimatePresence>
        {entry && openIdx !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={still ? STILL : { duration: 0.25 }}
              onClick={() => setOpenIdx(null)}
              className="absolute inset-0 bg-void/85 backdrop-blur-sm"
            />

            <motion.div
              ref={panelRef}
              layoutId={`paper-${openIdx}`}
              transition={t}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`paper-heading-${openIdx}`}
              className="card relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col bg-deep/95 shadow-[0_24px_80px_-20px_rgb(var(--void))]"
            >
              <div className="flex items-start justify-end p-3 pb-0">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenIdx(null)}
                  className="absolute right-4 top-4 z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-cyan/40 bg-void/70 text-cyan backdrop-blur-sm transition-colors duration-300 hover:border-amber hover:text-amber"
                >
                  <X size={17} strokeWidth={2} />
                  <span className="sr-only">Close entry</span>
                </button>
              </div>

              <motion.div
                layoutId={`paper-plate-${openIdx}`}
                transition={t}
                className="shrink-0 px-3 -mt-11"
              >
                <Plate entry={entry} big />
              </motion.div>

              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <motion.span
                    layoutId={`paper-year-${openIdx}`}
                    transition={t}
                    className="font-mono text-micro tabular-nums text-amber"
                  >
                    {entry.year}
                  </motion.span>
                  <span
                    className={`rounded-sm border px-2 py-0.5 font-mono text-micro ${statusStyle[entry.status]}`}
                  >
                    {statusLabel[entry.status]}
                  </span>
                  <span className="font-mono text-micro text-dim">{entry.venue}</span>
                </div>

                <h3 id={`paper-heading-${openIdx}`} className="mt-4">
                  <motion.span
                    layoutId={`paper-title-${openIdx}`}
                    transition={t}
                    className="block max-w-[26ch] text-balance font-display text-title font-extrabold uppercase leading-[1.14] text-cyan"
                  >
                    {entry.title}
                  </motion.span>
                </h3>

                {/*
                  The summary has nothing to morph from — the card never showed
                  it. It arrives once the geometry has settled, through the same
                  short blur the dossier and the Method deck use.
                */}
                <motion.div
                  initial={still ? false : { opacity: 0, y: 12, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={still ? STILL : { ...SPRING.panel, delay: 0.12 }}
                >
                  <p className="copy mt-5 max-w-[62ch]">{entry.summary}</p>

                  {entry.href && (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-6 inline-flex min-h-[2.75rem] items-center gap-2 rounded-sm border border-amber/50 bg-amber/10 px-4 font-mono text-micro uppercase text-amber transition-colors duration-300 hover:border-amber hover:bg-amber/20"
                    >
                      Open repository
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2}
                        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
