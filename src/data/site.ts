export const site = {
  name: 'Pradeep Rajasekar',
  role: 'AI Research Engineer',
  location: 'New Taipei City, Taiwan',
  email: 'ajishpradeep@gmail.com',
  resume: '/Resume.pdf',
  portrait: '/profile_pic.png',
  tagline:
    'I build AI systems where the mathematics has to survive contact with production.',
  intro:
    'Four years turning research architectures into systems that run on real hardware, for real users — 3D human pose on-device at 240fps, agentic LLM systems grounded in domain facts, vision AI deployed in unmanned retail. The through-line is not a domain. It is the mathematics: linear algebra, probabilistic modelling, multi-view geometry, optimisation. Those transfer. Domains are just where you point them.',
  links: [
    { label: 'Email', href: 'mailto:ajishpradeep@gmail.com', handle: 'ajishpradeep@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Ajishpradeep', handle: '@Ajishpradeep' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ajishpradeep', handle: 'in/ajishpradeep' },
    { label: 'Site', href: 'https://ajish.online', handle: 'ajish.online' },
  ],
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Research', href: '/#research' },
  { label: 'About', href: '/about' },
] as const;

/** Headline numbers. Each one is traceable to a shipped system. */
export const marquee = [
  { value: '3cm', label: 'mean per-joint 3D error, down from 8cm' },
  { value: '240fps', label: 'on-device markerless tracking, no cloud' },
  { value: '29', label: 'keypoint pose model, body provably unbiased' },
  { value: '5M+', label: 'data points in production predictive models' },
  { value: 'GTC 2025', label: 'NVIDIA technical poster presenter' },
  { value: '638 → 1', label: 'TAITRA award, 55 countries' },
] as const;
