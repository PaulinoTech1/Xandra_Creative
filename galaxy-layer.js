/* ============================================================
   Xandra galaxy layer: mysterious galaxy traversal
   Standalone IIFE. Injected into every page chunk.
   - Fixed canvas starfield (twinkle, drift, scroll parallax)
   - Occasional shooting stars
   - Slow-drifting nebula washes
   - Warp flash on internal navigation
   Respects prefers-reduced-motion. Idempotent via __xaGalaxy.

   IMPORTANT: Next.js hydrates the entire `document`
   (hydrateRoot(document)), and React removes body children it
   did not render. So elements must be injected AFTER hydration
   settles, with a MutationObserver to re-add them if React
   wipes them during a late client render.
   ============================================================ */
(function () {
  if (window.__xaGalaxy) return;
  window.__xaGalaxy = 1;

  var IDS = ["xa-galaxy", "xa-neb1", "xa-neb2", "xa-neb3", "xa-warp"];

  function boot() {
    if (!document.body || !document.head) {
      setTimeout(boot, 50);
      return;
    }
    // Wait for hydration to settle: run after window load + delay.
    function go() {
      ensureElements();
      init();
      watchForRemoval();
    }
    if (document.readyState === "complete") {
      setTimeout(go, 1200);
    } else {
      window.addEventListener("load", function () { setTimeout(go, 1200); });
      // Fallback: if load already fired or never fires, go after 5s.
      setTimeout(function () {
        if (!document.getElementById("xa-galaxy")) go();
      }, 5000);
    }
  }

  /* Re-add our elements if something (React hydration) removes them. */
  var observed = false;
  function watchForRemoval() {
    if (observed || !("MutationObserver" in window) || !document.body) return;
    observed = true;
    var readding = false;
    var obs = new MutationObserver(function () {
      if (readding) return;
      var missing = false;
      for (var i = 0; i < IDS.length; i++) {
        if (!document.getElementById(IDS[i])) { missing = true; break; }
      }
      if (missing) {
        readding = true;
        try { ensureElements(); } catch (e) {}
        readding = false;
      }
    });
    obs.observe(document.body, { childList: true });
    // Stop watching after 60s; hydration is long done by then.
    setTimeout(function () { try { obs.disconnect(); } catch (e) {} }, 60000);
  }

  function ensureElements() {
    if (!document.body) return;
    var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    /* ---------- CSS ---------- */
    if (!document.getElementById("xa-galaxy-css")) {
      var css = [
        "#xa-galaxy{position:fixed;inset:0;z-index:1;pointer-events:none;}",
        ".xa-nebula{position:fixed;border-radius:9999px;filter:blur(90px);z-index:1;pointer-events:none;opacity:.34;}",
        "#xa-neb1{width:52vw;height:52vw;left:-14vw;top:-10vw;background:radial-gradient(circle,rgba(139,92,246,.75),transparent 70%);}",
        "#xa-neb2{width:44vw;height:44vw;right:-12vw;top:30vh;background:radial-gradient(circle,rgba(34,211,238,.55),transparent 70%);}",
        "#xa-neb3{width:48vw;height:48vw;left:22vw;bottom:-16vw;background:radial-gradient(circle,rgba(232,121,249,.5),transparent 70%);}",
        (reduceMotion ? "" : ".xa-nebula{animation:xa-drift 70s ease-in-out infinite alternate;}"),
        (reduceMotion ? "" : "#xa-neb2{animation-duration:95s;}#xa-neb3{animation-duration:120s;}"),
        "@keyframes xa-drift{from{transform:translate3d(0,0,0) scale(1);}to{transform:translate3d(6vw,-4vh,0) scale(1.15);}}",
        "#xa-warp{position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0;",
        "background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.95) 0%,rgba(192,132,252,.55) 22%,rgba(88,28,135,.35) 45%,transparent 72%);",
        "transform:scale(.2);}",
        (reduceMotion ? "" : "#xa-warp.xa-go{animation:xa-warp .38s ease-out forwards;}"),
        (reduceMotion ? "" : "@keyframes xa-warp{to{opacity:1;transform:scale(2.6);}}")
      ].join("\n");
      var style = document.createElement("style");
      style.id = "xa-galaxy-css";
      style.textContent = css;
      document.head.appendChild(style);
    }

    /* ---------- Nebula blobs ---------- */
    ["xa-neb1", "xa-neb2", "xa-neb3"].forEach(function (id) {
      if (document.getElementById(id)) return;
      var d = document.createElement("div");
      d.className = "xa-nebula";
      d.id = id;
      document.body.appendChild(d);
    });

    /* ---------- Starfield canvas ---------- */
    if (!document.getElementById("xa-galaxy")) {
      var canvas = document.createElement("canvas");
      canvas.id = "xa-galaxy";
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    /* ---------- Warp overlay ---------- */
    if (!document.getElementById("xa-warp")) {
      var warp = document.createElement("div");
      warp.id = "xa-warp";
      document.body.appendChild(warp);
    }
  }

  var started = false;
  function init() {
    if (started) return;
    // Only start the animation once all elements are present.
    for (var i = 0; i < IDS.length; i++) {
      if (!document.getElementById(IDS[i])) return;
    }
    started = true;

    var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var canvas = document.getElementById("xa-galaxy");
    var ctx = canvas.getContext("2d");
    var stars = [];
    var W = 0, H = 0, DPR = 1;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      seed();
    }

    function seed() {
      stars = [];
      var n = Math.floor((W * H) / 4200);
      for (var i = 0; i < n; i++) {
        var depth = Math.random();
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.5 + depth * 1.8,
          // depth: 0 = far (slow, dim), 1 = near (fast, bright)
          depth: depth,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.4 + Math.random() * 1.4,
          hue: Math.random()
        });
      }
    }

    function starColor(s, alpha) {
      // Mostly white/blue-white, occasional purple/pink/cyan tints
      if (s.hue < 0.72) return "rgba(255,255,255," + alpha + ")";
      if (s.hue < 0.82) return "rgba(196,181,253," + alpha + ")";
      if (s.hue < 0.91) return "rgba(165,243,252," + alpha + ")";
      return "rgba(249,168,212," + alpha + ")";
    }

    var shooting = [];
    function maybeShoot() {
      if (reduceMotion) return;
      if (shooting.length < 2 && Math.random() < 0.004) {
        var sx = Math.random() * W * 0.8 + W * 0.1;
        shooting.push({ x: sx, y: -20, vx: (Math.random() - 0.5) * 4 - 3, vy: 7 + Math.random() * 4, life: 1 });
      }
    }

    var scrollY = 0;
    function onScroll() { scrollY = window.scrollY || 0; }

    function frame(now) {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var t = now / 1000;

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        // Slow drift + scroll parallax (near stars shift more)
        var px = (s.x + t * 2 * s.depth) % W;
        var py = (s.y + t * 0.7 * s.depth - scrollY * 0.12 * s.depth) % H;
        if (py < 0) py += H;
        var tw = reduceMotion ? 0.85 : (0.55 + 0.45 * Math.sin(s.tw + t * s.twSpeed));
        var a = (0.45 + 0.55 * s.depth) * tw;
        ctx.fillStyle = starColor(s, a.toFixed(3));
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, 6.2832);
        ctx.fill();
      }

      // Shooting stars
      for (var j = shooting.length - 1; j >= 0; j--) {
        var m = shooting[j];
        m.x += m.vx; m.y += m.vy; m.life -= 0.02;
        if (m.life <= 0 || m.y > H + 40) { shooting.splice(j, 1); continue; }
        var grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 12, m.y - m.vy * 12);
        grad.addColorStop(0, "rgba(255,255,255," + (0.9 * m.life).toFixed(3) + ")");
        grad.addColorStop(1, "rgba(192,132,252,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 12, m.y - m.vy * 12);
        ctx.stroke();
      }
      maybeShoot();
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    resize();
    requestAnimationFrame(frame);

    /* ---------- Warp transition on internal navigation ---------- */
    if (!reduceMotion) {
      var warp = document.getElementById("xa-warp");
      var warping = false;
      document.addEventListener("click", function (e) {
        if (warping || e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        var a = e.target && e.target.closest ? e.target.closest("a") : null;
        if (!a || !a.href) return;
        if (a.target === "_blank" || (a.getAttribute("rel") || "").indexOf("noopener") !== -1) return;
        var url;
        try { url = new URL(a.href, location.href); } catch (err) { return; }
        if (url.origin !== location.origin) return;
        if (url.pathname === location.pathname && url.hash) return;
        e.preventDefault();
        warping = true;
        warp.classList.remove("xa-go");
        void warp.offsetWidth;
        warp.classList.add("xa-go");
        setTimeout(function () { location.href = url.href; }, 380);
      }, true);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
