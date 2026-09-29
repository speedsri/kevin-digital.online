/** Tiny helpers for building HTML strings at build time. */
export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const digits = (s = '') => String(s).replace(/[^\d]/g, '');
/** Phone number for display: keeps the number on one line. */
export const phoneText = (s = '') => esc(s).replace(/ /g, '&nbsp;');
export const telHref = (s) => `tel:+${digits(s)}`;
export const waHref = (s, text = '') => `https://wa.me/${digits(s)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** Standard section wrapper: heading block + body. */
export function section({ id, title, intro = '', body, cls = '', layout = 'stack' }) {
  return `
<section id="${id}" class="section section--${layout} ${cls}" aria-labelledby="${id}-title">
  <div class="container">
    <header class="section-head">
      <h2 id="${id}-title" class="section-title">${esc(title)}</h2>
      ${intro ? `<p class="section-intro">${esc(intro)}</p>` : ''}
    </header>
    <div class="section-body">${body}</div>
  </div>
</section>`;
}

export const list = (items, cls = '') => `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
