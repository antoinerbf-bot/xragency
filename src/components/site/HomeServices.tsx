import { useState } from "react";
import { ArrowUpRight, BarChart3, Globe2, MapPinned, Palette, ShieldCheck, Sparkles, Users, Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";

const IDS = ["websites","branding","seo","maps","social","maintenance","robotics"] as const;
const ICONS = { websites: Globe2, branding: Palette, seo: BarChart3, maps: MapPinned, social: Users, maintenance: ShieldCheck, robotics: Bot };
const PRICES: Record<string, number> = { websites:499, branding:179, seo:299, maps:990, social:299, maintenance:29, robotics:499 };

const COPY = {
  fr: { eyebrow:"07 EXPERTISES · UN SEUL ÉCOSYSTÈME", title:"Vous n’achetez pas un service.", accent:"Vous construisez un système.", lead:"Explorez les briques XRAGENCY et composez une présence digitale cohérente : attirer, convaincre, convertir, fidéliser.", discover:"Voir l’expertise", from:"À partir de", hint:"Cliquez sur une expertise" },
  en: { eyebrow:"07 DISCIPLINES · ONE ECOSYSTEM", title:"You don't buy a service.", accent:"You build a system.", lead:"Explore the XRAGENCY building blocks and compose a coherent digital presence: attract, convince, convert, retain.", discover:"Explore", from:"From", hint:"Choose a discipline" },
  vi: { eyebrow:"07 CHUYÊN MÔN · MỘT HỆ SINH THÁI", title:"Bạn không mua một dịch vụ.", accent:"Bạn xây dựng một hệ thống.", lead:"Khám phá các mảnh ghép XRAGENCY để xây dựng hiện diện số nhất quán: thu hút, thuyết phục, chuyển đổi, giữ chân.", discover:"Khám phá", from:"Từ", hint:"Chọn một chuyên môn" },
  ar: { eyebrow:"07 تخصصات · منظومة واحدة", title:"أنت لا تشتري خدمة.", accent:"بل تبني منظومة.", lead:"استكشف مكونات XRAGENCY وابنِ حضوراً رقمياً متكاملاً: جذب، إقناع، تحويل، واحتفاظ.", discover:"اكتشف", from:"ابتداءً من", hint:"اختر تخصصاً" },
  ru: { eyebrow:"07 НАПРАВЛЕНИЙ · ОДНА СИСТЕМА", title:"Вы не покупаете услугу.", accent:"Вы строите систему.", lead:"Изучите блоки XRAGENCY и соберите цельное цифровое присутствие: привлечь, убедить, конвертировать, удержать.", discover:"Открыть", from:"От", hint:"Выберите направление" },
} as const;

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = COPY[lang as keyof typeof COPY] ?? COPY.fr;
  const [active, setActive] = useState<(typeof IDS)[number]>("websites");
  const service = SERVICES.find(s => s.id === active) ?? SERVICES[0];
  const Icon = ICONS[active];

  return (
    <section id="homepage-services" className="relative overflow-hidden bg-[#07090c] py-20 text-white sm:py-28 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.018),transparent_42%,rgba(255,255,255,.025))]" />
      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.025}>
          <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <span className="label-mono text-[9px] tracking-[.3em] text-white/65">{copy.eyebrow}</span>
              <h2 className="display-serif mt-4 max-w-5xl text-5xl leading-[.86] sm:text-7xl lg:text-[6.5rem]">{copy.title}<br /><em className="text-white/42 not-italic">{copy.accent}</em></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/52 lg:pb-1">{copy.lead}</p>
          </div>
        </Parallax>

        <div className="mt-10 grid gap-5 lg:grid-cols-[.68fr_1.32fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.025] p-3 backdrop-blur-xl">
              <div className="absolute left-0 top-0 h-full w-px bg-white/10" /><div className="px-4 pb-3 pt-3 label-mono text-[8px] tracking-[.2em] text-white/32">{copy.hint}</div>
              <div className="grid gap-2">
                {IDS.map((id, index) => {
                  const s = SERVICES.find(x => x.id === id);
                  if (!s) return null;
                  const I = ICONS[id];
                  const selected = active === id;
                  return (
                    <button key={id} type="button" onClick={() => setActive(id)} className={"group flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition duration-300 " + (selected ? "border-white/22 bg-white/[.075] translate-x-1" : "border-white/8 bg-black/10 hover:-translate-y-0.5 hover:border-white/18")}>
                      <span className={"grid h-10 w-10 shrink-0 place-items-center rounded-xl border " + (selected ? "border-white/20 bg-white/[.08] text-white" : "border-white/10 bg-white/[.03] text-white/45")}><I className="h-4 w-4" /></span>
                      <span className="min-w-0 flex-1"><span className="label-mono text-[8px] tracking-[.18em] text-white/35">0{index+1}</span><span className="mt-1 block text-sm font-semibold text-white">{t(s.title)}</span><span className="mt-0.5 block truncate text-[10px] text-white/38">{t(s.short)}</span></span>
                      <ArrowUpRight className={"h-4 w-4 shrink-0 transition " + (selected ? "text-white/55" : "text-white/20 group-hover:text-white/60")} />
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative min-h-[600px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0e12]">
              <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/[.06]" /><div className="absolute -left-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/[.08]" />
              <div className="absolute inset-4"><ServiceIllustration service={active} title={t(service.title)} /></div>
              <div className="absolute inset-x-7 bottom-7 z-20 rounded-[1.5rem] border border-white/12 bg-black/72 p-6 backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-white/65" /><span className="label-mono text-[8px] tracking-[.22em] text-white/60">{t(service.short)}</span></div>
                    <h3 className="display-serif mt-3 text-4xl leading-[.9] sm:text-6xl">{t(service.title)}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/52">{t(service.description)}</p>
                  </div>
                  <div className="hidden text-right sm:block"><span className="label-mono text-[8px] text-white/35">{copy.from}</span><div className="mt-1 text-2xl font-semibold text-white/85">{price(PRICES[active])}</div></div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to={active === "maintenance" ? "/services/webcare" : active === "robotics" ? "/services/robotique" : "/services/" + active} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[.12em] text-black">{copy.discover}<ArrowUpRight className="h-4 w-4" /></Link>
                  <a href="#quote" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-5 py-3 label-mono text-[9px] tracking-[.12em] text-white/70 hover:border-white/30"><Sparkles className="h-3.5 w-3.5 text-white/60" />Ajouter à mon projet</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
