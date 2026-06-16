"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cursor- and scroll-reactive volumetric particle TUNNEL.
 * Particles fill a 3D depth slab; scrolling dollies through it (z-axis travel),
 * near points rushing past while far ones fade in, with a gentle constant drift
 * so it breathes at rest. A cyan focus halo tracks the pointer. Additive,
 * cyan (near) -> violet (far). Reduced-motion renders a single static frame.
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
    // Field is a full-viewport fixed layer: size from the viewport, never from
    // clientWidth (which can be 0 at mount and break the drawing buffer).
    let w = window.innerWidth;
    let h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 200);
    camera.position.set(0, 0, 0);

    const COUNT = 7000;
    const DEPTH = 60;
    const spanX = 64;
    const spanY = 42;
    const positions = new Float32Array(COUNT * 3);
    const aPhase = new Float32Array(COUNT);
    const aRand = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spanX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spanY;
      positions[i * 3 + 2] = Math.random() * DEPTH; // zBase within the depth slab
      aPhase[i] = Math.random() * Math.PI * 2;
      aRand[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(aRand, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTravel: { value: 0 },
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
        uniform float uTime; uniform vec2 uMouse; uniform float uTravel; uniform float uDpr;
        attribute float aPhase; attribute float aRand;
        varying float vGlow; varying float vMix;
        const float DEPTH = 60.0;
        void main() {
          // Depth travel: zEff decreases as uTravel grows, so points approach the camera.
          float zEff = mod(position.z - uTravel, DEPTH);
          float zPos = -(zEff + 2.0);
          vec3 p = vec3(position.x, position.y, zPos);
          // Gentle living drift in xy.
          float t = uTime * 0.4;
          p.x += sin(t + aPhase) * 0.5;
          p.y += cos(t * 0.9 + aPhase) * 0.5;
          // Cursor focus: a bright column tracking the pointer, pulled toward camera.
          vec2 m = uMouse * vec2(26.0, 16.0);
          float d = distance(p.xy, m);
          float focus = exp(-d * d * 0.03);
          p.z += focus * 2.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float size = (1.6 + aRand * 1.9) * uDpr;
          gl_PointSize = size * (16.0 / -mv.z) * (1.0 + focus * 2.0);
          // Fade out as points reach the camera, fade in from the far plane.
          float fade = smoothstep(0.0, 10.0, zEff) * smoothstep(DEPTH, DEPTH - 16.0, zEff);
          vGlow = clamp((0.46 + focus * 2.0) * fade, 0.0, 2.25);
          vMix = clamp(zEff / DEPTH, 0.0, 1.0);
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
          // Cyan up close, violet in the distance. Brightness via glow, never white.
          vec3 col = mix(uColorA, uColorB, vMix * 0.7);
          gl_FragColor = vec4(col * vGlow, alpha * (0.3 + vGlow * 0.4));
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

    let travel = 0;
    let targetTravel = 0;
    const onScroll = () => {
      targetTravel = window.scrollY * 0.02; // uncapped: dolly scales with full-page scroll
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
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
      travel += (targetTravel - travel) * 0.07;
      uniforms.uTime.value = el;
      uniforms.uMouse.value.copy(mouse);
      uniforms.uTravel.value = travel + el * 0.45; // scroll dolly + gentle constant drift
      camera.position.x += (mouse.x * 2.6 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.6 - camera.position.y) * 0.04;
      camera.lookAt(camera.position.x, camera.position.y, -10);
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
