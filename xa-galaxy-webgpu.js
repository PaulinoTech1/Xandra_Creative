/* ============================================================
   Xandra WebGPU galaxy background
   Adapted from dgreenheck/webgpu-galaxy (MIT License)
   - Three.js TSL compute-shader spiral galaxy
   - Tuned for background use: 20K stars, no bloom, no controls
   - Brand palette: purple core -> cyan edges
   - Per-star twinkle, differential rotation, scroll parallax
   - Exposes initGalaxy(canvas, opts) -> Promise<boolean>
   ============================================================ */
import * as THREE from 'three/webgpu';
import {
  uniform,
  instancedArray,
  instanceIndex,
  vec3,
  vec4,
  float,
  Fn,
  mix,
  length,
  sin,
  cos,
  uv,
  smoothstep,
  fract,
  texture
} from 'three/tsl';

/* ---------------- TSL helpers (from webgpu-galaxy helpers.js, MIT) ---------------- */
const hash = Fn(([seed]) => {
  const p = fract(seed.mul(0.1031));
  const h = p.add(19.19);
  const x = fract(h.mul(h.add(47.43)).mul(p));
  return x;
});

const rotateXZ = Fn(([position, angle]) => {
  const cosTheta = cos(angle);
  const sinTheta = sin(angle);
  const newX = position.x.mul(cosTheta).sub(position.z.mul(sinTheta));
  const newZ = position.x.mul(sinTheta).add(position.z.mul(cosTheta));
  return vec3(newX, position.y, newZ);
});

const applyDifferentialRotation = Fn(([position, rotationSpeed, deltaTime]) => {
  const distFromCenter = length(vec3(position.x, 0, position.z));
  const rotationFactor = float(1.0).div(distFromCenter.mul(0.1).add(1.0));
  const angularSpeed = rotationSpeed.mul(rotationFactor).mul(deltaTime).negate();
  return rotateXZ(position, angularSpeed);
});

const applySpringForce = Fn(([currentPos, targetPos, strength, deltaTime]) => {
  const toTarget = targetPos.sub(currentPos);
  return toTarget.mul(strength).mul(deltaTime);
});

/* ---------------- Config (background-tuned) ---------------- */
const CONFIG = {
  starCount: 20000,
  rotationSpeed: 0.12,
  spiralTightness: 1.25,
  galaxyRadius: 14.0,
  galaxyThickness: 2.6,
  armCount: 2,
  armWidth: 2.1,
  randomness: 1.7,
  particleSize: 0.055,
  starBrightness: 0.75,
  denseStarColor: '#c084fc',   // purple core
  sparseStarColor: '#67e8f9',  // cyan edges
  cloudCount: 1200,
  cloudSize: 2.6,
  cloudOpacity: 0.05,
  cloudTintColor: '#a855f7',
  bgStarCount: 2200
};

/* ---------------- Galaxy simulation (simplified from webgpu-galaxy galaxy.js) ---------------- */
class BgGalaxy {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.COUNT = config.starCount;
    this.uniforms = {
      compute: {
        time: uniform(0),
        deltaTime: uniform(0.016),
        rotationSpeed: uniform(config.rotationSpeed)
      },
      galaxy: {
        radius: uniform(config.galaxyRadius),
        thickness: uniform(config.galaxyThickness),
        spiralTightness: uniform(config.spiralTightness),
        armCount: uniform(config.armCount),
        armWidth: uniform(config.armWidth),
        randomness: uniform(config.randomness)
      },
      visual: {
        particleSize: uniform(config.particleSize),
        cloudSize: uniform(config.cloudSize),
        cloudOpacity: uniform(config.cloudOpacity),
        starBrightness: uniform(config.starBrightness),
        denseStarColor: uniform(new THREE.Color(config.denseStarColor)),
        sparseStarColor: uniform(new THREE.Color(config.sparseStarColor)),
        cloudTintColor: uniform(new THREE.Color(config.cloudTintColor))
      }
    };
    this.initialized = false;
    this.cloudInitialized = false;
  }

  createGalaxySystem() {
    if (this.galaxy) {
      this.scene.remove(this.galaxy);
      if (this.galaxy.material) this.galaxy.material.dispose();
    }
    const COUNT = this.COUNT;
    this.spawnPositionBuffer = instancedArray(COUNT, 'vec3');
    this.originalPositionBuffer = instancedArray(COUNT, 'vec3');
    this.densityFactorBuffer = instancedArray(COUNT, 'float');
    this.twinklePhaseBuffer = instancedArray(COUNT, 'float');

    this.computeInit = Fn(() => {
      const idx = instanceIndex;
      const seed = idx.toFloat();
      const radius = hash(seed.add(1)).pow(0.5).mul(this.uniforms.galaxy.radius);
      const normalizedRadius = radius.div(this.uniforms.galaxy.radius);
      const armIndex = hash(seed.add(2)).mul(this.uniforms.galaxy.armCount).floor();
      const armAngle = armIndex.mul(6.28318).div(this.uniforms.galaxy.armCount);
      const spiralAngle = normalizedRadius.mul(this.uniforms.galaxy.spiralTightness).mul(6.28318);
      const angleOffset = hash(seed.add(3)).sub(0.5).mul(this.uniforms.galaxy.randomness);
      const radiusOffset = hash(seed.add(4)).sub(0.5).mul(this.uniforms.galaxy.armWidth);
      const angle = armAngle.add(spiralAngle).add(angleOffset);
      const offsetRadius = radius.add(radiusOffset);
      const x = cos(angle).mul(offsetRadius);
      const z = sin(angle).mul(offsetRadius);
      const thicknessFactor = float(1.0).sub(normalizedRadius).add(0.2);
      const y = hash(seed.add(5)).sub(0.5).mul(this.uniforms.galaxy.thickness).mul(thicknessFactor);
      const position = vec3(x, y, z);
      this.spawnPositionBuffer.element(idx).assign(position);
      this.originalPositionBuffer.element(idx).assign(position);
      const radialSparsity = radiusOffset.abs().div(this.uniforms.galaxy.armWidth.mul(0.5).add(0.01));
      const angularSparsity = angleOffset.abs().div(this.uniforms.galaxy.randomness.mul(0.5).add(0.01));
      const sparsityFactor = radialSparsity.add(angularSparsity).mul(0.5).min(1.0);
      this.densityFactorBuffer.element(idx).assign(sparsityFactor);
      this.twinklePhaseBuffer.element(idx).assign(hash(seed.add(8)).mul(6.28318));
    })().compute(COUNT);

    this.computeUpdate = Fn(() => {
      const idx = instanceIndex;
      const position = this.spawnPositionBuffer.element(idx).toVar();
      const originalPos = this.originalPositionBuffer.element(idx);
      const rotatedPos = applyDifferentialRotation(
        position, this.uniforms.compute.rotationSpeed, this.uniforms.compute.deltaTime
      );
      position.assign(rotatedPos);
      const rotatedOriginal = applyDifferentialRotation(
        originalPos, this.uniforms.compute.rotationSpeed, this.uniforms.compute.deltaTime
      );
      this.originalPositionBuffer.element(idx).assign(rotatedOriginal);
      const springForce = applySpringForce(position, rotatedOriginal, float(2.0), this.uniforms.compute.deltaTime);
      position.addAssign(springForce);
      this.spawnPositionBuffer.element(idx).assign(position);
    })().compute(COUNT);

    const spriteMaterial = new THREE.SpriteNodeMaterial();
    spriteMaterial.transparent = false;
    spriteMaterial.depthWrite = false;
    spriteMaterial.blending = THREE.AdditiveBlending;

    const starPos = this.spawnPositionBuffer.toAttribute();
    const densityFactor = this.densityFactorBuffer.toAttribute();
    const twinklePhase = this.twinklePhaseBuffer.toAttribute();

    const circleShape = Fn(() => {
      const center = uv().sub(0.5).mul(2.0);
      const dist = length(center);
      const alpha = smoothstep(1.0, 0.0, dist).mul(smoothstep(1.0, 0.3, dist));
      return alpha;
    })();

    // Per-star twinkle: 0.72 - 1.0 brightness oscillation
    const tw = sin(this.uniforms.compute.time.mul(1.6).add(twinklePhase)).mul(0.5).add(0.5);
    const twinkleMul = tw.mul(0.28).add(0.72);

    const starColorNode = mix(
      vec3(this.uniforms.visual.denseStarColor),
      vec3(this.uniforms.visual.sparseStarColor),
      densityFactor
    ).mul(this.uniforms.visual.starBrightness).mul(twinkleMul);

    spriteMaterial.positionNode = starPos;
    spriteMaterial.colorNode = vec4(starColorNode.x, starColorNode.y, starColorNode.z, float(1.0));
    spriteMaterial.opacityNode = circleShape;
    spriteMaterial.scaleNode = this.uniforms.visual.particleSize;

    this.galaxy = new THREE.Sprite(spriteMaterial);
    this.galaxy.count = COUNT;
    this.galaxy.frustumCulled = false;
    this.scene.add(this.galaxy);
  }

  createClouds(cloudTexture) {
    if (this.cloudPlane) {
      this.scene.remove(this.cloudPlane);
      if (this.cloudPlane.material) this.cloudPlane.material.dispose();
    }
    const CLOUD_COUNT = this.config.cloudCount;
    const cloudPositionBuffer = instancedArray(CLOUD_COUNT, 'vec3');
    const cloudOriginalPositionBuffer = instancedArray(CLOUD_COUNT, 'vec3');
    const cloudColorBuffer = instancedArray(CLOUD_COUNT, 'vec3');
    const cloudSizeBuffer = instancedArray(CLOUD_COUNT, 'float');
    const cloudRotationBuffer = instancedArray(CLOUD_COUNT, 'float');

    this.cloudInit = Fn(() => {
      const idx = instanceIndex;
      const seed = idx.toFloat().add(10000);
      const radius = hash(seed.add(1)).pow(0.7).mul(this.uniforms.galaxy.radius);
      const normalizedRadius = radius.div(this.uniforms.galaxy.radius);
      const armIndex = hash(seed.add(2)).mul(this.uniforms.galaxy.armCount).floor();
      const armAngle = armIndex.mul(6.28318).div(this.uniforms.galaxy.armCount);
      const spiralAngle = normalizedRadius.mul(this.uniforms.galaxy.spiralTightness).mul(6.28318);
      const angleOffset = hash(seed.add(3)).sub(0.5).mul(this.uniforms.galaxy.randomness);
      const radiusOffset = hash(seed.add(4)).sub(0.5).mul(this.uniforms.galaxy.armWidth);
      const angle = armAngle.add(spiralAngle).add(angleOffset);
      const offsetRadius = radius.add(radiusOffset);
      const x = cos(angle).mul(offsetRadius);
      const z = sin(angle).mul(offsetRadius);
      const thicknessFactor = float(1.0).sub(normalizedRadius).add(0.15);
      const y = hash(seed.add(5)).sub(0.5).mul(this.uniforms.galaxy.thickness).mul(thicknessFactor);
      const position = vec3(x, y, z);
      cloudPositionBuffer.element(idx).assign(position);
      cloudOriginalPositionBuffer.element(idx).assign(position);
      const tintColor = vec3(this.uniforms.visual.cloudTintColor);
      const cloudColor = tintColor.mul(float(1.0).sub(normalizedRadius.mul(0.3)));
      cloudColorBuffer.element(idx).assign(cloudColor);
      const densityFactor = float(1.0).sub(normalizedRadius.mul(0.5));
      const size = hash(seed.add(6)).mul(0.5).add(0.7).mul(densityFactor);
      cloudSizeBuffer.element(idx).assign(size);
      const rotation = hash(seed.add(7)).mul(6.28318);
      cloudRotationBuffer.element(idx).assign(rotation);
    })().compute(CLOUD_COUNT);

    this.cloudUpdate = Fn(() => {
      const idx = instanceIndex;
      const position = cloudPositionBuffer.element(idx).toVar();
      const originalPos = cloudOriginalPositionBuffer.element(idx);
      const rotatedPos = applyDifferentialRotation(
        position, this.uniforms.compute.rotationSpeed, this.uniforms.compute.deltaTime
      );
      position.assign(rotatedPos);
      const rotatedOriginal = applyDifferentialRotation(
        originalPos, this.uniforms.compute.rotationSpeed, this.uniforms.compute.deltaTime
      );
      cloudOriginalPositionBuffer.element(idx).assign(rotatedOriginal);
      const springForce = applySpringForce(position, rotatedOriginal, float(1.0), this.uniforms.compute.deltaTime);
      position.addAssign(springForce);
      cloudPositionBuffer.element(idx).assign(position);
    })().compute(CLOUD_COUNT);

    const cloudMaterial = new THREE.SpriteNodeMaterial();
    cloudMaterial.transparent = true;
    cloudMaterial.depthWrite = false;
    cloudMaterial.blending = THREE.AdditiveBlending;

    const cloudPos = cloudPositionBuffer.toAttribute();
    const cloudColor = cloudColorBuffer.toAttribute();
    const cloudSize = cloudSizeBuffer.toAttribute();
    const cloudRotation = cloudRotationBuffer.toAttribute();

    cloudMaterial.positionNode = cloudPos;
    cloudMaterial.colorNode = vec4(cloudColor.x, cloudColor.y, cloudColor.z, float(1.0));
    cloudMaterial.scaleNode = cloudSize.mul(this.uniforms.visual.cloudSize);
    cloudMaterial.rotationNode = cloudRotation;
    const cloudTextureNode = texture(cloudTexture, uv());
    cloudMaterial.opacityNode = cloudTextureNode.a.mul(this.uniforms.visual.cloudOpacity);

    this.cloudPlane = new THREE.Sprite(cloudMaterial);
    this.cloudPlane.count = CLOUD_COUNT;
    this.cloudPlane.frustumCulled = false;
    this.cloudPlane.renderOrder = -1;
    this.scene.add(this.cloudPlane);
    this.cloudInitialized = false;
  }

  async update(renderer, deltaTime) {
    if (!this.initialized) {
      await renderer.computeAsync(this.computeInit);
      this.initialized = true;
    }
    if (!this.cloudInitialized && this.cloudInit) {
      await renderer.computeAsync(this.cloudInit);
      this.cloudInitialized = true;
    }
    this.uniforms.compute.time.value += deltaTime;
    this.uniforms.compute.deltaTime.value = deltaTime;
    await renderer.computeAsync(this.computeUpdate);
    if (this.cloudUpdate) {
      await renderer.computeAsync(this.cloudUpdate);
    }
  }

  dispose() {
    if (this.galaxy) {
      this.scene.remove(this.galaxy);
      if (this.galaxy.material) this.galaxy.material.dispose();
      this.galaxy = null;
    }
    if (this.cloudPlane) {
      this.scene.remove(this.cloudPlane);
      if (this.cloudPlane.material) this.cloudPlane.material.dispose();
      this.cloudPlane = null;
    }
    this.initialized = false;
    this.cloudInitialized = false;
  }
}

/* ---------------- Procedural soft cloud texture ---------------- */
function makeCloudTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/* ---------------- Distant starry background ---------------- */
function createStarryBackground(scene, count) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 90 + Math.random() * 110;
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
    const brightness = 0.55 + Math.random() * 0.35;
    const tint = Math.random();
    if (tint < 0.15) {
      col[i * 3] = brightness * 0.75; col[i * 3 + 1] = brightness * 0.82; col[i * 3 + 2] = brightness;
    } else if (tint < 0.28) {
      col[i * 3] = brightness; col[i * 3 + 1] = brightness * 0.85; col[i * 3 + 2] = brightness * 0.72;
    } else {
      col[i * 3] = brightness; col[i * 3 + 1] = brightness; col[i * 3 + 2] = brightness;
    }
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.35, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true,
    depthWrite: false
  });
  const stars = new THREE.Points(geo, mat);
  stars.frustumCulled = false;
  scene.add(stars);
  return stars;
}

/* ---------------- Main entry: initGalaxy(canvas, opts) ---------------- */
export async function initGalaxy(canvas, opts) {
  opts = opts || {};
  const reduceMotion = !!opts.reduceMotion;

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

  const galaxy = new BgGalaxy(scene, CONFIG);
  galaxy.createGalaxySystem();
  galaxy.createClouds(makeCloudTexture());
  createStarryBackground(scene, CONFIG.bgStarCount);

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

  // Warm up: run init compute + one frame so first paint isn't empty
  try {
    await galaxy.update(renderer, 0.016);
  } catch (e) {
    cleanup();
    return false;
  }
  renderFrame();

  function renderFrame() {
    // Scroll parallax: camera drifts up slightly as page scrolls
    camera.position.y = CAM_Y + scrollY * 0.0028;
    camera.lookAt(0, -1.5, 0);
    renderer.render(scene, camera);
  }

  function cleanup() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    try { galaxy.dispose(); } catch (e) {}
    try { renderer.dispose(); } catch (e) {}
  }

  if (reduceMotion) {
    // Static single frame; no loop, no drift
    return {
      ok: true,
      dispose: cleanup,
      setPaused: function () {}
    };
  }

  let running = true;
  let lastTime = performance.now();
  const onVis = () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) {
      lastTime = performance.now();
      requestAnimationFrame(animate);
    }
  };
  document.addEventListener('visibilitychange', onVis);

  async function animate() {
    if (!running) return;
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    try {
      await galaxy.update(renderer, dt);
    } catch (e) {
      return; // GPU context lost; stop looping
    }
    renderFrame();
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
