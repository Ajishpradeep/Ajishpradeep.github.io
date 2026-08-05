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
  blurb: Blurb;
  skills: string[];
  /**
   * The receipt. Every capability here points at a case study that demonstrates
   * it — the site's own rule, applied to the one panel that was previously
   * asserting range without evidence. `label` names the work rather than
   * repeating the case title verbatim; the link goes to the case itself.
   */
  proof: { slug: string; label: string };
};

const domains: Domain[] = [
  {
    key: 'geometry',
    label: 'Multi-view geometry',
    short: 'Geometry',
    icon: Axis3d,
    blurb: {
      before: 'Recovering metric 3D from uncalibrated cameras, and knowing when a reconstruction is ',
      mark: 'only correct up to an unknown scale',
      after: ' — self-consistent, plausible, and wrong in absolute units.',
    },
    skills: ['Calibration', 'Triangulation', '2D→3D lifting', 'Scale anchoring'],
    proof: { slug: 'reconstruction-infrastructure', label: 'Multi-camera reconstruction' },
  },
  {
    key: 'physics',
    label: 'Physics-infused models',
    short: 'Physics',
    icon: Atom,
    blurb: {
      before:
        'Bone lengths, joint limits and temporal continuity compiled into the network and the solver, so an ',
      mark: 'impossible pose is unrepresentable',
      after: ' rather than merely penalised by a loss.',
    },
    skills: ['Bone-length', 'ROM priors', 'IK solvers', 'Temporal continuity'],
    proof: { slug: 'markerless-3d-motion', label: 'Markerless 3D motion capture' },
  },
  {
    key: 'llm',
    label: 'Agentic LLM systems',
    short: 'Agentic',
    icon: Brain,
    blurb: {
      before: 'Grounding for domains where a confidently wrong number does real harm — ',
      mark: 'every figure computed deterministically',
      after: ', the model held to narration, and evaluation that tells them apart.',
    },
    skills: ['Grounding', 'Tool use', 'Fine-tuning', 'Evaluation'],
    proof: { slug: 'agentic-coaching-llm', label: 'Agentic coaching system' },
  },
  {
    key: 'edge',
    label: 'Edge inference',
    short: 'Edge',
    icon: Gauge,
    blurb: {
      before: 'Making capable models cheap enough to run where they have to run — ',
      mark: 'on the device, at frame rate',
      after: ', with no network dependency and nothing leaving the hardware.',
    },
    skills: ['CoreML', 'TensorRT', 'Quantisation', 'ARM'],
    proof: { slug: 'planogram-vision-ai', label: 'Retail vision at store scale' },
  },
];

/*
  THE FRAME BUDGET.

  Every number below is derived from one constraint: nothing the graphic draws
  may leave the box, at either end of the scale range the panel actually
  renders at. That range is bounded deliberately — see `max-w` on the frame —
  so a 340-unit viewBox lands between 0.87× (a 375px phone) and 1.13× (the
  single-column tablet layout).

  THE ORBIT IS AN ELLIPSE, and not for the atmosphere. A circular orbit large
  enough to fill this frame vertically puts the lower node's caption outside the
  box, and one small enough to fit leaves ~80px of dead margin down each side —
  the picture was drawn small in both axes to satisfy a constraint that only
  ever applied to one of them. An ellipse spends the width it has, and reads as
  an orbit in projection, which is the right thing for this subject to look
  like.

  Working outward, with the active domain pulled out by ACTIVE_SCALE:

    anchor          x ∈ [51, 289],  y ∈ [61, 239]
    caption centre  node.y + CAPTION_DY. Two constraints bound this, one at
                    each end of the orbit: the lower caption has to stay in the
                    frame, and the upper caption has to clear the core it is
                    now sitting above. Between them they set the height of the
                    box — at 264 there was no value that satisfied both, which
                    is what put "Geometry" on top of "Maths".
    satellites      SAT_ORBIT at SAT_ANGLES, which is ± 33 across and ± 19 up,
                    so the ring never enters the band the caption occupies

  PAD is the drag clamp and is one step looser than the anchors, so a dragged
  node can reach slightly past where the orbit puts it without taking its
  caption out of the frame.
*/
const W = 340;
const H = 300;
const CORE = { x: W / 2, y: H / 2 };
const CORE_R = 32;
const ORBIT_X = 110;
const ORBIT_Y = 82;
const ACTIVE_SCALE = 1.08;
const SAT_ORBIT = 38;
const CAPTION_DY = 42;
const PAD = { left: 54, right: W - 54, top: 58, bottom: 240 };

/*
  The satellites do not rotate, and their four positions are not arbitrary.

  Rotating them meant the label attached to one was a label the reader had to
  chase, and it meant the dot passing under a node swept through its caption
  four times a revolution. Fixed, they clear the caption band by construction —
  and reading order, top-left to bottom-right, is the order the four skills are
  set in the 2×2 below. The grid under the graphic is the legend for the dots
  inside it, without a single number or key.
*/
const SAT_ANGLES = [-150, -30, 150, 30].map((d) => (d * Math.PI) / 180);

/** Where a domain sits on the ellipse at angle `a`, pulled out if it is selected. */
const anchor = (a: number, on: boolean) => {
  const k = on ? ACTIVE_SCALE : 1;
  return { x: CORE.x + Math.cos(a) * ORBIT_X * k, y: CORE.y + Math.sin(a) * ORBIT_Y * k };
};

/*
  THE RESTING LAYOUT, for `prefers-reduced-motion`.

  There was no resting layout. The simulation simply never started, which left
  the nodes frozen at their seed angles — 12, 3, 6 and 9 o'clock — and that is
  the one arrangement where the geometry breaks. Rotating the layout 45° fixes
  it. The satellites need no equivalent — they sit at fixed angles relative to
  their node, so they arrive correct in both modes.

  The orbit used to shrink here as well, because the seed angles put a caption
  on the frame edge. The frame budget above holds at every angle now, so rest
  and motion share one radius: the reduced-motion visitor sees the same picture
  the animation settles into, not a smaller substitute for it.
*/
const REST_ROTATION = Math.PI / 4;

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
  /*
    Which skill of the active domain is named in the graphic, held in two parts.

    One state was not enough, and the missing half was the one a visitor
    actually reaches for. Pointing at a skill named it and moving away unnamed
    it — which is correct for a hover and useless for a click, because the whole
    reason to click is to go and look at the dot the label is pointing at, and
    the label went out on the way there. On a pointer device the click also
    looked broken from the other side: the hover had already lit the thing, so
    pressing it changed nothing visible.

    A hover previews and a click latches, which is the rule this panel already
    follows one level up — selecting a domain stops the cycle for good. `pinned`
    wins over `hovered`, so pointing at a second skill while one is pinned does
    not quietly take over.
  */
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const peek = pinned ?? hovered;

  /** Release a hover without disturbing a pin somebody set deliberately. */
  const unhover = useCallback(
    (k: number) => setHovered((h) => (h === k ? null : h)),
    [],
  );
  const [, tick] = useState(0);

  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const pulses = useRef<number[]>([]);
  const spin = useRef(0);

  const bodies = useRef<Body[]>(
    domains.map((_, i) => {
      const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
      return { ...anchor(a, false), vx: 0, vy: 0, ang: a };
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
        return { ...anchor(a, false), vx: 0, vy: 0, ang: a };
      }),
    [],
  );

  const toLocal = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return { x: ((cx - r.left) / r.width) * W, y: ((cy - r.top) / r.height) * H };
  }, []);

  /*
    The rendered width of the frame, so the peek label can be placed in CSS
    pixels rather than viewBox units. It is the one element whose size does not
    scale with the drawing — it is real text at the site's own 14px — so it is
    the one element that has to know how big the box currently is in order to
    stay inside it.
  */
  const [boxW, setBoxW] = useState(0);
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    setBoxW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => setBoxW(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // a skill named in the graphic belongs to the domain that was on screen when it was named
  useEffect(() => {
    setHovered(null);
    setPinned(null);
  }, [active]);

  // cycle the selection while nobody is interacting
  useEffect(() => {
    if (!playing || held || still || peek !== null) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % domains.length), 3600);
    return () => window.clearInterval(id);
  }, [playing, held, still, peek]);

  // the simulation
  useEffect(() => {
    if (still) return;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;

      spin.current += 0.0016 * dt * (held ? 0.25 : 1);

      bodies.current.forEach((b, i) => {
        if (i === dragIdx && pointer.current) {
          b.x = clamp(pointer.current.x, PAD.left, PAD.right);
          b.y = clamp(pointer.current.y, PAD.top, PAD.bottom);
          b.vx = 0;
          b.vy = 0;
          return;
        }

        // orbital anchor, with the active node pulled out a little further
        const { x: ax, y: ay } = anchor(b.ang + spin.current, i === active);

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
        b.x = clamp(b.x + b.vx * dt, PAD.left, PAD.right);
        b.y = clamp(b.y + b.vy * dt, PAD.top, PAD.bottom);
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

  const satAt = (k: number) => {
    const a = SAT_ANGLES[k % SAT_ANGLES.length];
    return {
      x: act.x + Math.cos(a) * SAT_ORBIT,
      y: act.y + Math.sin(a) * SAT_ORBIT,
      out: Math.cos(a) >= 0 ? 1 : -1,
    };
  };

  /*
    THE PEEK LABEL, and why there is only ever one of them.

    All four satellites used to carry 7px mono labels. Four of them ring a node
    of radius 25 at radius 40, which leaves no room for a word: "Triangulation"
    ran under the node, "Calibration" landed on the node's own caption, and
    "Scale anchoring" left the frame. They were unreadable at that size even
    when they did not collide.

    One label cannot collide with three others, so the naming became an
    interaction instead of a permanent state: point at a skill in the readout —
    or at a dot — and that dot alone is named, in real 14px text on a plate that
    is clamped to the frame. The dots still say the domain has depth; the label
    says which dot is which, at the moment the reader asks.

    The plate opens on the side the dot already sits on, and flips when that
    side would take it out of the frame — which happens whenever the node is
    near an edge, and is how a 130px label ends up lying across the 50px node it
    is labelling. So the horizontal rule alone is not enough: the plate is also
    lifted clear of the node band, above for the two upper dots and below for
    the two lower ones. Flipped or not, it can no longer cover the node, and
    below the node it clears the node's caption too, since that is the other
    thing in the band. Only one of the two heights exists at the ends of the
    orbit — a node at the foot of the ellipse has nothing under it — so the
    dot's own direction is a preference, not the rule.

    It is lifted only when it would otherwise cover the node it is describing.
    Sitting level with its dot is the clearest thing the label can do, and it
    is worth keeping everywhere it does not cost the reader the subject; a plate
    laid over one of the three quiet nodes is a plate in front of something, and
    it has a solid ground and a drawn edge so it reads that way.
  */
  const plate = (() => {
    if (peek === null || !act || boxW <= 0) return null;
    const label = current.skills[peek];
    const s = boxW / W;
    const boxH = (H / W) * boxW;
    const { x: sx, y: sy, out } = satAt(peek);
    const cx = sx * s;
    /*
      JetBrains Mono is a 0.6em advance — but `text-micro` also carries 0.06em
      of tracking, so a 14px label is 9.24px per character and not 8.4. The 10%
      that was missing here is the whole clamp: at 8.4, "Temporal continuity"
      measured 12px narrower than it draws, and the clamp let it hang that far
      past the right edge of the frame, where `overflow-hidden` cut the last
      letter off.
    */
    const w = label.length * 9.25 + 20;
    const fits = (right: boolean) => (right ? cx + 12 + w <= boxW - 6 : cx - 12 - w >= 6);
    const right = fits(out === 1) ? out === 1 : !fits(false);

    const left = clamp(right ? cx + 12 : cx - 12 - w, 6, Math.max(6, boxW - w - 6));

    const nodeX = act.x * s;
    const overNode = left < nodeX + 23 * s + 8 && left + w > nodeX - 23 * s - 8;
    const above = act.y * s - (23 * s + 20);
    const below = (act.y + CAPTION_DY) * s + 22;
    const inFrame = (t: number) => t >= 20 && t <= boxH - 20;
    const first = sy < act.y ? above : below;
    const top = !overNode ? sy * s : inFrame(first) ? first : sy < act.y ? below : above;

    return { label, left, top: clamp(top, 20, boxH - 20) };
  })();

  const status = still
    ? 'static'
    : dragIdx !== null
      ? 'dragging'
      : held || peek !== null
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
        face, at the same rank as every other panel title.
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

      {/*
        `max-w` is a legibility constraint, not a taste one. The drawing scales
        with the box; the labels on top of it do not, because they are real text
        at the site's own size. Left uncapped, the single-column layout at 768px
        rendered the viewBox at 1.93× — nodes the size of buttons wearing 14px
        captions. Capped, the whole panel lives between 0.87× and 1.13×, which
        is the band every clearance in the frame budget was solved for.

        The graphic is `aria-hidden`: every fact in it — the domain, its blurb,
        its four skills, the case study behind it — is set as real text in the
        readout below, and the selector at the foot is the keyboard path to all
        four. A screen reader gets the panel's content without being read a
        picture of it.
      */}
      <div
        ref={frameRef}
        aria-hidden="true"
        /*
          Solid `bg-void`, where this was `bg-void/50` over a card that changes
          colour on hover. The two label plates below knock the drawing out from
          behind their text, and a knockout can only be invisible against a
          background that holds still — a translucent frame made them four
          visible chips that darkened whenever the pointer entered the card.
        */
        className="relative mx-auto mt-4 aspect-[340/300] w-full max-w-[24rem] overflow-hidden rounded-sm border border-cyan/15 bg-void"
      >
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
            {/*
              The same device as the core, one step quieter: the selected domain
              is lit from underneath rather than outlined more heavily. Weight
              on the ring would have made the four nodes different shapes; light
              keeps them one family and still says which one is being read.
            */}
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="rgb(var(--amber))" stopOpacity="0.3" />
              <stop offset="62%" stopColor="rgb(var(--amber))" stopOpacity="0.07" />
              <stop offset="100%" stopColor="rgb(var(--amber))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* orbit ring */}
          <ellipse
            cx={CORE.x}
            cy={CORE.y}
            rx={ORBIT_X}
            ry={ORBIT_Y}
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
            const d = `M ${CORE.x} ${CORE.y} Q ${mx + (nx / len) * bow} ${my + (ny / len) * bow} ${b.x} ${b.y}`;
            return (
              <g key={domains[i].key}>
                {/* a soft beam under the live edge — the same light as the two glows */}
                {on && (
                  <path
                    d={d}
                    fill="none"
                    stroke="rgb(var(--amber))"
                    strokeOpacity="0.1"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                )}
                <path
                  d={d}
                  fill="none"
                  stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                  strokeOpacity={on ? 0.95 : 0.16}
                  strokeWidth={on ? 2 : 1}
                  strokeDasharray={on ? undefined : '4 5'}
                />
              </g>
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

          {/* satellites — how many skills sit under the active domain, and on demand, which */}
          {act &&
            current.skills.map((s, k) => {
              const { x: sx, y: sy } = satAt(k);
              const lit = peek === k;
              return (
                <g key={s} opacity={peek !== null && !lit ? 0.3 : 1}>
                  <line
                    x1={act.x}
                    y1={act.y}
                    x2={sx}
                    y2={sy}
                    stroke="rgb(var(--amber))"
                    strokeOpacity={lit ? 0.8 : 0.22}
                  />
                  {lit && (
                    <circle
                      cx={sx}
                      cy={sy}
                      r="8"
                      fill="none"
                      stroke="rgb(var(--amber))"
                      strokeOpacity="0.5"
                    />
                  )}
                  <circle
                    cx={sx}
                    cy={sy}
                    r={lit ? 4 : 2.8}
                    fill="rgb(var(--amber))"
                    opacity={lit ? 1 : 0.85}
                  />
                  {/*
                    A 2.4-unit dot is not a target. The hit area is 13 units and
                    invisible, and it sits under the node group below, so the
                    4-unit overlap with the node ring still starts a drag rather
                    than a peek.
                  */}
                  <circle
                    cx={sx}
                    cy={sy}
                    r="13"
                    fill="transparent"
                    className="cursor-pointer"
                    onPointerEnter={() => setHovered(k)}
                    onPointerLeave={() => unhover(k)}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setPinned((p) => (p === k ? null : k));
                    }}
                  />
                </g>
              );
            })}

          {/* core */}
          <circle cx={CORE.x} cy={CORE.y} r="50" fill="url(#coreGlow)" />
          <circle
            cx={CORE.x}
            cy={CORE.y}
            r={CORE_R}
            fill="rgb(var(--panel))"
            stroke="rgb(var(--amber))"
            strokeWidth="1.4"
          />

          {/* the selected domain, lit from underneath */}
          {/* r stops short of CAPTION_DY: the caption's knockout is only invisible over flat ground. */}
          {act && <circle cx={act.x} cy={act.y} r="34" fill="url(#nodeGlow)" />}

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
                  r={on ? 23 : 19}
                  fill={on ? 'rgb(var(--amber))' : 'rgb(var(--deep))'}
                  stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                  strokeOpacity={on ? 1 : 0.4}
                  strokeWidth="1.4"
                />
              </g>
            );
          })}
        </svg>

        {/*
          Everything that is type rides on top as HTML, at the site's own sizes.

          Inside the viewBox a caption is whatever the box happens to scale it
          to — 7px on a phone at the size these were set. Out here 14px is 14px
          at every width, in the same mono the rest of the panel labels use, and
          the lucide strokes stay crisp for the same reason.
        */}
        <div className="pointer-events-none absolute inset-0">
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-micro font-bold text-amber"
            style={{ left: '50%', top: `${(CORE.y / H) * 100}%` }}
          >
            Maths
          </span>

          {B.map((b, i) => {
            const Icon = domains[i].icon;
            const on = i === active;
            return (
              <span key={domains[i].key}>
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(b.x / W) * 100}%`, top: `${(b.y / H) * 100}%` }}
                >
                  <Icon
                    size={on ? 20 : 17}
                    strokeWidth={1.8}
                    className={on ? 'text-void' : 'text-cyan/70'}
                  />
                </span>
                {/*
                  The bg is not a chip, it is a knockout. The caption sits
                  between its node and the core, which is exactly where that
                  node's edge is drawn, and the live amber edge ran straight
                  through the middle of the word it crossed.
                */}
                <span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-void px-1.5 font-mono text-micro transition-colors duration-300 ${
                    on ? 'text-amber' : 'text-dim'
                  }`}
                  style={{
                    left: `${(b.x / W) * 100}%`,
                    top: `${((b.y + CAPTION_DY) / H) * 100}%`,
                  }}
                >
                  {domains[i].short}
                </span>
              </span>
            );
          })}

          {plate && (
            <span
              className="absolute -translate-y-1/2 whitespace-nowrap rounded-sm border border-amber/60 bg-void px-2 py-1 font-mono text-micro text-amber"
              style={{ left: `${plate.left}px`, top: `${plate.top}px` }}
            >
              {plate.label}
            </span>
          )}
        </div>
      </div>

      {/*
        There is no instruction line under the frame. It was a mono caption
        naming a drag and a tap, and it read as documentation for a picture —
        which is what a caption explaining an affordance always is. The
        affordances announce themselves instead: the nodes take a grab cursor,
        the skills below are controls that respond on hover and stay lit when
        pressed, and nothing in the panel is only reachable through the hint
        that used to describe it.
      */}

      {/*
        The readout. It carried a heading and one sentence; the skills it names
        only existed as 8px labels orbiting inside the graphic, where they are
        unreadable and gone the moment the selection changes. They are text now,
        so the panel explains itself whether or not the simulation is running.
      */}
      <div key={current.key} className="mt-4 animate-[fadeUp_0.5s_ease-out] border-t border-cyan/20 pt-4">
        <p className="font-display text-lead font-bold leading-tight text-amber">
          {current.label}
        </p>

        {/*
          All four blurbs occupy one grid cell and three of them are hidden.

          The panel swaps this paragraph every 3.6 seconds on its own, and four
          paragraphs of different lengths meant the card grew and shrank on a
          timer — on a phone, where the hero is one column, that moved the whole
          page under the reader's thumb every 3.6 seconds. A reserved height in
          line units would have been four guesses about where the copy wraps at
          four measures; stacking them makes the cell exactly as tall as the
          longest one is at whatever width it is actually being read, and the
          cycle changes the words and nothing else.

          `visibility: hidden` and not `display: none`, because a display-none
          box has no height to contribute. There is nothing focusable in a
          paragraph, so `aria-hidden` on the other three is complete.
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
          Four skills, always a 2×2 — a fixed shape rather than a wrapping row,
          so this block is the same height for every domain and each one is a
          44px target. Their reading order is the four satellites' fixed
          positions, so the top-left chip is the top-left dot; pointing at one
          previews it in the graph and pressing it keeps it there.
        */}
        <ul
          className="mt-3 grid grid-cols-2 gap-x-3"
          aria-label={`Skills under ${current.label}`}
        >
          {current.skills.map((sk, k) => {
            const lit = peek === k;
            return (
              <li key={sk}>
                <button
                  type="button"
                  /* The pressed state is the pin, not the hover — a pointer
                     resting on a control has not pressed it. */
                  aria-pressed={pinned === k}
                  onClick={() => setPinned((p) => (p === k ? null : k))}
                  onPointerEnter={() => setHovered(k)}
                  onPointerLeave={() => unhover(k)}
                  onFocus={() => setHovered(k)}
                  onBlur={() => unhover(k)}
                  className="group -mx-1 flex min-h-[2.75rem] w-full items-center gap-2.5 rounded-sm px-1 text-left"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full bg-amber transition-shadow duration-300 ${
                      lit ? 'shadow-[0_0_0_3px_rgb(var(--amber)/0.3)]' : 'opacity-60'
                    }`}
                  />
                  <span
                    className={`font-mono text-micro transition-colors duration-300 ${
                      lit ? 'text-amber' : 'text-cyan/75 group-hover:text-amber'
                    }`}
                  >
                    {sk}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/*
          The receipt, in the device Method already uses for the same job: a
          claim on one side of an amber hairline and the way to go and check it
          on the other. A capability list is the easiest thing on a portfolio to
          assert and the hardest to believe, and this panel was the last one
          asserting without pointing anywhere.
        */}
        <Link
          to={`/work/${current.proof.slug}`}
          className="group -mx-1 mt-3 flex min-h-[2.75rem] items-start gap-2 rounded-sm border-t border-amber/25 px-1 pt-3 text-fine text-amber"
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
        nodes in the graphic are pointer-only by construction. The bar stays a
        hairline; the padding around it carries the 44px target, because a 2px
        rule is not one and neither was the 26px block that used to hold it.
      */}
      <div className="mt-4 flex gap-1.5" role="group" aria-label="Choose a domain">
        {domains.map((d, i) => (
          <button
            key={d.key}
            type="button"
            aria-label={d.label}
            aria-pressed={i === active}
            onClick={() => choose(i)}
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
