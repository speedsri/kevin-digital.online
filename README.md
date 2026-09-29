# Kevin Digital Developers — corporate website

A static corporate website for **Kevin Digital Developers**, Kurunegala, Sri Lanka.
It is available in English, Sinhala and Tamil and is built for GitHub Pages.

The live website contains only HTML, CSS, JavaScript and images. It has no server, database, login or form processing, and it contains no passwords, tokens or API keys.

The WhatsApp message platform (DT Platform4, https://kevin-digital.online/) is a separate system. This website only describes it and links to it.

---

## 1. Quick start

You need **Node.js 18 or newer** installed. Nothing else is installed: the build uses no npm packages.

```bash
npm run build     # writes the finished website to ./dist
npm run serve     # preview at http://localhost:8080
npm run dev       # build + preview
npm run check:i18n  # fails if a Sinhala/Tamil text is missing
```

Open `http://localhost:8080/`. The root page sends visitors to `/en/`, `/si/` or `/ta/`, based on their last choice or their browser language.

---

## 2. Publishing on GitHub Pages

### Option A — automatic (recommended)

1. Create a repository on GitHub, for example `kevin-digital-website`.
2. Upload **the whole project folder** (everything in this package except `dist/`). The `.github` folder must be included; it is hidden on macOS and Linux, so check it was uploaded.
   - With Git:
     ```bash
     git init
     git add .
     git commit -m "Website"
     git branch -M main
     git remote add origin https://github.com/<account>/<repository>.git
     git push -u origin main
     ```
   - Or in the browser: **Add file → Upload files**, then drag in the folder contents. If `.github/workflows/deploy.yml` does not appear, create it with **Add file → Create new file** and paste its contents.
3. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
4. Open the **Actions** tab. The workflow *Deploy to GitHub Pages* runs on every push to `main`, and can also be started by hand with **Run workflow**.
5. When it finishes, the address appears under **Settings → Pages**, for example `https://<account>.github.io/<repository>/`.

The workflow passes the real site address to the build. This means canonical links, hreflang tags, `sitemap.xml` and `robots.txt` are generated correctly without any editing.

### Option B — manual upload of the built files

Use this only if you cannot use GitHub Actions.

1. Build with the final address:
   ```bash
   SITE_URL=https://<account>.github.io/<repository> npm run build
   ```
   On Windows PowerShell:
   ```powershell
   $env:SITE_URL="https://..."; npm run build
   ```
2. Upload the **contents of `dist/`** (not the folder itself) to the root of a branch, for example `main`. Include the hidden `.nojekyll` file.
3. Go to **Settings → Pages → Source: Deploy from a branch** and choose that branch, folder `/ (root)`.
4. Repeat steps 1–2 after every change.

The package also contains `kdd-website-dist.zip`. It is a ready build made without a site address, so everything works, but it has no canonical links and no sitemap. Rebuild with `SITE_URL` for production.

### Custom domain (for example www.kevindevelopers.lk)

1. In `src/config/site.config.js`, set `site.customDomain: 'www.example.lk'`. The build then writes a `CNAME` file.
2. At your domain registrar, add a DNS record:
   - For `www`: a **CNAME** record pointing to `<account>.github.io`.
   - For the bare domain: **A** records to GitHub Pages' published IP addresses. See GitHub's documentation "Managing a custom domain for your GitHub Pages site".
3. In **Settings → Pages → Custom domain**, enter the same domain. Tick **Enforce HTTPS** once the certificate is ready.
4. Push the change. With Option A, the workflow picks up the new address automatically.

All links inside the site are relative. The same build works on a `github.io/<repository>/` project address and on a custom domain.

---

## 3. Editing content

| What to change | Where |
|---|---|
| Phone numbers, WhatsApp, email, address, registration details, social links, logo, external form service | `src/config/site.config.js` (the only file most edits need) |
| Any visible text | `src/translations/en/index.js`, `si/index.js`, `ta/index.js` |
| Technology names, diagram structure | `src/config/content.js` |
| Colours, spacing, layout | `src/styles/main.css` |

After editing, run `npm run build`, or just push to GitHub with Option A.

**Rules in `site.config.js`**

- Empty values (`''`) are hidden.
  - An empty social link is not shown.
  - An empty `email` hides every email option.
  - An empty `documentUrl` hides the "View registration document" button.
- Text in `[SQUARE BRACKETS]` is a placeholder. It is shown as written until you replace it.
- Never put secrets in this file. Everything in it is published.

**Registration document:** put the PDF in `public/docs/`, for example `public/docs/registration.pdf`. Then set `registration.documentUrl: 'docs/registration.pdf'`.

**Logo:** put the file in `public/images/` and set `branding.logo: 'images/logo.svg'`. With no logo, the built-in "K" network mark is used. It follows the visitor's accent colour.

**Online enquiry form (optional):** by default the enquiry form opens WhatsApp, or the visitor's email app, with the message filled in. Nothing is stored anywhere.

To also receive enquiries through a form service:
1. Set `contact.externalFormEndpoint` to its public URL. The service must accept a JSON `POST`, as Formspree and Getform do.
2. A **Send enquiry** button then appears.
3. Update the privacy policy text in the translations before enabling this.

**Translations:** every key in `en` must exist in `si` and `ta`. If one is missing, the build shows a warning and uses the English text, so a page never breaks. Technical terms such as WhatsApp, Proxmox, VPN and RAG are intentionally kept in English within Sinhala and Tamil sentences.

---

## 4. Project structure

```
.
├── .github/workflows/deploy.yml   GitHub Actions: build + publish to Pages
├── .gitignore                     Keeps dist/, node_modules/, .env out of Git
├── README.md                      This file
├── package.json                   npm scripts (no dependencies)
├── build.mjs                      Static site generator → dist/
├── tools/
│   ├── serve.mjs                  Local preview server (development only)
│   └── make-images.py             Optional: regenerates og-image / apple-touch-icon (Python + Pillow)
├── public/                        Copied as-is into the site
│   ├── favicon/favicon.svg        Browser tab icon
│   ├── favicon/apple-touch-icon.png  Home-screen icon (iOS/Android)
│   ├── images/og-image.png        Preview image for WhatsApp/Facebook/LinkedIn shares
│   ├── docs/                      Put the registration PDF here
│   └── icons/                     Spare folder for extra images
└── src/
    ├── config/
    │   ├── site.config.js         Company, contact, registration, social, branding, integrations
    │   └── content.js             Diagram structures, technology list, hero layers
    ├── translations/
    │   ├── en/index.js            English (source language)
    │   ├── si/index.js            Sinhala
    │   └── ta/index.js            Tamil
    ├── lib/
    │   ├── html.js                HTML escaping, section wrapper, phone/WhatsApp links
    │   └── icons.js               Inline SVG icons and brand mark
    ├── components/
    │   ├── layout.js              Full page document
    │   ├── head.js                <head>: SEO, Open Graph, hreflang, fonts, theme boot script
    │   ├── header.js              Header, main navigation, Services mega menu, mobile drawer
    │   ├── langswitch.js          EN | සිං | தமிழ் switch
    │   ├── appearance.js          Appearance panel (mode, accent, density)
    │   ├── tree.js                Interactive tree diagrams (network, Proxmox, WhatsApp)
    │   └── footer.js              Footer and floating WhatsApp button
    ├── sections/                  One file per home-page section
    │   ├── hero.js                Headline, calls to action, animated technology stack
    │   ├── capabilities.js        Capability map, growth path, 8 service areas
    │   ├── about.js               About the company, principles
    │   ├── problems.js            "What can we do for your business?" finder
    │   ├── software.js            Software layers, GitHub
    │   ├── servers.js             Servers, Proxmox diagram
    │   ├── networking.js          Network diagram, multi-office VPN, remote computers, security
    │   ├── whatsapp.js            WhatsApp platform: pipeline, Write First, audit trail, Mattermost, reports
    │   ├── ai.js                  AI knowledge base / RAG
    │   ├── automation.js          Automation examples
    │   ├── architecture.js        Business requirement → digital system (story + explorer)
    │   ├── technology.js          Technology map with filter, "See the technology" explainers
    │   ├── industries.js          Sectors (not clients)
    │   ├── process.js             How we work
    │   ├── faq.js                 FAQ (+ FAQPage structured data)
    │   ├── registration.js        Business registration details
    │   └── contact.js             Contact details and enquiry form
    ├── pages/
    │   ├── home.js                Home page + Organization structured data
    │   └── legal.js               Privacy policy, terms of use, 404 page
    ├── scripts/app.js             Browser script: appearance, language memory, menus, diagrams, tabs, filter, form
    ├── services/
    │   ├── contact.js             Builds WhatsApp/mailto links; optional external form POST
    │   └── integrations.js        Documented stubs for future platform/CRM/AI/analytics connections
    └── styles/main.css            Complete design system (light/dark, 6 accents, 2 densities)
```

**Built output (`dist/`)**, which you don't edit by hand:

- `/index.html` — language redirect
- `/en/`, `/si/`, `/ta/` — home pages
- `/<lang>/privacy/`, `/<lang>/terms/` — legal pages
- `/404.html` — not-found page
- `/assets/css/main.css`, `/assets/js/app.js`, `/assets/js/services/contact.js` — styles and scripts. They carry version stamps so browsers load new copies after each update.
- `robots.txt`, `sitemap.xml` (when `SITE_URL` is set), `.nojekyll`, `CNAME` (when a custom domain is set), plus the files from `public/`

---

## 5. How visitor settings work

- **Appearance panel:** the contrast icon in the header, or the button in the footer, opens it.
  - Mode: Light, Dark or System
  - Accent: Blue, Cyan, Green, Purple, Orange or Red
  - Density: Comfortable or Compact
- **Where settings are kept:** each visitor's choice is saved only in their own browser (`localStorage` keys `kdd-mode`, `kdd-accent`, `kdd-density`, `kdd-lang`). Choices are restored before the page is drawn, so there is no flash of the wrong theme.
- **System mode** follows the device's light/dark setting, live.
- **Language:** switching keeps the section you were reading (the `#anchor`). The choice is remembered for the next visit to the root address.
- **Without JavaScript**, all content stays readable:
  - Diagrams show as lists.
  - All finder answers are shown.
  - Details panels open natively.
  - The theme follows the device setting.

---

## 6. Testing performed

Tested in Chromium (Playwright) against the built site:

- **Layout:** no horizontal overflow at 1440, 1100, 390 and 320 px, in English, Sinhala and Tamil. The header fits on one line at 1200, 1280 and 1366 px in all three languages. Below 1200 px the site switches to the mobile menu.
- **Accessibility:** axe-core reports no WCAG 2 A/AA or best-practice violations on all 9 pages. Colour contrast passes in light and dark mode for all six accents, and in compact density.
- **HTML:** `html-validate` (recommended rules) reports no errors.
- **Keyboard:**
  - A skip link comes first.
  - The Services menu closes with Esc or an outside click and returns focus.
  - The mobile menu opens, closes with Esc, and closes when a link is used.
  - The appearance dialog traps focus and returns it on close.
  - The finder tabs and the architecture explorer work with the arrow keys.
- **Behaviour:**
  - Appearance choices save, restore after reload and carry across languages.
  - System mode follows the operating-system setting.
  - The root redirect follows the saved language or the browser language (`si-LK` → `/si/`; unknown → `/en/`).
  - Diagrams, the technology filter and form validation work.
  - The generated WhatsApp message contains the visitor's entries.
  - Email and external-form buttons stay hidden while not configured.
- **Links:** every internal link and in-page anchor resolves. The 404 page is served for unknown paths. There are no JavaScript errors on any page.
- **Reduced motion:** the stack and pipeline animations stop when the visitor's device asks for reduced motion.

**Not tested here:**

- Safari, Firefox and real phones. Please check on an iPhone and an Android phone after publishing.
- The Noto Sinhala and Tamil web fonts. The test environment had no internet access, so fallback fonts were used; Google Fonts loads the correct fonts on the live site.

---

## 7. Details to confirm before going live

1. **Email address.** The current site hides its email, so none is set and email options are hidden. Add it in `contact.email`.
2. **Company name.** The existing site uses "Kevin Digital Developer" (singular); this site uses "Developers". Confirm which is correct.
3. **Address.** "19, Diaswatta, Alakoladeniya, Kurunegala" was taken from the existing site's footer. That site also spells the town "Kurunagala".
4. **Domain.** The existing site mentions `www.kevindevelopers.lk`. If that is the official domain, set it as `customDomain`.
5. **Registration.** All registration details are placeholders.
6. **Translations.** Sinhala and Tamil text should be reviewed by native speakers, especially the technical wording.
7. **Content accuracy.** The site makes no claims about clients, certifications, partnerships, years or statistics. Keep it that way unless they can be verified.

---

## 8. Security notes

- Do not add API keys, WhatsApp/Meta tokens, database passwords or any credential to this repository. Everything in it is public.
- `src/services/integrations.js` describes how future connections must work. They must call public endpoints only; authentication and secrets stay on the server behind them.
- Third-party services used by visitors:
  - GitHub (hosting)
  - Google Fonts (typefaces)
  - WhatsApp and the visitor's email app, only when the visitor chooses to send an enquiry

  The privacy policy says exactly this. Update it if you add analytics or a form service.
