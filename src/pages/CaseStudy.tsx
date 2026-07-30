import { Link, useParams } from 'react-router-dom';
import { byslug, work } from '../data/work';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const study = slug ? byslug(slug) : undefined;

  if (!study) return <NotFound />;

  const position = work.findIndex((w) => w.slug === study.slug);
  const next = work[(position + 1) % work.length];

  return (
    <article>
      {/* Masthead */}
      <header className="pt-32 sm:pt-40 lg:pt-44">
        <div className="shell">
          <Link
            to="/#work"
            className="link-underline font-mono text-micro uppercase text-muted transition-colors hover:text-ink"
            data-reveal
          >
            ← All work
          </Link>

          <div className="mt-12 flex items-baseline gap-4" data-reveal>
            <span className="font-mono text-micro text-faint">{study.index}</span>
            <span className="eyebrow">{study.domain}</span>
          </div>

          <h1
            className="mt-6 max-w-[17ch] text-headline font-medium text-balance"
            data-reveal
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            {study.title}
          </h1>

          <p
            className="mt-8 max-w-[58ch] text-lede text-muted text-pretty"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            {study.subtitle}
          </p>
        </div>
      </header>

      {/* Facts */}
      <div className="mt-16 border-y sm:mt-20" data-reveal>
        <div className="shell grid gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="eyebrow">Organisation</p>
            <p className="mt-3 text-[0.9375rem]">{study.org}</p>
          </div>
          <div>
            <p className="eyebrow">Period</p>
            <p className="mt-3 text-[0.9375rem]">{study.period}</p>
          </div>
          <div>
            <p className="eyebrow">Role</p>
            <p className="mt-3 text-[0.9375rem] text-pretty">{study.role}</p>
          </div>
          <div>
            <p className="eyebrow">Stack</p>
            <p className="mt-3 text-[0.9375rem] text-pretty">{study.stack.join(' · ')}</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="border-b" data-reveal>
        <div className="shell">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {study.metrics.map((m) => (
              <li
                key={m.label}
                className="border-b py-8 pr-6 last:border-b-0 sm:border-r sm:py-10 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0"
              >
                <p className="font-mono text-[1.5rem] tracking-tight sm:text-[1.75rem]">
                  {m.value}
                </p>
                <p className="mt-2.5 max-w-[24ch] text-[0.8125rem] leading-snug text-faint">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The constraint */}
      <section className="py-20 sm:py-28">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-8">
          <p className="eyebrow lg:col-span-3" data-reveal>
            The constraint
          </p>
          <p
            className="max-w-[54ch] font-serif text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.35] tracking-[-0.015em] text-ink text-pretty lg:col-span-9"
            data-reveal
          >
            {study.problem}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="border-t">
        {study.sections.map((s, i) => (
          <section key={s.heading} className="border-b py-16 sm:py-20">
            <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3" data-reveal>
                <span className="font-mono text-micro text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 max-w-[24ch] text-[1.125rem] font-medium leading-snug tracking-tight text-balance lg:sticky lg:top-28">
                  {s.heading}
                </h2>
              </div>
              <div className="prose-body max-w-prose lg:col-span-8 lg:col-start-5" data-reveal>
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Outcome */}
      <section className="py-20 sm:py-28">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-8">
          <p className="eyebrow lg:col-span-3" data-reveal>
            Outcome
          </p>
          <ul className="lg:col-span-8 lg:col-start-5">
            {study.outcome.map((o, i) => (
              <li
                key={i}
                className="flex gap-5 border-b py-5 first:border-t"
                data-reveal
                style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-[1rem] leading-relaxed text-ink text-pretty">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next */}
      <Link to={`/work/${next.slug}`} className="group block border-t transition-colors duration-500 hover:bg-surface">
        <div className="shell grid gap-4 py-14 lg:grid-cols-12 lg:items-baseline lg:gap-8">
          <p className="eyebrow lg:col-span-3">Next case study</p>
          <div className="lg:col-span-9">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="max-w-[20ch] text-title font-medium tracking-tight text-balance">
                {next.title}
              </h2>
              <span
                aria-hidden
                className="shrink-0 text-xl text-faint transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:text-ink"
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
