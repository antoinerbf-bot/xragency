import { ArrowRight, Monitor, Search, MapPin, Video, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import svcWebPhoto from "@/assets/svc-web-editorial.jpg";
import svcSeoPhoto from "@/assets/svc-seo-editorial.jpg";
import svcMapsPhoto from "@/assets/svc-maps-editorial.jpg";
import svcSocialPhoto from "@/assets/svc-social-editorial.jpg";
import svcBrandingPhoto from "@/assets/svc-branding-editorial.jpg";
import svcWebcarePhoto from "@/assets/svc-webcare-editorial.jpg";

const EXPERTISES = [
  {
    id: "websites",
    title: "Création de sites web",
    desc: "Des sites modernes, performants et orientés conversion.",
    photo: svcWebPhoto,
    icon: Monitor,
    href: "/services/websites",
  },
  {
    id: "seo",
    title: "SEO Google",
    desc: "Gagnez en visibilité durable et attirez un trafic qualifié.",
    photo: svcSeoPhoto,
    icon: Search,
    href: "/services/seo",
  },
  {
    id: "maps",
    title: "Google Maps",
    desc: "Attirez plus de clients locaux et développez votre notoriété.",
    photo: svcMapsPhoto,
    icon: MapPin,
    href: "/services/maps",
  },
  {
    id: "social",
    title: "Social Media",
    desc: "Construisez une communauté engagée et une présence forte.",
    photo: svcSocialPhoto,
    icon: Video,
    href: "/services/social",
  },
  {
    id: "branding",
    title: "Branding",
    desc: "Créez une identité forte, cohérente et mémorable.",
    photo: svcBrandingPhoto,
    icon: Sparkles,
    href: "/services/branding",
  },
  {
    id: "webcare",
    title: "WebCare",
    desc: "Maintenance, sécurité et performance continue de vos outils.",
    photo: svcWebcarePhoto,
    icon: ShieldCheck,
    href: "/services/webcare",
  },
];

export function ExpertisesShowcase() {
  return (
    <section id="services" className="relative isolate bg-[#FAF8F5] py-16 sm:py-24 border-t border-[#0E1015]/10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        
        {/* ── EN-TÊTE DE SECTION ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-12 sm:pb-16 border-b border-[#0E1015]/10">
          <div className="max-w-[720px]">
            <div className="mb-3 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#BFA27E]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#8F7453]">
                NOS EXPERTISES
              </span>
            </div>
            <h2 className="font-sans text-[clamp(2.2rem,4vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0E1015]">
              <span>Une approche globale</span>{" "}
              <span className="font-serif font-normal italic text-[#BFA27E]">
                pour un impact durable.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:max-w-[460px]">
            <p className="text-[14px] leading-relaxed text-[#4A4E57]">
              De la stratégie à la performance, nous combinons créativité, technologie et expertise pour faire de votre présence digitale un véritable levier de croissance.
            </p>
            <Link
              to="/services"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0E1015]/15 bg-white px-5 py-2.5 text-[10.5px] font-bold uppercase tracking-wider text-[#0E1015] shadow-sm transition hover:border-[#BFA27E] hover:bg-[#FAF3EA]"
            >
              <span>Découvrir tous nos services</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── GRILLE DES 6 EXPERTISES TACTILES (3 COLONNES SUR DESKTOP, CARROUSEL FLUIDE SUR MOBILE) ── */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#0E1015]/10 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BFA27E]/60 hover:shadow-xl"
              >
                {/* Photo Réelle en Tête de Carte */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#EFECE6]">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                {/* Corps de la Carte */}
                <div className="flex flex-1 items-end justify-between gap-3 p-3 pt-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8F7453]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="font-sans text-base font-bold text-[#0E1015] transition-colors group-hover:text-[#8F7453]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#555A64]">
                      {item.desc}
                    </p>
                  </div>

                  {/* Pastille Ronde d'Action */}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FAF3EA] text-[#8F7453] transition-all duration-300 group-hover:bg-[#BFA27E] group-hover:text-white group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
