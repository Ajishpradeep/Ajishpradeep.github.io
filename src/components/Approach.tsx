import { principles } from '../data/research';

export default function Approach() {
  return (
    <section id="method" className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20">
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>METHOD<span className="text-amber">·]</span>
          </h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim sm:block">
            06 findings · from being wrong measurably
          </p>
        </div>

        <p className="mt-7 max-w-[70ch] text-lede text-cyan/65 text-pretty" data-reveal>
          Each of these came from a specific system doing something specific and unexpected. They
          are the reason a second attempt at a problem is usually much faster than the first.
        </p>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="hud group bg-deep/50 p-6 transition-colors duration-500 hover:bg-panel/40"
              data-reveal
              style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.6875rem] text-amber">·{p.n}·</span>
                <span className="h-1.5 w-1.5 bg-cyan/40 transition-colors group-hover:bg-amber" />
              </div>
              <h3 className="mt-5 font-display text-[1.0625rem] font-bold leading-snug text-cyan text-balance">
                {p.title}
              </h3>
              <p className="mt-3.5 text-[0.875rem] leading-relaxed text-cyan/60 text-pretty">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
