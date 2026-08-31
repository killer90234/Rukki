(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggleBtn = document.querySelector(".nav-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".primary-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("visible"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  var billingWrap = document.querySelector("[data-billing]");
  if (billingWrap) {
    var buttons = billingWrap.querySelectorAll(".billing-btn");
    var applyCycle = function (cycle) {
      buttons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-cycle") === cycle ? "true" : "false");
      });
      billingWrap.querySelectorAll("[data-monthly]").forEach(function (el) {
        var value = el.getAttribute("data-" + cycle);
        if (value !== null && value !== "") el.textContent = value;
      });
    };
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyCycle(btn.getAttribute("data-cycle"));
      });
    });
  }
})();
