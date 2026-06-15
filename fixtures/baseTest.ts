import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TenantOrganisationsPage } from '../pages/TenantOrganisationsPage';
import { TenantOnboardingPage } from '../pages/TenantOnboardingPage';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  tenantOrganisationsPage: TenantOrganisationsPage;
  tenantOnboardingPage: TenantOnboardingPage;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  tenantOrganisationsPage: async ({ page }, use) => {
    await use(new TenantOrganisationsPage(page));
  },
  tenantOnboardingPage: async ({ page }, use) => {
    await use(new TenantOnboardingPage(page));
  },
});

export { expect } from '@playwright/test';
