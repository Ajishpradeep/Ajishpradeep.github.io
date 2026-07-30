import { Link } from 'react-router-dom';
import { about } from '../data/about';
import { site } from '../data/site';
import HudCanvas from '../components/HudCanvas';

export default function About() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-cyan/15 pt-24">
        <div className="grid-veil absolute inset-0" />
        <HudCanvas />

        <div className="shell relative py-16">
          <p className="tag text-amber" data-reveal>
            <span className="bracket">operator profile</span>
          </p>
          <h1
            className="mt-8 max-w-[16ch] font-display text-mega font-extrabold uppercase leading-[1.02] text-cyan glow-cyan text-balance"
            data-reveal
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            {about.headline}
          </h1>
        </div>
      </header>

      <section className="border-b border-cyan/15 py-16">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <div className="hud hud-amber relative overflow-hidden p-2 lg:sticky lg:top-24">
              <img
                src={site.portrait}
                alt={`${site.name}, AI Research Engineer`}
                width={720}
                height={900}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
                style={{ filter: 'saturate(0.55) contrast(1.08)' }}
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-color"
                style={{ background: 'rgb(var(--cyan) / 0.14)' }}
              />
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between bg-void/80 px-3 py-1.5">
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-amber">
                  id · pr
                </span>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">
                  taiwan
                </span>
              </div>
            </div>

            <dl className="mt-5 space-y-2.5">
              {[
                ['based in', 'Taiwan'],
                ['experience', '4+ years in AI'],
                ['languages', 'EN · TA · ML'],
                ['status', 'open to research roles'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-cyan/10 pb-2">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
                    {k}
                  </dt>
                  <dd className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-cyan">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="max-w-[68ch] lg:col-span-7 lg:col-start-6" data-reveal>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[0.9375rem] leading-[1.85] text-cyan/65 text-pretty [&+&]:mt-5"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan/15 py-16">
        <div className="shell">
          <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
            <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
              <span className="text-amber">[·</span>TRAJECTORY<span className="text-amber">·]</span>
            </h2>
          </div>

          <ol className="mt-8">
            {about.timeline.map((t, i) => (
              <li key={t.year + t.role} className="border-b border-cyan/10 py-8" data-reveal>
                <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-amber">
                      ·{String(i + 1).padStart(2, '0')}· {t.year}
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <h3 className="font-display text-title font-bold track-mid text-cyan">
                      {t.role}
                    </h3>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dim">
                      {t.org} · {t.place}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {t.points.map((p, j) => (
                        <li key={j} className="flex max-w-[72ch] gap-3.5">
                          <span className="mt-2.5 h-px w-3 shrink-0 bg-amber/70" />
                          <span className="text-[0.875rem] leading-relaxed text-cyan/60 text-pretty">
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

      <section className="py-16">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
          <p className="tag text-amber lg:col-span-3" data-reveal>
            <span className="bracket">{about.open.heading}</span>
          </p>
          <div className="lg:col-span-9">
            <p className="max-w-[52ch] font-display text-headline font-extrabold uppercase text-cyan text-balance" data-reveal>
              Let&rsquo;s talk.
            </p>
            <p className="mt-6 max-w-[60ch] text-lede text-cyan/65 text-pretty" data-reveal>
              {about.open.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <a href={`mailto:${site.email}`} className="btn-amber">
                {site.email}
              </a>
              <Link to="/#work" className="btn-ghost">
                see the systems <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
