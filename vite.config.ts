import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          /*
            Its own chunk, not folded into `vendor` and not left in the app
            bundle. It is ~44KB gzipped and it changes on a completely
            different clock from the copy in `src` — a wording fix in
            `work.ts` should not make a returning visitor re-download the
            animation runtime, and a motion upgrade should not invalidate
            React.
          */
          motion: ['motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
