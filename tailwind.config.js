/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#06b6d4',
          500: '#06b6d4',
          900: '#164e63',
        },
        green: {
          400: '#10b981',
          500: '#10b981',
          900: '#064e3b',
        },
        yellow: {
          400: '#f59e0b',
          500: '#f59e0b',
          900: '#78350f',
        },
        orange: {
          400: '#f97316',
          500: '#f97316',
          900: '#7c2d12',
        },
        red: {
          400: '#ef4444',
          500: '#ef4444',
          900: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
};