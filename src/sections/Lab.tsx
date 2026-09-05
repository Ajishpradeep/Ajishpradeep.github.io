import { Github, ArrowUpRight, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { lab } from '@/data/lab';
import { site } from '@/data/site';
import Tilt from '@/motion/Tilt';
import InView from '@/motion/InView';
import { RISE_GROUP, RISE_ITEM } from '@/lib/variants';

/*
  SIX FILLS, FROM THIS PALETTE.

  Blog2 ships `violet / amber / emerald / orange / blue / rose` at 60% — six
  unrelated hues, which on a card grid reads as six unrelated *kinds of thing*.
  These six are all the same kind of thing: personal builds, in one lab.

  So the ramp is built from the site's own two colours and the space between
  them — cyan-hot through teal to amber — and the variation carries something
  real instead of nothing: it runs newest to oldest, so the 2026 builds are the
  warm end and the 2024 experiment is the cool one. A reader who never notices
  gets a grid that looks composed rather than random; a reader who does gets a
  date axis for free.

  The card shape is Blog2's and it is the reason to use it: a tall card whose
  title is the loudest thing in it, meta at the top, attribution and a Read pill
  along the bottom. The previous cards led with a 19px project name over a
  paragraph, which made six repositories look like six paragraphs.
*/
const TONES = [
  'border-amber/45 bg-amber/[0.13] hover:bg-amber/[0.19]',
  'border-amber/35 bg-amber/[0.09] hover:bg-amber/[0.15]',
  'border-cyan/30 bg-panel/50 hover:bg-panel/70',
  'border-cyan-hot/30 bg-cyan-hot/[0.06] hover:bg-cyan-hot/[0.11]',
  'border-cyan-hot/35 bg-cyan-hot/[0.08] hover:bg-cyan-hot/[0.13]',
  'border-cyan-hot/45 bg-cyan-hot/[0.11] hover:bg-cyan-hot/[0.17]',
];

/**
 * The lab.
 *
 * Six personal builds, as a card grid loud enough to be worth stopping at.
 * `Blog2`'s structure with this site's palette — see the note above on why the
 * six fills are a ramp rather than a spectrum.
 *
 * `Tilt` stays on top of it: the card responds to where it is pointed at, which
 * on a grid of six near-identical rectangles is the one cue that tells you which
 * one you are about to open.
 */
export default function Lab() {
  if (!lab.length) return null;
  const ghost = site.links.find((l) => l.label === 'GitHub')?.href;

  return (
    <section
      id="lab"
      aria-labelledby="lab-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="lab-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            The lab
          </h2>
          <p className="inline-flex items-center gap-1.5 tag-sm text-dim">
            <Github size={13} strokeWidth={2} /> Personal builds
          </p>
        </div>

        {/* No ch-cap: this line has the shell to itself, same reasoning as Impact's. */}
        <p className="mt-6 copy" data-reveal>
          Things built outside work hours.
        </p>

        <InView
          as="ul"
          variants={RISE_GROUP}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lab.map((p, i) => (
            <motion.li key={p.name} variants={RISE_ITEM}>
              <Tilt className="h-full" rotationFactor={8} reverse>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex h-full min-h-[19rem] flex-col justify-between rounded-sm border p-5 transition-colors duration-300 sm:p-6 ${
                    TONES[i % TONES.length]
                  }`}
                >
                  {/* meta row — year left, bookmark right, per Blog2 */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-micro font-medium tabular-nums text-amber">
                      {p.year}
                    </span>
                    <Bookmark
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden
                      className="text-cyan/35 transition-colors duration-300 group-hover:text-amber"
                    />
                  </div>

                  {/*
                    The title is the loudest thing in the card, which is the
                    whole point of borrowing this shape. `text-title` rather
                    than Blog2's `text-4xl`: at 4xl a name like
                    `data_automation_pipeline` sets four lines in a 320px card.
                  */}
                  <div className="flex flex-1 flex-col justify-center py-6">
                    <div className="flex items-start justify-between gap-3">
                      {/*
                        `data_automation_pipeline` is a 24-character unbroken
                        token; `break-words` alone did not stop it. A flex
                        item's default `min-width: auto` wins over
                        `overflow-wrap` when a browser computes the item's
                        automatic minimum size for flexing — it still refuses
                        to shrink below the whole word's width unless
                        `min-w-0` overrides that default explicitly. Both
                        together is what actually wraps it.
                      */}
                      <h3
                        className="min-w-0 text-balance break-words font-display text-title font-bold leading-[1.15] tracking-tight text-cyan transition-colors duration-300 group-hover:text-amber"
                      >
                        {p.name}
                      </h3>
                      <ArrowUpRight
                        size={20}
                        strokeWidth={2.4}
                        aria-hidden
                        className="mt-1.5 shrink-0 text-cyan/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                      />
                    </div>
                    <p className="mt-3 line-clamp-4 copy-sm">{p.description}</p>
                  </div>

                  {/* attribution row — language and stack left, action pill right */}
                  <div className="flex items-end justify-between gap-3 border-t border-cyan/15 pt-4">
                    <div className="min-w-0">
                      {p.language && (
                        <span className="flex items-center gap-1.5 font-mono text-micro text-cyan/80">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-amber" />
                          {p.language}
                        </span>
                      )}
                      <p className="mt-1 truncate font-mono text-micro text-dim">
                        {p.tags.join(' · ')}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-sm border border-cyan/30 px-3 py-1.5 font-mono text-micro uppercase text-cyan transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-void">
                      Open
                    </span>
                  </div>
                </a>
              </Tilt>
            </motion.li>
          ))}
        </InView>

        {ghost && (
          <div className="mt-8" data-reveal>
            <a href={ghost} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github size={15} strokeWidth={2} /> All repositories
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
