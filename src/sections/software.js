import { esc, section } from '../lib/html.js';

export function software(ctx) {
  const s = ctx.t.software;
  const body = `
  <div class="two-col">
    <figure class="layers" aria-labelledby="sw-layers-cap">
      <figcaption id="sw-layers-cap" class="fig-label">${esc(s.layersLabel)}</figcaption>
      <ol class="layers-list">${s.layers.map((l) => `<li><span class="layers-t">${esc(l.t)}</span><span class="layers-d">${esc(l.d)}</span></li>`).join('')}</ol>
    </figure>
    <div>
      <h3 class="sub-title">${esc(s.listTitle)}</h3>
      <ul class="check-list">${s.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>
  </div>
  <div class="callout" id="github">
    <div>
      <h3 class="sub-title">${esc(s.githubTitle)}</h3>
      <p>${esc(s.githubBody)}</p>
    </div>
    <ul class="tag-list">${s.githubList.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>`;
  return section({ id: 'software', title: s.title, intro: s.intro, body });
}
