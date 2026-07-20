// Client-side validation + demo submit handling for the Catering and
// Contact forms. This is a STATIC site with no backend — there is
// nowhere for these forms to actually send data yet. In production,
// wire the <form> up to a real form backend (Formspree, Netlify Forms,
// EmailJS, or similar) or a real server endpoint. See README.md.
(function () {
  "use strict";

  function attachForm(formId, successId, errorId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var success = document.getElementById(successId);
    var error = document.getElementById(errorId);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (success) success.classList.remove("is-visible");
      if (error) error.classList.remove("is-visible");

      if (!form.checkValidity()) {
        form.reportValidity();
        if (error) error.classList.add("is-visible");
        return;
      }

      // Demo behavior only — no data is actually sent anywhere. Replace
      // this block with a real fetch() to your form backend of choice.
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    attachForm("cateringForm", "cateringFormSuccess", "cateringFormError");
    attachForm("contactForm", "contactFormSuccess", "contactFormError");
  });
})();
