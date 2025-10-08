import test, { expect } from '@playwright/test';
import { Monitoring } from '../../pages/Monitoring';

test.describe('Группа тестов с разрешением 1920x1080', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Открытие мониторинга', async ({ page }) => {
    const monitoring = new Monitoring(page);
    await monitoring.open();
    await page.getByRole('cell', { name: 'Основные' }).waitFor({ state: 'visible', timeout: 5000 });
  });
  test('Проверка корректности колонки Артикулов с продажами', async ({ page }) => {
    const monitoring = new Monitoring(page);
    await monitoring.open();
    await page.getByText('Артикулов с продажами, %').click();
    await page.getByText('Артикулов с продажами, %').click();
    const cell = page.locator('.ant-table-row > td:nth-child(36)').first();
    await expect(cell).toBeVisible();
    const text = await cell.textContent();
    if (!text) {
      throw new Error('Текст в ячейке отсутствует или пуст');
    }
    const value = parseFloat(text.trim());
    await expect(value).toBeLessThanOrEqual(100);
  });
});
