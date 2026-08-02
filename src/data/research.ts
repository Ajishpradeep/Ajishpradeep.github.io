export type Entry = {
  title: string;
  venue: string;
  year: string;
  status: 'published' | 'presented' | 'in-progress';
  summary: string;
  href?: string;
};

export const research: Entry[] = [
  {
    title: 'Scalable Vision AI for Planogram Compliance',
    venue: 'NVIDIA GTC 2025 — Technical Poster',
    year: '2025',
    status: 'presented',
    summary:
      'Detection combined with fine-tuned vector embeddings to allow catalogue growth without retraining, presented as a research-to-production methodology for retail vision systems.',
  },
  {
    title: 'Content and Spatial Aware Generative Model for Inpainting',
    venue: 'MSc Thesis — National Taipei University of Technology',
    year: '2023',
    status: 'published',
    summary:
      'A GAN architecture integrating contextual and spatial attention, addressing mode collapse, memorisation and underfitting in low-data regimes through extended receptive-field capacity.',
  },
  {
    title: 'Efficient LLM Inference via Kolmogorov–Arnold Networks',
    venue: 'Independent research',
    year: 'in progress',
    status: 'in-progress',
    summary:
      'Investigating substitution of dense MLP blocks with KAN layers to reduce inference cost — connecting function-approximation theory to deployment on resource-constrained hardware.',
  },
  {
    title: 'Pose Lifting and Biomechanical Motion Analysis',
    venue: 'Applied R&D — IdeasLab Formosa',
    year: '2025 —',
    status: 'in-progress',
    summary:
      'Ongoing research in temporal consistency modelling, multi-view geometric constraints and on-device inference optimisation for markerless motion capture.',
  },
  {
    title: 'The Transformer Architecture — a mathematical walkthrough',
    venue: 'Public technical writing',
    year: '2024',
    status: 'published',
    summary:
      'A step-by-step mathematical treatment of the transformer, carrying one worked example from tokenisation and positional encoding through multi-head self-attention to the decoder’s masked attention and final softmax.',
    href: 'https://github.com/Ajishpradeep/Case_Study',
  },
];

export const recognition = [
  {
    title: 'NVIDIA GTC 2025',
    detail: 'Technical poster presenter — scalable vision AI for retail compliance.',
    year: '2025',
  },
  {
    title: 'TAITRA "Go Healthy Taiwan" Award',
    detail:
      'Technical lead behind the winning proposal — selected from 638 submissions across 55 countries.',
    year: '2025',
  },
  {
    title: 'Taiwan Expo Europe, Poland',
    detail: 'Selected as lead engineering representative to present AI capabilities.',
    year: '2026',
  },
];

/** What I actually do, grouped so a reader can find their own vocabulary quickly. */
export const capabilities = [
  {
    area: 'Mathematical foundations',
    detail:
      'Linear algebra, probabilistic modelling, multi-view geometry, optimisation theory, information theory, contrastive learning. The part that transfers between domains.',
    items: ['Multi-view geometry', 'Optimisation', 'Probabilistic modelling', 'Temporal modelling'],
  },
  {
    area: 'Computer vision',
    detail:
      '2D/3D pose estimation, object detection, 3D reconstruction, kinematic and biomechanical analysis, temporal consistency under occlusion and fast motion.',
    items: ['Pose estimation', 'YOLO / DETR', '3D reconstruction', 'Gaussian splatting'],
  },
  {
    area: 'LLMs & agentic systems',
    detail:
      'Fine-tuning on domain corpora, agentic workflows with tool use, structured grounding, RAG pipelines, evaluation design for systems where wrong answers are costly.',
    items: ['Fine-tuning', 'Tool use', 'Structured grounding', 'Claude / Gemini APIs'],
  },
  {
    area: 'Deployment & inference',
    detail:
      'CoreML and ARM edge deployment, TensorRT, DeepStream, quantisation and compression, cloud-native microservices, inference-cost optimisation.',
    items: ['CoreML', 'TensorRT', 'Edge AI', 'GCP Vertex AI'],
  },
  {
    area: 'Research leadership',
    detail:
      'Technical proposals and conference submissions, AI coding standards for engineering teams, mentorship, cross-functional collaboration with domain experts.',
    items: ['Proposal writing', 'AI coding standards', 'Mentorship', 'Research validation'],
  },
];

/**
 * Kept short on purpose — each one is a claim, not an essay.
 *
 * `from` names the case study the finding actually came out of, so a reader can
 * go and check it. Principle 06 has no single case behind it and deliberately
 * carries no link rather than an invented one.
 */
export const principles: {
  n: string;
  title: string;
  body: string;
  from?: { slug: string; section: string };
}[] = [
  {
    n: '01',
    title: 'A metric blind to the failure is not a metric',
    body: 'A model once scored better while getting worse — the validation set only contained poses where the bias was correct.',
    from: { slug: 'markerless-3d-motion', section: 'The failure nobody catches in the metrics' },
  },
  {
    n: '02',
    title: 'Make the regression impossible, not unlikely',
    body: 'Freezing a pathway so its output is bit-identical by construction is a guarantee. A penalty term is a hope with a coefficient.',
    from: { slug: 'markerless-3d-motion', section: 'Making the regression architecturally impossible' },
  },
  {
    n: '03',
    title: 'The shape of an error names its cause',
    body: 'U-shaped in distance means receptive field. Stable across sessions but clustered by region means convention, not scale.',
    from: { slug: 'markerless-3d-motion', section: 'Diagnosing by error structure, not by loss curve' },
  },
  {
    n: '04',
    title: 'Know which failures training cannot fix',
    body: 'An out-of-distribution artefact is absent from train and validation by definition. No loss function can see it.',
    from: { slug: 'markerless-3d-motion', section: 'Where training was the wrong tool' },
  },
  {
    n: '05',
    title: 'Deterministic where it can be',
    body: 'Where a confident wrong number causes harm, Python computes and the model narrates. That is a design decision, not a limitation.',
    from: { slug: 'agentic-coaching-llm', section: 'Two pipelines, deliberately opposite' },
  },
  {
    n: '06',
    title: 'Write down what is still broken',
    body: 'Undocumented known-unknowns are just defects with a delay. Every handover lists its open failures.',
  },
];
