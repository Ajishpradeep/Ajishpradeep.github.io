import { useEffect, useMemo, useRef, useState } from 'react';

/*
 * The hero visual.
 *
 * This replaced a four-node capability graph — a skills wheel with icons
 * orbiting the word "Maths". No amount of polish makes a skills wheel specific
 * to anyone; every portfolio in the category has one, and it said nothing about
 * the work that a list of four words underneath was not already saying.
 *
 * What it shows now is the actual pipeline: two calibrated views, the same
 * joint seen from both, and the ray intersection that recovers it in 3D. That
 * is multi-view geometry, which is the first thing on the CV and the thing the
 * CV cannot demonstrate. The figure is a real skeleton with real bone topology
 * and fixed bone lengths, so it is also the physics claim standing up.
 *
 * Everything is derived from the same 3D joint table. Nothing here is a
 * decorative particle field pretending to be pose estimation.
 */

type V3 = { x: number; y: number; z: number };

/** Roughly human, y down, ~1.7 units tall, origin at the pelvis. */
const JOINTS: Record<string, V3> = {
  head: { x: 0, y: -0.86, z: 0.02 },
  neck: { x: 0, y: -0.68, z: 0 },
  lShoulder: { x: -0.21, y: -0.62, z: 0 },
  rShoulder: { x: 0.21, y: -0.62, z: 0 },
  lElbow: { x: -0.34, y: -0.34, z: 0.06 },
  rElbow: { x: 0.34, y: -0.34, z: 0.06 },
  lWrist: { x: -0.38, y: -0.06, z: 0.12 },
  rWrist: { x: 0.38, y: -0.06, z: 0.12 },
  spine: { x: 0, y: -0.32, z: 0 },
  pelvis: { x: 0, y: -0.02, z: 0 },
  lHip: { x: -0.15, y: 0, z: 0 },
  rHip: { x: 0.15, y: 0, z: 0 },
  lKnee: { x: -0.17, y: 0.42, z: 0.03 },
  rKnee: { x: 0.17, y: 0.42, z: 0.03 },
  lAnkle: { x: -0.18, y: 0.83, z: -0.02 },
  rAnkle: { x: 0.18, y: 0.83, z: -0.02 },
};

const BONES: [keyof typeof JOINTS, keyof typeof JOINTS][] = [
  ['head', 'neck'],
  ['neck', 'lShoulder'],
  ['neck', 'rShoulder'],
  ['lShoulder', 'lElbow'],
  ['rShoulder', 'rElbow'],
  ['lElbow', 'lWrist'],
  ['rElbow', 'rWrist'],
  ['neck', 'spine'],
  ['spine', 'pelvis'],
  ['pelvis', 'lHip'],
  ['pelvis', 'rHip'],
  ['lHip', 'lKnee'],
  ['rHip', 'rKnee'],
  ['lKnee', 'lAnkle'],
  ['rKnee', 'rAnkle'],
];

/** The joints the scene triangulates, in the order it walks them. */
const TARGETS: { key: keyof typeof JOINTS; label: string }[] = [
  { key: 'rWrist', label: 'right wrist' },
  { key: 'lKnee', label: 'left knee' },
  { key: 'head', label: 'head' },
  { key: 'rAnkle', label: 'right ankle' },
  { key: 'lElbow', label: 'left elbow' },
];

const W = 340;
const H = 320;
const CX = W / 2;
const CY = 138;
const FOCAL = 152;

/** Camera stations. Two views is the minimum that recovers metric depth. */
const CAMS = [
  { x: 34, y: 272, label: 'cam 1' },
  { x: 306, y: 272, label: 'cam 2' },
];

/** Rotate about Y, then project. The perspective divide is what sells depth. */
function project(p: V3, t: number) {
  const c = Math.cos(t);
  const s = Math.sin(t);
  const xr = p.x * c + p.z * s;
  const zr = -p.x * s + p.z * c;
  const k = 1 / (1 + zr * 0.42);
  return { x: CX + xr * FOCAL * k, y: CY + p.y * FOCAL * k, depth: zr };
}

export default function PipelineScene({ still }: { still: boolean }) {
  const [t, setT] = useState(0.55);
  const [target, setTarget] = useState(0);
  const raf = useRef(0);
  const clock = useRef(0.6);
  const wrap = useRef<HTMLDivElement>(null);

  // Rotation runs only while on screen, and not at all under reduced motion.
  useEffect(() => {
    if (still) return;
    const box = wrap.current;
    if (!box) return;
    let running = false;
    let last = 0;
    const step = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      clock.current += 0.0052 * dt;
      setT(Math.sin(clock.current) * 0.92);
      raf.current = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          last = performance.now();
          raf.current = requestAnimationFrame(step);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf.current);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(box);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [still]);

  // Walk the triangulated joint. Slow enough to read the label.
  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setTarget((i) => (i + 1) % TARGETS.length), 2800);
    return () => window.clearInterval(id);
  }, [still]);

  const pts = useMemo(() => {
    const out: Record<string, ReturnType<typeof project>> = {};
    for (const k of Object.keys(JOINTS)) out[k] = project(JOINTS[k], t);
    return out;
  }, [t]);

  const tgt = TARGETS[target];
  const hit = pts[tgt.key];

  return (
    <div ref={wrap} className="well relative aspect-[340/320] overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Two camera views triangulating a joint on a 3D skeleton. The figure rotates; bone lengths stay fixed."
      >
        {/* ground plane — gives the rotation something to rotate against */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="18"
            y1={244 + i * 15}
            x2={W - 18}
            y2={244 + i * 15}
            stroke="rgb(var(--cyan))"
            strokeOpacity={0.05 + i * 0.015}
          />
        ))}

        {/* sight lines: both cameras see the same joint, and that is the point */}
        {CAMS.map((c) => (
          <line
            key={c.label}
            x1={c.x}
            y1={c.y}
            x2={hit.x}
            y2={hit.y}
            stroke="rgb(var(--amber))"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        ))}

        {/* bones, depth-cued so the far side of the body recedes */}
        {BONES.map(([a, b]) => {
          const pa = pts[a];
          const pb = pts[b];
          const near = 1 - Math.min(1, Math.max(0, (pa.depth + pb.depth) / 2 + 0.5));
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="rgb(var(--cyan-hot))"
              strokeOpacity={0.3 + near * 0.6}
              strokeWidth={1.6 + near * 1.1}
              strokeLinecap="round"
            />
          );
        })}

        {/* joints */}
        {Object.entries(pts).map(([k, p]) => {
          const on = k === tgt.key;
          const near = 1 - Math.min(1, Math.max(0, p.depth + 0.5));
          return (
            <circle
              key={k}
              cx={p.x}
              cy={p.y}
              r={on ? 4.6 : 2.1 + near * 0.9}
              fill={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
              fillOpacity={on ? 1 : 0.45 + near * 0.5}
            />
          );
        })}

        {/* the recovered point, ringed */}
        <circle
          cx={hit.x}
          cy={hit.y}
          r="11"
          fill="none"
          stroke="rgb(var(--amber))"
          strokeOpacity="0.55"
          strokeWidth="1"
        />

        {/* cameras */}
        {CAMS.map((c) => {
          const dx = hit.x - c.x;
          const dy = hit.y - c.y;
          const a = (Math.atan2(dy, dx) * 180) / Math.PI;
          return (
            <g key={c.label} transform={`translate(${c.x} ${c.y}) rotate(${a})`}>
              {/* frustum, pointing at what it is looking at */}
              <path
                d="M 0 0 L 26 -11 L 26 11 Z"
                fill="rgb(var(--amber))"
                fillOpacity="0.1"
                stroke="rgb(var(--amber))"
                strokeOpacity="0.6"
                strokeWidth="1"
              />
              <circle r="4" fill="rgb(var(--void))" stroke="rgb(var(--amber))" strokeWidth="1.4" />
            </g>
          );
        })}
      </svg>

      {/* Live readout. HTML, so it is real type at a real size. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
        <p className="font-mono text-micro leading-tight text-dim">
          <span className="text-amber">2 views</span> → 1 point
          <br />
          <span className="text-cyan/80">{tgt.label}</span>
        </p>
        <p className="text-right font-mono text-micro leading-tight text-dim">
          bone length
          <br />
          <span className="text-amber">fixed</span>
        </p>
      </div>
    </div>
  );
}
