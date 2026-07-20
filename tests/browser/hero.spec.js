/**
 * ─────────────────────────────────────────────────────────────
 *  ПЕРВЫЙ ЭКРАН — сменяющиеся ролики платьев
 * ─────────────────────────────────────────────────────────────
 *  Здесь тоже каждая проверка закрывает уже случавшуюся ошибку.
 * ─────────────────────────────────────────────────────────────
 */
import { test, expect } from '@playwright/test';

const players = (page) => page.locator('[data-hero-film]');
const live = (page) => page.locator('[data-hero-film].is-live');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('на первом экране только видео, фотографии нет', async ({ page }) => {
  await expect(players(page)).toHaveCount(2);
  await expect(page.locator('.hero__media img')).toHaveCount(0);
});

test('заставка видна сразу, ещё до запуска видео', async ({ page }) => {
  // Ловит потерю кадра-заставки: без неё первый экран пустой,
  // пока не скачается ролик.
  const poster = await players(page).first().getAttribute('poster');
  expect(poster, 'у первого плеера должна быть заставка').toBeTruthy();

  const response = await page.request.get(poster);
  expect(response.status(), `файл заставки ${poster} не отдаётся`).toBe(200);

  // Первый плеер помечен видимым прямо в разметке — значит кадр
  // показывается даже если скрипт не отработает.
  await expect(players(page).first()).toHaveClass(/is-live/);
});

test('видео запускается само', async ({ page }) => {
  // Ловит две ошибки сразу: взаимную блокировку с буферизацией
  // и отказ автозапуска без повторной попытки.
  await expect
    .poll(async () => live(page).evaluate((v) => !v.paused && v.currentTime > 0), {
      timeout: 15_000,
      message: 'ролик так и не начал играть',
    })
    .toBe(true);
});

test('ролики сменяют друг друга', async ({ page }) => {
  const first = await live(page).getAttribute('src');
  expect(first).toBeTruthy();

  await expect
    .poll(async () => live(page).getAttribute('src'), {
      timeout: 20_000,
      message: 'за 20 секунд ролик так и не сменился',
    })
    .not.toBe(first);
});

test('следующий ролик не качается заранее', async ({ page }) => {
  // Ловит возврат к прежнему поведению, когда второй ролик грузился
  // параллельно с первым и удваивал трафик первого экрана.
  await expect
    .poll(async () => live(page).evaluate((v) => v.currentTime > 0.5), { timeout: 15_000 })
    .toBe(true);

  const standbyLoaded = await players(page)
    .nth(1)
    .evaluate((v) => Boolean(v.getAttribute('src')));

  expect(standbyLoaded, 'резервный плеер не должен держать ролик в начале клипа').toBe(false);
});

test('видео встаёт на паузу, когда первый экран уходит из вида', async ({ page }) => {
  await expect
    .poll(async () => live(page).evaluate((v) => !v.paused), { timeout: 15_000 })
    .toBe(true);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect
    .poll(async () => live(page).evaluate((v) => v.paused), {
      timeout: 5_000,
      message: 'ролик продолжает играть за пределами экрана и тратит батарею',
    })
    .toBe(true);
});

test('первый экран занимает высоту окна и не прокручивается вбок', async ({ page }) => {
  const hero = await page.locator('.hero').boundingBox();
  const viewport = page.viewportSize();

  expect(hero.height).toBeGreaterThan(viewport.height * 0.8);

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflows).toBe(false);
});

test('фото салона на главной подставлено, а не заглушка', async ({ page }) => {
  const salon = page.locator('.intro__media img');
  await salon.scrollIntoViewIfNeeded();

  await expect(salon).toHaveAttribute('src', /\.jpg$/);
  await expect(page.locator('.figure__placeholder')).toHaveCount(0);
});
