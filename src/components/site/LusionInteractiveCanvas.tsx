import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { audioEngine } from "@/lib/audioExperience";
import { Sparkles, RotateCw, Volume2, Waves, Box, Disc3, Compass } from "lucide-react";

type LusionInteractiveCanvasProps = { className?: string };

type ShaderPreset = "gold" | "chrome" | "quantum";
type SilhouettePreset = "mobius" | "astrolabe" | "helix";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uMotion;
  uniform float uMode;
  uniform float uShockwaveTime;
  uniform vec3 uShockwaveOrigin;
  uniform float uAudioPulse;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying float vDisplacement;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod289(Pi0); Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - 1.0;
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0); vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1); vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
    g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
    g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
    float n000 = dot(g000,Pf0); float n100 = dot(g100,vec3(Pf1.x,Pf0.yz));
    float n010 = dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)); float n110 = dot(g110,vec3(Pf1.xy,Pf0.z));
    float n001 = dot(g001,vec3(Pf0.xy,Pf1.z)); float n101 = dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
    float n011 = dot(g011,vec3(Pf0.x,Pf1.yz)); float n111 = dot(g111,Pf1);
    vec3 f = Pf0*Pf0*Pf0*(Pf0*(Pf0*6.0-15.0)+10.0);
    vec4 nz = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),f.z);
    vec2 nyz = mix(nz.xy,nz.zw,f.y);
    return 2.2 * mix(nyz.x,nyz.y,f.x);
  }

  void main() {
    vUv = uv;
    float t = uTime * uMotion;
    
    // Multi-octave organic ribbon turbulence
    float broad = cnoise(position * 1.05 + vec3(t * 0.18, -t * 0.12, t * 0.14));
    float detail = cnoise(position * 2.4 - vec3(t * 0.12, t * 0.15, -t * 0.09));
    float fine = cnoise(position * 4.8 + vec3(-t * 0.07, t * 0.09, t * 0.06));
    
    // Pointer proximity pull
    vec3 pointerVector = vec3(uPointer * 1.35, 0.0);
    float proximity = exp(-length(position - pointerVector) * 1.35);
    
    // Interactive Shockwave ripple
    float shockDist = length(position - uShockwaveOrigin);
    float ripple = sin(shockDist * 14.0 - uShockwaveTime * 18.0) * exp(-shockDist * 1.6) * exp(-uShockwaveTime * 2.5);
    ripple = clamp(ripple, -0.45, 0.45);

    float audioFactor = 1.0 + uAudioPulse * 0.35;
    float displacement = (broad * 0.18 + detail * 0.065 + fine * 0.015 + proximity * 0.09 + ripple * 0.26) * audioFactor;
    
    vec3 displaced = position + normal * displacement;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mv.xyz;
    vWorldPosition = (modelMatrix * vec4(displaced, 1.0)).xyz;
    vDisplacement = displacement;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uMode;
  uniform vec3 uGold;
  uniform vec3 uIvory;
  uniform vec3 uInk;
  uniform float uAudioPulse;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying float vDisplacement;
  varying vec2 vUv;

  void main() {
    // True micro-surface normal derivation in screen space
    vec3 faceN = normalize(cross(dFdx(vWorldPosition), dFdy(vWorldPosition)));
    vec3 N = normalize(mix(normalize(vNormal), faceN, 0.3));
    if (!gl_FrontFacing) N = -N;

    vec3 V = normalize(vViewPosition);

    // Studio 3-Point Cinematic Lighting
    vec3 L1 = normalize(vec3(-0.75, 0.85, 1.2));  // Key Studio Warm Light
    vec3 L2 = normalize(vec3(0.95, -0.25, 0.7));  // Fill Studio Soft Light
    vec3 L3 = normalize(vec3(0.0, -1.0, -0.8));   // Subsurface Rim Bounce

    float ndv = max(dot(N, V), 0.0);

    // Multi-spectral chromatic dispersion on grazing rim (warm champagne gold)
    float fresnelR = pow(1.0 - ndv, 3.6);
    float fresnelG = pow(1.0 - ndv, 3.1);
    float fresnelB = pow(1.0 - ndv, 2.5);
    vec3 chromaticFresnel = vec3(fresnelR * 1.05, fresnelG * 0.92, fresnelB * 0.65);

    // Micro-facet specular highlights
    vec3 H1 = normalize(L1 + V);
    float spec1 = pow(max(dot(N, H1), 0.0), 96.0);

    vec3 H2 = normalize(L2 + V);
    float spec2 = pow(max(dot(N, H2), 0.0), 42.0);

    float rim = pow(max(dot(N, L1), 0.0), 1.6);
    float bounce = pow(max(dot(N, L3), 0.0), 2.0);
    float contour = smoothstep(-0.1, 0.2, vDisplacement);

    vec3 body = vec3(0.0);

    // MODE 0: SIGNATURE MOLTEN OBSIDIAN & CHAMPAGNE GOLD (ULTRA-LUXE)
    if (uMode < 0.5) {
      // Deep obsidian core with subtle beer's law absorption
      vec3 obsidianBase = mix(uInk, vec3(0.015, 0.018, 0.024), contour * 0.4);
      
      // Warm champagne gold grazing rim with chromatic dispersion
      vec3 champagneGold = vec3(0.86, 0.72, 0.42);
      vec3 goldSheen = champagneGold * chromaticFresnel * 1.35;
      
      // Studio glints
      vec3 specularHighlight = uIvory * (spec1 * 3.6 + spec2 * 0.55);
      
      // Subtle iridescent sheen across curvature
      float irid = sin(vDisplacement * 16.0 + uTime * 0.6) * 0.5 + 0.5;
      vec3 iridAccent = mix(champagneGold * 0.4, vec3(0.98, 0.85, 0.52), irid) * pow(1.0 - ndv, 4.0);

      body = obsidianBase + goldSheen + specularHighlight + iridAccent;
      body += champagneGold * bounce * 0.15;
      body += champagneGold * rim * 0.1;
    }
    // MODE 1: LIQUID CHROMIUM PRISM
    else if (uMode < 1.5) {
      vec3 liquidChrome = mix(vec3(0.12, 0.12, 0.14), vec3(0.85, 0.83, 0.78), chromaticFresnel.r * 0.85);
      vec3 chromeHighlight = vec3(1.0, 0.98, 0.94) * (spec1 * 3.8 + spec2 * 0.9);
      body = liquidChrome + chromeHighlight + uGold * rim * 0.35;
    }
    // MODE 2: QUANTUM SUPERNOVA LATTICE
    else {
      vec3 energyLattice = mix(vec3(0.015, 0.018, 0.024), uGold * 0.42, contour * 0.75);
      body = energyLattice + uGold * chromaticFresnel * 1.85;
      body += vec3(1.0, 0.96, 0.88) * spec1 * 3.0;
      body += vec3(0.28, 0.24, 0.18) * spec2;
    }

    if (uAudioPulse > 0.02) {
      body += uGold * uAudioPulse * 0.24;
    }

    float edge = smoothstep(0.0, 0.24, ndv);
    float alpha = mix(0.94, 1.0, edge);
    gl_FragColor = vec4(body, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function LusionInteractiveCanvas({ className = "" }: LusionInteractiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [mode, setMode] = useState<ShaderPreset>(() => {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("shader");
      if (q === "chrome" || q === "quantum" || q === "gold") return q;
    }
    return "gold";
  });
  const [silhouette, setSilhouette] = useState<SilhouettePreset>(() => {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("silhouette");
      if (q === "astrolabe" || q === "helix" || q === "mobius") return q;
    }
    return "mobius";
  });
  const [audioActive, setAudioActive] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [fps, setFps] = useState(0);
  const [shockwaveCount, setShockwaveCount] = useState(0);

  // References to communicate with WebGL loop
  const uniformsRef = useRef<THREE.ShaderMaterial["uniforms"] | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const shellMeshRef = useRef<THREE.Mesh | null>(null);
  const triggerShockwaveRef = useRef<(() => void) | null>(null);
  const resetCameraRef = useRef<(() => void) | null>(null);

  // Client-side mount initialization
  useEffect(() => {
    setMounted(true);
    setAudioActive(audioEngine.active);
    return audioEngine.subscribe((active) => setAudioActive(active));
  }, []);

  // Update mode uniform
  useEffect(() => {
    if (uniformsRef.current) {
      const modeVal = mode === "gold" ? 0.0 : mode === "chrome" ? 1.0 : 2.0;
      uniformsRef.current.uMode.value = modeVal;
    }
    if (materialRef.current) {
      materialRef.current.wireframe = wireframe;
    }
  }, [mode, wireframe]);

  // Update silhouette geometry dynamically
  useEffect(() => {
    const core = coreMeshRef.current;
    const shell = shellMeshRef.current;
    if (!core) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (silhouette === "mobius") {
      core.geometry.dispose();
      core.geometry = new THREE.TorusKnotGeometry(
        1.36,
        0.38,
        coarsePointer ? 160 : 280,
        coarsePointer ? 36 : 64,
        2,
        3
      );
      if (shell) {
        shell.geometry.dispose();
        shell.geometry = new THREE.TorusKnotGeometry(
          1.44,
          0.39,
          coarsePointer ? 80 : 160,
          24,
          2,
          3
        );
      }
    } else if (silhouette === "astrolabe") {
      core.geometry.dispose();
      core.geometry = new THREE.IcosahedronGeometry(1.42, coarsePointer ? 2 : 3);
      if (shell) {
        shell.geometry.dispose();
        shell.geometry = new THREE.IcosahedronGeometry(1.68, 1);
      }
    } else if (silhouette === "helix") {
      core.geometry.dispose();
      core.geometry = new THREE.TorusKnotGeometry(
        1.46,
        0.28,
        coarsePointer ? 160 : 300,
        coarsePointer ? 36 : 48,
        3,
        5
      );
      if (shell) {
        shell.geometry.dispose();
        shell.geometry = new THREE.TorusKnotGeometry(
          1.54,
          0.3,
          coarsePointer ? 80 : 160,
          20,
          3,
          5
        );
      }
    }
  }, [silhouette]);

  useEffect(() => {
    const container = containerRef.current;
    const canvasHost = canvasHostRef.current;
    if (!container || !canvasHost) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let disposed = false;
    let visible = true;
    let pageVisible = !document.hidden;
    let width = Math.max(container.clientWidth, 1);
    let height = Math.max(container.clientHeight, 1);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !coarsePointer.matches,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      });
    } catch (error) {
      console.warn("XR 3D WebGL stage unavailable, fallback active:", error);
      setWebglReady(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, coarsePointer.matches ? 7.5 : 7.2);

    const pixelRatio = () => Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.35 : 1.8);
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.domElement.className = "lusion-webgl-canvas cursor-grab active:cursor-grabbing w-full h-full";
    renderer.domElement.setAttribute("aria-hidden", "true");
    canvasHost.appendChild(renderer.domElement);
    setWebglReady(true);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uMotion: { value: reducedMotion.matches ? 0 : 1 },
      uMode: { value: mode === "gold" ? 0.0 : mode === "chrome" ? 1.0 : 2.0 },
      uShockwaveTime: { value: 10.0 },
      uShockwaveOrigin: { value: new THREE.Vector3(0, 0, 1.8) },
      uAudioPulse: { value: 0.0 },
      uGold: { value: new THREE.Color("#d4af37") },
      uIvory: { value: new THREE.Color("#f8f1e0") },
      uInk: { value: new THREE.Color("#030406") },
    };
    uniformsRef.current = uniforms;

    const createGeometry = (sil: SilhouettePreset) => {
      if (sil === "astrolabe") {
        return new THREE.IcosahedronGeometry(1.42, coarsePointer.matches ? 2 : 3);
      }
      if (sil === "helix") {
        return new THREE.TorusKnotGeometry(
          1.46,
          0.28,
          coarsePointer.matches ? 160 : 300,
          coarsePointer.matches ? 36 : 48,
          3,
          5
        );
      }
      return new THREE.TorusKnotGeometry(
        1.36,
        0.38,
        coarsePointer.matches ? 160 : 280,
        coarsePointer.matches ? 36 : 64,
        2,
        3
      );
    };

    const geometry = createGeometry(silhouette);

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: true,
      side: THREE.FrontSide,
    });
    materialRef.current = material;

    const artwork = new THREE.Group();
    artwork.scale.setScalar(coarsePointer.matches ? 0.62 : 0.58);
    artwork.position.x = coarsePointer.matches ? 0 : 1.55;
    scene.add(artwork);

    // 1. Core Kinetic Sculpture
    const core = new THREE.Mesh(geometry, material);
    coreMeshRef.current = core;
    artwork.add(core);

    // 2. Inner Luminous Core (Energy heart)
    const innerCoreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#e5c158"),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerCore = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 24), innerCoreMaterial);
    artwork.add(innerCore);

    // 3. Fine Golden Wire Cage
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: "#d4af37",
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const createShellGeometry = (sil: SilhouettePreset) => {
      if (sil === "astrolabe") {
        return new THREE.IcosahedronGeometry(1.68, 1);
      }
      if (sil === "helix") {
        return new THREE.TorusKnotGeometry(
          1.54,
          0.3,
          coarsePointer.matches ? 80 : 160,
          20,
          3,
          5
        );
      }
      return new THREE.TorusKnotGeometry(
        1.44,
        0.39,
        coarsePointer.matches ? 80 : 160,
        24,
        2,
        3
      );
    };
    const shellGeometry = createShellGeometry(silhouette);
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shellMeshRef.current = shell;
    artwork.add(shell);

    // 4. Astrolabe Precision Gimbal Rings
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d4af37"),
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Primary Celestial Orbit Ring
    const orbitA = new THREE.Mesh(new THREE.TorusGeometry(2.32, 0.007, 8, 240), orbitMaterial);
    orbitA.rotation.set(1.08, 0.18, -0.34);
    artwork.add(orbitA);

    // Secondary Equatorial Orbit Ring
    const orbitBMaterial = orbitMaterial.clone();
    orbitBMaterial.opacity = 0.22;
    const orbitB = new THREE.Mesh(new THREE.TorusGeometry(2.52, 0.005, 8, 240), orbitBMaterial);
    orbitB.rotation.set(0.34, 1.18, 0.56);
    artwork.add(orbitB);

    // Tertiary Astrolabe Horizon Ring
    const orbitCMaterial = orbitMaterial.clone();
    orbitCMaterial.opacity = 0.14;
    const orbitC = new THREE.Mesh(new THREE.TorusGeometry(2.72, 0.004, 8, 240), orbitCMaterial);
    orbitC.rotation.set(-0.48, 0.26, 1.42);
    artwork.add(orbitC);

    // 5. Cinematic Golden Volumetric Embers / Stardust Field
    const particleCount = coarsePointer.matches ? 180 : 580;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi) * 0.75;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: "#e8d3a8",
      size: coarsePointer.matches ? 0.022 : 0.026,
      transparent: true,
      opacity: 0.82,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    artwork.add(particles);

    // Pointer & Drag Physics
    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      target.y = THREE.MathUtils.clamp(-(((e.clientY - rect.top) / rect.height) * 2 - 1), -1, 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        rotVelY += deltaX * 0.0055;
        rotVelX += deltaY * 0.0055;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Trigger shockwave function
    const triggerShockwave = (x = 0, y = 0) => {
      uniforms.uShockwaveTime.value = 0.0;
      uniforms.uShockwaveOrigin.value.set(x * 1.8, y * 1.8, 1.6);
      audioEngine.playShockwave();
      setShockwaveCount((c) => c + 1);
    };
    triggerShockwaveRef.current = () => triggerShockwave(0, 0);

    const resetCamera = () => {
      core.rotation.set(0, 0, 0);
      rotVelX = 0;
      rotVelY = 0;
      audioEngine.playChime(660, 0.03, 0.5);
    };
    resetCameraRef.current = resetCamera;

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      triggerShockwave(nx, ny);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("click", onClick);

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible && visible && !disposed && !frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resize = () => {
      const nextWidth = Math.max(container.clientWidth, 1);
      const nextHeight = Math.max(container.clientHeight, 1);
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer?.setSize(width, height);
      renderer?.setPixelRatio(pixelRatio());
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && pageVisible && !disposed && !frameId) frameId = requestAnimationFrame(animate);
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    // Animation & FPS Tracker
    const animationStart = performance.now();
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      frameId = 0;
      if (disposed || !visible || !pageVisible || !renderer) return;

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const elapsed = (now - animationStart) / 1000;

      // Track FPS
      frameCount++;
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      pointer.lerp(target, 0.055);
      uniforms.uTime.value = elapsed;
      uniforms.uPointer.value.copy(pointer);
      uniforms.uShockwaveTime.value += delta;

      // Audio beat simulation if active
      if (audioEngine.active) {
        const beat = (Math.sin(elapsed * 2.8) + 1.0) * 0.5;
        uniforms.uAudioPulse.value = beat * 0.35;
      } else {
        uniforms.uAudioPulse.value = 0.0;
      }

      // Physics momentum rotation
      core.rotation.y += rotVelY + (reducedMotion.matches ? 0 : 0.0038);
      core.rotation.x += rotVelX;
      core.rotation.z = Math.sin(elapsed * 0.14) * 0.04;

      if (shell) {
        shell.rotation.y = -core.rotation.y * 0.28 + elapsed * 0.015;
        shell.rotation.x = -core.rotation.x * 0.25;
      }

      // Inner radiant heart pulsing
      innerCore.scale.setScalar(1.0 + Math.sin(elapsed * 2.2) * 0.08);

      // Organic drift towards pointer
      core.position.x = THREE.MathUtils.lerp(core.position.x, pointer.x * 0.28, 0.045);
      core.position.y = THREE.MathUtils.lerp(core.position.y, pointer.y * 0.3, 0.045);
      orbitA.position.copy(core.position);
      orbitB.position.copy(core.position);
      orbitC.position.copy(core.position);
      innerCore.position.copy(core.position);

      // Friction damping
      rotVelX *= 0.93;
      rotVelY *= 0.93;

      // Counter-rotating astrolabe rings
      orbitA.rotation.z += reducedMotion.matches ? 0 : 0.00075;
      orbitB.rotation.x -= reducedMotion.matches ? 0 : 0.00048;
      orbitC.rotation.y += reducedMotion.matches ? 0 : 0.00035;

      // Embers floating
      particles.rotation.y = elapsed * 0.016;
      particles.rotation.x = Math.sin(elapsed * 0.09) * 0.04;

      // Cinematic camera gentle breathing drift
      const camDriftX = Math.sin(elapsed * 0.2) * 0.08;
      const camDriftY = Math.cos(elapsed * 0.16) * 0.06;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, camDriftX + pointer.x * 0.35, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camDriftY + pointer.y * 0.25, 0.03);
      camera.lookAt(artwork.position.x * 0.25, 0, 0);

      renderer.render(scene, camera);
      if (!reducedMotion.matches) frameId = requestAnimationFrame(animate);
    };

    if (visible && pageVisible) frameId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      orbitCMaterial.dispose();
      orbitBMaterial.dispose();
      orbitMaterial.dispose();
      particleMaterial.dispose();
      innerCoreMaterial.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`lusion-stage relative isolate h-full w-full overflow-hidden select-none bg-[#030406] ${className}`}
      role="region"
      aria-label="Sculpture 3D interactive en temps réel WebGL"
    >
      {/* Ambient Halos */}
      <div className="lusion-stage-glow pointer-events-none" aria-hidden="true" />
      <div className="lusion-stage-vignette pointer-events-none" aria-hidden="true" />
      <div className="lusion-stage-grain pointer-events-none" aria-hidden="true" />
      {!webglReady && <div className="lusion-fallback" aria-hidden="true" />}

      {/* Canvas Mount Host */}
      <div ref={canvasHostRef} className="absolute inset-0 z-10" />

      {/* ── TOP HUD CONTROLS: Silhouette & Shader Presets & Telemetry ── */}
      {mounted && (
        <div className="absolute top-44 right-5 sm:right-8 lg:right-14 z-30 hidden sm:flex flex-col items-end gap-2 text-[10px] font-mono pointer-events-none animate-in fade-in duration-300">
          
          {/* Row 1: Silhouette Architecture Selector */}
          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-[#090b10]/90 p-1 backdrop-blur-xl shadow-2xl">
            <span className="px-2 text-[8px] font-bold uppercase tracking-wider text-white/40">Silhouettes:</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSilhouette("mobius");
                audioEngine.playChime(440, 0.03, 0.4);
              }}
              className={`rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-wider uppercase transition inline-flex items-center gap-1.5 ${
                silhouette === "mobius"
                  ? "bg-[#d4af37] text-[#030406] shadow-[0_0_12px_#d4af37]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Disc3 className="h-2.5 w-2.5" />
              01 Möbius Knot
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSilhouette("astrolabe");
                audioEngine.playChime(554, 0.03, 0.4);
              }}
              className={`rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-wider uppercase transition inline-flex items-center gap-1.5 ${
                silhouette === "astrolabe"
                  ? "bg-[#d4af37] text-[#030406] shadow-[0_0_12px_#d4af37]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Compass className="h-2.5 w-2.5" />
              02 Astrolabe
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSilhouette("helix");
                audioEngine.playChime(659, 0.03, 0.4);
              }}
              className={`rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-wider uppercase transition inline-flex items-center gap-1.5 ${
                silhouette === "helix"
                  ? "bg-[#d4af37] text-[#030406] shadow-[0_0_12px_#d4af37]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Box className="h-2.5 w-2.5" />
              03 Quantum Helix
            </button>
          </div>

          {/* Row 2: Material & Optical Shader Presets */}
          <div className="flex items-center gap-2">
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-[#090b10]/90 p-1 backdrop-blur-xl shadow-2xl">
              <span className="px-2 text-[8px] font-bold uppercase tracking-wider text-white/40">Shaders:</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("gold");
                  audioEngine.playChime(528, 0.03, 0.4);
                }}
                className={`rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-wider uppercase transition ${
                  mode === "gold" ? "bg-[#d4af37] text-[#030406] shadow-[0_0_12px_#d4af37]" : "text-white/70 hover:text-white"
                }`}
              >
                Molten Gold
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("chrome");
                  audioEngine.playChime(660, 0.03, 0.4);
                }}
                className={`rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-wider uppercase transition ${
                  mode === "chrome" ? "bg-white text-[#030406] shadow-[0_0_12px_white]" : "text-white/70 hover:text-white"
                }`}
              >
                Chrome Prism
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("quantum");
                  audioEngine.playChime(792, 0.03, 0.4);
                }}
                className={`rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-wider uppercase transition ${
                  mode === "quantum" ? "bg-[#d9c39b] text-[#030406] shadow-[0_0_12px_#d9c39b]" : "text-white/70 hover:text-white"
                }`}
              >
                Quantum Energy
              </button>
            </div>

            {/* Live Telemetry Badge */}
            <div className="pointer-events-auto hidden xl:flex items-center gap-2 rounded-full border border-white/10 bg-[#090b10]/80 px-3 py-1 text-white/60 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{fps > 0 ? `${fps} FPS` : "60 FPS"}</span>
              <span className="opacity-30">|</span>
              <span className="text-[#d4af37]">CINEMA 3D</span>
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM HUD CONTROLS: Action Buttons & Physical Hints ── */}
      {mounted && (
        <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 z-30 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono pointer-events-none animate-in fade-in duration-300">
          {/* Interaction hints */}
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-[#090b10]/85 px-3.5 py-1.5 text-white/70 backdrop-blur-xl shadow-2xl">
            <Waves className="h-3 w-3 text-[#d4af37]" />
            <span className="hidden sm:inline">ORBITER 360° · CLIQUEZ POUR ONDE DE CHOC</span>
            <span className="sm:hidden">TOURNER 360°</span>
            {shockwaveCount > 0 && <span className="text-[#d4af37] font-bold">[{shockwaveCount} ONDES]</span>}
          </div>

          {/* Action Tools */}
          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setWireframe((w) => !w);
                audioEngine.playChime(440, 0.03, 0.3);
              }}
              className={`rounded-full border border-white/12 bg-[#090b10]/85 px-2.5 py-1 text-[9px] font-bold uppercase transition backdrop-blur-md ${
                wireframe ? "border-[#d4af37] text-[#d4af37]" : "text-white/70 hover:text-white"
              }`}
              title="Basculer le maillage fil de fer"
            >
              LATTICE [{wireframe ? "ON" : "OFF"}]
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerShockwaveRef.current?.();
              }}
              className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 px-3 py-1 text-[9px] font-bold text-[#d4af37] uppercase transition hover:bg-[#d4af37]/25 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              title="Générer une onde de choc"
            >
              ONDE DE CHOC
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetCameraRef.current?.();
              }}
              className="grid h-7 w-7 place-items-center rounded-full border border-white/12 bg-[#090b10]/85 text-white/70 transition hover:text-white backdrop-blur-md"
              title="Réinitialiser l'angle de vue"
            >
              <RotateCw className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
