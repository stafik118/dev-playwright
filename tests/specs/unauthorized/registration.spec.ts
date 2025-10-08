import test, { expect } from '@playwright/test';

const fs = require('fs');

function getNextEmail() {
  const counterFilePath = 'counter.txt';

  if (!fs.existsSync(counterFilePath)) {
    fs.writeFileSync(counterFilePath, '0');
  }

  let count = parseInt(fs.readFileSync(counterFilePath, 'utf8'), 10000000);
  count += 1;
  fs.writeFileSync(counterFilePath, count.toString());

  return `staf118+${count}@mail.ru`;
}

test('Проверка регистрации с валидными данными', async ({ page }) => {
  await page.goto('https://test-server-pro.ru/signup');
  const element = page.locator('.page_page__jXKUq');
  await expect(element).toHaveScreenshot('authscreen.png');
});
