import { Link, useParams } from 'react-router-dom';
import { byslug, work } from '../data/work';
import HudCanvas from '../components/HudCanvas';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const study = slug ? byslug(slug) : undefined;

  if (!study) return <NotFound />;

  const pos = work.findIndex((w) => w.slug === study.slug);
  const prev = work[(pos - 1 + work.length) % work.length];
  const next = work[(pos + 1) % work.length];

  return (
    <article>
      {/* MASTHEAD */}
      <header className="relative overflow-hidden border-b border-cyan/15 pt-[5.5rem]">
        <div className="grid-veil absolute inset-0" />
        <HudCanvas />

        <div className="shell relative py-14">
          <Link
            to={`/?case=${study.slug}#work`}
            className="tag -mx-2 inline-block rounded-sm px-2 py-1.5 text-amber transition-opacity hover:opacity-70"
          >
            <span className="bracket">← index</span>
          </Link>

          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
            <p className="tag text-dim">
              <span className="bracket">{study.domain}</span>
            </p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-amber">
              case {study.index} / {String(work.length).padStart(2, '0')} · {study.slug}
            </p>
          </div>

          <h1
            className="mt-6 max-w-[18ch] font-display text-mega font-extrabold uppercase leading-[1.02] text-cyan glow-cyan text-balance"
            data-reveal
          >
            {study.title}
          </h1>

          <p
            className="mt-8 max-w-[68ch] text-lede text-cyan/70 text-pretty"
            data-reveal
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          >
            {study.subtitle}
          </p>
        </div>
      </header>

      {/* SPEC STRIP */}
      <div className="border-b border-cyan/15 bg-deep/50">
        <div className="shell grid gap-y-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[
            ['organisation', study.org],
            ['period', study.period],
            ['role', study.role],
            ['stack', study.stack.join(' · ')],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="tag text-amber/80">
                <span className="bracket">{k}</span>
              </p>
              <p className="mt-3 max-w-[34ch] text-[0.8125rem] leading-relaxed text-cyan/75 text-pretty">
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TELEMETRY */}
      <div className="border-b border-cyan/15">
        <div className="shell">
          <div className="overflow-hidden">
          <ul className="-mb-px -mr-px grid sm:grid-cols-2 lg:grid-cols-4">
            {study.metrics.map((m, i) => (
              <li
                key={m.label}
                className="border-b border-r border-cyan/20 py-7 pl-5 pr-5 first:pl-0"
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
                  ·{String(i + 1).padStart(2, '0')}·
                </p>
                <p className="mt-2.5 font-display text-[1.75rem] font-bold track-mid text-amber glow-amber">
                  {m.value}
                </p>
                <p className="mt-2 max-w-[26ch] font-mono text-[0.6875rem] leading-snug text-dim">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>

      {/* CONSTRAINT */}
      <section className="border-b border-cyan/15 bg-panel/20 py-16">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p className="tag text-amber lg:col-span-3" data-reveal>
            <span className="bracket">the constraint</span>
          </p>
          <p
            className="max-w-[62ch] font-display text-[clamp(1.125rem,2.1vw,1.6rem)] font-medium leading-[1.5] text-cyan text-pretty lg:col-span-9"
            data-reveal
          >
            {study.problem}
          </p>
        </div>
      </section>

      {/* LOG ENTRIES */}
      {study.sections.map((s, i) => (
        <section key={s.heading} className="border-b border-cyan/20 py-14">
          <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3" data-reveal>
              <span className="font-mono text-[0.6875rem] text-amber">
                ·{String(i + 1).padStart(2, '0')}·
              </span>
              <h2 className="mt-3 max-w-[26ch] font-display text-[1.0625rem] font-bold leading-snug text-cyan lg:sticky lg:top-28 text-balance">
                {s.heading}
              </h2>
            </div>
            <div className="max-w-[68ch] lg:col-span-8 lg:col-start-5" data-reveal>
              {s.body.map((p, j) => (
                <p
                  key={j}
                  className="text-[0.9375rem] leading-[1.85] text-cyan/65 text-pretty [&+&]:mt-5"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* OUTCOME */}
      <section className="border-b border-cyan/15 py-16">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p className="tag text-amber lg:col-span-3" data-reveal>
            <span className="bracket">outcome</span>
          </p>
          <ul className="lg:col-span-8 lg:col-start-5">
            {study.outcome.map((o, i) => (
              <li
                key={i}
                className="flex gap-4 border-b border-cyan/20 py-4"
                data-reveal
                style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-amber" />
                <span className="text-[0.9375rem] leading-relaxed text-cyan/80 text-pretty">
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STEPPER */}
      <nav className="shell flex flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <Link to={`/work/${prev.slug}`} className="btn-ghost">
          <span aria-hidden>←</span> {prev.index} · back
        </Link>
        <Link
          to={`/?case=${study.slug}#work`}
          className="tag rounded-sm px-2 py-1.5 text-dim transition-colors hover:text-amber"
        >
          <span className="bracket">index</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="btn-amber">
          {next.index} · next <span aria-hidden>→</span>
        </Link>
      </nav>
    </article>
  );
}
