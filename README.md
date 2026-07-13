# Alpha Structure Capital — Production Website

A static, framework-free website: HTML5 + CSS3 + minimal vanilla JavaScript.
No build process is required — every page works when opened directly or served
from any static host (Vercel, Netlify, Cloudflare Pages, AWS S3/CloudFront,
shared hosting).

## Structure

```
/                       Pages (index.html, strategy.html, …, 404.html)
/articles/              Three educational articles
/assets/css/styles.css  Single stylesheet (design tokens in :root)
/assets/js/main.js      Mobile navigation + footer year
/assets/js/forms.js     Provider-neutral form handling
/assets/js/config.example.js  Configuration template (copy to config.js)
/assets/images/         Hero image, favicon.svg, og-image.png
/_templates/chrome.html Source template used to generate the shared
                        header/footer across pages (reference only — the
                        generated pages are self-contained; edits to the
                        template do NOT propagate automatically)
```

## Local preview

Open `index.html` in a browser, or run any static server, e.g.:

```
npx serve .
```

## Deployment

1. Upload the folder contents (excluding `_templates/` if you prefer) to any
   static host.
2. Configure the host to serve `404.html` for unknown routes.
3. Replace `REPLACE-WITH-PRODUCTION-DOMAIN` in `robots.txt` and `sitemap.xml`.
4. Uncomment and set the canonical `<link>` in each page's `<head>`.
5. Block staging environments from indexing at the host level.

## Form configuration

Forms are disabled by default and honestly report that submissions are not yet
enabled. To activate:

1. Copy `assets/js/config.example.js` to `assets/js/config.js`.
2. Set `contactFormEndpoint` and `investorFormEndpoint` to your secure
   server-side handlers (POST, JSON body).
3. On `contact.html` and `investor-access.html`, uncomment the `config.js`
   script tag (it sits directly above the `forms.js` tag).
4. Implement server-side validation, sanitization, rate limiting, and spam
   protection on the endpoints. Client-side validation is a convenience only.
5. Route submissions to human compliance review. Never auto-approve access or
   auto-send offering documents.

No investor data is stored in localStorage, sessionStorage, or cookies.

## Editing content

- Shared header/footer markup lives in every page (generated from
  `_templates/chrome.html`). To change it site-wide, edit the template and
  re-apply the change to each page, or regenerate pages from the template.
- Colors and typography are defined as CSS custom properties at the top of
  `assets/css/styles.css`.

## Before launch

Read, in order:

1. `CONTENT-REQUIRED-BEFORE-LAUNCH.md` — facts that must be supplied and verified
2. `LEGAL-REVIEW-CHECKLIST.md` — items requiring U.S. securities counsel
3. `PRODUCTION-READINESS-CHECKLIST.md` — engineering and security tasks
