import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.describe('Группа тестов с разрешением 1920x1080', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Валидная аутентификация', async ({ page }) => {
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

  test('Проверка лэйаута', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signin');
    const element = page.locator('.page_page__jXKUq');
    await expect(element).toHaveScreenshot('authscreen.png');
  });

  test('Негативные тесты', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signin');
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('1111');
    await expect(page.getByText('Пожалуйста, введите корректный email!')).toBeVisible();
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.getByText('Пожалуйста, введите корректный email!')).toBeVisible();
    await page.getByRole('textbox', { name: 'Пароль*' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).fill('11111');
    await expect(page.getByText('Пожалуйста, введите корректный пароль!')).toBeVisible();
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.getByText('Пожалуйста, введите корректный пароль!')).toBeVisible();
  });

  test('Проверка перехода по кнопке Зарегистрируйтесь', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signin');

    await Promise.all([
      page.waitForURL('https://test-server-pro.ru/signup', { timeout: 5000 }),
      page.getByRole('link', { name: 'Зарегистрируйтесь' }).click(),
    ]);
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка перехода по лого', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signin');
    await page.locator('.Logo_logo__B9fZW.Logo_logo--adaptive__SN76z').click();
    await expect(
      page.getByRole('heading', {
        name: 'Сервис оцифровки и аналитики для увеличения продаж на Wildberries',
      }),
    ).toBeVisible();
  });

  test('Восстановление пароля', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signin');
    await page.getByRole('link', { name: 'Забыли пароль?' }).click();
    await page.getByRole('textbox', { name: 'Указанный при регистрации' }).click();
    await page.getByRole('textbox', { name: 'Указанный при регистрации' }).fill('staf118@mail.ru');
    await page.getByRole('button', { name: 'Получить ссылку' }).click();
    await expect(page.getByText('Успешно!')).toBeVisible();
  });

  test('Проверка глаза на странице авторизации', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signin');
    await page.locator('form path').first().click();
    await expect(page.locator('form').getByRole('img')).toBeVisible();
    await page.locator('form').getByRole('img').click();
    await expect(page.locator('form path').nth(1)).toBeVisible();
  });
});
