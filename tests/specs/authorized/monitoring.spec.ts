import test from '@playwright/test';
import { Monitoring } from '../../pages/Monitoring';

test('Открытие мониторинга', async ({ page }) => {
  const monitoring = new Monitoring(page);
  await monitoring.open();
  await page.getByRole('cell', { name: 'Основные' }).waitFor({ state: 'visible', timeout: 5000 });
});
