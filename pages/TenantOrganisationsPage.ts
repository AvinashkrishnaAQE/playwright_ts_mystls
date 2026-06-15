import { Page, Locator } from '@playwright/test';
import { CommonActions } from '../utils/commonActions';

export class TenantOrganisationsPage {
  readonly page: Page;
  readonly actions: CommonActions;
  readonly registerTenantText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);

    this.registerTenantText = page.getByText('Register Tenant', { exact: true });
  }

  async verifyRegisterTenantTextVisible() {
    await this.actions.verifyLocatorVisible(this.registerTenantText);
  }

  async clickRegisterTenant() {
    await this.actions.clickElement(this.registerTenantText);
  }
}
