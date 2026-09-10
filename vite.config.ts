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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'vendor';
          }
          if (/[\\/]node_modules[\\/]motion[\\/]/.test(id)) {
            return 'motion';
          }
          if (
            /[\\/]node_modules[\\/](three|@react-three[\\/]fiber|@react-three[\\/]drei)[\\/]/.test(id)
          ) {
            return 'three';
          }
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
