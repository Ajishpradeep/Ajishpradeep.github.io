import { useState } from 'react';
import { Link } from 'react-router-dom';
import { work } from '../data/work';

/** Rail index on the left, case-file readout on the right, stepped with BACK / NEXT. */
export default function WorkConsole() {
  const [i, setI] = useState(0);
  const study = work[i];
  const pct = Math.round(((i + 1) / work.length) * 100);

  const go = (d: number) => setI((v) => (v + d + work.length) % work.length);

  return (
    <section id="work" className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20">
      <div className="grid-veil absolute inset-0 opacity-70" />

      {/* rotated edge tab */}
      <div className="pointer-events-none absolute left-0 top-24 hidden lg:block">
        <div className="flex items-center">
          <div className="h-10 w-8 bg-amber" />
          <span
            className="tag ml-3 text-amber"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className="bracket">systems</span>
          </span>
        </div>
      </div>

      <div className="shell relative">
        {/* header row */}
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>SELECTED SYSTEMS<span className="text-amber">·]</span>
          </h2>
          <div className="hidden text-right sm:block">
            <p className="font-mono text-[0.6875rem] text-amber">{String(pct).padStart(3, '0')}%</p>
            <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
              {study.slug}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* RAIL */}
          <nav className="lg:col-span-3" aria-label="Case study index">
            <p className="tag text-dim">
              <span className="bracket">index</span>
            </p>
            <ul className="mt-5 space-y-2.5">
              {work.map((wk, idx) => {
                const on = idx === i;
                return (
                  <li key={wk.slug} className="flex items-baseline gap-3">
                    <span
                      className={`text-[0.625rem] transition-colors ${on ? 'text-amber' : 'text-dim/60'}`}
                    >
                      ●
                    </span>
                    <button
                      type="button"
                      onClick={() => setI(idx)}
                      aria-current={on}
                      className={`rail-link ${
                        on
                          ? 'font-display text-[1.05rem] font-bold text-amber glow-amber'
                          : 'font-mono text-[0.75rem] text-cyan/55 hover:text-cyan'
                      }`}
                    >
                      {wk.title}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="frame-dashed mt-8 hidden p-5 lg:block">
              <p className="tag text-amber">
                <span className="bracket">now reading</span>
              </p>
              <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-dim">
                {study.org}
                <br />
                {study.period}
                <br />
                {study.role}
              </p>
            </div>
          </nav>

          {/* READOUT */}
          <div className="lg:col-span-9">
            <div className="hud relative bg-panel/35 p-6 sm:p-9">
              {/* sweeping scan line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
                <div className="sweep h-px w-1/3 bg-gradient-to-r from-transparent via-amber to-transparent" />
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="tag text-amber">
                  <span className="bracket">{study.domain}</span>
                </p>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
                  case · {study.index} / {String(work.length).padStart(2, '0')}
                </p>
              </div>

              <h3 className="mt-6 max-w-[20ch] font-display text-headline font-extrabold uppercase leading-[1.08] text-cyan text-balance">
                {study.title}
              </h3>

              <p className="mt-5 max-w-[70ch] text-lede text-cyan/65 text-pretty">
                {study.subtitle}
              </p>

              {/* metric readouts */}
              <ul className="mt-8 grid gap-px border border-cyan/15 sm:grid-cols-2 lg:grid-cols-4">
                {study.metrics.map((m) => (
                  <li key={m.label} className="bg-deep/60 px-4 py-5">
                    <p className="font-display text-[1.35rem] font-bold track-mid text-amber">
                      {m.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[0.625rem] leading-snug text-dim">
                      {m.label}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-2 border-amber/60 pl-5">
                <p className="tag text-dim">
                  <span className="bracket">the constraint</span>
                </p>
                <p className="mt-3 max-w-[72ch] text-[0.9375rem] leading-relaxed text-cyan/80 text-pretty">
                  {study.problem}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {study.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-cyan/25 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cyan/60"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* controls */}
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => go(-1)} className="btn-ghost">
                  <span aria-hidden>←</span> back
                </button>
                <button type="button" onClick={() => go(1)} className="btn-amber">
                  next <span aria-hidden>→</span>
                </button>
                <Link to={`/work/${study.slug}`} className="btn-ghost border-amber/60 text-amber">
                  open case file <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
