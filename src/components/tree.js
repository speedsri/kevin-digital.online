import { esc } from '../lib/html.js';

/**
 * Renders a hierarchical diagram as nested lists. Desktop shows a
 * top-down tree with connectors; small screens show an indented outline.
 * Each node is a button; the selected node's explanation appears in the
 * figure's detail panel (see scripts/app.js → diagrams).
 */
function node(n, labels, depth) {
  const l = labels[n.key] || { label: n.key };
  const inner = `<span class="node-label">${esc(l.label)}</span>`;
  const el = l.d
    ? `<button type="button" class="node" data-node data-title="${esc(l.label)}" data-desc="${esc(l.d)}" aria-pressed="false">${inner}</button>`
    : `<span class="node">${inner}</span>`;
  const kids = n.children?.length ? `<ul>${n.children.map((c) => `<li>${node(c, labels, depth + 1)}</li>`).join('')}</ul>` : '';
  return `${el}${kids}`;
}

export function diagram({ id, tree, labels, hint, ariaLabel, cls = '' }) {
  return `<figure class="diagram ${cls}" data-diagram id="${id}" aria-label="${esc(ariaLabel)}">
  <div class="diagram-canvas"><ul class="tree"><li>${node(tree, labels, 0)}</li></ul></div>
  <figcaption class="diagram-detail" aria-live="polite">
    <p class="diagram-hint" data-detail-hint>${esc(hint)}</p>
    <p class="diagram-detail-title" data-detail-title hidden></p>
    <p class="diagram-detail-body" data-detail-body hidden></p>
  </figcaption>
</figure>`;
}
