import { ArrowRight, FileImage, Search, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

const links = {
  analysis: "#quote",
  mockup: `${CONTACT.whatsapp}?text=${encodeURIComponent("Bonjour XRAGENCY, je souhaite recevoir ma maquette gratuite (valeur 200 €). Voici mon activité, mon site et mes références :")}`,
  audit: `${CONTACT.whatsapp}?text=${encodeURIComponent("Bonjour XRAGENCY, je souhaite recevoir mon audit digital gratuit personnalisé (valeur +200 €). Voici mon activité et mon site :")}`,
};

export function ConversionHub() {
  return <section id="conversion" className="relative border-y border-border/50 bg-background py-10 sm:py-14 lg:py-16 scroll-mt-20">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="mb-7 flex items-end justify-between gap-5">
        <div><div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-primary"><Sparkles className="h-3.5 w-3.5" /> Commencer</div><h2 className="display-serif text-3xl tracking-tight sm:text-5xl">Trois façons d’entrer chez XRAGENCY.</h2></div>
        <span className="hidden label-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:block">01 · Choisir votre point de départ</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.35fr_.825fr_.825fr]">
        <a href={links.analysis} className="group relative overflow-hidden rounded-[1.75rem] border border-primary/30 bg-primary/[0.055] p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_30px_90px_-45px_rgba(0,0,0,.8)] sm:p-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl transition group-hover:scale-125" />
          <div className="relative flex h-full min-h-[220px] flex-col justify-between"><div><div className="flex items-center justify-between"><span className="rounded-full border border-primary/25 bg-background/70 px-3 py-1 label-mono text-[8px] uppercase tracking-[0.18em] text-primary">XR Intelligence · Alexandre</span><Search className="h-5 w-5 text-primary" /></div><h3 className="display-serif mt-7 max-w-xl text-3xl leading-[.95] sm:text-4xl">Lancer mon analyse.</h3><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">Répondez à quelques questions. Alexandre adapte les recommandations à votre activité, votre objectif, votre situation et votre acquisition, puis construit votre devis.</p></div><div className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">Commencer l’analyse <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></div></div>
        </a>
        <a href={links.mockup} target="_blank" rel="noreferrer" className="group rounded-[1.75rem] border border-border bg-card/50 p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-7">
          <div className="flex h-full min-h-[220px] flex-col justify-between"><div><div className="flex items-center justify-between"><span className="label-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">Offert · valeur 200 €</span><FileImage className="h-5 w-5 text-muted-foreground group-hover:text-primary" /></div><h3 className="display-serif mt-7 text-2xl leading-[.98] sm:text-3xl">Maquette gratuite.</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Une direction créative concrète avant de vous engager. Envoyez votre site, logo et références directement à l’équipe.</p></div><div className="mt-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">Lancer ma maquette <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></div></div>
        </a>
        <a href={links.audit} target="_blank" rel="noreferrer" className="group rounded-[1.75rem] border border-border bg-card/50 p-6 transition duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-7">
          <div className="flex h-full min-h-[220px] flex-col justify-between"><div><div className="flex items-center justify-between"><span className="label-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">Offert · personnalisé</span><Sparkles className="h-5 w-5 text-muted-foreground group-hover:text-primary" /></div><h3 className="display-serif mt-7 text-2xl leading-[.98] sm:text-3xl">Audit digital gratuit.</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Identifiez les freins à votre visibilité, votre image et votre conversion avant d’investir.</p></div><div className="mt-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">Recevoir mon audit <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></div></div>
        </a>
      </div>
    </div>
  </section>;
}
