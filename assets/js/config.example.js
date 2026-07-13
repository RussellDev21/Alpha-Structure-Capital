/* Alpha Structure Capital — configuration template.
   Copy this file to config.js, fill in real values, and add
   <script src="assets/js/config.js"></script> immediately BEFORE the
   forms.js script tag on contact.html and investor-access.html.

   NEVER commit real endpoints or keys to a public repository. */
window.ASC_CONFIG = {
  // Server-side handler for the Contact form (POST, JSON body)
  contactFormEndpoint: "",

  // Server-side handler for the Investor Access form (POST, JSON body)
  investorFormEndpoint: "",

  // Cloudflare Turnstile (or equivalent) site key for spam protection
  turnstileSiteKey: "",

  environment: "production"
};
