const LABELS = { en: ['EN', 'English'], si: ['සිං', 'සිංහල'], ta: ['தமிழ்', 'தமிழ்'] };

export function langSwitch(ctx, where = 'header') {
  const { langs, lang, root, pagePath, t } = ctx;
  return `<div class="lang-switch lang-switch--${where}" role="group" aria-label="${t.a11y.language}">${langs
    .map((l) => `<a href="${root}${l}/${pagePath}" hreflang="${l}" lang="${l}" data-lang="${l}" aria-label="${LABELS[l][1]}"${l === lang ? ' aria-current="true"' : ''}>${LABELS[l][0]}</a>`)
    .join('<span class="lang-sep" aria-hidden="true"></span>')}</div>`;
}
