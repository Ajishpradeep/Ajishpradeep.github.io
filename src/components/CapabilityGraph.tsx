import { useCallback, useMemo, useState } from 'react';
import { domains } from '../data/domains';
import PipelineScene from './PipelineScene';

/**
 * The hero panel: what the work is, above the four domains it draws on.
 *
 * The visual used to be a force-simulated capability graph — four icons
 * orbiting the word "Maths" on a dashed ring. It was the least specific thing
 * on the site: swap the four labels and it fits any consultancy. It has been
 * replaced by `PipelineScene`, which draws the actual method.
 *
 * The tab strip and readout below are unchanged, and remain the accessible
 * interface: every domain is named in text, with its description and its named
 * skills, whether or not the scene above renders at all.
 */
export default function CapabilityGraph() {
  const [active, setActive] = useState(0);

  const still = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const select = useCallback((i: number) => setActive(i), []);
  const current = domains[active];

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lead font-bold leading-tight text-cyan">
            Two views, one 3D point
          </p>
          <p className="mt-1 font-text text-fine text-dim">
            The method, not a diagram of it
          </p>
        </div>
      </div>

      <div className="mt-4">
        <PipelineScene still={still} />
      </div>

      <p className="mt-3 font-text text-fine text-dim">
        Depth is recovered from the geometry between calibrated views. The bones never
        change length while it turns — that constraint is in the model, not in a loss term.
      </p>

      {/* The graph's information, as text. This is the accessible interface. */}
      <div
        role="tablist"
        aria-label="Capability domains"
        className="mt-5 grid auto-rows-fr grid-cols-2 gap-1.5"
      >
        {domains.map((d, i) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            id={`domain-tab-${d.key}`}
            aria-selected={i === active}
            aria-controls="domain-readout"
            onClick={() => select(i)}
            className={`min-h-[2.75rem] rounded-sm border px-2 py-1.5 font-mono text-micro leading-tight transition-colors duration-300 ${
              i === active
                ? 'border-amber bg-amber/15 text-amber'
                : 'border-cyan/30 text-cyan/70 hover:border-amber/60 hover:text-amber'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div
        id="domain-readout"
        role="tabpanel"
        aria-labelledby={`domain-tab-${current.key}`}
        className="mt-4"
      >
        <p className="font-display text-lead font-bold text-amber">{current.label}</p>
        <p className="copy-sm mt-2">{current.blurb}</p>
        <ul className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-fine text-cyan/70">
          {current.skills.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              {i > 0 && <span className="text-cyan/30">·</span>}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
