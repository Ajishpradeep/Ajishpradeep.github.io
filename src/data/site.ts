export const site = {
  name: 'Pradeep Rajasekar',
  role: 'AI Research Engineer',
  location: 'New Taipei City, Taiwan',
  email: 'ajishpradeep@gmail.com',
  resume: '/Resume.pdf',
  portrait: '/profile_pic.png',
  tagline:
    'Computer vision built on explicit mathematics, with physical law enforced inside the model.',
  /**
   * Positioned around the expertise, not around any employer's product.
   * Kept short — the hero carries icons and an interactive demo, not paragraphs.
   */
  intro:
    'I work on 3D computer vision where the mathematics is explicit and the physics is enforced — multi-view geometry, constrained optimisation and anatomical priors compiled into the network itself, so its output is physically possible by construction rather than merely plausible.',
  links: [
    { label: 'Email', href: 'mailto:ajishpradeep@gmail.com', handle: 'ajishpradeep@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Ajishpradeep', handle: '@Ajishpradeep' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ajishpradeep', handle: 'in/ajishpradeep' },
    { label: 'Site', href: 'https://ajishpradeep.github.io', handle: 'ajishpradeep.github.io' },
  ],
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Research', href: '/#research' },
  { label: 'About', href: '/about' },
] as const;

/**
 * Headline numbers. The last two are externally corroborated — see the impact
 * dossier for their sources.
 */
export const marquee = [
  { value: '3cm', label: 'mean per-joint 3D error, down from 8cm' },
  { value: '240fps', label: 'on-device markerless tracking, no cloud' },
  { value: '29', label: 'keypoint pose model, body provably unbiased' },
  { value: '7,000+', label: 'stores running the retail vision system' },
  { value: '1 of 3', label: 'winners from 638 proposals, 55 countries' },
  { value: 'Warsaw', label: 'Taiwan Expo Europe 2026, listed exhibitor' },
] as const;
