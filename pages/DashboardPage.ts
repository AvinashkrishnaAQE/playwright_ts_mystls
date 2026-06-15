import { Page, Locator } from '@playwright/test';
import { CommonActions } from '../utils/commonActions';

export class DashboardPage {
  readonly page: Page;
  readonly actions: CommonActions;
  readonly dashboardHeader: Locator;
  readonly tenantOrganisationsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);


    this.dashboardHeader = page.getByText('Platform Admin Dashboard');

    this.tenantOrganisationsBtn = page.getByRole('link', { name: /Tenant Organisations/i });
  }

  async verifyDashboardLoaded() {
    await this.actions.verifyLocatorVisible(this.dashboardHeader);
  }

  async clickTenantOrganisations() {
    await this.actions.clickElement(this.tenantOrganisationsBtn);
    await this.page.waitForLoadState('networkidle');
  }
}
