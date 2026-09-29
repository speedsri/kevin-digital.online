import { esc, waHref } from '../lib/html.js';
import { icon } from '../lib/icons.js';
import { heroLayers } from '../config/content.js';

const KEY = { web: 'WEB', crm: 'CRM', database: 'DATABASE', server: 'SERVER', network: 'NETWORK', cloud: 'CLOUD', whatsapp: 'WHATSAPP', ai: 'AI' };

export function hero(ctx) {
  const { t, config } = ctx;
  const h = t.hero;
  const layers = heroLayers.map((k, i) => `
        <li class="stack-layer" style="--i:${i}">
          <span class="stack-node" aria-hidden="true"></span>
          <span class="stack-key">${KEY[k]}</span>
          <span class="stack-desc">${esc(h.layers[k])}</span>
          <span class="stack-leds" aria-hidden="true"><i></i><i></i><i></i></span>
        </li>`).join('');
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="hero-tagline">${esc(h.tagline)}</p>
      <h1 id="hero-title" class="hero-title">${esc(h.title)}</h1>
      <p class="hero-lead">${esc(h.lead)}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary btn-lg" href="#capabilities">${esc(h.cta1)}</a>
        <a class="btn btn-secondary btn-lg" href="#contact">${esc(h.cta2)}</a>
        ${config.contact.whatsapp ? `<a class="btn btn-ghost btn-lg" href="${waHref(config.contact.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(h.cta3)}<span class="sr-only"> ${esc(t.a11y.newTab)}</span></a>` : ''}
      </div>
    </div>
    <figure class="stack" aria-labelledby="stack-caption">
      <figcaption id="stack-caption" class="stack-caption">${esc(h.stackLabel)}</figcaption>
      <div class="stack-frame">
        <span class="stack-rail" aria-hidden="true"><span class="stack-pulse"></span></span>
        <ol class="stack-list">${layers}
        </ol>
      </div>
    </figure>
  </div>
</section>`;
}
