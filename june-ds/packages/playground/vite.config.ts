import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@anthropic/june-ds': resolve(__dirname, '../june-ds/src/index.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
