export type DomainKey = 'vision' | 'llm' | 'edge' | 'maths';

/** The four things I actually do, for the hero's icon row. */
export const domains: { key: DomainKey; label: string; note: string }[] = [
  { key: 'vision', label: '3D Vision', note: 'pose · geometry · reconstruction' },
  { key: 'llm', label: 'Agentic LLMs', note: 'grounding · tool use · evaluation' },
  { key: 'edge', label: 'Edge Inference', note: 'CoreML · TensorRT · quantisation' },
  { key: 'maths', label: 'Foundations', note: 'linear algebra · probability' },
];
