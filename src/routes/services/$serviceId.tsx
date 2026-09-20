import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";\nimport type { CSSProperties } from "react";
import { SERVICES, CONTACT, PERIOD_LABEL } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";

const ALIASES: Record<string,string> = {
  "seo-domination":"seo","seo-domination-system":"seo","referencement-naturel":"seo",
  "site-web":"websites","creation-site-web":"websites","creation-de-sites-web":"websites",
  "identite-visuelle":"branding","google-maps":"maps","google-maps-top-3":"maps",
  "community-management":"social","social-media":"social","webcare":"maintenance",
  "maintenance-cloud":"maintenance","e-commerce":"ecommerce","boutique-en-ligne":"ecommerce",
  "refonte":"websites","refonte-site":"websites","google-ads":"ads","publicite-digitale":"ads",
  "strategie-digitale":"strategy","conseil":"strategy"
};
const TINT: Record<string,string> = {
  websites:"#d7a35d", branding:"#b889d6", seo:"#6f9bd1", maps:"#5f9f9a",
  social:"#c66b87", maintenance:"#7e93ad", ecommerce:"#d88455", ads:"#c47b66", strategy:"#8b7fc4"
};
const IMG: Record<string,string> = {
  websites:"https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=90&w=2200",
  branding:"https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=90&w=2200",
  seo:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=90&w=2200",
  maps:"https://images.unsplash.com/photo-1524666041070-9e3c7be7b8e0?auto=format&fit=crop&q=90&w=2200",
  social:"https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=90&w=2200",
  maintenance:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=90&w=2200",
  ecommerce:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=90&w=2200"
};
const NEXT: Record<string,string> = { websites:"seo", branding:"websites", seo:"maps", maps:"social", social:"maintenance", maintenance:"ecommerce", ecommerce:"websites" };

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({params}) => {
    const id = ALIASES[params.serviceId.toLowerCase()] ?? params.serviceId.toLowerCase();
    const service = SERVICES.find(s => s.id === id);
    if (!service) throw notFound();
    return {service, canonicalId:id};
  },
  head: ({loaderData}) => loaderData?.service ? ({
    meta:[
      {title: loaderData.service.title.fr+" — XR Agency"},
      {name:"description",content:loaderData.service.description.fr},
      {property:"og:title",content:loaderData.service.title.fr+" — XR Agency"},
      {property:"og:description",content:loaderData.service.short.fr},
      {property:"og:type",content:"website"}
    ]
  }) : {meta:[{title:"Service — XR Agency"}]},
  component: ServiceDetail
});

function ServiceDetail(){
  const {service} = Route.useLoaderData();
  const {t,lang,price} = useLang();
  const tint=TINT[service.id] ?? "#d7a35d";
  const [activePlan,setActivePlan]=useState(Math.max(0,service.plans.findIndex(p=>p.popular)));
  const [faq,setFaq]=useState<number|null>(0);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{ window.scrollTo(0,0); const onScroll=()=>setScrolled(window.scrollY>420); window.addEventListener("scroll",onScroll,{passive:true}); return()=>window.removeEventListener("scroll",onScroll); },[service.id]);
  const plan=service.plans[activePlan] ?? service.plans[0];
  const next=NEXT[service.id] ? SERVICES.find(s=>s.id===NEXT[service.id]) : undefined;
  const whatsapp=CONTACT.whatsapp+"?text="+encodeURIComponent("Bonjour XR Agency, je souhaite parler de la prestation "+service.title.fr+" ("+price(plan.eur)+" €).");
  const copy={
    fr:{back:"Toutes les prestations",kicker:"XR / PRESTATION",hero:"Un levier. Une transformation. Un prochain mouvement.",cta:"Composer mon devis",whatsapp:"Parler sur WhatsApp",why:"Pourquoi cette prestation ?",deliver:"Ce que nous construisons",method:"Le déroulé",offer:"Choisissez votre niveau",proof:"Preuves & livrables",faq:"Questions avant de commencer",next:"Poursuivre l'exploration",recommend:"Configurer ce projet"},
    en:{back:"All services",kicker:"XR / SERVICE",hero:"One lever. One transformation. One next move.",cta:"Build my quote",whatsapp:"Talk on WhatsApp",why:"Why this service?",deliver:"What we build",method:"The process",offer:"Choose your level",proof:"Proof & deliverables",faq:"Questions before we start",next:"Continue exploring",recommend:"Configure this project"},
    vi:{back:"Tất cả dịch vụ",kicker:"XR / DỊCH VỤ",hero:"Một đòn bẩy. Một chuyển đổi. Một bước tiếp theo.",cta:"Tạo báo giá",whatsapp:"Trao đổi qua WhatsApp",why:"Tại sao dịch vụ này?",deliver:"Chúng tôi xây dựng gì",method:"Quy trình",offer:"Chọn cấp độ",proof:"Bằng chứng & bàn giao",faq:"Câu hỏi trước khi bắt đầu",next:"Tiếp tục khám phá",recommend:"Cấu hình dự án"}
  }[lang];

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground" style={{"--service-tint":tint} as CSSProperties}>
    <Nav/>
    <main>
      <section className="relative min-h-[92svh] overflow-hidden">
        <img src={IMG[service.id] ?? IMG.websites} alt="" className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02]"/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.62),rgba(0,0,0,.18)_42%,var(--background)_100%)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,color-mix(in_srgb,var(--service-tint)_30%,transparent),transparent_34%)]"/>
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1500px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-16">
          <a href="/services" className="inline-flex min-h-11 w-fit items-center rounded-full border border-white/20 bg-black/25 px-4 py-2 text-sm text-white/80 backdrop-blur hover:text-white">{copy.back}</a>
          <div className="max-w-6xl">
            <div className="mb-5 flex items-center gap-3"><span className="label-mono text-white/65">{copy.kicker} · {service.num}/07</span><span className="h-px w-14" style={{background:tint}}/></div>
            <h1 className="display-serif max-w-5xl text-[clamp(3.5rem,8.5vw,9rem)] leading-[.8] text-white">{t(service.title)}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">{t(service.short)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={"/?service="+service.id+"#quote"} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[.1em] text-primary-foreground hover:-translate-y-0.5 transition">{copy.cta}<ArrowRight className="h-4 w-4"/></a>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur hover:border-white/40"><MessageCircle className="h-4 w-4"/> {copy.whatsapp}</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">{service.highlights.slice(0,4).map((h,i)=><span key={i} className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/75 backdrop-blur">{t(h)}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-20 sm:py-28">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">
          <p className="label-mono text-primary">{copy.why}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="display-serif text-5xl leading-[.9] sm:text-7xl">{t(service.description)}</h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">{service.highlights.slice(0,3).map((h,i)=><div key={i} className="rounded-2xl border border-border/70 bg-card/55 p-5"><span className="label-mono text-primary">0{i+1}</span><p className="mt-3 text-base leading-6">{t(h)}</p></div>)}</div>
          </div>
        </div>
      </section>

      {service.metrics?.length ? <section className="py-16 sm:py-24"><div className="mx-auto grid max-w-[1300px] gap-3 px-5 sm:px-8 md:grid-cols-3 lg:px-12">{service.metrics.slice(0,3).map((m,i)=><div key={i} className="rounded-[1.5rem] border border-border/70 bg-card/45 p-7 sm:p-9"><p className="display-serif text-4xl sm:text-5xl" style={{color:tint}}>{m.metric}</p><p className="mt-3 text-sm font-semibold uppercase tracking-[.08em]">{t(m.label)}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{t(m.desc)}</p></div>)}</div></section> : null}

      <section className="border-y border-border/60 bg-accent/20 py-20 sm:py-28">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">
          <p className="label-mono text-primary">{copy.method}</p>
          <h2 className="display-serif mt-4 text-5xl sm:text-7xl">{lang==="fr"?"Du premier échange à la mise en ligne.":lang==="en"?"From first exchange to launch.":"Từ trao đổi đầu tiên đến triển khai."}</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(service.steps ?? []).slice(0,4).map((step,i)=><article key={i} className="rounded-[1.5rem] border border-border/70 bg-card/60 p-6 sm:p-8"><span className="label-mono text-primary">{step.num}</span><h3 className="display-serif mt-6 text-2xl">{t(step.title)}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{t(step.desc)}</p></article>)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="label-mono text-primary">{copy.offer}</p><h2 className="display-serif mt-4 text-5xl sm:text-7xl">{lang==="fr"?"Choisissez ce qui correspond à votre ambition.":lang==="en"?"Choose the level that matches your ambition.":"Chọn cấp độ phù hợp với mục tiêu."}</h2></div><span className="label-mono text-muted-foreground">{service.plans.length} {lang==="fr"?"options":lang==="en"?"options":"lựa chọn"}</span></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {service.plans.map((p,i)=><button key={i} type="button" onClick={()=>setActivePlan(i)} className={"group rounded-[1.5rem] border p-6 text-left transition duration-300 hover:-translate-y-1 sm:p-8 "+(i===activePlan?"border-primary bg-primary/[.07] shadow-2xl shadow-primary/10":"border-border/70 bg-card/45 hover:border-primary/40")}>
              <div className="flex items-start justify-between gap-3"><span className="label-mono text-muted-foreground">0{i+1}</span>{p.popular&&<span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{lang==="fr"?"Populaire":lang==="en"?"Popular":"Phổ biến"}</span>}</div>
              <h3 className="display-serif mt-7 text-3xl">{t(p.name)}</h3>
              {p.audience&&<p className="mt-2 text-sm text-muted-foreground">{t(p.audience)}</p>}
              <p className="mt-6 text-3xl font-semibold">{price(p.eur)} € <span className="text-sm font-normal text-muted-foreground">{t(PERIOD_LABEL[p.period])}</span></p>
              <ul className="mt-6 space-y-2">{p.features.slice(0,6).map((f,j)=><li key={j} className="flex gap-2 text-sm leading-5"><Check className="mt-0.5 h-4 w-4 shrink-0" style={{color:tint}}/>{t(f)}</li>)}</ul>
            </button>)}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-primary/30 bg-primary/[.055] p-7 sm:p-9"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="label-mono text-primary">{copy.recommend}</p><p className="mt-2 text-lg">{t(plan.name)} · <strong>{price(plan.eur)} €</strong> {t(PERIOD_LABEL[plan.period])}</p></div><a href={"/?service="+service.id+"#quote"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">{copy.cta}<ArrowRight className="h-4 w-4"/></a></div></div>
        </div>
      </section>

      {service.deliverables?.length ? <section className="border-y border-border/60 py-20 sm:py-28"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12"><p className="label-mono text-primary">{copy.deliver}</p><div className="mt-10 grid gap-4 md:grid-cols-2">{service.deliverables.slice(0,8).map((d,i)=><div key={i} className="flex gap-5 rounded-2xl border border-border/70 bg-card/45 p-6"><span className="label-mono text-primary">0{(i%9)+1}</span><div><h3 className="text-base font-semibold">{t(d.title)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{t(d.desc)}</p></div></div>)}</div></div></section>:null}

      {service.serviceFaqs?.length ? <section className="py-20 sm:py-28"><div className="mx-auto max-w-4xl px-5 sm:px-8"><p className="label-mono text-primary">{copy.faq}</p><h2 className="display-serif mt-4 text-5xl sm:text-7xl">{lang==="fr"?"Les réponses avant le clic.":lang==="en"?"Answers before the click.":"Giải đáp trước khi bắt đầu."}</h2><div className="mt-10 divide-y divide-border/60 border-y border-border/60">{service.serviceFaqs.slice(0,8).map((f,i)=><button key={i} type="button" onClick={()=>setFaq(faq===i?null:i)} className="w-full py-5 text-left"><div className="flex items-center justify-between gap-6"><span className="text-base font-semibold">{t(f.q)}</span><ChevronDown className={"h-5 w-5 shrink-0 transition "+(faq===i?"rotate-180 text-primary":"")}/></div>{faq===i&&<p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{t(f.a)}</p>}</button>)}</div></div></section>:null}

      <section className="border-t border-border/60 py-20 sm:py-28"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12"><div className="rounded-[2rem] border border-primary/25 bg-primary/[.06] p-8 sm:p-12 lg:p-16"><Sparkles className="h-6 w-6 text-primary"/><h2 className="display-serif mt-5 max-w-5xl text-5xl sm:text-7xl">{lang==="fr"?"Le prochain écran est votre devis.":lang==="en"?"The next screen is your quote.":"Bước tiếp theo là báo giá của bạn."}</h2><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{lang==="fr"?"Le configurateur XR Intelligence reprend votre activité, votre budget et vos priorités pour composer le plan le plus cohérent.":lang==="en"?"XR Intelligence uses your activity, budget and priorities to build the most coherent plan.":"XR Intelligence dùng hoạt động, ngân sách và ưu tiên của bạn để xây dựng kế hoạch phù hợp."}</p><a href={"/?service="+service.id+"#quote"} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground">{copy.cta}<ArrowRight className="h-4 w-4"/></a></div></div></section>

      {next&&<section className="border-t border-border/60 py-12"><div className="mx-auto flex max-w-[1300px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><div><p className="label-mono text-muted-foreground">{copy.next}</p><h3 className="display-serif mt-2 text-3xl">{t(next.title)}</h3></div><a href={"/services/"+next.id} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-primary">{lang==="fr"?"Explorer ensuite":lang==="en"?"Explore next":"Khám phá tiếp"}<ArrowRight className="h-4 w-4"/></a></div></section>}
    </main>
    {scrolled&&<div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/90 p-3 backdrop-blur-xl sm:hidden"><a href={"/?service="+service.id+"#quote"} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">{copy.cta}<ArrowRight className="h-4 w-4"/></a></div>}
    <Contact/>
  </div>;
}
