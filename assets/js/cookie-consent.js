/* Alpha Structure Capital — cookie consent banner
   Self-contained: injects its own markup and styles.
   Stores the visitor's choice in localStorage under "asc-cookie-consent".
   NOTE: no optional cookies/analytics are loaded today. If analytics are added
   later, gate them on window.ascCookieConsent().performance === true. */
(function () {
  'use strict';

  var STORAGE_KEY = 'asc-cookie-consent';

  function readConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
  }
  function saveConsent(performance) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        necessary: true,
        performance: !!performance,
        date: new Date().toISOString(),
        version: 1
      }));
    } catch (e) { /* storage unavailable — banner will reappear */ }
  }

  window.ascCookieConsent = function () {
    return readConsent() || { necessary: true, performance: false };
  };
  // Lets the Privacy Policy page offer a "change your cookie preferences" link:
  window.ascReopenCookieBanner = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    if (!document.getElementById('asc-cookie-banner')) build();
  };

  var css = ''
    + '#asc-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:200;'
    + 'background:#F5F2EA;border-top:1px solid rgba(200,149,62,.5);'
    + 'box-shadow:0 -18px 50px rgba(6,42,32,.25);padding:24px clamp(20px,4vw,40px);'
    + "font-family:'Source Sans 3',-apple-system,sans-serif;color:#1C2522;}"
    + '#asc-cookie-banner .asc-ck-inner{max-width:1320px;margin:0 auto;display:flex;'
    + 'flex-wrap:wrap;gap:20px 40px;align-items:center;}'
    + '#asc-cookie-banner .asc-ck-text{flex:1 1 480px;min-width:280px;}'
    + '#asc-cookie-banner h2{font-family:"Cormorant Garamond",Georgia,serif;color:#0B3D2E;'
    + 'font-size:22px;font-weight:600;margin:0 0 8px;}'
    + '#asc-cookie-banner p{font-size:13.5px;line-height:1.6;color:#3A453F;margin:0;}'
    + '#asc-cookie-banner a{color:#A87B2E;font-weight:600;text-decoration:none;'
    + 'border-bottom:1px solid #C8953E;}'
    + '#asc-cookie-banner a:hover{color:#C8953E;}'
    + '#asc-cookie-banner .asc-ck-actions{display:flex;flex-direction:column;gap:10px;'
    + 'flex:0 0 auto;min-width:230px;}'
    + '#asc-cookie-banner button{font-family:inherit;font-size:13px;font-weight:700;'
    + 'letter-spacing:.06em;padding:13px 26px;cursor:pointer;border-radius:999px;'
    + 'transition:background 200ms,color 200ms,border-color 200ms;}'
    + '#asc-cookie-banner .asc-ck-accept{background:#C8953E;border:1px solid #C8953E;color:#062A20;}'
    + '#asc-cookie-banner .asc-ck-accept:hover{background:#DBAD5C;border-color:#DBAD5C;}'
    + '#asc-cookie-banner .asc-ck-refuse{background:none;border:1px solid rgba(11,61,46,.35);color:#0B3D2E;}'
    + '#asc-cookie-banner .asc-ck-refuse:hover{border-color:#0B3D2E;}'
    + '#asc-cookie-banner .asc-ck-settings{background:none;border:none;color:#A87B2E;'
    + 'text-decoration:underline;padding:6px;font-weight:600;}'
    + '#asc-cookie-banner .asc-ck-settings:hover{color:#C8953E;}'
    + '#asc-cookie-banner .asc-ck-panel{width:100%;border-top:1px solid rgba(11,61,46,.15);'
    + 'margin-top:4px;padding-top:18px;display:none;}'
    + '#asc-cookie-banner .asc-ck-panel.open{display:block;}'
    + '#asc-cookie-banner .asc-ck-row{display:flex;flex-wrap:wrap;gap:8px 24px;'
    + 'align-items:baseline;padding:10px 0;}'
    + '#asc-cookie-banner .asc-ck-row label{font-size:14px;font-weight:600;color:#0B3D2E;'
    + 'display:flex;align-items:center;gap:10px;min-width:260px;}'
    + '#asc-cookie-banner .asc-ck-row input{accent-color:#0B3D2E;width:18px;height:18px;}'
    + '#asc-cookie-banner .asc-ck-row span{font-size:13px;color:#5A665F;flex:1 1 320px;line-height:1.55;}'
    + '#asc-cookie-banner .asc-ck-save{margin-top:12px;background:#0B3D2E;'
    + 'border:1px solid #0B3D2E;color:#F5F2EA;}'
    + '#asc-cookie-banner .asc-ck-save:hover{background:#C8953E;border-color:#C8953E;color:#062A20;}'
    + '#asc-cookie-banner button:focus-visible{outline:2px solid #C8953E;outline-offset:2px;}'
    + '@media (max-width:640px){#asc-cookie-banner .asc-ck-actions{width:100%;}}';

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var banner = document.createElement('section');
    banner.id = 'asc-cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = ''
      + '<div class="asc-ck-inner">'
      + '  <div class="asc-ck-text">'
      + '    <h2>We use cookies</h2>'
      + '    <p>In addition to cookies that are strictly necessary for the operation of this website, '
      + 'Alpha Structure Capital may use cookies and similar technologies to remember your preferences '
      + 'and to measure website performance. We do not use advertising trackers or sell personal information. '
      + 'You can accept all cookies, configure your choices in Cookie Settings, or continue without accepting '
      + 'optional cookies. You may change your preferences or withdraw consent at any time. '
      + 'For more information, please see our <a href="privacy-policy.html">Privacy Policy</a>.</p>'
      + '  </div>'
      + '  <div class="asc-ck-actions">'
      + '    <button type="button" class="asc-ck-accept">ACCEPT ALL COOKIES</button>'
      + '    <button type="button" class="asc-ck-refuse">CONTINUE WITHOUT ACCEPTING</button>'
      + '    <button type="button" class="asc-ck-settings" aria-expanded="false">Cookie Settings</button>'
      + '  </div>'
      + '  <div class="asc-ck-panel" id="asc-ck-panel">'
      + '    <div class="asc-ck-row">'
      + '      <label><input type="checkbox" checked disabled> Strictly necessary</label>'
      + '      <span>Required for the website to function (for example, remembering this cookie choice). Always active.</span>'
      + '    </div>'
      + '    <div class="asc-ck-row">'
      + '      <label><input type="checkbox" id="asc-ck-perf"> Performance &amp; analytics</label>'
      + '      <span>Helps us understand how the website is used so we can improve it. No performance cookies are set unless you enable this.</span>'
      + '    </div>'
      + '    <button type="button" class="asc-ck-save">SAVE PREFERENCES</button>'
      + '  </div>'
      + '</div>';

    // On article pages (one folder deep) fix the Privacy Policy link:
    if (location.pathname.indexOf('/articles/') !== -1) {
      banner.querySelector('a').setAttribute('href', '../privacy-policy.html');
    }

    document.body.appendChild(banner);

    var panel = banner.querySelector('.asc-ck-panel');
    var settingsBtn = banner.querySelector('.asc-ck-settings');

    function close(perf) {
      saveConsent(perf);
      banner.remove();
    }
    banner.querySelector('.asc-ck-accept').addEventListener('click', function () { close(true); });
    banner.querySelector('.asc-ck-refuse').addEventListener('click', function () { close(false); });
    banner.querySelector('.asc-ck-save').addEventListener('click', function () {
      close(document.getElementById('asc-ck-perf').checked);
    });
    settingsBtn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      settingsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) document.getElementById('asc-ck-perf').focus();
    });
  }

  function init() {
    if (!readConsent()) build();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
