import { ArrowRight, CheckCircle2, Monitor, Palette, Search, MapPin, Share2, ShieldCheck, Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";
import digitalPlayground from "@/assets/hero-digital-playground.jpg";

const EXPERTISES = [
  { title: "Sites Web & E-commerce", href: "/services/websites", icon: Monitor },
  { title: "Branding & Identité", href: "/services/branding", icon: Palette },
  { title: "SEO & Référencement", href: "/services/seo", icon: Search },
  { title: "Google Maps", href: "/services/maps", icon: MapPin },
  { title: "Réseaux sociaux", href: "/services/social", icon: Share2 },
  { title: "WebCare & Maintenance", href: "/services/webcare", icon: ShieldCheck },
  { title: "IA & Robotique", href: "/services/robotique", icon: Bot },
];

export function ExpertisesShowcase() {
  return (
    <section id="services" className="relative isolate overflow-hidden border-t border-white/10 bg-[#100d0b] py-20 text-[#fff7ed] sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-[#b77d4c]/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-20 lg:px-12">
        <div className="max-w-[650px]">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.28em] text-[#d9ad78] sm:text-[11px]">
            <span className="h-px w-8 bg-[#d9ad78]" /> Nos expertises
          </p>
          <h2 className="font-display text-[clamp(2.6rem,5.2vw,5.2rem)] leading-[.94] tracking-[-.045em] text-[#fff7ed]">
            Des solutions digitales complètes <span className="italic text-[#e8bd91]">et sur mesure.</span>
          </h2>
          <p className="mt-7 max-w-[540px] text-[14px] leading-[1.75] text-white/68 sm:text-[16px]">
            De la stratégie à l’exécution, nous réunissons les compétences nécessaires pour construire une présence digitale cohérente, visible et durable.
          </p>
          <Link to="/services" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#e8bd91]/55 px-6 py-3 text-[11px] font-semibold text-[#fff7ed] transition hover:border-[#e8bd91] hover:bg-[#e8bd91] hover:text-[#1a120c]">
            Découvrir nos expertises <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(201,145,91,.18),transparent_68%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#211914] p-2 shadow-[0_30px_90px_rgba(0,0,0,.45)]">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem] sm:aspect-[16/11]">
              <img src={digitalPlayground} alt="Univers visuel digital XR Agency" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100d0b]/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[.25em] text-[#f1c18f]">XR Agency</p>
                  <p className="mt-1 font-display text-2xl text-white sm:text-3xl">Une vision. Un écosystème.</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur-md"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </div>
          </div>

          <div className="relative mt-5 grid gap-x-6 gap-y-1 rounded-2xl border border-white/12 bg-white/[.045] p-4 backdrop-blur-xl sm:grid-cols-2 sm:p-5">
            {EXPERTISES.map(({ title, href, icon: Icon }) => (
              <Link key={title} to={href} className="group flex items-center gap-3 border-b border-white/10 py-3 text-[12px] text-white/80 transition last:border-0 hover:text-[#f1c18f] sm:last:border-b sm:nth-last-2:border-0">
                <Icon className="h-4 w-4 shrink-0 text-[#e8bd91]" strokeWidth={1.6} />
                <span>{title}</span>
                <CheckCircle2 className="ml-auto h-3.5 w-3.5 shrink-0 text-[#e8bd91]/65 transition group-hover:text-[#e8bd91]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
