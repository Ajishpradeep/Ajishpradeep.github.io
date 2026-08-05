import { useState } from 'react';
import {
  Trophy,
  Globe2,
  Smartphone,
  Store,
  Plane,
  Plus,
  ExternalLink,
  UserCheck,
  ScrollText,
} from 'lucide-react';
import { impact } from '../data/impact';
import ReachMap from './ReachMap';

/** Keyed by the entry's own `icon` field, not by its position in the list. */
const icons = {
  award: Trophy,
  expo: Globe2,
  app: Smartphone,
  retail: Store,
} as const;

/**
 * Impact dossier: one card per externally-corroborated milestone.
 * Every card carries its own sources — nothing here is self-reported only.
 */
export default function Impact() {
  const [open, setOpen] = useState<string | null>(impact[0]?.id ?? null);

  if (!impact.length) return null;

  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 bg-deep/30 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="impact-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Impact dossier
          </h2>
          <p className="tag-sm text-dim">Externally corroborated · sources attached</p>
        </div>

        <p className="mt-6 max-w-[62ch] copy" data-reveal>
          Work does not count as impact until somebody outside the building says so. Every entry
          links to its public record, and states separately what part of it was mine.
        </p>

        <ul className="mt-10 grid gap-3">
          {impact.map((m, i) => {
            const on = open === m.id;
            const Icon = icons[m.icon];
            return (
              <li
                key={m.id}
                className="card"
                data-reveal
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                {/*
                  The <h3> used to wrap the entire button, and a button's
                  content is flattened into its accessible name — so heading
                  navigation read "title, year, organisation, and the full
                  forty-word claim" as one heading, four times in a row. The
                  heading is the title and the year now; the org and the claim
                  are content beside it, which is what they are.
                */}
                {/*
                  The whole header toggles, not just the plus.

                  The button alone was the title row, so a click on the claim or
                  on "my part" — which is most of the card's surface and all of
                  its prose — did nothing, and the control read as "only the plus
                  sign works". The header div carries the pointer handler; the
                  real <button> stays for keyboard and assistive tech and stops
                  propagation so the two handlers cannot both fire and cancel
                  each other out. Nothing inside this region is a link, so there
                  is no click the toggle can steal.
                */}
                <div
                  onClick={() => setOpen(on ? null : m.id)}
                  className="flex cursor-pointer items-start gap-4 p-5 sm:p-6"
                >
                  <Icon
                    size={26}
                    strokeWidth={1.6}
                    className={`icon-mark mt-1 transition-colors duration-500 ${
                      on ? 'text-amber' : 'text-amber/70'
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(on ? null : m.id);
                        }}
                        aria-expanded={on}
                        aria-controls={`impact-panel-${m.id}`}
                        className="flex min-h-[2.75rem] w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-balance font-display text-lead font-bold leading-snug text-cyan">
                            {m.title}
                          </span>
                          <span className="rounded-sm border border-amber/40 px-1.5 py-0.5 font-mono text-micro text-amber">
                            {m.year}
                          </span>
                        </span>

                        <Plus
                          size={20}
                          strokeWidth={2}
                          aria-hidden
                          className={`shrink-0 text-amber transition-transform duration-500 ${
                            on ? 'rotate-45' : ''
                          }`}
                        />
                      </button>
                    </h3>

                    <p className="mt-1 font-mono text-micro text-dim">{m.org}</p>

                    {/*
                      Claim and "my part" sit side by side from `lg` up.

                      Stacked, each was a ~68ch measure in a card the full width
                      of the shell, so the right third of every card was empty
                      and the pair cost twice the height it needed. Two columns
                      spend the width that was already there, halve the card, and
                      put the milestone and the contribution on one eye-line —
                      which is the comparison the section exists to invite.

                      "My part" is visible while the card is closed, and that is
                      the whole point. It used to sit inside the accordion panel,
                      so the claim was the only prose a scanner ever read — four
                      organisational milestones in a row, on a portfolio, with
                      the contribution reachable only by clicking. The claim/role
                      split was the right instinct implemented backwards: the
                      company took the headline and the author took the footnote.
                    */}
                    <div className="mt-3 grid gap-x-8 gap-y-4 lg:grid-cols-2">
                      <p className="copy-sm max-w-[62ch]">{m.claim}</p>

                      {m.role && (
                        <div className="border-l-2 border-amber/50 pl-4">
                          <p className="tag-sm inline-flex items-center gap-2 text-amber">
                            <UserCheck size={14} strokeWidth={2} /> My part
                          </p>
                          <p className="copy-sm mt-1.5 max-w-[62ch]">{m.role}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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
                          {/*
                            "My part" used to sit here, behind the toggle. It is
                            on the closed card now — see the note beside it —
                            and this column is the corroboration alone, which is
                            the one thing that genuinely belongs behind a
                            disclosure: a reader who wants to check goes looking,
                            a reader who does not is not made to scroll past it.
                          */}
                          <p className="inline-flex items-center gap-2 tag-sm text-amber">
                            <ExternalLink size={14} strokeWidth={2} /> Public record
                          </p>
                          <ul className="mt-3 space-y-2">
                            {m.sources.map((s) => (
                              <li key={s.url}>
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group -mx-2 flex min-h-[2.75rem] items-center gap-2 rounded-sm px-2 py-2 text-fine leading-snug text-cyan/75 transition-colors hover:text-amber"
                                >
                                  <ExternalLink
                                    size={13}
                                    strokeWidth={2}
                                    className="shrink-0 text-amber/70"
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

        {/*
          Reach — the list and the globe, side by side.

          This was once a half-page block: heading, a paragraph restating the
          7,000 stores and the 638 proposals a third time, the list, and the
          globe filling seven columns on its own. Cutting it to a bare row fixed
          the size and lost the one graphic that showed the three milestones are
          a phone, a national retail estate and an exhibition floor rather than
          three versions of one thing.

          Both now occupy the width of a single row: the facts on the left, the
          globe on the right, at a third of its old size. The nodes were office
          cities before — an employer's global-presence slide, which is the part
          that never belonged on a portfolio. They mark where the work was built
          and where it was shown now, and every one of those is a sourced card
          directly above.
        */}
        <div
          className="mt-12 grid items-center gap-x-10 gap-y-8 border-t border-cyan/20 pt-8 lg:grid-cols-12"
          data-reveal
        >
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
            {[
              [Smartphone, 'On consumer phones', 'worldwide, on-device'],
              [Store, 'In national retail', '7,000+ stores'],
              [Plane, 'On an international floor', 'Warsaw, Jun 2026'],
            ].map(([Icon, label, note], k) => {
              const I = Icon as typeof Smartphone;
              return (
                <li key={k} className="flex items-start gap-3">
                  <I size={16} strokeWidth={1.8} className="mt-1 shrink-0 text-amber/80" />
                  <span className="min-w-0">
                    <span className="block text-fine leading-snug text-cyan/80">
                      {label as string}
                    </span>
                    <span className="mt-0.5 block font-mono text-micro text-dim">
                      {note as string}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <ReachMap className="w-full lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}
