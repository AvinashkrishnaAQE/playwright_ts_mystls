import { test } from '../../fixtures/baseTest';
import { userCredentials } from '../../test-data/userCredentials';

test.describe('Full Navigation Regression Tests', () => {
  // Start with a clean slate (no pre-saved auth state)
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should complete the entire user flow: Login -> Dashboard -> Tenant Organisations -> Register Tenant', async ({ loginPage, dashboardPage, tenantOrganisationsPage }) => {
    // 1. Navigate to login page and log in
    await loginPage.navigate();
    await loginPage.login(
      userCredentials.validUser.username,
      userCredentials.validUser.password
    );

    // 2. Validate Platform Admin Dashboard header is visible
    await dashboardPage.verifyDashboardLoaded();

    // 3. Click Tenant Organisations button
    await dashboardPage.clickTenantOrganisations();

    // 4. Validate Register Tenant text is visible on the new page
    await tenantOrganisationsPage.verifyRegisterTenantTextVisible();
  });
});
