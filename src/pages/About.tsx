import { Link } from 'react-router-dom';
import { about } from '../data/about';
import { site } from '../data/site';

export default function About() {
  return (
    <>
      <header className="pt-32 sm:pt-40 lg:pt-44">
        <div className="shell">
          <p className="eyebrow" data-reveal>
            About
          </p>
          <h1
            className="mt-8 max-w-[16ch] text-display font-medium text-balance"
            data-reveal
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            {about.headline}
          </h1>
        </div>
      </header>

      <section className="py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal>
            <div className="overflow-hidden border lg:sticky lg:top-28">
              <img
                src={site.portrait}
                alt={`${site.name}, AI Research Engineer`}
                width={720}
                height={900}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <dl className="mt-6 space-y-3 lg:sticky lg:top-[34rem]">
              <div className="flex justify-between gap-4 border-b pb-3">
                <dt className="eyebrow">Based in</dt>
                <dd className="font-mono text-micro uppercase text-muted">Taiwan</dd>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <dt className="eyebrow">Experience</dt>
                <dd className="font-mono text-micro uppercase text-muted">4+ years in AI</dd>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <dt className="eyebrow">Languages</dt>
                <dd className="font-mono text-micro uppercase text-muted">EN · TA · ML</dd>
              </div>
            </dl>
          </div>

          <div className="prose-body max-w-prose lg:col-span-7 lg:col-start-6" data-reveal>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20 sm:py-28">
        <div className="shell">
          <div className="flex items-baseline gap-4" data-reveal>
            <span className="eyebrow">Trajectory</span>
          </div>

          <ol className="mt-12 border-t">
            {about.timeline.map((t) => (
              <li key={t.year + t.role} className="border-b py-9 sm:py-11" data-reveal>
                <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
                  <p className="font-mono text-micro uppercase text-faint lg:col-span-3">
                    {t.year}
                  </p>
                  <div className="lg:col-span-9">
                    <h2 className="text-title font-medium tracking-tight">{t.role}</h2>
                    <p className="mt-2 font-mono text-micro uppercase text-faint">
                      {t.org} · {t.place}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {t.points.map((p, i) => (
                        <li key={i} className="flex max-w-[68ch] gap-4">
                          <span className="mt-2.5 h-px w-4 shrink-0 bg-faint" />
                          <span className="text-[0.9375rem] leading-relaxed text-muted text-pretty">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t py-20 sm:py-28">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-8">
          <p className="eyebrow lg:col-span-3" data-reveal>
            {about.open.heading}
          </p>
          <div className="lg:col-span-9">
            <p className="max-w-[52ch] text-headline font-medium text-balance" data-reveal>
              Let&rsquo;s talk.
            </p>
            <p
              className="mt-7 max-w-prose text-lede text-muted text-pretty"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              {about.open.body}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-10 inline-flex items-baseline gap-5 border-b pb-3"
              data-reveal
            >
              <span className="text-title font-medium tracking-tight">{site.email}</span>
              <span
                aria-hidden
                className="text-lg text-faint transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-ink"
              >
                →
              </span>
            </a>
            <p className="mt-10" data-reveal>
              <Link
                to="/#work"
                className="link-underline font-mono text-micro uppercase text-muted transition-colors hover:text-ink"
              >
                See the work →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
