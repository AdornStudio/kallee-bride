// @ts-check
import { defineConfig } from 'astro/config';

/*
  Адрес сайта и подпапка.

  На своём домене сайт лежит в корне — подпапки нет, и локально тоже.
  На GitHub Pages он лежит по адресу вида имя.github.io/kallee-bride/,
  то есть внутри папки. Тогда сборке нужно об этом сказать, иначе все
  ссылки и фото будут искать себя в корне и не найдут.

  Значения приходят из переменных окружения — их подставляет GitHub
  при публикации (см. .github/workflows/deploy.yml). Ничего вручную
  менять не нужно; локальная сборка их просто не видит и работает
  как раньше.
*/
const site = process.env.SITE_URL || 'https://www.kallee-bride.rs';
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  base,
  compressHTML: true,
});
