import { marquee, site } from '../data/site';
import HudCanvas from './HudCanvas';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24">
      <div className="grid-veil absolute inset-0" />
      <HudCanvas />

      {/* rotated edge tab */}
      <div className="pointer-events-none absolute left-0 top-40 hidden lg:block">
        <div className="flex items-center">
          <div className="h-10 w-8 bg-signal" />
          <span
            className="tag ml-3 text-signal"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className="bracket">profile</span>
          </span>
        </div>
      </div>

      <div className="shell relative flex min-h-[calc(100svh-6rem)] flex-col justify-center py-16">
        <div className="flex items-center gap-4" data-reveal>
          <span className="h-2 w-2 bg-amber" />
          <p className="tag text-amber">
            <span className="bracket">open to research roles</span>
          </p>
        </div>

        <h1
          className="mt-8 font-display text-mega font-extrabold uppercase leading-[0.98] text-cyan glow-cyan"
          data-reveal
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          <span className="block">Research</span>
          <span className="block text-amber glow-amber">that survives</span>
          <span className="block">production</span>
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <p
            className="max-w-[62ch] text-lede text-cyan/70 text-pretty lg:col-span-7"
            data-reveal
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          >
            {site.intro}
          </p>

          <div
            className="lg:col-span-5"
            data-reveal
            style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
          >
            <div className="hud p-6">
              <p className="tag text-dim">
                <span className="bracket">how to explore</span>
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  ['01', 'SCROLL', 'move through the systems'],
                  ['02', 'SELECT', 'pick a system from the index'],
                  ['03', 'BACK / NEXT', 'step through the case files'],
                ].map(([n, k, d]) => (
                  <li key={n} className="flex gap-4">
                    <span className="font-mono text-[0.6875rem] text-amber">·{n}·</span>
                    <span>
                      <span className="block font-display text-[1.05rem] font-bold track-mid text-cyan">
                        {k}
                      </span>
                      <span className="block font-mono text-[0.6875rem] text-dim">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#work" className="btn-amber">
                enter
                <span aria-hidden>→</span>
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                cv · pdf
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* telemetry strip */}
      <div className="relative border-y border-cyan/15 bg-deep/70">
        <div className="shell">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {marquee.map((m, i) => (
              <li
                key={m.value}
                className="border-b border-r border-cyan/10 px-1 py-5 last:border-r-0 md:border-b-0 md:py-6"
              >
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-amber/70">
                  ·{String(i + 1).padStart(2, '0')}·
                </p>
                <p className="mt-2 font-display text-[1.5rem] font-bold track-mid text-cyan">
                  {m.value}
                </p>
                <p className="mt-1.5 max-w-[24ch] font-mono text-[0.625rem] leading-snug text-dim">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
