import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Axis3d, Atom, Brain, Gauge, Pause, Play } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * One phrase of the blurb is set in amber — the clause that carries the actual
 * claim, rather than the sentence that frames it. Split at the data layer and
 * not with markup in a template string, because the emphasis is a property of
 * the copy and a translator has to be able to move it.
 */
type Blurb = { before: string; mark: string; after: string };

type Domain = {
  key: string;
  label: string;
  short: string;
  icon: typeof Axis3d;
  /** Degrees clockwise from three o'clock. See THE LAYOUT below. */
  deg: number;
  blurb: Blurb;
  /**
   * The receipt. Every capability here points at a case study that demonstrates
   * it — the site's own rule, applied to the one panel that was previously
   * asserting range without evidence.
   */
  proof: { slug: string; label: string };
};

const domains: Domain[] = [
  {
    key: 'geometry',
    label: 'Multi-view geometry',
    short: 'Geometry',
    icon: Axis3d,
    deg: 315,
    blurb: {
      before: 'Recovering metric 3D from uncalibrated cameras, and knowing when a reconstruction is ',
      mark: 'only correct up to an unknown scale',
      after: ' — self-consistent, plausible, and wrong in absolute units.',
    },
    proof: { slug: 'reconstruction-infrastructure', label: 'Multi-camera reconstruction' },
  },
  {
    key: 'physics',
    label: 'Physics-infused models',
    short: 'Physics',
    icon: Atom,
    deg: 45,
    blurb: {
      before:
        'Bone lengths, joint limits and temporal continuity compiled into the network and the solver, so an ',
      mark: 'impossible pose is unrepresentable',
      after: ' rather than merely penalised by a loss.',
    },
    proof: { slug: 'markerless-3d-motion', label: 'Markerless 3D motion capture' },
  },
  {
    key: 'llm',
    label: 'Agentic LLM systems',
    short: 'Agentic',
    icon: Brain,
    deg: 225,
    blurb: {
      before: 'Grounding for domains where a confidently wrong number does real harm — ',
      mark: 'every figure computed deterministically',
      after: ', the model held to narration, and evaluation that tells them apart.',
    },
    proof: { slug: 'agentic-coaching-llm', label: 'Agentic coaching system' },
  },
  {
    key: 'edge',
    label: 'Edge inference',
    short: 'Edge',
    icon: Gauge,
    deg: 135,
    blurb: {
      before: 'Making capable models cheap enough to run where they have to run — ',
      mark: 'on the device, at frame rate',
      after: ', with no network dependency and nothing leaving the hardware.',
    },
    proof: { slug: 'planogram-vision-ai', label: 'Retail vision at store scale' },
  },
];

/*
  THE SKILLS, AND THE FOUR THAT BELONG TO TWO DOMAINS AT ONCE.

  The cross-links are why this is a link graph and not the orbit it replaced. An
  orbit says "one core, four domains" — true, and already said in a sentence.
  What it could not draw is the part that is actually unusual: that moving from
  generative models to retail vision to 3D biomechanics to agentic systems did
  not mean starting over, because the same techniques kept doing work on the
  other side.

  Every one of the four is something the case studies show:

    Scale anchoring       geometry ↔ physics
                          Metric scale is fixed by an anatomical prior — 204
                          bone measurements validated against published
                          anthropometric data.

    Temporal continuity   physics ↔ edge
                          Club telescoping resisted every training fix and was
                          solved at inference by a tracker enforcing shaft-length
                          consistency, in the deployed runtime, on the device.

    Grounding             geometry ↔ agentic
                          The coaching system's 69 deterministic rules run on
                          biomechanics the geometry stack produced.

    Evaluation            agentic ↔ physics
                          The site's own thesis: a metric that cannot see a fault
                          will certify it. That came out of a pose model; the
                          coaching system's evaluation exists to tell computed
                          numbers from generated ones. Same problem, both ends.

  Do not add a fifth to balance the picture. The sourcing rule binds a drawn
  relationship exactly as it binds a number.
*/
type Skill = { name: string; deg: number; domains: string[] };

const skills: Skill[] = [
  { name: 'Tool use', deg: 200, domains: ['llm'] },
  { name: 'RAG', deg: 225, domains: ['llm'] },
  { name: 'Fine-tuning', deg: 250, domains: ['llm'] },
  { name: 'Calibration', deg: 290, domains: ['geometry'] },
  { name: 'Triangulation', deg: 315, domains: ['geometry'] },
  { name: '2D→3D lifting', deg: 340, domains: ['geometry'] },
  { name: 'Anatomical priors', deg: 32, domains: ['physics'] },
  { name: 'IK solvers', deg: 58, domains: ['physics'] },
  { name: 'CoreML', deg: 110, domains: ['edge'] },
  { name: 'TensorRT', deg: 128, domains: ['edge'] },
  { name: 'Quantisation', deg: 146, domains: ['edge'] },
  { name: 'ARM', deg: 164, domains: ['edge'] },
  { name: 'Grounding', deg: 270, domains: ['geometry', 'llm'] },
  { name: 'Scale anchoring', deg: 0, domains: ['geometry', 'physics'] },
  { name: 'Temporal continuity', deg: 90, domains: ['physics', 'edge'] },
  { name: 'Evaluation', deg: 180, domains: ['llm', 'physics'] },
];

/*
  THE LAYOUT, AND HOW A CLUSTER COMES FORWARD.

  Two ellipses: domains on the inner ring at the four diagonals, skills on the
  outer one, each in the sector its domain owns. Placed, not force-solved —
  twenty-one nodes relaxing inside this frame land somewhere new on every load,
  including on top of each other.

  The turn does not move the camera. The cluster being read expands away from
  the core and brightens; everything else contracts toward it and fades. That
  reads as depth — one cluster forward, the rest behind it — and it is the right
  mechanism for a step that happens on a timer, because nothing the reader was
  looking at slides out from under them. The camera is reserved for the one
  thing the reader asks for: press a domain and it moves in.

  Names are not in the drawing. They are the list under it, and pointing at one
  lights its node. Sixteen labels in a 470px panel is what made this cluttered;
  a picture does not have to carry text a readout carries better, it only has to
  make clear which text goes with which dot.
*/
const W = 340;
const H = 260;
const CORE = { x: W / 2, y: H / 2 };
const CORE_R = 22;
const RING_D = { x: 86, y: 58 };
const RING_S = { x: 138, y: 96 };
const NODE_D = 16;
const FOCUS_Z = 1.45;
/** How far a cluster comes forward, and how far the rest falls back. */
const RECEDE = 0.9;
const POP = 1.1;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const rad = (deg: number) => (deg * Math.PI) / 180;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const seat = (ring: { x: number; y: number }, deg: number) => ({
  x: CORE.x + Math.cos(rad(deg)) * ring.x,
  y: CORE.y + Math.sin(rad(deg)) * ring.y,
});

type Node = { id: string; kind: 'core' | 'domain' | 'skill'; home: { x: number; y: number } };
type Edge = { a: string; b: string; id: string };

const nodes: Node[] = [
  { id: 'core', kind: 'core', home: CORE },
  ...domains.map<Node>((d) => ({ id: d.key, kind: 'domain', home: seat(RING_D, d.deg) })),
  ...skills.map<Node>((s) => ({ id: s.name, kind: 'skill', home: seat(RING_S, s.deg) })),
];

const homeOf = (id: string) => nodes.find((n) => n.id === id)!.home;

const edges: Edge[] = [
  ...domains.map<Edge>((d) => ({ a: 'core', b: d.key, id: `core~${d.key}` })),
  ...skills.flatMap<Edge>((s) => s.domains.map((d) => ({ a: s.name, b: d, id: `${s.name}~${d}` }))),
];

/*
  WHICH SIDE EACH EDGE BOWS, DECIDED ONCE — and this is the whole of the jitter.

  The bow direction was computed every frame from the live node positions: bow
  away from the core, by the sign of (midpoint − core) · normal. For an edge that
  starts at the core the midpoint lies *on* the edge, so that dot product is
  exactly zero — and the drift pushed it a hair either side of zero several times
  a second, flipping the bow from one side of the line to the other. Four edges,
  snapping continuously. It read as the links being unstable, and they were.

  The sign is a property of the arrangement, not of the frame, so it is decided
  from the home positions and never recomputed. Where it is genuinely zero — the
  four edges out of the core — there is no bow at all, which is also what a spoke
  from the middle of a graph should look like.
*/
const bowSign = new Map<string, number>(
  edges.map((e) => {
    const A = homeOf(e.a);
    const B = homeOf(e.b);
    const nx = -(B.y - A.y);
    const ny = B.x - A.x;
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2;
    const d = (mx - CORE.x) * nx + (my - CORE.y) * ny;
    return [e.id, Math.abs(d) < 1e-6 ? 0 : Math.sign(d)];
  }),
);

/** Exclusive skills first, so the readout opens on what only this domain does. */
const skillsOf = (key: string) =>
  skills
    .filter((s) => s.domains.includes(key))
    .sort((a, b) => a.domains.length - b.domains.length);

/** Where the camera sits when a domain is opened: the middle of it and all it owns. */
const focusOf = (d: Domain, aspect: number) => {
  const pts = [seat(RING_D, d.deg), ...skillsOf(d.key).map((s) => seat(RING_S, s.deg))];
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const halfW = W / FOCUS_Z / 2;
  const halfH = ((W / FOCUS_Z) * aspect) / 2;
  return {
    cx: clamp((Math.min(...xs) + Math.max(...xs)) / 2, halfW - 40, W - halfW + 40),
    cy: clamp((Math.min(...ys) + Math.max(...ys)) / 2, halfH - 40, H - halfH + 40),
    z: FOCUS_Z,
  };
};

export default function CapabilityGraph() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  /** Set when a domain is pressed: the camera moves in. Null is the turn. */
  const [opened, setOpened] = useState<string | null>(null);
  /** The live pointer: which skill in the list below is being pointed at. */
  const [pointing, setPointing] = useState<string | null>(null);
  /*
    The frame counter is read, not just written. These memos keyed on the setter,
    which React guarantees is stable, so they were computed once at mount and the
    whole thing was a still image.
  */
  const [frame, tick] = useState(0);

  const frameRef = useRef<HTMLDivElement>(null);
  const clock = useRef(0);
  /** 0 = fallen back, 1 = come forward. One per node, eased every frame. */
  const depth = useRef(new Map<string, number>());

  const still = useReducedMotion();
  const current = domains[active];
  const currentSkills = useMemo(() => skillsOf(current.key), [current.key]);

  const activeRef = useRef(active);
  activeRef.current = active;
  const openedRef = useRef(opened);
  openedRef.current = opened;

  const cam = useRef({ cx: CORE.x, cy: CORE.y, z: 1 });

  const open = useCallback((i: number) => {
    setActive(i);
    setOpened(domains[i].key);
    setPlaying(false);
  }, []);

  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBox({ w: r.width, h: r.height });
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const boxW = box.w;
  /*
    The frame's own ratio differs from the viewBox's on a phone, so the view
    takes its aspect from the box. Left alone the SVG would letterbox — `meet`
    centres the shortfall — and every CSS-pixel position would be off by half.
  */
  const aspect = box.w && box.h ? box.h / box.w : H / W;
  const aspectRef = useRef(aspect);
  aspectRef.current = aspect;

  /*
    THE LIT SET. The domain being read, the core, and everything wired to it —
    including, for the four that carry, the domain on the far side. That second
    domain comes only part of the way forward: it is not what is being read, but
    the whole point of the picture is that it is attached.
  */
  const { lit, halfLit } = useMemo(() => {
    const l = new Set<string>(['core', current.key]);
    const h = new Set<string>();
    skillsOf(current.key).forEach((s) => {
      l.add(s.name);
      s.domains.filter((d) => d !== current.key).forEach((d) => h.add(d));
    });
    return { lit: l, halfLit: h };
  }, [current.key]);

  const litRef = useRef({ lit, halfLit });
  litRef.current = { lit, halfLit };

  /*
    Autoplay takes each domain in turn so the four introduce themselves without
    the visitor having to discover that the graph is interactive. It is also
    auto-updating content, which WCAG 2.2.2 (Level A) requires a mechanism to
    stop: a labelled pause button, and opening a domain stops it for good. It
    also holds while a skill is being pointed at — a list that changes under the
    finger tracing it is worse than no list.
  */
  useEffect(() => {
    if (!playing || still || pointing) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % domains.length), 4200);
    return () => window.clearInterval(id);
  }, [playing, still, pointing]);

  useEffect(() => {
    if (still) {
      const o = openedRef.current;
      cam.current = o
        ? { ...focusOf(domains[activeRef.current], aspectRef.current) }
        : { cx: CORE.x, cy: CORE.y, z: 1 };
      const { lit: L, halfLit: HL } = litRef.current;
      nodes.forEach((n) => {
        depth.current.set(n.id, n.kind === 'core' || L.has(n.id) ? 1 : HL.has(n.id) ? 0.45 : 0);
      });
      tick((n) => n + 1);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      clock.current = now;

      const target = openedRef.current
        ? focusOf(domains[activeRef.current], aspectRef.current)
        : { cx: CORE.x, cy: CORE.y, z: 1 };

      const c = cam.current;
      // frame-rate independent easing, so the move is the same on 60Hz and 120Hz
      const k = 1 - Math.pow(1 - 0.04, dt);
      c.cx += (target.cx - c.cx) * k;
      c.cy += (target.cy - c.cy) * k;
      c.z += (target.z - c.z) * k;

      const { lit: L, halfLit: HL } = litRef.current;
      const dk = 1 - Math.pow(1 - 0.055, dt);
      nodes.forEach((n) => {
        const want = n.kind === 'core' || L.has(n.id) ? 1 : HL.has(n.id) ? 0.45 : 0;
        const cur = depth.current.get(n.id) ?? want;
        depth.current.set(n.id, cur + (want - cur) * dk);
      });

      tick((n) => (n + 1) % 100000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [still, opened]);

  /*
    Where every node is drawn: its seat, a slow two-frequency drift, and then the
    whole thing pushed out from or pulled in toward the core by how far forward
    it currently is. The core never moves; it is what the others move relative
    to.
  */
  const at = useMemo(() => {
    const t = still ? 0 : clock.current;
    const map = new Map<string, { x: number; y: number; d: number }>();
    nodes.forEach((n, i) => {
      const d = depth.current.get(n.id) ?? 0;
      if (n.kind === 'core') {
        map.set(n.id, { ...n.home, d: 1 });
        return;
      }
      const hx = n.home.x + Math.sin(t * 0.00034 + i * 2.1) * 1.5 + Math.sin(t * 0.00081 + i * 0.7) * 0.8;
      const hy = n.home.y + Math.cos(t * 0.00027 + i * 1.3) * 1.3 + Math.sin(t * 0.00067 + i * 1.9) * 0.7;
      const s = mix(RECEDE, POP, d);
      map.set(n.id, { x: CORE.x + (hx - CORE.x) * s, y: CORE.y + (hy - CORE.y) * s, d });
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, frame]);

  const view = useMemo(() => {
    const z = cam.current.z;
    const w = W / z;
    const h = w * aspect;
    return { x: cam.current.cx - w / 2, y: cam.current.cy - h / 2, w, h, z };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame, still, aspect]);

  /** viewBox units per CSS pixel, for the only thing placed in CSS: the captions. */
  const px = boxW ? boxW / view.w : 1;
  const capDrop = NODE_D * px + 15;

  const rim = (id: string) =>
    id === 'core' ? CORE_R + 3 : domains.some((d) => d.key === id) ? NODE_D + 3 : 6;

  const path = (e: Edge) => {
    const from = at.get(e.a)!;
    const to = at.get(e.b)!;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const d = Math.hypot(dx, dy) || 1;
    const ra = rim(e.a);
    const rb = rim(e.b);
    if (d <= ra + rb + 2) return '';
    const a = { x: from.x + (dx / d) * ra, y: from.y + (dy / d) * ra };
    const b = { x: to.x - (dx / d) * rb, y: to.y - (dy / d) * rb };
    const sgn = bowSign.get(e.id)!;
    if (!sgn) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    const nx = -(b.y - a.y);
    const ny = b.x - a.x;
    const len = Math.hypot(nx, ny) || 1;
    const bow = len * 0.09;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} Q ${mx + sgn * (nx / len) * bow} ${my + sgn * (ny / len) * bow} ${b.x} ${b.y}`;
  };

  /** Strokes are divided by the zoom, so a hairline stays a hairline at any camera. */
  const hair = 1 / view.z;
  const status = still ? 'static' : opened ? 'open' : playing ? 'turning' : 'paused';
  const pctX = (v: number) => `${((v - view.x) / view.w) * 100}%`;
  const pctY = (v: number) => `${((v - view.y) / view.h) * 100}%`;
  const halo = { textShadow: '0 0 3px rgb(var(--void)), 0 0 7px rgb(var(--void))' };

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lead font-bold leading-tight text-cyan">
            Expertise graph
          </p>
          <p className="mt-1 font-text text-fine text-dim">Four domains, and what they share</p>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-micro text-dim">{status}</span>
          {!still && (
            <button
              type="button"
              onClick={() => {
                setPlaying((v) => !v);
                setOpened(null);
              }}
              aria-label={playing ? 'Pause the domain turn' : 'Take the domains in turn'}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-cyan/30 text-cyan transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              {playing ? <Pause size={13} strokeWidth={2} /> : <Play size={13} strokeWidth={2} />}
            </button>
          )}
        </span>
      </div>

      {/*
        Full bleed, no border, no inset, no cap. It was a bordered box inside a
        bordered card — a child framed more strongly than its container, which
        the surface rule forbids. On `bg-void` it reads as the page showing
        through, and it gives the captions a ground that holds still.
      */}
      <div
        ref={frameRef}
        className="relative -mx-5 mt-4 aspect-[340/300] overflow-hidden bg-void sm:-mx-6 sm:aspect-[340/260]"
      >
        <svg
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          aria-hidden="true"
          /* pan-y, never touch-none: this sits in the hero, and a vertical swipe
             that begins on it must still scroll the page. */
          className="absolute inset-0 h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,#000_6%,#000_94%,transparent)] [touch-action:pan-y]"
        >
          {/*
            EDGES. Two passes rather than a switch: the cyan resting line fades
            out as the amber live one fades in, so an edge coming forward does it
            gradually instead of changing colour on a single frame.
          */}
          {edges.map((e) => {
            const d = Math.min(at.get(e.a)!.d, at.get(e.b)!.d);
            const dd = path(e);
            if (!dd) return null;
            return (
              <g key={e.id}>
                <path d={dd} fill="none" stroke="rgb(var(--cyan))" strokeOpacity={(1 - d) * 0.12} strokeWidth={hair * 0.8} />
                <path
                  d={dd}
                  fill="none"
                  stroke="rgb(var(--amber))"
                  strokeOpacity={d * 0.6}
                  strokeWidth={hair * mix(0.8, 1.1, d)}
                />
              </g>
            );
          })}

          {skills.map((sk) => {
            const p = at.get(sk.name)!;
            const on = pointing === sk.name;
            const r = mix(2.7, 4.4, p.d) + (on ? 1.6 : 0);
            const shared = sk.domains.length > 1;
            return (
              <g key={sk.name}>
                <circle cx={p.x} cy={p.y} r={r} fill="rgb(var(--cyan))" opacity={(1 - p.d) * 0.24} />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={shared ? 'rgb(var(--void))' : 'rgb(var(--amber))'}
                  stroke="rgb(var(--amber))"
                  strokeWidth={hair * 1.4}
                  opacity={p.d}
                />
                {on && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r + 5}
                    fill="none"
                    stroke="rgb(var(--amber))"
                    strokeOpacity="0.55"
                    strokeWidth={hair}
                  />
                )}
              </g>
            );
          })}

          {/*
            A domain comes forward as a ring first and a solid second.

            Fading an amber fill straight up from zero meant the two bridge
            domains — which sit at 0.45 and stay there — rendered as amber at 45%
            over deep teal, which is olive. That colour is in no part of this
            palette. The fill now only starts at 0.6, and below it the node
            carries an amber outline instead: the same "partly forward" reading,
            in colours the site actually has.
          */}
          {domains.map((d) => {
            const p = at.get(d.key)!;
            const r = mix(NODE_D * 0.84, NODE_D, p.d);
            return (
              <g key={d.key}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="rgb(var(--deep))"
                  stroke="rgb(var(--cyan))"
                  strokeOpacity={(1 - p.d) * 0.24}
                  strokeWidth={hair * 1.1}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="none"
                  stroke="rgb(var(--amber))"
                  strokeOpacity={p.d * 0.85}
                  strokeWidth={hair * 1.3}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="rgb(var(--amber))"
                  opacity={clamp((p.d - 0.6) / 0.4, 0, 1)}
                />
              </g>
            );
          })}

          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={CORE_R}
            fill="rgb(var(--panel))"
            stroke="rgb(var(--amber))"
            strokeOpacity="0.8"
            strokeWidth={hair * 1.2}
          />

          {/* Press a domain to move in on it. Hover only brings it forward. */}
          {domains.map((d, i) => {
            const p = at.get(d.key)!;
            return (
              <circle
                key={`hit-${d.key}`}
                cx={p.x}
                cy={p.y}
                r={NODE_D + 6}
                fill="transparent"
                className="cursor-pointer"
                onPointerEnter={() => !opened && setActive(i)}
                onPointerDown={() => open(i)}
              />
            );
          })}
        </svg>

        {/*
          The four domain names are the map legend and the only type in the
          drawing. Plain, with a shadow rather than a plate: the name stays
          legible over the mesh and the mesh stays visible through the gaps in
          the name. A name whose node the camera has carried past the edge waits
          until there is room for all of it, because half a word against the
          frame reads as a bug.
        */}
        <div className="pointer-events-none absolute inset-0">
          {domains.map((d) => {
            const Icon = d.icon;
            const p = at.get(d.key)!;
            const cx = ((p.x - view.x) / view.w) * (boxW || 1);
            const cy = ((p.y - view.y) / view.h) * (box.h || 1) + capDrop;
            const named = boxW === 0 || (cx > 42 && cx < boxW - 42 && cy > 12 && cy < box.h - 12);
            return (
              <span key={d.key} aria-hidden="true">
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pctX(p.x), top: pctY(p.y), opacity: mix(0.45, 1, p.d) }}
                >
                  <Icon
                    size={Math.round(mix(14, 17, p.d))}
                    strokeWidth={1.7}
                    className={p.d > 0.75 ? 'text-void' : p.d > 0.2 ? 'text-amber/70' : 'text-cyan/50'}
                  />
                </span>
                <span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-micro ${
                    named ? '' : 'opacity-0'
                  } ${p.d > 0.75 ? 'text-amber' : p.d > 0.2 ? 'text-amber/70' : 'text-dim/70'}`}
                  style={{ left: pctX(p.x), top: `calc(${pctY(p.y)} + ${capDrop}px)`, ...halo }}
                >
                  {d.short}
                </span>
              </span>
            );
          })}

          <span
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-micro font-bold text-amber"
            style={{ left: pctX(CORE.x), top: pctY(CORE.y), ...halo }}
          >
            Maths
          </span>
        </div>
      </div>

      <div key={current.key} className="mt-4 animate-[fadeUp_0.5s_ease-out] border-t border-cyan/20 pt-4">
        <p className="font-display text-lead font-bold leading-tight text-amber">{current.label}</p>

        {/*
          All four blurbs occupy one grid cell and three are hidden. The panel
          swaps this paragraph on its own, and four paragraphs of different
          lengths meant the card grew and shrank on a timer — on a phone, where
          the hero is one column, that moved the whole page under the reader's
          thumb. Stacking makes the cell exactly as tall as the longest one at
          whatever width it is being read.
        */}
        <div className="mt-2.5 grid">
          {domains.map((d, i) => (
            <p
              key={d.key}
              aria-hidden={i !== active}
              className={`copy-sm [grid-area:1/1] ${i === active ? '' : 'invisible'}`}
            >
              {d.blurb.before}
              <em className="font-semibold not-italic text-amber">{d.blurb.mark}</em>
              {d.blurb.after}
            </p>
          ))}
        </div>

        {/*
          The skills, named here rather than in the drawing, and wired to it.
          Point at one and its node swells and takes a ring; the turn holds while
          you are pointing. This is the pairing the graphic could never do alone —
          sixteen names in a 470px panel is what made it cluttered, and five names
          in a two-column list is what a person actually reads.
        */}
        <ul className="mt-3 grid grid-cols-2 gap-x-3" aria-label={`Skills under ${current.label}`}>
          {currentSkills.map((sk) => {
            const on = pointing === sk.name;
            const shared = sk.domains.length > 1;
            const other = domains.find((d) => d.key !== current.key && sk.domains.includes(d.key));
            return (
              <li key={sk.name}>
                <button
                  type="button"
                  onPointerEnter={() => setPointing(sk.name)}
                  onPointerLeave={() => setPointing((p) => (p === sk.name ? null : p))}
                  onFocus={() => setPointing(sk.name)}
                  onBlur={() => setPointing((p) => (p === sk.name ? null : p))}
                  className="group -mx-1 flex min-h-[2.75rem] w-full items-center gap-2.5 rounded-sm px-1 text-left"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full border border-amber transition-shadow duration-300 ${
                      shared ? '' : 'bg-amber'
                    } ${on ? 'shadow-[0_0_0_3px_rgb(var(--amber)/0.3)]' : 'opacity-70'}`}
                  />
                  <span
                    className={`font-mono text-micro transition-colors duration-300 ${
                      on ? 'text-amber' : 'text-cyan/75 group-hover:text-amber'
                    }`}
                  >
                    {sk.name}
                  </span>
                  {shared && other && <span className="sr-only"> — also under {other.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {/* The legend, to the right and outside the list — one sharing a list's
            indent and its marker reads as another item in it. */}
        <p aria-hidden="true" className="mt-1 text-right font-mono text-micro text-dim">
          hollow · a shared skill
        </p>

        <Link
          to={`/work/${current.proof.slug}`}
          className="group -mx-1 mt-1 flex min-h-[2.75rem] items-start gap-2 rounded-sm border-t border-amber/25 px-1 pt-3 text-fine text-amber"
        >
          <span className="underline decoration-amber/40 underline-offset-4 transition-colors group-hover:decoration-amber">
            Where this shows up: {current.proof.label}
          </span>
          <ArrowUpRight
            size={14}
            strokeWidth={2}
            className="mt-1.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/*
        The hairline selector, and the keyboard path to all four domains — the
        nodes in the graphic are pointer-only by construction. Pressing one moves
        the view in on it, exactly as pressing the node does. The bar stays a
        hairline; the padding around it carries the 44px target.
      */}
      <div className="mt-2 flex gap-1.5" role="group" aria-label="Open a domain">
        {domains.map((d, i) => (
          <button
            key={d.key}
            type="button"
            aria-label={d.label}
            aria-pressed={i === active}
            onClick={() => open(i)}
            className="group flex flex-1 items-center py-[1.3125rem]"
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
