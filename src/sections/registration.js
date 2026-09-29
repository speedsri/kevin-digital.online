import { esc, section } from '../lib/html.js';
import { icon } from '../lib/icons.js';

const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim());

export function registration(ctx) {
  const { t, config, root } = ctx;
  const r = config.registration;
  if (!r.show) return '';
  const L = t.registration;
  const row = (label, v) => `<div><dt>${esc(label)}</dt><dd${isPlaceholder(v) ? ' class="placeholder"' : ''}>${esc(v || '—')}</dd></div>`;
  const doc = r.documentUrl
    ? `<a class="btn btn-secondary" href="${esc(/^https?:/.test(r.documentUrl) ? r.documentUrl : root + r.documentUrl)}" target="_blank" rel="noopener">${icon('doc')}${esc(L.viewDoc)}<span class="sr-only"> ${esc(t.a11y.newTab)}</span></a>`
    : `<p class="note">${esc(L.docPending)}</p>`;
  const body = `<div class="reg-card">
    <div class="reg-brand"><p class="reg-name">${esc(config.company.name)}</p><p class="muted">${esc(config.company.location)}</p>${doc}</div>
    <dl class="reg-list">
      ${row(L.name, r.businessName)}
      ${row(L.number, r.number)}
      ${row(L.licence, r.licence)}
      ${row(L.authority, r.authority)}
      ${row(L.status, r.status)}
    </dl>
  </div>`;
  return section({ id: 'registration', title: L.title, body, cls: 'section--tight' });
}
