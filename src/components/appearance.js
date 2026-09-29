import { esc } from '../lib/html.js';
import { icon } from '../lib/icons.js';
import { accents } from '../config/content.js';

/** Visitor-controlled appearance panel. Settings live in this browser only. */
export function renderAppearance(ctx) {
  const a = ctx.t.appearance;
  const seg = (name, opts) => opts.map(([v, label]) => `
      <label class="seg-opt"><input type="radio" name="${name}" value="${v}"><span>${esc(label)}</span></label>`).join('');
  return `<dialog class="appearance" id="appearance" aria-labelledby="appearance-title" data-appearance>
  <form method="dialog" class="appearance-form">
    <div class="appearance-head">
      <h2 id="appearance-title">${esc(a.title)}</h2>
      <button type="submit" class="icon-btn" value="close" aria-label="${esc(a.close)}">${icon('close')}</button>
    </div>
    <fieldset>
      <legend>${esc(a.mode)}</legend>
      <div class="seg">${seg('mode', [['light', a.light], ['dark', a.dark], ['system', a.system]])}</div>
    </fieldset>
    <fieldset>
      <legend>${esc(a.accent)}</legend>
      <div class="swatches">${accents.map((c) => `
        <label class="swatch" data-swatch="${c}" title="${esc(a.accents[c])}"><input type="radio" name="accent" value="${c}"><span class="swatch-dot" aria-hidden="true"></span><span class="swatch-name">${esc(a.accents[c])}</span></label>`).join('')}
      </div>
    </fieldset>
    <fieldset>
      <legend>${esc(a.density)}</legend>
      <div class="seg">${seg('density', [['comfortable', a.comfortable], ['compact', a.compact]])}</div>
    </fieldset>
    <p class="appearance-note">${esc(a.note)}</p>
    <button type="submit" class="btn btn-primary appearance-done" value="close">${esc(a.close)}</button>
  </form>
</dialog>`;
}
