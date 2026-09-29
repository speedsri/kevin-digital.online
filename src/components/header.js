import { esc } from '../lib/html.js';
import { icon, brandMark } from '../lib/icons.js';
import { langSwitch } from './langswitch.js';

const MEGA_TARGET = { software: 'software', infrastructure: 'servers', networking: 'networking', communication: 'whatsapp', ai: 'ai' };

export function renderHeader(ctx) {
  const { t, lang, root, home, config } = ctx;
  const n = t.nav;
  const logo = config.branding.logo
    ? `<img src="${root}${config.branding.logo}" alt="" width="32" height="32" class="brand-mark">`
    : brandMark();
  const mega = Object.entries(t.mega.groups).map(([k, g]) => `
        <div class="mega-col">
          <a class="mega-title" href="${home}#${MEGA_TARGET[k]}">${esc(g.title)}</a>
          <ul>${g.items.map((i) => `<li><a href="${home}#${MEGA_TARGET[k]}">${esc(i)}</a></li>`).join('')}</ul>
        </div>`).join('');

  return `<a class="skip-link" href="#main">${esc(t.a11y.skip)}</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="${root}${lang}/" aria-label="${esc(t.a11y.home)}">
      ${logo}
      <span class="brand-text"><span class="brand-name">Kevin Digital</span><span class="brand-sub">Developers</span></span>
    </a>
    <nav class="primary-nav" id="primary-nav" aria-label="${esc(t.a11y.mainNav)}" data-nav>
      <ul class="nav-list">
        <li><a href="${home}#about">${esc(n.about)}</a></li>
        <li class="has-mega">
          <button type="button" class="nav-trigger" aria-expanded="false" aria-controls="mega-services" data-mega-toggle>${esc(n.services)}${icon('chevron', 'icon icon-chevron')}</button>
          <div class="mega" id="mega-services" data-mega>
            <div class="mega-grid">${mega}</div>
            <div class="mega-foot">
              <a href="${home}#capabilities">${esc(t.mega.overview)}</a>
              <a href="${home}#services">${esc(t.mega.all)}</a>
              <a href="${home}#industries">${esc(n.industries)}</a>
              <a href="${home}#process">${esc(n.process)}</a>
            </div>
          </div>
        </li>
        <li><a href="${home}#whatsapp">${esc(n.whatsapp)}</a></li>
        <li><a href="${home}#ai">${esc(n.ai)}</a></li>
        <li><a href="${home}#technology">${esc(n.technology)}</a></li>
        <li class="nav-cta"><a class="btn btn-primary btn-sm" href="${home}#contact">${esc(n.contact)}</a></li>
      </ul>
      <div class="nav-drawer-extras">${langSwitch(ctx, 'drawer')}</div>
    </nav>
    <div class="header-tools">
      ${langSwitch(ctx, 'header')}
      <button type="button" class="icon-btn" data-appearance-open aria-haspopup="dialog" aria-controls="appearance" aria-label="${esc(t.a11y.appearance)}" title="${esc(t.appearance.title)}">${icon('contrast')}</button>
      <button type="button" class="icon-btn menu-btn" data-menu-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="${esc(t.a11y.openMenu)}" data-label-open="${esc(t.a11y.openMenu)}" data-label-close="${esc(t.a11y.closeMenu)}">${icon('menu', 'icon icon-open')}${icon('close', 'icon icon-close')}</button>
    </div>
  </div>
</header>`;
}
