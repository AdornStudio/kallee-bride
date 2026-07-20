import { defineConfig, devices } from '@playwright/test';

/**
 * Настройка браузерных проверок.
 *
 * Сервер поднимается сам перед запуском и гасится после — отдельно
 * запускать `npm run dev` не нужно.
 */
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  reporter: [['list']],

  use: {
    baseURL: 'http://localhost:4321',
    // Скриншот и запись остаются только от упавших проверок — по ним
    // видно, что именно пошло не так.
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'десктоп', use: { ...devices['Desktop Chrome'] } },
    // Safari стоит отдельным прогоном не для полноты: именно на нём
    // вылезала разъезжавшаяся вёрстка, которой не было в Chrome.
    { name: 'сафари', use: { ...devices['Desktop Safari'] } },
    { name: 'телефон', use: { ...devices['iPhone 13'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
