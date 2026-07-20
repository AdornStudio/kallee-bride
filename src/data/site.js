/**
 * ─────────────────────────────────────────────────────────────
 *  SALON DETAILS — EDIT THIS FILE
 * ─────────────────────────────────────────────────────────────
 *  Everything here appears across the whole site: header, footer,
 *  contact page, and the Google structured data that helps brides
 *  find you on Google Maps and in search.
 *
 *  Change a phone number here once and it updates on EVERY page.
 *  Nothing else needs touching.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Kallee Bride',
  parentBrand: 'Lana Grace Bridal',

  // The line under the salon name in the hero, per language.
  tagline: {
    sr: 'Trenutak kada znate da je to ta.',
    en: "The moment you know it's the one.",
  },

  // Used for SEO descriptions and social sharing previews.
  description:
    'Kallee Bride — ekskluzivni salon venčanica Lana Grace Bridal u Novom Sadu. ' +
    'Zakažite probu i pronađite svoju venčanicu u miru, bez žurbe.',

  // ── CONTACT ────────────────────────────────────────────────
  phone: '+381 65 2005103',
  phoneHref: '+38165200510', // no spaces — used for the clickable tap-to-call link

  // TODO: ADD THE SALON EMAIL HERE.
  // Until this is filled in, the address is hidden from the site
  // automatically — nothing will look broken or half-finished.
  email: '',

  // TODO: The old website listed a landline: 021/451 507.
  // If it still works, uncomment the line below to show it too.
  // phoneLandline: '021 451 507',

  address: {
    street: 'Trg mladenaca 8',
    city: 'Novi Sad',
    postalCode: '21000',
    country: 'Srbija',
    countryCode: 'RS',
    // Coordinates of Trg mladenaca, Novi Sad — used for the map and for
    // local SEO (helps the salon appear in "near me" searches).
    lat: 45.2551,
    lng: 19.8452,
  },

  // ── OPENING HOURS ──────────────────────────────────────────
  // The hours a bride SEES live in src/data/i18n.js (they are translated).
  // This is the machine-readable version Google reads — keep the two in
  // sync if you ever change the hours.
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '12:00', closes: '19:00' },
    { days: ['Saturday'], opens: '10:00', closes: '15:00' },
  ],

  // ── SOCIAL ─────────────────────────────────────────────────
  instagram: {
    salon: { handle: '@vencanice_kallee', url: 'https://www.instagram.com/vencanice_kallee/' },
    brand: { handle: '@lana_grace_bridal', url: 'https://www.instagram.com/lana_grace_bridal/' },
  },
};

/**
 * Navigation labels and page addresses now live in src/data/i18n.js,
 * because they differ per language (/kolekcije vs /en/collections).
 */
