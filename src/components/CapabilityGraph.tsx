import { useEffect, useState } from 'react';
import { Axis3d, Atom, Brain, Gauge } from 'lucide-react';

type Node = {
  key: string;
  label: string;
  short: string;
  x: number;
  y: number;
  icon: typeof Axis3d;
  blurb: string;
  skills: string[];
};

/**
 * The expertise as a graph: a mathematical core, and the four domains it feeds.
 * Selecting a domain lights the edge back to the core and lists what sits under it.
 */
const CORE = { x: 170, y: 128 };

const nodes: Node[] = [
  {
    key: 'geometry',
    label: 'Multi-view geometry',
    short: 'Geometry',
    x: 56,
    y: 52,
    icon: Axis3d,
    blurb:
      'Recovering metric 3D from uncalibrated cameras — and knowing when the result is only correct up to an unknown scale.',
    skills: ['Camera calibration', 'Triangulation', '2D→3D lifting', 'Scale anchoring'],
  },
  {
    key: 'physics',
    label: 'Physics-infused models',
    short: 'Physics priors',
    x: 284,
    y: 52,
    icon: Atom,
    blurb:
      'Anatomical and physical law compiled into the network and the solver, so impossible outputs are unrepresentable rather than merely penalised.',
    skills: ['Bone-length constraints', 'Range-of-motion priors', 'IK solvers', 'Temporal continuity'],
  },
  {
    key: 'llm',
    label: 'Agentic LLM systems',
    short: 'Agentic LLMs',
    x: 56,
    y: 204,
    icon: Brain,
    blurb:
      'Domain grounding where a confident wrong number causes real harm — deterministic computation, generated narration, and an evaluation design that can tell them apart.',
    skills: ['Structured grounding', 'Tool use', 'Fine-tuning', 'Evaluation design'],
  },
  {
    key: 'edge',
    label: 'Edge inference',
    short: 'Edge inference',
    x: 284,
    y: 204,
    icon: Gauge,
    blurb:
      'Making capable models cheap enough to run where they have to run — on the device, in real time, with no network.',
    skills: ['CoreML', 'TensorRT', 'Quantisation', 'ARM deployment'],
  },
];

export default function CapabilityGraph() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % nodes.length), 3200);
    return () => window.clearInterval(id);
  }, [held]);

  const current = nodes[active];

  return (
    <div className="card p-5 sm:p-6" onMouseLeave={() => setHeld(false)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="tag-sm text-amber">Expertise graph</p>
          <p className="mt-1 font-mono text-[0.625rem] text-dim">
            One core · four domains it feeds
          </p>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber blink" />
          <span className="font-mono text-[0.625rem] text-dim">{held ? 'held' : 'cycling'}</span>
        </span>
      </div>

      <div className="relative mt-4 aspect-[340/256] rounded-sm border border-cyan/15 bg-void/50">
        <svg viewBox="0 0 340 256" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* edges */}
          {nodes.map((n, i) => {
            const on = i === active;
            return (
              <line
                key={n.key}
                x1={CORE.x}
                y1={CORE.y}
                x2={n.x}
                y2={n.y}
                stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                strokeOpacity={on ? 0.95 : 0.2}
                strokeWidth={on ? 2 : 1}
                strokeDasharray="5 4"
                className={on ? 'drift' : undefined}
              />
            );
          })}

          {/* core */}
          <circle cx={CORE.x} cy={CORE.y} r="34" fill="rgb(var(--panel))" stroke="rgb(var(--amber))" strokeWidth="1.4" />
          <circle cx={CORE.x} cy={CORE.y} r="34" fill="none" stroke="rgb(var(--amber))" strokeOpacity="0.4" strokeWidth="1" className="pulse-ring" style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }} />
          <text x={CORE.x} y={CORE.y - 3} textAnchor="middle" fill="rgb(var(--amber))" fontSize="12" fontFamily="Funnel Display, sans-serif" fontWeight="700">
            Maths
          </text>
          <text x={CORE.x} y={CORE.y + 12} textAnchor="middle" fill="rgb(var(--dim))" fontSize="8" fontFamily="JetBrains Mono, monospace">
            core
          </text>

          {/* domain nodes */}
          {nodes.map((n, i) => {
            const on = i === active;
            return (
              <g
                key={n.key}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setActive(i);
                  setHeld(true);
                }}
                onClick={() => {
                  setActive(i);
                  setHeld(true);
                }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="26"
                  fill={on ? 'rgb(var(--amber))' : 'rgb(var(--deep))'}
                  stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                  strokeOpacity={on ? 1 : 0.35}
                  strokeWidth="1.4"
                  className="transition-all duration-500"
                />
                <text
                  x={n.x}
                  y={n.y + (n.y < 128 ? -34 : 42)}
                  textAnchor="middle"
                  fill={on ? 'rgb(var(--amber))' : 'rgb(var(--dim))'}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {n.short}
                </text>
              </g>
            );
          })}
        </svg>

        {/* icons overlay the svg; the shared aspect ratio keeps them pinned to their nodes */}
        <div className="pointer-events-none absolute inset-0">
          {nodes.map((n, i) => {
            const Icon = n.icon;
            const on = i === active;
            return (
              <span
                key={n.key}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${(n.x / 340) * 100}%`, top: `${(n.y / 256) * 100}%` }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className={on ? 'text-void' : 'text-cyan/70'}
                />
              </span>
            );
          })}
        </div>
      </div>

      {/* readout */}
      <div key={current.key} className="mt-4 animate-[fadeUp_0.5s_ease-out]">
        <p className="font-display text-[1.0625rem] font-bold text-amber">{current.label}</p>
        <p className="mt-2 copy-sm">{current.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {current.skills.map((s) => (
            <span
              key={s}
              className="rounded-sm bg-panel/60 px-2 py-1 font-mono text-[0.625rem] text-cyan/75"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-1.5">
        {nodes.map((n, i) => (
          <button
            key={n.key}
            type="button"
            aria-label={n.label}
            onClick={() => {
              setActive(i);
              setHeld(true);
            }}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
              i === active ? 'bg-amber' : 'bg-cyan/15 hover:bg-cyan/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
