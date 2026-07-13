# Content Required Before Launch

Facts that must be supplied and verified. Do not invent any of these. Each
item lists where it is used.

## Identity and contact

- [ ] Legal entity name of the management company — footer (all pages)
- [ ] Business address — footer / contact.html (currently omitted)
- [ ] Verified contact email — contact.html (currently omitted)
- [ ] Production domain — robots.txt, sitemap.xml, canonical links, OG URLs
- [ ] Approved logo artwork — replace the CSS triangle mark and favicon.svg
- [ ] Phone number (only if the firm chooses to publish one)

## Regulatory and offering

- [ ] Adviser registration or exemption language — footer (per counsel)
- [ ] Form ADV link, only if applicable — footer
- [ ] Confirmation of Rule 506(c) approach — affects disclosures + FAQ language
- [ ] Fund legal name, structure, and jurisdiction — not currently displayed
- [ ] Investor eligibility standards — investor-access.html
- [ ] Minimum investment (offering documents only; site intentionally says
      "specified in the definitive offering documents")
- [ ] Governing jurisdiction — terms-of-use.html "Governing law" section
- [ ] Countries from which inquiries may be accepted

## Team and providers

- [ ] Verified team names, titles, biographies, headshots — firm.html
      (team section is intentionally unpublished; template in HTML comment)
- [ ] Service-provider names + written display permission — firm.html
      (currently a neutral "intends to engage" paragraph)

## Editorial

- [ ] Publication dates for the three articles (HTML comments in each article;
      not displayed until approved)
- [ ] Author attribution, only if verified

## Integrations

- [ ] Secure form endpoints (contact + investor access) — assets/js/config.js
- [ ] Spam-protection keys (e.g. Turnstile) — assets/js/config.js
- [ ] Investor portal provider — investor-login.html is a placeholder;
      do not build a custom login
- [ ] Privacy-conscious analytics decision (none are currently loaded)
