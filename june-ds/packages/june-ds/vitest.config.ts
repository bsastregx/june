import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          headless: true,
        },
      }),
      instances: [{ browser: 'chromium' }],
    },
    isolate: true,
  },
});
