export type DomainKey = 'geometry' | 'physics' | 'llm' | 'edge';

/**
 * The four capabilities, ordered by where the differentiation actually is:
 * geometry and physics first, applications after.
 */
export const domains: { key: DomainKey; label: string; note: string }[] = [
  { key: 'geometry', label: 'Multi-view geometry', note: 'calibration · triangulation · 3D lifting' },
  { key: 'physics', label: 'Physics-infused models', note: 'bone-length · ROM · IK priors' },
  { key: 'llm', label: 'Agentic LLM systems', note: 'grounding · tool use · evaluation' },
  { key: 'edge', label: 'Edge inference', note: 'CoreML · TensorRT · quantisation' },
];
