import { esc, section, telHref, waHref, phoneText } from '../lib/html.js';
import { icon } from '../lib/icons.js';

export function contact(ctx) {
  const { t, config } = ctx;
  const c = t.contact; const cc = config.contact;
  const ext = `<span class="sr-only"> ${esc(t.a11y.newTab)}</span>`;
  const hasEmail = !!cc.email; const hasForm = !!cc.externalFormEndpoint;
  const body = `<div class="contact-grid">
    <div class="contact-details">
      ${cc.whatsapp ? `<a class="btn btn-primary btn-lg contact-wa" href="${waHref(cc.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(c.chat)}${ext}</a>` : ''}
      <dl class="contact-list">
        ${cc.whatsapp ? `<div><dt>${icon('whatsapp')}${esc(c.whatsapp)}</dt><dd><a href="${waHref(cc.whatsapp)}" target="_blank" rel="noopener">${phoneText(cc.whatsapp)}${ext}</a></dd></div>` : ''}
        <div><dt>${icon('phone')}${esc(c.phone)}</dt><dd>${cc.phones.map((p) => `<a href="${telHref(p)}">${phoneText(p)}</a>`).join('<br>')}</dd></div>
        <div><dt>${icon('mail')}${esc(c.email)}</dt><dd>${hasEmail ? `<a href="mailto:${esc(cc.email)}">${esc(cc.email)}</a>` : `<span class="muted">${esc(c.emailPending)}</span>`}</dd></div>
        <div><dt>${icon('pin')}${esc(c.address)}</dt><dd>${esc(config.company.address.display)}</dd></div>
      </dl>
    </div>
    <form class="enquiry" id="enquiry" novalidate data-enquiry
      data-greeting="${esc(c.greeting)}" data-subject="${esc(c.emailSubject)}"
      data-l-name="${esc(c.name)}" data-l-company="${esc(c.company)}" data-l-interest="${esc(c.interest)}"
      data-msg-sending="${esc(c.sending)}" data-msg-success="${esc(c.success)}" data-msg-failure="${esc(c.failure)}">
      <h3 class="sub-title">${esc(c.formTitle)}</h3>
      <div class="field-row">
        <div class="field"><label for="f-name">${esc(c.name)}</label><input type="text" id="f-name" name="name" autocomplete="name" required aria-describedby="f-name-err"><p class="field-error" id="f-name-err" hidden>${esc(c.nameRequired)}</p></div>
        <div class="field"><label for="f-company">${esc(c.company)}</label><input type="text" id="f-company" name="company" autocomplete="organization"></div>
      </div>
      <div class="field"><label for="f-interest">${esc(c.interest)}</label>
        <select id="f-interest" name="interest"><option value="">${esc(c.interestAny)}</option>${t.services.categories.map((s) => `<option>${esc(s.title)}</option>`).join('')}</select></div>
      <div class="field"><label for="f-message">${esc(c.message)}</label><textarea id="f-message" name="message" rows="5" required aria-describedby="f-message-err"></textarea><p class="field-error" id="f-message-err" hidden>${esc(c.messageRequired)}</p></div>
      <div class="form-actions">
        ${cc.whatsapp ? `<button type="submit" class="btn btn-primary" data-send="whatsapp">${icon('whatsapp')}${esc(c.sendWa)}</button>` : ''}
        ${hasEmail ? `<button type="submit" class="btn btn-secondary" data-send="email">${icon('mail')}${esc(c.sendEmail)}</button>` : ''}
        ${hasForm ? `<button type="submit" class="btn btn-secondary" data-send="external">${esc(c.sendForm)}</button>` : ''}
      </div>
      <p class="form-note">${esc(hasForm ? c.formNoteExternal : c.formNote)}</p>
      <p class="form-status" role="status" data-form-status></p>
    </form>
  </div>`;
  return section({ id: 'contact', title: c.title, intro: c.intro, body, cls: 'section--contact' });
}
