import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  UserCog,
  Target,
} from 'lucide-react';
import { work } from '@/data/work';
import CaseVisual from './CaseVisual';
import ConstraintLab from './ConstraintLab';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { springOr, SPRING } from '@/lib/motion';
import TextScramble from '@/motion/TextScramble';
import SpotlightBorder from '@/motion/SpotlightBorder';
import InView from '@/motion/InView';
import { RISE_GROUP, RISE_ITEM } from '@/lib/variants';

/** Org, period and role. One row, three columns, wherever it is placed. */
function Facts({
  study,
  className = '',
  stacked = false,
}: {
  study: (typeof work)[number];
  className?: string;
  /** One column, for when this sits inside a narrow half of the card. */
  stacked?: boolean;
}) {
  return (
    <ul
      className={`grid grid-cols-1 gap-x-8 gap-y-3 border-t border-cyan/20 ${
        stacked ? "" : "sm:grid-cols-3"
      } ${className}`}
    >
      {[
        [Building2, study.org],
        [CalendarDays, study.period],
        [UserCog, study.role],
      ].map(([Icon, v], k) => {
        const I = Icon as typeof Building2;
        return (
          <li key={k} className="flex items-start gap-2.5">
            <I size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber/80" />
            <span className="text-fine leading-snug text-cyan/75">{v as string}</span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The four readings, directly under `Facts` rather than as their own
 * full-width row under the whole card.
 *
 * `columns` defaults to four across, which is right when this sits at the
 * card's full width (the non-solver layout). Passed `sm:grid-cols-2` it
 * reads as two rows of two — the shape that fits the solver layout's own
 * `lg:col-span-7` column, which is roughly half the card's width and would
 * have crushed four figures into columns too narrow for "mean per-joint
 * error, pelvis-relative" to sit under its own number.
 */
function Metrics({
  study,
  className = '',
  columns = 'sm:grid-cols-2 lg:grid-cols-4',
}: {
  study: (typeof work)[number];
  className?: string;
  columns?: string;
}) {
  return (
    <InView
      key={study.slug}
      as="ul"
      variants={RISE_GROUP}
      viewOptions={{ once: true, margin: '0px 0px -60px 0px' }}
      className={`grid grid-cols-1 gap-x-8 gap-y-6 border-t border-cyan/20 pt-6 ${columns} ${className}`}
    >
      {study.metrics.map((m) => (
        <motion.li key={m.label} variants={RISE_ITEM}>
          <p className="font-display text-title font-bold leading-none text-amber tabular-nums">
            {m.value}
          </p>
          <p className="mt-2 font-text text-fine leading-snug text-dim">{m.label}</p>
        </motion.li>
      ))}
    </InView>
  );
}

/**
 * Rail index on the left, case-file readout on the right.
 *
 * Which case is open lives in the URL rather than in component state, so a
 * hiring manager can send a colleague "look at 03" instead of "scroll down and
 * click the fourth thing".
 */
export default function WorkConsole() {
  const [params, setParams] = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const fromUrl = work.findIndex((w) => w.slug === params.get('case'));
  const i = fromUrl === -1 ? 0 : fromUrl;
  const study = work[i];

  /*
    Which way the reader went, so the incoming case arrives from the side they
    left rather than always from the same one.

    It is state and not `useMemo(() => index > i)`, because the stepper wraps:
    pressing Next on case 05 lands on index 0, which is numerically backwards
    and was, to the reader, unambiguously forwards. The caller knows what
    happened; the indices do not.
  */
  const [dir, setDir] = useState(1);

  const open = useCallback(
    (index: number, opts: { keepInView?: boolean; dir?: number } = {}) => {
      setDir(opts.dir ?? (index >= i ? 1 : -1));

      const next = new URLSearchParams(params);
      next.set('case', work[index].slug);
      // replace, not push: stepping through cases should not fill the back button.
      setParams(next, { replace: true, preventScrollReset: true });

      if (opts.keepInView) {
        const card = cardRef.current;
        if (card && card.getBoundingClientRect().top < 0) {
          card.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
        }
      }
    },
    [i, params, setParams, still],
  );

  const step = (d: number) =>
    open((i + d + work.length) % work.length, { keepInView: true, dir: d });

  /*
    Roving tabindex: the rail is one tab stop and the arrows move within it,
    which is what `role="tablist"` promises. `moveFocus` is set only by a key
    press, so focus follows the arrows without being stolen when the same case
    is opened from the stepper, from a deep link, or from the command deck.
  */
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    activeTabRef.current?.focus();
  }, [i]);

  const onRailKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;

    if (e.key in keys) next = (i + keys[e.key] + work.length) % work.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = work.length - 1;

    if (next === null) return;
    e.preventDefault();
    moveFocus.current = true;
    open(next);
  };

  // Keep the announced position in sync for anyone not watching the card change.
  const liveRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Case ${study.index} of ${work.length}: ${study.title}`;
    }
  }, [study]);

  return (
    /*
      Top padding cut well below the other sections' shared `py-14 sm:py-16
      lg:py-20` — this is the one section that follows the hero rather than
      another section, and the hero's own taller column (the graph, kept
      full-size on request) was already landing "Selected systems" 226px
      below where the shorter column's content stopped. Bottom padding is
      untouched; it is what separates this section from Impact, a normal
      section-to-section gap, not the one that was too big.
    */
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 pb-14 pt-6 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-10"
    >
      <div className="grid-veil absolute inset-0 opacity-70" />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          {/*
            One h2 register across all seven sections. Two were in use: this
            one, and `font-text text-title font-semibold text-cyan/75` on the
            other five — quieter than the h3 inside the card below it, which
            made "Method" read as a sub-label of the section above rather than
            as a peer of this one.

            The amber brackets are gone with it. They are the same device as
            the thirteen corner traces and the bracketed labels; spent on
            headings too, they stopped being a mark and became the wallpaper.
          */}
          <h2
            id="work-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Selected systems
          </h2>

          {/*
            The stepper lives with the counter, at the top of the card it
            controls. It used to sit at the foot of a 1,700px card, so pressing
            Next changed content far above the thumb.
          */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-cyan/40 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              <span className="sr-only">Previous case</span>
            </button>
            {/*
              `w-16` was 64px holding 66px of text. `tag-sm` is 14px mono at
              0.06em, so "01 / 05" measures 66 and the box broke it after the
              slash — a counter reading "01 /" over "05", between two arrows,
              which is why it looked bent. Sized from the content and told not
              to wrap; `tabular-nums` so the width does not twitch from 01 to 05.
            */}
            <p className="tag-sm min-w-[4.75rem] whitespace-nowrap text-center tabular-nums text-dim">
              {study.index} / {String(work.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-cyan/40 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <ArrowRight size={15} strokeWidth={2} />
              <span className="sr-only">Next case</span>
            </button>
          </div>
        </div>

        <p ref={liveRef} aria-live="polite" className="sr-only" />

        {/*
          Three cells, two rows, and the row template is what makes the left
          column work: `auto` sizes it to the index, `1fr` gives everything
          left over to the block underneath it.

          The index is 587px of content in a column the 1,347px card sets the
          height of, so 760px of it was empty — a quarter of the section, held
          open by a card beside it and holding nothing. What went into it is the
          one part of the record this console never showed: `outcome`, which
          until now was only reachable by opening the full case. It is also the
          thing the industry reader is here for. They ask what shipped and what
          happened after it shipped, and the console answered the first half.

          The outcomes come after the card in the DOM, and are pulled back up
          beside it on a wide screen. On a phone that is the honest order —
          what a system did belongs after what it was — and on a desktop the
          eye reads the column, not the source.
        */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-10">
          {/*
            RAIL — a tablist, not navigation: these switch a panel in place.

            It announced `role="tablist"` and implemented none of the rest of
            the pattern: all five tabs were separate tab stops and the arrow
            keys did nothing, so a screen-reader user was told "tab, 1 of 5"
            and handed a control that did not behave like one. Roving tabindex
            and arrow handling below make the announcement true.
          */}
          <div className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
            <h3 className="tag-sm text-dim" id="case-index-label">
              Index
            </h3>
            <ul
              role="tablist"
              aria-labelledby="case-index-label"
              aria-orientation="vertical"
              className="mt-4 space-y-1.5"
              onKeyDown={onRailKey}
            >
              {work.map((wk, idx) => {
                const on = idx === i;
                return (
                  <li key={wk.slug} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`case-tab-${wk.slug}`}
                      aria-selected={on}
                      aria-controls="case-readout"
                      tabIndex={on ? 0 : -1}
                      ref={on ? activeTabRef : undefined}
                      onClick={() => open(idx)}
                      className={`relative flex w-full items-start gap-3 rounded-sm p-3 text-left transition-colors duration-300 ${
                        on ? '' : 'hover:bg-panel/40'
                      }`}
                    >
                      {/*
                        THE TRAVELLING MARKER.

                        One amber block, shared across all five tabs by
                        `layoutId`, so the selection slides down the index to
                        the case you picked instead of vanishing here and
                        appearing there. On a five-item list that is the
                        difference between a control that reports a state and
                        an instrument you can see yourself operating — and it
                        is the same device as the dock's dot and the
                        capabilities marker, because the site should have one
                        way of saying "this one".

                        It sits behind the label rather than being the label's
                        own border, which is what lets it move independently of
                        the text it is currently under.
                      */}
                      {on && (
                        <motion.span
                          layoutId="case-marker"
                          transition={springOr(still, SPRING.marker)}
                          aria-hidden
                          className="absolute inset-0 rounded-sm border border-amber/45 bg-amber/10"
                        />
                      )}
                      <span
                        className={`relative mt-0.5 font-mono text-micro transition-colors duration-300 ${
                          on ? 'text-amber' : 'text-dim'
                        }`}
                      >
                        {wk.index}
                      </span>
                      <span
                        className={`relative font-display text-base leading-snug transition-colors duration-300 ${
                          on ? 'font-bold text-amber' : 'font-medium text-cyan/75'
                        }`}
                      >
                        {wk.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* READOUT */}
          <div className="lg:col-span-9 lg:col-start-4 lg:row-span-2 lg:row-start-1">
            <div
              ref={cardRef}
              id="case-readout"
              role="tabpanel"
              aria-labelledby={`case-tab-${study.slug}`}
              className="card trace p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
                <div className="sweep h-px w-1/3 bg-gradient-to-r from-transparent via-amber to-transparent" />
              </div>

              {/*
                THE READOUT ARRIVES FROM THE DIRECTION YOU LEFT.

                Every case used to fade up from below regardless of which way
                the reader had gone — Previous and Next produced the identical
                move, so the one thing the animation could have told them was
                the one thing it did not. The panel now enters from the side
                the rail travelled, which makes the stepper and the index feel
                like the same control operated two ways, because they are.

                Keyed on the slug, so React remounts it and `initial` runs
                again on every change. There is deliberately no exit: this card
                is 1,300px tall and holds the reader's scroll position, and
                animating it out would collapse the page under them mid-read.
                The new one arrives over the old one's footprint instead.

                18px, not 40. The distance should read as a nudge from a
                control, not as a slide between two screens — the card has not
                gone anywhere, its contents have changed.
              */}
              <motion.div
                key={study.slug}
                initial={still ? false : { opacity: 0, x: dir * 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springOr(still, SPRING.panel)}
              >
              {/*
                Two layouts, because the two kinds of mechanism have opposite
                shapes. The solver is tall and interactive and needs a column of
                its own. A static diagram is short and wide, and putting it in a
                column meant a 185px graphic sitting on top of 470px of nothing
                while the prose beside it was squeezed into 460px and broke into
                five-word lines. Floated, the diagram is half again as large and
                the prose closes around it.
              */}
              {study.visual === 'solver' ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                  <div className="flex flex-col lg:col-span-7">
                    {/*
                      THE READOUT RETUNES.

                      This line changes on every case, and it is a measurement
                      label on an instrument — mono, uppercase, technical
                      nouns. Resolving it character by character is what a
                      readout does when the thing under it has been switched;
                      a hard swap is what a static caption does.

                      Scrambled through letters, digits and the middot the
                      labels already contain, never through `#$%^&*`. That
                      alphabet reads as a glitch — something broke and is
                      repairing itself — and this page does not get to imply a
                      state the system is not in. See `motion/TextScramble`.
                    */}
                    <p className="tag-sm text-amber">
                      <TextScramble trigger={study.slug}>{study.domain}</TextScramble>
                    </p>
                    <h3 className="mt-4 max-w-[22ch] text-balance font-display text-title font-extrabold uppercase leading-[1.12] text-cyan">
                      {study.title}
                    </h3>
                    <p className="mt-4 max-w-[56ch] copy">{study.subtitle}</p>
                    <div className="mt-6 flex items-start gap-3.5 border-t border-cyan/20 pt-5">
                      <Target size={22} strokeWidth={1.7} className="icon-mark mt-0.5" />
                      <p className="copy-sm max-w-[62ch]">{study.problem}</p>
                    </div>
                    {/*
                      Not `mt-auto`. This column's height is set by the solver
                      panel beside it, so pushing Facts to the bottom edge left
                      a measured 206px hole between the problem paragraph and
                      the org/period/role row — the fix for the column's bottom
                      edge dug a pit in its middle. Trailing space under a short
                      column reads as layout; a gap inside one reads as a bug.

                      The four readings go directly under Facts now rather than
                      as their own row under the whole card, and that closes
                      the same hole from the other side: this column's natural
                      content — title, subtitle, problem, org/period/role — ran
                      shorter than the solver beside it, so there was empty
                      well below Facts before the readings ever arrived. Two
                      columns, not the card's usual four: at this column's own
                      width, four would have run past it into the solver's.
                    */}
                    <Facts study={study} stacked className="mt-6 pt-5" />
                    <Metrics study={study} className="mt-6" columns="sm:grid-cols-2" />
                  </div>
                  <div className="lg:col-span-5">
                    {/* The enclosing readout is keyed on the slug and already
                        re-enters; a second fadeUp here was the same move played
                        twice, half a beat apart. */}
                    <ConstraintLab />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5 lg:float-right lg:mb-4 lg:ml-8 lg:w-[27rem]">
                    <div className="well p-4">
                      <CaseVisual kind={study.visual} />
                    </div>
                  </div>

                  <p className="tag-sm text-amber">
                    <TextScramble trigger={study.slug}>{study.domain}</TextScramble>
                  </p>
                  <h3 className="mt-4 max-w-[26ch] text-balance font-display text-title font-extrabold uppercase leading-[1.12] text-cyan">
                    {study.title}
                  </h3>
                  <p className="mt-4 copy">{study.subtitle}</p>

                  <div className="mt-6 flex items-start gap-3.5 border-t border-cyan/20 pt-5">
                    <Target size={22} strokeWidth={1.7} className="icon-mark mt-0.5" />
                    <p className="copy-sm">{study.problem}</p>
                  </div>

                  {/*
                    Four readings side by side already read as a group; the
                    four boxes were four more frames inside a card. One rule
                    above the row does the same work, and `tabular-nums` stops
                    the figures jittering — the contents swap on every case
                    change.

                    Directly under Facts, at the card's full width — this
                    branch's visual is floated, not a persistent column, so
                    there is no "other side" the readings would run over.

                    This is `InViewImagesGrid`'s mechanism — `staggerChildren`
                    on a grid whose items blur and scale up — applied to the
                    grid this page actually has. The demo staggers a masonry
                    of photographs; there are no photographs here, and the
                    thing that genuinely benefits from being read left to
                    right is a row of four measurements that changed when the
                    case changed.

                    Keyed on the slug so it replays on every case switch,
                    which is the only time these values are new. `once` is
                    therefore off, and the entrance is short enough that
                    stepping through five cases quickly does not queue.

                    Clear the float so the facts and the readings run the
                    full width of the card rather than under the visual.
                  */}
                  <Facts study={study} className="mt-6 pt-5 lg:clear-right" />
                  <Metrics study={study} className="mt-6" />
                </div>
              )}

              {/* Non-interactive nouns. A middot set says "these are a set". */}
              <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-fine text-cyan/70">
                {study.stack.map((s, k) => (
                  <span key={s} className="flex items-center gap-2">
                    {k > 0 && <span className="text-cyan/30">·</span>}
                    {s}
                  </span>
                ))}
              </p>

              {/*
                The way into the actual writing. This is the most important link
                on the site for the audience it exists to reach, and it used to
                be the third button in a row of three, labelled in house jargon.
                It now gets its own band, says what is behind it, and shows the
                argument before you commit to reading it.
              */}
              {/*
                THE BORDER LIGHTS WHERE YOU POINT AT IT.

                This is the most important link on the site for the audience it
                exists to reach, and `SpotlightBorder` is spent here rather than
                scattered across the cards. The light is confined to the 1px
                frame by an opaque inner surface, so it never crosses the text
                — which is the whole reason a spotlight is usable on this page
                at all. A soft blob drifting over 17px serif prose is a
                legibility cost paid for atmosphere; a frame that brightens
                under the cursor is the same family as the `.trace` corner
                brackets used elsewhere.
              */}
              <SpotlightBorder
                className="mt-8 block"
                ringClassName="bg-amber/50"
                innerClassName="bg-deep"
                size={200}
              >
              <Link
                to={`/work/${study.slug}`}
                className="group block rounded-[3px] bg-amber/10 p-5 transition-colors duration-300 hover:bg-amber/20 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-lead font-bold text-amber">
                    Read the full study — {study.sections.length} sections
                  </p>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={2}
                    className="text-amber transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {study.sections.map((s, k) => (
                    <li key={s.heading} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-micro text-amber/80">
                        {String(k + 1).padStart(2, '0')}
                      </span>
                      <span className="text-fine leading-snug text-cyan/85">{s.heading}</span>
                    </li>
                  ))}
                </ul>
              </Link>
              </SpotlightBorder>
              </motion.div>
            </div>
          </div>

          {/*
            WHAT CAME OF IT.

            `outcome` is the only field on a case study the console never
            rendered. It is not a summary of the case — it is what was true
            afterwards, which is a different claim and the one a reader deciding
            whether to start a conversation is actually weighing.

            Set at `text-fine` and not `.copy`: the column is 266px, which is a
            36-character measure, and 20px prose does not survive that. These
            are four separate statements rather than a paragraph, so each gets a
            rule and its own air, and reads as a list of findings — which is
            what it is.

            The stagger is guarded rather than left to the stylesheet. The
            reduced-motion rule collapses animation *duration* and says nothing
            about delay, so an unguarded 70ms step would hold each line blank
            and then snap it in — the one thing the setting exists to prevent.
          */}
          <div className="lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:self-start">
            <h3 className="tag-sm text-dim" id="case-outcome-label">
              What came of it
            </h3>
            <ul
              key={study.slug}
              aria-labelledby="case-outcome-label"
              className="mt-4 border-t border-cyan/20"
            >
              {study.outcome.map((o, k) => (
                <li
                  key={o}
                  className="flex gap-3 border-b border-cyan/20 py-3.5 animate-[fadeUp_0.5s_ease-out]"
                  style={{
                    animationDelay: still ? undefined : `${k * 70}ms`,
                    animationFillMode: still ? undefined : 'backwards',
                  }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-amber" />
                  <span className="font-text text-fine leading-[1.55] text-cyan/80 text-pretty">
                    {o}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
