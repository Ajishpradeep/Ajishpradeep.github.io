import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { domains, nodes, edges, skillsOf } from './capabilityGraphData';

const CapabilityGraphScene = lazy(() => import('./CapabilityGraphScene'));

/** How long a click holds the graph's attention before it lets go on its own. */
const FOCUS_MS = 4500;

export default function CapabilityGraph() {
  const [active, setActive] = useState(0);
  /** Set for a few seconds after a domain is pressed, then clears itself. */
  const [opened, setOpened] = useState<string | null>(null);
  /** The live pointer: which skill in the list below is being pointed at. */
  const [pointing, setPointing] = useState<string | null>(null);

  const still = useReducedMotion();
  const current = domains[active];
  const currentSkills = useMemo(() => skillsOf(current.key), [current.key]);

  const open = useCallback((i: number) => {
    setActive(i);
    setOpened(domains[i].key);
  }, []);

  const preview = useCallback((i: number) => {
    setOpened((o) => {
      if (!o) setActive(i);
      return o;
    });
  }, []);

  /*
    THE LIT SET. The domain being read, the core, and everything wired to it —
    including, for the four that carry, the domain on the far side. That second
    domain comes only part of the way forward: it is not what is being read, but
    the whole point of the graph is that it is attached.
  */
  const { lit, halfLit } = useMemo(() => {
    const l = new Set<string>(['core', current.key]);
    const h = new Set<string>();
    skillsOf(current.key).forEach((s) => {
      l.add(s.name);
      s.domains.filter((d) => d !== current.key).forEach((d) => h.add(d));
    });
    return { lit: l, halfLit: h };
  }, [current.key]);

  /*
    A click holds the graph's attention for a few seconds and then lets go on
    its own — there is no control that leaves it stopped indefinitely.
    Reduced motion is the one thing that still holds it: once nothing on the
    page moves on its own, a timer that changes what's on screen a few
    seconds later would fight that setting rather than respect it.
  */
  useEffect(() => {
    if (!opened || still) return;
    const id = window.setTimeout(() => setOpened(null), FOCUS_MS);
    return () => window.clearTimeout(id);
  }, [opened, still]);

  /*
    The graph turns through the four domains on its own, always — there is no
    pause control. It holds on the one just opened until that focus lets go
    of its own accord, and holds while a skill is being pointed at, since a
    list that changes under the finger tracing it is worse than no list.
  */
  useEffect(() => {
    if (still || opened || pointing) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % domains.length), 4200);
    return () => window.clearInterval(id);
  }, [still, opened, pointing]);

  return (
    /*
      `h-full flex-col`: Hero's grid has no `items-*` override, so its
      default (`stretch`) gives this column a definite height equal to the
      text column's — this fills that height exactly, rather than sitting at
      its own shorter natural size inside it.
    */
    <div className="flex h-full flex-col">
      {/*
        Free-floating — no header, no border, no card, no control. It turns
        on its own and always has; there is nothing here to press.

        `flex-1`: it takes whatever height is left after the card below it,
        so the two of them together are exactly as tall as the text column —
        not a fixed number that happens to leave a gap on one side or the
        other. The `min-h` is a floor only, for the stacked mobile layout
        where there is no taller column to stretch against.

        Bigger reads through width: the negative left margin + matching
        width overage bleed this element (only this element, not the card
        below it) out past its own grid column and over the text column
        beside it — deliberately, the graph is allowed to sit over the
        headline and intro copy now. It stays in normal document flow doing
        this (a margin shift, not `position: absolute`), so it still
        contributes its own height to the flex column exactly as before,
        which is what keeps the card below it from moving or being reached
        by the bleed — the card's own wrapper carries no such margin, so it
        stays put at the column's real width with zero overlap.
      */}
      <div className="relative min-h-[26rem] flex-1 sm:min-h-[30rem] lg:min-h-[20rem] lg:-ml-[55%] lg:w-[155%]">
        <Suspense
          fallback={
            <div className="absolute inset-0 grid grid-cols-2 place-items-center gap-2 p-6">
              {domains.map((d) => (
                <d.icon key={d.key} size={20} strokeWidth={1.6} className="text-dim" />
              ))}
            </div>
          }
        >
          <CapabilityGraphScene
            nodes={nodes}
            edges={edges}
            domains={domains}
            lit={lit}
            halfLit={halfLit}
            pointing={pointing}
            opened={opened}
            still={still}
            onOpenDomain={open}
            onPreviewDomain={preview}
          />
        </Suspense>
      </div>

      {/*
        A distinct treatment from `.card` on purpose — no border at all, just
        a solid fill a shade lighter than the page it sits on, rounded well
        past the site's usual hairline radius, and a soft, wide, low shadow
        for depth rather than a hard-edged one that would read as another
        drawn outline. The surface itself is what marks the edge, not a line
        around it. Plain normal flow, right after the graph, at every width —
        no overlap with it.
      */}
      <div
        key={current.key}
        className="relative z-10 mt-4 w-full animate-[fadeUp_0.5s_ease-out] border-t border-cyan/20 bg-transparent px-0 pb-2 pt-5 sm:pt-6"
      >
        <p className="font-display text-lead font-bold leading-tight text-amber">{current.label}</p>

        {/*
          All four blurbs occupy one grid cell and three are hidden. The panel
          swaps this paragraph on its own, and four paragraphs of different
          lengths meant the card grew and shrank on a timer. Stacking makes
          the cell exactly as tall as the longest one at whatever width it is
          being read.
        */}
        <div className="mt-2.5 grid grid-cols-1">
          {domains.map((d, i) => (
            <p
              key={d.key}
              aria-hidden={i !== active}
              className={`copy-sm [grid-area:1/1] ${i === active ? '' : 'invisible'}`}
            >
              {d.blurb.before}
              <em className="font-semibold not-italic text-amber">{d.blurb.mark}</em>
              {d.blurb.after}
            </p>
          ))}
        </div>

        {/*
          The skills, named here rather than only in the drawing, and wired to
          it. Point at one and its node swells and takes a ring; the turn
          holds while you are pointing.
        */}
        <ul className="mt-2.5 grid grid-cols-3 gap-x-3" aria-label={`Skills under ${current.label}`}>
          {currentSkills.map((sk) => {
            const on = pointing === sk.name;
            const shared = sk.domains.length > 1;
            const other = domains.find((d) => d.key !== current.key && sk.domains.includes(d.key));
            return (
              <li key={sk.name}>
                <button
                  type="button"
                  onPointerEnter={() => setPointing(sk.name)}
                  onPointerLeave={() => setPointing((p) => (p === sk.name ? null : p))}
                  onFocus={() => setPointing(sk.name)}
                  onBlur={() => setPointing((p) => (p === sk.name ? null : p))}
                  className="group -mx-1 flex min-h-[2.75rem] w-full items-center gap-2.5 rounded-sm px-1 text-left"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full border border-amber transition-shadow duration-300 ${
                      shared ? '' : 'bg-amber'
                    } ${on ? 'shadow-[0_0_0_3px_rgb(var(--amber)/0.3)]' : 'opacity-70'}`}
                  />
                  <span
                    className={`min-w-0 break-words font-mono text-micro transition-colors duration-300 ${
                      on ? 'text-amber' : 'text-cyan/75 group-hover:text-amber'
                    }`}
                  >
                    {sk.name}
                  </span>
                  {shared && other && <span className="sr-only"> — also under {other.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        <Link
          to={`/work/${current.proof.slug}`}
          className="group -mx-1 mt-1 flex min-h-[2.75rem] items-start gap-2 rounded-sm border-t border-amber/25 px-1 pt-3 text-fine text-amber"
        >
          <span className="underline decoration-amber/40 underline-offset-4 transition-colors group-hover:decoration-amber">
            Where this shows up: {current.proof.label}
          </span>
          <ArrowUpRight
            size={14}
            strokeWidth={2}
            className="mt-1.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
