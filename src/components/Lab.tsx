import { lab } from '../data/lab';
import { site } from '../data/site';

/** Personal builds — smaller than the case studies, and deliberately shown as such. */
export default function Lab() {
  if (!lab.length) return null;

  const ghost = site.links.find((l) => l.label === 'GitHub')?.href;

  return (
    <section id="lab" className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20">
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>THE LAB<span className="text-amber">·]</span>
          </h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim sm:block">
            personal builds · open source
          </p>
        </div>

        <p className="mt-7 max-w-[72ch] text-lede text-cyan/65 text-pretty" data-reveal>
          Side projects, built to answer a question rather than ship a product. They are where I
          try an idea before it is allowed anywhere near production.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lab.map((p, i) => (
            <li
              key={p.name}
              data-reveal
              style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
            >
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="hud group flex h-full flex-col bg-void/50 p-6 transition-colors duration-500 hover:bg-panel/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[0.625rem] text-amber">
                    ·{String(i + 1).padStart(2, '0')}· {p.year}
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[0.75rem] text-dim transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-amber"
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-4 font-display text-[1.0625rem] font-bold leading-snug text-cyan group-hover:text-amber">
                  {p.name}
                </h3>

                <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-cyan/60 text-pretty">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.language && (
                    <span className="flex items-center gap-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-dim">
                      <span className="h-1.5 w-1.5 bg-amber/80" />
                      {p.language}
                    </span>
                  )}
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-cyan/20 px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>

        {ghost && (
          <div className="mt-8" data-reveal>
            <a href={ghost} target="_blank" rel="noreferrer" className="btn-ghost">
              all repositories <span aria-hidden>↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
