import { esc, section } from '../lib/html.js';
import { techMap } from '../config/content.js';

export function technology(ctx) {
  const tc = ctx.t.technology;
  const filters = [['all', tc.all], ...techMap.map((g) => [g.key, tc.categories[g.key]])];
  const body = `
  <div class="tech" data-tech>
    <div class="tech-filter" role="group" aria-label="${esc(tc.title)}" data-tech-filter hidden>
      ${filters.map(([k, l]) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${k === 'all'}">${esc(l)}</button>`).join('')}
    </div>
    <div class="tech-map">${techMap.map((g) => `
      <section class="tech-group" data-group="${g.key}" aria-labelledby="tg-${g.key}">
        <h3 class="tech-group-title" id="tg-${g.key}">${esc(tc.categories[g.key])}</h3>
        <ul class="tag-list">${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </section>`).join('')}
    </div>
    <p class="note">${esc(tc.trademarks)}</p>
  </div>
  <div class="explain" id="see-the-technology">
    <h3 class="sub-title">${esc(tc.explainTitle)}</h3>
    <p class="muted">${esc(tc.explainIntro)}</p>
    <div class="explain-grid">${tc.explain.map((e) => `
      <details class="explain-card">
        <summary><span class="explain-name">${esc(e.n)}</span><span class="explain-b">${esc(e.b)}</span></summary>
        <div class="explain-body">
          <p><span class="finder-label">${esc(tc.businessLabel)}</span>${esc(e.b)}</p>
          <p><span class="finder-label">${esc(tc.technicalLabel)}</span>${esc(e.t)}</p>
        </div>
      </details>`).join('')}
    </div>
  </div>`;
  return section({ id: 'technology', title: tc.title, intro: tc.intro, body });
}
