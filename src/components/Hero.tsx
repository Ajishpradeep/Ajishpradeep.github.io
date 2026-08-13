import { ArrowRight, ArrowUpRight, FileText, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { marquee, site } from '../data/site';
import CapabilityGraph from './CapabilityGraph';
import TextRoll from './motion/TextRoll';

/**
 * One headline figure. `dl` order is term-then-definition; the visual order is
 * definition-then-term, which is what `flex-col-reverse` is doing — the number
 * reads first and the label explains it, without lying about which is which.
 * The source link is a third, earlier DOM child for the same reason — reversed,
 * it lands last, under the label: number, then what it means, then where it
 * came from.
 *
 * The value is static, not counted up. A count-up necessarily renders every
 * intermediate value on its way to the real one — on a site whose one rule is
 * "a number carries its source," a screenshot mid-animation shows a wrong,
 * unsourced figure. The `dl`'s own `[data-reveal]` already gives this block
 * an entrance; the digits do not need a second one.
 */
function Figure({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col-reverse justify-end border-l border-cyan/20 py-3 pl-4 first:border-l-0 first:pl-0">
      <Link
        to={source.href}
        className="group mt-2.5 flex items-start gap-1 border-t border-cyan/15 pt-2.5 text-micro text-dim transition-colors duration-300 hover:text-amber"
      >
        <span className="underline decoration-dim/40 underline-offset-2 group-hover:decoration-amber">
          {source.label}
        </span>
        <ArrowUpRight
          size={11}
          strokeWidth={2}
          className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </Link>
      <dt className="mt-1 font-text text-micro leading-snug text-dim">{label}</dt>
      <dd className="font-display text-title font-bold leading-none text-cyan tabular-nums">
        {value}
      </dd>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[4.5rem] sm:pt-[5.5rem]"
    >
      {/*
        The particle canvas that used to sit here is gone. It was a
        distance-threshold node field — the most-shipped decorative canvas on
        the web, mounted twice on this page, and saying nothing about a product
        whose subject is measuring a body in three dimensions. The hero has one
        authored moment now and it is the instrument in the right column.
      */}
      <div className="grid-veil absolute inset-0" />

      <div className="shell relative pb-4 pt-6 lg:pt-8">
        {/*
          `items-center`, not `items-start`. This was tried once before and
          reverted: at the previous, longer headline it pushed the CTA to 3px
          of clearance above the fold at 885px — the same regression
          DESIGN.md documents fixing once already, not worth trading a
          visible gap for. The headline is three words now ("It's
          mathematics."), the text column is ~165px shorter as a direct
          result, and the same measurement redone at the same 885px height
          puts the CTA at 722px — 163px of clearance, not 3. Centering splits
          the graph card's remaining height surplus above and below the text
          instead of leaving it as one gap between the hero and Selected
          systems. Re-measure this at the CTA's own position before reverting
          it again; the number that mattered moved.
        */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* LEFT — the claim, the person, the numbers, the way in */}
          <div className="flex flex-col lg:col-span-7">
            {/*
              No hard <br />. At 375px forced breaks split "COMPUTER VISION"
              mid-phrase into five ragged lines; balance wraps it on its own
              terms at every width. The emphasis is one contiguous phrase at the
              end, so a wrap inside it still reads as one amber unit.

              The measure was 16ch against a 88px `mega`, which set five lines
              and 423px of headline — 47% of a 1440×900 viewport, pushing every
              figure and the primary call to action below the fold. `mega` now
              tops out at 68px (see tailwind.config.js) and the measure is 18ch,
              which holds the same words in three lines.
            */}
            {/*
              "AI works because mathematics does." — chosen from four
              options presented for exactly this slot ("Mathematics wearing
              AI's name.", "Underneath the AI: mathematics.", "Call it AI.
              It's mathematics." were the other three). A causal claim
              rather than an identity one: not "AI is mathematics" restated
              again, but why AI works at all — because the mathematics
              underneath it does. Still its own sentence, not a clause
              lifted from `site.intro` — that paragraph's own opening line
              ("it maths") stays a different, non-overlapping claim either
              way.
            */}
            {/*
              THE ONE AUTHORED ENTRANCE ON THIS SURFACE.

              The headline rolls in on a 3D hinge, word by word, and the amber
              clause arrives last — which is the order the sentence is built in
              and the order it should land in.

              `by="word"`, not the library's per-character split, and that is
              not a preference. This is a three-line headline under
              `text-balance` at an 18ch measure; an `inline-block` per
              character means the browser can no longer see words, so it breaks
              lines mid-word and `text-balance` has nothing left to balance.
              Word units keep every wrap decision the typography already made.

              `data-reveal` came off it. The CSS reveal and the roll are two
              entrances on one element, and the reveal's `translateY` was
              sliding the hinge up while the hinge was still turning.
            */}
            <h1
              id="hero-title"
              className="max-w-[18ch] text-balance font-display text-mega font-extrabold uppercase text-cyan glow-cyan"
            >
              <TextRoll delay={0.15}>AI works because</TextRoll>{' '}
              <TextRoll className="text-amber glow-amber" delay={0.15 + 3 * 0.045}>
                mathematics does.
              </TextRoll>
            </h1>

            <p
              className="copy-lead mt-4 max-w-[54ch]"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              {site.intro}
            </p>

            {/*
              The differentiator, given its own line and its own weight. It is
              the one claim a forwarded CV cannot carry, so it is the one thing
              the hero must not bury in a subordinate clause.
            */}
            <p
              className="mt-2 max-w-[54ch] font-text text-lead font-semibold italic leading-[1.45] text-amber"
              data-reveal
              style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
            >
              {site.introEmphasis}
            </p>

            {/*
              Byline. Carries what a 45-second visitor needs: the role, the
              location, and the other name they may be holding a CV under.
            */}
            <div
              className="mt-4 border-l border-amber/50 pl-4"
              data-reveal
              style={{ '--reveal-delay': '190ms' } as React.CSSProperties}
            >
              <p className="font-display text-base font-bold leading-tight text-cyan">
                {site.name}
                <span className="text-dim"> · </span>
                <span className="text-amber">{site.role}</span>
              </p>
              <p className="tag-sm mt-1.5 normal-case text-dim">
                also known as {site.alias} · {site.location}
              </p>
            </div>

            {/*
              The three ways in, before the evidence rather than after it.
              The case studies and the résumé were below the fold at
              1440×900 and the résumé is the single thing the sixty-second
              visitor is most likely to want; putting the figures first
              pushed it to 797px, which a 13-inch laptop never reaches.
            */}
            <div
              className="mt-5 flex flex-wrap gap-3"
              data-reveal
              style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
            >
              <a href="#work" className="btn-amber">
                Read the case studies <ArrowRight size={15} strokeWidth={2.2} />
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText size={15} strokeWidth={2} /> Résumé
              </a>
              <Link to="/about" className="btn-ghost">
                <User size={15} strokeWidth={2} /> About
              </Link>
            </div>

            {/*
              The headline figures, in the hero column rather than in a
              full-width strip below it.

              The strip held six tiles of equal weight, none of them above the
              fold, and three of them — 29 keypoints, 1 of 3 winners, Warsaw —
              restated facts the impact dossier already carries with sources
              attached. Three figures, at the top, is what the sixty-second
              reader was promised.
            */}
            <dl
              className="mt-5 grid grid-cols-3 border-y border-cyan/20"
              data-reveal
              style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
            >
              {marquee.map((m) => (
                <Figure key={m.value} value={m.value} label={m.label} source={m.source} />
              ))}
            </dl>
          </div>

          {/*
            RIGHT — the expertise, as an explorable graph.

            This slot briefly held a single-finding instrument about validation
            blindness. It was a good artifact and the wrong one for the
            position: it introduced one problem from one case study, which is a
            paper figure, where the hero has to answer "what is this person
            expert in". The graph does that in one picture. The instrument now
            sits in Method, next to the finding it dramatises.
          */}
          <div
            className="lg:col-span-5"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            <CapabilityGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
