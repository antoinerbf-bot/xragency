import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
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

function locationToAngles(lat: number, lng: number): [number, number] {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

export function InteractiveGlobalTeamGlobe() {
  const { lang } = useLang();
  const l = (lang === "en" || lang === "vi" ? lang : "fr") as "fr" | "en" | "vi";
  const [selectedHubId, setSelectedHubId] = useState<string>("paris");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const focusAnglesRef = useRef<[number, number]>(locationToAngles(48.8566, 2.3522));
  const currentPhiRef = useRef<number>(focusAnglesRef.current[0]);
  const currentThetaRef = useRef<number>(focusAnglesRef.current[1]);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);

  const activeHub = GLOBAL_HUBS.find((h) => h.id === selectedHubId) ?? GLOBAL_HUBS[0];

  const focusHub = (hub: GlobalHub) => {
    setSelectedHubId(hub.id);
    focusAnglesRef.current = locationToAngles(hub.lat, hub.lng);
    setAutoRotate(false);
    autoRotateRef.current = false;
  };

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = canvas.offsetWidth || 440;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: currentPhiRef.current,
      theta: currentThetaRef.current,
      dark: 1,
      diffuse: 1.8,
      mapSamples: 22000,
      mapBrightness: 7.5,
      baseColor: [0.16, 0.15, 0.14],
      markerColor: [0.89, 0.76, 0.54],
      glowColor: [0.45, 0.37, 0.25],
      markers: GLOBAL_HUBS.map((h) => ({
        location: [h.lat, h.lng],
        size: h.id === selectedHubId ? 0.11 : 0.055,
      })),
      onRender: (state) => {
        if (!pointerInteracting.current) {
          if (autoRotateRef.current) {
            currentPhiRef.current += 0.0035;
          } else {
            const [targetPhi, targetTheta] = focusAnglesRef.current;
            const distPositive = (targetPhi - currentPhiRef.current + Math.PI * 2) % (Math.PI * 2);
            const distNegative = (currentPhiRef.current - targetPhi + Math.PI * 2) % (Math.PI * 2);
            if (distPositive < distNegative) {
              currentPhiRef.current += distPositive * 0.08;
            } else {
              currentPhiRef.current -= distNegative * 0.08;
            }
            currentThetaRef.current =
              currentThetaRef.current * 0.92 + targetTheta * 0.08;
          }
        }
        state.phi = currentPhiRef.current + pointerInteractionMovement.current;
        state.theta = currentThetaRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [selectedHubId]);

  return (
    <section
      id="global-network"
      className="relative overflow-hidden border-t border-white/10 bg-[#07080b] py-20 text-[#f8f6f0] sm:py-28"
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
                ? "GLOBAL PRESENCE · WEBGL 3D EARTH"
                : l === "vi"
                  ? "HIỆN DIỆN TOÀN CẦU · ĐỊA CẦU WEBGL 3D"
                  : "PRÉSENCE MONDIALE · GLOBE 3D HAUTE PRÉCISION"}
            </div>
            <h2 className="display-serif text-3xl font-normal tracking-tight text-white sm:text-5xl">
              {l === "en"
                ? "Click on a city to meet our local XR Agency teams & agents."
                : l === "vi"
                  ? "Nhấp vào từng thành phố để kết nối với chuyên gia XR Agency tại địa phương."
                  : "Cliquez sur une ville pour découvrir nos agents & pôles d’intervention."}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
            {l === "en"
              ? "Select any city below or rotate our 3D WebGL globe to inspect our regional experts in Communication, Google Maps Top 3, AI Automation, Custom Software & Robotics."
              : l === "vi"
                ? "Xoay quả địa cầu 3D hoặc chọn thành phố bên dưới để xem đội ngũ chuyên gia Truyền thông, Google Maps Top 3, AI, Phần mềm & Robot."
                : "Sélectionnez une ville ou faites pivoter le globe 3D WebGL pour orienter la caméra directement sur l’agent local dédié à votre projet."}
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
            className="ml-auto hidden rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:border-[#c5a880] hover:text-white sm:inline-flex"
          >
            {autoRotate ? "Rotation 3D [ACTIVE]" : "Rotation 3D [PAUSE]"}
          </button>
        </div>

        {/* Grille Principale : Globe WebGL Cobe (22 000 points) + Dossier Agent */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Colonne Gauche : Globe 3D WebGL Ultra-Réaliste */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/12 bg-gradient-to-b from-[#111319] to-[#08090c] p-6 shadow-2xl lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[440px]">
              <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                  pointerInteracting.current =
                    e.clientX - pointerInteractionMovement.current;
                  if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                  pointerInteracting.current = null;
                  if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onPointerOut={() => {
                  pointerInteracting.current = null;
                  if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onMouseMove={(e) => {
                  if (pointerInteracting.current !== null) {
                    const delta = e.clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta / 180;
                  }
                }}
                onTouchMove={(e) => {
                  if (pointerInteracting.current !== null && e.touches[0]) {
                    const delta = e.touches[0].clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta / 100;
                  }
                }}
                className="h-full w-full cursor-grab transition-opacity duration-500"
                style={{ contain: "layout paint size" }}
              />

              {/* Badge HUD flottant de la ville ciblée */}
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-[#c5a880]/45 bg-black/80 px-4 py-1.5 backdrop-blur-xl shadow-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                  {activeHub.flag} FOCUS CAMÉRA : {activeHub.city[l].toUpperCase()} ({activeHub.timezone})
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 w-full border-t border-white/10 pt-3 px-2 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#c5a880]" />
                {l === "en"
                  ? "WebGL 3D Earth · Drag to rotate or click any city pill"
                  : "Globe 3D WebGL 22 000 points · Glissez pour tourner ou cliquez sur une ville"}
              </span>
              <span className="font-mono text-[10px] text-[#c5a880]">
                7 HUBS INTERNATIONAUX · OPÉRATIONS 24H/24
              </span>
            </div>
          </div>

          {/* Colonne Droite : Fiche de l'Agent Local Sélectionné */}
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
                {l === "en" ? "Maps Top 3" : "Maps Top 3"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
