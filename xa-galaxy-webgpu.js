/* ============================================================
   Xandra WebGPU galaxy background (v2: robust CPU-geometry build)
   Inspired by dgreenheck/webgpu-galaxy (MIT License)
   - Spiral galaxy positions generated on CPU (same math as ref)
   - Differential rotation applied per-frame on CPU (20K pts ~ trivial)
   - Three.js WebGPU renderer, TSL twinkle shader
   - Brand palette: purple core -> cyan edges
   - Scroll parallax via camera, FPS auto-degrade to 2D fallback
   - Exposes initGalaxy(canvas, opts) -> Promise<handle|false>
     opts: {reduceMotion, onSlow} -- onSlow() called if FPS is poor
   ============================================================ */
import * as THREE from 'three/webgpu';
import {
  uniform,
  vec4,
  float,
  Fn,
  sin,
  uv,
  length,
  smoothstep,
  attribute
} from 'three/tsl';

const CONFIG = {
  starCount: 20000,
  rotationSpeed: 0.10,          // base angular speed (rad/sec at center)
  spiralTightness: 1.25,
  galaxyRadius: 14.0,
  galaxyThickness: 2.6,
  armCount: 2,
  armWidth: 2.1,
  randomness: 1.7,
  pointSize: 2.6,               // px base size (scaled by DPR)
  starBrightness: 0.85,
  denseStarColor: '#c084fc',    // purple core
  sparseStarColor: '#67e8f9',   // cyan edges
  cloudCount: 900,
  cloudSize: 26,                // px
  cloudOpacity: 0.055,
  cloudTintColor: '#a855f7',
  bgStarCount: 1800
};

/* Generate spiral galaxy on CPU. Returns {positions, colors, phases, radii}. */
function generateSpiral(count, cfg) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const radii = new Float32Array(count);
  const dense = new THREE.Color(cfg.denseStarColor);
  const sparse = new THREE.Color(cfg.sparseStarColor);
  const tmp = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const radius = Math.pow(Math.random(), 0.5) * cfg.galaxyRadius;
    const nr = radius / cfg.galaxyRadius;
    const armIndex = Math.floor(Math.random() * cfg.armCount);
    const armAngle = (armIndex / cfg.armCount) * Math.PI * 2;
    const spiralAngle = nr * cfg.spiralTightness * Math.PI * 2;
    const angleOffset = (Math.random() - 0.5) * cfg.randomness;
    const radiusOffset = (Math.random() - 0.5) * cfg.armWidth;
    const angle = armAngle + spiralAngle + angleOffset;
    const r = Math.max(radius + radiusOffset, 0.05);
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const thicknessFactor = (1.0 - nr) + 0.2;
    const y = (Math.random() - 0.5) * cfg.galaxyThickness * thicknessFactor;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    radii[i] = Math.sqrt(x * x + z * z);
    const radialSparsity = Math.abs(radiusOffset) / (cfg.armWidth * 0.5 + 0.01);
    const angularSparsity = Math.abs(angleOffset) / (cfg.randomness * 0.5 + 0.01);
    const sparsity = Math.min((radialSparsity + angularSparsity) * 0.5, 1.0);
    tmp.copy(dense).lerp(sparse, sparsity).multiplyScalar(cfg.starBrightness);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
    phases[i] = Math.random() * Math.PI * 2;
  }
  return { positions, colors, phases, radii };
}

/* Soft round sprite texture (for clouds). */
function makeSoftTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.5)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.14)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export async function initGalaxy(canvas, opts) {
  opts = opts || {};
  const reduceMotion = !!opts.reduceMotion;
  const onSlow = opts.onSlow || function () {};

  let renderer;
  try {
    renderer = new THREE.WebGPURenderer({ canvas: canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    await renderer.init();
  } catch (e) {
    return false;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030014);

  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
  const CAM_Y = 9.5, CAM_Z = 15.5;
  camera.position.set(0, CAM_Y, CAM_Z);
  camera.lookAt(0, -1.5, 0);

  const timeU = uniform(0);
  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

  /* ---- Galaxy stars (Points, TSL twinkle) ---- */
  const g = generateSpiral(CONFIG.starCount, CONFIG);
  const gGeo = new THREE.BufferGeometry();
  gGeo.setAttribute('position', new THREE.BufferAttribute(g.positions, 3));
  gGeo.setAttribute('color', new THREE.BufferAttribute(g.colors, 3));
  gGeo.setAttribute('aPhase', new THREE.BufferAttribute(g.phases, 1));

  const gMat = new THREE.PointsNodeMaterial();
  gMat.vertexColors = false;
  gMat.transparent = true;
  gMat.depthWrite = false;
  gMat.blending = THREE.AdditiveBlending;

  const twPhase = attribute('aPhase');
  const tw = sin(timeU.mul(1.7).add(twPhase)).mul(0.5).add(0.5);
  const twinkleMul = tw.mul(0.30).add(0.70);
  const softDot = Fn(() => {
    const cc = uv().sub(0.5).mul(2.0);
    const d = length(cc);
    return smoothstep(1.0, 0.25, d);
  })();
  gMat.colorNode = vec4(attribute('color'), float(1.0)).mul(twinkleMul);
  gMat.opacityNode = softDot;
  gMat.sizeNode = float(CONFIG.pointSize * DPR);
  // size attenuation: keep constant screen size (background)
  gMat.sizeAttenuation = false;

  const galaxyPts = new THREE.Points(gGeo, gMat);
  galaxyPts.frustumCulled = false;
  scene.add(galaxyPts);

  /* ---- Dust clouds (Points, soft texture, slow) ---- */
  const cGen = generateSpiral(CONFIG.cloudCount, CONFIG);
  const cGeo = new THREE.BufferGeometry();
  cGeo.setAttribute('position', new THREE.BufferAttribute(cGen.positions, 3));
  const cMat = new THREE.PointsNodeMaterial();
  const cloudTex = makeSoftTexture();
  cMat.map = cloudTex;
  cMat.transparent = true;
  cMat.depthWrite = false;
  cMat.blending = THREE.AdditiveBlending;
  cMat.opacityNode = float(CONFIG.cloudOpacity * 3.0);
  const cloudCol = new THREE.Color(CONFIG.cloudTintColor);
  cMat.colorNode = vec4(float(cloudCol.r), float(cloudCol.g), float(cloudCol.b), float(1.0));
  cMat.sizeNode = float(CONFIG.cloudSize * DPR);
  cMat.sizeAttenuation = false;
  const cloudPts = new THREE.Points(cGeo, cMat);
  cloudPts.frustumCulled = false;
  cloudPts.renderOrder = -1;
  scene.add(cloudPts);

  /* ---- Distant background stars ---- */
  const bgGeo = new THREE.BufferGeometry();
  const bgPos = new Float32Array(CONFIG.bgStarCount * 3);
  const bgCol = new Float32Array(CONFIG.bgStarCount * 3);
  for (let i = 0; i < CONFIG.bgStarCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 90 + Math.random() * 110;
    bgPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    bgPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    bgPos[i * 3 + 2] = radius * Math.cos(phi);
    const b = 0.5 + Math.random() * 0.4;
    const t = Math.random();
    if (t < 0.15) { bgCol[i*3] = b*0.75; bgCol[i*3+1] = b*0.82; bgCol[i*3+2] = b; }
    else if (t < 0.28) { bgCol[i*3] = b; bgCol[i*3+1] = b*0.85; bgCol[i*3+2] = b*0.72; }
    else { bgCol[i*3] = b; bgCol[i*3+1] = b; bgCol[i*3+2] = b; }
  }
  bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
  bgGeo.setAttribute('color', new THREE.BufferAttribute(bgCol, 3));
  const bgMat = new THREE.PointsMaterial({
    size: 1.6 * DPR, vertexColors: true, transparent: true, opacity: 0.85,
    sizeAttenuation: false, depthWrite: false
  });
  const bgPts = new THREE.Points(bgGeo, bgMat);
  bgPts.frustumCulled = false;
  scene.add(bgPts);

  /* ---- Scroll parallax ---- */
  let scrollY = 0;
  const onScroll = () => { scrollY = window.scrollY || 0; };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  function renderFrame() {
    camera.position.y = CAM_Y + scrollY * 0.0028;
    camera.lookAt(0, -1.5, 0);
    renderer.render(scene, camera);
  }

  /* Differential rotation on CPU: inner stars orbit faster. */
  const posAttr = gGeo.getAttribute('position');
  const posArr = posAttr.array;
  const radArr = g.radii;
  const N = CONFIG.starCount;
  function rotateGalaxy(dt) {
    const base = CONFIG.rotationSpeed * dt;
    for (let i = 0; i < N; i++) {
      const r = radArr[i];
      const ang = base / (r * 0.12 + 1.0);
      // small-angle approx is fine, but do exact for stability
      const cosA = Math.cos(ang), sinA = Math.sin(ang);
      const ix = i * 3;
      const x = posArr[ix], z = posArr[ix + 2];
      posArr[ix] = x * cosA - z * sinA;
      posArr[ix + 2] = x * sinA + z * cosA;
    }
    posAttr.needsUpdate = true;
  }
  // Clouds drift at 40% speed
  const cPosAttr = cGeo.getAttribute('position');
  const cPosArr = cPosAttr.array;
  const cRad = cGen.radii;
  const CN = CONFIG.cloudCount;
  function rotateClouds(dt) {
    const base = CONFIG.rotationSpeed * 0.4 * dt;
    for (let i = 0; i < CN; i++) {
      const r = cRad[i];
      const ang = base / (r * 0.12 + 1.0);
      const cosA = Math.cos(ang), sinA = Math.sin(ang);
      const ix = i * 3;
      const x = cPosArr[ix], z = cPosArr[ix + 2];
      cPosArr[ix] = x * cosA - z * sinA;
      cPosArr[ix + 2] = x * sinA + z * cosA;
    }
    cPosAttr.needsUpdate = true;
  }

  function cleanup() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    try { scene.remove(galaxyPts); gGeo.dispose(); gMat.dispose(); } catch (e) {}
    try { scene.remove(cloudPts); cGeo.dispose(); cMat.dispose(); } catch (e) {}
    try { scene.remove(bgPts); bgGeo.dispose(); bgMat.dispose(); } catch (e) {}
    try { cloudTex.dispose(); } catch (e) {}
    try { renderer.dispose(); } catch (e) {}
  }

  // First frame (also serves reduced-motion: static single render)
  renderFrame();

  if (reduceMotion) {
    return { ok: true, dispose: cleanup, setPaused: function () {} };
  }

  let running = true;
  let lastTime = performance.now();
  let slowNotified = false;
  // FPS monitor: if avg FPS < 24 over first 4s, ask host to degrade
  let frames = 0;
  const fpsStart = performance.now();

  const onVis = () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) { lastTime = performance.now(); requestAnimationFrame(animate); }
  };
  document.addEventListener('visibilitychange', onVis);

  function animate() {
    if (!running) return;
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    timeU.value += dt;
    try {
      rotateGalaxy(dt);
      rotateClouds(dt);
    } catch (e) { return; }
    try {
      renderFrame();
    } catch (e) { return; }
    frames++;
    if (!slowNotified && now - fpsStart > 4000) {
      const fps = frames / ((now - fpsStart) / 1000);
      if (fps < 24) { slowNotified = true; onSlow(); return; }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  return {
    ok: true,
    dispose: function () {
      running = false;
      document.removeEventListener('visibilitychange', onVis);
      cleanup();
    },
    setPaused: function (p) {
      running = !p;
      if (running) { lastTime = performance.now(); requestAnimationFrame(animate); }
    }
  };
}
