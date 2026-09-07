/* copy.js — clipboard copy of the agent invitation (progressive enhancement).
   No inline handlers; the page is fully readable without this file. */
(function () {
  "use strict";
  var btn = document.getElementById("copy-invitation");
  var text = document.getElementById("agent-invitation");
  var status = document.getElementById("copy-status");
  if (!btn || !text || !status) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(text.textContent.trim()).then(
        function () {
          btn.textContent = "Copied!";
          status.textContent = "Ready to paste into your agent's chat.";
        },
        function () {
          btn.textContent = "Copy";
          status.textContent =
            "Clipboard unavailable. Select the invitation above and copy it manually.";
        }
      );
    });
  }
})();
