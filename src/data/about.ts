export const about = {
  headline: 'I work on the part of AI that has to be true.',
  paragraphs: [
    'I am an AI Research Engineer based in Taiwan, currently at IdeasLab Formosa. My work sits at the point where a research architecture stops being a paper and starts being something a person depends on — a phone that has to reconstruct a golf swing in three dimensions from two consumer cameras, a coaching system whose numbers change how someone moves their body, a store with no cashier in it.',
    'That transition is where most of the interesting problems live. A model that validates beautifully can be quietly broken in a way its own metric cannot see. A reconstruction can be internally consistent and absolutely meaningless. A language model can be fluent, confident and wrong. None of those are training problems, and none of them are visible from a loss curve.',
    'My background is mathematical rather than domain-specific, and that is deliberate. Linear algebra, probabilistic modelling, multi-view geometry and optimisation do not care whether the input is an image, a sentence or a skeleton. Having those foundations is what has let me move from generative models to retail vision to 3D biomechanics to agentic LLM systems without starting over each time — the domain changes, the mathematics does not.',
    'Alongside the engineering I write the technical narratives: proposals, conference submissions, mathematical walkthroughs. One of those proposals won an international award against 638 submissions. I also authored my organisation\'s AI coding standards and mentor the engineering team on working with AI tools without giving up reproducibility — which is, in the end, the same concern as everything else here.',
  ],
  timeline: [
    {
      year: '2025 —',
      role: 'AI Research Engineer',
      org: 'IdeasLab Formosa',
      place: 'Taipei, Taiwan',
      points: [
        'Led R&D of the 2D-to-3D pose lifting system behind a markerless golf-swing analysis app that runs its whole pipeline on the phone.',
        'Reduced mean per-joint error 8cm → 3cm, pelvis-relative; +30% reconstruction fidelity under occlusion and fast motion.',
        'Deployed to Apple ARM silicon via CoreML with no cloud round-trip and no footage leaving the device, used by PGA professionals.',
        'Architecting a domain-grounded agentic LLM coaching system with deterministic scoring and citable output.',
        'Authored the organisation\'s AI coding agent rules, skills and hooks; mentor the engineering team on AI-assisted development.',
        'Technical lead on the proposal that won the TAITRA "Go Healthy Taiwan" award; selected to represent engineering at Taiwan Expo Europe.',
      ],
    },
    {
      year: '2023 — 2025',
      role: 'AI Engineer',
      org: 'President Information Corp (統一資訊)',
      place: 'Taipei, Taiwan',
      points: [
        'Led a real-time planogram compliance system presented as a technical poster at NVIDIA GTC 2025.',
        'Combined dense detection with fine-tuned embeddings for training-free catalogue scaling.',
        'Deployed occlusion-robust product recognition to Taiwan\'s 8th unmanned 7-Eleven store, +30% performance.',
        'Built NVIDIA Metropolis microservices, TAO, DeepStream and TensorRT pipelines across cloud and edge.',
        'LLM-assisted NER on GCP Document AI; predictive analytics across 5M+ data points at 95% confidence.',
      ],
    },
    {
      year: '2021 — 2023',
      role: 'MSc, Electrical Engineering & Computer Science',
      org: 'National Taipei University of Technology',
      place: 'Taipei, Taiwan · GPA 3.8/4.0',
      points: [
        'Thesis: Content and Spatial Aware Generative Model for Inpainting.',
        'GAN architectures, attention mechanisms and the mathematical foundations of deep learning.',
      ],
    },
    {
      year: '2017 — 2021',
      role: 'Software Developer',
      org: 'AIBS Software Solutions',
      place: 'Coimbatore, India',
      points: [
        'Custom ERP systems for manufacturing workflows; inventory and tax tracking resolving 95% of reported discrepancies.',
        'Full-stack engineering — where the habit of shipping things people actually use started.',
      ],
    },
    {
      year: '2011 — 2014',
      role: 'BSc, Information Technology',
      org: 'Sri Ramakrishna Mission Vidyalaya College',
      place: 'Coimbatore, India · GPA 7.9/10',
      points: ['Foundations in computer science, algorithms and systems design.'],
    },
  ],
  // Reads as availability, not a job search — the difference is deliberate.
  // "Looking for a role" states a need; this states a standing openness to
  // work worth doing, which is what a visitor already mid-conversation
  // (a referral, a forwarded CV) wants confirmed, and what a visitor with
  // no specific ask in mind can still act on.
  open: {
    heading: 'What I’m open to',
    body: 'Interesting problems, research collaborations, and conversations about where mathematics-first AI can go next. Based in Taiwan, open to relocation.',
  },
} as const;
