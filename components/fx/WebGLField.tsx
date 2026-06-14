"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cursor- and scroll-reactive volumetric particle lattice.
 * The signature "core". Additive cyan/violet points in 3D depth, a ripple
 * that follows the pointer, camera parallax, and a scroll-driven push-back.
 * Reduced-motion renders a single static frame. Pauses when offscreen/hidden.
 */
export function WebGLField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL — CSS gradient + grid behind still looks good
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    let w = mount.clientWidth || window.innerWidth;
    let h = mount.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 14);

    const COLS = 130;
    const ROWS = 76;
    const COUNT = COLS * ROWS;
    const positions = new Float32Array(COUNT * 3);
    const aPhase = new Float32Array(COUNT);
    const aRand = new Float32Array(COUNT);
    const spanX = 40;
    const spanY = 24;
    let i = 0;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        positions[i * 3] = (x / (COLS - 1) - 0.5) * spanX;
        positions[i * 3 + 1] = (y / (ROWS - 1) - 0.5) * spanY;
        positions[i * 3 + 2] = 0;
        aPhase[i] = Math.random() * Math.PI * 2;
        aRand[i] = Math.random();
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(aRand, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color("#28d7e7") },
      uColorB: { value: new THREE.Color("#8f7bf5") },
      uDpr: { value: dpr },
    };

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uDpr;
        attribute float aPhase; attribute float aRand;
        varying float vGlow; varying float vMix;
        void main() {
          vec3 p = position;
          float t = uTime * 0.5;
          float wave = sin(p.x * 0.25 + t + aPhase) * cos(p.y * 0.30 - t * 0.8 + aPhase);
          p.z += wave * 1.8;
          vec2 m = uMouse * vec2(20.0, 12.0);
          float d = distance(p.xy, m);
          // Spotlight of importance: tight bright cyan core at the cursor, quick falloff.
          float focus = exp(-d * d * 0.04);
          // Lift the field toward the cursor for a subtle 3D bulge.
          float ripple = exp(-d * 0.30) * 1.2;
          p.z += ripple + focus * 1.8;
          p.z -= uScroll * 7.0;
          p.y += uScroll * 2.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float size = (1.7 + aRand * 1.8) * uDpr;
          gl_PointSize = size * (12.0 / -mv.z) * (1.0 + focus * 2.0);
          vGlow = clamp(0.22 + wave * 0.30 + focus * 2.1, 0.0, 2.25);
          vMix = clamp((p.z + 4.0) / 10.0, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColorA; uniform vec3 uColorB;
        varying float vGlow; varying float vMix;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float dd = length(c);
          if (dd > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dd);
          // Stay in the cyan/violet family; brightness comes from glow, never white.
          vec3 col = mix(uColorA, uColorB, vMix * 0.55);
          gl_FragColor = vec4(col * vGlow, alpha * (0.32 + vGlow * 0.4));
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    let scrollT = 0;
    let targetScroll = 0;
    const onScroll = () => {
      targetScroll = Math.min(window.scrollY / window.innerHeight, 1.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      w = mount.clientWidth || window.innerWidth;
      h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const render = () => {
      const el = clock.getElapsedTime();
      mouse.lerp(targetMouse, 0.06);
      scrollT += (targetScroll - scrollT) * 0.08;
      uniforms.uTime.value = el;
      uniforms.uMouse.value.copy(mouse);
      uniforms.uScroll.value = scrollT;
      camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    if (reduce) {
      render();
    } else {
      const loop = () => {
        if (visible && !document.hidden) render();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
