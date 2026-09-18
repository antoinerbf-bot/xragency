import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dead = false;
    let frame = 0;
    let cleanups: Array<() => void> = [];

    const start = async () => {
      const T = await import("three");
      if (dead || !root.current) return;

      const host = root.current;
      host.replaceChildren();

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(26, 1, 0.1, 100);
      camera.position.set(0, 1.25, 7);
      camera.lookAt(0, 0.65, 0);

      const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

      const ambient = new T.HemisphereLight(0xbfffe9, 0x07140f, 2.3);
      scene.add(ambient);
      const key = new T.DirectionalLight(0xe7fff7, 4.5);
      key.position.set(-3, 5, 4);
      key.castShadow = true;
      scene.add(key);
      const rim = new T.PointLight(0x39e6c0, 9, 8);
      rim.position.set(3, 2, 2);
      scene.add(rim);

      const animal = new T.Group();
      animal.rotation.y = -0.18;
      scene.add(animal);

      const skin = new T.MeshPhysicalMaterial({
        color: 0x18bda5,
        roughness: 0.48,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        sheen: 0.22,
      });
      const skinDark = new T.MeshPhysicalMaterial({ color: 0x07594d, roughness: 0.52, clearcoat: 0.25 });
      const amber = new T.MeshPhysicalMaterial({ color: 0xc77a24, roughness: 0.25, clearcoat: 0.45 });
      const pupil = new T.MeshStandardMaterial({ color: 0x020302, roughness: 0.12 });
      const leafMat = new T.MeshStandardMaterial({ color: 0x0a3b2d, roughness: 0.85, side: T.DoubleSide });

      const ellipsoid = (s: [number, number, number], m: T.Material) => {
        const o = new T.Mesh(new T.SphereGeometry(1, 40, 24), m);
        o.scale.set(...s);
        o.castShadow = true;
        o.receiveShadow = true;
        return o;
      };

      const leaf = new T.Mesh(new T.CircleGeometry(2.9, 64), leafMat);
      leaf.rotation.x = -Math.PI / 2.05;
      leaf.scale.set(1.1, 0.5, 1);
      leaf.position.y = -0.55;
      animal.add(leaf);

      const body = ellipsoid([1.28, 0.72, 0.7], skin);
      body.position.set(-0.25, 0.32, 0);
      animal.add(body);

      const neck = ellipsoid([0.62, 0.65, 0.62], skinDark);
      neck.position.set(0.75, 0.48, 0);
      animal.add(neck);

      const head = ellipsoid([0.88, 0.68, 0.62], skin);
      head.position.set(1.25, 0.88, 0);
      animal.add(head);

      const crest = ellipsoid([0.48, 0.32, 0.5], skinDark);
      crest.position.set(1.2, 1.34, 0);
      animal.add(crest);

      const eyeRigs: T.Group[] = [];
      for (const z of [-0.46, 0.46]) {
        const rig = new T.Group();
        rig.position.set(1.55, 1.08, z);
        const socket = ellipsoid([0.29, 0.29, 0.29], skinDark);
        const iris = new T.Mesh(new T.SphereGeometry(0.19, 28, 18), amber);
        iris.position.z = z > 0 ? 0.17 : -0.17;
        const black = new T.Mesh(new T.SphereGeometry(0.095, 22, 14), pupil);
        black.position.z = z > 0 ? 0.32 : -0.32;
        rig.add(socket, iris, black);
        animal.add(rig);
        eyeRigs.push(rig);
      }

      const tongue = new T.Mesh(
        new T.CylinderGeometry(0.035, 0.022, 1, 16),
        new T.MeshPhysicalMaterial({ color: 0xef7184, roughness: 0.32, clearcoat: 0.35 })
      );
      tongue.rotation.z = Math.PI / 2;
      tongue.position.set(1.98, 0.72, 0);
      tongue.visible = false;
      animal.add(tongue);

      const mouse: Point = { x: 0, y: 0 };
      const smooth: Point = { x: 0, y: 0 };
      let lastMove = performance.now();
      let erratic = 0;
      let lastStrike = 0;
      let leapUntil = 0;

      const onMove = (e: PointerEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        lastMove = performance.now();
        const speed = Math.hypot(e.movementX, e.movementY);
        if (speed > 38) erratic = performance.now();
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

      const resize = () => {
        const w = Math.max(1, host.clientWidth);
        const h = Math.max(1, host.clientHeight);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      cleanups.push(() => ro.disconnect());

      const animate = (now: number) => {
        if (dead) return;
        const rect = host.getBoundingClientRect();
        const tx = Math.max(-1, Math.min(1, (mouse.x - (rect.left + rect.width * 0.56)) / Math.max(180, innerWidth * 0.42)));
        const ty = Math.max(-1, Math.min(1, (mouse.y - (rect.top + rect.height * 0.4)) / Math.max(180, innerHeight * 0.42)));
        smooth.x += (tx - smooth.x) * 0.075;
        smooth.y += (ty - smooth.y) * 0.075;

        const idle = now - lastMove > 900;
        const sx = idle ? Math.sin(now * 0.0027) * 0.1 : 0;
        const sy = idle ? Math.cos(now * 0.0019) * 0.055 : 0;
        head.rotation.y = smooth.x * 0.38 + sx;
        head.rotation.x = -smooth.y * 0.22 + sy;
        neck.rotation.y = smooth.x * 0.16;

        eyeRigs.forEach((eye, i) => {
          const sign = i === 0 ? 1 : -1;
          eye.rotation.y = smooth.x * 0.72 + sx * sign;
          eye.rotation.x = -smooth.y * 0.48 + sy;
        });

        body.scale.y = 0.72 + Math.sin(now * 0.0017) * 0.018;
        const dark = document.documentElement.classList.contains("dark");
        const base = dark ? new T.Color(0x163f9b) : new T.Color(0x18bda5);
        const glow = dark ? new T.Color(0x8d3cff) : new T.Color(0x4df3d2);
        const blend = (smooth.x + 1) * 0.5;
        skin.color.copy(base).lerp(glow, blend * 0.42);

        const mouthX = rect.left + rect.width * 0.61;
        const mouthY = rect.top + rect.height * 0.43;
        const dist = Math.hypot(mouse.x - mouthX, mouse.y - mouthY);

        if (dist < 200 && now - lastStrike > 2600) {
          lastStrike = now;
          tongue.visible = true;
          const dx = mouse.x - mouthX;
          const dy = mouse.y - mouthY;
          const len = Math.min(2.6, Math.max(0.45, Math.hypot(dx, dy) / 110));
          tongue.scale.y = len;
          tongue.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
          setTimeout(() => { tongue.visible = false; }, 300);
        }

        if (dist < 80 || (erratic && now - erratic > 1500)) {
          leapUntil = now + 850;
          erratic = 0;
        }
        const leap = Math.max(0, leapUntil - now);
        if (leap) {
          const p = 1 - leap / 850;
          animal.position.z = Math.sin(p * Math.PI) * 0.8;
          animal.position.y = Math.sin(p * Math.PI) * 0.28;
          animal.rotation.x = -Math.sin(p * Math.PI) * 0.18;
        } else {
          animal.position.set(0, 0, 0);
          animal.rotation.x = 0;
        }

        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    };

    start();
    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <div ref={root} className={`relative h-full w-full select-none overflow-visible ${className}`} aria-hidden />;
}
