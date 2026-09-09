#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  ПУБЛИКАЦИЯ САЙТА НА GITHUB PAGES
# ─────────────────────────────────────────────────────────────
#  Запуск:  npm run deploy
#
#  Собирает сайт и выкладывает его в ветку gh-pages — именно её
#  GitHub показывает как сайт. Исходники при этом остаются
#  в ветке main и не смешиваются с собранными файлами.
# ─────────────────────────────────────────────────────────────
set -e

cd "$(dirname "$0")/.."

OWNER="AdornStudio"
REPO="kallee-bride"
GH="/Users/mak/.local/ghcli/gh_2.96.0_macOS_arm64/bin/gh"

# Сайт лежит в подпапке с именем репозитория, поэтому сборке
# нужно об этом сказать — иначе все ссылки и фото уйдут в корень.
echo "→ Проверки содержимого"
npm test --silent

echo "→ Сборка"
SITE_URL="https://$(echo "$OWNER" | tr '[:upper:]' '[:lower:]').github.io" \
BASE_PATH="/$REPO" \
npm run build

echo "→ Выкладываю"
rm -rf dist/.git
cd dist
git init -q
git checkout -qb gh-pages
git add -A
git -c user.name="$OWNER" -c user.email="malishevskiy.aa@gmail.com" \
    commit -q -m "Сборка сайта от $(date '+%d.%m.%Y %H:%M')"
git push -qf "https://github.com/$OWNER/$REPO.git" gh-pages
cd ..
rm -rf dist/.git

echo "✓ Готово: https://$(echo "$OWNER" | tr '[:upper:]' '[:lower:]').github.io/$REPO/"
