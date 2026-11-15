import { useEffect, useRef, useState } from "react";
import { Globe2, MapPin, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Users } from "lucide-react";
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
      fr: "Sites Sur-Mesure, Domination Google Maps Top 3, Logiciels/CRM & Robotique",
      en: "Bespoke Websites, Google Maps Top 3 Domination, Custom Software & Robotics",
      vi: "Website Thiết kế riêng, Google Maps Top 3, Phần mềm & Robot",
    },
    bio: {
      fr: "Pilotage central des projets grands comptes et PME exigeantes en France : conception web haute couture, garantie contractuelle Google Maps Top 3 et déploiement de robots humanoïdes.",
      en: "Central hub for demanding SMEs and enterprise clients across France: haute-couture web design, guaranteed Google Maps Top 3 and humanoid robotics deployment.",
      vi: "Trung tâm điều phối chiến lược tại Pháp: thiết kế web cao cấp, cam kết Top 3 Google Maps và triển khai robot dịch vụ.",
    },
    languages: ["Français", "English"],
    projectsCount: "140+ projets livrés",
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
    country: { fr: "Émirats Arabes Unis · MENA", en: "United Arab Emirates · MENA", vi: "UAE · Trung Đông" },
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
    country: { fr: "Vietnam · Studio Ingénierie", en: "Vietnam · Engineering Studio", vi: "Việt Nam · Studio Kỹ thuật" },
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
      vi: "Đồng hành cùng các chuỗi nhà hàng, phòng khám và doanh nghiệp quốc tế tại bờ Đông Hoa Kỳ.",
    },
    languages: ["English", "Français", "Español"],
    projectsCount: "40+ clients US",
    badge: { fr: "Hub Amériques", en: "Americas Hub", vi: "Hub Châu Mỹ" },
  },
];

// Simplified continent land dots (lat, lng) for realistic 3D Earth rendering
const LAND_COORDS: Array<[number, number]> = [
  // Europe
  [48.8, 2.3], [51.5, -0.1], [40.4, -3.7], [41.9, 12.5], [52.5, 13.4], [46.2, 6.1], [59.3, 18.0], [60.1, 24.9], [50.0, 14.4], [47.5, 19.0], [38.7, -9.1], [53.3, -6.2], [55.7, 12.5], [37.9, 23.7], [44.4, 26.1], [52.2, 21.0],
  // Middle East & Africa
  [25.2, 55.3], [24.7, 46.7], [30.0, 31.2], [33.5, -7.6], [36.8, 10.1], [14.7, -17.4], [6.5, 3.3], [-1.2, 36.8], [-26.2, 28.0], [-33.9, 18.4], [32.0, 34.8], [41.0, 28.9],
  // Asia
  [10.8, 106.6], [21.0, 105.8], [1.3, 103.8], [13.7, 100.5], [3.1, 101.6], [14.6, 120.9], [22.3, 114.1], [31.2, 121.4], [39.9, 116.4], [35.6, 139.6], [37.5, 126.9], [28.6, 77.2], [19.0, 72.8], [12.9, 77.5], [-6.2, 106.8],
  // Oceania
  [-33.8, 151.2], [-37.8, 144.9], [-27.4, 153.0], [-36.8, 174.7],
  // North America
  [40.7, -74.0], [25.7, -80.2], [34.0, -118.2], [37.7, -122.4], [41.8, -87.6], [29.7, -95.3], [45.5, -73.5], [43.6, -79.3], [49.2, -123.1], [19.4, -99.1],
  // South America
  [-23.5, -46.6], [-22.9, -43.1], [-34.6, -58.3], [-33.4, -70.6], [4.7, -74.0], [-12.0, -77.0],
];

export function InteractiveGlobalTeamGlobe() {
  const { lang } = useLang();
  const l = (lang === "en" || lang === "vi" ? lang : "fr") as "fr" | "en" | "vi";
  const [selectedHubId, setSelectedHubId] = useState<string>("paris");
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rotation state in refs for smooth 60fps loop
  const rotRef = useRef<{ yaw: number; pitch: number; targetYaw: number; targetPitch: number; autoRotate: boolean }>({
    yaw: -0.25,
    pitch: 0.35,
    targetYaw: -0.25,
    targetPitch: 0.35,
    autoRotate: true,
  });
  const dragStartRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const projectedHubsRef = useRef<Array<{ id: string; x: number; y: number; z: number; visible: boolean }>>([]);

  const activeHub = GLOBAL_HUBS.find((h) => h.id === selectedHubId) ?? GLOBAL_HUBS[0];

  // Center globe on a selected hub when clicked
  const focusHub = (hub: GlobalHub) => {
    setSelectedHubId(hub.id);
    const latRad = (hub.lat * Math.PI) / 180;
    const lngRad = (hub.lng * Math.PI) / 180;
    rotRef.current.targetYaw = -lngRad;
    rotRef.current.targetPitch = Math.max(-0.7, Math.min(0.7, latRad * 0.65));
    rotRef.current.autoRotate = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.41;

      ctx.clearRect(0, 0, w, h);

      // Update rotation
      if (rotRef.current.autoRotate && !dragStartRef.current) {
        rotRef.current.targetYaw -= 0.0028;
      }
      rotRef.current.yaw += (rotRef.current.targetYaw - rotRef.current.yaw) * 0.08;
      rotRef.current.pitch += (rotRef.current.targetPitch - rotRef.current.pitch) * 0.08;

      const yaw = rotRef.current.yaw;
      const pitch = rotRef.current.pitch;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);

      const project = (lat: number, lng: number) => {
        const phi = (lat * Math.PI) / 180;
        const theta = (lng * Math.PI) / 180;
        const x0 = Math.cos(phi) * Math.sin(theta);
        const y0 = Math.sin(phi);
        const z0 = Math.cos(phi) * Math.cos(theta);

        // Rotate around Y (yaw)
        const x1 = x0 * cosYaw + z0 * sinYaw;
        const z1 = -x0 * sinYaw + z0 * cosYaw;
        // Rotate around X (pitch)
        const y2 = y0 * cosPitch - z1 * sinPitch;
        const z2 = y0 * sinPitch + z1 * cosPitch;

        return {
          x: cx + x1 * radius,
          y: cy - y2 * radius,
          z: z2,
        };
      };

      // Outer atmospheric halo
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius * 1.24);
      haloGrad.addColorStop(0, "rgba(197, 168, 128, 0.22)");
      haloGrad.addColorStop(0.55, "rgba(139, 112, 79, 0.10)");
      haloGrad.addColorStop(1, "rgba(16, 17, 20, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.24, 0, Math.PI * 2);
      ctx.fill();

      // 3D Sphere body with realistic lighting
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.32,
        cy - radius * 0.32,
        radius * 0.08,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "#24221f");
      sphereGrad.addColorStop(0.55, "#141416");
      sphereGrad.addColorStop(1, "#090a0c");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle rim light
      ctx.strokeStyle = "rgba(197, 168, 128, 0.38)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude / Longitude graticule lines
      ctx.lineWidth = 0.65;
      ctx.strokeStyle = "rgba(197, 168, 128, 0.11)";
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 6) {
          const p = project(lat, lng);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 5) {
          const p = project(lat, lng);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Draw continental land matrix dots
      for (const [lat, lng] of LAND_COORDS) {
        const p = project(lat, lng);
        if (p.z > 0) {
          const alpha = 0.2 + p.z * 0.45;
          ctx.fillStyle = `rgba(197, 168, 128, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw arcs connecting Paris HQ to all global hubs
      const parisHub = GLOBAL_HUBS[0];
      const parisProj = project(parisHub.lat, parisHub.lng);
      for (const hub of GLOBAL_HUBS.slice(1)) {
        const hp = project(hub.lat, hub.lng);
        if (parisProj.z > -0.2 && hp.z > -0.2) {
          const midX = (parisProj.x + hp.x) / 2;
          const midY = (parisProj.y + hp.y) / 2 - 26;
          ctx.strokeStyle =
            hub.id === selectedHubId
              ? "rgba(212, 175, 122, 0.78)"
              : "rgba(197, 168, 128, 0.24)";
          ctx.lineWidth = hub.id === selectedHubId ? 1.8 : 0.9;
          ctx.beginPath();
          ctx.moveTo(parisProj.x, parisProj.y);
          ctx.quadraticCurveTo(midX, midY, hp.x, hp.y);
          ctx.stroke();
        }
      }

      // Draw interactive city markers
      const nextProjected: Array<{ id: string; x: number; y: number; z: number; visible: boolean }> = [];
      const pulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;

      for (const hub of GLOBAL_HUBS) {
        const p = project(hub.lat, hub.lng);
        const visible = p.z > -0.05;
        nextProjected.push({ id: hub.id, x: p.x, y: p.y, z: p.z, visible });

        if (!visible) continue;

        const isSelected = hub.id === selectedHubId;
        const ringRadius = isSelected ? 10 + pulse * 6 : 6 + pulse * 3;

        // Outer pulse ring
        ctx.strokeStyle = isSelected
          ? "rgba(232, 195, 142, 0.85)"
          : "rgba(197, 168, 128, 0.45)";
        ctx.lineWidth = isSelected ? 2 : 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Core pin
        ctx.fillStyle = isSelected ? "#f5d7a1" : "#c5a880";
        ctx.beginPath();
        ctx.arc(p.x, p.y, isSelected ? 5.2 : 3.6, 0, Math.PI * 2);
        ctx.fill();

        // City label floating next to pin
        ctx.font = isSelected ? "600 11px Inter, sans-serif" : "500 9.5px Inter, sans-serif";
        const label = `${hub.flag} ${hub.city[l]}`;
        const textWidth = ctx.measureText(label).width;
        const labelX = p.x + 10;
        const labelY = p.y + 3;

        ctx.fillStyle = isSelected ? "rgba(16, 17, 20, 0.92)" : "rgba(16, 17, 20, 0.72)";
        ctx.beginPath();
        ctx.roundRect(labelX - 5, labelY - 10, textWidth + 10, 15, 5);
        ctx.fill();

        if (isSelected) {
          ctx.strokeStyle = "rgba(212, 175, 122, 0.8)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.fillStyle = isSelected ? "#f8f6f0" : "rgba(248, 246, 240, 0.85)";
        ctx.fillText(label, labelX, labelY);
      }

      projectedHubsRef.current = nextProjected;
      ctx.restore();
      animId = window.requestAnimationFrame(render);
    };

    animId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(animId);
  }, [selectedHubId, l]);

  // Handle pointer drag & click on city pins
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if user clicked near a visible city pin
    const clickedHub = projectedHubsRef.current
      .filter((h) => h.visible)
      .find((h) => Math.hypot(h.x - x, h.y - y) < 26);

    if (clickedHub) {
      const target = GLOBAL_HUBS.find((h) => h.id === clickedHub.id);
      if (target) focusHub(target);
      return;
    }

    setIsDragging(true);
    rotRef.current.autoRotate = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      yaw: rotRef.current.targetYaw,
      pitch: rotRef.current.targetPitch,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    rotRef.current.targetYaw = dragStartRef.current.yaw + dx * 0.007;
    rotRef.current.targetPitch = Math.max(
      -0.8,
      Math.min(0.8, dragStartRef.current.pitch + dy * 0.007)
    );
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <section
      id="global-network"
      className="relative overflow-hidden border-t border-[var(--xr-line)] bg-[#0d0e11] py-16 text-[#f8f6f0] sm:py-24"
    >
      {/* Subtle luxury radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px circle at 25% 50%, rgba(197,168,128,0.14), transparent 70%), radial-gradient(700px circle at 80% 25%, rgba(139,112,79,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/35 bg-[#c5a880]/10 px-3.5 py-1 text-[9px] font-mono uppercase tracking-[0.22em] text-[#e5cba4]">
              <Globe2 className="h-3.5 w-3.5" />
              {l === "en"
                ? "GLOBAL PRESENCE · INTERACTIVE 3D GLOBE"
                : l === "vi"
                  ? "HIỆN DIỆN TOÀN CẦU · ĐỊA CẦU 3D TƯƠNG TÁC"
                  : "PRÉSENCE MONDIALE · GLOBE 3D INTERACTIF"}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {l === "en"
                ? "Click on a city to meet our local XR Agency teams & agents."
                : l === "vi"
                  ? "Nhấp vào từng thành phố để kết nối với chuyên gia XR Agency tại địa phương."
                  : "Cliquez sur une ville pour découvrir nos agents & pôles d’intervention."}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
            {l === "en"
              ? "Rotate the 3D globe or select any city below to inspect our regional experts in Communication, Google Maps Top 3, AI Automation, Custom Software & Robotics."
              : l === "vi"
                ? "Xoay quả địa cầu 3D hoặc chọn thành phố bên dưới để xem đội ngũ chuyên gia Truyền thông, Google Maps Top 3, AI, Phần mềm & Robot."
                : "Faites tourner le globe 3D ou cliquez directement sur une ville pour afficher l’équipe locale dédiée à votre communication, votre visibilité Google Maps, vos logiciels IA et vos robots."}
          </p>
        </div>

        {/* City Selector Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {GLOBAL_HUBS.map((hub) => {
            const active = hub.id === selectedHubId;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => focusHub(hub)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
                  active
                    ? "border-[#c5a880] bg-[#c5a880] text-[#101114] shadow-[0_0_25px_rgba(197,168,128,0.4)] font-semibold"
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
            onClick={() => {
              rotRef.current.autoRotate = !rotRef.current.autoRotate;
            }}
            className="ml-auto hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/65 hover:border-white/30 hover:text-white sm:inline-flex"
          >
            {l === "en" ? "Auto-Rotation 3D" : "Rotation 3D Auto"}
          </button>
        </div>

        {/* Main 2-Column Interactive Grid: 3D Globe + Selected Agent Card */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: Interactive 3D Canvas Globe */}
          <div className="relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#121418]/90 p-4 shadow-2xl lg:col-span-7">
            <div className="relative h-[340px] w-full sm:h-[440px]">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className={`h-full w-full touch-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 w-full px-3 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#c5a880]" />
                {l === "en"
                  ? "Interactive 3D Earth · Drag to rotate or click a city pin"
                  : "Globe 3D interactif · Glissez pour tourner ou cliquez sur une ville"}
              </span>
              <span className="font-mono text-[10px] text-[#c5a880]">
                7 HUBS INTERNATIONAUX · OPÉRATIONS 24H/24
              </span>
            </div>
          </div>

          {/* Right: Active City & Agent Dossier Card */}
          <div className="rounded-3xl border border-[#c5a880]/35 bg-gradient-to-b from-[#191a1f] to-[#111216] p-6 sm:p-8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] lg:col-span-5">
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

            {/* Agent Profile Box */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#c5a880]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880]">
                      {l === "en" ? "LOCAL XR AGENT / LEAD" : "AGENT & RÉFÉRENT LOCAL XR"}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-white">{activeHub.agentName}</p>
                  <p className="text-xs text-[#d6be99]">{activeHub.agentRole[l]}</p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
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

            {/* Direct CTA to launch project with this hub */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c5a880] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#101114] transition hover:bg-[#d8be98]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {l === "en"
                  ? `Start a project with ${activeHub.city.en}`
                  : `Lancer mon projet avec le pôle ${activeHub.city.fr}`}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#maps-simulator"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-4 py-3 text-xs font-semibold text-white transition hover:border-[#c5a880] hover:bg-white/5"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#c5a880]" />
                {l === "en" ? "Maps Top 3" : "Simuler Maps Top 3"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
