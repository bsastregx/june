import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
  resolve: {
    alias: {
      '@anthropic/june-ds': resolve(__dirname, '../packages/june-ds/src'),
      '@june-ds': resolve(__dirname, '../packages/june-ds/src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [resolve(__dirname, '../packages/june-ds/src')],
      },
    },
  },
});
