import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Axis3d, Atom, Brain, Gauge, Hand, Pause, Play } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
      'Making capable models cheap enough to run where they have to run — on the device, with no network and no data leaving it.',
    skills: ['CoreML', 'TensorRT', 'Quantisation', 'ARM'],
  },
];

const W = 340;
const H = 264;
const CORE = { x: W / 2, y: H / 2 };
const ORBIT = 92;
/** Keeps nodes and their satellite labels inside the frame. */
const PAD = 44;

/*
  THE RESTING LAYOUT, for `prefers-reduced-motion`.

  There was no resting layout. The simulation simply never started, which left
  the nodes frozen at their seed angles — 12, 3, 6 and 9 o'clock — and that is
  the one arrangement where the geometry breaks. The 6 o'clock node sits at
  y=224 and its label is drawn 40px below it, at y=264: exactly the frame edge,
  clipped. The satellite ring around the 12 o'clock node reaches y=0 for the
  same reason. Nothing was wrong with the maths; the seed angles were chosen for
  a picture that was always supposed to be rotating past them.

  Rotating the layout 45° and pulling the orbit in puts every node, every label
  and every satellite inside the frame with the ring still legible. The
  satellites get a matching 45° base so they never stack on the core.
*/
const REST_ORBIT = 80;
const REST_ROTATION = Math.PI / 4;
const SAT_ORBIT = 40;

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

  /*
    The hook, not an inline `matchMedia` sampled once at mount — this now
    tracks a visitor who changes the setting mid-session, and the resting
    layout below swaps with it.
  */
  const still = useReducedMotion();

  /*
    Autoplay is a real feature here: four domains introduce themselves without
    the visitor having to discover that the graph is interactive. It is also
    auto-updating content, which WCAG 2.2.2 (Level A) requires a mechanism to
    stop. It previously had none — `held` paused it on hover, and hover does
    not exist on a touch screen.

    So it keeps the autoplay and gains a real control: a labelled pause button,
    and any deliberate selection stops the cycle for good, because a visitor
    who has chosen a domain is reading it and should not have it swapped out.
  */
  const [playing, setPlaying] = useState(true);

  const choose = useCallback((i: number) => {
    setActive(i);
    setPlaying(false);
  }, []);

  const restBodies = useMemo<Body[]>(
    () =>
      domains.map((_, i) => {
        const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2 + REST_ROTATION;
        return {
          x: CORE.x + Math.cos(a) * REST_ORBIT,
          y: CORE.y + Math.sin(a) * REST_ORBIT,
          vx: 0,
          vy: 0,
          ang: a,
        };
      }),
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
    if (!playing || held || still) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % domains.length), 3600);
    return () => window.clearInterval(id);
  }, [playing, held, still]);

  // the simulation
  useEffect(() => {
    if (still) return;
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
  }, [active, dragIdx, held, still]);

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
  /* One source of positions: the solver's when it runs, the resting layout when it does not. */
  const B = still ? restBodies : bodies.current;
  const act = B[active];
  const satBase = still ? REST_ROTATION : satSpin.current;

  const status = still
    ? 'static'
    : dragIdx !== null
      ? 'dragging'
      : held
        ? 'held'
        : playing
          ? 'orbiting'
          : 'paused';

  return (
    <div
      className="card p-5 sm:p-6"
      onMouseLeave={() => {
        setHeld(false);
        pointer.current = null;
      }}
    >
      {/*
        Panel typography, brought onto the site's scale. This header was a
        10px uppercase mono label over a 10px mono line — two sizes that exist
        nowhere else on the page, in a family the rest of the site reserves for
        figures and measurements. It reads like a heading now, in the display
        face, at the same rank as every other panel title. The graphic below is
        untouched.
      */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lead font-bold leading-tight text-cyan">
            Expertise graph
          </p>
          <p className="mt-1 font-text text-fine text-dim">One core · four domains it feeds</p>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-micro text-dim">{status}</span>
          {/*
            The pause control WCAG 2.2.2 requires. Hidden under reduced motion,
            where there is nothing cycling to pause and the button would be a
            control for a state that cannot occur.
          */}
          {!still && (
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? 'Pause the domain cycle' : 'Cycle through the domains'}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-cyan/30 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              {playing ? (
                <Pause size={13} strokeWidth={2} />
              ) : (
                <Play size={13} strokeWidth={2} />
              )}
            </button>
          )}
        </span>
      </div>

      <div className="relative mt-4 aspect-[340/264] overflow-hidden rounded-sm border border-cyan/15 bg-void/50">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          /*
            pan-y, not none. `touch-none` meant a vertical swipe that began on
            the graph stopped the page scrolling — and this sits in the hero,
            so on a phone it read as the whole site freezing. ConstraintLab had
            already hit this and fixed it; the fix was never carried across.
          */
          className="absolute inset-0 h-full w-full select-none [touch-action:pan-y]"
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

          {/*
            Satellites: how many skills sit under the active domain, not which.

            They used to carry 7px mono labels. Four of them ring a node of
            radius 25 at radius 40, which leaves 15px for a word — so
            "Triangulation" ran under the node, "Calibration" landed on the
            node's own caption, and "Scale anchoring" left the frame. They were
            unreadable at that size even when they did not collide.

            The readout below already names all four as real text at a real
            size, which is where a reader actually reads them. What the graphic
            is good at is showing that the domain has depth and how much; the
            dots do that on their own.
          */}
          {act &&
            current.skills.map((s, k) => {
              const a = satBase + (k / current.skills.length) * Math.PI * 2;
              const sx = act.x + Math.cos(a) * SAT_ORBIT;
              const sy = act.y + Math.sin(a) * SAT_ORBIT;
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
                  choose(i);
                  setHeld(true);
                  if (!still) setDragIdx(i);
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
                  /* The active node is r=25, so 40 left the caption touching it. */
                  y={b.y + (on ? 45 : 34)}
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

      {/*
        The hint said "hover to hold · drag a node · it springs back" in every
        condition — including reduced motion, where the loop that moves the
        nodes never runs, so dragging did nothing at all. Documentation for
        behaviour the build does not have is worse than no documentation.
      */}
      <p className="mt-3 flex items-start gap-2 font-mono text-micro text-dim">
        <Hand size={13} strokeWidth={2} className="mt-0.5 shrink-0" />
        {still ? 'select a domain below' : 'hover to hold · drag a node · it springs back'}
      </p>

      {/*
        The readout. It carried a heading and one sentence; the skills it names
        only existed as 8px labels orbiting inside the graphic, where they are
        unreadable and gone the moment the selection changes. They are text now,
        so the panel explains itself whether or not the simulation is running.
      */}
      <div key={current.key} className="mt-5 animate-[fadeUp_0.5s_ease-out] border-t border-cyan/20 pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-lead font-bold leading-tight text-amber">
            {current.label}
          </p>
          <p className="tag-sm shrink-0 text-dim">
            {String(active + 1).padStart(2, '0')} / {String(domains.length).padStart(2, '0')}
          </p>
        </div>

        <p className="copy-sm mt-2.5">{current.blurb}</p>

        <ul className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-fine text-cyan/70">
          {current.skills.map((sk, k) => (
            <li key={sk} className="flex items-center gap-2">
              {sk}
              {k < current.skills.length - 1 && <span className="text-cyan/30">·</span>}
            </li>
          ))}
        </ul>
      </div>

      {/*
        The hairline selector. The bar stays a hairline; the button around it
        grew a real hit area, because a 2px-tall target is not one.
      */}
      <div className="mt-5 flex gap-1.5">
        {domains.map((d, i) => (
          <button
            key={d.key}
            type="button"
            aria-label={d.label}
            aria-pressed={i === active}
            onClick={() => choose(i)}
            className="group flex flex-1 items-center py-3"
          >
            <span
              className={`h-0.5 w-full rounded-full transition-colors duration-500 ${
                i === active ? 'bg-amber' : 'bg-cyan/15 group-hover:bg-cyan/40'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
