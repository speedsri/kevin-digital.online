/**
 * ============================================================
 *  KEVIN DIGITAL DEVELOPERS — CENTRAL SITE CONFIGURATION
 * ============================================================
 *  This is the ONLY file you normally need to edit to change
 *  company details, contact numbers, social links, registration
 *  information or optional integrations.
 *
 *  After editing:  npm run build   (or push to GitHub — the
 *  deploy workflow rebuilds the site automatically).
 *
 *  RULES
 *  - Never put passwords, API keys, Meta/WhatsApp tokens,
 *    database credentials or any other secret in this file.
 *    Everything here is published to the public website.
 *  - Leave a value as "" (empty) to hide it. Empty social links
 *    are hidden, an empty email hides the email option, and an
 *    empty form endpoint means enquiries open WhatsApp/email.
 * ============================================================
 */

export const siteConfig = {
  company: {
    name: 'Kevin Digital Developers',
    shortName: 'Kevin Digital',
    tagline: 'Digital Solutions & IT Infrastructure',
    location: 'Kurunegala, Sri Lanka',
    address: {
      // Taken from the footer of https://kevin-digital.online/ — please verify.
      street: '19, Diaswatta, Alakoladeniya',
      locality: 'Kurunegala',
      country: 'LK',
      display: '19, Diaswatta, Alakoladeniya, Kurunegala, Sri Lanka',
    },
  },

  site: {
    // Public URL of THIS corporate website, without a trailing slash,
    // e.g. "https://www.example.lk". Used for canonical URLs, Open Graph,
    // hreflang and the sitemap.
    // When deployed with the included GitHub Actions workflow this is
    // filled in automatically from GitHub Pages (SITE_URL env variable),
    // so it can stay empty here.
    url: '',
    // Optional custom domain, e.g. "www.example.lk". When set, the build
    // writes a CNAME file. You must ALSO set it in GitHub → Settings → Pages.
    customDomain: '',
    languages: ['en', 'si', 'ta'],
    defaultLanguage: 'en',
    // Defaults for first-time visitors. Each visitor's own choice is saved
    // in their browser and always wins.
    themeDefaults: { mode: 'light', accent: 'blue', density: 'comfortable' },
    lastUpdated: '2026-09-29',
  },

  contact: {
    // Numbers as displayed. Links (tel:, wa.me) are generated from them.
    phones: ['+94 78 975 4444', '+94 70 654 3780'],
    whatsapp: '+94 70 211 0343',
    // The current site hides its email behind Cloudflare protection, so it
    // could not be read automatically. Add the official address here.
    email: '',
    // Optional: URL of an EXTERNAL form service (Formspree, Getform, your own
    // API, …) that accepts a JSON POST. Leave "" and the enquiry form will
    // open WhatsApp or email instead — nothing is stored by this website.
    externalFormEndpoint: '',
  },

  // The existing WhatsApp Business Message Management Platform.
  // It has its own backend; this site only links to it.
  platform: {
    name: 'DT Platform4',
    url: 'https://kevin-digital.online/',
  },

  // Business registration. Placeholders are shown exactly as written until
  // replaced. Set show:false to hide the whole section.
  registration: {
    show: true,
    businessName: '[INSERT REGISTERED BUSINESS NAME]',
    number: '[INSERT OFFICIAL REGISTRATION NUMBER]',
    licence: '[INSERT RELEVANT LICENCE]',
    authority: '[INSERT REGISTRATION AUTHORITY]',
    status: '[CONFIRM REGISTRATION STATUS]',
    // Path inside /public (e.g. "docs/registration.pdf") or a full URL.
    // The "View registration document" button appears only when set.
    documentUrl: '',
  },

  // Empty values are hidden — no broken or invented links.
  social: {
    facebook: '',
    instagram: '',
    whatsapp: '', // leave empty to use contact.whatsapp automatically
    linkedin: '',
    youtube: '',
  },

  branding: {
    // Optional image logo inside /public (e.g. "images/logo.svg").
    // Empty = the built-in network "K" mark + wordmark.
    logo: '',
    favicon: 'favicon/favicon.svg',
    ogImage: 'images/og-image.png',
  },

  // Future integrations. Each is used only through /src/services and only
  // with PUBLIC endpoints. Secrets belong on the server behind the endpoint.
  integrations: {
    whatsappPlatformApi: '',
    crmApi: '',
    aiService: '',
    analytics: { enabled: false, provider: '', id: '' },
  },
};

export default siteConfig;
