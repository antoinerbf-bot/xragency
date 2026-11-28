import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Globe2,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  RotateCw,
} from "lucide-react";
import earthTextureUrl from "@/assets/earth_texture.jpg";
import { useLang } from "@/lib/i18n";

interface GlobalHub {
  id: string;
  city: { fr: string; en: string; vi: string };
  country: { fr: string; en: string; vi: string };
  flag: string;
  lat: number;
  lng: number;
  timezone: string;
  agentName: string;
  agentRole: { fr: string; en: string; vi: string };
  specialty: { fr: string; en: string; vi: string };
  bio: { fr: string; en: string; vi: string };
  languages: string[];
  projectsCount: string;
  badge: { fr: string; en: string; vi: string };
}

const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: "paris",
    city: { fr: "Paris", en: "Paris", vi: "Paris" },
    country: { fr: "France · Siège Europe", en: "France · Europe HQ", vi: "Pháp · Trụ sở Châu Âu" },
    flag: "🇫🇷",
    lat: 48.8566,
    lng: 2.3522,
    timezone: "UTC+1",
    agentName: "Antoine & Direction Artistique",
    agentRole: {
      fr: "Direction Générale, Stratégie 360° & Architecture IA",
      en: "Executive Direction, 360° Strategy & AI Architecture",
      vi: "Giám đốc Điều hành, Chiến lược 360° & Kiến trúc AI",
    },
    specialty: {
      fr: "Sites sur mesure, visibilité locale, logiciels / CRM et robotique",
      en: "Bespoke websites, local visibility, custom software and robotics",
      vi: "Website thiết kế riêng, hiện diện địa phương, phần mềm và robot",
    },
    bio: {
      fr: "Pilotage central des projets grands comptes et PME exigeantes en France : conception web sur mesure, stratégie de visibilité locale et déploiement de solutions robotiques.",
      en: "Central hub for demanding SMEs and enterprise clients across France: bespoke web design, local visibility strategy and robotics deployment.",
      vi: "Trung tâm điều phối chiến lược tại Pháp: thiết kế web theo yêu cầu, chiến lược hiện diện địa phương và triển khai robot dịch vụ.",
    },
    languages: ["Français", "English"],
    projectsCount: "Équipe internationale",
    badge: { fr: "QG Principal", en: "Primary HQ", vi: "Trụ sở chính" },
  },
  {
    id: "geneva",
    city: { fr: "Genève & Zurich", en: "Geneva & Zurich", vi: "Geneva & Zurich" },
    country: { fr: "Suisse", en: "Switzerland", vi: "Thụy Sĩ" },
    flag: "🇨🇭",
    lat: 46.2044,
    lng: 6.1432,
    timezone: "UTC+1",
    agentName: "Marc-Olivier V.",
    agentRole: {
      fr: "Directeur Conseil Suisse & Marques de Prestige",
      en: "Swiss Advisory Director & Luxury Brands",
      vi: "Giám đốc Tư vấn Thụy Sĩ & Thương hiệu Cao cấp",
    },
    specialty: {
      fr: "Branding Haute Horlogerie, Cliniques Privées, Immobilier & SEO International",
      en: "Luxury Branding, Private Clinics, Real Estate & International SEO",
      vi: "Branding Cao cấp, Phòng khám Tư nhân, Bất động sản & SEO Quốc tế",
    },
    bio: {
      fr: "Accompagnement dédié aux maisons suisses, cliniques esthétiques, cabinets d'affaires et groupes hôteliers de l'Arc lémanique avec une exigence de précision absolue.",
      en: "Dedicated advisory for Swiss houses, aesthetic clinics, law firms and hospitality groups across the Lake Geneva region.",
      vi: "Tư vấn chuyên biệt cho các thương hiệu Thụy Sĩ, phòng khám thẩm mỹ và tập đoàn khách sạn.",
    },
    languages: ["Français", "Deutsch", "English"],
    projectsCount: "45+ marques accompagnées",
    badge: { fr: "Hub Helvétique", en: "Swiss Hub", vi: "Hub Thụy Sĩ" },
  },
  {
    id: "dubai",
    city: { fr: "Dubaï", en: "Dubai", vi: "Dubai" },
    country: {
      fr: "Émirats Arabes Unis · MENA",
      en: "United Arab Emirates · MENA",
      vi: "UAE · Trung Đông",
    },
    flag: "🇦🇪",
    lat: 25.2048,
    lng: 55.2708,
    timezone: "UTC+4",
    agentName: "Yasmine Al-Mansoor",
    agentRole: {
      fr: "Lead MENA, Automatisation IA & Robotique Hôtelière",
      en: "MENA Lead, AI Automation & Hospitality Robotics",
      vi: "Giám đốc MENA, Tự động hóa AI & Robot Khách sạn",
    },
    specialty: {
      fr: "Showrooms Digitaux, Robots d'Accueil & Acquisition Internationale",
      en: "Digital Showrooms, Reception Robots & International Acquisition",
      vi: "Showroom Kỹ thuật số, Robot Đón tiếp & Thu hút Khách hàng Quốc tế",
    },
    bio: {
      fr: "Déploiement d'écosystèmes digitaux multilingues (FR/EN/AR), campagnes d'acquisition haute valeur et robots autonomes pour l'hôtellerie, la restauration et le retail de luxe à Dubaï.",
      en: "Deploying multilingual digital ecosystems (FR/EN/AR), high-ticket acquisition and autonomous service robots for Dubai luxury hospitality and retail.",
      vi: "Triển khai hệ sinh thái số đa ngôn ngữ và robot dịch vụ cho ngành khách sạn và bán lẻ cao cấp tại Dubai.",
    },
    languages: ["العربية", "English", "Français"],
    projectsCount: "60+ déploiements MENA",
    badge: { fr: "Hub Moyen-Orient", en: "Middle East Hub", vi: "Hub Trung Đông" },
  },
  {
    id: "london",
    city: { fr: "Londres", en: "London", vi: "London" },
    country: { fr: "Royaume-Uni", en: "United Kingdom", vi: "Vương quốc Anh" },
    flag: "🇬🇧",
    lat: 51.5074,
    lng: -0.1278,
    timezone: "UTC+0",
    agentName: "Charlotte K.",
    agentRole: {
      fr: "Head of UK Growth, SEO & Performance",
      en: "Head of UK Growth, SEO & Performance",
      vi: "Trưởng bộ phận Tăng trưởng UK, SEO & Hiệu suất",
    },
    specialty: {
      fr: "SEO Technique, Google Maps Local Pack & Logiciels Sur-Mesure",
      en: "Technical SEO, Google Maps Local Pack & Custom Software",
      vi: "SEO Kỹ thuật, Google Maps Local Pack & Phần mềm Tùy chỉnh",
    },
    bio: {
      fr: "Stratégies d'acquisition organique et locale ultra-compétitives sur le marché britannique et européen pour enseignes multi-sites et PME en forte croissance.",
      en: "Hyper-competitive organic and local acquisition strategies across the UK and European markets for multi-location brands.",
      vi: "Chiến lược tăng trưởng tự nhiên và SEO địa phương tại thị trường Anh và Châu Âu.",
    },
    languages: ["English", "Français"],
    projectsCount: "50+ campagnes UK",
    badge: { fr: "Hub Londres", en: "London Hub", vi: "Hub London" },
  },
  {
    id: "hcmc",
    city: { fr: "Hô Chi Minh-Ville", en: "Ho Chi Minh City", vi: "TP. Hồ Chí Minh" },
    country: {
      fr: "Vietnam · Studio Ingénierie",
      en: "Vietnam · Engineering Studio",
      vi: "Việt Nam · Studio Kỹ thuật",
    },
    flag: "🇻🇳",
    lat: 10.8231,
    lng: 106.6297,
    timezone: "UTC+7",
    agentName: "Minh-Quan Nguyen",
    agentRole: {
      fr: "Directeur Ingénierie Full-Stack, IA & Systèmes Sur-Mesure",
      en: "Full-Stack Engineering, AI & Custom Systems Director",
      vi: "Giám đốc Kỹ thuật Full-Stack, AI & Hệ thống Tùy chỉnh",
    },
    specialty: {
      fr: "Architecture Web Ultra-Rapide, Applications Métier, POS & Agents IA",
      en: "Ultra-Fast Web Architecture, Business Apps, POS & AI Agents",
      vi: "Kiến trúc Web Siêu tốc, Ứng dụng Doanh nghiệp, POS & AI Agents",
    },
    bio: {
      fr: "Notre pôle d'ingénierie logicielle en Asie du Sud-Est : développement continu 24h/24 d'interfaces ultra-fluides, d'outils métiers sur-mesure et d'automatisations IA.",
      en: "Our Southeast Asia software engineering hub: 24/7 continuous development of ultra-fluid interfaces, custom business tools and AI automations.",
      vi: "Trung tâm kỹ thuật phần mềm Đông Nam Á: phát triển 24/7 giao diện web tốc độ cao và giải pháp AI.",
    },
    languages: ["Tiếng Việt", "English", "Français"],
    projectsCount: "110+ architectures déployées",
    badge: { fr: "Pôle Ingénierie Asie", en: "Asia Tech Hub", vi: "Trung tâm Kỹ thuật Châu Á" },
  },
  {
    id: "singapore",
    city: { fr: "Singapour", en: "Singapore", vi: "Singapore" },
    country: { fr: "Singapour · APAC", en: "Singapore · APAC", vi: "Singapore · APAC" },
    flag: "🇸🇬",
    lat: 1.3521,
    lng: 103.8198,
    timezone: "UTC+8",
    agentName: "Elena Tan",
    agentRole: {
      fr: "Directrice Partenariats Robotique & Innovation APAC",
      en: "Robotics Partnerships & APAC Innovation Director",
      vi: "Giám đốc Đối tác Robot & Đổi mới Sáng tạo APAC",
    },
    specialty: {
      fr: "Robotique de Service, Automatisation Retail & Logistique Intelligente",
      en: "Service Robotics, Retail Automation & Smart Logistics",
      vi: "Robot Dịch vụ, Tự động hóa Bán lẻ & Logistics Thông minh",
    },
    bio: {
      fr: "Coordination avec les meilleurs laboratoires robotiques asiatiques pour sélectionner, certifier et déployer nos flottes de robots autonomes et humanoïdes.",
      en: "Coordinating with leading Asian robotics labs to source, certify and deploy our autonomous and humanoid robot fleets.",
      vi: "Hợp tác với các phòng lab robot hàng đầu Châu Á để chứng nhận và triển khai đội ngũ robot tự hành.",
    },
    languages: ["English", "中文", "Français"],
    projectsCount: "35+ flottes robotiques",
    badge: { fr: "Hub Robotique APAC", en: "APAC Robotics Hub", vi: "Hub Robot APAC" },
  },
  {
    id: "miami",
    city: { fr: "Miami & New York", en: "Miami & New York", vi: "Miami & New York" },
    country: { fr: "États-Unis", en: "United States", vi: "Hoa Kỳ" },
    flag: "🇺🇸",
    lat: 25.7617,
    lng: -80.1918,
    timezone: "UTC-5",
    agentName: "Lucas & Sarah M.",
    agentRole: {
      fr: "Expansion Nord-Américaine, Social Media & Hospitality",
      en: "North American Expansion, Social Media & Hospitality",
      vi: "Mở rộng Bắc Mỹ, Social Media & Hospitality",
    },
    specialty: {
      fr: "Social Media 4K, Acquisition Locale US & Expériences Web Immersives",
      en: "4K Social Media, US Local Acquisition & Immersive Web Experiences",
      vi: "Social Media 4K, Thu hút Khách hàng Mỹ & Web Nhập vai",
    },
    bio: {
      fr: "Accompagnement des groupes de restauration, cliniques, commerces et entrepreneurs francophones et internationaux implantés sur la côte Est américaine.",
      en: "Supporting restaurant groups, clinics, retail stores and international entrepreneurs across the US East Coast.",
      vi: "Đồng hành cùng các chuỗi nhà hàng, phòng khám et doanh nghiệp quốc tế tại bờ Đông Hoa Kỳ.",
    },
    languages: ["English", "Français", "Español"],
    projectsCount: "40+ clients US",
    badge: { fr: "Hub Amériques", en: "Americas Hub", vi: "Hub Châu Mỹ" },
  },
];

// Convert geographic coordinates to 3D sphere position (Three.js SphereGeometry UV mapping)
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

// Compute target Euler angles so the given (lat, lng) faces the camera at +Z
function getTargetRotationForHub(lat: number, lng: number): { rotX: number; rotY: number } {
  const theta = (lng + 180) * (Math.PI / 180);
  const rotY = theta - Math.PI / 2;
  const rotX = ((lat * Math.PI) / 180) * 0.65;
  return { rotX, rotY };
}

export function InteractiveGlobalTeamGlobe() {
  const { lang } = useLang();
  const l = (lang === "en" || lang === "vi" ? lang : "fr") as "fr" | "en" | "vi";
  const [selectedHubId, setSelectedHubId] = useState<string>("paris");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pinPositions, setPinPositions] = useState<
    Record<string, { x: number; y: number; visible: boolean }>
  >({});

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);

  const initialTarget = getTargetRotationForHub(GLOBAL_HUBS[0].lat, GLOBAL_HUBS[0].lng);
  const rotationRef = useRef<{
    rotX: number;
    rotY: number;
    targetX: number;
    targetY: number;
    autoRotate: boolean;
    dragging: boolean;
    dragStartX: number;
    dragStartY: number;
    startRotX: number;
    startRotY: number;
  }>({
    rotX: initialTarget.rotX,
    rotY: initialTarget.rotY,
    targetX: initialTarget.rotX,
    targetY: initialTarget.rotY,
    autoRotate: true,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    startRotX: initialTarget.rotX,
    startRotY: initialTarget.rotY,
  });

  const activeHub = GLOBAL_HUBS.find((h) => h.id === selectedHubId) ?? GLOBAL_HUBS[0];

  const focusHub = (hub: GlobalHub) => {
    setSelectedHubId(hub.id);
    const { rotX, rotY } = getTargetRotationForHub(hub.lat, hub.lng);
    // Shortest angular path around Y
    const currentY = rotationRef.current.targetY;
    let deltaY = ((rotY - currentY + Math.PI) % (Math.PI * 2)) - Math.PI;
    if (deltaY < -Math.PI) deltaY += Math.PI * 2;
    rotationRef.current.targetY = currentY + deltaY;
    rotationRef.current.targetX = Math.max(-0.85, Math.min(0.85, rotX));
    rotationRef.current.autoRotate = false;
    setAutoRotate(false);
  };

  useEffect(() => {
    rotationRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const stage = stageRef.current;
    const host = canvasHostRef.current;
    if (!stage || !host) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    let width = Math.max(stage.clientWidth, 320);
    let height = Math.max(stage.clientHeight, 320);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    host.innerHTML = "";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.45);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffe9c4, 2.2);
    sunLight.position.set(4, 2.5, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Root globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Earth Sphere with high-res satellite texture
    const RADIUS = 1.08;
    const sphereGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earthTextureUrl);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.55,
      metalness: 0.18,
      bumpScale: 0.02,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Subtle Golden Graticule Wireframe Overlay
    const wireGeo = new THREE.SphereGeometry(RADIUS * 1.003, 32, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    globeGroup.add(new THREE.Mesh(wireGeo, wireMat));

    // 3. Outer Atmospheric Fresnel Halo
    const atmosGeo = new THREE.SphereGeometry(RADIUS * 1.12, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          gl_FragColor = vec4(0.77, 0.66, 0.50, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    // 4. 3D City Beacons & Connection Arcs from Paris HQ
    const hubVectors: Record<string, THREE.Vector3> = {};
    for (const hub of GLOBAL_HUBS) {
      const vec = latLngToVector3(hub.lat, hub.lng, RADIUS);
      hubVectors[hub.id] = vec;

      // Glowing beacon sphere on surface
      const pinGeo = new THREE.SphereGeometry(0.026, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: hub.id === "paris" ? 0x10b981 : 0xe5cba4,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(vec.clone().multiplyScalar(1.01));
      globeGroup.add(pinMesh);
    }

    // Geodesic arcs from Paris to each hub
    const parisVec = hubVectors["paris"];
    for (const hub of GLOBAL_HUBS.slice(1)) {
      const targetVec = hubVectors[hub.id];
      const midPoint = parisVec.clone().add(targetVec).multiplyScalar(0.5);
      const distance = parisVec.distanceTo(targetVec);
      midPoint.normalize().multiplyScalar(RADIUS + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(parisVec, midPoint, targetVec);
      const points = curve.getPoints(44);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xc5a880,
        transparent: true,
        opacity: 0.45,
      });
      globeGroup.add(new THREE.Line(arcGeo, arcMat));
    }

    const onResize = () => {
      if (!stage || !renderer) return;
      width = Math.max(stage.clientWidth, 320);
      height = Math.max(stage.clientHeight, 320);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    let animId = 0;
    let frameCounter = 0;
    const tempVec = new THREE.Vector3();
    const worldNormal = new THREE.Vector3();
    const camDir = new THREE.Vector3();

    const animate = () => {
      animId = window.requestAnimationFrame(animate);

      const r = rotationRef.current;
      if (r.autoRotate && !r.dragging) {
        r.targetY += 0.0022;
      }

      r.rotX += (r.targetX - r.rotX) * 0.09;
      r.rotY += (r.targetY - r.rotY) * 0.09;

      globeGroup.rotation.x = r.rotX;
      globeGroup.rotation.y = r.rotY;
      globeGroup.updateMatrixWorld();

      renderer?.render(scene, camera);

      // Update projected HTML city pin overlays every 2 frames for smooth 60fps UI
      frameCounter++;
      if (frameCounter % 2 === 0) {
        const nextPins: Record<string, { x: number; y: number; visible: boolean }> = {};
        for (const hub of GLOBAL_HUBS) {
          tempVec.copy(hubVectors[hub.id]).applyMatrix4(globeGroup.matrixWorld);
          worldNormal.copy(tempVec).normalize();
          camDir.copy(camera.position).sub(tempVec).normalize();
          const facingDot = worldNormal.dot(camDir);

          tempVec.project(camera);
          const screenX = (tempVec.x * 0.5 + 0.5) * width;
          const screenY = (-tempVec.y * 0.5 + 0.5) * height;

          nextPins[hub.id] = {
            x: screenX,
            y: screenY,
            visible: facingDot > 0.12,
          };
        }
        setPinPositions(nextPins);
      }
    };

    animId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer?.dispose();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    rotationRef.current.dragging = true;
    rotationRef.current.autoRotate = false;
    setAutoRotate(false);
    rotationRef.current.dragStartX = e.clientX;
    rotationRef.current.dragStartY = e.clientY;
    rotationRef.current.startRotX = rotationRef.current.targetX;
    rotationRef.current.startRotY = rotationRef.current.targetY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rotationRef.current.dragging) return;
    const dx = e.clientX - rotationRef.current.dragStartX;
    const dy = e.clientY - rotationRef.current.dragStartY;
    rotationRef.current.targetY = rotationRef.current.startRotY + dx * 0.0065;
    rotationRef.current.targetX = Math.max(
      -0.85,
      Math.min(0.85, rotationRef.current.startRotX + dy * 0.0065),
    );
  };

  const handlePointerUp = () => {
    rotationRef.current.dragging = false;
  };

  return (
    <section
      id="global-network"
      className="relative overflow-hidden border-t border-white/10 bg-[#06070a] py-20 text-[#f8f6f0] sm:py-28"
    >
      {/* Halo atmosphérique bronze & obsidienne */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            "radial-gradient(950px circle at 25% 50%, rgba(197,168,128,0.16), transparent 70%), radial-gradient(750px circle at 80% 25%, rgba(16,185,129,0.09), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-10">
        {/* En-tête de section */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-3.5 py-1 text-[9px] font-mono uppercase tracking-[0.22em] text-[#e5cba4]">
              <Globe2 className="h-3.5 w-3.5" />
              {l === "en"
                ? "GLOBAL PRESENCE · INTERACTIVE 3D EARTH"
                : l === "vi"
                  ? "HIỆN DIỆN TOÀN CẦU · ĐỊA CẦU 3D TƯƠNG TÁC"
                  : "PRÉSENCE MONDIALE · GLOBE TERRESTRE 3D INTERACTIF"}
            </div>
            <h2 className="display-serif text-3xl font-normal tracking-tight text-white sm:text-5xl">
              {l === "en"
                ? "Click on a city on the 3D globe to meet our local XR Agency agents."
                : l === "vi"
                  ? "Nhấp vào từng thành phố trên quả địa cầu 3D để kết nối với chuyên gia XR Agency."
                  : "Cliquez sur une ville du globe 3D pour découvrir nos agents & pôles d’intervention."}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
            {l === "en"
              ? "Click directly on a city pin on the 3D globe or select a hub below to orient the camera and view the dedicated local team."
              : l === "vi"
                ? "Nhấp trực tiếp vào thành phố trên quả địa cầu 3D hoặc chọn bên dưới để xem đội ngũ chuyên gia địa phương."
                : "Cliquez directement sur les villes affichées sur le globe 3D (ou faites-le tourner au doigt / à la souris) pour orienter la caméra sur l’agent local dédié."}
          </p>
        </div>

        {/* Sélecteur rapide des 7 Hubs Mondiaux */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {GLOBAL_HUBS.map((hub) => {
            const active = hub.id === selectedHubId;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => focusHub(hub)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  active
                    ? "border-[#c5a880] bg-[#c5a880] text-[#090a0d] shadow-[0_0_30px_rgba(197,168,128,0.45)] font-bold scale-[1.03]"
                    : "border-white/15 bg-white/5 text-white/80 hover:border-[#c5a880]/50 hover:bg-white/10"
                }`}
              >
                <span>{hub.flag}</span>
                <span>{hub.city[l]}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/75 hover:border-[#c5a880] hover:text-white"
          >
            <RotateCw className={`h-3 w-3 ${autoRotate ? "animate-spin" : ""}`} />
            {autoRotate ? "Rotation 3D [ACTIVE]" : "Rotation 3D [PAUSE]"}
          </button>
        </div>

        {/* Grille Principale : Globe Three.js + Épingles Cliquables + Dossier Agent */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Colonne Gauche : Scène Three.js + Marqueurs de Villes Cliquables en Direct */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-b from-[#0d1017] via-[#07090d] to-[#050608] p-4 sm:p-6 shadow-2xl lg:col-span-7">
            <div
              ref={stageRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative h-[380px] w-full sm:h-[470px] cursor-grab active:cursor-grabbing select-none touch-none overflow-hidden"
            >
              {/* Hôte du Canvas WebGL Three.js */}
              <div ref={canvasHostRef} className="absolute inset-0 z-10" />

              {/* Épingles HTML Interactives Projetées en Temps Réel sur les Villes du Globe */}
              <div className="pointer-events-none absolute inset-0 z-20">
                {GLOBAL_HUBS.map((hub) => {
                  const pos = pinPositions[hub.id];
                  if (!pos || !pos.visible) return null;
                  const isSelected = hub.id === selectedHubId;

                  return (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        focusHub(hub);
                      }}
                      style={{
                        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
                      }}
                      className={`pointer-events-auto absolute left-0 top-0 group flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-shadow duration-200 ${
                        isSelected
                          ? "z-30 border-[#c5a880] bg-[#c5a880] text-[#090a0d] shadow-[0_0_25px_rgba(197,168,128,0.9)] scale-110"
                          : "z-20 border-white/25 bg-black/80 text-white/90 backdrop-blur-md hover:border-[#c5a880] hover:bg-black"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-[#090a0d] animate-ping" : "bg-emerald-400"
                        }`}
                      />
                      <span>{hub.flag}</span>
                      <span className="whitespace-nowrap">{hub.city[l]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Badge HUD en bas du Globe */}
              <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full border border-[#c5a880]/45 bg-black/80 px-4 py-1.5 backdrop-blur-xl shadow-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
                  {activeHub.flag} {activeHub.city[l].toUpperCase()} · AGENT :{" "}
                  {activeHub.agentName.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 w-full border-t border-white/10 pt-3 px-2 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#c5a880]" />
                {l === "en"
                  ? "3D Satellite Earth · Click any city pin on the globe or drag to rotate"
                  : "Globe 3D Satellite · Cliquez directement sur une ville du globe ou glissez pour tourner"}
              </span>
              <span className="font-mono text-[10px] text-[#c5a880]">7 HUBS MONDIAUX · 24H/24</span>
            </div>
          </div>

          {/* Colonne Droite : Fiche Complète de l'Agent Local Sélectionné */}
          <div className="rounded-[2.2rem] border border-[#c5a880]/40 bg-gradient-to-b from-[#171920] to-[#0e1015] p-6 sm:p-8 shadow-[0_28px_90px_-20px_rgba(0,0,0,0.9)] lg:col-span-5">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#c5a880]/40 bg-[#c5a880]/15 text-2xl">
                  {activeHub.flag}
                </span>
                <div>
                  <span className="inline-block rounded-full bg-[#c5a880]/20 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#e5cba4]">
                    {activeHub.badge[l]} · {activeHub.timezone}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    {activeHub.city[l]} — {activeHub.country[l]}
                  </h3>
                </div>
              </div>
            </div>

            {/* Carte Agent */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#c5a880]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880]">
                      {l === "en" ? "LOCAL XR AGENT / LEAD" : "AGENT & RÉFÉRENT LOCAL XR"}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-white">{activeHub.agentName}</p>
                  <p className="text-xs text-[#d6be99]">{activeHub.agentRole[l]}</p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  ● {l === "en" ? "Available" : "Disponible"}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/75">{activeHub.bio[l]}</p>

              <div className="mt-4 border-t border-white/10 pt-3">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                  {l === "en" ? "Key Specializations:" : "Spécialités d’intervention :"}
                </span>
                <p className="mt-1 text-xs font-medium text-white/90">{activeHub.specialty[l]}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px]">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeHub.languages.map((langName) => (
                    <span
                      key={langName}
                      className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/80"
                    >
                      {langName}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#e5cba4]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                  {activeHub.projectsCount}
                </span>
              </div>
            </div>

            {/* Boutons d'Action Directs */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c5a880] px-5 py-3.5 text-xs font-black uppercase tracking-wider text-[#101114] transition hover:bg-[#d8be98]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {l === "en"
                  ? `Start a project with ${activeHub.city.en}`
                  : `Lancer mon projet avec ${activeHub.city.fr}`}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#maps-simulator"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-4 py-3.5 text-xs font-semibold text-white transition hover:border-[#c5a880] hover:bg-white/5"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#c5a880]" />
                Maps Top 3
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
