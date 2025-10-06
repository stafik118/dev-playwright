import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class Landing extends BasePage {
  private readonly contentPageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.contentPageLocator = this.page.locator('.__variable_93a0e0.__variable_fe7774');
  }
  async open() {
    await this.page.goto('https://test-server-pro.ru/');
  }
  async contentPageHasCorrectLayout() {
    await expect(this.contentPageLocator).toBeVisible();
    await expect(this.contentPageLocator).toHaveScreenshot('landing.png');
  }
}
