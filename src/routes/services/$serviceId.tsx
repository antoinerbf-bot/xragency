import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { SERVICES, PERIOD_LABEL, CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Reveal } from "@/components/site/primitives";
import { LocalVisibilityExperience } from "@/components/site/LocalVisibilityExperience";
import { SocialManagementExperience } from "@/components/site/SocialManagementExperience";

const ACTIVE_IDS = ["websites", "branding", "seo", "maps", "social", "maintenance", "ecommerce"];
const SERVICE_IMAGES: Record<string, string> = {
  websites: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=85",
  branding: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1800&q=85",
  seo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85",
  maps: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=85",
  social: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1800&q=85",
  maintenance: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85",
};

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const id = params.serviceId.toLowerCase();
    if (!ACTIVE_IDS.includes(id)) throw notFound();
    const service = SERVICES.find((item) => item.id === id);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return { meta: [{ title: "Service — XR Agency" }] };
    return { meta: [{ title: `${service.title.fr} — XR Agency` }, { name: "description", content: service.description.fr }, { property: "og:title", content: `${service.title.fr} — XR Agency` }, { property: "og:description", content: service.description.fr }, { property: "og:type", content: "website" }] };
  },
  component: ServiceDetailPage,
});

function formatPrice(value: number, lang: string) {
  const locale = lang === "vi" ? "vi-VN" : lang === "en" ? "en-GB" : "fr-FR";
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)} €`;
}

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const { t, lang } = useLang();
  const [selectedPlan, setSelectedPlan] = useState(Math.max(service.plans.findIndex((plan) => plan.popular), 0));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const plan = service.plans[selectedPlan];
  const isSpecial = service.id === "maps" || service.id === "social";
  const waUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Bonjour XR Agency, je souhaite parler du service « ${service.title[lang]} »${plan ? ` et du forfait « ${plan.name[lang]} »` : ""}.`)}`;
  const serviceNumber = String(ACTIVE_IDS.indexOf(service.id) + 1).padStart(2, "0");

  return <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground"><div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ background: "var(--gradient-halo)" }} /><Nav /><main className="relative z-10 pt-28">
    <div className="mx-auto max-w-7xl px-6 pt-4 lg:px-10"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4"><Link to="/services" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />{t({ fr: "Catalogue des services", en: "Services catalogue", vi: "Danh mục dịch vụ" })}</Link><div className="label-mono text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Accueil</Link> / Services / {t(service.title)}</div></div></div>
    <section className="py-16 lg:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:px-10"><div><Reveal><div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary"><Sparkles className="h-3.5 w-3.5" /><span className="label-mono text-xs uppercase tracking-widest">{serviceNumber} / 07</span></div></Reveal><Reveal delay={80}><h1 className="display-serif mt-6 text-[clamp(2.8rem,7vw,6.4rem)] leading-[.95] tracking-tight">{t(service.title)}</h1></Reveal><Reveal delay={160}><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t(service.description)}</p></Reveal><Reveal delay={240}><div className="mt-9 flex flex-wrap gap-3"><a href={isSpecial ? "#contact" : "#plans"} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">{t({ fr: "Voir les offres", en: "View offers", vi: "Xem các gói" })}<ArrowRight className="h-4 w-4" /></a><a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest hover:border-primary hover:text-primary"><MessageCircle className="h-4 w-4" />WhatsApp</a></div></Reveal></div>{SERVICE_IMAGES[service.id] && <Reveal delay={120} className="overflow-hidden rounded-[2rem] border border-border/70 bg-card"><img src={SERVICE_IMAGES[service.id]} alt={t(service.title)} className="aspect-[4/3] w-full object-cover" loading="eager" /></Reveal>}</div></section>
    {service.id === "maps" && <LocalVisibilityExperience />}{service.id === "social" && <SocialManagementExperience />}
    {!isSpecial && service.highlights.length > 0 && <section className="border-y border-border/60 bg-card/25 py-10"><div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">{service.highlights.slice(0, 4).map((item, index) => <div key={index} className="rounded-2xl border border-border/70 bg-background/50 p-5"><span className="label-mono text-[10px] text-primary">0{index + 1}</span><p className="mt-3 text-sm font-medium leading-relaxed">{t(item)}</p></div>)}</div></section>}
    {!isSpecial && <section id="plans" className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><Reveal><p className="label-mono text-xs uppercase tracking-widest text-primary">{t({ fr: "Les offres", en: "Offers", vi: "Các gói dịch vụ" })}</p><h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">{t({ fr: "Choisissez le niveau d'accompagnement adapté à votre projet.", en: "Choose the level of support that fits your project.", vi: "Chọn cấp độ đồng hành phù hợp với dự án của bạn." })}</h2></Reveal><div className="mt-12 grid gap-6 lg:grid-cols-3">{service.plans.map((item, index) => <button key={index} type="button" onClick={() => setSelectedPlan(index)} className={`rounded-[2rem] border p-7 text-left transition-all sm:p-8 ${index === selectedPlan ? "border-primary bg-primary/[0.06] shadow-xl" : "border-border bg-card/70 hover:border-primary/40"}`}><div className="flex items-start justify-between gap-4"><span className="label-mono text-xs text-primary">0{index + 1} / {String(service.plans.length).padStart(2, "0")}</span>{item.popular && <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">{t({ fr: "RECOMMANDÉ", en: "RECOMMENDED", vi: "ĐỀ XUẤT" })}</span>}</div><h3 className="display-serif mt-5 text-3xl">{t(item.name)}</h3>{item.audience && <p className="mt-3 text-sm text-muted-foreground">{t(item.audience)}</p>}<div className="mt-7 flex items-end gap-2 border-y border-border/60 py-5"><span className="display-serif text-4xl text-primary">{formatPrice(item.eur, lang)}</span><span className="label-mono mb-1 text-xs text-muted-foreground">{t(PERIOD_LABEL[item.period])}</span></div><ul className="mt-6 space-y-3">{item.features.slice(0, 8).map((feature, featureIndex) => <li key={featureIndex} className="flex gap-3 text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{t(feature)}</span></li>)}</ul></button>)}</div><div className="mt-8 flex flex-col gap-5 rounded-[2rem] border border-primary/30 bg-primary/[0.05] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"><div><p className="label-mono text-xs uppercase tracking-widest text-primary">{t({ fr: "Sélection", en: "Selected", vi: "Đã chọn" })}</p><p className="mt-2 text-lg font-medium">{t(plan.name)} · {formatPrice(plan.eur, lang)}</p></div><a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">{t({ fr: "Démarrer mon projet", en: "Start my project", vi: "Bắt đầu dự án" })}<ArrowRight className="h-4 w-4" /></a></div></div></section>}
    {service.steps?.length && !isSpecial ? <section className="border-y border-border/60 bg-card/25 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><p className="label-mono text-xs uppercase tracking-widest text-primary">{t({ fr: "Process", en: "Process", vi: "Quy trình" })}</p><div className="mt-10 divide-y divide-border/60 border-y border-border/60">{service.steps.map((step) => <div key={step.num} className="grid gap-4 py-7 md:grid-cols-[100px_260px_1fr] md:items-start"><span className="label-mono text-xs text-primary">{step.num}</span><h3 className="display-serif text-2xl">{t(step.title)}</h3><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(step.desc)}</p></div>)}</div></div></section> : null}
    {service.serviceFaqs?.length ? <section className="py-20 lg:py-28"><div className="mx-auto max-w-5xl px-6 lg:px-10"><p className="label-mono text-xs uppercase tracking-widest text-primary">FAQ</p><div className="mt-8 divide-y divide-border/60 border-y border-border/60">{service.serviceFaqs.map((faq, index) => { const open = openFaq === index; return <button key={index} type="button" onClick={() => setOpenFaq(open ? null : index)} className="block w-full py-6 text-left"><div className="flex items-center justify-between gap-6"><h3 className="text-base font-medium sm:text-lg">{t(faq.q)}</h3><span className="label-mono text-xs text-primary">{open ? "−" : "+"}</span></div>{open && <p className="mt-4 max-w-3xl pr-8 text-sm leading-relaxed text-muted-foreground">{t(faq.a)}</p>}</button>; })}</div></div></section> : null}
    <section id="contact" className="border-t border-border/60 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="rounded-[2rem] border border-border bg-card/70 p-8 sm:p-12 lg:p-16"><p className="label-mono text-xs uppercase tracking-widest text-primary">XRAGENCY</p><h2 className="display-serif mt-4 max-w-4xl text-4xl sm:text-6xl">{t({ fr: "Un projet à construire ? Parlons-en.", en: "Have a project to build? Let's talk.", vi: "Bạn có dự án cần xây dựng? Hãy trao đổi." })}</h2><div className="mt-8"><a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground">WhatsApp <ArrowRight className="h-4 w-4" /></a></div></div></div></section>
    <Contact />
  </main></div>;
}
