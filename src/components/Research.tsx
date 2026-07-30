import { Award, FileText, FlaskConical, Trophy, Globe2, Presentation, ArrowUpRight } from 'lucide-react';
import { recognition, research } from '../data/research';

const statusStyle: Record<string, string> = {
  published: 'border-cyan/35 text-cyan',
  presented: 'border-amber/50 text-amber',
  'in-progress': 'border-dim/40 text-dim',
};

const statusLabel: Record<string, string> = {
  published: 'Published',
  presented: 'Presented',
  'in-progress': 'In progress',
};

const statusIcon = {
  published: FileText,
  presented: Presentation,
  'in-progress': FlaskConical,
} as const;

const recIcon = [Award, Trophy, Globe2];

export default function Research() {
  return (
    <section
      id="research"
      className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20"
    >
      <div className="grid-veil absolute inset-0 opacity-50" />

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

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <ul className="grid gap-3 lg:col-span-8">
            {research.map((r, i) => {
              const Icon = statusIcon[r.status];
              const inner = (
                <>
                  <div className="flex items-start gap-4">
                    <span className="plate transition-colors duration-500 group-hover:border-amber/60">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <h3 className="max-w-[46ch] font-display text-[1rem] font-bold leading-snug text-cyan">
                          {r.title}
                        </h3>
                        <span
                          className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[0.625rem] ${statusStyle[r.status]}`}
                        >
                          {statusLabel[r.status]}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[0.6875rem] text-dim">
                        {r.venue} · {r.year}
                      </p>
                      <p className="mt-3 max-w-[64ch] copy-sm">{r.summary}</p>
                    </div>
                  </div>
                </>
              );

              return (
                <li
                  key={r.title}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
                >
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="card group block p-5"
                    >
                      {inner}
                      <span className="mt-3 inline-flex items-center gap-1.5 pl-[3.75rem] font-mono text-[0.6875rem] text-amber">
                        Open repository <ArrowUpRight size={13} strokeWidth={2} />
                      </span>
                    </a>
                  ) : (
                    <div className="card p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-4" data-reveal>
            <div className="card h-full p-6">
              <p className="tag-sm text-amber">Recognition</p>
              <ul className="mt-5 space-y-5">
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
                          <span className="shrink-0 font-mono text-[0.625rem] text-amber">
                            {r.year}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-cyan/70">
                          {r.detail}
                        </p>
                      </div>
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
