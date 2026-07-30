import {
  ScanEye,
  Brain,
  Gauge,
  Sigma,
  ArrowRight,
  FileText,
  MapPin,
  Ruler,
  Activity,
  Boxes,
  Store,
  Trophy,
  Globe2,
} from 'lucide-react';
import { marquee, site } from '../data/site';
import { domains } from '../data/domains';
import HudCanvas from './HudCanvas';
import PipelineViz from './PipelineViz';
import { useSpotlight } from '../hooks/useSpotlight';
import { useInView, useCountUp } from '../hooks/useInView';

const domainIcon = {
  vision: ScanEye,
  llm: Brain,
  edge: Gauge,
  maths: Sigma,
} as const;

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
      className="group flex items-start gap-3 border-b border-r border-cyan/10 px-3 py-5 transition-colors duration-500 last:border-r-0 hover:bg-panel/30 md:border-b-0"
    >
      <Icon
        size={17}
        strokeWidth={1.7}
        className="mt-1 shrink-0 text-amber/80 transition-transform duration-500 group-hover:scale-110"
      />
      <div className="min-w-0">
        <p className="font-display text-[1.35rem] font-bold leading-none text-cyan tabular-nums">
          {shown}
        </p>
        <p className="mt-2 text-[0.75rem] leading-snug text-dim">{label}</p>
      </div>
    </li>
  );
}

export default function Hero() {
  const spot = useSpotlight();

  return (
    <section className="relative overflow-hidden pt-24">
      <div className="grid-veil absolute inset-0" />
      <HudCanvas />

      <div className="shell relative pb-14 pt-12 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — headline */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3" data-reveal>
              <span className="inline-flex items-center gap-2 rounded-sm border border-amber/40 bg-amber/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                <span className="tag-sm text-amber">Open to research roles</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-dim">
                <MapPin size={13} strokeWidth={2} />
                <span className="tag-sm">{site.location}</span>
              </span>
            </div>

            <h1
              className="mt-7 font-display text-mega font-extrabold uppercase leading-[0.98] track-mid text-cyan glow-cyan"
              data-reveal
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              Research
              <br />
              <span className="text-amber glow-amber">that survives</span>
              <br />
              production
            </h1>

            <p
              className="mt-7 max-w-[46ch] copy"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              {site.intro}
            </p>

            {/* domain chips — icons carry the meaning */}
            <ul
              className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
              data-reveal
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
            >
              {domains.map((d) => {
                const Icon = domainIcon[d.key];
                return (
                  <li
                    key={d.key}
                    onMouseMove={spot}
                    className="card spot lift group p-4"
                  >
                    <span className="plate transition-all duration-500 group-hover:border-amber/60 group-hover:bg-amber group-hover:text-void">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <p className="mt-3 font-display text-[0.9375rem] font-bold leading-tight text-cyan">
                      {d.label}
                    </p>
                    <p className="mt-1 font-mono text-[0.625rem] leading-snug text-dim">
                      {d.note}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-8 flex flex-wrap gap-3"
              data-reveal
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            >
              <a href="#work" className="btn-amber">
                View systems <ArrowRight size={15} strokeWidth={2.2} />
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText size={15} strokeWidth={2} /> Résumé
              </a>
            </div>
          </div>

          {/* RIGHT — the pipeline, walkable */}
          <div
            className="lg:col-span-5"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            <PipelineViz />
          </div>
        </div>
      </div>

      {/* telemetry strip, now icon-led */}
      <div className="relative border-y border-cyan/15 bg-deep/60">
        <div className="shell">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
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
    </section>
  );
}
