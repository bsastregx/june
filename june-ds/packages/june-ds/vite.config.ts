import { defineConfig } from 'vite';
import { resolve } from 'path';
import { kasstor } from '@genexus/vite-plugin-kasstor';

export default defineConfig({
  plugins: [kasstor()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'june-ds',
    },
    rollupOptions: {
      external: [/^lit/, /^@lit/, /^@genexus\/kasstor/],
    },
    minify: false,
    sourcemap: true,
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
