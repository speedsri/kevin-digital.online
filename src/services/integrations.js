/**
 * Future integration points (not used by the current website).
 *
 *   Corporate website ── WhatsApp platform API
 *                     ├─ CRM API
 *                     ├─ External contact form   (see contact.js)
 *                     ├─ Analytics
 *                     └─ AI service
 *
 * Rules for anything added here:
 *  - Call only PUBLIC endpoints designed for browsers (CORS, rate limits).
 *  - Never embed tokens, API keys or credentials. Authentication and
 *    secrets belong on the server behind the endpoint.
 *  - Never connect to the production MySQL database from the browser.
 *  - Update the privacy policy before enabling anything that sends data.
 */

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

/** Example: public status endpoint of the WhatsApp platform, if one is added. */
export async function fetchPlatformStatus(baseUrl) {
  if (!baseUrl) return null;
  return getJson(`${baseUrl.replace(/\/$/, '')}/status`);
}

/** Example: ask a public, server-protected AI endpoint a question. */
export async function askAiService(endpoint, question) {
  if (!endpoint) return null;
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question }) });
  if (!res.ok) throw new Error(`AI service error: ${res.status}`);
  return res.json();
}

/** Analytics is disabled by default. Load a provider here only after consent/policy update. */
export function initAnalytics(cfg) {
  if (!cfg || !cfg.enabled) return false;
  return false; // intentionally not implemented
}
