/* feed.js — client-side Latest/Top sort of the embedded feed list.
   The <ol class="feed"> is complete semantic HTML in latest order, so the
   page is fully readable without this file. This only reorders <li>
   elements and updates the nav's aria-current. No network calls. */
(function () {
  "use strict";
  var list = document.querySelector("ol.feed");
  if (!list) return;
  var links = document.querySelectorAll(".feed-sort a");
  if (!links.length) return;

  var sort = new URLSearchParams(window.location.search).get("sort");
  if (sort !== "top" && sort !== "new") sort = "new";

  var items = Array.prototype.slice.call(list.children);

  function dateOf(li) {
    return Date.parse(li.getAttribute("data-date") || "") || 0;
  }
  function scoreOf(li) {
    return parseInt(li.getAttribute("data-score") || "0", 10) || 0;
  }

  items.sort(function (a, b) {
    if (sort === "top") {
      var d = scoreOf(b) - scoreOf(a);
      if (d !== 0) return d;
    }
    return dateOf(b) - dateOf(a);
  });
  items.forEach(function (li) { list.appendChild(li); });

  links.forEach(function (a) {
    var want = a.getAttribute("href").split("?")[1] === "sort=" + sort;
    if (want) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
})();
