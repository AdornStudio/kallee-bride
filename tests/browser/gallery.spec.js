/**
 * ─────────────────────────────────────────────────────────────
 *  ГАЛЕРЕЯ ПЛАТЬЕВ — проверки в настоящем браузере
 * ─────────────────────────────────────────────────────────────
 *  Каждая проверка здесь закрывает ошибку, которая уже случалась.
 *  Если правка вернёт её обратно — проверка упадёт и назовёт причину.
 * ─────────────────────────────────────────────────────────────
 */
import { test, expect } from '@playwright/test';

const COLLECTION = '/kolekcije/luminous-veil';

/** Открывает галерею платья по порядковому номеру карточки. */
const openGown = async (page, i = 0) => {
  await page.locator('[data-gown]').nth(i).click();
  await expect(page.locator('[data-lightbox]')).toBeVisible();
};

const lightbox = (page) => page.locator('[data-lightbox]');
const position = (page) => page.locator('[data-lb-pos]');
const framePhoto = (page) => page.locator('[data-lb-frame] img');

test.beforeEach(async ({ page }) => {
  await page.goto(COLLECTION);
});

test('карточки платьев показывают фото, а не заглушки', async ({ page }) => {
  const cards = page.locator('.gown__btn img');
  await expect(cards.first()).toBeVisible();

  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  // Заглушка появляется, когда путь к фото пуст — на живом сайте её быть не должно.
  await expect(page.locator('.figure__placeholder')).toHaveCount(0);
});

test('галерея открывается по клику и показывает нужное платье', async ({ page }) => {
  const name = await page.locator('.gown__name').first().textContent();
  await openGown(page, 0);

  await expect(page.locator('[data-lb-title]')).toHaveText(name.trim());
  await expect(framePhoto(page)).toBeVisible();
  await expect(position(page)).toContainText('1');
});

test('перелистывание сдвигает ровно на один кадр', async ({ page }) => {
  // Ловит двойную привязку обработчиков: при ней один клик прыгал через кадр.
  await openGown(page, 1);
  await expect(position(page)).toContainText(/^1 /);

  await page.locator('[data-lb-next]').click();
  await expect(position(page)).toContainText(/^2 /);

  await page.locator('[data-lb-prev]').click();
  await expect(position(page)).toContainText(/^1 /);
});

test('лента миниатюр берёт уменьшенные файлы, а не полноразмерные', async ({ page }) => {
  // Ловит возврат к полному размеру: так открытие одного платья тянуло
  // мегабайты ради полоски высотой 70 пикселей.
  await openGown(page, 1);

  const thumbs = page.locator('.lb__thumb img');
  await expect(thumbs.first()).toBeVisible();

  for (const src of await thumbs.evaluateAll((els) => els.map((e) => e.getAttribute('src')))) {
    expect(src, 'миниатюра должна ссылаться на файл @thumb').toContain('@thumb');
  }
});

test('миниатюры не схлопываются', async ({ page }) => {
  // Ловит потерю стилей у элементов, создаваемых скриптом: без них
  // миниатюры сжимались с 52×70 до 27×23.
  await openGown(page, 1);

  const box = await page.locator('.lb__thumb').first().boundingBox();
  expect(box.width).toBeGreaterThan(40);
  expect(box.height).toBeGreaterThan(55);
});

test('фото вписывается в кадр и не наезжает на миниатюры', async ({ page }) => {
  // Ловит возврат ошибки, из-за которой снимок рисовался в натуральную
  // величину и закрывал собой ленту миниатюр.
  await openGown(page, 0);
  await expect(framePhoto(page)).toBeVisible();

  const photo = await framePhoto(page).boundingBox();
  const stage = await page.locator('[data-lb-stage]').boundingBox();
  const strip = await page.locator('.lb__thumbs').boundingBox();

  expect(photo.height).toBeLessThanOrEqual(stage.height + 1);
  expect(photo.y + photo.height).toBeLessThanOrEqual(strip.y + 1);
});

test('приближение подтягивает файл высокого разрешения', async ({ page }) => {
  await openGown(page, 0);

  const before = await framePhoto(page).getAttribute('src');
  expect(before).not.toContain('@2x');

  await framePhoto(page).click(); // клик по фото приближает
  await expect(framePhoto(page)).toHaveAttribute('src', /@2x\.jpg$/, { timeout: 10_000 });
});

test('приближённое фото нельзя утащить за край', async ({ page }) => {
  await openGown(page, 0);
  const frame = page.locator('[data-lb-frame]');

  await framePhoto(page).click(); // приблизить
  await page.waitForTimeout(500);

  /*
    Перетаскивание разыгрывается событиями указателя прямо на странице,
    а не мышью Playwright: обработчик вызывает setPointerCapture, и
    эмулированная мышь на этом застревает. Проверяем при этом ровно тот
    же код — те же обработчики, тот же расчёт ограничителя.
  */
  await frame.evaluate((el) => {
    const b = el.getBoundingClientRect();
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height / 2;
    const opts = { pointerType: 'mouse', pointerId: 1, bubbles: true };
    el.dispatchEvent(new PointerEvent('pointerdown', { ...opts, clientX: cx, clientY: cy }));
    for (let i = 1; i <= 25; i++) {
      el.dispatchEvent(
        new PointerEvent('pointermove', { ...opts, clientX: cx + i * 80, clientY: cy + i * 80 }),
      );
    }
    el.dispatchEvent(new PointerEvent('pointerup', opts));
  });
  await page.waitForTimeout(400);

  const state = await frame.evaluate((el) => {
    const img = el.firstElementChild;
    const m = new DOMMatrix(getComputedStyle(img).transform);
    const fw = el.clientWidth;
    const fh = el.clientHeight;
    const fit = Math.min(fw / img.naturalWidth, fh / img.naturalHeight);
    // Размер снимка на экране с учётом приближения.
    const w = img.naturalWidth * fit * m.a;
    const h = img.naturalHeight * fit * m.d;
    return { fw, fh, w, h, tx: m.e, ty: m.f, scale: m.a };
  });

  expect(state.scale, 'фото должно быть приближено').toBeGreaterThan(1);

  /*
    Ограничитель обязан вести себя по каждой оси отдельно:
      • если снимок шире кадра — его край нельзя увести внутрь,
        иначе сбоку появится пустота;
      • если снимок уже кадра (вертикальное фото на широком экране),
        поля по бокам законны, и он должен остаться по центру.
  */
  const axis = (size, frameSize, offset, name) => {
    if (size > frameSize) {
      const slack = (size - frameSize) / 2;
      expect(Math.abs(offset), `${name}: край фото ушёл внутрь кадра`).toBeLessThanOrEqual(
        slack + 0.5,
      );
    } else {
      expect(Math.abs(offset), `${name}: фото должно оставаться по центру`).toBeLessThanOrEqual(0.5);
    }
  };

  axis(state.w, state.fw, state.tx, 'по горизонтали');
  axis(state.h, state.fh, state.ty, 'по вертикали');
});

test('смена кадра сбрасывает приближение', async ({ page }) => {
  await openGown(page, 0);
  const frame = page.locator('[data-lb-frame]');
  const box = await frame.boundingBox();

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(400);
  expect(await frame.evaluate((el) => el.classList.contains('is-zoomed'))).toBe(true);

  await page.locator('[data-lb-next]').click();
  await page.waitForTimeout(400);
  expect(await frame.evaluate((el) => el.classList.contains('is-zoomed'))).toBe(false);
});

test('Escape закрывает галерею и возвращает прокрутку странице', async ({ page }) => {
  await openGown(page, 0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

  await page.keyboard.press('Escape');
  await expect(lightbox(page)).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('быстрое закрытие и открытие не оставляет пустое окно', async ({ page }) => {
  /*
    Ловит гонку с таймером закрытия: он срабатывал уже после того, как
    открыли другое платье, и стирал его фото.

    Оба нажатия делаются подряд в одном кадре. Через locator.click()
    гонку не воспроизвести: Playwright ждёт готовности элемента, и за
    это время таймер угасания успевает отработать сам — проверка тогда
    проходит даже на сломанном коде.
  */
  await openGown(page, 0);

  await page.evaluate(() => {
    document.querySelector('[data-lb-close]').click();
    document.querySelectorAll('[data-gown]')[2].click();
  });

  // Ждём дольше таймера угасания: если он не отменён, он сотрёт фото.
  await page.waitForTimeout(600);

  await expect(lightbox(page)).toBeVisible();
  await expect(framePhoto(page)).toHaveAttribute('src', /\.jpg$/);
  await expect(page.locator('[data-lb-title]')).not.toBeEmpty();
});

test('после перехода к другой коллекции открывается её платье', async ({ page }) => {
  // Ловит устаревшее замыкание: обработчик от прошлой страницы показывал
  // платья предыдущей коллекции.
  await page.locator('.pager__link--next').click();
  await expect(page).toHaveURL(/magnolious/);

  const name = await page.locator('.gown__name').first().textContent();
  await openGown(page, 0);

  await expect(page.locator('[data-lb-title]')).toHaveText(name.trim());
  await expect(framePhoto(page)).toHaveAttribute('src', /magnolious/);
});

test('на странице нет горизонтальной прокрутки', async ({ page }) => {
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflows).toBe(false);
});

test('вёрстка не разъезжается: карточки одинаковой высоты и в пропорции', async ({ page }) => {
  // Ловит возврат ошибки Safari, из-за которой фото задавало высоту само
  // и карточки уплывали.
  const boxes = await page.locator('.gown .figure').evaluateAll((els) =>
    els.map((e) => {
      const b = e.getBoundingClientRect();
      return { w: b.width, h: b.height };
    }),
  );

  expect(boxes.length).toBeGreaterThan(0);
  for (const b of boxes) {
    expect(b.w / b.h, 'пропорция карточки должна быть 3/4').toBeCloseTo(0.75, 2);
  }
});
