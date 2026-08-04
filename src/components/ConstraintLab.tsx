import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Hand, Lock, Unlock, RotateCcw } from 'lucide-react';

type P = { x: number; y: number };

/** Address posture, viewed down-the-line. The chain the visitor actually drags. */
const ROOT: P = { x: 46, y: 28 }; // shoulder, pinned
const REST: P[] = [
  { x: 46, y: 28 }, // shoulder
  { x: 55, y: 41 }, // elbow
  { x: 63, y: 52 }, // hands / grip
  { x: 82, y: 88 }, // club head
];

/** Static body the arm hangs off — deliberately drawn so the club never crosses it. */
const BODY: [P, P][] = [
  [{ x: 43, y: 15 }, { x: 45, y: 24 }], // head → neck
  [{ x: 45, y: 24 }, { x: 46, y: 28 }], // neck → shoulder
  [{ x: 46, y: 28 }, { x: 49, y: 56 }], // spine
  [{ x: 49, y: 56 }, { x: 45, y: 74 }], // left thigh
  [{ x: 49, y: 56 }, { x: 53, y: 74 }], // right thigh
  [{ x: 45, y: 74 }, { x: 44, y: 92 }], // left shin
  [{ x: 53, y: 74 }, { x: 54, y: 92 }], // right shin
];

const dist = (a: P, b: P) => Math.hypot(a.x - b.x, a.y - b.y);

const LENGTHS = REST.slice(1).map((p, i) => dist(REST[i], p));
const REACH = LENGTHS.reduce((a, b) => a + b, 0);

/**
 * FABRIK: iterate the chain backwards from the target then forwards from the
 * pinned root, so every bone keeps its exact rest length.
 */
function solve(target: P, iterations = 12): P[] {
  const pts = REST.map((p) => ({ ...p }));

  // Unreachable targets: lay the chain straight toward it rather than snapping.
  if (dist(ROOT, target) > REACH) {
    const dx = target.x - ROOT.x;
    const dy = target.y - ROOT.y;
    const d = Math.hypot(dx, dy) || 1;
    let acc = { ...ROOT };
    pts[0] = { ...ROOT };
    LENGTHS.forEach((len, i) => {
      acc = { x: acc.x + (dx / d) * len, y: acc.y + (dy / d) * len };
      pts[i + 1] = { ...acc };
    });
    return pts;
  }

  for (let it = 0; it < iterations; it++) {
    // backward: end effector to target
    pts[pts.length - 1] = { ...target };
    for (let i = pts.length - 2; i >= 0; i--) {
      const d = dist(pts[i + 1], pts[i]) || 1e-6;
      const r = LENGTHS[i] / d;
      pts[i] = {
        x: pts[i + 1].x + (pts[i].x - pts[i + 1].x) * r,
        y: pts[i + 1].y + (pts[i].y - pts[i + 1].y) * r,
      };
    }
    // forward: re-pin the root
    pts[0] = { ...ROOT };
    for (let i = 0; i < pts.length - 1; i++) {
      const d = dist(pts[i + 1], pts[i]) || 1e-6;
      const r = LENGTHS[i] / d;
      pts[i + 1] = {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * r,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * r,
      };
    }
  }
  return pts;
}

/** The naive alternative: move the end, let everything in between stretch. */
function naive(target: P): P[] {
  const pts = REST.map((p) => ({ ...p }));
  pts[pts.length - 1] = { ...target };
  pts[2] = {
    x: (pts[1].x + target.x) / 2,
    y: (pts[1].y + target.y) / 2,
  };
  return pts;
}

const clamp01 = (v: number) => Math.min(100, Math.max(0, v));

export default function ConstraintLab() {
  const [target, setTarget] = useState<P>(REST[REST.length - 1]);
  const [constrained, setConstrained] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  /** Arrow keys move the club head, so the demo is not drag-only. */
  const nudge = useCallback((dx: number, dy: number) => {
    setTouched(true);
    setTarget((t) => ({ x: clamp01(t.x + dx), y: clamp01(t.y + dy) }));
  }, []);

  const chain = useMemo(
    () => (constrained ? solve(target) : naive(target)),
    [target, constrained],
  );

  // Largest deviation from rest bone length — 0 while constraints hold.
  const drift = useMemo(() => {
    let worst = 0;
    for (let i = 0; i < chain.length - 1; i++) {
      worst = Math.max(worst, Math.abs(dist(chain[i], chain[i + 1]) - LENGTHS[i]));
    }
    return worst;
  }, [chain]);

  const toLocal = useCallback((clientX: number, clientY: number): P | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * 100,
      y: ((clientY - r.top) / r.height) * 100,
    };
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      if (p) setTarget(p);
    };
    const up = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, toLocal]);

  const head = chain[chain.length - 1];
  const grip = chain[2];

  return (
    /*
      No `.card` here. This component is always rendered inside the case
      card in WorkConsole, and a card inside a card with the same border and
      background is the literal box-inside-a-box: two frames of equal strength
      with nothing to tell the eye which one is the object. The plot below
      states the extent; the root does not need to.
    */
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-lead font-bold leading-tight text-cyan">
            Constraint solver
          </p>
          {/*
            The invariant, set where it is enforced. `drift` below is the worst
            violation of exactly this expression, measured every frame.
          */}
          <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="eq text-fine font-semibold text-amber">
              <span className="norm">||</span>p<sub>i</sub> − p<sub>i+1</sub>
              <span className="norm">||</span> = L<sub>i</sub>
            </span>
            <span className="font-text text-fine text-dim">for every bone, every frame</span>
          </p>
        </div>
        {/*
          Labelled by its action, not its state. Read as "Physics ON" this was
          a status badge nobody pressed — and the demo only makes its argument
          once you turn the constraints off.
        */}
        <button
          type="button"
          aria-pressed={!constrained}
          onClick={() => setConstrained((v) => !v)}
          className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-sm border px-3.5 font-mono text-micro transition-colors duration-300 ${
            constrained
              ? 'border-amber text-amber hover:bg-amber hover:text-void'
              : 'border-signal bg-signal/15 text-signal'
          }`}
        >
          {constrained ? <Unlock size={13} strokeWidth={2} /> : <Lock size={13} strokeWidth={2} />}
          {constrained ? 'Turn physics off' : 'Turn physics on'}
        </button>
      </div>

      <div className="well relative mt-4 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          tabIndex={0}
          /*
           * `role="application"` was here. It forces a screen reader out of
           * browse mode and hands every key to the widget — a heavy instrument
           * for something that already has a complete text alternative in the
           * aria-live readout below. `role="img"` states what it is; the
           * arrow-key affordance is described in the label and the tabIndex
           * keeps it reachable.
           */
          role="img"
          aria-label="Kinematic chain. Drag the club head, or move it with the arrow keys."
          /*
           * pan-y, not none: a vertical swipe starting here must still scroll
           * the page. This sits mid-hero on mobile, so touch-action: none read
           * as the whole site freezing.
           */
          className="h-[17rem] w-full select-none [touch-action:pan-y] sm:h-[19rem]"
          onPointerDown={(e) => {
            const p = toLocal(e.clientX, e.clientY);
            if (p) {
              setTarget(p);
              setDragging(true);
              setTouched(true);
            }
          }}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 6 : 2;
            switch (e.key) {
              case 'ArrowLeft':
                nudge(-step, 0);
                break;
              case 'ArrowRight':
                nudge(step, 0);
                break;
              case 'ArrowUp':
                nudge(0, -step);
                break;
              case 'ArrowDown':
                nudge(0, step);
                break;
              case 'Home':
                setTarget(REST[REST.length - 1]);
                break;
              default:
                return;
            }
            e.preventDefault();
          }}
        >
          {/* ground plane */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 14}
              x2="100"
              y2={i * 14}
              stroke="rgb(var(--cyan))"
              strokeOpacity="0.06"
            />
          ))}
          <line x1="0" y1="93" x2="100" y2="93" stroke="rgb(var(--cyan))" strokeOpacity="0.28" />

          {/* static body */}
          <g stroke="rgb(var(--cyan))" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round">
            {BODY.map(([a, b], i) => (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            ))}
          </g>
          <circle cx="43" cy="12" r="4.2" stroke="rgb(var(--cyan))" strokeOpacity="0.4" strokeWidth="1.6" fill="none" />

          {/* arm chain */}
          <g strokeLinecap="round">
            {chain.slice(0, -1).map((p, i) => {
              const q = chain[i + 1];
              const isClub = i === chain.length - 2;
              const stretched = Math.abs(dist(p, q) - LENGTHS[i]) > 0.6;
              return (
                <line
                  key={i}
                  x1={p.x}
                  y1={p.y}
                  x2={q.x}
                  y2={q.y}
                  stroke={
                    isClub
                      ? 'rgb(var(--amber))'
                      : stretched
                        ? 'rgb(var(--signal))'
                        : 'rgb(var(--cyan-hot))'
                  }
                  strokeWidth={isClub ? 2 : 2.4}
                  strokeDasharray={stretched ? '3 2' : undefined}
                />
              );
            })}
          </g>

          {/* joints */}
          {chain.slice(0, -1).map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill="rgb(var(--cyan-hot))" />
          ))}

          {/* club head — the drag handle */}
          <g>
            <circle
              cx={head.x}
              cy={head.y}
              r={dragging ? 5 : 4}
              fill="rgb(var(--amber))"
              className="cursor-grab"
            />
            {!touched && (
              <circle
                cx={head.x}
                cy={head.y}
                r="7"
                fill="none"
                stroke="rgb(var(--amber))"
                strokeWidth="1"
                className="pulse-ring"
                style={{ transformOrigin: `${head.x}px ${head.y}px` }}
              />
            )}
          </g>

          {/* grip marker */}
          <circle cx={grip.x} cy={grip.y} r="2.6" fill="none" stroke="rgb(var(--amber))" strokeWidth="1.2" />
        </svg>

      </div>

      {!touched && (
        <p className="mt-2 flex items-center gap-1.5 font-mono text-micro text-amber">
          <Hand size={12} strokeWidth={2} className="shrink-0" />
          drag the club head · or use the arrow keys
        </p>
      )}

      {/*
        Readout — announced, so the result of a keyboard move is not
        visual-only. Three bordered tiles became one ruled row: three readings
        side by side already read as a group, and the boxes were three more
        frames inside a component that was itself inside two of them.
      */}
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-cyan/20 pt-3.5">
        <div>
          <dt className="tag-sm text-dim">Bone drift</dt>
          <dd
            className={`mt-1 font-display text-lead font-bold tabular-nums ${
              drift > 0.6 ? 'text-signal' : 'text-amber'
            }`}
          >
            {drift.toFixed(3)}
          </dd>
        </div>
        <div>
          <dt className="tag-sm text-dim">Solver</dt>
          <dd className="mt-1 font-display text-lead font-bold text-cyan">
            {constrained ? 'FABRIK' : 'none'}
          </dd>
        </div>
        <div>
          <dt className="tag-sm text-dim">Pose</dt>
          <dd
            className={`mt-1 font-display text-lead font-bold ${
              drift > 0.6 ? 'text-signal' : 'text-cyan'
            }`}
          >
            {drift > 0.6 ? 'invalid' : 'valid'}
          </dd>
        </div>
      </dl>

      <p aria-live="polite" className="sr-only">
        {constrained ? 'Solver FABRIK.' : 'Solver off.'} Bone drift {drift.toFixed(3)}. Pose{' '}
        {drift > 0.6 ? 'invalid' : 'valid'}.
      </p>

      <p className="copy-sm mt-4">
        {constrained
          ? 'Bone lengths are enforced as hard constraints, so every position you drag to is anatomically possible. This is what physics priors buy you.'
          : 'Without constraints the limb simply stretches to reach. The output still looks like a pose — it is just not one a body can hold.'}
      </p>

      <button
        type="button"
        onClick={() => {
          setTarget(REST[REST.length - 1]);
          setConstrained(true);
        }}
        className="-ml-2 mt-2 inline-flex min-h-[2.75rem] items-center gap-2 rounded-sm px-2 font-mono text-micro text-dim transition-colors hover:text-amber"
      >
        <RotateCcw size={13} strokeWidth={2} /> reset
      </button>
    </div>
  );
}
