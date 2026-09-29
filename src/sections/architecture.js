import { esc, section } from '../lib/html.js';
import { architectureChain } from '../config/content.js';

export function architecture(ctx) {
  const a = ctx.t.architecture;
  const first = a.nodes[architectureChain[0]];
  const body = `
  <figure class="story" aria-labelledby="story-cap">
    <figcaption id="story-cap" class="fig-label">${esc(a.storyLabel)}</figcaption>
    <ol class="story-list">${a.story.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
  </figure>
  <div class="explorer" data-diagram data-explorer>
    <ol class="explorer-chain">${architectureChain.map((k, i) => {
      const n = a.nodes[k];
      return `<li><button type="button" class="explorer-node" data-node data-title="${esc(n.label)}" data-desc="${esc(n.d)}" aria-pressed="${i === 0}"><span class="explorer-n">${String(i + 1).padStart(2, '0')}</span>${esc(n.label)}</button></li>`;
    }).join('')}</ol>
    <div class="explorer-detail diagram-detail" aria-live="polite">
      <p class="diagram-hint" data-detail-hint hidden></p>
      <p class="diagram-detail-title" data-detail-title>${esc(first.label)}</p>
      <p class="diagram-detail-body" data-detail-body>${esc(first.d)}</p>
    </div>
  </div>`;
  return section({ id: 'architecture', title: a.title, intro: a.intro, body, cls: 'section--alt' });
}
