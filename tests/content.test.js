/**
 * ─────────────────────────────────────────────────────────────
 *  ПРОВЕРКИ СОДЕРЖИМОГО
 * ─────────────────────────────────────────────────────────────
 *  Запуск:  npm test
 *
 *  Эти проверки ловят самое частое, что ломается при добавлении
 *  фотографий и текстов: путь есть, а файла нет; фраза добавлена
 *  на одном языке и забыта на другом.
 *
 *  Ничего скачивать не нужно — работает на встроенном в Node
 *  механизме проверок.
 * ─────────────────────────────────────────────────────────────
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { collections } from '../src/data/collections.js';
import { ui, langs, routes } from '../src/data/i18n.js';
import { site } from '../src/data/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicPath = (webPath) => join(root, 'public', webPath.replace(/^\//, ''));

/** Every photo ships in three cuts; the site derives the other two by name. */
const VARIANTS = ['', '@2x', '@thumb'];
const variantOf = (src, suffix) => src.replace(/\.jpg$/, `${suffix}.jpg`);

const everyGown = collections.flatMap((c) =>
  c.gowns.map((g) => ({ ...g, collection: c.name })),
);

// ── Фотографии платьев ──────────────────────────────────────

test('у каждого платья есть хотя бы одно фото', () => {
  for (const gown of everyGown) {
    assert.ok(
      Array.isArray(gown.images) && gown.images.length > 0,
      `${gown.collection} → ${gown.name}: список images пуст`,
    );
  }
});

test('каждое фото платья существует во всех трёх размерах', () => {
  const missing = [];

  for (const gown of everyGown) {
    for (const src of gown.images) {
      for (const suffix of VARIANTS) {
        const file = variantOf(src, suffix);
        if (!existsSync(publicPath(file))) {
          missing.push(`${gown.collection} → ${gown.name}: нет файла ${file}`);
        }
      }
    }
  }

  assert.deepEqual(missing, [], `\n${missing.join('\n')}\n`);
});

test('обложка коллекции существует', () => {
  for (const c of collections) {
    assert.ok(c.cover, `${c.name}: обложка не задана`);
    assert.ok(existsSync(publicPath(c.cover)), `${c.name}: нет файла ${c.cover}`);
  }
});

test('видео платья, если указано, существует', () => {
  for (const gown of everyGown) {
    if (!gown.video) continue; // поле необязательное
    assert.ok(
      existsSync(publicPath(gown.video)),
      `${gown.collection} → ${gown.name}: нет файла ${gown.video}`,
    );
  }
});

test('нет фотографий, забытых в папке и не подключённых к платью', () => {
  const used = new Set(everyGown.flatMap((g) => g.images.map((s) => s.split('/').pop())));

  const orphans = [];
  for (const c of collections) {
    const dir = join(root, 'public', 'images', 'gowns', c.slug);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      // Проверяем только основной размер — производные привязаны к нему.
      if (!file.endsWith('.jpg') || file.includes('@')) continue;
      if (!used.has(file)) orphans.push(`${c.slug}/${file}`);
    }
  }

  assert.deepEqual(orphans, [], `\nФайлы лежат, но нигде не показаны:\n${orphans.join('\n')}\n`);
});

// ── Видео на главном экране ─────────────────────────────────

test('ролики первого экрана и их заставка существуют', async () => {
  // Читаем компонент как текст: он .astro, его нельзя импортировать здесь.
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(join(root, 'src/components/pages/HomePage.astro'), 'utf8');

  const films = [...source.matchAll(/'(\/videos\/[^']+\.mp4)'/g)].map((m) => m[1]);
  assert.ok(films.length > 0, 'в HomePage.astro не найден список heroFilms');

  for (const film of films) {
    assert.ok(existsSync(publicPath(film)), `нет файла ${film}`);
  }

  const poster = source.match(/heroPoster = '([^']+)'/)?.[1];
  assert.ok(poster, 'heroPoster не задан');
  assert.ok(existsSync(publicPath(poster)), `нет файла заставки ${poster}`);
});

// ── Переводы ────────────────────────────────────────────────

/** Собирает все пути вида "home.heroEyebrow" в объекте переводов. */
const keyPaths = (obj, prefix = '') => {
  const out = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    // Массивы (пункты меню, шаги) сравниваем по длине, а не поэлементно —
    // внутри у них тексты, которые и должны отличаться между языками.
    if (Array.isArray(value)) out.push(`${path}[${value.length}]`);
    else if (value && typeof value === 'object') out.push(...keyPaths(value, path));
    else out.push(path);
  }
  return out;
};

test('оба языка содержат одни и те же надписи', () => {
  const [sr, en] = langs.map((l) => new Set(keyPaths(ui[l])));

  const onlySr = [...sr].filter((k) => !en.has(k));
  const onlyEn = [...en].filter((k) => !sr.has(k));

  assert.deepEqual(
    { нетВАнглийском: onlySr, нетВСербском: onlyEn },
    { нетВАнглийском: [], нетВСербском: [] },
  );
});

test('ни одна надпись не осталась пустой', () => {
  const empty = [];
  const walk = (obj, lang, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const path = `${lang}.${prefix}${key}`;
      if (typeof value === 'string' && value.trim() === '') empty.push(path);
      else if (value && typeof value === 'object' && !Array.isArray(value)) {
        walk(value, lang, `${prefix}${key}.`);
      }
    }
  };
  langs.forEach((l) => walk(ui[l], l));

  assert.deepEqual(empty, []);
});

test('у каждой страницы есть адрес на обоих языках', () => {
  for (const [name, paths] of Object.entries(routes)) {
    for (const lang of langs) {
      assert.ok(paths[lang], `страница «${name}» не имеет адреса на языке ${lang}`);
    }
    assert.notEqual(
      paths.sr,
      paths.en,
      `страница «${name}»: адреса совпадают, переключатель языка будет вести сам на себя`,
    );
  }
});

// ── Данные салона ───────────────────────────────────────────

test('телефон для ссылки записан без пробелов и скобок', () => {
  assert.match(
    site.phoneHref,
    /^\+?[0-9]+$/,
    'phoneHref подставляется в tel: — там допустимы только цифры и плюс',
  );
});

test('по ссылке звонка набирается ровно тот номер, что показан на сайте', () => {
  // Один раз номер уже разошёлся: в ссылке потерялась последняя цифра,
  // и все, кто нажимал на телефон с мобильного, звонили не туда.
  assert.equal(
    site.phoneHref,
    site.phone.replace(/[^0-9+]/g, ''),
    'номер в ссылке не совпадает с показанным — звонок уйдёт не по адресу',
  );
});

test('адреса коллекций пригодны для URL', () => {
  for (const c of collections) {
    assert.match(
      c.slug,
      /^[a-z0-9-]+$/,
      `${c.name}: в slug допустимы только строчная латиница, цифры и дефис`,
    );
  }
});
