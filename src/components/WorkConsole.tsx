import { useCallback, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  UserCog,
  Target,
} from 'lucide-react';
import { work } from '../data/work';
import CaseVisual from './CaseVisual';
import ConstraintLab from './ConstraintLab';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Rail index on the left, case-file readout on the right.
 *
 * Which case is open lives in the URL rather than in component state, so a
 * hiring manager can send a colleague "look at 03" instead of "scroll down and
 * click the fourth thing".
 */
export default function WorkConsole() {
  const [params, setParams] = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const fromUrl = work.findIndex((w) => w.slug === params.get('case'));
  const i = fromUrl === -1 ? 0 : fromUrl;
  const study = work[i];

  const open = useCallback(
    (index: number, keepInView = false) => {
      const next = new URLSearchParams(params);
      next.set('case', work[index].slug);
      // replace, not push: stepping through cases should not fill the back button.
      setParams(next, { replace: true, preventScrollReset: true });
      if (keepInView) {
        const card = cardRef.current;
        if (card && card.getBoundingClientRect().top < 0) {
          card.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
        }
      }
    },
    [params, setParams, still],
  );

  const step = (d: number) => open((i + d + work.length) % work.length, true);

  // Keep the announced position in sync for anyone not watching the card change.
  const liveRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Case ${study.index} of ${work.length}: ${study.title}`;
    }
  }, [study]);

  return (
    <section
      id="work"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-20"
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

          {/*
            The stepper lives with the counter, at the top of the card it
            controls. It used to sit at the foot of a 1,700px card, so pressing
            Next changed content far above the thumb.
          */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-cyan/40 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              <span className="sr-only">Previous case</span>
            </button>
            <p className="tag-sm w-16 text-center text-dim">
              {study.index} / {String(work.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-cyan/40 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <ArrowRight size={15} strokeWidth={2} />
              <span className="sr-only">Next case</span>
            </button>
          </div>
        </div>

        <p ref={liveRef} aria-live="polite" className="sr-only" />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* RAIL — a tablist, not navigation: these switch a panel in place. */}
          <div className="lg:col-span-3">
            <p className="tag-sm text-dim">Index</p>
            <ul
              role="tablist"
              aria-label="Case studies"
              aria-orientation="vertical"
              className="mt-4 space-y-1.5"
            >
              {work.map((wk, idx) => {
                const on = idx === i;
                return (
                  <li key={wk.slug} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`case-tab-${wk.slug}`}
                      aria-selected={on}
                      aria-controls="case-readout"
                      onClick={() => open(idx)}
                      className={`flex w-full items-start gap-3 rounded-sm p-3 text-left transition-all duration-300 ${
                        on
                          ? 'border border-amber/45 bg-amber/10'
                          : 'border border-transparent hover:bg-panel/40'
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-mono text-[0.6875rem] ${on ? 'text-amber' : 'text-dim'}`}
                      >
                        {wk.index}
                      </span>
                      <span
                        className={`font-display text-[0.9375rem] leading-snug ${
                          on ? 'font-bold text-amber' : 'font-medium text-cyan/75'
                        }`}
                      >
                        {wk.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* READOUT */}
          <div className="lg:col-span-9">
            <div
              ref={cardRef}
              id="case-readout"
              role="tabpanel"
              aria-labelledby={`case-tab-${study.slug}`}
              className="card trace p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
                <div className="sweep h-px w-1/3 bg-gradient-to-r from-transparent via-amber to-transparent" />
              </div>

              <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                  <p className="tag-sm text-amber">{study.domain}</p>

                  <h3 className="mt-4 max-w-[20ch] text-balance font-display text-headline font-extrabold uppercase leading-[1.06] track-mid text-cyan">
                    {study.title}
                  </h3>

                  <p className="mt-4 max-w-[56ch] copy">{study.subtitle}</p>

                  {/* The constraint that made it hard. Sits here rather than
                      below, so the column matches the visual's height. */}
                  <div className="mt-6 flex items-start gap-3 rounded-sm bg-panel/40 p-4">
                    <span className="plate h-9 w-9">
                      <Target size={17} strokeWidth={1.8} />
                    </span>
                    <p className="max-w-[62ch] copy-sm">{study.problem}</p>
                  </div>
                </div>

                {/* the mechanism — interactive where the study warrants it */}
                <div className="lg:col-span-5">
                  <div key={study.slug} className="animate-[fadeUp_0.6s_ease-out]">
                    {study.visual === 'solver' ? (
                      <ConstraintLab />
                    ) : (
                      <div className="rounded-sm border border-cyan/25 bg-void/60 p-3">
                        <CaseVisual kind={study.visual} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* metric tiles */}
              <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {study.metrics.map((m) => (
                  <li key={m.label} className="rounded-sm border border-cyan/25 bg-void/50 px-4 py-4">
                    <p className="font-display text-[1.35rem] font-bold leading-none text-amber">
                      {m.value}
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-snug text-dim">{m.label}</p>
                  </li>
                ))}
              </ul>

              {/* facts row */}
              <ul className="mt-6 grid gap-4 border-t border-cyan/20 pt-5 sm:grid-cols-3">
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
                    className="rounded-sm bg-panel/60 px-2 py-1 font-mono text-[0.6875rem] text-cyan/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/*
                The way into the actual writing. This is the most important link
                on the site for the audience it exists to reach, and it used to
                be the third button in a row of three, labelled in house jargon.
                It now gets its own band, says what is behind it, and shows the
                argument before you commit to reading it.
              */}
              <Link
                to={`/work/${study.slug}`}
                className="group mt-8 block rounded-sm border border-amber/50 bg-amber/10 p-5 transition-colors duration-300 hover:border-amber hover:bg-amber/20 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-[1.0625rem] font-bold text-amber">
                    Read the full study — {study.sections.length} sections
                  </p>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={2}
                    className="text-amber transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {study.sections.map((s, k) => (
                    <li key={s.heading} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[0.6875rem] text-amber/80">
                        {String(k + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.875rem] leading-snug text-cyan/85">{s.heading}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
