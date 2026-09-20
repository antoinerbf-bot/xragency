import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";\nimport type { CSSProperties } from "react";
import { SERVICES } from "@/lib/content";

const ORDER = ["websites","branding","seo","maps","social","maintenance","ecommerce"] as const;
const HREF: Record<string,string> = { websites:"/services/websites", branding:"/services/branding", seo:"/services/seo", maps:"/services/maps", social:"/services/social", maintenance:"/services/webcare", ecommerce:"/services/ecommerce" };
const TINT: Record<string,string> = { websites:"#d7a35d", branding:"#b889d6", seo:"#6f9bd1", maps:"#5f9f9a", social:"#c66b87", maintenance:"#7e93ad", ecommerce:"#d88455" };
const IMG: Record<string,string> = {
  websites:"https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=1800",
  branding:"https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=90&w=1800",
  seo:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=90&w=1800",
  maps:"https://images.unsplash.com/photo-1524666041070-9e3c7be7b8e0?auto=format&fit=crop&q=90&w=1800",
  social:"https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=90&w=1800",
  maintenance:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=90&w=1800",
  ecommerce:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=90&w=1800"
};

export function ServicesCatalog() {
  const { t, lang, price } = useLang();
  const services = ORDER.map(id => SERVICES.find(s => s.id === id)).filter(Boolean) as typeof SERVICES;
  const copy = {
    fr:{eyebrow:"XR / SERVICES", title:"Choisissez le levier. Nous construisons le système.", lead:"Pas sept prestations isolées. Un parcours clair : identifier le blocage, activer le bon levier, puis construire ce qui doit réellement faire progresser votre activité.", cta:"Construire mon plan", proof:"Ce que cette prestation débloque"},
    en:{eyebrow:"XR / SERVICES", title:"Choose the lever. We build the system.", lead:"Not seven isolated services. One clear path: identify the constraint, activate the right lever, then build what actually moves the business forward.", cta:"Build my plan", proof:"What this service unlocks"},
    vi:{eyebrow:"XR / DỊCH VỤ", title:"Chọn đòn bẩy. Chúng tôi xây dựng hệ thống.", lead:"Không phải bảy dịch vụ rời rạc. Một lộ trình rõ ràng: xác định điểm nghẽn, kích hoạt đúng đòn bẩy và xây dựng thứ thực sự giúp doanh nghiệp tiến lên.", cta:"Xây dựng kế hoạch", proof:"Dịch vụ này mở khóa gì"}
  }[lang];

  return <section className="relative overflow-hidden">
    <div className="relative min-h-[92svh] overflow-hidden border-b border-border/50">
      <video autoPlay muted loop playsInline preload="metadata" poster="/media/hero-desktop.jpg" className="absolute inset-0 h-full w-full object-cover opacity-45">
        <source src="/media/hero-desktop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55),transparent_38%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(205,154,82,.20),transparent_35%)]" />
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1500px] flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-14 lg:px-12 lg:pb-20">
        <div className="max-w-5xl">
          <p className="label-mono text-primary">{copy.eyebrow}</p>
          <h1 className="display-serif mt-5 text-[clamp(3.2rem,8vw,8.5rem)] leading-[.82] tracking-[-.045em]">{copy.title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{copy.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#quote" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[.1em] text-primary-foreground hover:-translate-y-0.5 transition">{copy.cta}<ArrowRight className="h-4 w-4"/></a>
            <span className="inline-flex min-h-12 items-center rounded-full border border-white/15 bg-black/25 px-5 py-3 text-sm text-white/75 backdrop-blur">01 — 07 · {lang === "fr" ? "Expertises" : lang === "en" ? "Disciplines" : "Chuyên môn"}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div><p className="label-mono text-primary">01 — 07</p><h2 className="display-serif mt-3 text-4xl sm:text-6xl">{lang==="fr"?"Chaque levier a son rôle.":lang==="en"?"Every lever has a role.":"Mỗi đòn bẩy có một vai trò."}</h2></div>
        <p className="hidden max-w-sm text-right text-sm leading-6 text-muted-foreground md:block">{lang==="fr"?"Explorez une prestation puis laissez le configurateur construire la combinaison.":lang==="en"?"Explore a service, then let the configurator build the combination.":"Khám phá một dịch vụ, sau đó để bộ cấu hình xây dựng kết hợp phù hợp."}</p>
      </div>
      <div className="space-y-8">
        {services.map((service,index)=>{
          const tint=TINT[service.id] ?? "#d7a35d";
          const href=HREF[service.id] ?? ("/services/" + service.id);
          return <article key={service.id} className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/50" style={{"--tint":tint} as CSSProperties}>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{background:"radial-gradient(circle at 75% 25%, color-mix(in srgb, var(--tint) 18%, transparent), transparent 40%)"}}/>
            <div className="relative grid min-h-[560px] lg:grid-cols-[.95fr_1.05fr]">
              <a href={href} className="relative min-h-[360px] overflow-hidden lg:min-h-full">
                <img src={IMG[service.id]} alt={t(service.title)} loading={index<2?"eager":"lazy"} className="absolute inset-0 h-full w-full object-cover saturate-[.8] transition duration-1000 group-hover:scale-[1.045] group-hover:saturate-100"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"/>
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs text-white backdrop-blur">FIG. {String(index+1).padStart(2,"0")} · {service.num}</div>
                <div className="absolute bottom-6 left-6 right-6"><span className="label-mono text-white/55">{service.fromPeriod==="month"?price(service.fromEur)+" / mois":service.fromPeriod==="year"?price(service.fromEur)+" / an":price(service.fromEur)+" · "+(lang==="fr"?"départ":lang==="en"?"starting":"từ")}</span></div>
              </a>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
                <div>
                  <div className="flex items-center justify-between gap-4"><span className="label-mono" style={{color:tint}}>{service.num} / 07</span><span className="h-px w-16" style={{background:tint}}/></div>
                  <h3 className="display-serif mt-6 text-5xl leading-[.9] sm:text-6xl">{t(service.title)}</h3>
                  <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{t(service.description)}</p>
                  <p className="mt-8 label-mono text-primary">{copy.proof}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">{service.highlights.slice(0,3).map((h,i)=><div key={i} className="rounded-xl border border-border/70 bg-background/45 p-3 text-sm leading-5">{t(h)}</div>)}</div>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border/60 pt-6">
                  <a href={href} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:gap-3 transition">{lang==="fr"?"Explorer la prestation":lang==="en"?"Explore service":"Khám phá dịch vụ"} <ArrowRight className="h-4 w-4"/></a>
                  <a href={"/?service="+service.id+"#quote"} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-semibold hover:border-primary transition">{lang==="fr"?"L'ajouter à mon plan":lang==="en"?"Add to my plan":"Thêm vào kế hoạch"} <Check className="h-4 w-4 text-primary"/></a>
                </div>
              </div>
            </div>
          </article>
        })}
      </div>
      <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[.055] p-8 sm:p-12 lg:p-16">
        <Sparkles className="absolute right-8 top-8 h-7 w-7 text-primary/60"/>
        <p className="label-mono text-primary">XR INTELLIGENCE</p>
        <h3 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">{lang==="fr"?"Vous n'avez pas besoin de choisir seul.":lang==="en"?"You don't have to choose alone.":"Bạn không cần phải tự chọn một mình."}</h3>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{lang==="fr"?"Répondez à quelques questions. Le configurateur hiérarchise les leviers, compose un plan et vous donne une estimation avant le contact.":lang==="en"?"Answer a few questions. The configurator prioritises the levers, builds a plan and gives you an estimate before contact.":"Trả lời vài câu hỏi. Bộ cấu hình ưu tiên các đòn bẩy, xây dựng kế hoạch và đưa ra ước tính trước khi liên hệ."}</p>
        <a href={"/?service="+service.id+"#quote"} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">{copy.cta}<ArrowRight className="h-4 w-4"/></a>
      </div>
    </div>
  </section>;
}
