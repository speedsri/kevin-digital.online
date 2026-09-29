import { esc, section } from '../lib/html.js';

export function problems(ctx) {
  const p = ctx.t.problems;
  const tabs = p.items.map((it, i) => `
      <button type="button" class="finder-tab" role="tab" id="pf-tab-${i}" aria-controls="pf-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(it.q)}</button>`).join('');
  const panels = p.items.map((it, i) => `
      <div class="finder-panel" role="tabpanel" id="pf-panel-${i}" aria-labelledby="pf-tab-${i}" tabindex="0">
        <p class="finder-q">${esc(it.q)}</p>
        <p class="finder-label">${esc(p.answerLabel)}</p>
        <h3 class="finder-answer">${esc(it.a)}</h3>
        <p>${esc(it.d)}</p>
        <a class="text-link" href="#${it.link}">${esc(p.more)}</a>
      </div>`).join('');
  const body = `<div class="finder" data-tabs>
    <div class="finder-list" role="tablist" aria-orientation="vertical" aria-label="${esc(p.title)}">${tabs}
    </div>
    <div class="finder-panels">${panels}
    </div>
  </div>`;
  return section({ id: 'solutions', title: p.title, intro: p.intro, body, cls: 'section--alt' });
}
