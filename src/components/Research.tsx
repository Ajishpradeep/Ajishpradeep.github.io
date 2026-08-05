import { ArrowUpRight } from 'lucide-react';
import { research } from '../data/research';

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
      aria-labelledby="research-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="research-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Research log
          </h2>
          <p className="tag-sm text-dim">Work that left the building</p>
        </div>

        <ol className="mt-4">
          {research.map((r, i) => {
            const body = (
              <>
                <h3 className="max-w-[46ch] text-balance font-display text-lead font-bold leading-snug text-cyan">
                  {r.title}
                </h3>
                <p className="copy-sm mt-2.5 max-w-[62ch]">{r.summary}</p>
              </>
            );

            return (
              <li
                key={r.title}
                className="grid gap-x-8 gap-y-3 border-b border-cyan/20 py-7 sm:grid-cols-12"
                data-reveal
                style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
              >
                {/*
                  A 4-character year had a 197px gutter, the body stopped at its
                  measure ~400px short of the row's right edge, and the only
                  thing out there was a floating status chip. The year gutter is
                  one column now, and the venue joins the status in a metadata
                  column — so the right of the row carries information instead
                  of a chip and a void.
                */}
                <p className="font-mono text-fine tabular-nums text-amber sm:col-span-1">
                  {r.year}
                </p>

                <div className="sm:col-span-8">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noreferrer" className="group block">
                      {body}
                      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-fine text-amber underline decoration-amber/40 underline-offset-4 group-hover:decoration-amber">
                        Open repository <ArrowUpRight size={13} strokeWidth={2} />
                      </span>
                    </a>
                  ) : (
                    body
                  )}
                </div>

                <div className="flex flex-wrap items-start gap-x-3 gap-y-2 sm:col-span-3 sm:flex-col sm:items-end sm:text-right">
                  <span
                    className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-micro ${statusStyle[r.status]}`}
                  >
                    {statusLabel[r.status]}
                  </span>
                  <p className="font-mono text-micro leading-snug text-dim">{r.venue}</p>
                </div>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}
