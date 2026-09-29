/* Kevin Digital Developers — progressive enhancement. Everything works
   without this script except the interactive extras. */
import { composeMessage, buildWhatsAppUrl, buildMailto, submitExternal } from './services/contact.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const root = document.documentElement;
const runtime = (() => { try { return JSON.parse($('#kdd-runtime').textContent); } catch { return {}; } })();
const store = {
  get(k) { try { return localStorage.getItem(`kdd-${k}`); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(`kdd-${k}`, v); } catch { /* private mode */ } },
};

/* ---------- Appearance ---------- */
const mq = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const mode = root.dataset.mode || 'light';
  const dark = mode === 'dark' || (mode === 'system' && mq.matches);
  root.dataset.theme = dark ? 'dark' : 'light';
  const meta = $$('meta[name="theme-color"]');
  meta.forEach((m) => m.setAttribute('content', dark ? '#0A1420' : '#F4F7FA'));
}
function setPref(name, value) {
  root.dataset[name] = value;
  store.set(name, value);
  if (name === 'mode') applyTheme();
}
mq.addEventListener?.('change', () => { if (root.dataset.mode === 'system') applyTheme(); });
applyTheme();

const dialog = $('[data-appearance]');
let lastOpener = null;
function syncRadios() {
  ['mode', 'accent', 'density'].forEach((n) => {
    const r = dialog && $(`input[name="${n}"][value="${root.dataset[n]}"]`, dialog);
    if (r) r.checked = true;
  });
}
if (dialog) {
  syncRadios();
  $$('[data-appearance-open]').forEach((b) => b.addEventListener('click', () => {
    lastOpener = b; syncRadios();
    closeMenu();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }));
  dialog.addEventListener('change', (e) => { const i = e.target; if (i.name) setPref(i.name, i.value); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // backdrop
  dialog.addEventListener('close', () => lastOpener?.focus());
  // Keep keyboard focus inside the open panel
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = $$('button, input:checked, [href]', dialog).filter((el) => !el.disabled);
    const first = f[0]; const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ---------- Language: remember choice, keep the section hash ---------- */
if (runtime.lang) store.set('lang', runtime.lang);
$$('[data-lang]').forEach((a) => a.addEventListener('click', () => {
  store.set('lang', a.dataset.lang);
  if (location.hash) a.href = a.href.split('#')[0] + location.hash;
}));

/* ---------- Mobile menu ---------- */
const menuBtn = $('[data-menu-toggle]');
const nav = $('[data-nav]');
function closeMenu() {
  if (!menuBtn || menuBtn.getAttribute('aria-expanded') !== 'true') return;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', menuBtn.dataset.labelOpen);
  document.body.classList.remove('menu-open');
}
menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? menuBtn.dataset.labelClose : menuBtn.dataset.labelOpen);
  document.body.classList.toggle('menu-open', open);
  if (open) $('a, button', nav)?.focus();
});
nav?.addEventListener('click', (e) => { if (e.target.closest('a')) { closeMenu(); closeMega(); } });

/* ---------- Services mega menu ---------- */
const megaBtn = $('[data-mega-toggle]');
const mega = $('[data-mega]');
function closeMega(focus) {
  if (megaBtn?.getAttribute('aria-expanded') === 'true') {
    megaBtn.setAttribute('aria-expanded', 'false');
    if (focus) megaBtn.focus();
  }
}
megaBtn?.addEventListener('click', () => {
  megaBtn.setAttribute('aria-expanded', String(megaBtn.getAttribute('aria-expanded') !== 'true'));
});
document.addEventListener('click', (e) => { if (mega && !e.target.closest('.has-mega')) closeMega(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (megaBtn?.getAttribute('aria-expanded') === 'true') closeMega(true);
  else if (menuBtn?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuBtn.focus(); }
});
mega?.addEventListener('focusout', (e) => {
  if (!e.relatedTarget || !e.target.closest('.has-mega').contains(e.relatedTarget)) closeMega();
});

/* Header shadow once scrolled */
const header = $('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---------- Interactive diagrams ---------- */
$$('[data-diagram]').forEach((fig) => {
  const nodes = $$('[data-node]', fig);
  const hint = $('[data-detail-hint]', fig);
  const title = $('[data-detail-title]', fig);
  const body = $('[data-detail-body]', fig);
  nodes.forEach((n) => n.addEventListener('click', () => {
    nodes.forEach((o) => o.setAttribute('aria-pressed', String(o === n)));
    if (hint) hint.hidden = true;
    title.hidden = false; body.hidden = false;
    title.textContent = n.dataset.title;
    body.textContent = n.dataset.desc;
  }));
  if (fig.hasAttribute('data-explorer')) {
    // Arrow keys move along the chain
    fig.addEventListener('keydown', (e) => {
      const i = nodes.indexOf(document.activeElement);
      if (i < 0) return;
      const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const next = nodes[(i + dir + nodes.length) % nodes.length];
      next.focus(); next.click();
    });
  }
});

/* ---------- Problem finder (ARIA tabs) ---------- */
$$('[data-tabs]').forEach((box) => {
  box.classList.add('is-tabbed');
  const tabs = $$('[role="tab"]', box);
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  const select = (i, focus) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const map = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      select((map[e.key] + tabs.length) % tabs.length, true);
    });
  });
  select(0);
});

/* ---------- Technology map filter ---------- */
$$('[data-tech]').forEach((box) => {
  const bar = $('[data-tech-filter]', box);
  const groups = $$('[data-group]', box);
  if (!bar) return;
  bar.hidden = false;
  const chips = $$('[data-filter]', bar);
  chips.forEach((c) => c.addEventListener('click', () => {
    const f = c.dataset.filter;
    chips.forEach((o) => o.setAttribute('aria-pressed', String(o === c)));
    box.classList.toggle('is-filtered', f !== 'all');
    groups.forEach((g) => g.classList.toggle('is-active', f === 'all' || g.dataset.group === f));
  }));
});

/* ---------- Enquiry form ---------- */
const form = $('[data-enquiry]');
if (form) {
  const status = $('[data-form-status]', form);
  const d = form.dataset;
  let via = 'whatsapp';
  $$('[data-send]', form).forEach((b) => b.addEventListener('click', () => { via = b.dataset.send; }));
  const check = (input) => {
    const err = document.getElementById(input.getAttribute('aria-describedby'));
    const bad = !input.value.trim();
    input.setAttribute('aria-invalid', String(bad));
    if (err) err.hidden = !bad;
    return !bad;
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.elements.name; const msg = form.elements.message;
    const ok = [check(name), check(msg)];
    if (ok.includes(false)) { (ok[0] ? msg : name).focus(); return; }
    const values = { name: name.value.trim(), company: form.elements.company.value.trim(), interest: form.elements.interest.value, message: msg.value.trim() };
    const text = composeMessage({
      greeting: d.greeting,
      fields: [[d.lName, values.name], [d.lCompany, values.company], [d.lInterest, values.interest]],
    }) + `\n\n${values.message}`;
    if (via === 'whatsapp' && runtime.whatsapp) {
      window.open(buildWhatsAppUrl(runtime.whatsapp, text), '_blank', 'noopener');
    } else if (via === 'email' && runtime.email) {
      window.location.href = buildMailto(runtime.email, `${d.subject} — ${values.name}`, text);
    } else if (via === 'external' && runtime.formEndpoint) {
      status.textContent = d.msgSending;
      try {
        const sent = await submitExternal(runtime.formEndpoint, { ...values, lang: runtime.lang, source: location.href });
        status.textContent = sent ? d.msgSuccess : d.msgFailure;
        if (sent) form.reset();
      } catch { status.textContent = d.msgFailure; }
    }
  });
  ['name', 'message'].forEach((n) => form.elements[n].addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') check(e.target); }));
}
