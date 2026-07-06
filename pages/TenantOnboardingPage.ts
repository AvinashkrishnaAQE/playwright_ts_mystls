import { Page, Locator } from '@playwright/test';

import { CommonActions } from '../utils/commonActions';

export class TenantOnboardingPage {
  readonly page: Page;
  readonly actions: CommonActions;
  readonly pageHeader: Locator;
  readonly subscriptionStarterBtn: Locator;
  readonly organisationNameInput: Locator;
  readonly industryDropdown: Locator;
  readonly addressLine1Input: Locator;
  readonly cityInput: Locator;
  readonly countryInput: Locator;
  readonly nextBtn: Locator;
  readonly step2Header: Locator;
  readonly stateInput: Locator;
  readonly postalCodeInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);

    this.pageHeader = page.getByRole('heading', { name: 'Tenant Onboarding', exact: true });
    
    this.subscriptionStarterBtn = page.getByRole('button').filter({ hasText: 'Starter' });
    
    this.organisationNameInput = page.getByPlaceholder('e.g. Acme Corporation Pvt Ltd');
    this.industryDropdown = page.locator('select').filter({ hasText: /Select industry/i });
    this.addressLine1Input = page.getByPlaceholder('Street address, building number');
    this.cityInput = page.getByPlaceholder('e.g. Bengaluru');
    this.stateInput = page.getByPlaceholder('e.g. Karnataka');
    
    this.countryInput = page.getByPlaceholder('e.g. India');
    this.postalCodeInput = page.getByPlaceholder('e.g. 560001');
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.step2Header = page.getByText('Step 2 of 4: Contacts');
  }

  async verifyPageLoaded() {
    await this.actions.verifyLocatorVisible(this.pageHeader);
  }

  
  async selectStarterPlan() {
    await this.actions.clickElement(this.subscriptionStarterBtn);
  }

  async fillOrganisationName(name: string) {
    await this.actions.fillInput(this.organisationNameInput, name);
  }

  async selectIndustry(industry: string) {
    await this.industryDropdown.selectOption(industry);
  }

  async fillAddress(address: string) {
    await this.actions.fillInput(this.addressLine1Input, address);
  }

  async fillCity(city: string) {
    await this.actions.fillInput(this.cityInput, city);
  }

  async fillState(state: string) {
    await this.actions.fillInput(this.stateInput, state);
  }

  async fillCountry(country: string) {
    await this.actions.fillInput(this.countryInput, country);
  }

  async fillPostalCode(postalCode: string) {
    await this.actions.fillInput(this.postalCodeInput, postalCode);
  }

  async clickNext() {
    await this.actions.clickElement(this.nextBtn);
  }
  
//Verify step 2 loaded 
  async verifyStep2Loaded() {
    await this.actions.verifyLocatorVisible(this.step2Header);
  }
}
