import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', { outputFile: 'results/result.json' }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://mystlc.ai/login',
    viewport: null,
    launchOptions: {
      slowMo: 1000,
      args: ['--start-maximized'],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project to authenticate
    {
      name: 'setup',
      testDir: './setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Main browser project
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
      },
      // Dependency on the setup project ensures authentication runs first
      dependencies: ['setup'],
    },
  ],
});