"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Meteor = {
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
};

export default function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = window.innerWidth;
    const quality = width >= 1440 ? "high" : width >= 900 ? "mid" : "low";
    const starCount = quality === "high" ? 1800 : quality === "mid" ? 1200 : 700;
    const meteorChance = reducedMotion ? 0.0004 : quality === "high" ? 0.006 : 0.0035;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.00085);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2200);
    camera.position.z = 580;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === "high" ? 2 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2200;
      positions[i3 + 1] = (Math.random() - 0.5) * 1500;
      positions[i3 + 2] = (Math.random() - 0.5) * 1800;

      const intensity = 0.7 + Math.random() * 0.3;
      colors[i3] = intensity;
      colors[i3 + 1] = intensity;
      colors[i3 + 2] = intensity;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: quality === "low" ? 1.2 : 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const meteors: Meteor[] = [];
    const baseDirection = new THREE.Vector3(-1, -0.55, 0).normalize();

    const spawnMeteor = () => {
      const start = new THREE.Vector3(
        (Math.random() - 0.1) * 1200,
        420 + Math.random() * 380,
        -200 + Math.random() * 400,
      );
      const tail = start.clone().add(baseDirection.clone().multiplyScalar(90 + Math.random() * 60));

      const geometry = new THREE.BufferGeometry().setFromPoints([start, tail]);
      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);

      const speed = 9 + Math.random() * 8;
      meteors.push({
        line,
        velocity: baseDirection.clone().multiplyScalar(speed),
        life: 0,
        maxLife: 42 + Math.random() * 24,
      });
    };

    const mouseTarget = { x: 0, y: 0 };
    const cameraCurrent = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      mouseTarget.x = nx * 26;
      mouseTarget.y = -ny * 16;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      cameraCurrent.x += (mouseTarget.x - cameraCurrent.x) * 0.04;
      cameraCurrent.y += (mouseTarget.y - cameraCurrent.y) * 0.04;

      camera.position.x = cameraCurrent.x;
      camera.position.y = cameraCurrent.y;
      camera.lookAt(0, 0, 0);

      if (Math.random() < meteorChance) spawnMeteor();

      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const m = meteors[i];
        m.life += 1;

        const g = m.line.geometry;
        const arr = (g.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;

        arr[0] += m.velocity.x;
        arr[1] += m.velocity.y;
        arr[2] += m.velocity.z;
        arr[3] += m.velocity.x;
        arr[4] += m.velocity.y;
        arr[5] += m.velocity.z;

        (g.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
        m.line.material.opacity = Math.max(0, 0.92 - m.life / m.maxLife);

        if (m.life >= m.maxLife || arr[1] < -620) {
          scene.remove(m.line);
          m.line.geometry.dispose();
          m.line.material.dispose();
          meteors.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);

      meteors.forEach((m) => {
        scene.remove(m.line);
        m.line.geometry.dispose();
        m.line.material.dispose();
      });

      scene.remove(stars);
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
