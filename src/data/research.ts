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
    title: 'Transformer Architecture — a mathematical deconstruction',
    venue: 'Public technical writing · Case Study repository',
    year: '2024',
    status: 'published',
    summary:
      'A step-by-step mathematical walkthrough of the transformer, alongside experiments in triplet-loss embedding retrieval, VQA and vision-transformer depth estimation.',
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

export const principles = [
  {
    n: '01',
    title: 'A metric that cannot see the failure is not a metric',
    body: 'A sport-specific model once scored better while getting demonstrably worse, because the validation set contained only poses where the bias was correct. Before trusting a number, I ask what failure it is structurally incapable of detecting.',
  },
  {
    n: '02',
    title: 'Make the regression impossible, not unlikely',
    body: 'Where a constraint really matters, I prefer architecture over regularisation — freezing a pathway so its outputs are bit-identical by construction is a guarantee. A penalty term is a hope with a coefficient.',
  },
  {
    n: '03',
    title: 'The shape of an error names its cause',
    body: 'Error that is U-shaped in distance means receptive field. Error that is stable across sessions but clustered by region means convention, not scale. Reading that structure is usually faster than another ablation sweep.',
  },
  {
    n: '04',
    title: 'Know which failures training cannot fix',
    body: 'An out-of-distribution artefact is absent from train and validation by definition, so no loss function can see it. Recognising that early saves the weeks otherwise spent on losses that were never going to converge on the problem.',
  },
  {
    n: '05',
    title: 'Deterministic where it can be, generative where it must be',
    body: 'In domains where a confident wrong number causes real harm, the model narrates and Python computes. Constraining a system to what it can be held to is a design decision, not a limitation.',
  },
  {
    n: '06',
    title: 'Write down what is still broken',
    body: 'Every system I hand over documents its open failures as precisely as its results. Undocumented known-unknowns are simply defects with a delay.',
  },
];
