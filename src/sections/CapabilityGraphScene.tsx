import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import type { Line2, LineGeometry, LineSegments2, LineMaterial } from 'three-stdlib';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';
import type { GraphDomain, GraphNode, GraphEdge } from './capabilityGraphData';

/*
  THE COLOUR RAMP, IN THREE'S TERMS.

  Every other surface on the site reads its colour from a CSS custom property,
  which a WebGL canvas cannot do — a `THREE.Color` needs an actual number, not
  a variable a browser resolves at paint time. These are the same two theme
  worlds from `index.css`, copied once rather than read live, because they
  change only when the visitor flips the switch, not every frame.
*/
const PALETTE = {
  dark: { ink: '#e4e6ec', amber: '#5b8def', ground: '#121317' },
  light: { ink: '#1a1d25', amber: '#335ac7', ground: '#f4f5f8' },
} as const;

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/*
  Nodes sit no farther than `R_SKILL` (6.5 world units, see
  capabilityGraphData.ts) from the origin, in any direction the graph turns
  to. For a sphere of radius r to sit fully inside a camera's field of view
  at distance d, d must be at least r / sin(halfFOV) — any closer and points
  near the sphere's silhouette fall outside the frustum and are cropped. At
  this file's 42° FOV that minimum is ~18.1; this adds headroom so labels
  (which have their own pixel width beyond the point) clear the edge too.
  The wander below (up to ~0.5 units) is well inside that headroom.

  No node may ever disappear off-frame, at any zoom level — "bigger" is the
  container's job (it bleeds wide over the layout beside it, see Hero.tsx /
  CapabilityGraph.tsx), not the camera's. Pulling the camera closer than this
  floor to fake size back into a fixed-size frame is exactly the regression
  this constant guards against.
*/
const REST_DISTANCE = 22.1;

/** One node's private, never-repeating drift — see THE LIVING GRAPH below. */
type Wander = {
  ax: number;
  ay: number;
  az: number;
  fx: number;
  fy: number;
  fz: number;
  px: number;
  py: number;
  pz: number;
  pulseFreq: number;
  pulsePhase: number;
};

function GraphContent({
  nodes,
  edges,
  domains,
  lit,
  halfLit,
  pointing,
  opened,
  still,
  onOpenDomain,
  onPreviewDomain,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  domains: GraphDomain[];
  lit: Set<string>;
  halfLit: Set<string>;
  pointing: string | null;
  opened: string | null;
  still: boolean;
  onOpenDomain: (i: number) => void;
  onPreviewDomain: (i: number) => void;
}) {
  const { theme } = useTheme();
  const colors = PALETTE[theme];
  const inkColor = useMemo(() => new THREE.Color(colors.ink), [colors.ink]);
  const amberColor = useMemo(() => new THREE.Color(colors.amber), [colors.amber]);
  const camera = useThree((s) => s.camera);

  const groupRef = useRef<THREE.Group>(null);
  const depthRef = useRef(new Map<string, number>());
  const meshRefs = useRef(new Map<string, THREE.Mesh>());
  const nodeGroupRefs = useRef(new Map<string, THREE.Group>());
  const lineRefs = useRef(new Map<string, Line2 | LineSegments2>());
  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const litRef = useRef(lit);
  litRef.current = lit;
  const halfLitRef = useRef(halfLit);
  halfLitRef.current = halfLit;
  const pointingRef = useRef(pointing);
  pointingRef.current = pointing;

  const targetFor = (n: GraphNode) =>
    n.kind === 'core' || litRef.current.has(n.id) ? 1 : halfLitRef.current.has(n.id) ? 0.45 : 0;

  const applyVisual = (n: GraphNode, d: number, pulse: number) => {
    const mesh = meshRefs.current.get(n.id);
    if (mesh) {
      const on = n.kind === 'skill' && pointingRef.current === n.id;
      // The hub reads as the hub: fixed, and plainly the biggest sphere in
      // the scene, not just the amber one. Domains still pop larger when
      // their cluster comes forward — the visual half of "click a node and
      // it comes to the front" — and both resting floors stay raised well
      // above their old values, so an unlit node still reads as a node.
      const base =
        n.kind === 'core'
          ? 0.8
          : n.kind === 'domain'
            ? mix(0.32, 0.52, d)
            : mix(0.15, 0.24, d) + (on ? 0.04 : 0);
      mesh.scale.setScalar(base * pulse);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.copy(inkColor).lerp(amberColor, n.kind === 'core' ? 1 : d);
      mat.emissive.copy(amberColor);
      mat.emissiveIntensity = n.kind === 'core' ? 0.35 : d * 0.6;
    }
  };

  const applyEdge = (e: GraphEdge, d: number) => {
    const line = lineRefs.current.get(e.id);
    if (!line) return;
    const mat = line.material as LineMaterial;
    mat.opacity = mix(0.1, 0.65, d);
    mat.color.copy(inkColor).lerp(amberColor, d);
  };

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  /*
    THE LIVING GRAPH.

    Modelled on an Obsidian-style graph view, not a diagram — every node but
    the hub keeps a private, never-synchronised drift around its authored
    position, three sine waves at slightly different speeds per axis so no
    two nodes (and no single node on two axes) ever repeat in phase. A
    `Line` is drawn between whatever two live positions it's given each
    frame, so an edge is never a fixed-length rod: it visibly stretches and
    slackens as the nodes on either end wander, the way a spring or a real
    force-directed layout would read, without this graph's authored
    tetrahedron — the actual point of the drawing — ever coming apart.

    Skills wander a little more than domains (0.45 vs 0.28 world units,
    randomised further per node) — the leaves breathe more than the hubs
    they hang off. The hub itself never wanders positionally (see
    `applyVisual`'s fixed 0.8 base) — it only gets the same gentle scale
    pulse as everything else, so it reads as the still, plainly-largest
    centre the rest of the graph moves around, not one more drifting node.
  */
  const wanderById = useMemo(() => {
    const m = new Map<string, Wander>();
    nodes.forEach((n) => {
      if (n.kind === 'core') return;
      const amp = n.kind === 'domain' ? 0.28 : 0.45;
      m.set(n.id, {
        ax: amp * rand(0.75, 1.15),
        ay: amp * rand(0.75, 1.15),
        az: amp * rand(0.75, 1.15),
        fx: rand(0.11, 0.22),
        fy: rand(0.11, 0.22),
        fz: rand(0.11, 0.22),
        px: rand(0, Math.PI * 2),
        py: rand(0, Math.PI * 2),
        pz: rand(0, Math.PI * 2),
        pulseFreq: rand(0.15, 0.3),
        pulsePhase: rand(0, Math.PI * 2),
      });
    });
    return m;
  }, [nodes]);

  /** Wherever a node actually is on screen right now — wandered, not authored. */
  const livePosOf = (id: string): THREE.Vector3 => nodeGroupRefs.current.get(id)?.position ?? origin;

  /*
    THE TURN TO FACE, NOT A CAMERA MOVE.

    Opening a domain does not zoom or dolly the camera — it turns the whole
    graph, the same motion the idle drift already uses, until the clicked
    node's own fixed local position points at wherever the camera happened to
    be *at the moment of the click*. That target is computed once and frozen
    (not re-derived every frame from the live camera position): the visitor
    can freely drag their own view around mid-turn, or after it settles,
    without the graph fighting them to keep re-facing a moving camera. It
    aims at the node's authored position, not its wandered one — the wander
    is a few tenths of a unit, nowhere near enough to mis-aim the turn.
  */
  const facingQuat = useRef(new THREE.Quaternion());
  const fromVec = useMemo(() => new THREE.Vector3(), []);
  const toVec = useMemo(() => new THREE.Vector3(), []);

  const faceCamera = (id: string) => {
    const node = byId.get(id);
    if (!node) return;
    fromVec.set(...node.pos).normalize();
    toVec.copy(camera.position).normalize();
    facingQuat.current.setFromUnitVectors(fromVec, toVec);
  };

  // Freeze the target the instant a domain opens (or changes), using the
  // camera position at that moment — not a live, every-frame target.
  useEffect(() => {
    if (opened) faceCamera(opened);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  // Reduced motion: snap every node/edge/orientation once, no animation loop
  // — no wander and no pulse either, both are motion.
  useEffect(() => {
    if (!still) return;
    nodes.forEach((n) => {
      const d = targetFor(n);
      depthRef.current.set(n.id, d);
      applyVisual(n, d, 1);
    });
    edges.forEach((e) => {
      const d = Math.min(depthRef.current.get(e.a) ?? 0, depthRef.current.get(e.b) ?? 0);
      applyEdge(e, d);
    });
    if (opened) {
      faceCamera(opened);
      groupRef.current?.quaternion.copy(facingQuat.current);
    } else {
      groupRef.current?.quaternion.identity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, lit, halfLit, pointing, opened, theme]);

  /*
    THE IDLE DRIFT — ALWAYS RUNNING, NEVER STOPPED.

    A slowly wandering angular velocity, not a fixed-speed spin, so the graph
    reads as something adrift rather than a machine on a turntable. A new
    random target velocity is picked every few seconds and the current
    velocity eases toward it, which keeps the motion smooth (no snap) while
    never repeating on a noticeable cycle. There is no control that stops
    this: clicking a node only slows it — the drift keeps running underneath
    at a fifth of its usual speed, and the same turn-to-face pull from below
    layers on top of it, so the graph still visibly breathes while it holds
    on the node. Once the click's own hold expires (see `FOCUS_MS` in
    CapabilityGraph.tsx), both effects lift and the drift returns to full
    speed on its own.
  */
  const angVel = useRef({ x: 0, y: 0.12 });
  const angTarget = useRef({ x: 0, y: 0.12 });
  const nextPick = useRef(0);

  useFrame((state, delta) => {
    /*
      RECENTRING ON THE COLUMN, NOT ON THE CANVAS.

      This canvas's own box is not what a visitor's eye centres on. It
      bleeds wide (`-ml-[55%] w-[155%]` in CapabilityGraph.tsx) but that
      bleed is entirely leftward — the box's right edge is pinned to the
      text column's/card's right edge, so the box's own geometric centre
      sits well left of where the column (and the card sitting under this
      canvas at its real, unbled width) actually is. A camera pointed at
      the origin naturally centres the graph on the box's centre, which
      read as the graph hugging the left side with the whole right portion,
      above the card, sitting empty.

      `setViewOffset` shifts the render's principal point rather than the
      geometry — an off-axis frustum, the same technique VR and tiled
      multi-monitor rendering use, so nothing distorts or stretches; every
      sphere stays round. The shift is derived from those exact CSS
      fractions (0.55 and 1.55), not eyeballed: for a box of width
      `1.55·colW` whose right edge sits at the column's right edge, the
      box centre sits `0.225·colW` right of the box's own left edge while
      the column's centre sits `0.5·colW` right of the *column's* left
      edge, which is `0.55·colW` further right still — so the box centre
      trails the column centre by `0.275·colW`, i.e. `0.275/1.55` of the
      box's own width. If those bleed fractions ever change, this constant
      needs to move with them.

      The bleed itself is `lg:`-only (Tailwind's default 1024px), so this
      only applies there too — below it the container is un-bled and
      already centred, and shifting it would misalign it.
    */
    const persp = camera as THREE.PerspectiveCamera;
    if (persp.isPerspectiveCamera) {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        const RECENTER_FRACTION = 0.275 / 1.55;
        const w = state.size.width;
        const h = state.size.height;
        persp.setViewOffset(w, h, -RECENTER_FRACTION * w, 0, w, h);
      } else if (persp.view) {
        persp.clearViewOffset();
      }
    }

    const t = state.clock.elapsedTime;

    if (still) return;
    const dt = Math.min(delta * 60, 3);
    const k = 1 - Math.pow(1 - 0.06, dt);

    if (groupRef.current) {
      if (t > nextPick.current) {
        angTarget.current = {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.7 + 0.15,
        };
        nextPick.current = t + 2.5 + Math.random() * 3.5;
      }
      const velK = 1 - Math.pow(1 - 0.08, dt);
      angVel.current.x += (angTarget.current.x - angVel.current.x) * velK;
      angVel.current.y += (angTarget.current.y - angVel.current.y) * velK;
      const speed = opened ? 0.2 : 1;
      groupRef.current.rotation.x += angVel.current.x * delta * speed;
      groupRef.current.rotation.y += angVel.current.y * delta * speed;

      if (opened) groupRef.current.quaternion.slerp(facingQuat.current, k);
    }

    nodes.forEach((n) => {
      const want = targetFor(n);
      const cur = depthRef.current.get(n.id) ?? want;
      const next = cur + (want - cur) * k;
      depthRef.current.set(n.id, next);

      const w = wanderById.get(n.id);
      const pulse = w ? 1 + Math.sin(t * w.pulseFreq + w.pulsePhase) * 0.06 : 1 + Math.sin(t * 0.18) * 0.035;
      applyVisual(n, next, pulse);

      if (w) {
        const grp = nodeGroupRefs.current.get(n.id);
        grp?.position.set(
          n.pos[0] + Math.sin(t * w.fx + w.px) * w.ax,
          n.pos[1] + Math.sin(t * w.fy + w.py) * w.ay,
          n.pos[2] + Math.sin(t * w.fz + w.pz) * w.az,
        );
      }
    });

    edges.forEach((e) => {
      const d = Math.min(depthRef.current.get(e.a) ?? 0, depthRef.current.get(e.b) ?? 0);
      applyEdge(e, d);
      const line = lineRefs.current.get(e.id);
      if (!line) return;
      const a = livePosOf(e.a);
      const b = livePosOf(e.b);
      (line.geometry as LineGeometry).setPositions([a.x, a.y, a.z, b.x, b.y, b.z]);
    });
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 6]} intensity={0.55} />

      <group ref={groupRef}>
        {edges.map((e) => {
          const a = byId.get(e.a)!.pos;
          const b = byId.get(e.b)!.pos;
          return (
            <Line
              key={e.id}
              ref={(el) => el && lineRefs.current.set(e.id, el)}
              points={[a, b]}
              color={colors.ink}
              transparent
              opacity={0.12}
              lineWidth={1}
            />
          );
        })}

        {/*
          Each node is its own group, at its authored position — the group,
          not the mesh, is what the wander above moves every frame. The
          sphere and (when it has one) its label sit inside as plain
          children at local (0,0,0), so a label tracks its node's live,
          wandering position for free: `Html` re-projects from its parent's
          actual world matrix every frame, not from a prop set once.
        */}
        {nodes
          .filter((n) => n.kind !== 'core')
          .map((n) => {
            const domainIndex = n.kind === 'domain' ? domains.findIndex((d) => d.key === n.id) : -1;
            const domain = domainIndex >= 0 ? domains[domainIndex] : undefined;
            return (
              <group
                key={n.id}
                position={n.pos}
                ref={(el) => {
                  if (el) nodeGroupRefs.current.set(n.id, el);
                }}
              >
                <mesh ref={(el) => el && meshRefs.current.set(n.id, el)}>
                  <sphereGeometry args={[1, 16, 16]} />
                  <meshStandardMaterial color={colors.ink} roughness={0.5} metalness={0.1} />
                </mesh>

                {/*
                  Real, focusable, labelled buttons — not clickable meshes.
                  A WebGL canvas has no accessibility tree of its own, so
                  the keyboard/screen-reader path to "open a domain" lives
                  in the DOM.
                */}
                {domain && (
                  <Html center>
                    <button
                      type="button"
                      aria-label={`Open ${domain.label}`}
                      onClick={() => onOpenDomain(domainIndex)}
                      onPointerEnter={() => onPreviewDomain(domainIndex)}
                      onFocus={() => onPreviewDomain(domainIndex)}
                      className={`flex flex-col items-center gap-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                        lit.has(domain.key) ? 'text-amber' : 'text-dim'
                      }`}
                      style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
                    >
                      <domain.icon size={16} strokeWidth={1.8} />
                      <span
                        className="whitespace-nowrap font-mono text-[10px]"
                        style={{ textShadow: `0 0 4px ${colors.ground}, 0 0 8px ${colors.ground}` }}
                      >
                        {domain.short}
                      </span>
                    </button>
                  </Html>
                )}

                {n.kind === 'skill' && lit.has(n.id) && (
                  <Html center style={{ pointerEvents: 'none' }}>
                    <span
                      className={`whitespace-nowrap font-mono text-[10px] ${
                        pointing === n.id ? 'text-amber' : 'text-amber/75'
                      }`}
                      style={{ textShadow: `0 0 4px ${colors.ground}, 0 0 8px ${colors.ground}` }}
                    >
                      {n.label}
                    </span>
                  </Html>
                )}
              </group>
            );
          })}

        <mesh position={[0, 0, 0]} ref={(el) => el && meshRefs.current.set('core', el)}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color={colors.amber} roughness={0.4} metalness={0.15} />
        </mesh>
        <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none' }}>
          <span className="whitespace-nowrap font-display text-[11px] font-bold text-amber">Maths</span>
        </Html>
      </group>
    </>
  );
}

export default function CapabilityGraphScene({
  nodes,
  edges,
  domains,
  lit,
  halfLit,
  pointing,
  opened,
  still,
  onOpenDomain,
  onPreviewDomain,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  domains: GraphDomain[];
  lit: Set<string>;
  halfLit: Set<string>;
  pointing: string | null;
  opened: string | null;
  still: boolean;
  onOpenDomain: (i: number) => void;
  onPreviewDomain: (i: number) => void;
}) {
  return (
    /*
      Interactive immediately — no "click to enable" gate. `touch-action:
      pan-y` is the same guard the old SVG version relied on: a vertical
      single-finger swipe here is still a page scroll first, everything else
      (horizontal drag, pinch) reaches the controls below.
    */
    <div className="absolute inset-0" style={{ touchAction: 'pan-y' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, REST_DISTANCE], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GraphContent
          nodes={nodes}
          edges={edges}
          domains={domains}
          lit={lit}
          halfLit={halfLit}
          pointing={pointing}
          opened={opened}
          still={still}
          onOpenDomain={onOpenDomain}
          onPreviewDomain={onPreviewDomain}
        />
        {/*
          `minDistance` is the geometric fit-distance itself (~18.1 for this
          graph's radius, see the `REST_DISTANCE` comment above), not a
          closer, more-cropped value: zooming in is capped at the point where
          the whole graph just fits, so no amount of scrolling or pinching
          can push a node — domain or skill — out of frame. `far` is the only
          direction with room to move.
        */}
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.55}
          minDistance={18.2}
          maxDistance={28.6}
        />
      </Canvas>
    </div>
  );
}
