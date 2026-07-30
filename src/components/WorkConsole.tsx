import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Building2,
  CalendarDays,
  UserCog,
  Target,
} from 'lucide-react';
import { work } from '../data/work';
import CaseVisual from './CaseVisual';
import ConstraintLab from './ConstraintLab';

/** Rail index on the left, case-file readout on the right, stepped with back / next. */
export default function WorkConsole() {
  const [i, setI] = useState(0);
  const study = work[i];

  const go = (d: number) => setI((v) => (v + d + work.length) % work.length);

  return (
    <section
      id="work"
      className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20"
    >
      <div className="grid-veil absolute inset-0 opacity-70" />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Selected systems<span className="text-amber">]</span>
          </h2>
          <p className="tag-sm text-dim">
            {study.index} / {String(work.length).padStart(2, '0')}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* RAIL */}
          <nav className="lg:col-span-3" aria-label="Case study index">
            <p className="tag-sm text-dim">Index</p>
            <ul className="mt-4 space-y-1.5">
              {work.map((wk, idx) => {
                const on = idx === i;
                return (
                  <li key={wk.slug}>
                    <button
                      type="button"
                      onClick={() => setI(idx)}
                      aria-current={on}
                      className={`flex w-full items-start gap-3 rounded-sm p-3 text-left transition-all duration-300 ${
                        on
                          ? 'border border-amber/45 bg-amber/10'
                          : 'border border-transparent hover:bg-panel/40'
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-mono text-[0.6875rem] ${
                          on ? 'text-amber' : 'text-dim'
                        }`}
                      >
                        {wk.index}
                      </span>
                      <span
                        className={`font-display text-[0.9375rem] font-${on ? 'bold' : 'medium'} leading-snug ${
                          on ? 'text-amber' : 'text-cyan/75'
                        }`}
                      >
                        {wk.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* READOUT */}
          <div className="lg:col-span-9">
            <div className="card trace p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
                <div className="sweep h-px w-1/3 bg-gradient-to-r from-transparent via-amber to-transparent" />
              </div>

              <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                  <p className="tag-sm text-amber">{study.domain}</p>

                  <h3 className="mt-4 max-w-[20ch] font-display text-headline font-extrabold uppercase leading-[1.06] track-mid text-cyan text-balance">
                    {study.title}
                  </h3>

                  <p className="mt-4 max-w-[56ch] copy">{study.subtitle}</p>

                  {/* Sits here rather than below, so the column matches the visual's height. */}
                  <div className="mt-6 flex items-start gap-3 rounded-sm border-l-2 border-amber/70 bg-panel/30 p-4">
                    <Target size={17} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber" />
                    <p className="max-w-[62ch] copy-sm">{study.problem}</p>
                  </div>
                </div>

                {/* the mechanism — interactive where the study warrants it */}
                <div className="lg:col-span-5">
                  <div key={study.slug} className="animate-[fadeUp_0.6s_ease-out]">
                    {study.visual === 'solver' ? (
                      <ConstraintLab />
                    ) : (
                      <div className="rounded-sm border border-cyan/15 bg-void/60 p-3">
                        <CaseVisual kind={study.visual} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* metric tiles */}
              <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {study.metrics.map((m) => (
                  <li key={m.label} className="rounded-sm border border-cyan/15 bg-void/50 px-4 py-4">
                    <p className="font-display text-[1.35rem] font-bold leading-none text-amber">
                      {m.value}
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-snug text-dim">{m.label}</p>
                  </li>
                ))}
              </ul>

              {/* facts row */}
              <ul className="mt-6 grid gap-4 border-t border-cyan/10 pt-5 sm:grid-cols-3">
                {[
                  [Building2, study.org],
                  [CalendarDays, study.period],
                  [UserCog, study.role],
                ].map(([Icon, v], k) => {
                  const I = Icon as typeof Building2;
                  return (
                    <li key={k} className="flex items-start gap-2.5">
                      <I size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber/80" />
                      <span className="text-[0.8125rem] leading-snug text-cyan/75">
                        {v as string}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {study.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm bg-panel/60 px-2 py-1 font-mono text-[0.625rem] text-cyan/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => go(-1)} className="btn-ghost" aria-label="Previous system">
                  <ArrowLeft size={15} strokeWidth={2} /> Back
                </button>
                <button type="button" onClick={() => go(1)} className="btn-ghost" aria-label="Next system">
                  Next <ArrowRight size={15} strokeWidth={2} />
                </button>
                <Link to={`/work/${study.slug}`} className="btn-amber">
                  Open case file <ExternalLink size={15} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
