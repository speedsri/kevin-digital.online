import { esc, section } from '../lib/html.js';

export function industries(ctx) {
  const d = ctx.t.industries;
  const body = `<ul class="industry-grid">${d.items.map((i) => `<li><h3 class="card-title">${esc(i.t)}</h3><p>${esc(i.d)}</p></li>`).join('')}</ul>`;
  return section({ id: 'industries', title: d.title, intro: d.note, body, cls: 'section--alt section--tight' });
}
