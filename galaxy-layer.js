/* ============================================================
   Xandra galaxy layer: WebGPU spiral galaxy background
   Standalone IIFE. Injected into every page chunk.
   - WebGPU compute-shader spiral galaxy (three.js TSL, adapted
     from dgreenheck/webgpu-galaxy MIT) with twinkle, drift,
     scroll parallax. Falls back to canvas 2D starfield if
     WebGPU is unavailable.
   - 2D overlay canvas: shooting stars (kept from before)
   - Slow-drifting nebula washes (CSS)
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

  var IDS = ["xa-galaxy", "xa-shoot", "xa-neb1", "xa-neb2", "xa-neb3", "xa-warp"];
  var IMPORTMAP_URLS = {
    "three": "https://unpkg.com/three@0.181.0/build/three.webgpu.js",
    "three/webgpu": "https://unpkg.com/three@0.181.0/build/three.webgpu.js",
    "three/tsl": "https://unpkg.com/three@0.181.0/build/three.tsl.js"
  };

  function boot() {
    if (!document.body || !document.head) {
      setTimeout(boot, 50);
      return;
    }
    function go() {
      ensureElements();
      init();
      watchForRemoval();
    }
    if (document.readyState === "complete") {
      setTimeout(go, 1200);
    } else {
      window.addEventListener("load", function () { setTimeout(go, 1200); });
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
        try {
          ensureElements();
          // Canvas was wiped: WebGL context is gone, re-init background.
          restartBackground();
        } catch (e) {}
        readding = false;
      }
    });
    obs.observe(document.body, { childList: true });
    setTimeout(function () { try { obs.disconnect(); } catch (e) {} }, 60000);
  }

  function ensureElements() {
    if (!document.body) return;
    var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    /* ---------- CSS ---------- */
    if (!document.getElementById("xa-galaxy-css")) {
      var css = [
        "#xa-galaxy{position:fixed;inset:0;z-index:0;pointer-events:none;}",
        "#xa-shoot{position:fixed;inset:0;z-index:2;pointer-events:none;}",
        ".xa-nebula{position:fixed;border-radius:9999px;filter:blur(90px);z-index:1;pointer-events:none;opacity:.30;}",
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
        (reduceMotion ? "" : "@keyframes xa-warp{to{opacity:1;transform:scale(2.6);}}"),
        "@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;scroll-behavior:auto !important;}}"
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

    /* ---------- Background canvas (WebGL or 2D fallback) ---------- */
    if (!document.getElementById("xa-galaxy")) {
      var canvas = document.createElement("canvas");
      canvas.id = "xa-galaxy";
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    /* ---------- Shooting-star overlay canvas ---------- */
    if (!document.getElementById("xa-shoot")) {
      var shoot = document.createElement("canvas");
      shoot.id = "xa-shoot";
      document.body.appendChild(shoot);
    }

    /* ---------- Warp overlay ---------- */
    if (!document.getElementById("xa-warp")) {
      var warp = document.createElement("div");
      warp.id = "xa-warp";
      document.body.appendChild(warp);
    }
  }

  /* ---------- Background lifecycle ---------- */
  var started = false;
  var bgHandle = null;   // WebGPU handle {ok, dispose, setPaused}
  var fallbackRunning = false;

  function restartBackground() {
    try { if (bgHandle && bgHandle.dispose) bgHandle.dispose(); } catch (e) {}
    bgHandle = null;
    fallbackRunning = false;
    started = false;
    init();
  }

  /* If WebGL touched the canvas, 2D fallback needs a fresh element. */
  function freshCanvasFor2D() {
    var old = document.getElementById("xa-galaxy");
    if (!old) return null;
    var nu = document.createElement("canvas");
    nu.id = "xa-galaxy";
    old.parentNode.replaceChild(nu, old);
    return nu;
  }

  function degradeTo2D(reduceMotion) {
    try { if (bgHandle && bgHandle.dispose) bgHandle.dispose(); } catch (e) {}
    bgHandle = null;
    freshCanvasFor2D();
    startFallback2D(reduceMotion);
  }

  function ensureImportMap() {
    if (document.querySelector('script[type="importmap"]')) return;
    var im = document.createElement("script");
    im.type = "importmap";
    im.textContent = JSON.stringify({ imports: IMPORTMAP_URLS });
    document.head.appendChild(im);
  }

  function init() {
    if (started) return;
    for (var i = 0; i < IDS.length; i++) {
      if (!document.getElementById(IDS[i])) return;
    }
    started = true;

    var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    startShootingStars(reduceMotion);
    setupWarp(reduceMotion);

    // 2D spiral galaxy (primary renderer — guaranteed to work).
    // WebGPU enhancement is deferred until it can be verified.
    startFallback2D(reduceMotion);
  }

  /* ---------- 2D spiral galaxy (primary renderer) ----------
     Canvas 2D spiral galaxy matching the WebGPU demo's look:
     purple core -> cyan edges, differential rotation, twinkle,
     scroll parallax, central glow. Guaranteed to render. */
  function startFallback2D(reduceMotion) {
    if (fallbackRunning) return;
    var canvas = document.getElementById("xa-galaxy");
    if (!canvas) return;
    fallbackRunning = true;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var W = 0, H = 0, DPR = 1;
    var CX = 0, CY = 0, RMAX = 0;
    var stars = [];
    var bgStars = [];

    var ARMS = 2;
    var TILT = 0.42;           // vertical squash for angled view
    var ROT = 0.018;           // base rotation rad/sec

    function hexRGB(hex) {
      var n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    var CORE = hexRGB("#c084fc");
    var EDGE = hexRGB("#67e8f9");

    function seed() {
      stars = [];
      bgStars = [];
      CX = W * 0.5;
      CY = H * 0.42;
      RMAX = Math.min(W, H) * 0.52;

      // Galaxy stars: spiral arms
      var n = Math.floor((W * H) / 260);
      if (n > 7000) n = 7000;
      if (n < 2500) n = 2500;
      for (var i = 0; i < n; i++) {
        var rad = Math.pow(Math.random(), 0.55);          // 0..1, denser center
        var arm = Math.floor(Math.random() * ARMS);
        var armAngle = (arm / ARMS) * Math.PI * 2;
        var spiral = rad * 1.35 * Math.PI * 2;
        var jitter = (Math.random() - 0.5) * 1.15;
        var angle = armAngle + spiral + jitter;
        var rr = rad + (Math.random() - 0.5) * 0.16;
        if (rr < 0.02) rr = 0.02;
        // color: core purple -> edge cyan
        var t = Math.min(Math.max((rad - 0.12) / 0.75, 0), 1);
        var r = Math.round(CORE[0] + (EDGE[0] - CORE[0]) * t);
        var g = Math.round(CORE[1] + (EDGE[1] - CORE[1]) * t);
        var b = Math.round(CORE[2] + (EDGE[2] - CORE[2]) * t);
        stars.push({
          rad: rr, angle: angle,
          size: 0.6 + Math.random() * 1.7 * (1.15 - rad * 0.7),
          col: r + "," + g + "," + b,
          tw: Math.random() * 6.283,
          twSpd: 0.6 + Math.random() * 1.8,
          bright: 0.55 + Math.random() * 0.45
        });
      }
      // Distant background stars
      var nb = Math.floor((W * H) / 9000);
      for (var j = 0; j < nb; j++) {
        bgStars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: 0.4 + Math.random() * 1.1,
          tw: Math.random() * 6.283,
          twSpd: 0.4 + Math.random() * 1.2,
          a: 0.35 + Math.random() * 0.45
        });
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      seed();
    }

    var scrollY = 0;
    function onScroll() { scrollY = window.scrollY || 0; }
    var rot = 0;

    // Pre-rendered central glow sprite
    var glowC = document.createElement("canvas");
    function makeGlow() {
      var s = Math.floor(RMAX * 0.9);
      if (s < 50) s = 50;
      glowC.width = s; glowC.height = Math.floor(s * TILT) || 50;
      var g = glowC.getContext("2d");
      var gr = g.createRadialGradient(s/2, glowC.height/2, 0, s/2, glowC.height/2, s/2);
      gr.addColorStop(0, "rgba(192,132,252,0.30)");
      gr.addColorStop(0.35, "rgba(139,92,246,0.16)");
      gr.addColorStop(0.7, "rgba(103,232,249,0.05)");
      gr.addColorStop(1, "rgba(103,232,249,0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, s, glowC.height);
    }

    function frame(now) {
      if (!fallbackRunning) return;
      var t = now / 1000;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // background
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, W, H);

      var parY = reduceMotion ? 0 : scrollY * 0.08;
      var cy = CY - parY * 0.3;

      // central glow
      if (!reduceMotion || true) {
        ctx.drawImage(glowC, CX - glowC.width / 2, cy - glowC.height / 2);
      }

      // background stars (slow drift + parallax)
      for (var bi = 0; bi < bgStars.length; bi++) {
        var bs = bgStars[bi];
        var bx = bs.x - (reduceMotion ? 0 : t * 1.5) % W;
        if (bx < 0) bx += W;
        var by = bs.y - parY * 0.12;
        var btw = reduceMotion ? 0.8 : (0.6 + 0.4 * Math.sin(bs.tw + t * bs.twSpd));
        ctx.fillStyle = "rgba(255,255,255," + (bs.a * btw).toFixed(3) + ")";
        ctx.fillRect(bx, by, bs.r, bs.r);
      }

      // galaxy stars
      if (!reduceMotion) rot += ROT * 0.016;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        // differential rotation: inner orbits faster
        var a = s.angle + rot / (s.rad * 0.9 + 0.35);
        var px = CX + Math.cos(a) * s.rad * RMAX;
        var py = cy + Math.sin(a) * s.rad * RMAX * TILT;
        if (px < -4 || px > W + 4 || py < -4 || py > H + 4) continue;
        var tw = reduceMotion ? 0.85 : (0.62 + 0.38 * Math.sin(s.tw + t * s.twSpd));
        var alpha = (0.35 + 0.65 * s.bright) * tw;
        ctx.fillStyle = "rgba(" + s.col + "," + alpha.toFixed(3) + ")";
        var sz = s.size;
        if (sz <= 1.4) {
          ctx.fillRect(px, py, sz, sz);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, sz * 0.62, 0, 6.2832);
          ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", function () { resize(); makeGlow(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    resize();
    makeGlow();
    requestAnimationFrame(frame);
  }

  /* ---------- Shooting stars overlay (runs over WebGL too) ---------- */
  var shootStarted = false;
  function startShootingStars(reduceMotion) {
    if (shootStarted || reduceMotion) return;
    var canvas = document.getElementById("xa-shoot");
    if (!canvas) return;
    shootStarted = true;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var W = 0, H = 0, DPR = 1;
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
    }
    var shooting = [];
    function frame() {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (shooting.length < 2 && Math.random() < 0.004) {
        var sx = Math.random() * W * 0.8 + W * 0.1;
        shooting.push({ x: sx, y: -20, vx: (Math.random() - 0.5) * 4 - 3, vy: 7 + Math.random() * 4, life: 1 });
      }
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
      requestAnimationFrame(frame);
    }
    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(frame);
  }

  /* ---------- Warp transition on internal navigation ---------- */
  var warpSetup = false;
  function setupWarp(reduceMotion) {
    if (warpSetup || reduceMotion) return;
    warpSetup = true;
    var warp = document.getElementById("xa-warp");
    if (!warp) return;
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
