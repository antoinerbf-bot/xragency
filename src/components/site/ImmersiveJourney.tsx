import { ArrowUpRight, BarChart3, Globe2, MapPin, Palette, Search, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Parallax } from "./primitives";

const cards = [
  { icon: Globe2, label: "01 · WEB", title: "Une présence qui donne confiance", text: "Un site pensé pour présenter votre activité, convaincre et transformer les visites en demandes." },
  { icon: Palette, label: "02 · BRAND", title: "Une identité reconnaissable", text: "Direction artistique, identité visuelle et contenus alignés sur votre positionnement." },
  { icon: Search, label: "03 · SEO", title: "Être trouvé au bon moment", text: "Structure, contenu et visibilité locale pour capter une demande déjà existante." },
  { icon: MapPin, label: "04 · LOCAL", title: "Dominer votre zone", text: "Google Maps, présence locale et signaux de confiance pour les recherches à proximité." },
];

export function ImmersiveJourney() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/40" aria-label="La méthode XR Agency">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,hsl(var(--primary)/.13),transparent_28%),radial-gradient(circle_at_10%_80%,hsl(var(--primary)/.07),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Parallax speed={-0.025}>
            <span className="label-mono text-[9px] tracking-[.3em] text-primary">XR AGENCY · LA MÉTHODE</span>
            <h2 className="display-serif mt-5 max-w-2xl text-[clamp(3rem,7vw,6.8rem)] leading-[.86] tracking-[-.04em]">
              Votre digital,
              <br />
              <em className="text-primary/80">construit.</em>
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Pas de catalogue de solutions plaquées. Nous partons de votre activité,
              de vos objectifs et de vos clients pour assembler le système digital qui vous correspond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#quote" className="inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 label-mono text-[9px] font-semibold tracking-[.12em] text-primary-foreground transition hover:-translate-y-1">
                Construire mon projet <ArrowUpRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-3 label-mono text-[8px] tracking-[.16em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> SUR MESURE
              </span>
            </div>
          </Parallax>

          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Parallax key={card.label} speed={index % 2 === 0 ? -0.018 : 0.018}>
                  <article className="group relative min-h-[250px] overflow-hidden rounded-[1.6rem] border border-border/70 bg-background/75 p-6 shadow-[0_25px_70px_-50px_rgba(0,0,0,.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/40">
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-[8px] tracking-[.2em] text-muted-foreground">{card.label}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary transition group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-12">
                      <h3 className="display-serif text-3xl leading-[.95]">{card.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">{card.text}</p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:scale-150" />
                    {card.label.includes("SEO") && <BarChart3 className="absolute bottom-5 right-6 h-4 w-4 text-primary/35" />}
                  </article>
                </Parallax>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
