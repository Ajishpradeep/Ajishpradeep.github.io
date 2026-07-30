import { Link } from 'react-router-dom';
import { marquee, site } from '../data/site';

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-48">
      <div className="shell">
        <div className="flex items-center gap-4" data-reveal>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="eyebrow">{site.role} · {site.location}</p>
        </div>

        <h1
          className="mt-8 max-w-[19ch] text-display font-medium text-balance"
          data-reveal
          style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
        >
          Research that has
          <br />
          to survive{' '}
          <span className="font-serif font-normal italic tracking-[-0.02em]">production</span>.
        </h1>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <p
            className="max-w-prose text-lede text-muted text-pretty lg:col-span-6 lg:col-start-1"
            data-reveal
            style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
          >
            {site.intro}
          </p>

          <div
            className="flex flex-wrap items-start gap-x-8 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            <Link
              to="/#work"
              className="link-underline font-mono text-micro uppercase text-ink"
            >
              Selected work
            </Link>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-micro uppercase text-muted transition-colors hover:text-ink"
            >
              Résumé (PDF)
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-mono text-micro uppercase text-muted transition-colors hover:text-ink"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Headline numbers — each traceable to a shipped system. */}
      <div className="mt-20 border-y sm:mt-28" data-reveal>
        <div className="shell">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {marquee.map((m) => (
              <li
                key={m.value}
                className="border-b border-r py-6 pr-6 [&:nth-child(2n)]:border-r-0 md:border-b-0 md:py-8 md:border-r md:[&:nth-child(2n)]:border-r md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:last:border-r-0"
              >
                <p className="font-mono text-[1.35rem] tracking-tight text-ink sm:text-[1.5rem]">
                  {m.value}
                </p>
                <p className="mt-2 max-w-[22ch] text-[0.8125rem] leading-snug text-faint">
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
