import { ArrowUpRight, FileImage, Search, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/content";

const whatsapp = (message: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

function BrowserPreview() {
  return (
    <div className="relative mt-7 overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#111]/90 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" /><span className="h-1.5 w-1.5 rounded-full bg-white/25" /><span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-white/[0.06]" />
      </div>
      <div className="relative h-28 overflow-hidden p-4">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative h-2 w-20 rounded-full bg-white/80" />
        <div className="relative mt-3 h-1.5 w-36 rounded-full bg-white/20" />
        <div className="mt-5 grid grid-cols-3 gap-2">
          <span className="h-10 rounded-lg bg-white/[0.07]" /><span className="h-10 rounded-lg bg-primary/15" /><span className="h-10 rounded-lg bg-white/[0.05]" />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[.16em] text-primary">Direction créative</div>
    </div>
  );
}

function SearchPreview() {
  return (
    <div className="relative mt-7 rounded-[1.35rem] border border-border bg-background/80 p-4 shadow-xl">
      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/25 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[9px] text-muted-foreground">votre activité + votre ville</span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[12px] font-bold">G</span><span className="h-1.5 w-28 rounded-full bg-foreground/60" /></div>
        <div className="h-1.5 w-40 rounded-full bg-muted-foreground/25" />
        <div className="h-1.5 w-32 rounded-full bg-muted-foreground/20" />
        <div className="mt-3 flex gap-1.5"><span className="h-5 w-14 rounded-full bg-primary/10" /><span className="h-5 w-20 rounded-full bg-muted" /><span className="h-5 w-16 rounded-full bg-muted" /></div>
      </div>
      <div className="absolute -right-2 -top-2 rounded-full border border-primary/30 bg-background px-2.5 py-1 label-mono text-[7px] uppercase tracking-[.16em] text-primary">+200 € offert</div>
    </div>
  );
}

export function ConversionHub() {
  const mockup = whatsapp("Bonjour XRAGENCY, je souhaite demander ma maquette gratuite (valeur 200 €). Je vous envoie mon activité, mon site, mon logo et mes références.");
  const audit = whatsapp("Bonjour XRAGENCY, je souhaite demander mon audit digital gratuit personnalisé. Voici mon activité et mon site.");

  return (
    <section id="conversion" className="relative overflow-hidden border-y border-border/50 bg-background py-16 sm:py-20 lg:py-24 scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.28]" style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(circle at center, black, transparent 75%)" }} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[100px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.05] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[.24em] text-primary"><Sparkles className="h-3 w-3" /> Votre premier avantage est offert</div>
          <h2 className="display-serif text-4xl leading-[.92] tracking-tight sm:text-6xl lg:text-7xl">Avant de vous vendre quoi que ce soit,<br /><span className="text-muted-foreground">montrez-nous votre terrain.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Choisissez votre point de départ. Une maquette pour voir la direction. Un audit pour comprendre ce qui bloque. <span className="text-foreground">Sans engagement.</span></p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <a href={mockup} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[2rem] border border-primary/30 bg-[#0d0d0d] p-6 text-white shadow-[0_35px_100px_-55px_rgba(0,0,0,.95)] transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_45px_120px_-55px_rgba(0,0,0,.95)] sm:p-9 lg:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-[90px] transition duration-700 group-hover:scale-125" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div><span className="label-mono text-[8px] uppercase tracking-[.22em] text-primary">01 · Creative preview</span><h3 className="display-serif mt-4 text-4xl leading-[.9] sm:text-5xl">Maquette<br />gratuite.</h3></div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06]"><FileImage className="h-4 w-4" /></span>
              </div>
              <p className="mt-5 max-w-lg text-sm leading-6 text-white/60">Une première direction visuelle pensée pour votre marque, votre marché et votre conversion. <span className="text-white">Valeur 200 € · offert.</span></p>
              <BrowserPreview />
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5"><span className="text-[9px] font-semibold uppercase tracking-[.16em]">Demander ma maquette</span><span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span></div>
            </div>
          </a>

          <a href={audit} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/75 p-6 shadow-[0_35px_100px_-60px_rgba(0,0,0,.7)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-primary/40 sm:p-9 lg:p-10">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/[0.08] blur-[90px] transition duration-700 group-hover:scale-125" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div><span className="label-mono text-[8px] uppercase tracking-[.22em] text-primary">02 · Digital diagnosis</span><h3 className="display-serif mt-4 text-4xl leading-[.9] sm:text-5xl">Audit digital<br />gratuit.</h3></div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background"><Search className="h-4 w-4" /></span>
              </div>
              <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">On regarde votre présence comme un prospect : <span className="text-foreground">image, visibilité, parcours et conversion.</span> Vous repartez avec des pistes concrètes.</p>
              <SearchPreview />
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5"><span className="text-[9px] font-semibold uppercase tracking-[.16em]">Recevoir mon audit</span><span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span></div>
            </div>
          </a>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center label-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground"><span>100 % offert</span><span className="h-1 w-1 rounded-full bg-border" /><span>Sans engagement</span><span className="h-1 w-1 rounded-full bg-border" /><span>Réponse humaine</span><span className="h-1 w-1 rounded-full bg-border" /><span>FR · EN · VI</span></div>
      </div>
    </section>
  );
}
