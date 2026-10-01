import { useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Globe2, Layers3, MapPinned, Palette, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/content";
import { ServiceIllustration } from "./ServiceIllustration";
import { Parallax, Reveal } from "./primitives";

const IDS = ["websites","branding","seo","maps","social","maintenance","robotics"] as const;
const ICONS = { websites: Globe2, branding: Palette, seo: BarChart3, maps: MapPinned, social: Users, maintenance: ShieldCheck, robotics: Bot };
const PRICES: Record<string, number> = { websites:499, branding:179, seo:299, maps:990, social:299, maintenance:29, robotics:499 };

const COPY = {
  fr: { eyebrow:"07 EXPERTISES · UN SEUL ÉCOSYSTÈME", title:"Vous n’achetez pas un service.", accent:"Vous construisez un système.", lead:"Les briques XRAGENCY se branchent entre elles pour former une présence cohérente : attirer, convaincre, convertir, fidéliser.", discover:"Ouvrir le service", add:"Ajouter au dispositif", from:"À partir de", hint:"Choisissez une brique" },
  en: { eyebrow:"07 DISCIPLINES · ONE ECOSYSTEM", title:"You don't buy a service.", accent:"You build a system.", lead:"XRAGENCY building blocks connect into one coherent presence: attract, convince, convert, retain.", discover:"Open service", add:"Add to system", from:"From", hint:"Choose a building block" },
  vi: { eyebrow:"07 CHUYÊN MÔN · MỘT HỆ SINH THÁI", title:"Bạn không mua một dịch vụ.", accent:"Bạn xây dựng một hệ thống.", lead:"Các mảnh ghép XRAGENCY kết nối để tạo hiện diện số nhất quán: thu hút, thuyết phục, chuyển đổi, giữ chân.", discover:"Mở dịch vụ", add:"Thêm vào hệ thống", from:"Từ", hint:"Chọn một mảnh ghép" },
  ar: { eyebrow:"07 تخصصات · منظومة واحدة", title:"أنت لا تشتري خدمة.", accent:"بل تبني منظومة.", lead:"ترتبط مكونات XRAGENCY لتشكّل حضوراً رقمياً متكاملاً.", discover:"فتح الخدمة", add:"إضافة إلى المنظومة", from:"ابتداءً من", hint:"اختر مكوناً" },
  ru: { eyebrow:"07 НАПРАВЛЕНИЙ · ОДНА СИСТЕМА", title:"Вы не покупаете услугу.", accent:"Вы строите систему.", lead:"Блоки XRAGENCY соединяются в единую цифровую систему: привлечь, убедить, конвертировать, удержать.", discover:"Открыть", add:"Добавить в систему", from:"От", hint:"Выберите блок" },
} as const;

export function HomeServices() {
  const { t, price, lang } = useLang();
  const copy = COPY[lang as keyof typeof COPY] ?? COPY.fr;
  const [active, setActive] = useState<(typeof IDS)[number]>("websites");
  const service = SERVICES.find(s => s.id === active) ?? SERVICES[0];
  const Icon = ICONS[active];

  return (
    <section id="homepage-services" className="relative overflow-hidden bg-[#05070b] py-20 text-white sm:py-28 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(126,151,255,.07),transparent_24%),radial-gradient(circle_at_88%_80%,rgba(255,255,255,.03),transparent_25%)]" />
      <div className="relative mx-auto max-w-[1520px] px-5 sm:px-8 lg:px-12">
        <Parallax speed={-0.022}>
          <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div>
              <span className="label-mono text-[9px] tracking-[.3em] text-white/60">{copy.eyebrow}</span>
              <h2 className="display-serif mt-4 max-w-5xl text-[clamp(3.2rem,5.8vw,6.2rem)] leading-[.84] tracking-[-.06em]">{copy.title}<br/><em className="not-italic text-white/34">{copy.accent}</em></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/45 lg:pb-1">{copy.lead}</p>
          </div>
        </Parallax>

        <Reveal>
          <div className="mt-9 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.018]">
            <div className="flex gap-2 overflow-x-auto p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {IDS.map((id,index)=>{
                const s=SERVICES.find(x=>x.id===id); if(!s) return null; const I=ICONS[id]; const selected=active===id;
                return <button key={id} type="button" onClick={()=>setActive(id)} className={"group min-w-[145px] flex-1 rounded-[1.25rem] border px-3.5 py-3.5 text-left transition duration-300 "+(selected?"border-white/24 bg-white text-black shadow-2xl":"border-transparent bg-transparent text-white/48 hover:border-white/10 hover:bg-white/[.045] hover:text-white")}>
                  <div className="flex items-center justify-between gap-3"><span className="label-mono text-[7px] opacity-50">0{index+1}</span><I className="h-3.5 w-3.5 opacity-70"/></div>
                  <span className="mt-4 block text-[10px] font-semibold leading-4">{t(s.title)}</span>
                  <span className="mt-1 block truncate text-[7px] opacity-50">{t(s.short)}</span>
                </button>;
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.28fr_.72fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-[#0a0d12] shadow-[0_60px_170px_-80px_rgba(0,0,0,.98)]">
              <div className="absolute inset-4"><ServiceIllustration service={active} title={t(service.title)} /></div>
              <Parallax speed={0.022} direction="both" className="relative z-30">
                <div className="relative min-h-[640px] px-6 pb-7 pt-[590px] sm:px-9 sm:pt-[590px]">
                  <div className="rounded-[1.65rem] border border-white/12 bg-black/76 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-white/60"/><span className="label-mono text-[7px] tracking-[.22em] text-white/56">{t(service.short)}</span></div>
                        <h3 className="display-serif mt-3 text-4xl leading-[.9] sm:text-6xl">{t(service.title)}</h3>
                        <p className="mt-4 text-sm leading-6 text-white/46">{t(service.description)}</p>
                      </div>
                      <div className="rounded-2xl border border-white/12 bg-white/[.045] px-4 py-3 text-right"><span className="label-mono text-[7px] text-white/30">{copy.from}</span><div className="mt-1 text-2xl font-semibold text-white/90">{price(PRICES[active])}</div></div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link to={active === "maintenance" ? "/services/webcare" : active === "robotics" ? "/services/robotique" : "/services/" + active} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 label-mono text-[9px] font-semibold tracking-[.12em] text-black">{copy.discover}<ArrowUpRight className="h-4 w-4"/></Link>
                      <a href="#quote" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.045] px-5 py-3 label-mono text-[9px] tracking-[.12em] text-white/70 hover:border-white/24 hover:text-white">{copy.add}<ArrowRight className="h-3.5 w-3.5"/></a>
                    </div>
                  </div>
                </div>
              </Parallax>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative flex min-h-[640px] flex-col justify-between overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[.025] p-6 sm:p-8">
              <div>
                <span className="label-mono text-[7px] tracking-[.24em] text-white/30">XR SYSTEM / {String(IDS.indexOf(active)+1).padStart(2,"0")}</span>
                <div className="mt-6 grid grid-cols-[auto_1fr] gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/[.05]"><Icon className="h-5 w-5 text-white/60"/></span>
                  <div><p className="text-sm font-semibold text-white/85">{t(service.title)}</p><p className="mt-1 text-[9px] leading-4 text-white/34">{t(service.short)}</p></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
                  <span className="label-mono text-[7px] tracking-[.18em] text-white/28">CE QUE VOUS ACHETEZ</span>
                  <div className="mt-3 space-y-2">{(service.highlights ?? []).slice(0,4).map((x,i)=><div key={i} className="flex items-start gap-2 text-[10px] leading-4 text-white/48"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35"/><span>{t(x)}</span></div>)}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
                  <div className="flex items-center justify-between"><span className="label-mono text-[7px] tracking-[.18em] text-white/28">PLACE DANS LE SYSTÈME</span><span className="label-mono text-[7px] text-white/22">{String(IDS.indexOf(active)+1).padStart(2,"0")} / 07</span></div>
                  <div className="mt-4 flex gap-1.5">{IDS.map(id=><span key={id} className={"h-1 flex-1 rounded-full "+(id===active?"bg-white/70":"bg-white/10")}/>)}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
