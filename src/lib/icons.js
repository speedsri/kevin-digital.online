/** Inline SVG icon set (stroke icons, 24×24). Decorative by default. */
const P = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  contrast: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/>',
  phone: '<path d="M5 4h3.5l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5l1.5-2.5 5 2V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  whatsapp: '<path d="M4 20l1.2-3.8A8.2 8.2 0 1 1 8 18.8z"/><path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5l1 2.2-.7.9c.4.9 1.2 1.7 2.1 2.1l.9-.7 2.2 1v.5c0 .3-.1.6-.6.8-1 .5-2.6.2-4-1.1s-2.2-2.9-2.2-4z" fill="currentColor" stroke="none"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  doc: '<path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  facebook: '<path d="M14.5 3H13a3.5 3.5 0 0 0-3.5 3.5V9.5H7.5v3h2V21h3v-8.5h2.3l.5-3h-2.8V7a1 1 0 0 1 1-1h1.9z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5V17M8 7.3v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17"/>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="M10.2 9.4v5.2l4.4-2.6z" fill="currentColor"/>',
};
export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || ''}</svg>`;

/** Brand mark: a "K" drawn as a small network graph. Follows the accent colour. */
export const brandMark = (cls = 'brand-mark') => `<svg class="${cls}" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
  <rect width="32" height="32" rx="8" fill="var(--accent)"/>
  <g stroke="var(--on-accent)" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M11 8v16M11 16l10-8M11 16l10 8"/></g>
  <g fill="var(--on-accent)"><circle cx="11" cy="16" r="2.7"/><circle cx="21" cy="8" r="2.4"/><circle cx="21" cy="24" r="2.4"/></g>
</svg>`;
