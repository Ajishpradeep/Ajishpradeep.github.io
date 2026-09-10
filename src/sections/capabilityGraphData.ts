import { Axis3d, Atom, Brain, Gauge } from 'lucide-react';

/**
 * One phrase of the blurb is set in amber — the clause that carries the actual
 * claim, rather than the sentence that frames it. Split at the data layer and
 * not with markup in a template string, because the emphasis is a property of
 * the copy and a translator has to be able to move it.
 */
export type Blurb = { before: string; mark: string; after: string };

export type Vec3 = [number, number, number];

export type GraphDomain = {
  key: string;
  label: string;
  short: string;
  icon: typeof Axis3d;
  pos: Vec3;
  blurb: Blurb;
  /**
   * The receipt. Every capability here points at a case study that
   * demonstrates it.
   */
  proof: { slug: string; label: string };
};

/*
  THE SKILLS, AND THE FOUR THAT BELONG TO TWO DOMAINS AT ONCE.

  The cross-links are why this is a link graph and not four separate lists. A
  simple grouping says "one core, four domains" — true, and already said in a
  sentence. What it could not draw is the part that is actually unusual: that
  moving from generative models to retail vision to 3D biomechanics to
  coaching systems did not mean starting over, because the same techniques
  kept doing work on the other side.

  Every one of the four is something the case studies show:

    Scale anchoring       geometry ↔ physics
                          Metric scale is fixed by an anatomical prior — 204
                          bone measurements validated against published
                          anthropometric data.

    Temporal continuity   physics ↔ edge
                          Club telescoping resisted every training fix and was
                          solved at inference by a tracker enforcing shaft-length
                          consistency, in the deployed runtime, on the device.

    Grounding             geometry ↔ llm
                          The coaching system's 69 deterministic rules run on
                          biomechanics the geometry stack produced.

    Evaluation             llm ↔ physics
                          The site's own thesis: a metric that cannot see a fault
                          will certify it. That came out of a pose model; the
                          coaching system's evaluation exists to tell computed
                          numbers from generated ones. Same problem, both ends.

  Do not add a fifth to balance the picture. The sourcing rule binds a drawn
  relationship exactly as it binds a number.
*/
export type GraphSkill = { name: string; pos: Vec3; domains: string[] };

const length3 = (v: Vec3) => Math.hypot(v[0], v[1], v[2]) || 1;
const normalize3 = (v: Vec3): Vec3 => {
  const l = length3(v);
  return [v[0] / l, v[1] / l, v[2] / l];
};
const scale3 = (v: Vec3, s: number): Vec3 => [v[0] * s, v[1] * s, v[2] * s];
const add3 = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const cross3 = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

/** Two unit vectors perpendicular to `dir`, spanning the plane a fan sits in. */
function basisFor(dir: Vec3): [Vec3, Vec3] {
  const upGuess: Vec3 = Math.abs(dir[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = normalize3(cross3(upGuess, dir));
  const v = normalize3(cross3(dir, u));
  return [u, v];
}

/** A point on a small cone around `dir`, at azimuth `phi` (radians) and half-angle `cone`. */
function fan(dir: Vec3, phi: number, cone: number, radius: number): Vec3 {
  const [u, v] = basisFor(dir);
  const c = Math.cos(cone);
  const s = Math.sin(cone);
  const p: Vec3 = [
    dir[0] * c + (u[0] * Math.cos(phi) + v[0] * Math.sin(phi)) * s,
    dir[1] * c + (u[1] * Math.cos(phi) + v[1] * Math.sin(phi)) * s,
    dir[2] * c + (u[2] * Math.cos(phi) + v[2] * Math.sin(phi)) * s,
  ];
  return scale3(normalize3(p), radius);
}

/*
  THE LAYOUT, IN 3D.

  Four domains at the corners of a tetrahedron rather than a flat ring — a ring
  looks like the old 2D ellipse from one angle and a line from another; a
  tetrahedron reads as a solid from every angle the visitor rotates to. Each
  domain's own skills fan out on a small cone around its direction from the
  core, and a skill shared by two domains sits on the great-circle path
  between them, at a shorter radius — visibly *between* the two clusters it
  belongs to, which a flat layout could only ever assert with an edge.

  Placed, not force-solved — the same decision the 2D version made, carried
  into three dimensions instead of two.
*/
const R_DOMAIN = 4.2;
const R_SKILL = 6.5;
const R_BRIDGE = 5.2;
const CONE = (26 * Math.PI) / 180;

const DOMAIN_DIR: Record<string, Vec3> = {
  geometry: normalize3([1, 1, 1]),
  physics: normalize3([1, -1, -1]),
  llm: normalize3([-1, 1, -1]),
  edge: normalize3([-1, -1, 1]),
};

function fanPositions(key: string, count: number, baseDeg: number): Vec3[] {
  const dir = DOMAIN_DIR[key];
  return Array.from({ length: count }, (_, i) =>
    fan(dir, ((i / count) * 360 + baseDeg) * (Math.PI / 180), CONE, R_SKILL),
  );
}

const bridge = (a: string, b: string): Vec3 =>
  scale3(normalize3(add3(DOMAIN_DIR[a], DOMAIN_DIR[b])), R_BRIDGE);

const geometryFan = fanPositions('geometry', 3, 15);
const physicsFan = fanPositions('physics', 2, 40);
const llmFan = fanPositions('llm', 3, 70);
const edgeFan = fanPositions('edge', 4, 0);

export const domains: GraphDomain[] = [
  {
    key: 'geometry',
    label: 'Multi-view geometry',
    short: 'Geometry',
    icon: Axis3d,
    pos: scale3(DOMAIN_DIR.geometry, R_DOMAIN),
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
    pos: scale3(DOMAIN_DIR.physics, R_DOMAIN),
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
    label: 'LLM coaching systems',
    short: 'LLM',
    icon: Brain,
    pos: scale3(DOMAIN_DIR.llm, R_DOMAIN),
    blurb: {
      before: 'Grounding for domains where a confidently wrong number does real harm — ',
      mark: 'every figure computed deterministically',
      after: ', the model held to narration, and evaluation that tells them apart.',
    },
    proof: { slug: 'agentic-coaching-llm', label: 'LLM coaching system' },
  },
  {
    key: 'edge',
    label: 'Edge inference',
    short: 'Edge',
    icon: Gauge,
    pos: scale3(DOMAIN_DIR.edge, R_DOMAIN),
    blurb: {
      before: 'Making capable models cheap enough to run where they have to run — ',
      mark: 'on the device, at frame rate',
      after: ', with no network dependency and nothing leaving the hardware.',
    },
    proof: { slug: 'planogram-vision-ai', label: 'Retail vision at store scale' },
  },
];

export const skills: GraphSkill[] = [
  { name: 'Tool use', pos: llmFan[0], domains: ['llm'] },
  { name: 'RAG', pos: llmFan[1], domains: ['llm'] },
  { name: 'Fine-tuning', pos: llmFan[2], domains: ['llm'] },
  { name: 'Calibration', pos: geometryFan[0], domains: ['geometry'] },
  { name: 'Triangulation', pos: geometryFan[1], domains: ['geometry'] },
  { name: '2D→3D lifting', pos: geometryFan[2], domains: ['geometry'] },
  { name: 'Anatomical priors', pos: physicsFan[0], domains: ['physics'] },
  { name: 'IK solvers', pos: physicsFan[1], domains: ['physics'] },
  { name: 'CoreML', pos: edgeFan[0], domains: ['edge'] },
  { name: 'TensorRT', pos: edgeFan[1], domains: ['edge'] },
  { name: 'Quantisation', pos: edgeFan[2], domains: ['edge'] },
  { name: 'ARM', pos: edgeFan[3], domains: ['edge'] },
  { name: 'Grounding', pos: bridge('geometry', 'llm'), domains: ['geometry', 'llm'] },
  { name: 'Scale anchoring', pos: bridge('geometry', 'physics'), domains: ['geometry', 'physics'] },
  { name: 'Temporal continuity', pos: bridge('physics', 'edge'), domains: ['physics', 'edge'] },
  { name: 'Evaluation', pos: bridge('llm', 'physics'), domains: ['llm', 'physics'] },
];

export type GraphNode = {
  id: string;
  kind: 'core' | 'domain' | 'skill';
  pos: Vec3;
  label?: string;
  domainKeys?: string[];
};
export type GraphEdge = { id: string; a: string; b: string };

export const nodes: GraphNode[] = [
  { id: 'core', kind: 'core', pos: [0, 0, 0] },
  ...domains.map<GraphNode>((d) => ({ id: d.key, kind: 'domain', pos: d.pos, label: d.short })),
  ...skills.map<GraphNode>((s) => ({
    id: s.name,
    kind: 'skill',
    pos: s.pos,
    label: s.name,
    domainKeys: s.domains,
  })),
];

export const edges: GraphEdge[] = [
  ...domains.map<GraphEdge>((d) => ({ a: 'core', b: d.key, id: `core~${d.key}` })),
  ...skills.flatMap<GraphEdge>((s) => s.domains.map((d) => ({ a: s.name, b: d, id: `${s.name}~${d}` }))),
];

/** Exclusive skills first, so the readout opens on what only this domain does. */
export const skillsOf = (key: string) =>
  skills.filter((s) => s.domains.includes(key)).sort((a, b) => a.domains.length - b.domains.length);
