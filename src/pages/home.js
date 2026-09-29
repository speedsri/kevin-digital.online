import { layout } from '../components/layout.js';
import { hero } from '../sections/hero.js';
import { capabilities, services } from '../sections/capabilities.js';
import { about } from '../sections/about.js';
import { problems } from '../sections/problems.js';
import { software } from '../sections/software.js';
import { servers } from '../sections/servers.js';
import { networking } from '../sections/networking.js';
import { whatsapp } from '../sections/whatsapp.js';
import { ai } from '../sections/ai.js';
import { automation } from '../sections/automation.js';
import { architecture } from '../sections/architecture.js';
import { technology } from '../sections/technology.js';
import { industries } from '../sections/industries.js';
import { process } from '../sections/process.js';
import { faq, faqJsonLd } from '../sections/faq.js';
import { registration } from '../sections/registration.js';
import { contact } from '../sections/contact.js';
import { digits, waHref } from '../lib/html.js';

function jsonLd(ctx) {
  const { config, t, siteUrl, lang } = ctx;
  const c = config.company;
  const social = Object.values(config.social).filter(Boolean);
  const org = {
    '@type': 'ProfessionalService',
    '@id': siteUrl ? `${siteUrl}/#organization` : undefined,
    name: c.name,
    slogan: c.tagline,
    description: t.hero.answer,
    url: siteUrl ? `${siteUrl}/${lang}/` : undefined,
    image: siteUrl ? `${siteUrl}/${config.branding.ogImage}` : undefined,
    telephone: config.contact.phones[0] ? `+${digits(config.contact.phones[0])}` : undefined,
    email: config.contact.email || undefined,
    address: { '@type': 'PostalAddress', streetAddress: c.address.street, addressLocality: c.address.locality, addressCountry: c.address.country },
    areaServed: { '@type': 'Country', name: 'Sri Lanka' },
    sameAs: social.length ? social : undefined,
    contactPoint: config.contact.whatsapp ? [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: `+${digits(config.contact.whatsapp)}`, url: waHref(config.contact.whatsapp), availableLanguage: ['en', 'si', 'ta'] }] : undefined,
    knowsAbout: ['Website development', 'CRM development', 'Server configuration', 'Proxmox', 'VPN', 'WireGuard', 'Tailscale', 'WhatsApp Business API', 'Retrieval-augmented generation'],
  };
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [org, faqJsonLd(ctx)] }).replace(/</g, '\\u003c');
}

export function homePage(ctx) {
  const main = [hero, capabilities, services, about, problems, software, servers, networking, whatsapp, ai, automation, architecture, technology, industries, process, faq, registration, contact]
    .map((s) => s(ctx)).join('\n');
  return layout(ctx, { title: ctx.t.meta.title, description: ctx.t.meta.description, main, jsonLd: jsonLd(ctx), bodyClass: 'page-home' });
}
