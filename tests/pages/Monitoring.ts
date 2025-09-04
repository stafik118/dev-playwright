import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class Monitoring extends BasePage {
  async open() {
    await this.page.goto('https://test-server-pro.ru/monitoring');
  }
}
