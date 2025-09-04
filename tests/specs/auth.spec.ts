import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('test', async ({ page }) => {
  await page.goto('https://test-server-pro.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByRole('textbox', { name: 'E-mail*' }).click();
  await page.getByRole('textbox', { name: 'E-mail*' }).fill(process.env.LOGIN!);
  await page.getByRole('textbox', { name: 'Пароль*' }).click();
  await page.getByRole('textbox', { name: 'Пароль*' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.locator('header').getByRole('img').nth(1).click();

  await page.context().storageState({ path: authFile });
});
