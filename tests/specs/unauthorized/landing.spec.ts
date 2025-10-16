import test, { expect } from '@playwright/test';
import { Landing } from '../../pages/Landing';

test.describe('Группа тестов с разрешением 1920x1080', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Проверка лэйаута лэндинг', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByText('Аналитика магазина').click();
    await landing.contentPageHasCorrectLayout();
  });

  test('Проверка страницы', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page
      .getByRole('list')
      .filter({ hasText: 'СервисТарифыКонтакты' })
      .locator('span')
      .click();
    await expect(page.getByRole('heading', { name: 'Финансовая аналитика' })).toBeVisible();
    await page.getByRole('link', { name: 'Подробнее' }).first().click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();

    await page.goto('https://test-server-pro.ru/');
    await page.getByText('Аналитика магазина').click();
    await expect(page.getByRole('heading', { name: 'Внутренняя аналитика' })).toBeVisible();
    await page.getByText('Отчетность').click();
    await expect(
      page.getByRole('heading', { name: 'Оцифровка отчётов Wildberries' }),
    ).toBeVisible();
    await page.getByText('Данные и конкуренты', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Рыночные данные и конкуренты' })).toBeVisible();
    await page.getByText('ИИ - модуль').click();
    await expect(page.getByRole('heading', { name: 'AI-компоненты (развиваются)' })).toBeVisible();

    await page
      .getByRole('list')
      .filter({ hasText: 'СервисТарифыКонтакты' })
      .locator('span')
      .click();
    await page.getByRole('tooltip').getByRole('link', { name: 'Аналитика конкурентов' }).click();
    await page.getByRole('link', { name: 'Подробнее' }).nth(1).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
    await page.goto('https://test-server-pro.ru/');
    await page
      .getByRole('list')
      .filter({ hasText: 'СервисТарифыКонтакты' })
      .locator('span')
      .click();
    await page.getByRole('tooltip').getByRole('link', { name: 'Поиск ниш и трендов' }).click();
    await expect(page.getByRole('heading', { name: 'Поиск ниш и трендов' })).toBeVisible();
    await page.getByRole('link', { name: 'Подробнее' }).nth(2).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка перехода в SEO', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page
      .getByRole('list')
      .filter({ hasText: 'СервисТарифыКонтакты' })
      .locator('span')
      .click();
    await page.getByRole('tooltip').getByRole('link', { name: 'SEO и ключевые запросы' }).click();
    await expect(page.getByRole('heading', { name: 'SEO и ключевые запросы' })).toBeVisible();
    await page.getByRole('link', { name: 'Подробнее' }).nth(3).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка перехода в тарифы и контакты', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('link', { name: 'Тарифы' }).first().click();
    await expect(page.getByRole('heading', { name: 'Тарифы' })).toBeVisible();
    await page.getByRole('link', { name: 'Контакты' }).click();
    await expect(page.locator('#footer').getByText('Контакты')).toBeVisible();
  });

  test('Проверка кнопки Попробовать бесплатно', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page
      .locator('section')
      .filter({ hasText: 'Сервис оцифровки и аналитики для увеличения продаж на Wildberries' })
      .getByRole('link')
      .click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка кнопок Вход и Регистрация', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('link', { name: 'Войти' }).click();
    await expect(page.getByRole('heading', { name: 'Вход' })).toBeVisible();
    await page.goto('https://test-server-pro.ru/#footer');
    await page.getByRole('link', { name: 'Зарегистрироваться' }).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка Тарифы 1-3', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('button', { name: 'Что входит?' }).first().click();
    await expect(
      page.locator('#pricing-modal').getByRole('heading', { name: '990 ₽' }),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Активировать сервис' }).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
    await page.goto('https://test-server-pro.ru/#footer');
    await page.getByRole('button', { name: 'Что входит?' }).nth(1).click();
    await expect(
      page.locator('#pricing-modal').getByRole('heading', { name: '174 ₽' }),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Активировать сервис' }).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
    await page.goto('https://test-server-pro.ru/#footer');
    await page.getByRole('button', { name: 'Что входит?' }).nth(2).click();
    await expect(
      page.locator('#pricing-modal').getByRole('heading', { name: '758 ₽' }),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Активировать сервис' }).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка Тариф 4', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('button', { name: 'Что входит?' }).nth(3).click();
    await expect(
      page.locator('#pricing-modal').getByRole('heading', { name: '940 ₽' }),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Активировать сервис' }).click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка кнопки Подробнее о плагине', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      page.getByRole('link', { name: 'Подробнее о плагине' }).click(), // Клик
    ]);
    await newPage.waitForURL(new RegExp('/detail/radar'), { timeout: 5000 });
    await expect(newPage.getByRole('heading', { name: 'Radar' })).toBeVisible();
  });

  test('Проверка кнопки Попробовать бесплатно в Протестируйте сервис', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page
      .locator('section')
      .filter({
        hasText: 'Протестируйте сервис бесплатноОставьте заявку на демонстрацию и получите мгновен',
      })
      .getByRole('link')
      .click();
    await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible();
  });

  test('Проверка карусели', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('button', { name: 'Прокрутить карусель вправо' }).click();
    await expect(
      page.locator('#card-4 iframe[title="Мария Фёдорова"]').contentFrame().locator('#overlay-id'),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Прокрутить карусель влево' }).click();
    await expect(
      page.locator('#card-0 iframe[title="Мария Фёдорова"]').contentFrame().locator('#overlay-id'),
    ).toBeVisible();
  });

  test('Проверка блока Вопросы', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page
      .locator('summary')
      .filter({ hasText: 'Каким образом вы получаете данные? Это конфиденциально?' })
      .click();
    await expect(page.getByText('Данные мы получаем через API')).toBeVisible();
    await page
      .locator('summary')
      .filter({ hasText: 'Какие маркетплейсы поддерживаются в сервисе?' })
      .click();
    await expect(page.getByText('На данный момент сервис работает с Wildberries')).toBeVisible();
    await page
      .locator('summary')
      .filter({
        hasText: 'Я представляю крупную компанию. Предлагаете ли вы индивидуальные решения под наш',
      })
      .click();
    await expect(
      page.getByText(
        'Да, у нас большой опыт в работе с данными и аналитикой для крупных клиентов. Мы ',
      ),
    ).toBeVisible();
  });

  test('Проверка формы Напишите нам', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('button', { name: 'Отправить' }).click();
    await expect(
      page.getByText('Пожалуйста, ознакомьтесь с нашей политикой обработки данных'),
    ).toBeVisible();
    await page
      .getByRole('checkbox', {
        name: 'Я соглашаюсь с Договором публичной оферты и Политикой конфиденциальности',
      })
      .check();
    await page.getByRole('button', { name: 'Отправить' }).click();
    await expect(
      page.locator('#name_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'Имя*' }).click();
    await page.getByRole('textbox', { name: 'Имя*' }).fill('Тест');
    await page.getByRole('button', { name: 'Отправить' }).click();
    await expect(
      page.locator('#phone_help').getByText('Пожалуйста, заполните это поле!'),
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'Телефон*' }).click();
    await page.getByRole('textbox', { name: 'Телефон*' }).fill('+7п');
    await page.getByRole('textbox', { name: 'Телефон*' }).click();
    await expect(page.getByText('Пожалуйста, введите корректный номер телефона')).toBeVisible();
    await page.getByRole('textbox', { name: 'Телефон*' }).fill('+9 811 111 11 11');
    await page.getByRole('button', { name: 'Отправить' }).click();
    await expect(page.getByText('Пожалуйста, заполните это поле!')).toBeVisible();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('ывпывпывпывп');
    await expect(page.getByText('Пожалуйста, введите корректный email!')).toBeVisible();
    await page.getByRole('textbox', { name: 'E-mail*' }).click();
    await page.getByRole('textbox', { name: 'E-mail*' }).fill('staf118@mail.ru');
    await page.getByRole('button', { name: 'Отправить' }).click();
    await expect(page.getByText('Данные успешно отправлены!')).toBeVisible();
  });

  test('Проверка ссылки на Договор пуб. оф. с формы Напишите нам', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage2] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      page.getByRole('link', { name: 'Договором публичной оферты' }).click(),
    ]);
    await newPage2.waitForURL('https://test-server-pro.ru/offer', { timeout: 5000 });
    await expect(newPage2.getByRole('heading', { name: 'Публичная оферта' })).toBeVisible();
  });

  test('Проверка ссылки на Политика конф. с формы Напишите нам', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage3] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      await page.getByRole('link', { name: 'Политикой конфиденциальности' }).click(),
    ]);
    await newPage3.waitForURL('https://test-server-pro.ru/politics', { timeout: 5000 });
    await expect(
      newPage3.getByRole('heading', { name: 'ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ' }),
    ).toBeVisible();
  });

  test('Проверка перехода в тг по кнопке Напишите нам', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await expect(page.getByRole('link', { name: 'Напишите нам' })).toHaveAttribute(
      'href',
      'https://t.me/radar_analytica_support',
    );
    const [newPage4] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      await page.getByRole('link', { name: 'Напишите нам' }).click(),
    ]);
    await expect(newPage4.getByRole('link', { name: 'Send Message' })).toBeVisible({
      timeout: 15000,
    });
  });

  test('Проверка перехода в тг по иконке ТГ Мы в соц. сетях', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await expect(page.getByRole('link', { name: 'Ссылка на Radar-analytica' })).toHaveAttribute(
      'href',
      'https://t.me/radar_analytica',
    );
    const [newPage5] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      await page.getByRole('link', { name: 'Ссылка на Radar-analytica' }).click(),
    ]);
    await expect(newPage5.getByRole('link', { name: 'View in Telegram' })).toBeVisible();
  });

  test('Проверка перехода по лого', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.locator('#footer').getByRole('link', { name: 'На главную страницу Radar-' }).click();
    await expect(
      page.getByRole('heading', {
        name: 'Сервис оцифровки и аналитики для увеличения продаж на Wildberries',
      }),
    ).toBeVisible();
    await page
      .locator('section')
      .filter({
        hasText: 'СервисТарифыКонтактыВойтиЗарегистрироватьсяСервисФинансовая аналитикаФинансовая ',
      })
      .getByLabel('На главную страницу Radar-')
      .click();
    await expect(
      page.getByRole('heading', {
        name: 'Сервис оцифровки и аналитики для увеличения продаж на Wildberries',
      }),
    ).toBeVisible();
  });

  test('Проверка переходов из меню подвала', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    await page.getByRole('link', { name: 'Финансовая аналитика' }).click();
    await expect(page.getByRole('heading', { name: 'Финансовая аналитика' })).toBeVisible();
    await page.getByRole('link', { name: 'Аналитика конкурентов' }).click();
    await expect(page.getByRole('heading', { name: 'Аналитика конкурентов' })).toBeVisible();
    await page.getByRole('link', { name: 'Поиск ниш и трендов' }).click();
    await expect(page.getByRole('heading', { name: 'Поиск ниш и трендов' })).toBeVisible();
    await page.getByRole('link', { name: 'SEO и ключевые запросы' }).click();
    await expect(page.getByRole('heading', { name: 'SEO и ключевые запросы' })).toBeVisible();
    await page.locator('#footer').getByRole('link', { name: 'Тарифы' }).click();
    await expect(page.getByRole('heading', { name: 'Тарифы' })).toBeVisible();
    const [newPage6] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: 'Калькулятор unit' }).click(),
    ]);
    await newPage6.waitForURL('https://radar-analytica.ru/calculate', { timeout: 5000 });
    await expect(newPage6.getByRole('heading', { name: 'Калькулятор unit' })).toBeVisible();

    await page.goto('https://test-server-pro.ru/#footer');
    const [newPage7] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: 'Плагин для браузера' }).click(),
    ]);
    await newPage7.waitForURL(new RegExp('/detail/radar'), { timeout: 5000 });
    await expect(newPage7.getByRole('heading', { name: 'Radar' })).toBeVisible();
  });

  test('Проверка ссылки Пользоват. согл. из подвала', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage8] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      page.getByRole('link', { name: 'Пользовательское соглашение' }).click(),
    ]);
    await newPage8.waitForURL('https://test-server-pro.ru/user-agreement', { timeout: 5000 });
    await expect(
      newPage8.getByRole('heading', { name: 'Пользовательское соглашение' }),
    ).toBeVisible();
  });

  test('Проверка ссылки Политика конфид. из подвала', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage9] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      page.getByRole('link', { name: 'Политика конфиденциальности' }).click(),
    ]);
    await newPage9.waitForURL('https://test-server-pro.ru/politics', { timeout: 5000 });
    await expect(
      newPage9.getByRole('heading', { name: 'ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ' }),
    ).toBeVisible();
  });

  test('Проверка ссылки Публичная оферта из подвала', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage10] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      page.getByRole('link', { name: 'Публичная оферта' }).click(),
    ]);
    await newPage10.waitForURL('https://test-server-pro.ru/offer', { timeout: 5000 });
    await expect(newPage10.getByRole('heading', { name: 'Публичная оферта' })).toBeVisible();
  });

  test('Проверка ссылки Подключение АПИ из подвала', async ({ page }) => {
    const landing = new Landing(page);
    await landing.open();
    const [newPage11] = await Promise.all([
      page.waitForEvent('popup'), // Ожидает открытия новой вкладки ПОСЛЕ клика
      page.getByRole('link', { name: 'Подключение к API сервиса' }).click(),
    ]);
    await newPage11.waitForURL('https://test-server-pro.ru/how-to-connect-api', { timeout: 5000 });
    await expect(
      newPage11.getByText(
        'В личном кабинете нажимаем на “шестеренку” и выбираем раздел “подключенные магаз',
      ),
    ).toBeVisible();
  });
});

test('Проверка лэйаута 1440x900 ', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.getByText('Аналитика магазина').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-1440x900.png',
  );
});

test('Проверка лэйаута 1366x768 ', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.getByText('Аналитика магазина').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-1366x768.png',
  );
});

test('Проверка лэйаута 1280x720 ', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.getByText('Аналитика магазина').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-1280x720.png',
  );
});

test('Проверка лэйаута 1200x800 ', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.getByText('Аналитика магазина').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-1200x800.png',
  );
});

test('Проверка лэйаута 1024x768 ', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.getByText('Аналитика магазина').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-1024x768.png',
  );
});

test('Проверка лэйаута 768x1024 ', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.getByText('Аналитика магазина').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-768x1024.png',
  );
});

test('Проверка лэйаута 390x844 ', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.locator('.PlatformTabs_tab__JMvEw.PlatformTabs_tab--active__2Yw1F').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-390x844.png',
  );
});

test('Проверка лэйаута 360x780 ', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.locator('.PlatformTabs_tab__JMvEw.PlatformTabs_tab--active__2Yw1F').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-360x780.png',
  );
});

test('Проверка лэйаута 412x917 ', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 917 });
  await page.goto('https://test-server-pro.ru/');
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toBeVisible();
  await page.locator('.PlatformTabs_tab__JMvEw.PlatformTabs_tab--active__2Yw1F').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.__variable_93a0e0.__variable_fe7774')).toHaveScreenshot(
    'landing-412x917.png',
  );
});
