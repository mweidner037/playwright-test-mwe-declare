import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: /.*test\.(js|ts|mjs)/,
  testDir: './tests',
  timeout: 30 * 1000,
  workers: 1,
};

export default config;
