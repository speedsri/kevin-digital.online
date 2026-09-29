import { esc } from '../lib/html.js';

const FONT_BASE = 'family=Schibsted+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500';
const FONT_LANG = { en: '', si: '&family=Noto+Sans+Sinhala:wght@400;500;600;700', ta: '&family=Noto+Sans+Tamil:wght@400;500;600;700' };

/** <head> contents: meta, SEO, hreflang, fonts, theme boot script. */
export function renderHead(ctx, { title, description, jsonLd = '' }) {
  const { lang, t, config, root, pagePath, siteUrl, assets, langs } = ctx;
  const abs = (l) => (siteUrl ? `${siteUrl}/${l}/${pagePath}` : '');
  const url = abs(lang);
  const og = siteUrl ? `${siteUrl}/${config.branding.ogImage}` : `${root}${config.branding.ogImage}`;
  const d = config.site.themeDefaults;
  // Runs before first paint so the visitor's saved theme is applied without a flash.
  const boot = `(function(){var d=document.documentElement,s=function(k,v){try{return localStorage.getItem(k)||v}catch(e){return v}};var m=s('kdd-mode','${d.mode}'),a=s('kdd-accent','${d.accent}'),n=s('kdd-density','${d.density}');var dk=m==='dark'||(m==='system'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);d.setAttribute('data-theme',dk?'dark':'light');d.setAttribute('data-mode',m);d.setAttribute('data-accent',a);d.setAttribute('data-density',n);d.classList.add('js');})();`;

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#F3F6F9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0A1420" media="(prefers-color-scheme: dark)">
${url ? `<link rel="canonical" href="${url}">` : ''}
${siteUrl ? langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(l)}">`).join('\n') : ''}
${siteUrl ? `<link rel="alternate" hreflang="x-default" href="${abs('en')}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(config.company.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="${esc(t.locale)}">
${url ? `<meta property="og:url" content="${url}">` : ''}
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="${root}${config.branding.favicon}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}favicon/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONT_BASE}${FONT_LANG[lang] || ''}&display=swap">
<link rel="stylesheet" href="${root}${assets.css}">
<script>${boot}</script>
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}`;
}
