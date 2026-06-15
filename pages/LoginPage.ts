import { Page, Locator } from '@playwright/test';
import { CommonActions } from '../utils/commonActions';
import { CONSTANTS } from '../utils/constants';

export class LoginPage {
  readonly page: Page;
  readonly actions: CommonActions;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.getByRole('button', { name: /Sign in/i });
  }

  async navigate() {
    await this.actions.navigateTo(CONSTANTS.BASE_URL);
  }

  async login(username: string, password: string) {
    await this.actions.fillInput(this.emailInput, username);
    await this.actions.fillInput(this.passwordInput, password);
    await this.actions.clickElement(this.signInButton);

    // If an active session is detected, a popup is shown. Click "Proceed" to continue.
    const proceedButton = this.page.getByRole('button', { name: 'Proceed', exact: true });
    try {
      await proceedButton.waitFor({ state: 'visible', timeout: 5000 });
      await proceedButton.click();
    } catch (e) {
      // Proceed button didn't show up, continue login flow normally
    }

    await this.page.waitForLoadState('networkidle');
  }
}
