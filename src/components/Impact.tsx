import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Trophy,
  Globe2,
  Smartphone,
  Store,
  Plane,
  X,
  ExternalLink,
  UserCheck,
  ScrollText,
  Expand,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { impact, type ImpactEntry } from '../data/impact';
import ReachMap from './ReachMap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDialog } from '../hooks/useDialog';
import { springOr, SPRING, STILL } from '../lib/motion';
import TransitionPanel from './motion/TransitionPanel';
import { useMeasuredHeight } from '../hooks/useMeasuredHeight';

/** Keyed by the entry's own `icon` field, not by its position in the list. */
const icons = {
  award: Trophy,
  expo: Globe2,
  app: Smartphone,
  retail: Store,
} as const;

/**
 * The header block: icon, title, year, organisation.
 *
 * It is one component used in both the card and the open file, and every part
 * of it carries a `layoutId`, which is what makes the transition a *morph*
 * rather than a crossfade between two things that happen to say the same
 * words. The reader's eye stays on the title while the file opens around it.
 */
function DossierHead({
  entry,
  open,
  still,
}: {
  entry: ImpactEntry;
  open: boolean;
  still: boolean;
}) {
  const Icon = icons[entry.icon];
  const t = springOr(still, SPRING.panel);

  /*
    The year chip sits beside the title on the card and on the metadata line
    in the open file, and `layoutId` carries it between the two.

    Both alternatives were tried and both were worse. Left beside an uncapped
    title in a 768px dialog the chip wrapped onto a line of its own next to
    nothing. Capping the title's measure fixed the wrap and introduced a
    stranded chip: a `max-width` box that has wrapped internally still occupies
    its full max-content width, so the chip sat 200px clear of the last word it
    was supposed to be attached to.

    Moving it is the honest answer, and it is better than either — the year is
    metadata, the org line is where the metadata is, and the chip travelling
    down to join it is the transition telling the reader something true about
    what that value is.
  */
  const year = (
    <motion.span
      layoutId={`dossier-year-${entry.id}`}
      transition={t}
      className="shrink-0 rounded-sm border border-amber/40 px-1.5 py-0.5 font-mono text-micro text-amber"
    >
      {entry.year}
    </motion.span>
  );

  return (
    <div className="flex items-start gap-4">
      <motion.span layoutId={`dossier-icon-${entry.id}`} transition={t} className="mt-1">
        <Icon
          size={26}
          strokeWidth={1.6}
          className={`icon-mark transition-colors duration-500 ${
            open ? 'text-amber' : 'text-amber/70'
          }`}
        />
      </motion.span>

      <div className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {/*
            `text-lead` below `sm` even when open: at `text-title` this heading
            took three lines and 190px of a 390px screen before any of the
            file's contents had a chance to appear.
          */}
          <motion.span
            layoutId={`dossier-title-${entry.id}`}
            transition={t}
            className={`text-balance font-display font-bold leading-snug text-cyan ${
              open ? 'text-lead sm:text-title' : 'text-lead'
            }`}
          >
            {entry.title}
          </motion.span>
          {!open && year}
        </span>

        <motion.p
          layoutId={`dossier-org-${entry.id}`}
          transition={t}
          className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-micro text-dim"
        >
          {open && year}
          <span>{entry.org}</span>
        </motion.p>
      </div>
    </div>
  );
}

/**
 * Impact dossier: one card per externally-corroborated milestone.
 * Every card carries its own sources — nothing here is self-reported only.
 *
 * THE ACCORDION IS GONE, AND THE REASON IS THE SECTION'S OWN NAME.
 *
 * Four entries expanding in place made a 3,000px section whose height depended
 * on how curious the visitor had been, and it put the corroboration — the
 * whole argument of the section — into a strip that pushed everything below it
 * down the page. Nobody compares two open accordions; they scroll past both.
 *
 * A dossier is a stack of files, and a file is a thing you take *out* of the
 * stack to read. The card's own geometry travels into a focused reader, which
 * is the one place on this site where a modal is the honest control: checking
 * a source is a task that wants protected focus and is finished with, and the
 * list you return to is exactly the list you left.
 *
 * The source card fades to 0.25 while its file is open. Motion leaves the
 * origin element rendered during a shared-element transition, so without this
 * the card and its own enlargement are both on screen, and the metaphor breaks
 * the moment you see the file still sitting in the stack it was pulled from.
 */
export default function Impact() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [dir, setDir] = useState(1);
  const still = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [bodyRef, bodyHeight] = useMeasuredHeight<HTMLDivElement>();

  const index = impact.findIndex((m) => m.id === openId);
  const entry = index === -1 ? null : impact[index];

  useDialog(Boolean(entry), panelRef);

  /*
    Wraps, like the work console's stepper. `dir` is passed rather than derived
    from the indices for the same reason it is there: stepping forward off the
    end lands on index 0, which is numerically backwards and was, to the
    reader, unambiguously forwards.
  */
  const step = useCallback(
    (d: number) => {
      setDir(d);
      setOpenId((id) => {
        const at = impact.findIndex((m) => m.id === id);
        if (at === -1) return id;
        return impact[(at + d + impact.length) % impact.length].id;
      });
    },
    [],
  );

  const open = useCallback((id: string) => {
    setDir(1);
    setOpenId(id);
  }, []);

  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
      // The file is what the arrows are pointing at. Nothing else in the
      // dialog wants them — the source list is links, not a listbox.
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entry, step]);

  /*
    The slide, and the measured height underneath it.

    `height` is animated from the ResizeObserver reading rather than left to
    `auto` because the exiting panel is `position: absolute` — it has to be, or
    the two panels stack and the container jumps to the sum of both heights
    halfway through. Absolute takes it out of flow, which leaves the container
    sized by the incoming panel alone, which is a hard cut from one height to
    another underneath a smooth horizontal slide.
  */
  const panelVariants = useMemo(
    () => ({
      enter: (d: number) => ({
        x: d > 0 ? 56 : -56,
        opacity: 0,
        height: bodyHeight > 0 ? bodyHeight : 'auto',
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        height: bodyHeight > 0 ? bodyHeight : ('auto' as const),
      },
      exit: (d: number) => ({
        zIndex: 0,
        x: d < 0 ? 56 : -56,
        opacity: 0,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
      }),
    }),
    [bodyHeight],
  );

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

        {/*
          No `max-w-[Nch]` here. This line has the whole shell to itself —
          nothing sits beside it the way the hero's intro sits beside the
          graph — so a reading-measure cap only forced a 3-line wrap with the
          rest of a 1472px shell sitting empty beside it. `.shell` itself is
          still the outer bound.
        */}
        <p className="mt-6 copy" data-reveal>
          Work does not count as impact until somebody outside the building says so. Every entry
          links to its public record, and states separately what part of it was mine.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-3">
          {impact.map((m, i) => {
            const on = openId === m.id;

            return (
              <li
                key={m.id}
                data-reveal
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                {/*
                  The card is a div with a pointer handler and a real <button>
                  inside the heading, and that split is deliberate. A button's
                  content is flattened into its accessible name, so wrapping
                  the whole card made heading navigation announce the title,
                  the year, the organisation and the full forty-word claim as
                  one heading, four times running. The heading is the title;
                  everything else is content beside it.
                */}
                <motion.div
                  layoutId={`dossier-${m.id}`}
                  transition={springOr(still, SPRING.panel)}
                  animate={{ opacity: on ? 0.25 : 1 }}
                  onClick={() => open(m.id)}
                  className="card group cursor-pointer p-5 sm:p-6"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        open(m.id);
                      }}
                      aria-haspopup="dialog"
                      className="w-full text-left"
                    >
                      <DossierHead entry={m} open={false} still={still} />
                    </button>
                  </h3>

                  {/*
                    Claim and "My part" side by side from `lg` up, and both
                    visible while the file is closed — that is the whole point.
                    "My part" used to sit behind the disclosure, so the only
                    prose a scanner read was four organisational milestones in
                    a row, on a portfolio, with the contribution reachable only
                    by clicking. The company took the headline and the author
                    took the footnote.

                    The `.well` is the site's recessed surface and this is the
                    one place DESIGN.md already describes using it. It replaced
                    a 2px amber `border-left`, which is a callout costume
                    rather than a level in the surface system.
                  */}
                  <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 pl-[2.5rem] lg:grid-cols-2">
                    <p className="copy-sm">{m.claim}</p>

                    {m.role && (
                      <div className="well p-4">
                        <p className="tag-sm inline-flex items-center gap-2 text-amber">
                          <UserCheck size={14} strokeWidth={2} /> My part
                        </p>
                        <p className="copy-sm mt-1.5">{m.role}</p>
                      </div>
                    )}
                  </div>

                  {/*
                    The affordance, which names what is behind it rather than
                    describing the gesture that gets there. A bare "+" said the
                    card did something; this says what, and the source count is
                    the reason a sceptical reader opens it at all.
                  */}
                  <p className="mt-4 flex items-center gap-2 border-t border-cyan/20 pl-[2.5rem] pt-3.5 font-mono text-micro text-dim transition-colors duration-300 group-hover:text-amber">
                    <Expand size={13} strokeWidth={2} className="shrink-0" />
                    Open file · {m.sources.length} source{m.sources.length === 1 ? '' : 's'}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ul>

        {/*
          Reach — the list and the globe, side by side.

          Both occupy the width of a single row: the facts on the left, the
          globe on the right. The nodes mark where the work was built and where
          it was shown, and every one of those is a sourced card directly above.
        */}
        <div
          className="mt-12 grid grid-cols-1 items-center gap-x-10 gap-y-8 border-t border-cyan/20 pt-8 lg:grid-cols-12"
          data-reveal
        >
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3 lg:col-span-7">
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

      {/* THE OPEN FILE */}
      <AnimatePresence>
        {entry && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={still ? STILL : { duration: 0.25 }}
              onClick={() => setOpenId(null)}
              className="absolute inset-0 bg-void/85 backdrop-blur-sm"
            />

            <motion.div
              ref={panelRef}
              layoutId={`dossier-${entry.id}`}
              transition={springOr(still, SPRING.panel)}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`dossier-heading-${entry.id}`}
              className="card relative z-10 flex max-h-[86vh] w-full max-w-3xl flex-col bg-deep/95 shadow-[0_24px_80px_-20px_rgb(var(--void))]"
            >
              <div className="flex items-start gap-4 border-b border-cyan/20 p-5 sm:p-6">
                <div className="min-w-0 flex-1">
                  <h3 id={`dossier-heading-${entry.id}`}>
                    <DossierHead entry={entry} open still={still} />
                  </h3>
                </div>

                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenId(null)}
                  className="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-cyan/40 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
                >
                  <X size={17} strokeWidth={2} />
                  <span className="sr-only">Close file</span>
                </button>
              </div>

              {/*
                THE FILE BODY, AS A TRANSITION PANEL.

                The four dossiers used to be four separate open-and-close
                trips: read one, close it, find the next card, open that. They
                are the section's *comparison* — four milestones each with its
                own corroboration — and the reader was being made to hold each
                one in memory across a modal dismissal to make it.

                So the file steps. Previous and Next slide the body in from the
                side you asked for while the frame stays put, which is the
                upstream `TransitionPanelCard` doing exactly what it is for.
                The height is animated from a `ResizeObserver` measurement
                rather than left to `auto`, because the outgoing panel has to
                be `position: absolute` — otherwise the two stack and the
                container jumps to the sum of both heights mid-slide.

                The contents of a file do not exist on its card and so cannot
                morph from anything; on first open they arrive after the
                geometry settles, through a short blur, so the eye reads "this
                resolved" rather than "a second thing appeared".
              */}
              <div className="relative min-h-0 flex-1 overflow-y-auto">
                <TransitionPanel
                  activeIndex={index}
                  direction={dir}
                  variants={panelVariants}
                  transition={
                    still
                      ? STILL
                      : { x: SPRING.panel, opacity: { duration: 0.18 }, height: SPRING.panel }
                  }
                >
                  {impact.map((m) => (
                    <motion.div
                      key={m.id}
                      ref={m.id === entry.id ? bodyRef : undefined}
                      initial={still ? false : { opacity: 0, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={still ? STILL : { ...SPRING.panel, delay: 0.12 }}
                      className="p-5 sm:p-6"
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12">
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
                          <div className="well p-4">
                            <p className="tag-sm inline-flex items-center gap-2 text-amber">
                              <UserCheck size={14} strokeWidth={2} /> My part
                            </p>
                            <p className="copy-sm mt-1.5">{m.role}</p>
                          </div>

                          {/*
                            The corroboration, which is the one thing that
                            genuinely belongs at the end of a file: a reader who
                            wants to check goes looking, and now has somewhere to
                            go that is not three thousand pixels of open
                            accordion.
                          */}
                          <p className="mt-6 inline-flex items-center gap-2 tag-sm text-amber">
                            <ExternalLink size={14} strokeWidth={2} /> Public record
                          </p>
                          <ul className="mt-2 space-y-1">
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
                    </motion.div>
                  ))}
                </TransitionPanel>
              </div>

              {/*
                The file runs past 86vh on every entry with three sources, and
                the stepper band below takes another 68px off what is visible —
                so the last link sat cut off flush against a rule, which looks
                like a rendering fault rather than like more content. A short
                fade to the panel's own ground says "this continues" in the one
                way that cannot be mistaken for a border.

                A flex sibling pulled back over the scroll area with a negative
                margin, rather than an absolute child of it: absolute inside a
                scroll container scrolls away with the content, and the fade has
                to stay at the bottom edge of what is *visible*.
              */}
              <div
                aria-hidden
                className="pointer-events-none relative z-10 -mt-12 h-12 shrink-0 bg-gradient-to-t from-deep to-transparent"
              />

              {/*
                THE STEPPER, in its own band at the foot of the file.

                It is not a "close" and it is not decoration: it is the reason
                the dialog is worth being a dialog. Four sourced milestones are
                a set, and a set is read through, not visited four times.

                ← and → work too. The panel owns the arrow keys because the
                file is what they are pointing at, and the only other thing in
                here that wants them is a link list that does not use them.
              */}
              <div className="flex shrink-0 items-center justify-between gap-4 border-t border-cyan/20 px-5 py-3 sm:px-6">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex h-11 items-center gap-2 rounded-sm border border-cyan/40 px-3 font-mono text-micro uppercase text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
                >
                  <ArrowLeft size={14} strokeWidth={2} /> Prev
                </button>

                <p className="font-mono text-micro tabular-nums text-dim">
                  File {String(index + 1).padStart(2, '0')} /{' '}
                  {String(impact.length).padStart(2, '0')}
                </p>

                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex h-11 items-center gap-2 rounded-sm border border-cyan/40 px-3 font-mono text-micro uppercase text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
                >
                  Next <ArrowRight size={14} strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
