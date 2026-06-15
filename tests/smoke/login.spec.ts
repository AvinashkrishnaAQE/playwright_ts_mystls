import { test } from '../../fixtures/baseTest';
import { userCredentials } from '../../test-data/userCredentials';

test.describe('Login Smoke Tests', () => {
  // Override storageState to ensure login tests start from a clean state
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should successfully log in with valid credentials and see dashboard header', async ({ loginPage, dashboardPage }) => {
    await loginPage.navigate();
    await loginPage.login(
      userCredentials.validUser.username,
      userCredentials.validUser.password
    );
    await dashboardPage.verifyDashboardLoaded();
  });
});
