/* BFORT — interactions */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var open = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Animated stat counters
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "", dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = target * (1 - Math.pow(1 - p, 3));
          el.textContent = (target % 1 ? val.toFixed(1) : Math.floor(val).toLocaleString()) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  // Contact form -> WhatsApp
  var form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var val = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el && el.value ? el.value.trim() : "";
      };
      var lines = ["Hello BFORT, I'd like to make an enquiry."];
      var name = val("name"), email = val("email"), phone = val("phone"),
          topic = val("topic"), message = val("message");
      if (name) lines.push("Name: " + name);
      if (email) lines.push("Email: " + email);
      if (phone) lines.push("Phone: " + phone);
      if (topic) lines.push("Interested in: " + topic);
      if (message) { lines.push(""); lines.push(message); }
      var url = "https://wa.me/919337699099?text=" + encodeURIComponent(lines.join("\n"));
      var ok = form.querySelector(".form__ok");
      if (ok) { ok.style.display = "block"; ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
      var win = window.open(url, "_blank");
      if (!win) window.location.href = url;
    });
  }

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
