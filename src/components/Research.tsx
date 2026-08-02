import { Award, Trophy, Globe2, ArrowUpRight } from 'lucide-react';
import { recognition, research } from '../data/research';

const statusStyle: Record<string, string> = {
  published: 'border-cyan/50 text-cyan',
  presented: 'border-amber/60 text-amber',
  'in-progress': 'border-dim/60 text-dim',
};

const statusLabel: Record<string, string> = {
  published: 'Published',
  presented: 'Presented',
  'in-progress': 'In progress',
};

const recIcon = [Award, Trophy, Globe2];

/**
 * Research log.
 *
 * A dated log with a year gutter, not a card grid: this is a record over time
 * and the chronology is the information. It sits above the Lab section now —
 * peer-reviewed and conference work outranking weekend repositories was the
 * order a research reader expects, and the page previously had it backwards.
 */
export default function Research() {
  return (
    <section
      id="research"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Research log<span className="text-amber">]</span>
          </h2>
          <p className="tag-sm text-dim">Work that left the building</p>
        </div>

        <ol className="mt-4">
          {research.map((r, i) => {
            const body = (
              <>
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h3 className="max-w-[52ch] text-balance font-display text-[1.125rem] font-bold leading-snug text-cyan">
                    {r.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[0.6875rem] ${statusStyle[r.status]}`}
                  >
                    {statusLabel[r.status]}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[0.6875rem] text-dim">{r.venue}</p>
                <p className="mt-3 max-w-[70ch] copy-sm">{r.summary}</p>
              </>
            );

            return (
              <li
                key={r.title}
                className="grid gap-x-8 gap-y-2 border-b border-cyan/20 py-7 sm:grid-cols-12"
                data-reveal
                style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
              >
                <p className="font-mono text-[0.875rem] tabular-nums text-amber sm:col-span-2">
                  {r.year}
                </p>
                <div className="sm:col-span-10">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noreferrer" className="group block">
                      {body}
                      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-amber underline decoration-amber/40 underline-offset-4 group-hover:decoration-amber">
                        Open repository <ArrowUpRight size={13} strokeWidth={2} />
                      </span>
                    </a>
                  ) : (
                    body
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12" data-reveal>
          <p className="tag-sm text-amber">Recognition</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {recognition.map((r, i) => {
              const Icon = recIcon[i] ?? Award;
              return (
                <li key={r.title} className="flex gap-3.5">
                  <span className="plate h-9 w-9">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[0.9375rem] font-bold text-cyan">
                        {r.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[0.6875rem] text-amber">
                        {r.year}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-cyan/75">
                      {r.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
