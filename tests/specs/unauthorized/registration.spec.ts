import test, { expect } from '@playwright/test';

test.describe('Группа тестов с разрешением 1920x1080', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  const fs = require('fs');

  function getNextEmail() {
    const counterFilePath = 'counter.txt';

    if (!fs.existsSync(counterFilePath)) {
      fs.writeFileSync(counterFilePath, '0');
    }

    let count = parseInt(fs.readFileSync(counterFilePath, 'utf8'), 10);
    count += 1;
    fs.writeFileSync(counterFilePath, count.toString());

    return `staf118+${count}@mail.ru`;
  }

  test('Проверка лэйаута регистрации', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    const element = page.locator('.page_page__container__Ox6l0');
    await expect(element).toHaveScreenshot('authscreen.png');
  });

  test('Проверка регистрации с валидными данными', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('textbox', { name: 'ФИО*' }).click();
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('Тестовый Тест Тестович');
    await page.getByRole('main').getByText('Хочу продавать на маркетплейсах').click();
    await expect(page.getByText('Хочу стать менеджером маркетплейсов')).toBeVisible();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).click();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).fill('+7 111 111 11 11');
    const email1 = getNextEmail();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill(email1);
    await page.getByRole('textbox', { name: 'Пароль*' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).fill('1111111');
    await page
      .getByRole('checkbox', {
        name: 'Я соглашаюсь с Договором публичной оферты и Политикой конфиденциальности',
      })
      .check();
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(page.getByRole('heading', { name: 'Остался всего один шаг' })).toBeVisible({
      timeout: 10000,
    });
    await page.getByRole('link', { name: 'Войти' }).click();
    await expect(page.getByRole('heading', { name: 'Вход' })).toBeVisible();
  });

  test('Проверка регистрации с невалидными данными', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(
      page.locator('#name_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await expect(page.getByText('Пожалуйста, введите корректный номер телефона')).toBeVisible();
    await expect(
      page.locator('#email_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await expect(
      page.locator('#password_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await expect(
      page.getByText('Пожалуйста, ознакомьтесь с нашей политикой обработки данных'),
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'ФИО*' }).click();
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('3');
    await expect(
      page.locator('#name_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'ФИО*' }).click();
    await page.getByRole('textbox', { name: 'ФИО*' }).fill(' ');
    await expect(page.getByText('Пожалуйста, введите не менее')).toBeVisible();
    await page.getByRole('textbox', { name: 'ФИО*' }).click();
    await page.getByRole('textbox', { name: 'ФИО*' }).fill(' №');
    await expect(page.getByText('Пожалуйста, заполните поле корректно!')).toBeVisible();
    await page.getByRole('textbox', { name: 'ФИО*' }).click();
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('gg');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(page.getByText('Пожалуйста, введите корректный номер телефона')).toBeVisible();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).click();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).fill('+7 111 11');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(page.getByText('Пожалуйста, введите корректный номер телефона')).toBeVisible();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).click();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).fill('a');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(page.getByText('Пожалуйста, введите корректный номер телефона')).toBeVisible();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).click();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).fill('+7 111 111 11 11');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(
      page.locator('#email_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('sdg');
    await expect(page.getByText('Пожалуйста, введите корректный email!')).toBeVisible();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('staf118+300@mail.ru');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).fill('111');
    await expect(page.getByText('Пожалуйста, введите не менее')).toBeVisible();
    await page.getByRole('textbox', { name: 'Пароль*' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).fill('11111');
    await expect(page.getByText('Пожалуйста, введите не менее')).toBeVisible();
    await page.getByRole('textbox', { name: 'Пароль*' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).fill('111111');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(
      page.getByText('Пожалуйста, ознакомьтесь с нашей политикой обработки данных'),
    ).toBeVisible();
  });

  test('Проверка промокода с невалидным значением', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('textbox', { name: 'ФИО*' }).click();
    await page.getByRole('textbox', { name: 'ФИО*' }).fill('Тестовый Тест Тестович');
    await page.getByRole('main').getByText('Хочу продавать на маркетплейсах').click();
    await expect(page.getByText('Хочу стать менеджером маркетплейсов')).toBeVisible();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).click();
    await page.getByRole('textbox', { name: 'Номер телефона*' }).fill('+7 111 111 11 11');
    const email1 = getNextEmail();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill(email1);
    await page.getByRole('textbox', { name: 'Пароль*' }).click();
    await page.getByRole('textbox', { name: 'Пароль*' }).fill('1111111');
    await page
      .getByRole('checkbox', {
        name: 'Я соглашаюсь с Договором публичной оферты и Политикой конфиденциальности',
      })
      .check();
    await page.getByRole('textbox', { name: 'Промокод' }).click();
    await page.getByRole('textbox', { name: 'Промокод' }).fill('asd');
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await expect(page.getByText('Промокод недействителен')).toBeVisible({ timeout: 3000 });
  });

  test('Проверка глаза на странице регистрации', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.locator('form path').nth(1).click();
    await expect(page.locator('form').getByRole('img')).toBeVisible();
    await page.locator('form').getByRole('img').click();
    await expect(page.locator('form path').nth(1)).toBeVisible();
  });

  test('Проверка перехода по лого', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('link', { name: 'На главную страницу Radar-' }).click();
    await expect(
      page.getByRole('heading', {
        name: 'Сервис оцифровки и аналитики для увеличения продаж на Wildberries',
      }),
    ).toBeVisible();
  });

  test('Проверка перехода в документы', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('link', { name: 'Договором публичной оферты' }).click();
    await expect(page.getByRole('heading', { name: 'Публичная оферта' })).toBeVisible();
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('link', { name: 'Политикой конфиденциальности' }).click();
    await expect(
      page.getByRole('heading', { name: 'ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ' }),
    ).toBeVisible();
  });

  test('Проверка перехода по кнопке Войти', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/signup');
    await page.getByRole('link', { name: 'Войти' }).click();
    await expect(page.getByRole('heading', { name: 'Вход' })).toBeVisible();
  });
});
