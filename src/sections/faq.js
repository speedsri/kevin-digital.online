import { esc, section } from '../lib/html.js';

export function faq(ctx) {
  const f = ctx.t.faq;
  const body = `<div class="faq-list">${f.items.map((i) => `
    <details class="faq-item"><summary><h3 class="faq-q">${esc(i.q)}</h3><span class="register-toggle" aria-hidden="true"></span></summary><div class="faq-a"><p>${esc(i.a)}</p></div></details>`).join('')}
  </div>`;
  return section({ id: 'faq', title: f.title, body, cls: 'section--alt' });
}

export function faqJsonLd(ctx) {
  return {
    '@type': 'FAQPage',
    mainEntity: ctx.t.faq.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}
