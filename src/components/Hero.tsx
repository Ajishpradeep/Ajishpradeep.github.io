import {
  ArrowRight,
  FileText,
  Ruler,
  Activity,
  Boxes,
  Store,
  Trophy,
  Globe2,
} from 'lucide-react';
import { marquee, site } from '../data/site';
import HudCanvas from './HudCanvas';
import CapabilityGraph from './CapabilityGraph';
import { useInView, useCountUp } from '../hooks/useInView';

/** One icon per headline figure, in the order they appear in the data. */
const statIcon = [Ruler, Activity, Boxes, Store, Trophy, Globe2];

/** Telemetry tile whose figure counts up the first time it is seen. */
function StatTile({
  value,
  label,
  Icon,
}: {
  value: string;
  label: string;
  Icon: typeof Ruler;
}) {
  const { ref, seen } = useInView<HTMLLIElement>();
  const shown = useCountUp(value, seen);

  return (
    <li
      ref={ref}
      className="group border-b border-r border-cyan/20 px-4 py-5 transition-colors duration-500 hover:bg-panel/30"
    >
      <div className="flex items-baseline gap-2.5">
        <Icon
          size={16}
          strokeWidth={1.7}
          className="icon-mark translate-y-0.5 text-amber/80 transition-transform duration-500 group-hover:scale-110"
        />
        <p className="font-display text-title font-bold leading-none text-cyan tabular-nums">
          {shown}
        </p>
      </div>
      <p className="mt-2 font-text text-micro leading-snug text-dim">{label}</p>
    </li>
  );
}

export default function Hero() {

  return (
    <section className="relative overflow-hidden pt-[4.5rem] sm:pt-[5.5rem]">
      <div className="grid-veil absolute inset-0" />
      <HudCanvas />

      <div className="shell relative pb-12 pt-6 lg:pt-10">
        {/*
          `items-stretch`, not `items-center`. Centred, the panel floated
          against the taller headline column and left a band of empty space
          above it that read as a mistake. Stretched, both columns start on the
          same line AND share a height — which is what lets the CTA row below
          push itself to the panel's bottom edge with `mt-auto`.
        */}
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — headline */}
          <div className="flex flex-col lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3" data-reveal>
              <span className="inline-flex items-center gap-2 rounded-sm border border-amber/40 bg-amber/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                <span className="tag-sm text-amber">Open to research roles</span>
              </span>
            </div>

            {/*
              No hard <br />. At 375px the forced breaks made the browser split
              "COMPUTER VISION" mid-phrase into five ragged lines; balance wraps
              it on its own terms at every width.

              The emphasis is one contiguous phrase at the end of the line, so
              a wrap inside it still reads as one amber unit. The previous
              headline coloured "with physics", which the browser split across
              lines 2 and 3 at 1440 — the emphasised unit was severed and the
              colour read as arbitrary.
            */}
            <h1
              className="mt-6 max-w-[16ch] text-balance font-display text-mega font-extrabold uppercase text-cyan glow-cyan"
              data-reveal
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              Computer vision that cannot be{' '}
              <span className="text-amber glow-amber">quietly wrong.</span>
            </h1>

            <p
              className="copy-lead mt-6 max-w-[52ch]"
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
              className="mt-3 max-w-[52ch] font-text text-lead font-semibold italic leading-[1.45] text-amber"
              data-reveal
              style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
            >
              {site.introEmphasis}
            </p>

            {/*
              Byline. Carries what a 45-second visitor needs: the role, and the
              other name they may be holding a CV under. The portrait that used
              to sit beside it is gone — the hero is a claim, not an introduction,
              and the face belongs on About where the person is the subject.
            */}
            <div
              className="mt-8 border-l border-amber/50 pl-4"
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

            {/* mt-auto: the CTAs land on the panel's bottom edge rather than
                leaving the column short of it. */}
            <div
              className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8"
              data-reveal
              style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
            >
              <a href="#work" className="btn-amber">
                Read the case studies <ArrowRight size={15} strokeWidth={2.2} />
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText size={15} strokeWidth={2} /> Résumé
              </a>
            </div>
          </div>

          {/* RIGHT — the expertise, as an explorable graph */}
          <div
            className="lg:col-span-5"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            <CapabilityGraph />

          </div>
        </div>
      </div>

      {/*
        Telemetry strip. Every tile carries a right and bottom hairline; the
        wrapper clips the ones that would otherwise sit flush against the
        container edge, so the grid reads correctly at 2, 3 and 6 columns
        without a single nth-child rule.
      */}
      <div className="relative border-y border-cyan/15 bg-deep/60">
        <div className="shell">
          <div className="overflow-hidden">
            <ul className="-mb-px -mr-px grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {marquee.map((m, i) => (
                <StatTile
                  key={m.value}
                  value={m.value}
                  label={m.label}
                  Icon={statIcon[i] ?? Boxes}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
