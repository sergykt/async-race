import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ViteImageOptimizer({
      includePublic: true,
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]-[local]-[hash:base64:4]',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
  },
  server: {
    port: 3010,
  },
});
