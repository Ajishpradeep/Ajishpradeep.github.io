import { useId, useMemo, useState } from "react";

/**
 * METRIC BLINDNESS — principle 01, as something the reader operates.
 *
 * It sits directly under the finding it dramatises, in Method. It spent a
 * short time in the hero and did not belong there: one problem from one case
 * study is a paper figure, and the hero has to answer what this person is
 * expert in, which is the expertise graph's job.
 *
 * Here it is exactly right, because Method's whole argument is that a claim
 * carries its receipt — and this is the one claim on the page whose receipt
 * can be handed to the reader to run themselves:
 *
 *   A validation set that omits a failure regime cannot see that regime get
 *   worse. Because the validation curve is what picks the shipped checkpoint,
 *   a blind validation set does not merely miss the failure — it selects for
 *   it, and ships the worst model of the run while reporting the best number.
 *
 * The slider is the composition of the validation set. Drag it and the
 * validation curve bends up to meet the field curve, the chosen checkpoint
 * walks back to the true optimum, and the cost of the blind spot goes to zero.
 *
 * Two properties this had to have that its predecessor did not:
 *   - It is a range input. Keyboard, touch and screen reader support are the
 *     platform's, not mine, and a swipe that starts on it still scrolls.
 *   - It has no autoplay and no simulation loop, so there is no motion to
 *     suppress and no separate reduced-motion rest state to keep honest. It
 *     looks and behaves identically either way.
 *
 * The curves are an illustration of principle 01, not measured data, and the
 * caption says so and links to the case-study section the principle came from.
 * The site's rule is that a number carries its source; a synthetic number
 * carries the fact that it is synthetic.
 *
 * THE PANEL IS ITS OWN SHAPE, NOT THE FIVE-WORD-TITLE-AND-A-SENTENCE SHAPE
 * BORROWED FROM ITS NEIGHBOURS.
 *
 * The other five findings in Method are a title and a sentence — there is
 * nothing to lay out. This one carries an instrument, and forcing it into
 * that same small footprint meant either the instrument lost the room a plot
 * needs to show a curve turning, or the panel carried a lot of paragraph
 * doing nothing to fill space the chart wasn't allowed to use. Neither is
 * right. The two columns now settle the height between them — the left
 * column reads (a claim, the numbers, the sentence that explains them) and
 * whatever height that comes to, the right column's instrument fills
 * completely, top to bottom: legend, then plot, then the slider that drives
 * it. Nothing on the right is sized to look modest next to a text-only
 * neighbour it no longer resembles.
 *
 * The template for the next finding built this way — a chart, or an image —
 * is this file: the reading column on the left sets the panel's height, the
 * visual column on the right fills it, and the title above both drops its
 * `max-w` cap in `Approach.tsx` because it is no longer sharing a narrow
 * column with anything stacked underneath it.
 */

const E_MAX = 60;
const EPOCHS = Array.from({ length: E_MAX + 1 }, (_, e) => e);

/** Error on the poses whose bias the validation set does contain. Monotone. */
const clean = (e: number) => 2.4 + 6.0 * Math.exp(-e / 14);

/**
 * Error on the regime the validation set omits. Descends with everything else,
 * then turns as the network keeps fitting the bias it was never scored on.
 */
const hard = (e: number) =>
  3.0 + 6.4 * Math.exp(-e / 9) + 0.1 * Math.pow(Math.max(0, e - 22), 1.1);

/** Deployment is a fixed mixture. What varies is only what you measured on. */
const FIELD_MIX = 0.45;
const field = (e: number) => (1 - FIELD_MIX) * clean(e) + FIELD_MIX * hard(e);

/**
 * Plot box, in viewBox units. `preserveAspectRatio="none"` on the `<svg>`
 * stretches this box to whatever the right column's flexed height turns out
 * to be, so `H` only fixes the box's internal proportions (where the axis
 * labels sit relative to the plot area) — not the plot's rendered size. A
 * wider box than tall reads correctly stretched taller; a curve's shape,
 * not its literal aspect ratio, is the thing being illustrated here.
 */
const W = 340;
const H = 200;
const L = 34;
const R = 332;
const T = 14;
const B = 158;
const Y_MIN = 2;
const Y_MAX = 10;

const px = (e: number) => L + (e / E_MAX) * (R - L);
const py = (v: number) => B - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * (B - T);

const path = (fn: (e: number) => number) =>
  EPOCHS.map(
    (e, i) => `${i ? "L" : "M"}${px(e).toFixed(1)} ${py(fn(e)).toFixed(1)}`,
  ).join(" ");

const FIELD_PATH = path(field);

export default function MetricBlindness({ claim }: { claim: string }) {
  const id = useId();
  /** Share of the omitted regime present in the validation set, 0–45%. */
  const [share, setShare] = useState(0);

  const m = useMemo(() => {
    const p = share / 100;
    const validation = (e: number) => (1 - p) * clean(e) + p * hard(e);

    /*
      The checkpoint you ship is argmin of the curve you can see — not of the
      curve that matters. That substitution is the whole argument, so it is
      computed rather than asserted.
    */
    let chosen = 0;
    let best = 0;
    for (const e of EPOCHS) {
      if (validation(e) < validation(chosen)) chosen = e;
      if (field(e) < field(best)) best = e;
    }

    return {
      validationPath: path(validation),
      chosen,
      best,
      shipped: field(chosen),
      attainable: field(best),
      reported: validation(chosen),
      cost: field(chosen) - field(best),
    };
  }, [share]);

  const verdict = m.cost > 1 ? "blind" : m.cost > 0.15 ? "partial" : "sighted";
  const verdictLabel = {
    blind: "The metric cannot see it",
    partial: "The metric half sees it",
    sighted: "The metric can see it",
  }[verdict];

  return (
    /*
      `items-stretch` (the grid default) is load-bearing now, not a defect to
      work around: it is what makes the right column exactly as tall as the
      left one, so the chart below has a real height to fill rather than an
      arbitrary one picked to look modest.

      `figure` is the grid container itself rather than wrapping one, because
      `figcaption` has to stay a direct child of `figure` to be its accessible
      caption. It carries no `card` framing of its own — it already sits
      inside Method's own panel, and a card inside a card is a second frame
      around content its container is already framing.
    */
    <figure className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
      <figcaption className="sr-only">
        Metric blindness — what the validation set omits, it also selects for
      </figcaption>

      {/*
        LEFT — the claim, the readout and the sentence. This is the column
        the site's own "a claim carries its receipt" rule is about: a
        statement, then the numbers, then the sentence that says what they
        mean. Nothing here has to be operated, and nothing is capped
        narrower than the column itself — at `lg:col-span-8` this is
        two-thirds of the panel, not half of it; the instrument is a
        supporting exhibit for this reading, not a co-equal half.
      */}
      <div className="min-w-0 lg:col-span-8">
        <p className="copy">{claim}</p>

        {/*
          Four columns, not two-then-two: the readout is one row of four
          readings, not a block half the height of the paragraph beneath it.
          `sm:grid-cols-4` now holds at `lg` too — the earlier `lg:grid-cols-2`
          undid it exactly where the panel had the most width to spend.
        */}
        <dl
          className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cyan/15 pt-5 sm:grid-cols-4"
          aria-live="polite"
        >
          {[
            ["Ships", `ep ${m.chosen}`, "text-cyan"],
            ["Reported", `${m.reported.toFixed(1)}cm`, "text-cyan"],
            ["Actual", `${m.shipped.toFixed(1)}cm`, "text-amber"],
            [
              "Cost",
              `+${m.cost.toFixed(2)}cm`,
              m.cost > 0.15 ? "text-signal" : "text-dim",
            ],
          ].map(([label, value, tone]) => (
            <div key={label}>
              <dt className="font-mono text-micro uppercase text-dim">{label}</dt>
              <dd className={`mt-1 font-mono tabular-nums text-lead font-bold ${tone}`}>
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 border-t border-cyan/15 pt-5 font-text text-fine leading-snug text-cyan/85">
          {verdict === "sighted" ? (
            <>
              Now the curve turns where the model does. Early stopping picks epoch{" "}
              <span className="font-mono text-amber">{m.chosen}</span> and ships the
              best model available.
            </>
          ) : (
            <>
              Validation reports{" "}
              <span className="font-mono text-cyan-hot">{m.reported.toFixed(1)}cm</span>{" "}
              and improving. In the field the model is at{" "}
              <span className="font-mono text-amber">{m.shipped.toFixed(1)}cm</span> and
              getting worse — and because early stopping reads the cyan curve, the run
              ships its <em className="not-italic text-signal">worst</em> checkpoint,
              not its best.
            </>
          )}
        </p>

        {/*
          Two short lines, not two paragraphs — the interaction instruction
          the slider never states, and the one sentence that generalises the
          finding past this one case. Kept technical rather than explained:
          the reader who wants the walkthrough has the verdict sentence
          above and the full write-up one click away; this is the part that
          has to be said plainly because nothing else on the page says it.
        */}
        <p className="mt-5 border-t border-cyan/15 pt-5 font-mono text-micro uppercase tracking-[0.08em] text-amber">
          → drag until the curves agree — the checkpoint a blind metric could
          never have shipped
        </p>

        <p className="mt-5 font-text text-fine leading-snug text-cyan/70">
          The weights do not move when the slider does — only what the
          validation set can see does. A blind spot does not go unscored, it
          gets rewarded: the checkpoint that best exploits it becomes
          indistinguishable from the true best one, so selection ships it.
          Validation coverage is a modelling decision, not a data-collection
          afterthought.
        </p>
      </div>

      {/*
        RIGHT — the instrument, filling the column top to bottom: the badge
        and legend (what the lines mean), then the plot (what they show),
        growing to take every pixel of height the left column left on the
        table, then the slider (what moves them) pinned under it.

        `lg:col-span-4`: a third of the panel, not half. The chart is the
        receipt for the reading on the left, not a co-equal exhibit — and
        `preserveAspectRatio="none"` means the plot itself simply redraws
        narrower at whatever height the (now shorter, four-column) left
        column sets; nothing about the curves' shape depends on the box
        being square.

        `lg:flex lg:h-full lg:flex-col` only engages at `lg`, where the grid
        row actually stretches this column to the left column's height.
        Below `lg` the figure is one column and there is no stretched height
        to fill, so this stays a plain block and the chart falls back to its
        own intrinsic aspect ratio.
      */}
      <div className="flex min-w-0 flex-col lg:col-span-4 lg:h-full">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span
            className={`inline-block rounded-sm border px-2 py-1 font-mono text-micro ${
              verdict === "sighted"
                ? "border-cyan/50 text-cyan"
                : "border-amber/60 text-amber"
            }`}
          >
            {verdict === "sighted" ? "sighted" : "blind spot"}
          </span>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-micro">
            <li className="flex items-center gap-1.5">
              {/* Dashed, to match the stroke it stands for. */}
              <span
                className="h-0.5 w-4 shrink-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgb(var(--cyan-hot)) 0 5px, transparent 5px 8px)",
                }}
              />
              <span className="text-cyan/80">validation — what you measure</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 shrink-0 bg-amber" />
              <span className="text-cyan/80">field — what users get</span>
            </li>
          </ul>
        </div>

        {/*
          `flex-1 min-h-0` is the fill. Without `min-h-0` a flex child's
          height floors at its content size regardless of `flex-1`, which
          for an `<svg>` with an intrinsic aspect ratio means the wrapper
          never shrinks *or* grows past that ratio — the exact thing this
          is here to override.
        */}
        <div className="mt-4 min-h-[10rem] flex-1 lg:min-h-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="h-full w-full"
            role="img"
            aria-label={`Error against training epoch. Validation error and field error. With ${share} percent of the failing regime in the validation set, the checkpoint chosen is epoch ${m.chosen}, where field error is ${m.shipped.toFixed(2)} centimetres against ${m.attainable.toFixed(2)} attainable.`}
          >
            {/* horizontal rules at each labelled error value */}
            {[2, 4, 6, 8, 10].map((v) => (
              <g key={v}>
                <line
                  x1={L}
                  x2={R}
                  y1={py(v)}
                  y2={py(v)}
                  stroke="rgb(var(--cyan) / 0.12)"
                  strokeWidth="1"
                />
                <text
                  x={L - 6}
                  y={py(v) + 3}
                  textAnchor="end"
                  className="font-mono tabular-nums"
                  fontSize="9"
                  fill="rgb(var(--dim))"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* the checkpoint the visible curve selects */}
            <line
              x1={px(m.chosen)}
              x2={px(m.chosen)}
              y1={T}
              y2={B}
              stroke="rgb(var(--amber) / 0.55)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/*
              The cost, drawn as the measure it is: the vertical distance
              between the error you ship and the error you could have shipped.
            */}
            {m.cost > 0.02 && (
              <line
                x1={px(m.chosen)}
                x2={px(m.chosen)}
                y1={py(m.shipped)}
                y2={py(m.attainable)}
                stroke="rgb(var(--signal))"
                strokeWidth="2.5"
              />
            )}

            <path d={FIELD_PATH} fill="none" stroke="rgb(var(--amber))" strokeWidth="2" />
            {/*
              The validation curve is dashed, and that is load-bearing rather
              than decorative. At the top of the slider the two curves are
              identical by construction, and drawn solid the cyan simply
              painted over the amber — so the moment the argument resolves
              looked like the field curve had disappeared. Dashed, the amber
              reads through the gaps and convergence looks like agreement,
              which is what it is.
            */}
            <path
              d={m.validationPath}
              fill="none"
              stroke="rgb(var(--cyan-hot))"
              strokeWidth="2"
              strokeDasharray="6 4"
            />

            {/* the two readings at the chosen checkpoint */}
            <circle cx={px(m.chosen)} cy={py(m.shipped)} r="4" fill="rgb(var(--amber))" />
            <circle cx={px(m.chosen)} cy={py(m.reported)} r="4" fill="rgb(var(--cyan-hot))" />

            {/* baseline */}
            <line x1={L} x2={R} y1={B} y2={B} stroke="rgb(var(--cyan) / 0.3)" strokeWidth="1" />
            <text x={L} y={B + 16} className="font-mono" fontSize="9" fill="rgb(var(--dim))">
              epoch 0
            </text>
            <text
              x={R}
              y={B + 16}
              textAnchor="end"
              className="font-mono"
              fontSize="9"
              fill="rgb(var(--dim))"
            >
              {E_MAX}
            </text>
            <text
              x={L}
              y={B + 32}
              className="font-mono uppercase"
              fontSize="8"
              fill="rgb(var(--dim))"
            >
              3D error (cm) · illustration, not measured data
            </text>
          </svg>
        </div>

        <div className="mt-4 shrink-0 border-t border-cyan/20 pt-4">
          <label
            htmlFor={`${id}-share`}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <span className="font-text text-fine leading-snug text-cyan/85">
              Failing regime present in the validation set
            </span>
            <span className="font-mono tabular-nums text-fine text-amber">{share}%</span>
          </label>
          <input
            id={`${id}-share`}
            type="range"
            min={0}
            max={45}
            step={1}
            value={share}
            onChange={(e) => setShare(Number(e.target.value))}
            className="range-hud mt-3 w-full"
            aria-valuetext={`${share} percent. ${verdictLabel}. Shipping epoch ${m.chosen} at ${m.shipped.toFixed(2)} centimetres field error.`}
          />
        </div>
      </div>
    </figure>
  );
}
