import { Leaf, Music4, FileStack, CreditCard, Waypoints, Radio, Github, ArrowUpRight } from 'lucide-react';
import { lab } from '../data/lab';
import { site } from '../data/site';

const icons = [Leaf, Music4, FileStack, CreditCard, Waypoints, Radio];

export default function Lab() {
  if (!lab.length) return null;
  const ghost = site.links.find((l) => l.label === 'GitHub')?.href;

  return (
    <section id="lab" className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20">
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>The lab<span className="text-amber">]</span>
          </h2>
          <p className="inline-flex items-center gap-1.5 tag-sm text-dim">
            <Github size={13} strokeWidth={2} /> Personal builds
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lab.map((p, i) => {
            const Icon = icons[i] ?? Waypoints;
            return (
              <li
                key={p.name}
                data-reveal
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card group flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="plate transition-colors duration-500 group-hover:border-amber/60">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <ArrowUpRight
                      size={17}
                      strokeWidth={2}
                      className="text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                    />
                  </div>

                  <h3 className="mt-5 font-display text-[1.0625rem] font-bold text-cyan group-hover:text-amber">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 flex-1 copy-sm">{p.description}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-cyan/10 pt-4">
                    {p.language && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] text-cyan/70">
                        <span className="h-2 w-2 rounded-full bg-amber" />
                        {p.language}
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[0.625rem] text-dim">{p.year}</span>
                  </div>
                </a>
              </li>
            );
          })}
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
