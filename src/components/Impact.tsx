import { useState } from 'react';
import { impact } from '../data/impact';

/**
 * Impact dossier: one card per externally-corroborated milestone.
 * Every card carries its own sources — nothing here is self-reported only.
 */
export default function Impact() {
  const [open, setOpen] = useState<string | null>(impact[0]?.id ?? null);

  if (!impact.length) return null;

  return (
    <section id="impact" className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 bg-deep/30 py-20">
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>IMPACT DOSSIER<span className="text-amber">·]</span>
          </h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim sm:block">
            externally corroborated · sources attached
          </p>
        </div>

        <p className="mt-7 max-w-[72ch] text-lede text-cyan/65 text-pretty" data-reveal>
          Work does not count as impact until somebody outside the building says so. Each entry
          below is linked to its public record — the award, the programme, the venue.
        </p>

        <ul className="mt-10 space-y-3">
          {impact.map((m, i) => {
            const on = open === m.id;
            return (
              <li key={m.id} className="hud bg-void/40" data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : m.id)}
                  aria-expanded={on}
                  className="flex w-full items-start gap-5 px-5 py-5 text-left transition-colors duration-300 hover:bg-panel/30 sm:px-7"
                >
                  <span className="mt-1 font-mono text-[0.625rem] text-amber">
                    ·{String(i + 1).padStart(2, '0')}·
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-[1.0625rem] font-bold leading-snug text-cyan text-balance">
                        {m.title}
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-amber">
                        {m.year}
                      </span>
                    </span>
                    <span className="mt-2 block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dim">
                      {m.org}
                    </span>
                    <span className="mt-3 block max-w-[76ch] text-[0.875rem] leading-relaxed text-cyan/65 text-pretty">
                      {m.claim}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className={`mt-1 shrink-0 font-mono text-[0.875rem] text-amber transition-transform duration-500 ${
                      on ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-cyan/10 px-5 py-6 sm:px-7">
                      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-7">
                          <p className="tag text-amber/80">
                            <span className="bracket">context</span>
                          </p>
                          {m.detail.map((d, j) => (
                            <p
                              key={j}
                              className="mt-3 max-w-[64ch] text-[0.875rem] leading-relaxed text-cyan/60 text-pretty"
                            >
                              {d}
                            </p>
                          ))}
                        </div>

                        <div className="lg:col-span-5">
                          {m.role && (
                            <>
                              <p className="tag text-amber/80">
                                <span className="bracket">my part</span>
                              </p>
                              <p className="mt-3 text-[0.875rem] leading-relaxed text-cyan/70 text-pretty">
                                {m.role}
                              </p>
                            </>
                          )}

                          <p className="tag mt-6 text-amber/80">
                            <span className="bracket">public record</span>
                          </p>
                          <ul className="mt-3 space-y-2">
                            {m.sources.map((s) => (
                              <li key={s.url}>
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group flex items-baseline gap-2 font-mono text-[0.6875rem] text-cyan/70 transition-colors hover:text-amber"
                                >
                                  <span className="text-amber/70">↗</span>
                                  <span className="underline decoration-cyan/25 underline-offset-4 group-hover:decoration-amber">
                                    {s.label}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
