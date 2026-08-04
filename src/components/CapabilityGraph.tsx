import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Axis3d, Atom, Brain, Gauge, Hand } from 'lucide-react';

type Domain = {
  key: string;
  label: string;
  short: string;
  icon: typeof Axis3d;
  blurb: string;
  skills: string[];
};

const domains: Domain[] = [
  {
    key: 'geometry',
    label: 'Multi-view geometry',
    short: 'Geometry',
    icon: Axis3d,
    blurb:
      'Recovering metric 3D from uncalibrated cameras — and knowing when the result is only correct up to an unknown scale.',
    skills: ['Calibration', 'Triangulation', '2D→3D lifting', 'Scale anchoring'],
  },
  {
    key: 'physics',
    label: 'Physics-infused models',
    short: 'Physics',
    icon: Atom,
    blurb:
      'Physical law compiled into the network and the solver, so impossible outputs are unrepresentable rather than merely penalised.',
    skills: ['Bone-length', 'ROM priors', 'IK solvers', 'Temporal continuity'],
  },
  {
    key: 'llm',
    label: 'Agentic LLM systems',
    short: 'Agentic LLMs',
    icon: Brain,
    blurb:
      'Domain grounding where a confident wrong number causes real harm — deterministic computation, generated narration, and evaluation that tells them apart.',
    skills: ['Grounding', 'Tool use', 'Fine-tuning', 'Evaluation'],
  },
  {
    key: 'edge',
    label: 'Edge inference',
    short: 'Edge',
    icon: Gauge,
    blurb:
      'Making capable models cheap enough to run where they have to run — on the device, in real time, with no network.',
    skills: ['CoreML', 'TensorRT', 'Quantisation', 'ARM'],
  },
];

const W = 340;
const H = 264;
const CORE = { x: W / 2, y: H / 2 };
const ORBIT = 92;
/** Keeps nodes and their satellite labels inside the frame. */
const PAD = 44;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ang: number;
};

export default function CapabilityGraph() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [, tick] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const pulses = useRef<number[]>([]);
  const spin = useRef(0);
  const satSpin = useRef(0);

  const bodies = useRef<Body[]>(
    domains.map((_, i) => {
      const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: CORE.x + Math.cos(a) * ORBIT,
        y: CORE.y + Math.sin(a) * ORBIT,
        vx: 0,
        vy: 0,
        ang: a,
      };
    }),
  );

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const toLocal = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return { x: ((cx - r.left) / r.width) * W, y: ((cy - r.top) / r.height) * H };
  }, []);

  // cycle the selection while nobody is interacting
  useEffect(() => {
    if (held || reduced) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % domains.length), 3600);
    return () => window.clearInterval(id);
  }, [held, reduced]);

  // the simulation
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;

      spin.current += 0.0016 * dt * (held ? 0.25 : 1);
      satSpin.current += 0.012 * dt;

      bodies.current.forEach((b, i) => {
        if (i === dragIdx && pointer.current) {
          b.x = clamp(pointer.current.x, PAD, W - PAD);
          b.y = clamp(pointer.current.y, PAD, H - PAD);
          b.vx = 0;
          b.vy = 0;
          return;
        }

        // orbital anchor, with the active node pulled out a little further
        const a = b.ang + spin.current;
        const radius = ORBIT + (i === active ? 12 : 0);
        const ax = CORE.x + Math.cos(a) * radius;
        const ay = CORE.y + Math.sin(a) * radius;

        // spring toward the anchor
        b.vx += (ax - b.x) * 0.014 * dt;
        b.vy += (ay - b.y) * 0.014 * dt;

        // the cursor pushes nodes aside
        if (pointer.current && dragIdx === null) {
          const dx = b.x - pointer.current.x;
          const dy = b.y - pointer.current.y;
          const d = Math.hypot(dx, dy);
          if (d < 58 && d > 0.01) {
            const f = ((58 - d) / 58) * 1.5 * dt;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
          }
        }

        // keep nodes off each other
        bodies.current.forEach((o, j) => {
          if (i === j) return;
          const dx = b.x - o.x;
          const dy = b.y - o.y;
          const d = Math.hypot(dx, dy);
          if (d < 56 && d > 0.01) {
            const f = ((56 - d) / 56) * 0.5 * dt;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
          }
        });

        b.vx *= 0.9;
        b.vy *= 0.9;
        b.x = clamp(b.x + b.vx * dt, PAD, W - PAD);
        b.y = clamp(b.y + b.vy * dt, PAD, H - PAD);
      });

      // energy travelling core → active node
      pulses.current = pulses.current.map((t) => t + 0.012 * dt).filter((t) => t <= 1);
      if (Math.random() < 0.045 * dt) pulses.current.push(0);

      tick((n) => (n + 1) % 100000);
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, dragIdx, held, reduced]);

  // dragging continues outside the svg
  useEffect(() => {
    if (dragIdx === null) return;
    const move = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      if (p) pointer.current = p;
    };
    const up = () => setDragIdx(null);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragIdx, toLocal]);

  const current = domains[active];
  const B = bodies.current;
  const act = B[active];

  return (
    <div
      className="card p-5 sm:p-6"
      onMouseLeave={() => {
        setHeld(false);
        pointer.current = null;
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="tag-sm text-amber">Expertise graph</p>
          <p className="mt-1 font-mono text-[0.625rem] text-dim">
            One core · four domains it feeds
          </p>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber blink" />
          <span className="font-mono text-[0.625rem] text-dim">
            {dragIdx !== null ? 'dragging' : held ? 'held' : 'orbiting'}
          </span>
        </span>
      </div>

      <div className="relative mt-4 aspect-[340/264] overflow-hidden rounded-sm border border-cyan/15 bg-void/50">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full touch-none select-none"
          onPointerMove={(e) => {
            const p = toLocal(e.clientX, e.clientY);
            if (p) pointer.current = p;
          }}
          onPointerLeave={() => {
            pointer.current = null;
          }}
        >
          <defs>
            <radialGradient id="coreGlow">
              <stop offset="0%" stopColor="rgb(var(--amber))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(var(--amber))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* orbit ring */}
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={ORBIT}
            fill="none"
            stroke="rgb(var(--cyan))"
            strokeOpacity="0.08"
            strokeDasharray="2 6"
          />

          {/* edges — bowed by how far each node has been displaced */}
          {B.map((b, i) => {
            const on = i === active;
            const mx = (CORE.x + b.x) / 2;
            const my = (CORE.y + b.y) / 2;
            const nx = -(b.y - CORE.y);
            const ny = b.x - CORE.x;
            const len = Math.hypot(nx, ny) || 1;
            const bow = Math.hypot(b.vx, b.vy) * 2.2;
            return (
              <path
                key={domains[i].key}
                d={`M ${CORE.x} ${CORE.y} Q ${mx + (nx / len) * bow} ${my + (ny / len) * bow} ${b.x} ${b.y}`}
                fill="none"
                stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                strokeOpacity={on ? 0.9 : 0.18}
                strokeWidth={on ? 1.8 : 1}
                strokeDasharray={on ? undefined : '4 5'}
              />
            );
          })}

          {/* energy pulses along the active edge */}
          {act &&
            pulses.current.map((t, k) => {
              const px = CORE.x + (act.x - CORE.x) * t;
              const py = CORE.y + (act.y - CORE.y) * t;
              return (
                <circle
                  key={k}
                  cx={px}
                  cy={py}
                  r={2.6}
                  fill="rgb(var(--amber))"
                  opacity={1 - t * 0.7}
                />
              );
            })}

          {/* satellites: the skills under the active domain */}
          {act &&
            current.skills.map((s, k) => {
              const a = satSpin.current + (k / current.skills.length) * Math.PI * 2;
              const sx = act.x + Math.cos(a) * 40;
              const sy = act.y + Math.sin(a) * 40;
              return (
                <g key={s}>
                  <line
                    x1={act.x}
                    y1={act.y}
                    x2={sx}
                    y2={sy}
                    stroke="rgb(var(--amber))"
                    strokeOpacity="0.22"
                  />
                  <circle cx={sx} cy={sy} r="2.4" fill="rgb(var(--amber))" opacity="0.85" />
                  <text
                    x={sx}
                    y={sy - 6}
                    textAnchor="middle"
                    fill="rgb(var(--amber))"
                    fillOpacity="0.8"
                    fontSize="7"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {s}
                  </text>
                </g>
              );
            })}

          {/* core */}
          <circle cx={CORE.x} cy={CORE.y} r="52" fill="url(#coreGlow)" />
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r="30"
            fill="rgb(var(--panel))"
            stroke="rgb(var(--amber))"
            strokeWidth="1.4"
          />
          <text
            x={CORE.x}
            y={CORE.y - 2}
            textAnchor="middle"
            fill="rgb(var(--amber))"
            fontSize="12"
            fontFamily="Funnel Display, sans-serif"
            fontWeight="700"
          >
            Maths
          </text>
          <text
            x={CORE.x}
            y={CORE.y + 11}
            textAnchor="middle"
            fill="rgb(var(--dim))"
            fontSize="7.5"
            fontFamily="JetBrains Mono, monospace"
          >
            core
          </text>

          {/* domain nodes */}
          {B.map((b, i) => {
            const on = i === active;
            return (
              <g
                key={domains[i].key}
                className="cursor-grab"
                onPointerDown={(e) => {
                  e.preventDefault();
                  const p = toLocal(e.clientX, e.clientY);
                  if (p) pointer.current = p;
                  setActive(i);
                  setHeld(true);
                  setDragIdx(i);
                }}
                onMouseEnter={() => {
                  setActive(i);
                  setHeld(true);
                }}
              >
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={on ? 25 : 20}
                  fill={on ? 'rgb(var(--amber))' : 'rgb(var(--deep))'}
                  stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                  strokeOpacity={on ? 1 : 0.4}
                  strokeWidth="1.4"
                />
                <text
                  x={b.x}
                  y={b.y + (on ? 40 : 34)}
                  textAnchor="middle"
                  fill={on ? 'rgb(var(--amber))' : 'rgb(var(--dim))'}
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {domains[i].short}
                </text>
              </g>
            );
          })}
        </svg>

        {/* icons ride on top so the lucide strokes stay crisp */}
        <div className="pointer-events-none absolute inset-0">
          {B.map((b, i) => {
            const Icon = domains[i].icon;
            const on = i === active;
            return (
              <span
                key={domains[i].key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(b.x / W) * 100}%`, top: `${(b.y / H) * 100}%` }}
              >
                <Icon
                  size={on ? 22 : 18}
                  strokeWidth={1.8}
                  className={on ? 'text-void' : 'text-cyan/70'}
                />
              </span>
            );
          })}
        </div>

      </div>

      <p className="mt-2.5 flex items-center gap-1.5 font-mono text-[0.625rem] text-dim">
        <Hand size={11} strokeWidth={2} />
        hover to hold · drag a node · it springs back
      </p>

      {/* readout */}
      <div key={current.key} className="mt-4 animate-[fadeUp_0.5s_ease-out]">
        <p className="font-display text-[1.0625rem] font-bold text-amber">{current.label}</p>
        <p className="mt-2 copy-sm">{current.blurb}</p>
      </div>

      <div className="mt-4 flex gap-1.5">
        {domains.map((d, i) => (
          <button
            key={d.key}
            type="button"
            aria-label={d.label}
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
