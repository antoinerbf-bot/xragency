import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export function EyeTracker({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dead = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const T = await import("three");
      if (dead || !root.current) return;

      const host = root.current;
      host.replaceChildren();

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(24, 1, 0.1, 100);
      camera.position.set(0.1, 1.15, 7.8);
      camera.lookAt(0.35, 0.8, 0);

      const renderer = new T.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.55));
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";

      scene.add(new T.HemisphereLight(0xd8fff1, 0x07130f, 2.5));
      const key = new T.DirectionalLight(0xf2fff8, 4.2);
      key.position.set(-3, 5, 5);
      scene.add(key);
      const rim = new T.PointLight(0x3ff0c2, 8, 9);
      rim.position.set(3.2, 2.4, 3);
      scene.add(rim);

      const animal = new T.Group();
      animal.rotation.y = -0.22;
      scene.add(animal);

      const shader = {
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: `
          uniform vec3 uBase;
          uniform vec3 uAccent;
          uniform float uWave;
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            float facing = pow(max(dot(normalize(vNormal), vec3(0.25,0.7,0.65)), 0.0), 1.4);
            float wave = 0.5 + 0.5 * sin(vWorld.y * 7.0 + vWorld.x * 3.0 + uWave);
            vec3 c = mix(uBase, uAccent, clamp(facing * 0.62 + wave * 0.14, 0.0, 1.0));
            float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0,0.0,1.0)), 0.0), 3.0);
            c += vec3(0.03,0.18,0.12) * fresnel;
            gl_FragColor = vec4(c, 1.0);
          }
        `,
      };

      const skin = new T.ShaderMaterial({
        uniforms: {
          uBase: { value: new T.Color(0x12a98d) },
          uAccent: { value: new T.Color(0x78e6bd) },
          uWave: { value: 0 },
        },
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        roughness: 0.58,
      } as any);

      const darkSkin = new T.MeshPhysicalMaterial({
        color: 0x075c4b,
        roughness: 0.54,
        clearcoat: 0.28,
        clearcoatRoughness: 0.32,
      });
      const eyeSocket = new T.MeshPhysicalMaterial({ color: 0x0a463c, roughness: 0.5, clearcoat: 0.35 });
      const iris = new T.MeshPhysicalMaterial({
        color: 0xd58b28,
        roughness: 0.19,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
      });
      const pupil = new T.MeshStandardMaterial({ color: 0x020403, roughness: 0.08 });
      const mouthMat = new T.MeshStandardMaterial({ color: 0x40151b, roughness: 0.55 });
      const tongueMat = new T.MeshPhysicalMaterial({ color: 0xf27691, roughness: 0.3, clearcoat: 0.5 });
      const leafMat = new T.MeshPhysicalMaterial({ color: 0x092f25, roughness: 0.9, side: T.DoubleSide });

      const ellipsoid = (s: [number, number, number], material: T.Material) => {
        const mesh = new T.Mesh(new T.SphereGeometry(1, 32, 20), material);
        mesh.scale.set(...s);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
      };

      const leaf = new T.Mesh(new T.CircleGeometry(2.8, 48), leafMat);
      leaf.rotation.x = -Math.PI / 2.06;
      leaf.rotation.z = -0.16;
      leaf.scale.set(1.28, 0.62, 1);
      leaf.position.set(0, -0.58, 0);
      animal.add(leaf);

      const midrib = new T.Mesh(
        new T.CylinderGeometry(0.018, 0.026, 5.0, 8),
        new T.MeshStandardMaterial({ color: 0x164e39, roughness: 0.95 })
      );
      midrib.rotation.z = Math.PI / 2;
      midrib.rotation.x = -0.03;
      midrib.position.set(0, -0.51, 0.02);
      animal.add(midrib);

      const body = ellipsoid([1.48, 0.67, 0.64], skin);
      body.position.set(-0.42, 0.34, 0);
      animal.add(body);

      const belly = ellipsoid([1.18, 0.39, 0.56], darkSkin);
      belly.position.set(-0.36, 0.08, 0);
      belly.rotation.z = -0.05;
      animal.add(belly);

      const neck = ellipsoid([0.66, 0.64, 0.58], darkSkin);
      neck.position.set(0.68, 0.5, 0);
      animal.add(neck);

      const head = ellipsoid([0.91, 0.68, 0.66], skin);
      head.position.set(1.22, 0.9, 0);
      animal.add(head);

      const casque = ellipsoid([0.63, 0.33, 0.52], darkSkin);
      casque.position.set(1.16, 1.36, 0);
      casque.rotation.z = -0.1;
      animal.add(casque);

      const mouth = ellipsoid([0.55, 0.13, 0.45], mouthMat);
      mouth.position.set(1.74, 0.71, 0);
      animal.add(mouth);

      const crestMat = new T.MeshPhysicalMaterial({ color: 0x0a6e58, roughness: 0.55 });
      for (let i = 0; i < 7; i++) {
        const fin = new T.Mesh(new T.ConeGeometry(0.12, 0.42 - i * 0.025, 8), crestMat);
        fin.position.set(0.42 - i * 0.16, 1.1 + i * 0.045, 0);
        fin.rotation.z = Math.PI / 2;
        fin.rotation.y = Math.PI / 2;
        animal.add(fin);
      }

      const eyes: T.Group[] = [];
      [-0.43, 0.43].forEach((z) => {
        const turret = new T.Group();
        turret.position.set(1.42, 1.13, z);
        const socket = ellipsoid([0.31, 0.31, 0.31], eyeSocket);
        turret.add(socket);

        const dome = ellipsoid([0.24, 0.27, 0.24], iris);
        dome.position.set(0.08, 0, z > 0 ? 0.04 : -0.04);
        turret.add(dome);

        const black = ellipsoid([0.075, 0.15, 0.075], pupil);
        black.position.set(0.25, 0, z > 0 ? 0.08 : -0.08);
        turret.add(black);

        animal.add(turret);
        eyes.push(turret);
      });

      const legMat = new T.MeshPhysicalMaterial({ color: 0x0b745e, roughness: 0.66 });
      const footMat = new T.MeshStandardMaterial({ color: 0x063f35, roughness: 0.78 });
      const legJoints: T.Object3D[] = [];
      const makeLeg = (x: number, z: number, flip: number) => {
        const upper = ellipsoid([0.16, 0.48, 0.16], legMat);
        upper.position.set(x, -0.02, z);
        upper.rotation.z = flip * 0.58;
        animal.add(upper);
        const lower = ellipsoid([0.11, 0.42, 0.11], legMat);
        lower.position.set(x + flip * 0.22, -0.42, z);
        lower.rotation.z = -flip * 0.32;
        animal.add(lower);
        const foot = ellipsoid([0.25, 0.08, 0.18], footMat);
        foot.position.set(x + flip * 0.32, -0.64, z);
        animal.add(foot);
        legJoints.push(upper, lower);
      };
      makeLeg(-0.78, -0.48, -1);
      makeLeg(-0.78, 0.48, -1);
      makeLeg(0.18, -0.48, 1);
      makeLeg(0.18, 0.48, 1);

      const tail = new T.CatmullRomCurve3([
        new T.Vector3(-1.45, 0.28, 0),
        new T.Vector3(-2.0, 0.35, 0.04),
        new T.Vector3(-2.25, 0.02, 0.02),
        new T.Vector3(-1.95, -0.2, 0.0),
        new T.Vector3(-1.62, -0.08, 0.0),
      ]);
      const tailMesh = new T.Mesh(
        new T.TubeGeometry(tail, 28, 0.19, 12, false),
        skin
      );
      animal.add(tailMesh);

      const tongue = new T.Mesh(new T.CylinderGeometry(0.022, 0.012, 1, 10), tongueMat);
      tongue.visible = false;
      animal.add(tongue);

      const mouse: Point = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0 };
      let lastMove = performance.now();
      let lastStrike = -9999;
      let leapUntil = 0;
      let erratic = 0;

      const onMove = (e: PointerEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        lastMove = performance.now();
        if (Math.hypot(e.movementX, e.movementY) > 44) erratic = performance.now();
      };
      window.addEventListener("pointermove", onMove, { passive: true });

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

      const strike = (now: number, mouthX: number, mouthY: number, dist: number) => {
        if (dist >= 205 || now - lastStrike < 3000) return;
        lastStrike = now;
        tongue.visible = true;
        const dx = mouse.x - mouthX;
        const dy = mouse.y - mouthY;
        const len = Math.min(3.15, Math.max(0.65, dist / 115));
        tongue.position.set(1.95, 0.72, 0);
        tongue.scale.set(1, len, 1);
        tongue.rotation.z = Math.atan2(dx, -dy);
        window.setTimeout(() => { if (!dead) tongue.visible = false; }, 260);
      };

      const animate = (now: number) => {
        if (dead) return;
        const rect = host.getBoundingClientRect();
        const tx = Math.max(-1, Math.min(1, (mouse.x - (rect.left + rect.width * 0.58)) / Math.max(170, innerWidth * 0.38)));
        const ty = Math.max(-1, Math.min(1, (mouse.y - (rect.top + rect.height * 0.43)) / Math.max(170, innerHeight * 0.38)));
        smooth.x += (tx - smooth.x) * 0.085;
        smooth.y += (ty - smooth.y) * 0.085;

        const idle = now - lastMove > 900;
        const saccade = idle ? Math.sin(now * 0.0041) * 0.07 : 0;
        head.rotation.y = smooth.x * 0.36 + saccade;
        head.rotation.x = -smooth.y * 0.2;
        neck.rotation.y = smooth.x * 0.13;

        eyes.forEach((eye, i) => {
          const side = i === 0 ? 1 : -1;
          eye.rotation.y = smooth.x * 0.8 + Math.sin(now * 0.003 + i * 2.4) * 0.035 * side;
          eye.rotation.x = -smooth.y * 0.52;
        });

        const breath = Math.sin(now * 0.00155) * 0.025;
        body.scale.y = 0.67 + breath;
        body.scale.x = 1.48 - breath * 0.45;

        const dark = document.documentElement.classList.contains("dark");
        const base = dark ? new T.Color(0x1b48a5) : new T.Color(0x11a98c);
        const accent = dark ? new T.Color(0x934cff) : new T.Color(0x78e6bd);
        const cursorMix = (smooth.x + 1) * 0.5;
        (skin as T.ShaderMaterial).uniforms.uBase.value.lerp(base, 0.22);
        (skin as T.ShaderMaterial).uniforms.uAccent.value.lerp(accent, 0.2);
        (skin as T.ShaderMaterial).uniforms.uWave.value = now * 0.0025 + cursorMix * 4;

        const mouthX = rect.left + rect.width * 0.69;
        const mouthY = rect.top + rect.height * 0.43;
        const dist = Math.hypot(mouse.x - mouthX, mouse.y - mouthY);
        strike(now, mouthX, mouthY, dist);

        if ((dist < 82 || (erratic && now - erratic > 1500)) && now > leapUntil) {
          leapUntil = now + 720;
          erratic = 0;
        }
        const leap = Math.max(0, leapUntil - now);
        const p = leap ? 1 - leap / 720 : 0;
        animal.position.z = Math.sin(p * Math.PI) * 0.72;
        animal.position.y = leap ? Math.sin(p * Math.PI) * 0.18 : 0;
        animal.rotation.x = leap ? -Math.sin(p * Math.PI) * 0.12 : 0;

        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        ro.disconnect();
        cancelAnimationFrame(frame);
        renderer.dispose();
        host.replaceChildren();
      };
    };

    start();
    return () => {
      dead = true;
      cleanup?.();
    };
  }, []);

  return <div ref={root} className={`relative h-full w-full select-none overflow-visible ${className}`} aria-hidden />;
}
