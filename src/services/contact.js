/**
 * Contact service adapter.
 * The website has no backend. These functions only build links that hand
 * the visitor's message to WhatsApp or their email app, or — if an
 * external form endpoint is configured — POST it to that third-party
 * service. No secrets belong here: anything in this file is public.
 */

/** Compose a readable plain-text enquiry. */
export function composeMessage({ greeting, fields }) {
  const lines = [greeting, ''];
  for (const [label, value] of fields) if (value) lines.push(`${label}: ${value}`);
  return lines.join('\n');
}

/** wa.me link with prefilled text. `number` must be digits only. */
export function buildWhatsAppUrl(number, text) {
  return `https://wa.me/${String(number).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

/** mailto: link with subject and body. */
export function buildMailto(email, subject, body) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Send to an external form service (e.g. Formspree) that accepts JSON.
 * Resolves true only when the service confirms with a 2xx response.
 */
export async function submitExternal(endpoint, payload) {
  if (!endpoint) throw new Error('No external form endpoint configured');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
