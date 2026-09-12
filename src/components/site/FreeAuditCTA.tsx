import { ArrowRight, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

export function FreeAuditCTA() {
  const message = encodeURIComponent("Bonjour XR Agency, je souhaite recevoir mon analyse & audit digital personnalisé gratuitement (valeur +200 €). Voici mon activité :");
  return <section className="px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
    <div className="mx-auto max-w-[1500px]">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[0.06] p-6 sm:p-10 lg:p-14">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-2 text-primary"><Sparkles className="h-4 w-4" /><span className="label-mono text-[9px] uppercase tracking-[0.25em]">XR AGENCY · OFFERT</span></div>
          <h2 className="display-serif mt-4 text-4xl leading-[.95] sm:text-6xl lg:text-7xl">Votre présence digitale mérite mieux.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Demandez votre analyse & audit personnalisé gratuitement. Nous identifions les points qui freinent votre visibilité, votre image et votre conversion.</p>
          <div className="mt-5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-primary/25 bg-background/70 px-3 py-1.5 label-mono text-[9px] text-primary">Valeur : +200 €</span><span className="rounded-full border border-border bg-background/60 px-3 py-1.5 label-mono text-[9px] text-muted-foreground">100 % offert</span><span className="rounded-full border border-border bg-background/60 px-3 py-1.5 label-mono text-[9px] text-muted-foreground">Sans engagement</span></div>
          <div className="mt-7 flex flex-wrap gap-3"><a href={`${CONTACT.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">Recevoir mon audit gratuit <ArrowRight className="h-4 w-4" /></a><a href="#contact" className="inline-flex items-center rounded-full border border-border bg-background/60 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider">Parler à un expert</a></div>
        </div>
      </div>
    </div>
  </section>;
}
