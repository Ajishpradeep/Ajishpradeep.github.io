import { useState } from 'react';
import { Trophy, Globe2, Smartphone, Store, Plus, ExternalLink, UserCheck, ScrollText } from 'lucide-react';
import { impact } from '../data/impact';

const icons = [Trophy, Globe2, Smartphone, Store];

/**
 * Impact dossier: one card per externally-corroborated milestone.
 * Every card carries its own sources — nothing here is self-reported only.
 */
export default function Impact() {
  const [open, setOpen] = useState<string | null>(impact[0]?.id ?? null);

  if (!impact.length) return null;

  return (
    <section id="impact" className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 bg-deep/30 py-20">

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Impact dossier<span className="text-amber">]</span>
          </h2>
          <p className="tag-sm text-dim">Externally corroborated · sources attached</p>
        </div>

        <p className="mt-6 max-w-[60ch] copy" data-reveal>
          Work does not count as impact until somebody outside the building says so. Every entry
          links to its public record.
        </p>

        <ul className="mt-10 grid gap-3">
          {impact.map((m, i) => {
            const on = open === m.id;
            const Icon = icons[i] ?? Trophy;
            return (
              <li
                key={m.id}
                className="card trace"
                data-reveal
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : m.id)}
                    aria-expanded={on}
                    aria-controls={`impact-panel-${m.id}`}
                    className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                  >
                  <span
                    className={`plate-lg transition-colors duration-500 ${
                      on ? 'border-amber/60 bg-amber/10' : ''
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.6} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-[1.0625rem] font-bold leading-snug text-cyan text-balance">
                        {m.title}
                      </span>
                      <span className="rounded-sm border border-amber/40 px-1.5 py-0.5 font-mono text-[0.6875rem] text-amber">
                        {m.year}
                      </span>
                    </span>
                    <span className="mt-1.5 block font-mono text-[0.6875rem] text-dim">
                      {m.org}
                    </span>
                    <span className="mt-3 block max-w-[70ch] copy-sm">{m.claim}</span>
                  </span>

                  <Plus
                    size={20}
                    strokeWidth={2}
                    aria-hidden
                    className={`mt-1 shrink-0 text-amber transition-transform duration-500 ${
                      on ? 'rotate-45' : ''
                    }`}
                  />
                  </button>
                </h3>

                {/*
                  `inert` matters here: the collapsed panel is laid out at zero
                  height rather than display:none, so without it the two or three
                  source links inside every closed card stayed in the tab order,
                  reachable but invisible.
                */}
                <div
                  id={`impact-panel-${m.id}`}
                  inert={!on ? '' : undefined}
                  className={`grid transition-all duration-500 ease-out ${
                    on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-cyan/20 p-5 sm:p-6">
                      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-7">
                          <p className="inline-flex items-center gap-2 tag-sm text-amber">
                            <ScrollText size={14} strokeWidth={2} /> Context
                          </p>
                          {m.detail.map((d, j) => (
                            <p key={j} className="mt-3 max-w-[62ch] copy-sm">
                              {d}
                            </p>
                          ))}
                        </div>

                        <div className="lg:col-span-5">
                          {m.role && (
                            <div className="rounded-sm border border-cyan/30 bg-panel/30 p-4">
                              <p className="inline-flex items-center gap-2 tag-sm text-amber">
                                <UserCheck size={14} strokeWidth={2} /> My part
                              </p>
                              <p className="mt-2.5 copy-sm">{m.role}</p>
                            </div>
                          )}

                          <p className="mt-5 inline-flex items-center gap-2 tag-sm text-amber">
                            <ExternalLink size={14} strokeWidth={2} /> Public record
                          </p>
                          <ul className="mt-3 space-y-2">
                            {m.sources.map((s) => (
                              <li key={s.url}>
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group -mx-1 flex items-start gap-2 rounded-sm px-1 py-1.5 text-[0.8125rem] leading-snug text-cyan/75 transition-colors hover:text-amber"
                                >
                                  <ExternalLink
                                    size={13}
                                    strokeWidth={2}
                                    className="mt-1 shrink-0 text-amber/70"
                                  />
                                  <span className="underline decoration-cyan/40 underline-offset-4 group-hover:decoration-amber">
                                    {s.label}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
