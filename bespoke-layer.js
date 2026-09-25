/* Xandra bespoke layer: brand weave, micro-interactions, easter eggs, voice, Oscar, cosmos */
(function(){
"use strict";
if (window.__xandraBespoke) return;
window.__xandraBespoke = true;

/* ---------- 1. CSS: Aura washes, twinkle, semi-colon dividers, hovers ---------- */
var css = `
/* Aura gradient washes: subtle rainbow nebula glows */
.xa-aura{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.5;
background:
 radial-gradient(600px 400px at 15% 20%, rgba(255,105,180,.08), transparent 70%),
 radial-gradient(700px 500px at 85% 15%, rgba(147,112,219,.09), transparent 70%),
 radial-gradient(600px 600px at 50% 90%, rgba(64,224,208,.07), transparent 70%),
 radial-gradient(500px 400px at 70% 60%, rgba(255,215,0,.05), transparent 70%);}
/* Twinkling constellation stars */
@keyframes xa-twinkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.82)}}
.xa-twinkle{animation:xa-twinkle 3s ease-in-out infinite;transform-origin:center;transform-box:fill-box}
/* Semi-colon section divider */
.xa-semicolon{display:flex;align-items:center;gap:12px;margin:28px auto;max-width:640px;opacity:.7}
.xa-semicolon::before,.xa-semicolon::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.4),transparent)}
.xa-semicolon span{font-size:22px;color:#c084fc;font-weight:700;letter-spacing:2px}
/* Connected Dimensions hover: each row gets a lift + glow */
.xa-dim-row{transition:transform .25s ease, background .25s ease !important}
.xa-dim-row:hover{transform:translateX(6px) scale(1.02);background:rgba(147,112,219,.12) !important;border-radius:8px}
/* Custom text selection: her brand purple */
::selection{background:rgba(192,132,252,.4);color:#fff}
/* Oscar supervisor badge */
#xa-oscar{position:fixed;bottom:16px;left:16px;z-index:50;display:flex;align-items:center;gap:8px;
 background:rgba(15,10,30,.85);backdrop-filter:blur(8px);border:1px solid rgba(168,85,247,.35);
 border-radius:999px;padding:6px 14px 6px 8px;font-size:11px;color:#d8b4fe;cursor:default;
 box-shadow:0 4px 20px rgba(147,112,219,.25);transition:transform .2s}
#xa-oscar:hover{transform:scale(1.05)}
#xa-oscar .xa-paw{width:22px;height:22px;background:rgba(168,85,247,.2);border-radius:50%;
 display:flex;align-items:center;justify-content:center;font-size:13px}
/* Acceptance signature */
.xa-accept{font-size:11px;color:rgba(216,180,254,.55);text-align:center;margin-top:14px;letter-spacing:.3px}
/* Konami celebration */
#xa-konami{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;
 background:rgba(10,5,25,.9);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .4s}
#xa-konami.show{opacity:1;pointer-events:auto}
#xa-konami .xa-card{text-align:center;padding:40px;max-width:420px}
#xa-konami h2{font-size:28px;color:#f0abfc;margin-bottom:12px}
#xa-konami p{color:#d8b4fe;font-size:14px;line-height:1.6}
`;
var st = document.createElement("style");
st.textContent = css;
document.head.appendChild(st);

/* ---------- 2. Aura background wash ---------- */
if (!document.querySelector(".xa-aura")) {
  var aura = document.createElement("div");
  aura.className = "xa-aura";
  document.body.prepend(aura);
}

/* ---------- 3. Voice pass: text replacements ---------- */
var voice = [
  // [find, replace]
  ["Command Center", "The Studio"],
  ["Track your otherworldly content performance across all dimensions.",
   "Your all-access pass to every dimension. No gatekeeping, just magic."],
  ["Direct feed from @xandrathecreative\u2019s cosmic dimension",
   "Fresh drops from the TikTok dimension"],
  ["Direct feed from @xandrathecreative's cosmic dimension",
   "Fresh drops from the TikTok dimension"],
  ["Visual feed from @xandrathecreative\u2019s Instagram dimension",
   "Eye candy from the Instagram dimension"],
  ["Visual feed from @xandrathecreative's Instagram dimension",
   "Eye candy from the Instagram dimension"],
  ["Fund the Creator", "Fuel the Magic"],
  ["Buy my merch!", "Snag the goods!"],
];
function voicePass(){
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(function(n){
    var t = n.nodeValue;
    if (!t || t.length > 300) return;
    voice.forEach(function(pair){
      if (t.indexOf(pair[0]) !== -1) t = t.split(pair[0]).join(pair[1]);
    });
    if (t !== n.nodeValue) n.nodeValue = t;
  });
}

/* ---------- 4. Semi-colon dividers between major sections ---------- */
function addDividers(){
  // Place semi-colon dividers between major content sections.
  // Strategy: find the main content column, insert dividers between its
  // top-level section children.
  if (document.querySelector(".xa-semicolon")) return; // already done
  // Find candidate section containers: direct children of main content area
  // that contain an h2 or h3 heading
  var mains = document.querySelectorAll("main, [role='main']");
  var scope = mains.length ? mains[0] : document.body;
  // Collect block-level sections (cards/panels) in the main column
  var sections = [];
  var walker = document.createTreeWalker(scope, NodeFilter.SHOW_ELEMENT);
  var el;
  while (walker.nextNode()) {
    el = walker.currentNode;
    var tag = el.tagName.toLowerCase();
    if ((tag === "h2" || tag === "h3") && el.offsetParent !== null) {
      // Find the section container (walk up to a reasonable block)
      var container = el;
      // Go up at most 4 levels looking for a card-like container
      for (var k = 0; k < 4; k++) {
        var p = container.parentNode;
        if (!p || p === scope || p === document.body) break;
        container = p;
        // Stop at something that looks like a card/panel
        var cls = (container.className || "").toString();
        if (/rounded|card|panel|section|backdrop/i.test(cls)) break;
      }
      if (sections.indexOf(container) === -1) sections.push(container);
    }
  }
  // Insert dividers between sections (not before the first)
  sections.forEach(function(sec, i){
    if (i === 0) return;
    if (sec.previousElementSibling && sec.previousElementSibling.classList &&
        sec.previousElementSibling.classList.contains("xa-semicolon")) return;
    var d = document.createElement("div");
    d.className = "xa-semicolon";
    d.setAttribute("aria-hidden", "true");
    d.innerHTML = "<span>;</span>";
    sec.parentNode.insertBefore(d, sec);
  });
}

/* ---------- 5. "Acceptance is free" signature ---------- */
function addSignature(){
  if (document.querySelector(".xa-accept")) return;
  var dims = document.evaluate("//h3[contains(text(),'Connected Dimensions')]",
    document, null, 9, null).singleNodeValue;
  if (!dims) return;
  var sig = document.createElement("div");
  sig.className = "xa-accept";
  sig.innerHTML = "Acceptance is free \u{1F9DA} <span style='opacity:.6'>#audhd</span>";
  // Place after the Connected Dimensions card
  var card = dims.closest("div[class*='rounded']") || dims.parentNode;
  if (card && card.parentNode) {
    card.parentNode.insertBefore(sig, card.nextSibling);
  }
}

/* ---------- 6. Oscar: Studio Supervisor badge ---------- */
function addOscar(){
  if (document.getElementById("xa-oscar")) return;
  var b = document.createElement("div");
  b.id = "xa-oscar";
  b.title = "Quality control. Nap schedule strictly enforced.";
  b.innerHTML = '<span class="xa-paw">\u{1F43E}</span><span>Oscar &middot; Studio Supervisor</span>';
  document.body.appendChild(b);
}

/* ---------- 7. Twinkle the constellation stars ---------- */
function twinkle(){
  // Find the dopamine SVG and add twinkle to star/sparkle elements
  var svg = document.querySelector('svg[aria-label="Dopamine molecule drawn as a constellation"]');
  if (!svg || svg.dataset.twinkled) return;
  svg.dataset.twinkled = "1";
  // Add staggered twinkle to star polygons/paths
  var stars = svg.querySelectorAll("polygon, path");
  stars.forEach(function(s, i){
    // Only twinkle small star shapes (not connecting lines)
    var d = (s.getAttribute("d") || "");
    if (d.length < 60) {  // heuristic: stars have short paths
      s.classList.add("xa-twinkle");
      s.style.animationDelay = (i * 0.37) + "s";
      s.style.animationDuration = (2.2 + (i % 5) * 0.5) + "s";
    }
  });
}

/* ---------- 8. Dimension row hover enhancement ---------- */
function dimHovers(){
  var dims = document.evaluate("//h3[contains(text(),'Connected Dimensions')]",
    document, null, 9, null).singleNodeValue;
  if (!dims) return;
  var container = dims.nextElementSibling;
  if (!container) return;
  container.querySelectorAll("a").forEach(function(a){
    a.classList.add("xa-dim-row");
  });
}

/* ---------- 9. Easter egg: Konami code ---------- */
var konamiSeq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
var konamiIdx = 0;
function konami(e){
  var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  var expected = konamiSeq[konamiIdx].length === 1 ? konamiSeq[konamiIdx].toLowerCase() : konamiSeq[konamiIdx];
  if (key === expected) {
    konamiIdx++;
    if (konamiIdx === konamiSeq.length) {
      konamiIdx = 0;
      showKonami();
    }
  } else {
    konamiIdx = (key === konamiSeq[0].toLowerCase() || key === konamiSeq[0]) ? 1 : 0;
  }
}
function showKonami(){
  var el = document.getElementById("xa-konami");
  if (!el) {
    el = document.createElement("div");
    el.id = "xa-konami";
    el.innerHTML = '<div class="xa-card"><h2>\u2728 Secret Dimension Unlocked \u2728</h2>' +
      '<p>You found it. Most people just scroll.<br><br>' +
      'Xandra sees you. Keep being curious.<br>' +
      '<span style="font-size:11px;opacity:.6">; &mdash; the story continues</span></p>' +
      '<p style="margin-top:20px;font-size:12px;opacity:.5">click anywhere to return</p></div>';
    el.addEventListener("click", function(){ el.classList.remove("show"); });
    document.body.appendChild(el);
  }
  el.classList.add("show");
}
document.addEventListener("keydown", konami);

/* ---------- 10. Console easter egg for devs ---------- */
console.log("%c\u2728 Hey curious dev! \u2728", "font-size:20px;color:#c084fc");
console.log("%cThis site was hand-crafted with obsessive attention to detail. If you're reading this, you get it. ;",
  "color:#a78bfa;font-size:12px");

/* ---------- 11. Dopamine molecule click easter egg ---------- */
var molClicks = 0;
function molEgg(){
  var svg = document.querySelector('svg[aria-label="Dopamine molecule drawn as a constellation"]');
  if (!svg || svg.dataset.egg) return;
  svg.dataset.egg = "1";
  svg.style.cursor = "pointer";
  svg.addEventListener("click", function(){
    molClicks++;
    if (molClicks === 5) {
      molClicks = 0;
      // Burst: briefly scale up all stars
      svg.querySelectorAll(".xa-twinkle").forEach(function(s){
        s.style.transform = "scale(1.8)";
        setTimeout(function(){ s.style.transform = ""; }, 400);
      });
    }
  });
}


/* ---------- 12. Fix broken TikTok/Instagram portals ---------- */
function portalCard(url, emoji, title, desc, btn){
  return '<a href="' + url + '" target="_blank" rel="noopener" data-xa-card="1" ' +
    'style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px 20px;text-align:center;text-decoration:none">' +
    '<span style="font-size:48px">' + emoji + '</span>' +
    '<span style="color:#fff;font-weight:700;font-size:16px">' + title + '</span>' +
    '<span style="color:#a78bfa;font-size:13px">' + desc + '</span>' +
    '<span style="margin-top:8px;padding:10px 28px;border-radius:999px;font-size:14px;font-weight:600;color:#fff;' +
    'background:linear-gradient(90deg,#ec4899,#8b5cf6,#06b6d4)">' + btn + '</span></a>';
}
function fixPortals(){
  // Find portal sections by heading text, replace empty/blocked content with cards.
  var portals = [
    {match: "TikTok", url: "https://www.tiktok.com/@xandrathecreative",
     emoji: "\uD83C\uDFB5", title: "Catch me on TikTok",
     desc: "Short-form chaos, fresh daily.<br>Tap in \u2192 @xandrathecreative", btn: "Visit TikTok"},
    {match: "Instagram", url: "https://www.instagram.com/xandrathecreative",
     emoji: "\uD83D\uDCF8", title: "Visual magic on Instagram",
     desc: "Behind-the-scenes, process vids,<br>finished pieces \u2192 @xandrathecreative", btn: "Visit Instagram"}
  ];
  // Also kill blocked countik iframes wherever they are
  document.querySelectorAll('iframe[src*="countik.com"]').forEach(function(f){
    var w = f.closest("div[class*=rounded]") || f.parentNode;
    if (w) w.style.display = "none";
  });
  portals.forEach(function(p){
    var heads = document.evaluate(
      "//h3[contains(text(),'" + p.match + "') or contains(text(),'" + p.match.toLowerCase() + "')]",
      document, null, 7, null);
    var h;
    while ((h = heads.iterateNext())) {
      if (h.dataset.xaFixed) continue;
      // Walk up to find the card container, then find/create the body area
      var card = h;
      for (var k = 0; k < 6; k++) {
        card = card.parentNode;
        if (!card || card === document.body) break;
        var cls = (card.className || "").toString();
        if (/cosmic-card|rounded/.test(cls)) break;
      }
      if (!card || card === document.body) continue;
      // The body is typically the last child div after the header
      var kids = card.children;
      var body = null;
      for (var j = kids.length - 1; j >= 0; j--) {
        var t = kids[j].textContent.trim();
        if (t.length < 120 && kids[j].querySelector("h3") === null) { body = kids[j]; break; }
      }
      if (!body) {
        body = document.createElement("div");
        body.style.cssText = "border:1px solid rgba(168,85,247,.3);border-radius:8px;overflow:hidden;margin:0 16px 16px";
        card.appendChild(body);
      }
      // Only replace if empty or contains blocked iframe
      var hasBlocked = body.querySelector('iframe[src*="countik.com"]');
      if (body.textContent.trim().length < 120 || hasBlocked) {
        h.dataset.xaFixed = "1";
        body.innerHTML = portalCard(p.url, p.emoji, p.title, p.desc, p.btn);
      }
    }
  });
}

/* ---------- Run everything (with retries for hydration) ---------- */
function run(){
  voicePass();
  addDividers();
  addSignature();
  addOscar();
  twinkle();
  dimHovers();
  molEgg();
  fixPortals();
}
var attempts = 0;
var timer = setInterval(function(){
  run();
  if (++attempts > 24) clearInterval(timer);
}, 500);
run();
})();
