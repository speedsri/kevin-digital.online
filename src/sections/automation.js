import { esc, section } from '../lib/html.js';

export function automation(ctx) {
  const a = ctx.t.automation;
  const body = `<ul class="card-grid card-grid--4">${a.examples.map((e) => `<li class="card"><h3 class="card-title">${esc(e.t)}</h3><p>${esc(e.d)}</p></li>`).join('')}</ul>`;
  return section({ id: 'automation', title: a.title, intro: a.body, body, cls: 'section--tight' });
}
