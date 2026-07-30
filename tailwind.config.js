/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--void) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        'panel-hi': 'rgb(var(--panel-hi) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        'cyan-hot': 'rgb(var(--cyan-hot) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
        'amber-hot': 'rgb(var(--amber-hot) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        dim: 'rgb(var(--dim) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Funnel Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        mega: ['clamp(2.5rem, 7.5vw, 6.5rem)', { lineHeight: '1.06', letterSpacing: '0.02em' }],
        headline: ['clamp(1.75rem, 3.6vw, 3.25rem)', { lineHeight: '1.12', letterSpacing: '0.01em' }],
        title: ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2' }],
        lede: ['clamp(0.9375rem, 1.15vw, 1.0625rem)', { lineHeight: '1.75' }],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
