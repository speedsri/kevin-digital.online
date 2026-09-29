import { esc, section } from '../lib/html.js';

export function about(ctx) {
  const a = ctx.t.about;
  const body = `
  <div class="about-grid">
    <div class="about-text">
      <p class="lead">${esc(a.lead)}</p>
      <p>${esc(a.p1)}</p>
      <p>${esc(a.p2)}</p>
    </div>
    <aside class="about-side">
      <p class="about-side-label">${esc(a.intersectionLabel)}</p>
      <ul class="intersection">${a.intersection.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </aside>
  </div>
  <h3 class="sub-title">${esc(a.principlesTitle)}</h3>
  <dl class="principles">${a.principles.map((p) => `<div><dt>${esc(p.t)}</dt><dd>${esc(p.d)}</dd></div>`).join('')}</dl>`;
  return section({ id: 'about', title: a.title, body });
}
