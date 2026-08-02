import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Axis3d, Atom, Brain, Gauge, Hand, Pause, Play } from 'lucide-react';
import { domains, type DomainKey } from '../data/domains';

const domainIcon: Record<DomainKey, typeof Axis3d> = {
  geometry: Axis3d,
  physics: Atom,
  llm: Brain,
  edge: Gauge,
};

const W = 340;
const H = 264;
const CORE = { x: W / 2, y: H / 2 };
const ORBIT = 92;
/** Keeps nodes inside the frame. */
const PAD = 40;
/** How many energy pulses can be in flight at once. */
const PULSE_POOL = 6;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Body = { x: number; y: number; vx: number; vy: number; ang: number };

function initialBodies(): Body[] {
  return domains.map((_, i) => {
    const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: CORE.x + Math.cos(a) * ORBIT,
      y: CORE.y + Math.sin(a) * ORBIT,
      vx: 0,
      vy: 0,
      ang: a,
    };
  });
}

/**
 * The expertise graph.
 *
 * The simulation writes node positions straight to the DOM rather than through
 * React state: at 60fps a state-driven version re-rendered the whole SVG on
 * every frame for the life of the page. React still owns everything that
 * changes rarely — which domain is active, colours, the readout.
 *
 * The graphic is decorative and marked aria-hidden. Everything it conveys is
 * also present as text: the tab strip names each domain, and the readout below
 * carries the description and the named skills.
 */
export default function CapabilityGraph() {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<'orbiting' | 'held' | 'dragging'>('orbiting');

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  // Auto-advance is opt-out (WCAG 2.2.2) and never starts under reduced motion.
  const [autoplay, setAutoplay] = useState(!reduced);

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const edgeRefs = useRef<(SVGPathElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const satRefs = useRef<(SVGGElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);

  const bodies = useRef<Body[]>(initialBodies());
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const pulses = useRef<number[]>([]);
  const spin = useRef(0);
  const satSpin = useRef(0);
  const heldRef = useRef(false);
  const dragIdx = useRef<number | null>(null);
  const activeRef = useRef(0);
  /** Pixel width of the plot box, cached so the icon layer never reads layout in the loop. */
  const boxWidth = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const toLocal = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return { x: ((cx - r.left) / r.width) * W, y: ((cy - r.top) / r.height) * H };
  }, []);

  /** Pushes the current simulation state into the DOM. */
  const paint = useCallback(() => {
    const B = bodies.current;
    const act = B[activeRef.current];
    const scale = boxWidth.current / W;

    for (let i = 0; i < B.length; i += 1) {
      const b = B[i];

      nodeRefs.current[i]?.setAttribute('transform', `translate(${b.x} ${b.y})`);

      const icon = iconRefs.current[i];
      if (icon && scale) {
        icon.style.transform = `translate(${b.x * scale}px, ${b.y * scale}px) translate(-50%, -50%)`;
      }

      const edge = edgeRefs.current[i];
      if (edge) {
        const mx = (CORE.x + b.x) / 2;
        const my = (CORE.y + b.y) / 2;
        const nx = -(b.y - CORE.y);
        const ny = b.x - CORE.x;
        const len = Math.hypot(nx, ny) || 1;
        const bow = Math.hypot(b.vx, b.vy) * 2.2;
        edge.setAttribute(
          'd',
          `M ${CORE.x} ${CORE.y} Q ${mx + (nx / len) * bow} ${my + (ny / len) * bow} ${b.x} ${b.y}`,
        );
      }
    }

    // Satellites ride around whichever node is active.
    for (let k = 0; k < satRefs.current.length; k += 1) {
      const sat = satRefs.current[k];
      if (!sat || !act) continue;
      const a = satSpin.current + (k / satRefs.current.length) * Math.PI * 2;
      sat.setAttribute(
        'transform',
        `translate(${act.x + Math.cos(a) * 40} ${act.y + Math.sin(a) * 40})`,
      );
    }

    for (let k = 0; k < PULSE_POOL; k += 1) {
      const el = pulseRefs.current[k];
      if (!el) continue;
      const t = pulses.current[k];
      if (t === undefined || !act) {
        el.setAttribute('opacity', '0');
        continue;
      }
      el.setAttribute('cx', String(CORE.x + (act.x - CORE.x) * t));
      el.setAttribute('cy', String(CORE.y + (act.y - CORE.y) * t));
      el.setAttribute('opacity', String(1 - t * 0.7));
    }
  }, []);

  // Cache the plot width so the loop can position the icon layer without reading layout.
  useLayoutEffect(() => {
    const box = wrapRef.current;
    if (!box) return;
    const measure = () => {
      boxWidth.current = box.getBoundingClientRect().width;
      paint();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [paint]);

  // Changing the active domain remounts the satellite markers, so repaint.
  // Under reduced motion this is the only paint that ever happens.
  useLayoutEffect(() => {
    paint();
  }, [active, paint]);

  // Auto-advance, pausable, and never running under reduced motion.
  useEffect(() => {
    if (!autoplay || reduced) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % domains.length),
      3600,
    );
    return () => window.clearInterval(id);
  }, [autoplay, reduced]);

  // The simulation. Runs only while the graph is on screen, and not at all
  // when the visitor has asked for reduced motion.
  useEffect(() => {
    if (reduced) return;
    const box = wrapRef.current;
    if (!box) return;

    let raf = 0;
    let last = 0;
    let running = false;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;

      const activeIdx = activeRef.current;
      spin.current += 0.0016 * dt * (heldRef.current ? 0.25 : 1);
      satSpin.current += 0.012 * dt;

      const B = bodies.current;
      B.forEach((b, i) => {
        if (i === dragIdx.current && pointer.current) {
          b.x = clamp(pointer.current.x, PAD, W - PAD);
          b.y = clamp(pointer.current.y, PAD, H - PAD);
          b.vx = 0;
          b.vy = 0;
          return;
        }

        // Orbital anchor, with the active node pulled out a little further.
        const a = b.ang + spin.current;
        const radius = ORBIT + (i === activeIdx ? 12 : 0);
        const ax = CORE.x + Math.cos(a) * radius;
        const ay = CORE.y + Math.sin(a) * radius;

        b.vx += (ax - b.x) * 0.014 * dt;
        b.vy += (ay - b.y) * 0.014 * dt;

        // The cursor pushes nodes aside.
        if (pointer.current && dragIdx.current === null) {
          const dx = b.x - pointer.current.x;
          const dy = b.y - pointer.current.y;
          const d = Math.hypot(dx, dy);
          if (d < 58 && d > 0.01) {
            const f = ((58 - d) / 58) * 1.5 * dt;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
          }
        }

        // Keep nodes off each other.
        B.forEach((o, j) => {
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

      pulses.current = pulses.current.map((t) => t + 0.012 * dt).filter((t) => t <= 1);
      if (pulses.current.length < PULSE_POOL && Math.random() < 0.045 * dt) {
        pulses.current.push(0);
      }

      paint();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '120px' },
    );
    io.observe(box);

    return () => {
      io.disconnect();
      stop();
    };
  }, [reduced, paint]);

  // Dragging continues outside the svg.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragIdx.current === null) return;
      const p = toLocal(e.clientX, e.clientY);
      if (p) pointer.current = p;
    };
    const up = () => {
      if (dragIdx.current === null) return;
      dragIdx.current = null;
      setStatus(heldRef.current ? 'held' : 'orbiting');
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [toLocal]);

  /** Selecting a domain by any means hands control to the visitor. */
  const select = useCallback((i: number) => {
    setActive(i);
    setAutoplay(false);
  }, []);

  const current = domains[active];

  return (
    <div
      className="card p-5 sm:p-6"
      onMouseLeave={() => {
        heldRef.current = false;
        pointer.current = null;
        if (dragIdx.current === null) setStatus('orbiting');
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="tag-sm text-amber">Expertise graph</p>
          <p className="mt-1 font-mono text-[0.6875rem] text-dim">One core · four domains it feeds</p>
        </div>
        <button
          type="button"
          onClick={() => setAutoplay((on) => !on)}
          className="inline-flex min-h-[1.75rem] items-center gap-1.5 rounded-sm border border-cyan/40 px-2.5 py-1 font-mono text-[0.6875rem] text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
        >
          {autoplay ? <Pause size={11} strokeWidth={2.2} /> : <Play size={11} strokeWidth={2.2} />}
          {autoplay ? 'Pause' : 'Play'}
        </button>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-4 aspect-[340/264] overflow-hidden rounded-sm border border-cyan/25 bg-void/50"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden
          /*
           * pan-y, not none: a vertical swipe that starts on the graph must
           * still scroll the page. Horizontal drag stays with the simulation.
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

          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={ORBIT}
            fill="none"
            stroke="rgb(var(--cyan))"
            strokeOpacity="0.14"
            strokeDasharray="2 6"
          />

          {/* Edges. The `d` attribute is owned by the simulation, not by React. */}
          {domains.map((d, i) => {
            const on = i === active;
            return (
              <path
                key={d.key}
                ref={(el) => {
                  edgeRefs.current[i] = el;
                }}
                fill="none"
                stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                strokeOpacity={on ? 0.9 : 0.32}
                strokeWidth={on ? 1.8 : 1}
                strokeDasharray={on ? undefined : '4 5'}
              />
            );
          })}

          {Array.from({ length: PULSE_POOL }).map((_, k) => (
            <circle
              key={k}
              ref={(el) => {
                pulseRefs.current[k] = el;
              }}
              r={2.6}
              opacity={0}
              fill="rgb(var(--amber))"
            />
          ))}

          {/* Satellite markers for the active domain's skills. The names
              themselves are rendered as text in the readout below. */}
          {current.skills.map((s, k) => (
            <g
              key={s}
              ref={(el) => {
                satRefs.current[k] = el;
              }}
            >
              <circle r="2.4" fill="rgb(var(--amber))" opacity="0.85" />
            </g>
          ))}

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
            y={CORE.y + 3}
            textAnchor="middle"
            fill="rgb(var(--amber))"
            fontSize="13"
            fontFamily="Funnel Display, sans-serif"
            fontWeight="700"
          >
            Maths
          </text>

          {domains.map((d, i) => {
            const on = i === active;
            return (
              <g
                key={d.key}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="cursor-grab"
                onPointerDown={(e) => {
                  e.preventDefault();
                  const p = toLocal(e.clientX, e.clientY);
                  if (p) pointer.current = p;
                  select(i);
                  heldRef.current = true;
                  dragIdx.current = i;
                  setStatus('dragging');
                }}
                onMouseEnter={() => {
                  select(i);
                  heldRef.current = true;
                  setStatus('held');
                }}
              >
                <circle
                  r={on ? 25 : 20}
                  fill={on ? 'rgb(var(--amber))' : 'rgb(var(--deep))'}
                  stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                  strokeOpacity={on ? 1 : 0.55}
                  strokeWidth="1.4"
                />
              </g>
            );
          })}
        </svg>

        {/* Icons ride on top so the lucide strokes stay crisp. Positioned by
            transform only, so the loop never triggers layout. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {domains.map((d, i) => {
            const Icon = domainIcon[d.key];
            const on = i === active;
            return (
              <span
                key={d.key}
                ref={(el) => {
                  iconRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 will-change-transform"
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

        <p
          className="pointer-events-none absolute bottom-2 right-2.5 flex items-center gap-1.5 font-mono text-[0.6875rem] text-dim"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          {status}
        </p>
      </div>

      <p className="mt-2.5 hidden items-center gap-1.5 font-mono text-[0.6875rem] text-dim sm:flex">
        <Hand size={11} strokeWidth={2} />
        hover to hold · drag a node · it springs back
      </p>

      {/* The graph's information, as text. This is the accessible interface. */}
      <div
        role="tablist"
        aria-label="Capability domains"
        className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
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
            className={`min-h-[2rem] rounded-sm border px-2 py-1.5 font-mono text-[0.6875rem] transition-colors duration-300 ${
              i === active
                ? 'border-amber bg-amber/15 text-amber'
                : 'border-cyan/30 text-cyan/70 hover:border-amber/60 hover:text-amber'
            }`}
          >
            {d.short}
          </button>
        ))}
      </div>

      <div
        id="domain-readout"
        role="tabpanel"
        aria-labelledby={`domain-tab-${current.key}`}
        className="mt-4"
      >
        <p className="font-display text-[1.0625rem] font-bold text-amber">{current.label}</p>
        <p className="mt-2 copy-sm">{current.blurb}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {current.skills.map((s) => (
            <li
              key={s}
              className="rounded-sm border border-cyan/25 bg-panel/60 px-2 py-1 font-mono text-[0.6875rem] text-cyan/80"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
