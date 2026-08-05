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

/** Plot box, in viewBox units. */
const W = 340;
const H = 188;
const L = 34;
const R = 332;
const T = 12;
const B = 148;
const Y_MIN = 2;
const Y_MAX = 10;

const px = (e: number) => L + (e / E_MAX) * (R - L);
const py = (v: number) => B - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * (B - T);

const path = (fn: (e: number) => number) =>
  EPOCHS.map(
    (e, i) => `${i ? "L" : "M"}${px(e).toFixed(1)} ${py(fn(e)).toFixed(1)}`,
  ).join(" ");

const FIELD_PATH = path(field);

export default function MetricBlindness() {
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
      Two columns from `lg`: the plot on the right, everything that describes or
      drives it on the left.

      It was one tall stack — caption, plot, legend, slider, readout, verdict —
      roughly 700px of vertical run in a section whose rows are otherwise a
      heading and a sentence. Split, the reading matter and the control sit
      beside the thing they operate instead of scrolling past it, and the card
      loses about half its height.

      `figure` is the grid container itself rather than wrapping one, because
      `figcaption` has to stay a direct child of `figure` to be its accessible
      caption. Explicit row placement is what lets the plot span both rows on
      the right while the caption and the controls stack on the left.
    */
    <figure className="card grid gap-x-8 gap-y-5 p-4 sm:p-5 lg:grid-cols-12">
      <figcaption className="flex items-start justify-between gap-4 lg:col-span-7 lg:row-start-1">
        <div>
          {/* h4: this sits under Method's h2 and principle 01's h3. */}
          <h4 className="font-display text-base font-bold uppercase leading-tight text-cyan">
            Metric blindness
          </h4>
          <p className="mt-1 font-text text-micro leading-snug text-dim">
            What the validation set omits, it also selects for
          </p>
        </div>
        <span
          className={`shrink-0 rounded-sm border px-2 py-1 font-mono text-micro ${
            verdict === "sighted"
              ? "border-cyan/50 text-cyan"
              : "border-amber/60 text-amber"
          }`}
        >
          {verdict === "sighted" ? "sighted" : "blind spot"}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full self-center lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2"
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
              fontSize="8"
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
          The cost, drawn as the measure it is: the vertical distance between
          the error you ship and the error you could have shipped.
        */}
        {m.cost > 0.02 && (
          <line
            x1={px(m.chosen)}
            x2={px(m.chosen)}
            y1={py(m.shipped)}
            y2={py(m.attainable)}
            stroke="rgb(var(--signal))"
            strokeWidth="2"
          />
        )}

        <path
          d={FIELD_PATH}
          fill="none"
          stroke="rgb(var(--amber))"
          strokeWidth="1.75"
        />
        {/*
          The validation curve is dashed, and that is load-bearing rather than
          decorative. At the top of the slider the two curves are identical by
          construction, and drawn solid the cyan simply painted over the amber
          — so the moment the argument resolves looked like the field curve had
          disappeared. Dashed, the amber reads through the gaps and convergence
          looks like agreement, which is what it is.
        */}
        <path
          d={m.validationPath}
          fill="none"
          stroke="rgb(var(--cyan-hot))"
          strokeWidth="1.75"
          strokeDasharray="5 3"
        />

        {/* the two readings at the chosen checkpoint */}
        <circle
          cx={px(m.chosen)}
          cy={py(m.shipped)}
          r="3.5"
          fill="rgb(var(--amber))"
        />
        <circle
          cx={px(m.chosen)}
          cy={py(m.reported)}
          r="3.5"
          fill="rgb(var(--cyan-hot))"
        />

        {/* baseline */}
        <line
          x1={L}
          x2={R}
          y1={B}
          y2={B}
          stroke="rgb(var(--cyan) / 0.3)"
          strokeWidth="1"
        />
        <text
          x={L}
          y={B + 14}
          className="font-mono"
          fontSize="8"
          fill="rgb(var(--dim))"
        >
          epoch 0
        </text>
        <text
          x={R}
          y={B + 14}
          textAnchor="end"
          className="font-mono"
          fontSize="8"
          fill="rgb(var(--dim))"
        >
          {E_MAX}
        </text>
        <text
          x={L}
          y={B + 27}
          className="font-mono uppercase"
          fontSize="7.5"
          fill="rgb(var(--dim))"
        >
          3D error (cm) · illustration, not measured data
        </text>
      </svg>

      {/*
        The left column's second row: the key to the plot, the control that
        drives it, the four numbers it produces, and the sentence that says what
        they mean. All of this used to sit under the plot, which put the slider
        roughly 400px below the curves it moves — far enough that a reader had
        to scroll to see the effect of their own drag.
      */}
      <div className="min-w-0 lg:col-span-7 lg:row-start-2">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-micro">
          <li className="flex items-center gap-2">
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
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 shrink-0 bg-amber" />
            <span className="text-cyan/80">field — what users get</span>
          </li>
        </ul>

        <div className="mt-4 border-t border-cyan/20 pt-4">
          <label
            htmlFor={`${id}-share`}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <span className="font-text text-fine leading-snug text-cyan/85">
              Failing regime present in the validation set
            </span>
            <span className="font-mono tabular-nums text-fine text-amber">
              {share}%
            </span>
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

        {/*
        The readout. Four numbers, and the fourth is the one that matters: what
        the blind spot costs, in the same unit as the claim.
      */}
        <dl
          className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-cyan/20 pt-4 sm:grid-cols-4"
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
              <dt className="font-mono text-micro uppercase text-dim">
                {label}
              </dt>
              <dd
                className={`mt-1 font-mono tabular-nums text-lead font-bold ${tone}`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 font-text text-fine leading-snug text-cyan/85">
          {verdict === "sighted" ? (
            <>
              Now the curve turns where the model does. Early stopping picks
              epoch <span className="font-mono text-amber">{m.chosen}</span> and
              ships the best model available.
            </>
          ) : (
            <>
              Validation reports{" "}
              <span className="font-mono text-cyan-hot">
                {m.reported.toFixed(1)}cm
              </span>{" "}
              and improving. In the field the model is at{" "}
              <span className="font-mono text-amber">
                {m.shipped.toFixed(1)}cm
              </span>{" "}
              and getting worse — and because early stopping reads the cyan
              curve, the run ships its{" "}
              <em className="not-italic text-signal">worst</em> checkpoint, not
              its best.
            </>
          )}
        </p>
      </div>
    </figure>
  );
}
