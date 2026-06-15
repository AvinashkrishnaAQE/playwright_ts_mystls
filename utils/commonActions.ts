import { Page, Locator, expect } from '@playwright/test';

export class CommonActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillInput(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async verifyTextVisible(text: string | RegExp, timeout = 10000) {
    await expect(this.page.getByText(text).first()).toBeVisible({ timeout });
  }

  async verifyLocatorVisible(locator: Locator, timeout = 10000) {
    await expect(locator).toBeVisible({ timeout });
  }
}
