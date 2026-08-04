import { Smartphone, Store, Plane } from 'lucide-react';
import { capabilities } from '../data/research';
import { RouteMap } from './Vectors';

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

        {/* Where the work has travelled. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center" data-reveal>
          <div className="lg:col-span-5">
            <p className="tag-sm text-amber">Reach</p>
            <p className="mt-4 max-w-[52ch] copy">
              Built in Taipei. Shipped to iOS worldwide, deployed across Taiwanese retail, and
              presented in Warsaw at Taiwan Expo Europe 2026.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                [Smartphone, 'iOS App Store', 'worldwide'],
                [Store, 'Retail deployment', '7,000+ sites'],
                [Plane, 'Taiwan Expo Europe', 'Warsaw, Jun 2026'],
              ].map(([Icon, label, note], k) => {
                const I = Icon as typeof Smartphone;
                return (
                  <li key={k} className="flex items-center gap-3">
                    <I size={16} strokeWidth={1.8} className="shrink-0 text-amber/80" />
                    <span className="flex-1 text-fine text-cyan/80">{label as string}</span>
                    <span className="font-mono text-micro text-dim">{note as string}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <RouteMap className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
