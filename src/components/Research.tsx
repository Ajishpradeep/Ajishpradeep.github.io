import { recognition, research } from '../data/research';

const statusLabel: Record<string, string> = {
  published: 'published',
  presented: 'presented',
  'in-progress': 'in progress',
};

export default function Research() {
  return (
    <section id="research" className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20">
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>RESEARCH LOG<span className="text-amber">·]</span>
          </h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim sm:block">
            work that left the building
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <ul className="lg:col-span-8">
            {research.map((r, i) => {
              const body = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="max-w-[52ch] font-display text-[1.0625rem] font-bold leading-snug text-cyan text-balance">
                      <span className="mr-3 font-mono text-[0.625rem] text-amber">
                        ·{String(i + 1).padStart(2, '0')}·
                      </span>
                      {r.title}
                    </h3>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-amber">
                      {r.year}
                    </span>
                  </div>
                  <p className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dim">
                    {r.venue} · {statusLabel[r.status]}
                  </p>
                  <p className="mt-3.5 max-w-[68ch] text-[0.875rem] leading-relaxed text-cyan/60 text-pretty">
                    {r.summary}
                  </p>
                </>
              );

              return (
                <li key={r.title} className="border-b border-cyan/10" data-reveal>
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-7 transition-opacity duration-300 hover:opacity-70"
                    >
                      {body}
                      <span className="tag mt-4 inline-block text-amber">
                        <span className="bracket">open repository ↗</span>
                      </span>
                    </a>
                  ) : (
                    <div className="py-7">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-4" data-reveal>
            <div className="hud bg-panel/25 p-6">
              <p className="tag text-amber">
                <span className="bracket">recognition</span>
              </p>
              <ul className="mt-6 space-y-6">
                {recognition.map((r) => (
                  <li key={r.title} className="border-b border-cyan/10 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[0.9375rem] font-bold text-cyan">
                        {r.title}
                      </h3>
                      <span className="font-mono text-[0.625rem] text-amber">{r.year}</span>
                    </div>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-cyan/55 text-pretty">
                      {r.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
