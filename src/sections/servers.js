import { esc, section } from '../lib/html.js';
import { diagram } from '../components/tree.js';
import { proxmoxTree } from '../config/content.js';

export function servers(ctx) {
  const s = ctx.t.servers;
  const body = `
  <div class="two-col two-col--wide-right">
    <div>
      <h3 class="sub-title">${esc(s.workTitle)}</h3>
      <ol class="work-list">${s.work.map((w) => `<li>${esc(w)}</li>`).join('')}</ol>
      <p class="note">${esc(s.vendorsNote)}</p>
    </div>
    <div>
      <h3 class="sub-title" id="proxmox">${esc(s.proxmoxTitle)}</h3>
      <p>${esc(s.proxmoxBody)}</p>
      ${diagram({ id: 'proxmox-diagram', tree: proxmoxTree, labels: s.nodes, hint: s.hint, ariaLabel: `${ctx.t.a11y.diagram}: ${s.proxmoxTitle}`, cls: 'diagram--compact' })}
    </div>
  </div>`;
  return section({ id: 'servers', title: s.title, intro: s.intro, body, cls: 'section--alt' });
}
