import { esc, section } from '../lib/html.js';
import { diagram } from '../components/tree.js';
import { networkTree } from '../config/content.js';

export function networking(ctx) {
  const n = ctx.t.networking;
  const body = `
  ${diagram({ id: 'network-diagram', tree: networkTree, labels: n.nodes, hint: n.hint, ariaLabel: `${ctx.t.a11y.diagram}: ${n.title}`, cls: 'diagram--wide' })}
  <div class="three-col">
    <article>
      <h3 class="sub-title">${esc(n.multiTitle)}</h3>
      <p>${esc(n.multiBody)}</p>
      <p class="note">${esc(n.multiNote)}</p>
    </article>
    <article>
      <h3 class="sub-title">${esc(n.remoteTitle)}</h3>
      <p>${esc(n.remoteBody)}</p>
      <ul class="check-list check-list--tight">${n.remoteUses.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
    </article>
    <article id="security">
      <h3 class="sub-title">${esc(n.securityTitle)}</h3>
      <p>${esc(n.securityBody)}</p>
    </article>
  </div>`;
  return section({ id: 'networking', title: n.title, intro: n.intro, body });
}
