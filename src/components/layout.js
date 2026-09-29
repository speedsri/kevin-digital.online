import { renderHead } from './head.js';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { renderAppearance } from './appearance.js';
import { digits } from '../lib/html.js';

/** Full HTML document for one page in one language. */
export function layout(ctx, { title, description, main, jsonLd, bodyClass = '' }) {
  const { lang, config, root, assets } = ctx;
  // Public, non-secret runtime config for the browser scripts.
  const runtime = {
    lang,
    whatsapp: digits(config.contact.whatsapp),
    email: config.contact.email,
    formEndpoint: config.contact.externalFormEndpoint,
    storagePrefix: 'kdd-',
  };
  return `<!doctype html>
<html lang="${lang}" dir="ltr">
<head>
${renderHead(ctx, { title, description, jsonLd })}
</head>
<body class="${bodyClass}">
${renderHeader(ctx)}
<main id="main" tabindex="-1">
${main}
</main>
${renderFooter(ctx)}
${renderAppearance(ctx)}
<script type="application/json" id="kdd-runtime">${JSON.stringify(runtime)}</script>
<script type="module" src="${root}${assets.js}"></script>
</body>
</html>`;
}
