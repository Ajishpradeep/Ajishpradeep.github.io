export type LabProject = {
  name: string;
  url: string;
  /**
   * Drawn from the repository's own README — not extrapolated. The one
   * exception is Pulse, whose repository has no README at all; its description
   * is written from memory of building the thing, which is a different kind of
   * claim and is noted here rather than left to look like the others.
   */
  description: string;
  language?: string;
  tags: string[];
  year: string;
};

/**
 * Personal builds, verified against each repository's README before listing.
 * Forks, tutorial follow-alongs and empty repos are deliberately excluded.
 */
export const lab: LabProject[] = [
  {
    name: 'CarbonPass',
    url: 'https://github.com/Ajishpradeep/CarbonPass',
    description:
      'Local-first AI that turns a Taiwanese factory’s photographed paperwork into carbon accounting — product footprint against the EU CBAM template, material-loss mapping, grid-aware production scheduling and anonymised peer benchmarking. Runs a vision-language model on-premise so documents never leave the building.',
    language: 'Python',
    tags: ['Local VLM', 'OR-Tools MILP', 'FastAPI', 'CBAM'],
    year: '2026',
  },
  {
    name: 'Magic Shuffle',
    url: 'https://github.com/Ajishpradeep/Magic-Shuffle',
    description:
      'A song picker that reads your state — energy, sleep, stress — alongside the weather and what your calendar says is next, then chooses a track and explains why it fits. Spotify verifies every track the model names, and a deterministic path produces the same quality of result with no API keys at all.',
    language: 'JavaScript',
    tags: ['LLM grounding', 'Spotify API', 'Deterministic fallback'],
    year: '2026',
  },
  {
    name: 'data_automation_pipeline',
    url: 'https://github.com/Ajishpradeep/data_automation_pipeline',
    description:
      'A data-preparation pipeline converting PDFs, web pages and source files into clean Markdown for LLM consumption, preserving LaTeX formulae and code blocks while normalising everything around them. Parallelised, with optional OCR for scientific PDFs.',
    language: 'Python',
    tags: ['LLM data prep', 'LaTeX preservation', 'OCR'],
    year: '2025',
  },
  {
    name: 'CardPilot',
    url: 'https://github.com/Ajishpradeep/LLM-on-Business-card',
    description:
      'Multimodal extraction from business card images into structured records, embedded into a ChromaDB vector store so the collection answers natural-language queries rather than exact-match lookups.',
    language: 'Python',
    tags: ['Gemini', 'ChromaDB', 'Semantic search', 'Gradio'],
    year: '2025',
  },
  {
    name: 'pi_generator',
    url: 'https://github.com/Ajishpradeep/pi_generator',
    description:
      'Two architectures — a masked transformer and a RealNVP normalising flow — learning the same 5-dimensional point distribution, compared on MMD, KL divergence and Wasserstein distance. An exercise in whether the samples genuinely match the target distribution rather than merely looking plausible.',
    language: 'Python',
    tags: ['Normalising flows', 'Transformers', 'Distribution metrics'],
    year: '2024',
  },
  {
    name: 'Pulse',
    url: 'https://github.com/Ajishpradeep/pulse',
    description:
      'A shared 3D world on a projector at a live event: attendees scan a QR code, appear as characters around a city, and their facial emotion drives both their character and a room-mood panel. Emotion is computed on the phone — only the resulting label crosses the network. Built in a day.',
    language: 'Python · three.js',
    tags: ['Real-time', 'WebSocket', 'On-device inference', 'Privacy'],
    year: '2026',
  },
];
