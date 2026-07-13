/* Alpha Structure Capital — main.js
   Mobile navigation + footer year. No frameworks, no tracking. */
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("mobile-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-locked", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.textContent = open ? "✕" : "☰";
    if (open) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    }
  }

  function isOpen() {
    return nav.classList.contains("open");
  }

  toggle.addEventListener("click", function () {
    setOpen(!isOpen());
    if (!isOpen()) toggle.focus();
  });

  // Close when a navigation link is selected
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  // Escape closes the menu and returns focus to the toggle
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close if resized up to desktop layout
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 900 && isOpen()) setOpen(false);
  });
})();
