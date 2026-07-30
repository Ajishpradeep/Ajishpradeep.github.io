import { Sigma, ScanEye, Brain, Cpu, Users, Smartphone, Store, Plane } from 'lucide-react';
import { capabilities } from '../data/research';
import { RouteMap } from './Vectors';
import { useSpotlight } from '../hooks/useSpotlight';

const icons = [Sigma, ScanEye, Brain, Cpu, Users];

export default function Capabilities() {
  const spot = useSpotlight();

  return (
    <section
      id="capabilities"
      className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 bg-deep/40 py-20"
    >
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Capabilities<span className="text-amber">]</span>
          </h2>
          <p className="tag-sm text-dim">Maths constant · domain variable</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {/* cards */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {capabilities.map((c, i) => {
              const Icon = icons[i] ?? Sigma;
              return (
                <li
                  key={c.area}
                  className="card spot lift group flex gap-4 p-5"
                  onMouseMove={spot}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
                >
                  <span className="plate transition-colors duration-500 group-hover:border-amber/60">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1rem] font-bold text-cyan">{c.area}</h3>
                    <p className="mt-2 copy-sm">{c.detail}</p>
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {c.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-sm bg-panel/60 px-2 py-1 font-mono text-[0.625rem] tracking-[0.04em] text-cyan/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* where the work has travelled */}
          <div className="lg:col-span-4" data-reveal>
            <div className="card flex h-full flex-col p-6">
              <p className="tag-sm text-amber">Reach</p>
              <RouteMap className="mt-4 w-full" />
              <p className="mt-4 copy-sm">
                Built in Taipei. Shipped to iOS worldwide, deployed across Taiwanese retail, and
                presented in Warsaw at Taiwan Expo Europe 2026.
              </p>

              <ul className="mt-5 space-y-3 border-t border-cyan/10 pt-5">
                {[
                  [Smartphone, 'iOS App Store', 'worldwide'],
                  [Store, 'Retail deployment', '7,000+ sites'],
                  [Plane, 'Taiwan Expo Europe', 'Warsaw, Jun 2026'],
                ].map(([Icon, label, note], k) => {
                  const I = Icon as typeof Smartphone;
                  return (
                    <li key={k} className="flex items-center gap-3">
                      <I size={16} strokeWidth={1.8} className="shrink-0 text-amber/80" />
                      <span className="flex-1 text-[0.8125rem] text-cyan/80">{label as string}</span>
                      <span className="font-mono text-[0.6875rem] text-dim">{note as string}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
