#!/usr/bin/env node
/**
 * Static site build — zero dependencies (Node 18+).
 *   node build.mjs            → writes ./dist
 *   SITE_URL=https://example.lk node build.mjs   → adds canonical/hreflang/sitemap
 * Output is plain HTML/CSS/JS that GitHub Pages (or any static host) serves as-is.
 */
import { mkdir, rm, writeFile, readFile, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import config from './src/config/site.config.js';
import en from './src/translations/en/index.js';
import si from './src/translations/si/index.js';
import ta from './src/translations/ta/index.js';
import { homePage } from './src/pages/home.js';
import { legalPage, notFoundPage } from './src/pages/legal.js';

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, 'dist');
const SITE_URL = (process.env.SITE_URL || config.site.url || '').replace(/\/+$/, '');
const LANGS = config.site.languages;
const warnings = [];

/* ---- translations: merge each language over English, report gaps ---- */
function merge(base, over, path = '') {
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) { warnings.push(`missing ${path}`); return base; }
    if (over.length !== base.length) warnings.push(`length mismatch ${path} (${over.length} vs ${base.length})`);
    return base.map((b, i) => (i < over.length ? merge(b, over[i], `${path}[${i}]`) : b));
  }
  if (base && typeof base === 'object') {
    const out = {};
    for (const k of Object.keys(base)) {
      if (over == null || !(k in over)) { warnings.push(`missing ${path}.${k}`); out[k] = base[k]; }
      else out[k] = merge(base[k], over[k], `${path}.${k}`);
    }
    return out;
  }
  if (over === '' || over == null) { warnings.push(`empty ${path}`); return base; }
  return over;
}
const T = { en, si: merge(en, si, 'si'), ta: merge(en, ta, 'ta') };

/* ---- helpers ---- */
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 10);
async function write(rel, content) {
  const file = join(OUT, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}
const minifyCss = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();

/* ---- build ---- */
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
if (existsSync(join(DIR, 'public'))) await cp(join(DIR, 'public'), OUT, { recursive: true });

const css = minifyCss(await readFile(join(DIR, 'src/styles/main.css'), 'utf8'));
const contactSvc = await readFile(join(DIR, 'src/services/contact.js'), 'utf8');
const svcHash = hash(contactSvc);
const appJs = (await readFile(join(DIR, 'src/scripts/app.js'), 'utf8'))
  .replace("'./services/contact.js'", `'./services/contact.js?v=${svcHash}'`);
await write('assets/css/main.css', css);
await write('assets/js/app.js', appJs);
await write('assets/js/services/contact.js', contactSvc);
const assets = { css: `assets/css/main.css?v=${hash(css)}`, js: `assets/js/app.js?v=${hash(appJs)}` };

const pages = [];
for (const lang of LANGS) {
  const base = { t: T[lang], lang, config, siteUrl: SITE_URL, assets, langs: LANGS };
  await write(`${lang}/index.html`, homePage({ ...base, root: '../', pagePath: '', home: '' }));
  pages.push(`${lang}/`);
  for (const kind of ['privacy', 'terms']) {
    await write(`${lang}/${kind}/index.html`, legalPage({ ...base, root: '../../', pagePath: `${kind}/`, home: `../../${lang}/` }, kind));
    pages.push(`${lang}/${kind}/`);
  }
}

/* 404: GitHub Pages serves it at any depth, so links must be root-relative.
   The base path comes from SITE_URL (e.g. /repo/ for project sites). */
const basePath = SITE_URL ? (new URL(SITE_URL).pathname.replace(/\/?$/, '/')) : '/';
await write('404.html', notFoundPage({ t: en, lang: 'en', config, siteUrl: '', assets, langs: LANGS, root: basePath, pagePath: '', home: `${basePath}en/` }));

/* Root: send visitors to their saved or browser language. */
await write('index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${config.company.name}</title>
<meta name="description" content="${en.meta.description.replace(/"/g, '&quot;')}">
${SITE_URL ? `<link rel="canonical" href="${SITE_URL}/en/">\n${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/">`).join('\n')}\n<link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/">` : ''}
<meta name="robots" content="noindex, follow">
<script>(function(){var L=${JSON.stringify(LANGS)},s;try{s=localStorage.getItem('kdd-lang')}catch(e){}if(L.indexOf(s)<0){var n=(navigator.languages||[navigator.language||'']).map(function(x){return String(x).slice(0,2).toLowerCase()});s='${config.site.defaultLanguage}';for(var i=0;i<n.length;i++){if(L.indexOf(n[i])>=0){s=n[i];break}}}location.replace(s+'/'+location.hash)})();</script>
<noscript><meta http-equiv="refresh" content="0; url=en/"></noscript>
</head><body><p><a href="en/">English</a> · <a href="si/">සිංහල</a> · <a href="ta/">தமிழ்</a></p></body></html>`);

/* SEO files */
if (SITE_URL) {
  const alt = (p) => LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/${p.replace(/^[a-z]{2}\//, '')}"/>`).join('');
  await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((p) => `<url><loc>${SITE_URL}/${p}</loc><lastmod>${config.site.lastUpdated}</lastmod>${alt(p)}</url>`).join('\n')}
</urlset>\n`);
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
} else {
  await write('robots.txt', 'User-agent: *\nAllow: /\n');
}
await write('.nojekyll', '');
if (config.site.customDomain) await write('CNAME', `${config.site.customDomain}\n`);

/* ---- report ---- */
const count = (await readdir(OUT, { recursive: true })).length;
console.log(`Built ${pages.length} pages (+ root, 404) → dist/  [${count} entries]`);
console.log(SITE_URL ? `SITE_URL: ${SITE_URL}` : 'SITE_URL not set: canonical, hreflang and sitemap omitted (set it for production).');
if (warnings.length) {
  console.warn(`\nTranslation warnings (${warnings.length}) — English used as fallback:`);
  warnings.forEach((w) => console.warn('  - ' + w));
  if (process.env.STRICT_I18N) process.exit(1);
}
