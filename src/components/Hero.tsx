import { ArrowRight, FileText } from 'lucide-react';
import { marquee, site } from '../data/site';
import CapabilityGraph from './CapabilityGraph';
import { useInView, useCountUp } from '../hooks/useInView';

/**
 * One headline figure. `dl` order is term-then-definition; the visual order is
 * definition-then-term, which is what `flex-col-reverse` is doing — the number
 * reads first and the label explains it, without lying about which is which.
 */
function Figure({ value, label }: { value: string; label: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const shown = useCountUp(value, seen);

  return (
    <div
      ref={ref}
      className="flex flex-col-reverse justify-end border-l border-cyan/20 py-3 pl-4 first:border-l-0 first:pl-0"
    >
      <dt className="mt-1 font-text text-micro leading-snug text-dim">{label}</dt>
      <dd className="font-display text-title font-bold leading-none text-cyan tabular-nums">
        {shown}
      </dd>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[4.5rem] sm:pt-[5.5rem]"
    >
      {/*
        The particle canvas that used to sit here is gone. It was a
        distance-threshold node field — the most-shipped decorative canvas on
        the web, mounted twice on this page, and saying nothing about a product
        whose subject is measuring a body in three dimensions. The hero has one
        authored moment now and it is the instrument in the right column.
      */}
      <div className="grid-veil absolute inset-0" />

      <div className="shell relative pb-12 pt-6 lg:pt-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          {/* LEFT — the claim, the person, the numbers, the way in */}
          <div className="flex flex-col lg:col-span-7">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 rounded-sm border border-amber/40 bg-amber/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                <span className="tag-sm text-amber">Open to research roles</span>
              </span>
            </div>

            {/*
              No hard <br />. At 375px forced breaks split "COMPUTER VISION"
              mid-phrase into five ragged lines; balance wraps it on its own
              terms at every width. The emphasis is one contiguous phrase at the
              end, so a wrap inside it still reads as one amber unit.

              The measure was 16ch against a 88px `mega`, which set five lines
              and 423px of headline — 47% of a 1440×900 viewport, pushing every
              figure and the primary call to action below the fold. `mega` now
              tops out at 68px (see tailwind.config.js) and the measure is 18ch,
              which holds the same words in three lines.
            */}
            <h1
              id="hero-title"
              className="mt-4 max-w-[18ch] text-balance font-display text-mega font-extrabold uppercase text-cyan glow-cyan"
              data-reveal
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              Models that cannot be{' '}
              <span className="text-amber glow-amber">quietly wrong.</span>
            </h1>

            <p
              className="copy-lead mt-5 max-w-[54ch]"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              {site.intro}
            </p>

            {/*
              The differentiator, given its own line and its own weight. It is
              the one claim a forwarded CV cannot carry, so it is the one thing
              the hero must not bury in a subordinate clause.
            */}
            <p
              className="mt-3 max-w-[54ch] font-text text-lead font-semibold italic leading-[1.45] text-amber"
              data-reveal
              style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
            >
              {site.introEmphasis}
            </p>

            {/*
              Byline. Carries what a 45-second visitor needs: the role, the
              location, and the other name they may be holding a CV under.
            */}
            <div
              className="mt-6 border-l border-amber/50 pl-4"
              data-reveal
              style={{ '--reveal-delay': '190ms' } as React.CSSProperties}
            >
              <p className="font-display text-base font-bold leading-tight text-cyan">
                {site.name}
                <span className="text-dim"> · </span>
                <span className="text-amber">{site.role}</span>
              </p>
              <p className="tag-sm mt-1.5 normal-case text-dim">
                also known as {site.alias} · {site.location}
              </p>
            </div>

            {/*
              The two ways in, before the evidence rather than after it. Both
              were below the fold at 1440×900 and the résumé is the single
              thing the sixty-second visitor is most likely to want; putting
              the figures first pushed it to 797px, which a 13-inch laptop
              never reaches.
            */}
            <div
              className="mt-6 flex flex-wrap gap-3"
              data-reveal
              style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
            >
              <a href="#work" className="btn-amber">
                Read the case studies <ArrowRight size={15} strokeWidth={2.2} />
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText size={15} strokeWidth={2} /> Résumé
              </a>
            </div>

            {/*
              The headline figures, in the hero column rather than in a
              full-width strip below it.

              The strip held six tiles of equal weight, none of them above the
              fold, and three of them — 29 keypoints, 1 of 3 winners, Warsaw —
              restated facts the impact dossier already carries with sources
              attached. Three figures, at the top, is what the sixty-second
              reader was promised.
            */}
            <dl
              className="mt-7 grid grid-cols-3 border-y border-cyan/20"
              data-reveal
              style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
            >
              {marquee.map((m) => (
                <Figure key={m.value} value={m.value} label={m.label} />
              ))}
            </dl>
          </div>

          {/*
            RIGHT — the expertise, as an explorable graph.

            This slot briefly held a single-finding instrument about validation
            blindness. It was a good artifact and the wrong one for the
            position: it introduced one problem from one case study, which is a
            paper figure, where the hero has to answer "what is this person
            expert in". The graph does that in one picture. The instrument now
            sits in Method, next to the finding it dramatises.
          */}
          <div
            className="lg:col-span-5"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            <CapabilityGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
