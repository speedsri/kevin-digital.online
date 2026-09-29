import { esc, section } from '../lib/html.js';

export function process(ctx) {
  const p = ctx.t.process;
  const body = `<ol class="steps">${p.steps.map((s, i) => `<li class="step"><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h3 class="card-title">${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>`;
  return section({ id: 'process', title: p.title, body, cls: 'section--tight' });
}
