import { ArrowRight, FileImage, Search, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

const whatsapp = (message: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

const actions = [
  { id: "analysis", label: "Lancer mon analyse", kicker: "XR Intelligence · Julie", text: "Votre stratégie, en quelques étapes.", icon: Search, href: "#quote", primary: true },
  { id: "mockup", label: "Maquette gratuite", kicker: "Valeur 200 € · offerte", text: "Une première direction créative.", icon: FileImage, href: whatsapp("Bonjour XRAGENCY, je souhaite demander ma maquette gratuite (valeur 200 €). Je vous envoie mon activité, mon site, mon logo et mes références."), primary: false },
  { id: "audit", label: "Audit digital gratuit", kicker: "Offert · sans engagement", text: "Voyez ce qui freine votre présence.", icon: Sparkles, href: whatsapp("Bonjour XRAGENCY, je souhaite demander mon audit digital gratuit personnalisé. Voici mon activité et mon site."), primary: false },
];

export function ConversionHub() {
  return (
    <section id="conversion" className="relative scroll-mt-20 border-b border-border/60 bg-background py-5 sm:py-7">
      <div className="mx-auto max-w-[1380px] px-5 md:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <div className="hidden shrink-0 items-center gap-3 px-1 lg:flex lg:w-[210px]">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-primary/25 bg-primary/[0.06] text-primary"><Sparkles className="h-3.5 w-3.5" /></span>
            <div><div className="label-mono text-[8px] uppercase tracking-[.2em] text-primary">Commencer</div><div className="mt-1 text-xs text-muted-foreground">Choisissez votre entrée.</div></div>
          </div>
          <div className="grid flex-1 gap-2 sm:grid-cols-3">
            {actions.map(({ id, label, kicker, text, icon: Icon, href, primary }) => (
              <a key={id} href={href} target={id === "analysis" ? undefined : "_blank"} rel={id === "analysis" ? undefined : "noreferrer"} className={`group relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-[1.35rem] border px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[126px] sm:px-5 ${primary ? "border-primary/35 bg-primary/[0.055] hover:border-primary/60" : "border-border bg-card/60 hover:border-primary/30"}`}>
                {primary && <span aria-hidden className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/15 blur-3xl transition group-hover:scale-125" />}
                <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border ${primary ? "border-primary/25 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground group-hover:text-primary"}`}><Icon className="h-4 w-4" /></span>
                <span className="relative min-w-0 flex-1"><span className={`label-mono block text-[7px] uppercase tracking-[.17em] ${primary ? "text-primary" : "text-muted-foreground"}`}>{kicker}</span><span className="mt-1 block text-sm font-semibold tracking-[-.02em] sm:text-[15px]">{label}</span><span className="mt-1 block truncate text-[10px] text-muted-foreground">{text}</span></span>
                <ArrowRight className="relative h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
