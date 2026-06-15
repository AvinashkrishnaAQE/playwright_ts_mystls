# Playwright TS Test Automation Framework

This repository contains a modular, maintainable, and type-safe test automation framework for the **Mystlc AI** dashboard. It is built using **Playwright**, **TypeScript**, and follows the **Page Object Model (POM)** pattern.

---

## Folder Structure

```text
pwts-mystls/
├── package.json               # Project scripts and dependencies
├── playwright.config.ts       # Global Playwright configuration
├── tsconfig.json              # TypeScript compiler settings
├── .env                       # Environment credentials and URLs (not committed to git)
├── .gitignore                 # Files and folders ignored by git
│
├── tests/                     # Test Suites
│   ├── smoke/                 # Basic checks (Login, quick navigation)
│   │   ├── login.spec.ts
│   │   └── tenant-organisations.spec.ts
│   └── regression/            # Full-flow validations
│       └── full-navigation.spec.ts
│
├── pages/                     # Page Object Models (Selectors & Interactions)
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── TenantOrganisationsPage.ts
│
├── fixtures/                  # Playwright Fixtures (Dependency Injection)
│   └── baseTest.ts
│
├── setup/                     # Global Setup scripts
│   └── auth.setup.ts          # Authenticates once & saves session state
│
├── test-data/                 # Test Data management
│   └── userCredentials.ts
│
└── utils/                     # Utility files
    ├── constants.ts
    └── commonActions.ts
```

---

## Configuration (`.env`)

Before running tests, create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://mystlc.ai/login
USER_NAME=avinash.peesapati@ascendqe.com
USER_PASSWORD=your_password_here
```

---

## Running the Tests

All tests run against the browser environment specified in `playwright.config.ts` (configured for Chromium).

### 1. Run All Tests
Runs all test suites sequentially/parallelly:
```bash
npm run test
```
*Or using Playwright directly:*
```bash
npx playwright test
```

### 2. Run Only Smoke Tests
Runs only the fast smoke tests:
```bash
npm run test:smoke
```
*Or:*
```bash
npx playwright test tests/smoke
```

### 3. Run Only Regression Tests
Runs the full end-to-end user navigation flows:
```bash
npm run test:regression
```
*Or:*
```bash
npx playwright test tests/regression
```

### 4. Run a Specific Test File
To run only a single test file (e.g. `login.spec.ts`):
```bash
npx playwright test tests/smoke/login.spec.ts
```

### 5. Run a Single Specific Test Case
To run a specific test case within a file by its title match:
```bash
npx playwright test -g "should successfully log in"
```

### 6. Run in Headed Mode (Watch Browser Open)
By default, tests run in headless mode (invisible background). To watch the browser open:
```bash
npm run test:headed
```
*Or add the `--headed` flag to any command:*
```bash
npx playwright test tests/smoke/login.spec.ts --headed
```

### 7. Run in Playwright Interactive UI Mode
Opens Playwright's interactive web panel where you can run, inspect, and step through tests visually:
```bash
npx playwright test --ui
```

### 8. Run in Debug Mode
Opens the Playwright Inspector tool, allowing you to step through test actions one by one:
```bash
npm run test:debug
```
*Or:*
```bash
npx playwright test --debug
```

---

## Test Results and Reporting

### JSON Reporter
The framework is configured to produce a JSON test execution report.
- The results file is generated at: **`results/result.json`**

You can inspect this file for detailed metrics on passing/failed tests, durations, and errors.
