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
import { PoseFigure } from './Vectors';

const domainIcon = {
  vision: ScanEye,
  llm: Brain,
  edge: Gauge,
  maths: Sigma,
} as const;

/** One icon per headline figure, in the order they appear in the data. */
const statIcon = [Ruler, Activity, Boxes, Store, Trophy, Globe2];

export default function Hero() {
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
                  <li key={d.key} className="card group p-4">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-amber transition-transform duration-500 group-hover:scale-110"
                    />
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

          {/* RIGHT — the subject, drawn */}
          <div className="lg:col-span-5" data-reveal style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
            <div className="hud relative bg-deep/50 p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
                <div className="sweep h-px w-1/3 bg-gradient-to-r from-transparent via-amber to-transparent" />
              </div>

              <div className="flex items-center justify-between">
                <span className="tag-sm text-dim">Pose · 24 body + 5 club</span>
                <span className="tag-sm text-amber">live</span>
              </div>

              <PoseFigure className="mx-auto mt-4 h-64 w-full" />

              <div className="mt-4 grid grid-cols-3 gap-px border-t border-cyan/15 pt-4">
                {[
                  ['MPJPE', '3.0cm'],
                  ['Rate', '240fps'],
                  ['Cloud', 'none'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-dim">
                      {k}
                    </p>
                    <p className="mt-1 font-display text-[1.05rem] font-bold text-amber">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* telemetry strip, now icon-led */}
      <div className="relative border-y border-cyan/15 bg-deep/60">
        <div className="shell">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {marquee.map((m, i) => {
              const Icon = statIcon[i] ?? Boxes;
              return (
                <li
                  key={m.value}
                  className="flex items-start gap-3 border-b border-r border-cyan/10 px-3 py-5 last:border-r-0 md:border-b-0"
                >
                  <Icon size={17} strokeWidth={1.7} className="mt-1 shrink-0 text-amber/80" />
                  <div className="min-w-0">
                    <p className="font-display text-[1.35rem] font-bold leading-none text-cyan">
                      {m.value}
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-snug text-dim">{m.label}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
