import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { principles } from "../data/research";
import MetricBlindness from "./MetricBlindness";

/**
 * Method.
 *
 * Deliberately not a card grid. Every one of these findings came out of a
 * specific case study, so the section reads as a list of claims with their
 * provenance attached — claim on the left, the evidence and a way to go and
 * check it on the right. That relationship is the argument for reading the
 * case files at all, and it was previously never drawn.
 */
export default function Approach() {
  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-cyan/15 py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            id="method-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Method
          </h2>
          <p className="tag-sm text-dim">
            Six findings · from being wrong measurably
          </p>
        </div>

        {/*
          Method, Capabilities and the research log all rendered the identical
          twelve-column ruled row — roughly 3,600px of one pattern, and this
          section was in the middle of it. That is where the reasoning a
          research reader came for actually lives, so it was the worst possible
          thing to make indistinguishable from a skills matrix.

          These six are claims with receipts, so they are set as claims: the
          finding at heading weight in its own column, its evidence and the way
          to go and check it in the column beside it. That is not the Capabilities
          matrix reappearing — that one is a term-and-definition list of reference
          material, and this is a claim standing next to its proof.

          The numbers are kept because they are identifiers, not decoration —
          "principle 01" is how these get referred to, including in the copy.
        */}
        <ol className="mt-6">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="border-b border-cyan/20 py-8 sm:py-9"
              data-reveal
              style={{ "--reveal-delay": `${i * 40}ms` } as React.CSSProperties}
            >
              {/*
                Claim left, evidence right — which is what the note above always
                described and the markup never did.

                Stacked, the finding was a 28ch heading and the evidence a 70ch
                paragraph, both hard against the left edge of a full-width shell.
                Roughly the right third of six consecutive rows was empty, and
                the section ran far longer than it needed to for the amount it
                says. Two columns put the claim and its receipt on one eye-line
                and take back the height.
              */}
              <div className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
                <div className="flex gap-5 sm:gap-8 lg:col-span-5">
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-mono text-fine tabular-nums text-amber/70"
                  >
                    {p.n}
                  </span>
                  <h3 className="max-w-[28ch] text-balance font-display text-title font-extrabold uppercase leading-[1.14] text-cyan">
                    {p.title}
                  </h3>
                </div>

                <div className="min-w-0 lg:col-span-7">
                  <p className="copy max-w-[68ch]">{p.body}</p>
                </div>

                {/*
                  One finding on this page can be handed to the reader rather
                  than asserted, and this is it: the validation set that cannot
                  see the failure is also the thing choosing which checkpoint
                  ships. It belongs beside the claim it proves.

                  It spans the whole row rather than sitting in the 7-column
                  body track. The instrument is itself two columns now — plot
                  right, caption and controls left — and inside a 674px track
                  that split gave both halves under 400px, which is too narrow
                  for a plot with axis labels and too narrow for a four-figure
                  readout. Given the full width, each half is comfortable and
                  the whole thing is shorter than the stack it replaced.
                */}
                {p.n === "01" && (
                  <div className="mt-2 lg:col-span-12">
                    <MetricBlindness />
                  </div>
                )}

                {/*
                  The provenance link is its own cell, aligned to the body
                  column rather than to the page edge. It used to live inside
                  the body div, which put it above the instrument on principle
                  01 — offering the reader the way out before handing them the
                  thing to try.
                */}
                {p.from && (
                  <div className="lg:col-span-7 lg:col-start-6">
                    <Link
                      to={`/work/${p.from.slug}`}
                      className="group -mx-1 inline-flex min-h-[2.75rem] items-center gap-2 rounded-sm border-t border-amber/25 px-1 pt-4 text-fine text-amber"
                    >
                      <span className="underline decoration-amber/40 underline-offset-4 transition-colors group-hover:decoration-amber">
                        Where this came from: {p.from.section}
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2}
                        className="shrink-0 translate-y-0.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
