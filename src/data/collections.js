/**
 * ─────────────────────────────────────────────────────────────
 *  КОЛЛЕКЦИИ И ПЛАТЬЯ — РЕДАКТИРУЕТСЯ ЗДЕСЬ
 * ─────────────────────────────────────────────────────────────
 *  Этот файл управляет:
 *    • сеткой на странице «Коллекции» (оба языка)
 *    • избранными коллекциями на главной
 *    • отдельной страницей КАЖДОЙ коллекции (создаётся сама)
 *    • списком в форме записи
 *
 *  ── ДВА ЯЗЫКА ────────────────────────────────────────────────
 *  Тексты записаны парами:  { sr: 'сербский', en: 'английский' }
 *  Названия коллекций и моделей общие — они не переводятся.
 *
 *  ── КАК ДОБАВИТЬ ФОТО ────────────────────────────────────────
 *  Файлы лежат в:  public/images/gowns/<коллекция>/<платье>-N.jpg
 *
 *  Каждое фото нужно в ТРЁХ размерах — сайт подставляет их сам:
 *      olivia-1.jpg          1600px — галерея
 *      olivia-1@2x.jpg       3200px — при приближении
 *      olivia-1@thumb.jpg     160px — лента миниатюр
 *  В список ниже вписывается только обычный путь. Команды для нарезки
 *  всех трёх — в README, раздел «Как добавить фото платья».
 *
 *  У каждого платья список images — это и есть его галерея:
 *      images: [
 *        '/images/gowns/magnolious/holly-1.jpg',   ← первое фото
 *        '/images/gowns/magnolious/holly-2.jpg',   ←  показывается
 *      ]                                            на карточке
 *
 *  Порядок в списке = порядок в галерее. Чтобы поменять главное
 *  фото, поставьте нужное первым.
 *
 *  video: '' — необязательное видео, идёт первым в галерее.
 *  cover — обложка всей коллекции (главная и страница «Коллекции»).
 *
 *  Пустой список или пустые кавычки показывают аккуратную заглушку —
 *  сайт выглядит законченным даже без фотографий.
 *
 *  ── КАК ДОБАВИТЬ КОЛЛЕКЦИЮ ───────────────────────────────────
 *  Скопируйте блок между { }, вставьте, поменяйте данные.
 *  Страницы на обоих языках создадутся сами.
 *
 *  slug — это адрес: 'pure-grace' → /kolekcije/pure-grace
 *  Только латиница в нижнем регистре и дефисы.
 * ─────────────────────────────────────────────────────────────
 */

export const collections = [
  {
    slug: 'luminous-veil',
    name: 'Luminous Veil',
    featured: true, // true = показывать ещё и на главной
    short: {
      sr: 'Svetlucave tkanine i ručno vezeni detalji koji hvataju svetlost.',
      en: 'Shimmering fabrics and hand-embroidered detail that catch the light.',
    },
    description: {
      sr:
        'Kolekcija Luminous Veil nastala je oko jedne ideje — svetlosti. Tkanine sa ' +
        'suptilnim sjajem, ručno vezeni kristali i slojeviti velovi koji se pri svakom ' +
        'pokretu presijavaju. Modeli iz ove kolekcije posebno lepo izgledaju na venčanjima ' +
        'u kasnim popodnevnim satima, kada svetlost postaje topla i meka.',
      en:
        'Luminous Veil was built around a single idea — light. Fabrics with a subtle ' +
        'sheen, hand-set crystals and layered veils that shift with every movement. ' +
        'These gowns are at their most beautiful at late-afternoon weddings, when the ' +
        'light turns warm and soft.',
    },
    cover: '/images/gowns/luminous-veil/olivia-1.jpg', // главное фото коллекции
    gowns: [
      {
        name: 'Olivia',
        images: [
          '/images/gowns/luminous-veil/olivia-1.jpg',
          '/images/gowns/luminous-veil/olivia-2.jpg',
          '/images/gowns/luminous-veil/olivia-3.jpg',
          '/images/gowns/luminous-veil/olivia-4.jpg',
          '/images/gowns/luminous-veil/olivia-5.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Olivia iz kolekcije Luminous Veil', en: 'Olivia wedding dress from the Luminous Veil collection' },
      },
      {
        name: 'Emily',
        images: [
          '/images/gowns/luminous-veil/emily-1.jpg',
          '/images/gowns/luminous-veil/emily-2.jpg',
          '/images/gowns/luminous-veil/emily-3.jpg',
          '/images/gowns/luminous-veil/emily-4.jpg',
          '/images/gowns/luminous-veil/emily-5.jpg',
          '/images/gowns/luminous-veil/emily-6.jpg',
          '/images/gowns/luminous-veil/emily-7.jpg',
          '/images/gowns/luminous-veil/emily-8.jpg',
          '/images/gowns/luminous-veil/emily-10.jpg',
          '/images/gowns/luminous-veil/emily-11.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Emily iz kolekcije Luminous Veil', en: 'Emily wedding dress from the Luminous Veil collection' },
      },
      {
        name: 'Miranda',
        images: [
          '/images/gowns/luminous-veil/miranda-1.jpg',
          '/images/gowns/luminous-veil/miranda-2.jpg',
          '/images/gowns/luminous-veil/miranda-3.jpg',
          '/images/gowns/luminous-veil/miranda-4.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Miranda iz kolekcije Luminous Veil', en: 'Miranda wedding dress from the Luminous Veil collection' },
      },
      {
        name: 'Mia',
        images: [
          '/images/gowns/luminous-veil/mia-1.jpg',
          '/images/gowns/luminous-veil/mia-2.jpg',
          '/images/gowns/luminous-veil/mia-3.jpg',
          '/images/gowns/luminous-veil/mia-4.jpg',
          '/images/gowns/luminous-veil/mia-5.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Mia iz kolekcije Luminous Veil', en: 'Mia wedding dress from the Luminous Veil collection' },
      },
      {
        name: 'Scarlet',
        images: [
          '/images/gowns/luminous-veil/scarlet-1.jpg',
          '/images/gowns/luminous-veil/scarlet-2.jpg',
          '/images/gowns/luminous-veil/scarlet-3.jpg',
          '/images/gowns/luminous-veil/scarlet-4.jpg',
          '/images/gowns/luminous-veil/scarlet-5.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Scarlet iz kolekcije Luminous Veil', en: 'Scarlet wedding dress from the Luminous Veil collection' },
      },
      {
        name: 'Mabel',
        images: [
          '/images/gowns/luminous-veil/mabel-1.jpg',
          '/images/gowns/luminous-veil/mabel-2.jpg',
          '/images/gowns/luminous-veil/mabel-3.jpg',
          '/images/gowns/luminous-veil/mabel-4.jpg',
          '/images/gowns/luminous-veil/mabel-5.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Mabel iz kolekcije Luminous Veil', en: 'Mabel wedding dress from the Luminous Veil collection' },
      },
    ],
  },
  {
    slug: 'magnolious',
    name: 'Magnolious',
    featured: true,
    short: {
      sr: 'Raskošni volumeni i cvetni motivi, za nevestu koja želi da bude viđena.',
      en: 'Generous volume and floral detail, for a bride who wants to be seen.',
    },
    description: {
      sr:
        'Magnolious je najsmelija kolekcija Lana Grace Bridal. Bogate suknje, skulpturalni ' +
        'volumeni i cvetni motivi rađeni ručno, sloj po sloj. Ovo su venčanice sa prisustvom — ' +
        'stvorene za velika slavlja i za neveste koje ne žele da se povuku u drugi plan.',
      en:
        'Magnolious is the boldest collection Lana Grace Bridal makes. Full skirts, ' +
        'sculptural volume and floral work applied by hand, layer upon layer. These are ' +
        'gowns with presence — made for large celebrations, and for brides with no ' +
        'intention of blending into the background.',
    },
    cover: '/images/gowns/magnolious/holly-1.jpg',
    gowns: [
      {
        name: 'Holly',
        images: [
          '/images/gowns/magnolious/holly-1.jpg',
          '/images/gowns/magnolious/holly-2.jpg',
          '/images/gowns/magnolious/holly-3.jpg',
          '/images/gowns/magnolious/holly-4.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Holly iz kolekcije Magnolious', en: 'Holly wedding dress from the Magnolious collection' },
      },
      {
        name: 'Harper',
        images: [
          '/images/gowns/magnolious/harper-1.jpg',
          '/images/gowns/magnolious/harper-2.jpg',
          '/images/gowns/magnolious/harper-3.jpg',
          '/images/gowns/magnolious/harper-4.jpg',
          '/images/gowns/magnolious/harper-5.jpg',
          '/images/gowns/magnolious/harper-6.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Harper iz kolekcije Magnolious', en: 'Harper wedding dress from the Magnolious collection' },
      },
      {
        name: 'Fiona',
        images: [
          '/images/gowns/magnolious/fiona-1.jpg',
          '/images/gowns/magnolious/fiona-2.jpg',
          '/images/gowns/magnolious/fiona-3.jpg',
          '/images/gowns/magnolious/fiona-4.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Fiona iz kolekcije Magnolious', en: 'Fiona wedding dress from the Magnolious collection' },
      },
      {
        name: 'Eliza',
        images: [
          '/images/gowns/magnolious/eliza-1.jpg',
          '/images/gowns/magnolious/eliza-2.jpg',
          '/images/gowns/magnolious/eliza-3.jpg',
          '/images/gowns/magnolious/eliza-4.jpg',
          '/images/gowns/magnolious/eliza-5.jpg',
          '/images/gowns/magnolious/eliza-6.jpg',
        ],
        video: '',
        alt: { sr: 'Venčanica Eliza iz kolekcije Magnolious', en: 'Eliza wedding dress from the Magnolious collection' },
      },
    ],
  },
];

/** Используется на главной. */
export const featuredCollections = collections.filter((c) => c.featured);
