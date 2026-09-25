(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[744],{8391:function(e,n,t){Promise.resolve().then(t.t.bind(t,2846,23)),Promise.resolve().then(t.t.bind(t,9107,23)),Promise.resolve().then(t.t.bind(t,1060,23)),Promise.resolve().then(t.t.bind(t,4707,23)),Promise.resolve().then(t.t.bind(t,80,23)),Promise.resolve().then(t.t.bind(t,6423,23))}},function(e){var n=function(n){return e(e.s=n)};e.O(0,[971,117],function(){return n(4278),n(8391)}),_N_E=e.O()}]);
/* Xandra Creative - YouTube Shorts feed loader.
 * Appended to the main-app chunk (NOT inlined in index.html) so the Next.js
 * React hydration never sees unexpected DOM in the initial HTML. The card is
 * built with plain DOM APIs after the page settles, then data is fetched from
 * the same-origin /api/shorts endpoint. Delayed one-shot re-inserts cover the
 * case where React's hydration recovery wipes the card. There is deliberately
 * NO MutationObserver: re-inserting nodes while React is hydrating corrupts
 * its DOM bookkeeping and throws into the app's error boundary. Safe no-op on
 * pages without portal cards. */
;(function () {
  "use strict";
  var API_URL = "/api/shorts";
  var CARD_ID = "xandra-yt-shorts-card";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cols() {
    var w = window.innerWidth || 0;
    return w >= 1024 ? 5 : w >= 640 ? 3 : 2;
  }

  function findAnchor() {
    var cards = document.querySelectorAll(".cosmic-card");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === CARD_ID) continue;
      if (cards[i].textContent.indexOf("TikTok Portal") !== -1) return cards[i];
    }
    return null;
  }

  var YT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;color:#ef4444;flex:none"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>';

  function buildCard() {
    var d = document.createElement("div");
    d.id = CARD_ID;
    d.className = "rounded-lg border bg-card text-card-foreground shadow-sm cosmic-card shake-gentle cosmic-hover";
    d.innerHTML =
      '<div class="flex flex-col space-y-1.5 p-6 pb-4">' +
      '<h3 class="font-semibold tracking-tight text-lg lg:text-xl text-white cosmic-text flex items-center gap-2">' +
      YT_ICON + "<span>YouTube Shorts Feed</span></h3>" +
      '<p class="text-sm text-purple-200">The latest Shorts from the channel, refreshed automatically.</p>' +
      "</div>" +
      '<div class="p-6 pt-0"><div class="rounded-xl overflow-hidden border border-purple-500/30 shadow-lg">' +
      '<div data-shorts-grid style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:16px">' +
      '<div style="grid-column:1/-1;text-align:center;color:#c4b5fd;padding:24px 0;font-size:14px">Loading latest Shorts...</div>' +
      "</div></div></div>";
    return d;
  }

  function insertCard() {
    var existing = document.getElementById(CARD_ID);
    if (existing) return existing;
    var anchor = findAnchor();
    if (!anchor || !anchor.parentNode) return null;
    var card = buildCard();
    anchor.parentNode.insertBefore(card, anchor);
    return card;
  }

  function gridEl() {
    insertCard();
    var card = document.getElementById(CARD_ID);
    return card ? card.querySelector("[data-shorts-grid]") : null;
  }

  function render(items) {
    var g = gridEl();
    if (!g) return;
    g.style.gridTemplateColumns = "repeat(" + cols() + ",minmax(0,1fr))";
    var html = "";
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html +=
        '<a href="' + esc(it.url) + '" target="_blank" rel="noopener" style="display:block;text-decoration:none;min-width:0">' +
        '<span style="display:block;aspect-ratio:9/16;overflow:hidden;border-radius:8px;background:#221d33">' +
        '<img src="' + esc(it.thumb) + '" alt="' + esc(it.title) + '" loading="lazy" ' +
        'style="width:100%;height:100%;object-fit:cover;display:block;border:0">' +
        "</span>" +
        '<span style="display:block;color:#e9d5ff;font-size:12px;line-height:1.35;margin:6px 0 0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">' +
        esc(it.title) + "</span></a>";
    }
    g.innerHTML = html;
  }

  function showStatus(msg) {
    var g = gridEl();
    if (!g) return;
    g.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;color:#c4b5fd;padding:24px 0;font-size:14px">' +
      esc(msg) + "</div>";
  }

  function boot() {
    if (!findAnchor()) return; /* not a page with portal cards */
    insertCard();
    /* Re-assert after hydration typically settles. Deliberately no
     * MutationObserver here: re-inserting DOM nodes while React is
     * hydrating or recovering from a mismatch corrupts its DOM bookkeeping
     * and throws into the app's error boundary. One-shot delayed retries
     * are safe because they run outside React's commit phase. */
    setTimeout(insertCard, 2500);
    setTimeout(insertCard, 8000);
    fetch(API_URL, { headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (data && data.items && data.items.length) render(data.items);
        else showStatus("No Shorts found right now. Check back soon.");
      })
      .catch(function () {
        showStatus("Couldn't load the Shorts feed. Check back soon.");
      });
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        var g = gridEl();
        if (g && g.querySelector("a"))
          g.style.gridTemplateColumns = "repeat(" + cols() + ",minmax(0,1fr))";
      }, 150);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
