/* Alpha Structure Capital — forms.js
   Provider-neutral form handling.

   SECURITY / INTEGRATION REQUIREMENTS (see PRODUCTION-READINESS-CHECKLIST.md):
   - Copy config.example.js to config.js and set real endpoints before launch.
   - Endpoints MUST be server-side handlers that validate and sanitize all
     fields again (client-side validation is a convenience, not a control),
     apply rate limiting and spam protection, use encrypted transport, and
     route submissions to human review. Never auto-approve access.
   - No investor data is stored in localStorage, sessionStorage, or cookies.
   - If no endpoint is configured, the form reports that submissions are not
     yet enabled. It never fakes a success state. */
(function () {
  "use strict";

  var config = window.ASC_CONFIG || {};

  function initForm(form) {
    var endpointKey = form.getAttribute("data-endpoint");
    var status = form.querySelector(".form-status");

    function showStatus(html, isError) {
      if (!status) return;
      status.innerHTML = html;
      status.classList.add("visible");
      status.classList.toggle("error", !!isError);
      status.setAttribute("role", "alert");
      status.focus && status.setAttribute("tabindex", "-1");
      status.focus();
    }

    function validate() {
      var ok = true;
      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (el) {
        var wrap = el.closest(".field, .check");
        var valid = el.type === "checkbox" ? el.checked : !!el.value.trim();
        if (valid && el.type === "email") {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        }
        if (wrap) wrap.classList.toggle("invalid", !valid);
        if (!valid) {
          ok = false;
          if (!firstInvalid) firstInvalid = el;
        }
      });
      if (firstInvalid) firstInvalid.focus();
      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      var endpoint = config[endpointKey] || "";
      if (!endpoint) {
        showStatus(
          "<strong>Submissions are not yet enabled.</strong> Secure form integration is pending. Please check back soon.",
          true
        );
        return;
      }

      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      var button = form.querySelector("button[type=submit]");
      if (button) button.disabled = true;

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.querySelectorAll("input, select, textarea").forEach(function (el) {
            if (el.type === "checkbox") el.checked = false;
            else el.value = "";
          });
          showStatus("Thank you. Your request has been received and will be reviewed.", false);
        })
        .catch(function () {
          showStatus(
            "Your request could not be submitted at this time. Please try again later.",
            true
          );
        })
        .finally(function () {
          if (button) button.disabled = false;
        });
    });
  }

  document.querySelectorAll("form[data-endpoint]").forEach(initForm);
})();
