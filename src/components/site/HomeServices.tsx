import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";

const FEATURED_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "ecommerce"];
const DISPLAY_NUM: Record<string, string> = { websites: "01", branding: "02", seo: "03", maps: "04", social: "05", maintenance: "06", ecommerce: "07" };
const DISPLAY_PRICE: Record<string, number | null> = { websites: 499, branding: null, seo: null, maps: null, social: 499, maintenance: null, ecommerce: 1499 };
const SERVICE_IMG: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=2200",
  branding: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=90&w=2200",
  seo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=90&w=2200",
  maps: "https://images.unsplash.com/photo-1524666041070-9e3c7be7b8e0?auto=format&fit=crop&q=90&w=2200",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=90&w=2200",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=90&w=2200",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=90&w=2200",
};

export function HomeServices() {
  const { t, price } = useLang();
  const featured = FEATURED_IDS.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean) as typeof SERVICES;
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [motion, setMotion] = useState<number[]>(Array(featured.length).fill(0));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const values = refs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return Math.max(-1, Math.min(1, (rect.top - 90) / Math.max(window.innerHeight * 0.75, 1)));
      });
      setMotion(values);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [featured.length]);

  return (
    <section id="homepage-services" aria-label="Les sept expertises XR Agency" className="relative bg-background py-12 md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-5xl lg:mb-16"><span className="label-mono text-[9px] uppercase tracking-[0.3em] text-primary">XR AGENCY · 07 DISCIPLINES</span><h2 className="display-serif mt-3 text-5xl leading-[0.88] sm:text-7xl lg:text-[7rem]">Une expertise.<br />Puis la suivante.</h2><p className="mt-6 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Faites défiler. Une seule expertise domine l'écran à la fois. Le mouvement, l'image et la profondeur accompagnent votre progression.</p></div>

        <div className="space-y-[18vh]">
          {featured.map((service, index) => {
            const startingPrice = DISPLAY_PRICE[service.id];
            const m = motion[index] ?? 0;
            const imageY = m * 55;
            const cardScale = 1 - Math.max(0, -m) * 0.045;
            return (
              <article ref={(el) => { refs.current[index] = el; }} key={service.id} className="sticky top-20 h-[76svh] min-h-[560px] max-h-[820px] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_35px_100px_-35px_rgba(0,0,0,.7)] sm:top-24 sm:rounded-[2.5rem]" style={{ transform: `scale(${cardScale})`, transition: "transform 120ms linear" }}>
                <div className="absolute inset-[-7%] overflow-hidden"><img src={SERVICE_IMG[service.id]} alt="" aria-hidden className="h-[114%] w-full object-cover will-change-transform" style={{ transform: `translate3d(0, ${imageY}px, 0) scale(1.06)`, transition: "transform 120ms linear" }} /></div>
                <div className="absolute inset-0 bg-black/45" /><div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-black/10" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9 lg:p-14">
                  <div className="flex items-start justify-between"><div className="flex items-center gap-3 label-mono text-[9px] uppercase tracking-[0.24em] text-white/45"><span className="text-primary">{DISPLAY_NUM[service.id]}</span><span className="h-px w-10 bg-white/20" /><span>XR AGENCY</span></div><div className="rounded-full border border-white/15 bg-black/20 px-4 py-2 label-mono text-[9px] uppercase tracking-[0.16em] text-white/50 backdrop-blur-md">{String(index + 1).padStart(2, "0")} / 07</div></div>
                  <div className="max-w-5xl"><p className="label-mono text-[9px] uppercase tracking-[0.2em] text-white/55">{t(service.short)}</p><h3 className="display-serif mt-3 max-w-4xl text-5xl leading-[0.84] text-white sm:text-7xl lg:text-[8rem]">{t(service.title)}</h3><p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">{t(service.description)}</p><div className="mt-7 flex flex-wrap items-center gap-3"><Link to="/services/$serviceId" params={{ serviceId: service.id }} className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:gap-5">Découvrir la prestation <ArrowUpRight className="h-4 w-4" /></Link><span className="rounded-full border border-white/15 bg-white/5 px-4 py-3 label-mono text-[9px] uppercase tracking-[0.12em] text-white/60 backdrop-blur-xl">{startingPrice ? `À partir de ${price(startingPrice)}${service.fromPeriod === "month" ? " / mois" : service.fromPeriod === "year" ? " / an" : ""}` : "Sur mesure · devis après analyse"}</span></div></div>
                  <div className="flex items-center justify-between border-t border-white/15 pt-4"><div className="flex gap-1.5">{featured.map((item, dotIndex) => <span key={item.id} className={cn("h-1 rounded-full transition-all", dotIndex === index ? "w-10 bg-white" : "w-2 bg-white/25")} />)}</div><div className="flex items-center gap-2 label-mono text-[9px] uppercase tracking-[0.16em] text-white/40">{index < featured.length - 1 ? <>Continuer <ArrowDown className="h-3 w-3 animate-bounce" /></> : "Fin des expertises"}</div></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
