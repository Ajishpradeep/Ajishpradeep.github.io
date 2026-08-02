export type DomainKey = 'geometry' | 'physics' | 'llm' | 'edge';

export type Domain = {
  key: DomainKey;
  /** Full name, used as the readout heading and the accessible label. */
  label: string;
  /** Compact form for the graph node and the tab strip. */
  short: string;
  /** One-line summary under the hero chips. */
  note: string;
  /** What the domain actually involves, shown in the graph readout. */
  blurb: string;
  /** The named skills under this domain. Rendered as text, never only as graphics. */
  skills: string[];
};

/**
 * The four capabilities, ordered by where the differentiation actually is:
 * geometry and physics first, applications after.
 *
 * This is the single source for every surface that names a domain — the hero
 * chips and the expertise graph both read it, so the two cannot drift apart.
 */
export const domains: Domain[] = [
  {
    key: 'geometry',
    label: 'Multi-view geometry',
    short: 'Geometry',
    note: 'calibration · triangulation · 3D lifting',
    blurb:
      'Recovering metric 3D from uncalibrated cameras — and knowing when the result is only correct up to an unknown scale.',
    skills: ['Calibration', 'Triangulation', '2D→3D lifting', 'Scale anchoring'],
  },
  {
    key: 'physics',
    label: 'Physics-infused models',
    short: 'Physics',
    note: 'bone-length · ROM · IK priors',
    blurb:
      'Physical law compiled into the network and the solver, so impossible outputs are unrepresentable rather than merely penalised.',
    skills: ['Bone-length', 'ROM priors', 'IK solvers', 'Temporal continuity'],
  },
  {
    key: 'llm',
    label: 'Agentic LLM systems',
    short: 'Agentic LLMs',
    note: 'grounding · tool use · evaluation',
    blurb:
      'Domain grounding where a confident wrong number causes real harm — deterministic computation, generated narration, and evaluation that tells them apart.',
    skills: ['Grounding', 'Tool use', 'Fine-tuning', 'Evaluation'],
  },
  {
    key: 'edge',
    label: 'Edge inference',
    short: 'Edge',
    note: 'CoreML · TensorRT · quantisation',
    blurb:
      'Making capable models cheap enough to run where they have to run — on the device, in real time, with no network.',
    skills: ['CoreML', 'TensorRT', 'Quantisation', 'ARM'],
  },
];
