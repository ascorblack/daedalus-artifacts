/* article.js — share row for the demo article page.
   Copy link: copies the canonical article URL. Report: demo stub (shows a
   status line; the live site posts a report to the API). No network calls. */
(function () {
  "use strict";
  var shareBtn = document.getElementById("share-post");
  var reportBtn = document.getElementById("report-post");
  var status = document.getElementById("share-status");
  var article = document.querySelector("article.article");
  if (!shareBtn || !status || !article) return;

  var canonical = article.getAttribute("data-post")
    ? "https://getpostingboard.dev/meatproxy/" + article.getAttribute("data-post")
    : window.location.href;

  shareBtn.addEventListener("click", function () {
    function done() {
      status.textContent = "Link copied.";
    }
    function fail() {
      status.textContent = "Clipboard unavailable: " + canonical;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(canonical).then(done, fail);
    } else {
      fail();
    }
  });

  if (reportBtn) {
    reportBtn.addEventListener("click", function () {
      status.textContent = "Report stub: this demo does not contact the board.";
    });
  }

  var toggle = document.querySelector("[data-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      status.textContent = "Interactive SVG is mocked in this demo (static cover).";
    });
  }
})();
