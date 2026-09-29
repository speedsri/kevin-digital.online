import { esc, telHref, waHref, phoneText } from '../lib/html.js';
import { icon, brandMark } from '../lib/icons.js';
import { langSwitch } from './langswitch.js';

const isFilled = (v) => v && !/^\[.*\]$/.test(v.trim());

export function renderFooter(ctx) {
  const { t, lang, root, home, config } = ctx;
  const f = t.footer; const n = t.nav; const c = config.contact;
  const social = { ...config.social, whatsapp: config.social.whatsapp || (c.whatsapp ? waHref(c.whatsapp) : '') };
  const socials = Object.entries(social).filter(([, url]) => url);
  const reg = config.registration;
  const year = new Date().getFullYear();
  const ext = `<span class="sr-only"> ${esc(t.a11y.newTab)}</span>`;

  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${root}${lang}/" aria-label="${esc(t.a11y.home)}">${brandMark()}<span class="brand-text"><span class="brand-name">Kevin Digital</span><span class="brand-sub">Developers</span></span></a>
      <p class="footer-tagline">${esc(config.company.tagline)}</p>
      <p class="footer-loc">${esc(config.company.location)}</p>
      <p class="footer-brandline">${esc(f.brandLine)}</p>
    </div>
    <nav class="footer-col" aria-label="${esc(t.a11y.footerNav)}">
      <h2 class="footer-h">${esc(f.navTitle)}</h2>
      <ul>
        <li><a href="${home}#about">${esc(n.about)}</a></li>
        <li><a href="${home}#capabilities">${esc(n.capabilities)}</a></li>
        <li><a href="${home}#whatsapp">${esc(n.whatsapp)}</a></li>
        <li><a href="${home}#ai">${esc(n.ai)}</a></li>
        <li><a href="${home}#technology">${esc(n.technology)}</a></li>
        <li><a href="${home}#industries">${esc(n.industries)}</a></li>
        <li><a href="${home}#process">${esc(n.process)}</a></li>
        <li><a href="${home}#faq">${esc(n.faq)}</a></li>
      </ul>
    </nav>
    <div class="footer-col">
      <h2 class="footer-h">${esc(f.servicesTitle)}</h2>
      <ul>${t.services.categories.map((s) => `<li><a href="${home}#services">${esc(s.title)}</a></li>`).join('')}</ul>
    </div>
    <div class="footer-col">
      <h2 class="footer-h">${esc(f.contactTitle)}</h2>
      <ul class="footer-contact">
        ${c.phones.map((p) => `<li>${icon('phone')}<a href="${telHref(p)}">${phoneText(p)}</a></li>`).join('')}
        ${c.whatsapp ? `<li>${icon('whatsapp')}<a href="${waHref(c.whatsapp)}" target="_blank" rel="noopener">${phoneText(c.whatsapp)}${ext}</a></li>` : ''}
        ${c.email ? `<li>${icon('mail')}<a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>` : ''}
        <li>${icon('pin')}<span>${esc(config.company.address.display)}</span></li>
      </ul>
      ${socials.length ? `<h2 class="footer-h footer-h--sub">${esc(f.followTitle)}</h2>
      <ul class="social">${socials.map(([k, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${k[0].toUpperCase() + k.slice(1)} ${esc(t.a11y.newTab)}">${icon(k)}</a></li>`).join('')}</ul>` : ''}
    </div>
    <div class="footer-col">
      <h2 class="footer-h">${esc(f.settingsTitle)}</h2>
      ${langSwitch(ctx, 'footer')}
      <button type="button" class="btn btn-ghost btn-sm footer-appearance" data-appearance-open aria-haspopup="dialog" aria-controls="appearance">${icon('contrast')}${esc(t.appearance.title)}</button>
      ${reg.show ? `<p class="footer-reg">${esc(t.registration.title)}<br><span>${esc(f.regShort)}: ${esc(reg.number)}</span></p>` : ''}
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${year} ${esc(config.company.name)}. ${esc(f.rights)}</p>
    <ul>
      <li><a href="${root}${lang}/privacy/">${esc(f.privacy)}</a></li>
      <li><a href="${root}${lang}/terms/">${esc(f.terms)}</a></li>
      <li><a href="${esc(config.platform.url)}" target="_blank" rel="noopener">${esc(f.platformLink)}${ext}</a></li>
    </ul>
  </div>
${c.whatsapp ? `<a class="wa-float" href="${waHref(c.whatsapp)}" target="_blank" rel="noopener" aria-label="${esc(t.a11y.whatsappFloat)} ${esc(t.a11y.newTab)}">${icon('whatsapp')}</a>` : ''}
</footer>`;
}

export { isFilled };
