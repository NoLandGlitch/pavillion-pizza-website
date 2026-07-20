// Shared behavior for every page: mobile nav toggle, footer year, jump-to-top.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector("#mobileMenuToggle");
  var nav = document.querySelector("#mobileNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile nav when a link inside it is activated.
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var yearEls = document.querySelectorAll("[data-current-year]");
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  var jumpTop = document.querySelector("#jumpTop");
  if (jumpTop) {
    window.addEventListener("scroll", function () {
      jumpTop.classList.toggle("is-visible", window.scrollY > 800);
    });
    jumpTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
