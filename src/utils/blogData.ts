export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  keyInsights: string[];
  tags: string[];
  date: string; // ISO format
  category: 'mathematics' | 'vision' | 'language' | 'agents' | 'deployment';
  featured: boolean;
  pdfLink?: string;
  githubLink?: string;
  externalLink?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'transformer-breakdown',
    title: 'The Transformer Architecture: A Comprehensive Mathematical Walkthrough',
    summary: 'An in-depth exploration of how Transformers process and generate language through step-by-step mathematical explanation. Dissects encoder-decoder mechanisms, attention mechanics, and positional encoding from first principles.',
    keyInsights: [
      'Self-attention mechanisms enable parallel processing of variable-length sequences',
      'Positional encoding captures sequential information without recurrence',
      'Multi-head attention captures diverse representations simultaneously',
      'Layer normalization and residual connections stabilize deep architectures',
      'Mathematical foundations enable rapid transfer to new architectures'
    ],
    tags: ['Transformers', 'Mathematics', 'Deep Learning', 'Attention Mechanisms', 'NLP'],
    date: '2024-01-15',
    category: 'mathematics',
    featured: true,
    pdfLink: '/research/transformer-breakdown.pdf',
    githubLink: 'https://github.com/Ajishpradeep/Case_Study',
    externalLink: 'https://github.com/Ajishpradeep/Case_Study'
  }
  // Future case studies will be added here as they are created
  // Template for new case studies:
  // {
  //   id: 'case-study-id',
  //   title: 'Case Study Title',
  //   summary: 'Brief summary...',
  //   keyInsights: ['insight1', 'insight2', ...],
  //   tags: ['tag1', 'tag2', ...],
  //   date: '2024-XX-XX',
  //   category: 'vision' | 'mathematics' | 'language' | 'agents' | 'deployment',
  //   featured: false,
  //   githubLink: 'https://...',
  // }
];

export const getCaseStudiesByCategory = (category: BlogPost['category']): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getFeaturedCaseStudies = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getAllTags = (): string[] => {
  const allTags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
};

export const getCaseStudiesByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};
