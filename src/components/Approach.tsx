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
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Method<span className="text-amber">]</span>
          </h2>
          <p className="tag-sm text-dim">Six findings · from being wrong measurably</p>
        </div>

        <ul className="mt-4">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="grid gap-x-10 gap-y-3 border-b border-cyan/20 py-8 lg:grid-cols-12"
              data-reveal
              style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
            >
              <h3 className="text-balance font-display text-[1.25rem] font-bold leading-snug text-cyan lg:col-span-5 lg:text-[1.375rem]">
                {p.title}
              </h3>

              <div className="lg:col-span-7">
                <p className="max-w-[68ch] copy">{p.body}</p>

                {p.from && (
                  <Link
                    to={`/work/${p.from.slug}`}
                    className="group mt-4 inline-flex items-baseline gap-2 text-[0.875rem] text-amber"
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
