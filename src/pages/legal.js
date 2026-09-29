import { layout } from '../components/layout.js';
import { esc } from '../lib/html.js';

export function legalPage(ctx, kind) {
  const { t, config, root, lang } = ctx;
  const doc = t.legal[kind];
  const main = `<article class="legal container">
    <p><a class="text-link" href="${root}${lang}/">${esc(t.legal.back)}</a></p>
    <h1 class="legal-title">${esc(doc.title)}</h1>
    <p class="muted">${esc(t.legal.updated)}: <time datetime="${config.site.lastUpdated}">${config.site.lastUpdated}</time></p>
    ${doc.sections.map((s) => `<section><h2>${esc(s.h)}</h2><p>${esc(s.p)}</p></section>`).join('')}
  </article>`;
  const title = `${doc.title} | ${config.company.name}`;
  return layout(ctx, { title, description: `${doc.title} — ${config.company.name}`, main, bodyClass: 'page-legal' });
}

export function notFoundPage(ctx) {
  const { t, root, lang } = ctx;
  const main = `<article class="legal container not-found">
    <h1 class="legal-title">${esc(t.notFound.title)}</h1>
    <p>${esc(t.notFound.body)}</p>
    <p><a class="btn btn-primary" href="${root}${lang}/">${esc(t.notFound.home)}</a></p>
  </article>`;
  return layout(ctx, { title: `${t.notFound.title} | ${ctx.config.company.name}`, description: t.notFound.body, main, bodyClass: 'page-404' });
}
