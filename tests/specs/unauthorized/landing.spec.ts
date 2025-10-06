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

test('Проверка страницы', async ({ page }) => {
  const landing = new Landing(page);
  await landing.open();
  await page.getByRole('list').filter({ hasText: 'СервисТарифыКонтакты' }).locator('span').click();
  await page.getByRole('tooltip').getByRole('link', { name: 'Аналитика конкурентов' }).click();
  await page.getByRole('link', { name: 'Подробнее' }).first().click();
  await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
});
