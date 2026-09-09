import { defineConfig, devices } from '@playwright/test';

/**
 * Настройка браузерных проверок.
 *
 * Проверяется СОБРАННЫЙ сайт, а не сервер разработки: именно эти файлы
 * попадут на хостинг, и они отличаются от того, что отдаёт `npm run dev`.
 *
 * Свой порт (4323) — чтобы проверки не мешали открытому у вас серверу
 * разработки и не подхватывали чужой сайт с соседнего порта.
 *
 * Сборка и сервер поднимаются сами; запускать ничего заранее не нужно.
 */
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  reporter: [['list']],

  use: {
    baseURL: 'http://localhost:4323',
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
    command: 'npm run build && npx astro preview --port 4323',
    url: 'http://localhost:4323',
    // Всегда поднимать свой: иначе проверки могли бы подхватить чужой
    // сервер и пройти по неизвестно какой версии сайта.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
