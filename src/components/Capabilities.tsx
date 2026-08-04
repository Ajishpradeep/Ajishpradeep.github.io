import { capabilities } from '../data/research';

/**
 * Capabilities.
 *
 * A matrix rather than cards: five areas down the left, what each one actually
 * contains across from it. This is reference material — someone scanning for
 * their own vocabulary wants rows they can run an eye down, not five boxes of
 * equal weight competing for attention.
 */
export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 bg-deep/40 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-text text-title font-semibold text-cyan/75"
            data-reveal
          >
            Capabilities
          </h2>
          <p className="tag-sm text-dim">Maths constant · domain variable</p>
        </div>

        <dl className="mt-4">
          {capabilities.map((c, i) => (
            <div
              key={c.area}
              className="grid gap-x-10 gap-y-2 border-b border-cyan/20 py-6 lg:grid-cols-12"
              data-reveal
              style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
            >
              <dt className="font-display text-lead font-bold leading-snug text-amber lg:col-span-3">
                {c.area}
              </dt>
              <dd className="lg:col-span-9">
                <p className="max-w-[76ch] copy-sm">{c.detail}</p>
                <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-fine tracking-[0.04em] text-cyan/70">
                  {c.items.map((item, k) => (
                    <li key={item} className="flex items-center gap-2">
                      {k > 0 && <span className="text-cyan/30">·</span>}
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
