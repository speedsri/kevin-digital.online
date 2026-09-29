import { esc, section } from '../lib/html.js';
import { capabilityBranches } from '../config/content.js';

export function capabilities(ctx) {
  const c = ctx.t.capabilities;
  const branches = capabilityBranches.map((k) => {
    const b = c.branches[k];
    return `<li class="capmap-branch"><h3 class="capmap-title">${esc(b.title)}</h3><ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></li>`;
  }).join('');
  const body = `
  <div class="capmap">
    <div class="capmap-root">${esc(c.root)}</div>
    <ul class="capmap-branches">${branches}</ul>
    <div class="capmap-converge"><strong>${esc(c.converge)}</strong><span>${esc(c.convergeDetail)}</span></div>
  </div>
  <div class="growth-block">
    <h3 class="sub-title">${esc(c.growthTitle)}</h3>
    <ol class="growth">${c.growth.map((g) => `<li>${esc(g)}</li>`).join('')}</ol>
    <p class="muted">${esc(c.growthNote)}</p>
  </div>`;
  return section({ id: 'capabilities', title: c.title, intro: c.intro, body });
}

export function services(ctx) {
  const s = ctx.t.services;
  const body = `<div class="register">${s.categories.map((cat, i) => `
    <details class="register-row"${i === 0 ? ' open' : ''}>
      <summary>
        <span class="register-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="register-head"><span class="register-title">${esc(cat.title)}</span><span class="register-summary">${esc(cat.summary)}</span></span>
        <span class="register-toggle" aria-hidden="true"></span>
      </summary>
      <div class="register-body">
        <ul class="tag-list">${cat.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
        ${cat.note ? `<p class="note">${esc(cat.note)}</p>` : ''}
      </div>
    </details>`).join('')}
  </div>`;
  return section({ id: 'services', title: s.title, intro: s.intro, body, cls: 'section--tight' });
}
