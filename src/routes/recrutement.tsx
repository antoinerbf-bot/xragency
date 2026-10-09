import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, DollarSign, Globe2, Mail, MessageCircle, Percent, Sparkles, TrendingUp, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/recrutement")({
  head: () => ({
    meta: [
      { title: "Recrutement & Affiliation — XR Agency" },
      { name: "description", content: "Rejoignez XR Agency : nous recrutons des commerciaux internationaux et proposons un programme d'affiliation offrant 10% à 20% de commission sur le CA généré." },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/recrutement" }],
  }),
  component: RecruitmentPage,
});

function RecruitmentPage() {
  const { t } = useLang();
  const mailSubject = encodeURIComponent("Candidature / Programme Affiliation — XR Agency");
  const mailBody = encodeURIComponent("Bonjour XR Agency,\n\nJe souhaite postuler en tant que commercial / rejoindre le programme d'affiliation.\n\nNom & Prénom :\nLangues parlées :\nExpérience commerciale ou réseau :\nVille / Pays :\nWhatsApp :\n\nMerci,");
  const mailto = `mailto:${CONTACT.email}?subject=${mailSubject}&body=${mailBody}`;
  const waAffiliate = `${CONTACT.whatsapp}?text=${encodeURIComponent("Bonjour XR Agency, je souhaite postuler comme commercial / rejoindre votre programme d'affiliation (10% à 20% de commission).")}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/70">
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 76% 24%, rgba(16,185,129,.12), transparent 30%), radial-gradient(circle at 12% 70%, rgba(255,255,255,.05), transparent 30%)" }} />
          <div className="relative mx-auto grid min-h-[75vh] max-w-[1500px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-12">
            <div>
              <Link to="/" className="label-mono inline-flex items-center gap-2 text-[8px] tracking-[.18em] text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> Accueil
              </Link>
              <span className="mt-8 block label-mono text-[9px] tracking-[.32em] text-emerald-500 font-bold">
                XR / RECRUTEMENT & PROGRAMME AFFILIATION
              </span>
              <h1 className="display-serif mt-5 max-w-5xl text-[clamp(3.5rem,7.5vw,7.8rem)] leading-[.82] tracking-[-.07em]">
                Générez des revenus.<br />
                <em className="not-italic text-emerald-500">Peu importe votre langue.</em>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                XR Agency recrute activement des <strong>commerciaux indépendants</strong> dans le monde entier et récompense les clients et apporteurs d’affaires avec <strong>10% à 20% du chiffre d'affaires apporté</strong>, déductible sur vos offres ou versé directement.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={waAffiliate}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-7 py-4 text-[9.5px] font-bold uppercase tracking-[.14em] text-white shadow-xl transition hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" /> Postuler sur WhatsApp
                </a>
                <a
                  href={mailto}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground transition hover:border-primary"
                >
                  Postuler par e-mail <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-card via-background to-card p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <span className="label-mono text-[8px] tracking-[.25em] text-emerald-500 font-bold">PROGRAMME BOUCHE-À-OREILLE & APPORTEURS</span>
              <h3 className="display-serif mt-3 text-3xl sm:text-4xl">10% à 20% de Commission</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Recommandez nos expertises (création de site, branding, SEO, Google Maps, robots Korben) à votre réseau ou vos clients.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white font-bold text-base">
                    10%
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Base garantie dès la 1ère mise en relation</h4>
                    <p className="text-[10px] text-muted-foreground">Déductible immédiatement sur vos prestations ou versé en commission nette.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-foreground text-background font-bold text-base">
                    20%
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Jusqu'à 20% sur les projets d'envergure</h4>
                    <p className="text-[10px] text-muted-foreground">Sur les refontes globales, déploiements robotiques et contrats annuels récurrents.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/70 pt-4 flex items-center justify-between text-[9px]">
                <span className="label-mono text-muted-foreground">100% TRANSPARENT</span>
                <span className="label-mono font-bold text-emerald-500">SUIVI COMMERCIAL ASSURÉ PAR XR</span>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial hiring focus */}
        <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-sm">
              <Globe2 className="h-6 w-6 text-emerald-500" />
              <h3 className="mt-4 text-xl font-bold">Toutes les langues acceptées</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Français, Anglais, Espagnol, Arabe, Vietnamien, Russe, Mandarin... Nous accompagnons une clientèle internationale.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-sm">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              <h3 className="mt-4 text-xl font-bold">Commissions déplafonnées</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Touchez votre pourcentage sur chaque contrat signé (sites de 499 € à 10K€+, SEO à 299€/m, Google Maps 990€, robots jusqu'à 21K€).
              </p>
            </div>
            <div className="rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-sm">
              <Sparkles className="h-6 w-6 text-emerald-500" />
              <h3 className="mt-4 text-xl font-bold">Outils & supports fournis</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Fiches produits, simulateurs, grilles tarifaires officielles et accompagnement direct de notre direction commerciale.
              </p>
            </div>
          </div>

          <div className="mt-20 rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-card to-background p-8 sm:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div>
                <span className="label-mono text-[8px] tracking-[.3em] text-emerald-500 font-bold">REJOINDRE L'ÉQUIPE COMMERCIALE</span>
                <h2 className="display-serif mt-3 text-4xl sm:text-6xl text-foreground">
                  Vous avez du réseau ? Transformez-le en actif.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                  Que vous soyez commercial expérimenté, apporteur d'affaires, freelance ou simplement un client satisfait qui parle de nous, commencez dès aujourd'hui sans formalités complexes.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={waAffiliate}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-4 text-xs font-bold uppercase tracking-[.14em] text-white shadow-xl hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" /> Discuter sur WhatsApp
                </a>
                <a
                  href={mailto}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground hover:bg-muted"
                >
                  Candidater par email
                </a>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
