import { Github, ArrowUpRight } from 'lucide-react';
import { lab } from '../data/lab';
import { site } from '../data/site';

/**
 * The lab.
 *
 * Each card used to open with an icon picked by array position — a leaf for
 * CarbonPass, a music note for Magic Shuffle, a credit card for CardPilot.
 * Literal noun-illustration, silently reassigned the moment a project was
 * added, and it made six cards of icon-plus-heading-plus-text: the most
 * interchangeable structure a page can have.
 *
 * Every project already carried a `tags` list naming what it is actually built
 * from, and nothing rendered it. That is the information a reader scanning
 * these wants, and it distinguishes the cards from each other, which is the
 * one thing an icon in this position never did.
 */
export default function Lab() {
  if (!lab.length) return null;
  const ghost = site.links.find((l) => l.label === 'GitHub')?.href;

  return (
    <section
      id="lab"
      aria-labelledby="lab-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="lab-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            The lab
          </h2>
          <p className="inline-flex items-center gap-1.5 tag-sm text-dim">
            <Github size={13} strokeWidth={2} /> Personal builds
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lab.map((p, i) => (
            <li
              key={p.name}
              data-reveal
              style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
            >
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="card lift group flex h-full flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lead font-bold leading-snug text-cyan group-hover:text-amber">
                    {p.name}
                  </h3>
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="mt-1 shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                  />
                </div>

                <p className="copy-sm mt-3 flex-1">{p.description}</p>

                <ul className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-micro text-cyan/70">
                  {p.tags.map((t, k) => (
                    <li key={t} className="flex items-center gap-2">
                      {k > 0 && <span className="text-cyan/30">·</span>}
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-cyan/20 pt-4">
                  {p.language && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-micro text-cyan/70">
                      <span className="h-2 w-2 rounded-full bg-amber" />
                      {p.language}
                    </span>
                  )}
                  <span className="ml-auto font-mono text-micro text-dim">{p.year}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {ghost && (
          <div className="mt-8" data-reveal>
            <a href={ghost} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github size={15} strokeWidth={2} /> All repositories
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
