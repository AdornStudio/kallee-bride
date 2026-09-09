/**
 * ─────────────────────────────────────────────────────────────
 *  ПЕРЕВОДЫ — ВСЕ НАДПИСИ САЙТА, ОБА ЯЗЫКА
 * ─────────────────────────────────────────────────────────────
 *  Сербский — основной, лежит на главных адресах (/kolekcije).
 *  Английский — в папке /en/ (/en/collections).
 *
 *  Чтобы поправить любую надпись: найдите её здесь и измените.
 *  Вёрстка одна на оба языка, дублировать ничего не нужно.
 * ─────────────────────────────────────────────────────────────
 */

import { asset } from '../lib/asset.js';

export const defaultLang = 'sr';
export const langs = ['sr', 'en'];

/** Метки на кнопке переключения языка. */
export const langLabels = { sr: 'SR', en: 'EN' };

/** Атрибут lang для тега <html> — влияет на переносы и поиск. */
export const htmlLang = { sr: 'sr-Latn-RS', en: 'en' };

/** hreflang для SEO — говорит Google, что это одна страница на двух языках. */
export const hreflang = { sr: 'sr-Latn-RS', en: 'en' };

/**
 * Адреса страниц на каждом языке.
 * Английские адреса намеренно английские — так их лучше находит Google.
 */
export const routes = {
  home: { sr: '/', en: '/en/' },
  collections: { sr: '/kolekcije', en: '/en/collections' },
  about: { sr: '/o-nama', en: '/en/about' },
  contact: { sr: '/kontakt', en: '/en/contact' },
  booking: { sr: '/zakazivanje', en: '/en/book-a-fitting' },
};

/*
  Ссылки проходят через asset(): если сайт лежит в подпапке (GitHub
  Pages), к адресу добавляется её имя. На своём домене — ничего не
  меняется. Сами адреса в `routes` остаются чистыми, поэтому проверки
  читают их напрямую.
*/

/** Ссылка на страницу: path('collections', 'en') → '/en/collections' */
export const path = (key, lang) => asset(routes[key][lang]);

/** Ссылка на конкретную коллекцию. */
export const collectionPath = (slug, lang) => asset(`${routes.collections[lang]}/${slug}`);

/** Другой язык — для кнопки переключения. */
export const otherLang = (lang) => (lang === 'sr' ? 'en' : 'sr');

// ═══════════════════════════════════════════════════════════════
//  НАДПИСИ
// ═══════════════════════════════════════════════════════════════

export const ui = {
  sr: {
    // ── Общее ────────────────────────────────────────────────
    skipToContent: 'Preskočite na sadržaj',
    homeLabel: 'Početna',
    bookCta: 'Zakažite probu',
    callCta: 'Pozovite',
    openMenu: 'Otvorite meni',
    closeMenu: 'Zatvorite meni',
    mainNav: 'Glavna navigacija',
    mobileNav: 'Mobilna navigacija',
    homeAria: 'početna strana',
    switchLangAria: 'Prebacite na engleski jezik',

    nav: [
      { key: 'collections', label: 'Kolekcije' },
      { key: 'about', label: 'O salonu' },
      { key: 'contact', label: 'Kontakt' },
    ],

    hours: [
      { label: 'Ponedeljak – Petak', value: '12:00 – 19:00' },
      { label: 'Subota', value: '10:00 – 15:00' },
      { label: 'Nedelja', value: 'Zatvoreno', closed: true },
    ],

    // ── Подвал ───────────────────────────────────────────────
    footer: {
      taglineBefore: 'Ekskluzivni salon venčanica',
      taglineAfter: 'u Novom Sadu.',
      pages: 'Stranice',
      collections: 'Kolekcije',
      contact: 'Kontakt',
      hours: 'Radno vreme',
      rights: 'Sva prava zadržana.',
      gownsBy: 'Venčanice',
    },

    // ── Главная ──────────────────────────────────────────────
    home: {
      metaTitleSuffix: 'Venčanice Lana Grace u Novom Sadu',
      heroEyebrow: 'Ekskluzivno',
      viewCollections: 'Pogledajte kolekcije',
      heroFilmAlt: 'Venčanice Lana Grace Bridal iz salona Kallee Bride',

      introEyebrow: 'Salon',
      introTitle: 'Venčanice koje se biraju bez žurbe.',
      introP1a: 'Kallee Bride je ekskluzivni predstavnik brenda',
      introP1b:
        'u Novom Sadu. U salonu na Trgu mladenaca svaka proba je zakazana unapred i traje onoliko koliko treba — bez gužve, bez pritiska i bez osećaja da neko čeka za vama.',
      introP2:
        'Verujemo da se prava venčanica ne pronalazi u žurbi. Zato radimo sa jednom nevestom u terminu i posvećujemo joj ceo prostor, svu pažnju i sve vreme koje joj je potrebno.',
      introLink: 'Više o salonu',
      salonAlt: 'Enterijer salona Kallee Bride u Novom Sadu',

      collectionsEyebrow: 'Kolekcije',
      collectionsTitle: 'Pronađite svoju<br />siluetu.',
      collectionsAside:
        'Dve kolekcije Lana Grace Bridal, potpuno različitog karaktera — od svetlucave suptilnosti do raskošnog volumena.',
      allCollections: 'Sve kolekcije',

      stepsEyebrow: 'Iskustvo probe',
      stepsTitle: 'Kako izgleda<br />proba kod nas.',
      stepsAside:
        'Od prvog javljanja do poslednje prepravke — znate tačno šta vas čeka u svakom koraku.',
      steps: [
        {
          n: '01',
          title: 'Zakazivanje',
          text: 'Javite nam se preko forme ili telefonom. Termin potvrđujemo u roku od jednog radnog dana.',
        },
        {
          n: '02',
          title: 'Priprema',
          text: 'Pre vašeg dolaska biramo modele koji odgovaraju vašem stilu, figuri i datumu venčanja.',
        },
        {
          n: '03',
          title: 'Proba',
          text: 'Salon je u tom terminu samo vaš. Probate bez ograničenja, u društvu najbližih.',
        },
        {
          n: '04',
          title: 'Krojenje',
          text: 'Kada pronađete svoju venčanicu, uzimamo mere i vodimo vas kroz svaku prepravku.',
        },
      ],

      testimonialsEyebrow: 'Naše neveste',
      testimonialsTitle: 'Reči onih koje su<br />već pronašle svoju.',

      ctaEyebrow: 'Zakazivanje',
      ctaTitle: 'Vaša proba počinje<br />jednom porukom.',
      ctaText:
        'Popunite kratku formu i javljamo vam se u roku od jednog radnog dana kako bismo potvrdili termin.',
    },

    // ── Коллекции ────────────────────────────────────────────
    collections: {
      metaTitle: 'Kolekcije venčanica',
      metaDescription:
        'Sve kolekcije dostupne u salonu Kallee Bride u Novom Sadu — od minimalističkih krojeva do raskošnih, ručno vezenih silueta.',
      eyebrow: 'Kolekcije',
      title: 'Kolekcije<br />u našem salonu.',
      lead: 'Salon Kallee Bride ekskluzivno predstavlja Lana Grace Bridal u Novom Sadu. Umesto širokog izbora držimo dve pažljivo birane kolekcije — pogledajte ih i recite nam koja vam je bliska, a mi ćemo pripremiti modele za vašu probu.',
      ctaEyebrow: 'Zakazivanje',
      ctaTitle: 'Niste sigurni koja je vaša?',
      ctaText:
        'To je najčešće pitanje — i najlepši deo posla. Dođite na probu, a mi ćemo vam pomoći da suzite izbor. Bez obaveze i bez žurbe.',
      cardMore: 'Pogledajte kolekciju',
    },

    // ── Страница коллекции ───────────────────────────────────
    collection: {
      breadcrumb: 'Kolekcije',
      breadcrumbAria: 'Putanja',
      aboutEyebrow: 'O kolekciji',
      bookForThis: 'Zakažite probu za ovu kolekciju',
      gownsEyebrow: 'Modeli',
      gownsTitle: 'Venčanice iz kolekcije',
      gownsNote:
        'Prikazani modeli su deo kolekcije dostupne u salonu. Dostupnost veličina i rokovi izrade razlikuju se po modelu — proverite sa nama prilikom probe.',
      ctaEyebrow: 'Zakazivanje',
      ctaTitleBefore: 'Probajte',
      ctaTitleAfter: 'uživo.',
      ctaText:
        'Pripremićemo modele iz ove kolekcije za vaš termin. Javljamo vam se u roku od jednog radnog dana.',
      prev: 'Prethodna',
      next: 'Sledeća',
      pagerAria: 'Ostale kolekcije',

      // ── Galerija modela (otvara se klikom) ──────────────────
      galleryOpen: 'Pogledajte sve fotografije',
      galleryPhotoCount: (n) => `${n} ${n === 1 ? 'fotografija' : n < 5 ? 'fotografije' : 'fotografija'}`,
      galleryAria: 'Galerija fotografija',
      galleryClose: 'Zatvorite galeriju',
      galleryPrev: 'Prethodna fotografija',
      galleryNext: 'Sledeća fotografija',
      gallerySeparator: 'od', // «3 od 7»
      galleryVideo: 'Video',
    },

    // ── О салоне ─────────────────────────────────────────────
    about: {
      metaTitle: 'O salonu',
      metaDescription:
        'Priča salona Kallee Bride u Novom Sadu — ekskluzivnog predstavnika brenda Lana Grace Bridal. Saznajte kako izgleda proba i zašto nas neveste biraju.',
      eyebrow: 'O salonu',
      title: 'Mesto gde se<br />venčanica bira mirno.',
      lead: 'Kallee Bride je salon venčanica u samom centru Novog Sada, na Trgu mladenaca. Radimo drugačije od većine: bez gužve, bez kataloga koji se lista u žurbi i bez osećaja da neko čeka za vama.',

      storyEyebrow: 'Naša priča',
      storyTitle: 'Jedan brend, biran pažljivo.',
      storyP1a: 'Umesto desetak brendova i stotina modela koji se stapaju jedan u drugi, odlučili smo se za jedan —',
      storyP1b:
        '. Verujemo da je bolje poznavati svaku venčanicu u salonu do poslednjeg šava nego imati najveći izbor u gradu.',
      storyP2:
        'To znači da kada nam opišete kakvu venčanicu zamišljate, ne pretražujemo katalog — već tačno znamo koji model treba da probate i zašto.',

      brandEyebrow: 'Brend',
      brandP1:
        'Evropski brend venčanica sa preko dve decenije iskustva, prisutan u tridesetak zemalja. Prepoznatljiv po ručno vezenim detaljima, plemenitim čipkama i krojevima koji prate telo.',
      brandP2:
        'Svaka venčanica izrađuje se po porudžbini, sa individualnim rokom izrade — zato je dobro javiti se na vreme, idealno šest do devet meseci pre venčanja.',
      brandLink: 'Pogledajte kolekcije',

      trustEyebrow: 'Zašto baš kod nas',
      trustTitle: 'Ono na šta možete<br />da računate.',
      trust: [
        {
          title: 'Ekskluzivno zastupništvo',
          text: 'Jedini salon u Novom Sadu koji predstavlja Lana Grace Bridal — brend sa 21 godinom iskustva, prisutan u 30 zemalja.',
        },
        {
          title: 'Jedna nevesta u terminu',
          text: 'Nikada ne zakazujemo dve probe istovremeno. Salon, ogledalo i naša pažnja u tom terminu pripadaju samo vama.',
        },
        {
          title: 'Ručna izrada i čipka',
          text: 'Ručno vezene aplikacije i plemenite čipke. Svaki model se doručuje po meri, sa individualnim rokom izrade.',
        },
        {
          title: 'Prepravke i savet',
          text: 'Vodimo vas kroz svaku prepravku — od prvog uzimanja mera do poslednje probe pred venčanje.',
        },
      ],

      ctaEyebrow: 'Poseta',
      ctaTitle: 'Dođite da se upoznamo.',
      ctaText:
        'Proba je besplatna i ni na šta vas ne obavezuje. Zakažite termin koji vam odgovara — javljamo se u roku od jednog radnog dana.',
      ctaSecondary: 'Kontakt i mapa',
      brandAlt: 'Venčanice brenda Lana Grace Bridal',
      salonAlt: 'Enterijer salona Kallee Bride u Novom Sadu',
    },

    // ── Контакты ─────────────────────────────────────────────
    contact: {
      metaTitle: 'Kontakt',
      metaDescription:
        'Salon Kallee Bride — Trg mladenaca 8, Novi Sad. Radno vreme, telefon i mapa. Zakažite probu venčanice.',
      eyebrow: 'Kontakt',
      title: 'Nađite nas u centru<br />Novog Sada.',
      lead: 'Salon se nalazi na Trgu mladenaca, na nekoliko minuta hoda od Zmaj Jovine i Katedrale. Probe su isključivo po prethodnom zakazivanju — tako smo sigurni da ćemo vreme posvetiti samo vama.',

      addressTitle: 'Adresa',
      openInMaps: 'Otvorite u Google mapama',
      hoursTitle: 'Radno vreme',
      hoursNote: 'Probe isključivo uz prethodno zakazivanje.',
      reachTitle: 'Javite nam se',
      igSalon: 'Instagram salona',
      igBrand: 'Instagram brenda',

      visitEyebrow: 'Poseta',
      visitTitle: 'Šta da ponesete<br />na probu.',
      visitP1:
        'Ponesite obuću sličnu onoj koju planirate za venčanje i bez šminke koja se lako prenosi na tkaninu. Dovoljno je da dođete onakvi kakvi jeste — sve ostalo je na nama.',
      visitP2:
        'Preporučujemo da povedete najviše dve do tri osobe. Iskustvo nam je pokazalo da previše mišljenja odjednom otežava odluku, umesto da je olakša.',

      mapAria: 'Mapa lokacije salona',
      ctaEyebrow: 'Zakazivanje',
      ctaTitle: 'Rezervišite svoj termin.',
      ctaText:
        'Popunite kratku formu — javljamo vam se u roku od jednog radnog dana kako bismo potvrdili termin.',
    },

    // ── Запись ───────────────────────────────────────────────
    booking: {
      metaDescription:
        'Zakažite probu venčanice u salonu Kallee Bride u Novom Sadu. Popunite kratku formu — potvrđujemo termin u roku od jednog radnog dana.',
      eyebrow: 'Zakazivanje',
      title: 'Zakažite<br />probu.',
      lead: 'Popunite formu i javljamo vam se u roku od jednog radnog dana kako bismo potvrdili termin. Proba je besplatna i ni na šta vas ne obavezuje.',

      factDuration: 'Trajanje',
      factDurationValue: 'Oko 90 minuta, samo za vas',
      factAddress: 'Adresa',
      factHours: 'Radno vreme',
      factPhone: 'Radije telefonom?',

      doneTitle: 'Hvala vam.',
      doneText:
        'Vaš zahtev je poslat. Javljamo vam se u roku od jednog radnog dana kako bismo potvrdili termin probe.',
      doneMetaBefore: 'Ako vam je hitno, slobodno nas pozovite na',

      hpLabel: 'Ne popunjavajte ovo polje',
      fName: 'Ime i prezime',
      fNameErr: 'Molimo unesite vaše ime.',
      fContact: 'Email ili telefon',
      fContactPlaceholder: 'npr. ana@email.com ili 065 123 4567',
      fContactErr: 'Ostavite email ili broj telefona kako bismo vam se javili.',
      fDate: 'Željeni datum probe',
      fTime: 'Deo dana',
      fTimeAny: 'Bez posebne želje',
      fTimeAM: 'Prepodne',
      fTimePM: 'Popodne',
      fCollection: 'Kolekcija koja vas zanima',
      fCollectionNone: 'Još nisam sigurna',
      fGuests: 'Broj osoba u pratnji',
      fGuestsUnsure: 'Nisam sigurna',
      fGuestsAlone: 'Dolazim sama',
      fGuestsOne: '1 osoba',
      fGuestsTwo: '2 osobe',
      fGuestsThree: '3 osobe',
      fGuestsFour: '4 i više',
      fWedding: 'Datum venčanja',
      fWeddingPlaceholder: 'npr. jun 2026.',
      fNotes: 'Napomena',
      fNotesPlaceholder:
        'Kakvu venčanicu zamišljate? Ima li nečega što bi nam pomoglo da se pripremimo?',
      optional: '(opciono)',
      submit: 'Pošaljite zahtev',
      submitting: 'Šaljemo…',
      fine: 'Slanjem zahteva pristajete da vas kontaktiramo radi dogovora o terminu. Vaše podatke ne delimo ni sa kim.',

      errNoEndpoint:
        'Forma još nije povezana sa email nalogom salona, pa zahtev trenutno ne može biti poslat. Molimo pozovite nas na',
      errSend: 'Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite na',
    },
  },

  // ═════════════════════════════════════════════════════════════
  //  ENGLISH
  // ═════════════════════════════════════════════════════════════
  en: {
    skipToContent: 'Skip to content',
    homeLabel: 'Home',
    bookCta: 'Book a fitting',
    callCta: 'Call us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    homeAria: 'home page',
    switchLangAria: 'Switch to Serbian',

    nav: [
      { key: 'collections', label: 'Collections' },
      { key: 'about', label: 'The salon' },
      { key: 'contact', label: 'Contact' },
    ],

    hours: [
      { label: 'Monday – Friday', value: '12:00 – 19:00' },
      { label: 'Saturday', value: '10:00 – 15:00' },
      { label: 'Sunday', value: 'Closed', closed: true },
    ],

    footer: {
      taglineBefore: 'The exclusive home of',
      taglineAfter: 'in Novi Sad.',
      pages: 'Pages',
      collections: 'Collections',
      contact: 'Contact',
      hours: 'Opening hours',
      rights: 'All rights reserved.',
      gownsBy: 'Gowns by',
    },

    home: {
      metaTitleSuffix: 'Lana Grace Wedding Dresses in Novi Sad',
      heroEyebrow: 'Exclusively',
      viewCollections: 'View the collections',
      heroFilmAlt: 'Lana Grace Bridal gowns at the Kallee Bride salon',

      introEyebrow: 'The salon',
      introTitle: 'Gowns chosen without hurry.',
      introP1a: 'Kallee Bride is the exclusive home of',
      introP1b:
        'in Novi Sad. At our salon on Trg mladenaca every fitting is booked in advance and lasts as long as it needs to — no crowds, no pressure, and no sense that someone is waiting behind you.',
      introP2:
        'We believe the right gown is never found in a rush. So we see one bride at a time, and give her the whole room, our full attention, and all the time she needs.',
      introLink: 'More about the salon',
      salonAlt: 'Interior of the Kallee Bride salon in Novi Sad',

      collectionsEyebrow: 'Collections',
      collectionsTitle: 'Find your<br />silhouette.',
      collectionsAside:
        'Two Lana Grace Bridal collections of entirely different character — from shimmering restraint to lavish volume.',
      allCollections: 'All collections',

      stepsEyebrow: 'The fitting',
      stepsTitle: 'What a fitting<br />with us looks like.',
      stepsAside:
        'From your first message to the final alteration — you know exactly what happens at every step.',
      steps: [
        {
          n: '01',
          title: 'Booking',
          text: 'Write to us through the form or call. We confirm your appointment within one business day.',
        },
        {
          n: '02',
          title: 'Preparation',
          text: 'Before you arrive we select gowns that suit your style, your figure and your wedding date.',
        },
        {
          n: '03',
          title: 'The fitting',
          text: 'For that appointment the salon is yours alone. Try on as many as you like, with the people closest to you.',
        },
        {
          n: '04',
          title: 'Tailoring',
          text: 'Once you have found your gown we take your measurements and guide you through every alteration.',
        },
      ],

      testimonialsEyebrow: 'Our brides',
      testimonialsTitle: 'From those who have<br />already found theirs.',

      ctaEyebrow: 'Booking',
      ctaTitle: 'Your fitting begins<br />with one message.',
      ctaText:
        'Fill in the short form and we will get back to you within one business day to confirm your appointment.',
    },

    collections: {
      metaTitle: 'Wedding dress collections',
      metaDescription:
        'Every collection available at Kallee Bride in Novi Sad — from minimal cuts to lavish, hand-embroidered silhouettes.',
      eyebrow: 'Collections',
      title: 'The collections<br />we carry.',
      lead: 'Kallee Bride is the exclusive home of Lana Grace Bridal in Novi Sad. Rather than a wide selection we hold two carefully chosen collections — look through them and tell us which speaks to you, and we will have those gowns ready for your fitting.',
      ctaEyebrow: 'Booking',
      ctaTitle: 'Not sure which one is yours?',
      ctaText:
        'That is the most common question — and the loveliest part of the job. Come in for a fitting and we will help you narrow it down. No obligation, no rush.',
      cardMore: 'View the collection',
    },

    collection: {
      breadcrumb: 'Collections',
      breadcrumbAria: 'Breadcrumb',
      aboutEyebrow: 'About the collection',
      bookForThis: 'Book a fitting for this collection',
      gownsEyebrow: 'The gowns',
      gownsTitle: 'Gowns from this collection',
      gownsNote:
        'The gowns shown are part of the collection held at the salon. Size availability and made-to-order timings vary by style — do ask us during your fitting.',
      ctaEyebrow: 'Booking',
      ctaTitleBefore: 'See',
      ctaTitleAfter: 'in person.',
      ctaText:
        'We will have gowns from this collection ready for your appointment. We reply within one business day.',
      prev: 'Previous',
      next: 'Next',
      pagerAria: 'Other collections',

      // ── Gown gallery (opens on click) ───────────────────────
      galleryOpen: 'View all photographs',
      galleryPhotoCount: (n) => `${n} ${n === 1 ? 'photograph' : 'photographs'}`,
      galleryAria: 'Photo gallery',
      galleryClose: 'Close gallery',
      galleryPrev: 'Previous photograph',
      galleryNext: 'Next photograph',
      gallerySeparator: 'of', // “3 of 7”
      galleryVideo: 'Video',
    },

    about: {
      metaTitle: 'The salon',
      metaDescription:
        'The story of Kallee Bride in Novi Sad — exclusive home of Lana Grace Bridal. What a fitting is like, and why brides choose us.',
      eyebrow: 'The salon',
      title: 'Where a gown is<br />chosen calmly.',
      lead: 'Kallee Bride is a bridal salon in the very centre of Novi Sad, on Trg mladenaca. We work differently from most: no crowds, no catalogue to flip through in a hurry, and no sense that someone is waiting behind you.',

      storyEyebrow: 'Our story',
      storyTitle: 'One brand, chosen carefully.',
      storyP1a:
        'Instead of a dozen labels and hundreds of gowns that blur into one another, we chose a single one —',
      storyP1b:
        '. We would rather know every gown in the salon down to the last seam than carry the widest selection in the city.',
      storyP2:
        'It means that when you describe the gown you have in mind, we are not searching a catalogue — we already know which one you should try, and why.',

      brandEyebrow: 'The brand',
      brandP1:
        'A European bridal house with more than two decades behind it, stocked in some thirty countries. Known for hand-embroidered detail, fine lace, and cuts that follow the body.',
      brandP2:
        'Every gown is made to order, each with its own production time — which is why it is worth getting in touch early, ideally six to nine months before the wedding.',
      brandLink: 'View the collections',

      trustEyebrow: 'Why us',
      trustTitle: 'What you can<br />count on.',
      trust: [
        {
          title: 'Exclusive stockist',
          text: 'The only salon in Novi Sad carrying Lana Grace Bridal — a house with 21 years behind it, present in 30 countries.',
        },
        {
          title: 'One bride at a time',
          text: 'We never book two fittings at once. While you are with us, the salon, the mirror and our attention belong to you alone.',
        },
        {
          title: 'Handwork and lace',
          text: 'Hand-embroidered appliqué and fine lace. Every gown is made to your measurements, with its own production time.',
        },
        {
          title: 'Alterations and advice',
          text: 'We guide you through every alteration — from the first measurements to the final fitting before the wedding.',
        },
      ],

      ctaEyebrow: 'Visit',
      ctaTitle: 'Come and meet us.',
      ctaText:
        'Fittings are free and commit you to nothing. Book a time that suits you — we reply within one business day.',
      ctaSecondary: 'Contact and map',
      brandAlt: 'Lana Grace Bridal wedding dresses',
      salonAlt: 'Interior of the Kallee Bride salon in Novi Sad',
    },

    contact: {
      metaTitle: 'Contact',
      metaDescription:
        'Kallee Bride — Trg mladenaca 8, Novi Sad. Opening hours, phone and map. Book a wedding dress fitting.',
      eyebrow: 'Contact',
      title: 'Find us in the centre<br />of Novi Sad.',
      lead: 'The salon is on Trg mladenaca, a few minutes on foot from Zmaj Jovina and the Cathedral. Fittings are by appointment only — that way the time is yours alone.',

      addressTitle: 'Address',
      openInMaps: 'Open in Google Maps',
      hoursTitle: 'Opening hours',
      hoursNote: 'Fittings by prior appointment only.',
      reachTitle: 'Get in touch',
      igSalon: 'Salon Instagram',
      igBrand: 'Brand Instagram',

      visitEyebrow: 'Your visit',
      visitTitle: 'What to bring<br />to a fitting.',
      visitP1:
        'Bring shoes with a heel height close to the shoes you plan to wear, and skip make-up that transfers easily onto fabric. Otherwise, simply come as you are — the rest is on us.',
      visitP2:
        'We suggest bringing no more than two or three people. Experience has taught us that too many opinions at once make the decision harder, not easier.',

      mapAria: 'Map of the salon location',
      ctaEyebrow: 'Booking',
      ctaTitle: 'Reserve your appointment.',
      ctaText:
        'Fill in the short form — we will get back to you within one business day to confirm your time.',
    },

    booking: {
      metaDescription:
        'Book a wedding dress fitting at Kallee Bride in Novi Sad. Fill in the short form — we confirm within one business day.',
      eyebrow: 'Booking',
      title: 'Book<br />a fitting.',
      lead: 'Fill in the form and we will get back to you within one business day to confirm your appointment. Fittings are free and commit you to nothing.',

      factDuration: 'Duration',
      factDurationValue: 'About 90 minutes, yours alone',
      factAddress: 'Address',
      factHours: 'Opening hours',
      factPhone: 'Prefer to call?',

      doneTitle: 'Thank you.',
      doneText:
        'Your request has been sent. We will get back to you within one business day to confirm your fitting.',
      doneMetaBefore: 'If it is urgent, do call us on',

      hpLabel: 'Please leave this field empty',
      fName: 'Full name',
      fNameErr: 'Please enter your name.',
      fContact: 'Email or phone',
      fContactPlaceholder: 'e.g. anna@email.com or +381 65 123 456',
      fContactErr: 'Please leave an email or phone number so we can reply.',
      fDate: 'Preferred date',
      fTime: 'Time of day',
      fTimeAny: 'No preference',
      fTimeAM: 'Morning',
      fTimePM: 'Afternoon',
      fCollection: 'Collection of interest',
      fCollectionNone: 'Not sure yet',
      fGuests: 'Guests joining you',
      fGuestsUnsure: 'Not sure',
      fGuestsAlone: 'Coming alone',
      fGuestsOne: '1 guest',
      fGuestsTwo: '2 guests',
      fGuestsThree: '3 guests',
      fGuestsFour: '4 or more',
      fWedding: 'Wedding date',
      fWeddingPlaceholder: 'e.g. June 2026',
      fNotes: 'Anything else',
      fNotesPlaceholder:
        'What kind of gown do you have in mind? Anything that would help us prepare?',
      optional: '(optional)',
      submit: 'Send request',
      submitting: 'Sending…',
      fine: 'By sending this request you agree that we may contact you to arrange an appointment. We never share your details.',

      errNoEndpoint:
        'The form is not yet connected to the salon inbox, so your request cannot be sent right now. Please call us on',
      errSend: 'Something went wrong while sending. Please try again or call us on',
    },
  },
};

/** Короткий доступ: t('en').bookCta */
export const t = (lang) => ui[lang] ?? ui[defaultLang];
