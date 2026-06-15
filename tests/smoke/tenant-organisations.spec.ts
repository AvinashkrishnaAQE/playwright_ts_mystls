import { test, expect } from '../../fixtures/baseTest';
import { CONSTANTS } from '../../utils/constants';

test.describe('Tenant Organisations Smoke Tests', () => {
  // Reuse the saved storage state to skip the login flow
  test.use({ storageState: CONSTANTS.STORAGE_STATE_PATH });

  test('should navigate to Tenant Organisations and see Register Tenant text', async ({ dashboardPage, tenantOrganisationsPage }) => {
    // Navigate to the base URL (will bypass login if session is active)
    await dashboardPage.page.goto(CONSTANTS.BASE_URL);

    // Verify dashboard is loaded
    await dashboardPage.verifyDashboardLoaded();

    // Go to Tenant Organisations page
    await dashboardPage.clickTenantOrganisations();

    // Verify Register tenant text is visible
    await tenantOrganisationsPage.verifyRegisterTenantTextVisible();

    // Pause for 5 seconds to let the user see the final state
    await dashboardPage.page.waitForTimeout(5000);
  });

  test('should navigate to Tenant Onboarding page and fill details', async ({ dashboardPage, tenantOrganisationsPage, tenantOnboardingPage }) => {
    // Navigate to the base URL (will bypass login if session is active)
    await dashboardPage.page.goto(CONSTANTS.BASE_URL);

    // Verify dashboard is loaded
    await dashboardPage.verifyDashboardLoaded();

    // Go to Tenant Organisations page
    await dashboardPage.clickTenantOrganisations();

    // Click on Register Tenant
    await tenantOrganisationsPage.clickRegisterTenant();

    // Verify Tenant Onboarding header is visible
    await tenantOnboardingPage.verifyPageLoaded();

    // Fill the onboarding details
    await tenantOnboardingPage.selectStarterPlan();
    await tenantOnboardingPage.fillOrganisationName('MindTree');
    await tenantOnboardingPage.selectIndustry('Healthcare');
    await tenantOnboardingPage.fillAddress('madhapur road');
    await tenantOnboardingPage.fillCity('Hyderabad');
    await tenantOnboardingPage.fillState('Telangana');
    await tenantOnboardingPage.fillCountry('india');
    await tenantOnboardingPage.fillPostalCode('500081');

    // Click Next and verify step 2 is visible
    await tenantOnboardingPage.clickNext();
    await tenantOnboardingPage.verifyStep2Loaded();

    // Pause for 5 seconds to let the user see the final state
    await dashboardPage.page.waitForTimeout(1000);
  });

  test('should navigate to Tenant Onboarding page and fail due to assertion logic mismatch', async ({ dashboardPage, tenantOrganisationsPage, tenantOnboardingPage }) => {
    // Navigate to the base URL (will bypass login if session is active)
    await dashboardPage.page.goto(CONSTANTS.BASE_URL);

    // Verify dashboard is loaded
    await dashboardPage.verifyDashboardLoaded();

    // Go to Tenant Organisations page
    await dashboardPage.clickTenantOrganisations();

    // Click on Register Tenant
    await tenantOrganisationsPage.clickRegisterTenant();

    // Verify Tenant Onboarding header is visible and get its text
    await tenantOnboardingPage.verifyPageLoaded();
    const headerText = await tenantOnboardingPage.pageHeader.textContent();

    // Fill the onboarding details
    await tenantOnboardingPage.selectStarterPlan();
    await tenantOnboardingPage.fillOrganisationName('MindTree');
    await tenantOnboardingPage.selectIndustry('Healthcare');
    await tenantOnboardingPage.fillAddress('madhapur road');
    await tenantOnboardingPage.fillCity('Hyderabad');
    await tenantOnboardingPage.fillState('Telangana');
    await tenantOnboardingPage.fillCountry('india');
    await tenantOnboardingPage.fillPostalCode('500081');

    // expect(headerText?.trim()).toBe('Admin Onboarding Dashboard');
  });
});
