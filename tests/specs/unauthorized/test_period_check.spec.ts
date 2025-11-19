import { test, expect } from '@playwright/test';

test('Проверка плашки тестового периода', async ({ page }) => {
  await page.goto('https://test-server-pro.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByRole('textbox', { name: 'E-mail*' }).click();
  await page.getByRole('textbox', { name: 'E-mail*' }).fill(process.env.LOGIN2!);
  await page.getByRole('textbox', { name: 'Пароль*' }).click();
  await page.getByRole('textbox', { name: 'Пароль*' }).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.locator('header').getByRole('img').nth(1).click();
  await expect(page.getByText('Ваш тестовый период активен')).toBeVisible();
});
