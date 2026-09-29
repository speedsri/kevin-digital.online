import { esc, section } from '../lib/html.js';
import { diagram } from '../components/tree.js';
import { whatsappTree } from '../config/content.js';

export function whatsapp(ctx) {
  const w = ctx.t.whatsapp;
  const { config, t } = ctx;
  const body = `
  <blockquote class="principle"><p>${esc(w.principle)}</p><footer>${esc(config.platform.name)}</footer></blockquote>
  <div class="two-col two-col--wide-right wa-top">
    <div class="feature-stack">
      ${w.features.map((f, i) => `<article class="feature${i === 1 ? ' feature--key' : ''}"><h3 class="sub-title">${esc(f.t)}</h3><p>${esc(f.d)}</p></article>`).join('')}
    </div>
    ${diagram({ id: 'whatsapp-diagram', tree: whatsappTree, labels: w.nodes, hint: w.hint, ariaLabel: `${t.a11y.diagram}: ${w.title}`, cls: 'diagram--compact' })}
  </div>

  <div class="audit" id="audit">
    <div>
      <h3 class="sub-title">${esc(w.auditTitle)}</h3>
      <p>${esc(w.auditIntro)}</p>
      <ul class="tag-list">${w.auditFields.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    </div>
    <figure class="timeline-fig" aria-labelledby="audit-cap">
      <figcaption id="audit-cap" class="fig-label">${esc(w.timelineLabel)}</figcaption>
      <ol class="timeline">${w.timeline.map((e, i) => `
        <li class="timeline-item" style="--i:${i}"><time class="timeline-time">${esc(e.time)}</time><span class="timeline-e">${esc(e.e)}</span><span class="timeline-m">${esc(e.m)}</span></li>`).join('')}
      </ol>
      <p class="note">${esc(w.timelineNote)}</p>
    </figure>
  </div>

  <div class="three-col wa-bottom">
    <article id="mattermost">
      <h3 class="sub-title">${esc(w.mmTitle)}</h3>
      <ol class="chain">${w.mmChain.map((c) => `<li>${esc(c)}</li>`).join('')}</ol>
      <p>${esc(w.mmBody)}</p>
      <ul class="check-list check-list--tight">${w.mmBenefits.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    </article>
    <article id="reporting">
      <h3 class="sub-title">${esc(w.reportTitle)}</h3>
      <p>${esc(w.reportBody)}</p>
      <dl class="def-list">${w.reports.map((r) => `<div><dt>${esc(r.t)}</dt><dd>${esc(r.d)}</dd></div>`).join('')}</dl>
    </article>
    <article>
      <h3 class="sub-title">${esc(w.schemaTitle)}</h3>
      <dl class="def-list def-list--mono">${w.schema.map((r) => `<div><dt>${esc(r.t)}</dt><dd>${esc(r.d)}</dd></div>`).join('')}</dl>
      <h3 class="sub-title sub-title--sm">${esc(w.securityTitle)}</h3>
      <ul class="check-list check-list--tight">${w.security.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </article>
  </div>

  <div class="callout callout--accent">
    <div>
      <h3 class="sub-title">${esc(w.ctaTitle)}</h3>
      <p>${esc(w.ctaBody)}</p>
      <p class="note">${esc(w.separate)}</p>
    </div>
    <a class="btn btn-primary" href="${esc(config.platform.url)}" target="_blank" rel="noopener">${esc(w.ctaBtn)}<span class="sr-only"> ${esc(t.a11y.newTab)}</span></a>
  </div>`;
  return section({ id: 'whatsapp', title: w.title, intro: w.intro, body, cls: 'section--alt' });
}
