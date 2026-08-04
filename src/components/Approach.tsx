import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { principles } from '../data/research';

/**
 * Method.
 *
 * Deliberately not a card grid. Every one of these findings came out of a
 * specific case study, so the section reads as a list of claims with their
 * provenance attached — claim on the left, the evidence and a way to go and
 * check it on the right. That relationship is the argument for reading the
 * case files at all, and it was previously never drawn.
 */
export default function Approach() {
  return (
    <section
      id="method"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-text text-title font-semibold text-cyan/75"
            data-reveal
          >
            Method
          </h2>
          <p className="tag-sm text-dim">Six findings · from being wrong measurably</p>
        </div>

        <ul className="mt-4">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="grid gap-x-10 gap-y-2 border-b border-cyan/20 py-6 lg:grid-cols-12"
              data-reveal
              style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
            >
              <h3 className="text-balance font-display text-lead font-bold leading-snug text-cyan lg:col-span-4">
                {p.title}
              </h3>

              <div className="lg:col-span-8">
                <p className="max-w-[68ch] copy">{p.body}</p>

                {p.from && (
                  <Link
                    to={`/work/${p.from.slug}`}
                    className="group -mx-1 mt-3 inline-flex min-h-[2.25rem] items-center gap-2 rounded-sm px-1 text-fine text-amber"
                  >
                    <span className="underline decoration-amber/40 underline-offset-4 transition-colors group-hover:decoration-amber">
                      Where this came from: {p.from.section}
                    </span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 translate-y-0.5 transition-transform duration-300 group-hover:-translate-y-0 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
