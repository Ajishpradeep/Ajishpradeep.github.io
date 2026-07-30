import { useEffect, useState } from 'react';
import { Camera, ScanSearch, Boxes, ShieldCheck, MessageSquareText } from 'lucide-react';

type Stage = {
  key: string;
  label: string;
  icon: typeof Camera;
  stat: string;
  statLabel: string;
  note: string;
};

/** The real pipeline, stage by stage — two cameras in, coaching out. */
const stages: Stage[] = [
  {
    key: 'capture',
    label: 'Capture',
    icon: Camera,
    stat: '2 cam',
    statLabel: 'synchronised',
    note: 'Two consumer cameras, frame-synchronised. No mocap suit, no markers.',
  },
  {
    key: 'detect',
    label: 'Detect',
    icon: ScanSearch,
    stat: '29',
    statLabel: 'keypoints',
    note: '24 body joints plus 5 club points — the club branch trained without touching the body model.',
  },
  {
    key: 'lift',
    label: 'Lift to 3D',
    icon: Boxes,
    stat: '3.0cm',
    statLabel: 'mean error',
    note: 'Multi-view geometry and temporal consistency turn 2D detections into metric 3D.',
  },
  {
    key: 'ground',
    label: 'Ground',
    icon: ShieldCheck,
    stat: '69',
    statLabel: 'rules',
    note: 'A deterministic rule engine scores the motion. Every number is computed, never generated.',
  },
  {
    key: 'coach',
    label: 'Coach',
    icon: MessageSquareText,
    stat: '8',
    statLabel: 'languages',
    note: 'The model narrates the verdicts it was given, and cites the rule each one came from.',
  },
];

export default function PipelineViz() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Walks the pipeline on its own until someone takes over.
  useEffect(() => {
    if (pinned) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % stages.length), 2600);
    return () => window.clearInterval(id);
  }, [pinned]);

  const current = stages[active];

  return (
    <div
      className="card relative p-5 sm:p-6"
      onMouseLeave={() => setPinned(false)}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <p className="tag-sm text-amber">Pipeline</p>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber blink" />
          <span className="font-mono text-[0.625rem] text-dim">
            {pinned ? 'held' : 'running'}
          </span>
        </span>
      </div>

      {/* stage chain */}
      <ul className="mt-6 flex items-start justify-between gap-1">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const on = i === active;
          const done = i < active;
          return (
            <li key={s.key} className="relative flex flex-1 flex-col items-center">
              {/* connector to the next node */}
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[22px] h-px w-full overflow-hidden"
                >
                  <span
                    className={`block h-px w-full transition-colors duration-500 ${
                      done ? 'bg-amber/70' : 'bg-cyan/20'
                    }`}
                  />
                  {on && (
                    <span className="sweep absolute inset-y-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-amber to-transparent" />
                  )}
                </span>
              )}

              <button
                type="button"
                onMouseEnter={() => {
                  setActive(i);
                  setPinned(true);
                }}
                onFocus={() => {
                  setActive(i);
                  setPinned(true);
                }}
                onClick={() => {
                  setActive(i);
                  setPinned(true);
                }}
                aria-label={s.label}
                aria-current={on}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-sm border transition-all duration-500 ${
                    on
                      ? 'scale-110 border-amber bg-amber text-void'
                      : done
                        ? 'border-amber/50 bg-panel/70 text-amber'
                        : 'border-cyan/25 bg-deep text-cyan/60'
                  }`}
                >
                  {on && (
                    <span className="pulse-ring absolute inset-0 rounded-sm border border-amber" />
                  )}
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <span
                  className={`text-center font-mono text-[0.5625rem] uppercase leading-tight transition-colors duration-300 sm:text-[0.625rem] ${
                    on ? 'text-amber' : 'text-dim'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* readout for the active stage */}
      <div className="mt-6 min-h-[7.5rem] rounded-sm border border-cyan/15 bg-void/50 p-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-[1.6rem] font-bold leading-none text-amber">
            {current.stat}
          </span>
          <span className="font-mono text-[0.625rem] uppercase text-dim">
            {current.statLabel}
          </span>
        </div>
        <p key={current.key} className="mt-3 copy-sm animate-[fadeUp_0.5s_ease-out]">
          {current.note}
        </p>
      </div>

      {/* progress ticks */}
      <div className="mt-4 flex gap-1.5">
        {stages.map((s, i) => (
          <span
            key={s.key}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
              i === active ? 'bg-amber' : 'bg-cyan/15'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
