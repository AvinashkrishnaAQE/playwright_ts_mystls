import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { userCredentials } from '../test-data/userCredentials';
import { CONSTANTS } from '../utils/constants';

setup('authenticate as platform admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.navigate();
  await loginPage.login(
    userCredentials.validUser.username,
    userCredentials.validUser.password
  );

  await dashboardPage.verifyDashboardLoaded();

  // Save authentication storage state
  await page.context().storageState({ path: CONSTANTS.STORAGE_STATE_PATH });
});
