import test, { expect } from '@playwright/test';

test.describe.serial('Группа тестов с разрешением 1920x1080', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Добавление магазина', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page.getByRole('button', { name: 'Подключить' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('TEST2906');
    await page.getByRole('textbox', { name: '* Токен' }).click();
    await page
      .getByRole('textbox', { name: '* Токен' })
      .fill(
        'eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjQsImVudCI6MSwiZXhwIjoxNzc4MzU1NjM1LCJmb3IiOiJhc2lkOmQ4NzBiMDAzLWRlYmQtNGNlZS04ZjgwLTdkYTM5YmM4OGI4OSIsImlkIjoiMDE5YTYyNjgtZWVkYS03YzVkLWFkYzUtNWNjM2QzODY1MjIyIiwiaWlkIjoxMjg5NTM2NTMsIm9pZCI6NDE0ODA4MiwicyI6MjU0LCJzaWQiOiJjNTRiMDJhYy0xMjJjLTQ2MGItOGMyZS1hZmFmMzQ3ZmU2ODIiLCJ0IjpmYWxzZSwidWlkIjoxMjg5NTM2NTN9.sTQKTffvO0uGOsD-nUgpZAhRgKMeEY0Eax0k78BbOwnDOSgXIGIrJ-1m7zQ0FhjGLd4k4PNODpOVG_R7BKKtMQ',
      );
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await page.goto('https://test-server-pro.ru/linked-shops');
    await expect(page.getByText('Сбор данных').nth(1)).toBeVisible();
  });

  test('Удаление магазина', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^TEST2906/ })
      .getByRole('button')
      .nth(1)
      .click();
    await page.getByRole('dialog').getByRole('button', { name: 'Удалить' }).click();
    const locator = page.locator('text=TEST2906');
    await expect(locator).toHaveCount(0);
  });

  test('Добавление невалидного магазина', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page.getByRole('button', { name: 'Подключить' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('TEST2906');
    await page.getByRole('textbox', { name: '* Токен' }).click();
    await page.getByRole('textbox', { name: '* Токен' }).fill('123');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('Некорректные данные в запросе')).toBeVisible();
  });

  test('Редактирование названия в статусе Активен', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^мелкая/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('мелкая1111');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('мелкая1111')).toBeVisible();
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^мелкая1111/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('мелкая');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('мелкая')).toBeVisible();
  });

  test('Редактирование названия в статусе Сбор данных', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^test2/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('мелкая1111');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('мелкая1111')).toBeVisible();
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^мелкая1111/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('test2');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('test2')).toBeVisible();
  });

  test('Редактирование названия в статусе Ошибка', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^Kondrs/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('мелкая1111');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('мелкая1111')).toBeVisible();
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^мелкая1111/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: '* Название магазина' }).click();
    await page.getByRole('textbox', { name: '* Название магазина' }).fill('Kondrs');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.getByText('Kondrs')).toBeVisible();
  });

  test('Редактирование токена на невалидный в статусе Ошибка', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^Kondrs/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: 'Токен' }).click();
    await page.getByRole('textbox', { name: 'Токен' }).fill('123');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('Полученный токен некорректен для сервиса. Введите другое значение'),
    ).toBeVisible();
  });

  test('Редактирование токена на невалидный в статусе Активен', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^мелкая/ })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('textbox', { name: 'Токен' }).click();
    await page.getByRole('textbox', { name: 'Токен' }).fill('123');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(
      page.getByText('Полученный токен некорректен для сервиса. Введите другое значение'),
    ).toBeVisible();
  });

  test('Редактирование токена на невалидный в статусе Сбор данных', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    await page
      .locator('div')
      .filter({ hasText: /^test2/ })
      .getByRole('button')
      .first()
      .click();
    const inputSelector = '#shopToken';
    await expect(page.locator(inputSelector)).toBeDisabled();
  });

  test('Проверка ссылки Где найти токен', async ({ page }) => {
    await page.goto('https://test-server-pro.ru/linked-shops');
    const [newPage12] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'Подключить' }).click(),
      page.getByRole('link', { name: 'Где найти токен?' }).click(),
    ]);
    await newPage12.waitForURL('https://radar.usedocs.com/article/79862', { timeout: 5000 });
    await expect(newPage12.getByRole('heading', { name: 'Добавление магазина WB' })).toBeVisible();
  });
});
