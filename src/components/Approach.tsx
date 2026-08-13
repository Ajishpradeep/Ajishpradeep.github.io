import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { principles } from '../data/research';
import MetricBlindness from './MetricBlindness';
import MinimalCarousel, { type CarouselCard } from './motion/MinimalCarousel';

/*
  SIX TONES, KEYED BY POSITION AND THAT IS FINE HERE.

  The site's rule against index-mapped arrays exists because an icon assigned by
  position makes a *claim* — a leaf means "environmental", a music note means
  "audio" — and reassigns it silently when the list changes. A colour in an
  ordered sequence claims nothing except its own place in the sequence, which is
  exactly what these six are: numbered findings, referred to by number in the
  copy.

  The ramp runs cyan → teal → amber, which is the site's own two colours and the
  space between them. It is not the demo's violet/emerald/rose: those are six
  unrelated hues, and six unrelated hues on this page would read as six
  unrelated ideas. This ramp reads as one argument getting warmer, which is what
  the sequence actually does — 01 is the diagnosis and 06 is what you owe the
  next person.
*/
const TONES = [
  'border-cyan-hot/40 bg-cyan-hot/[0.07] hover:bg-cyan-hot/[0.12]',
  'border-cyan-hot/35 bg-cyan-hot/[0.05] hover:bg-cyan-hot/[0.1]',
  'border-cyan/25 bg-panel/40 hover:bg-panel/60',
  'border-amber/25 bg-amber/[0.05] hover:bg-amber/[0.09]',
  'border-amber/35 bg-amber/[0.08] hover:bg-amber/[0.13]',
  'border-amber/45 bg-amber/[0.11] hover:bg-amber/[0.16]',
];

/**
 * Method.
 *
 * SIX CLAIMS, AS A DECK RATHER THAN AS A LIST.
 *
 * These were six full-width ruled rows: heading left, paragraph right, ~2,900px
 * of section. Every row was the same shape, so the section read as reference
 * material — and it is the opposite of that. It is the best writing on the site
 * and the one part a research reader came for.
 *
 * As a deck the six are *comparable*: they sit on one screen, the sequence is
 * visible as a sequence, and reading one is a decision the visitor makes rather
 * than a scroll they endure. Pressing a tile lifts it into a full-width panel
 * above the grid, which is where the body, the receipt and — for 01 — the
 * instrument live.
 *
 * NOTHING IS OPEN UNTIL SOMETHING IS PRESSED.
 *
 * The deck used to default to principle 01 open, which meant scrolling to
 * Method didn't reveal six equal tiles — it revealed one already-expanded
 * card, taller than the viewport, that the visitor had done nothing to
 * produce. "Press a finding to read what it cost" is a lie if the first one
 * is already read for you before you have touched anything. `open` starts at
 * `null` so the section arrives the same shape it closes to: six numbered
 * tiles, and every expansion on this page is something the visitor did.
 *
 * `BlindSpotMap` — the spatial diagram that used to sit above the deck as its
 * own permanently-open card, then briefly moved inside 01's panel — is gone.
 * It was good work and it was still two things stacked to make one argument;
 * `MetricBlindness`, the interactive instrument, carries principle 01 alone
 * now.
 */
export default function Approach() {
  const [open, setOpen] = useState<string | null>(null);

  const cards = useMemo<CarouselCard[]>(
    () =>
      principles.map((p, i) => ({
        id: p.n,
        tone: TONES[i] ?? TONES[TONES.length - 1],
        tile: (
          <>
            <span className="font-mono text-micro tabular-nums text-amber/80">{p.n}</span>
            {/*
              `break-words`, matching the same fix on the lab cards. Below
              `sm` the grid is two columns and a tile's content box is ~140px
              — narrower than "DETERMINISTIC" (14 characters) renders at
              `text-base` bold uppercase, so the word ran straight through
              the card's own border rather than wrapping.
            */}
            <span className="mt-3 max-w-full text-balance break-words font-display text-base font-bold uppercase leading-[1.2] text-cyan">
              {p.title}
            </span>
          </>
        ),
        panel: (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-micro tabular-nums text-amber">{p.n}</p>
                {/*
                  `max-w-[30ch]` used to force a wrap that read well in a
                  narrow two-thirds column shared with a stacked instrument
                  below it. `MinimalCarousel`'s own panel is full-width (see
                  its doc comment) for every finding, 01 included — the cap
                  on 02–06 was left behind when 01's was removed for the same
                  reason. None of the six share this row with anything.
                */}
                <h3 className="mt-2 text-balance font-display text-title font-extrabold uppercase leading-[1.14] text-cyan">
                  {p.title}
                </h3>
              </div>

              {/*
                Closing is a real control, not only a second press on the tile.
                The tile is gone from the grid while it is open — it *is* this
                panel — so without this the only way back is Escape, which the
                visitor has no way of knowing about.
              */}
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-cyan/30 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                <X size={16} strokeWidth={2} />
                <span className="sr-only">Close finding {p.n}</span>
              </button>
            </div>

            {/*
              The one finding on this page that can be handed to the reader
              rather than asserted. It belongs beside the claim it proves, and
              it appears at the moment that claim is being read — pressed
              open, not pre-opened.

              01 does not render the generic claim paragraph below: it hands
              `p.body` to `MetricBlindness`, which opens with it in the same
              column the instrument reads from. A full-width paragraph capped
              at 68ch here left the rest of its own line empty and then
              started the instrument on a fresh row under that emptiness.
            */}
            {p.n === '01' ? (
              <div className="mt-5">
                <MetricBlindness claim={p.body} />
              </div>
            ) : (
              <p className="copy mt-5">{p.body}</p>
            )}

            {p.from && (
              <Link
                to={`/work/${p.from.slug}`}
                className="group mt-6 inline-flex min-h-[2.75rem] items-center gap-2 border-t border-amber/25 pt-4 text-fine text-amber"
              >
                <span className="underline decoration-amber/40 underline-offset-4 transition-colors group-hover:decoration-amber">
                  Where this came from: {p.from.section}
                </span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 translate-y-0.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            )}

            {/*
              06 carries no receipt, and says so rather than simply lacking one.
              An absent link is indistinguishable from a forgotten link; a stated
              absence is the same discipline the dossier applies to sources.
            */}
            {!p.from && (
              <p className="mt-6 border-t border-cyan/20 pt-4 font-mono text-micro text-dim">
                No single case behind this one — it is what the others cost.
              </p>
            )}
          </>
        ),
      })),
    [],
  );

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="method-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Method
          </h2>
          <p className="tag-sm text-dim">Six findings · from being wrong measurably</p>
        </div>

        {/*
          One lead paragraph, not a lead paragraph beside a permanently-open
          diagram. It sets up the section without pre-empting principle 01's
          own hook — "a model once scored better while getting worse" is that
          card's own opening line, and saying it again here, a few hundred
          pixels above where it is said properly, is exactly the kind of
          repetition the site's own copy rule elsewhere calls out on sight.
        */}
        {/* No ch-cap: this line has the shell to itself, same reasoning as Impact's. */}
        <p className="mt-8 copy-lead" data-reveal>
          Six things I know because a system was wrong in a way its own metric could not
          see — each one specific, each one costly, each one traceable to a decision. Press
          a finding to read what it cost and where it came from.
        </p>

        <div className="mt-10" data-reveal>
          <MinimalCarousel
            cards={cards}
            activeId={open}
            onSelect={setOpen}
            label="Six findings"
          />
        </div>
      </div>
    </section>
  );
}
