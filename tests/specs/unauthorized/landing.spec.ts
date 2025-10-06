import test, { expect } from '@playwright/test';
import { Landing } from '../../pages/Landing';

test('Проверка лэйаута', async ({ page }) => {
  const landing = new Landing(page);
  await landing.open();
  await page
    .locator('div')
    .filter({ hasText: /^Аналитика магазина$/ })
    .click();
  await landing.contentPageHasCorrectLayout();
});
