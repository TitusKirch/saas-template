import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

export default defineConfig<ConfigOptions>({
  use: {
    bypassCSP: true,
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  testMatch: '*.e2e.ts',
  timeout: 60000,
});
