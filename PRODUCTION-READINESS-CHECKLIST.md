# Production Readiness Checklist

Engineering, security, and QA tasks before launch.

## Hosting and delivery

- [ ] Deploy to static host; verify all 16 pages + 3 articles load
- [ ] Configure 404.html for unknown routes
- [ ] Enforce HTTPS with HSTS
- [ ] Set security headers: Content-Security-Policy, X-Content-Type-Options,
      Referrer-Policy, Permissions-Policy, frame-ancestors
- [ ] Block staging from indexing at host level (auth or X-Robots-Tag)
- [ ] Replace REPLACE-WITH-PRODUCTION-DOMAIN in robots.txt and sitemap.xml
- [ ] Enable canonical links in each page head
- [ ] Optionally self-host the Google Fonts (licensing permits) to remove
      the third-party request

## Forms and data

- [ ] Create assets/js/config.js from config.example.js (never commit secrets)
- [ ] Server-side handlers: validation, sanitization, rate limiting
- [ ] Spam protection (Turnstile or equivalent) wired into both forms
- [ ] Encrypted transport end-to-end; minimal internal notifications
- [ ] Human review workflow for investor inquiries — no auto-approval
- [ ] Confirm no investor data appears in URLs, logs, client storage,
      or analytics
- [ ] Test both forms end-to-end: success, failure, validation errors

## QA — functionality

- [ ] Click every navigation, footer, and in-content link on every page
- [ ] Mobile menu: open/close, Escape, link selection, focus return,
      scroll lock, aria-expanded state
- [ ] Forms: required-field errors announce and receive focus
- [ ] 404 page reachable and styled

## QA — responsive

- [ ] Test at 320, 375, 768, 1024, 1440, and 1920 px widths
- [ ] No horizontal overflow at any width
- [ ] Legal text readable on mobile
- [ ] Tap targets ≥ 44×44 px

## QA — accessibility

- [ ] Keyboard-only pass on every page (skip link, menus, forms)
- [ ] Visible focus indicators throughout
- [ ] Screen-reader spot check (landmarks, headings, form labels, alerts)
- [ ] Color-contrast audit (WCAG 2.2 AA)
- [ ] prefers-reduced-motion respected

## QA — performance and SEO

- [ ] Core Web Vitals in "good" range
- [ ] Hero image compressed/responsively sized (consider AVIF/WebP)
- [ ] Unique titles + meta descriptions verified per page
- [ ] OG image renders correctly in link previews
- [ ] sitemap.xml submitted after domain confirmation
- [ ] No third-party trackers present

## Operations

- [ ] Backup and rollback procedure documented
- [ ] Deployment access uses least privilege
- [ ] Dependency/host security review scheduled
- [ ] Incident-response contact defined for form/data issues
