import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Gauge, Search, Smartphone, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { EmberButton } from "@/components/site/primitives";

export const Route = createFileRoute("/refonte-site-internet")({
  head: () => ({
    meta: [
      { title: "Refonte site internet à partir de 999 € — XRagency." },
      { name: "description", content: "Refonte de site internet sur-mesure à partir de 999 €. UX, design premium, responsive, SEO technique, conversion, performance et accompagnement." },
    ],
  }),
  component: WebsiteRedesignPage,
});

const reasons = [
  [Sparkles, "Une image qui correspond enfin à votre niveau", "Votre site est souvent le premier point de contact. Nous reconstruisons l'interface autour de votre positionnement, de votre identité et de la valeur réelle de votre offre."],
  [Smartphone, "Une vraie expérience mobile", "Pas une version desktop simplement compressée. Les parcours, boutons, contenus, espacements et interactions sont pensés pour mobile, tablette et desktop."],
  [Zap, "Plus rapide, plus clair, plus fluide", "Nous supprimons les éléments inutiles, optimisons les médias, structurons le code et travaillons la hiérarchie visuelle pour réduire la friction."],
  [Search, "Le SEO est intégré dès la refonte", "Structure des pages, balises, contenus, maillage interne et bases techniques sont pensés pour que le nouveau site puisse être correctement compris par les moteurs."],
  [Gauge, "Chaque écran doit servir un objectif", "Nous retravaillons les CTA, formulaires, preuves, arguments, objections et parcours afin de guider naturellement le visiteur vers la prochaine action."],
  [ShieldCheck, "Une base technique propre", "Migration, HTTPS, redirections, sauvegardes, formulaires, analytics et contrôles essentiels sont traités avec une logique de continuité."],
];

const process = [
  ["01", "Audit de l'existant", "Analyse du site actuel, contenu, structure, performances, mobile, SEO et points de friction."],
  ["02", "Direction artistique", "Nouvelle hiérarchie visuelle, système de composants et direction adaptée à votre marché."],
  ["03", "Maquette", "Visualisation du nouveau parcours avant développement. Une maquette gratuite peut être proposée selon le projet."],
  ["04", "Développement", "Nouvelle expérience responsive, architecture propre, animations maîtrisées et intégrations utiles."],
  ["05", "SEO & migration", "URLs, redirections, métadonnées et éléments techniques nécessaires à une migration maîtrisée."],
  ["06", "Tests & mise en ligne", "Tests mobiles, formulaires, navigation, performance, compatibilité et contrôle final."],
];

const faqs = [
  ["999 € : qu'est-ce qui est inclus ?", "Le prix d'appel concerne une refonte de site vitrine avec un périmètre défini en amont. Le tarif exact dépend du nombre de pages, des contenus, fonctionnalités, langues et intégrations."],
  ["Pouvez-vous reprendre mon site actuel ?", "Oui. Nous pouvons conserver certains contenus, reprendre votre identité, migrer une partie de l'existant ou repartir sur une architecture plus propre lorsque c'est pertinent."],
  ["Le SEO est-il conservé ?", "La refonte est préparée pour limiter les risques : structure, URLs, métadonnées et redirections sont examinées. Aucun prestataire sérieux ne peut garantir un classement Google simplement parce qu'un site est refondu."],
  ["Et si mon site fonctionne déjà ?", "Une refonte n'a pas pour objectif de changer pour changer. Nous conservons ce qui fonctionne et intervenons là où l'expérience, la conversion, l'image ou la technique peuvent être améliorées."],
  ["Puis-je voir une maquette avant de décider ?", "Oui, XRagency propose une approche de maquette gratuite sur certains projets. Elle permet de juger la direction visuelle avant de s'engager."],
  ["Combien de temps faut-il ?", "Le délai dépend du périmètre. Une refonte vitrine simple peut être rapide ; une refonte multilingue, e-commerce ou avec intégrations métier demande naturellement davantage de temps."],
];

function WebsiteRedesignPage() {
  return <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main className="pt-20">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,hsl(var(--primary)/0.16),transparent_34%),radial-gradient(circle_at_15%_80%,hsl(var(--primary)/0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="label-mono text-[10px] uppercase tracking-[0.3em] text-primary">REFONTE · DESIGN · PERFORMANCE · CONVERSION</p>
            <h1 className="display-serif mt-5 text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">Votre site mérite<br /><em className="not-italic italic text-primary">mieux.</em></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Refonte de site internet <strong className="text-foreground">à partir de 999 €</strong>. Nous reprenons l'existant, supprimons les frictions et reconstruisons une expérience digitale plus claire, plus rapide et plus convaincante.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <EmberButton href="/#quote" className="justify-center">Demander mon devis gratuit <ArrowRight className="h-4 w-4" /></EmberButton>
              <a href="/#audit" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 label-mono text-[10px] font-semibold uppercase tracking-[0.14em] hover:border-primary/50">Auditer mon site gratuitement</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">{["UX / UI","Mobile","SEO","Conversion","Performance","Sécurité","Migration","Analytics"].map(x => <span key={x} className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-[10px] text-muted-foreground">{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">POURQUOI REFAIRE VOTRE SITE</p><h2 className="display-serif mt-4 text-4xl leading-none sm:text-5xl">Pas simplement plus joli.<br /><em className="not-italic italic text-primary">Plus utile.</em></h2></div>
          <div className="grid gap-4 sm:grid-cols-2">{reasons.map(([Icon,title,text]) => <article key={title as string} className="rounded-3xl border border-border/70 bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-primary/35"><Icon className="h-5 w-5 text-primary" /><h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <p className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">CE QUE NOUS REFAISONS</p>
          <h2 className="display-serif mt-4 max-w-3xl text-4xl leading-none sm:text-6xl">De la première impression<br />jusqu'au <em className="not-italic italic text-primary">clic.</em></h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Positionnement et proposition de valeur","Architecture des pages et navigation","Design system et direction artistique","Hero, CTA et zones de conversion","Responsive mobile / tablette / desktop","Formulaires et prise de contact","SEO on-page et structure technique","Redirections et continuité SEO","Images, vidéos et performances","Animations et micro-interactions","Analytics et suivi des conversions","Intégrations réservation / paiement / CRM","Accessibilité et lisibilité","Sécurité et bonnes pratiques techniques","CMS ou administration selon le besoin"].map(item => <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 text-sm"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="h-3 w-3" /></span>{item}</div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">PROCESS</p><h2 className="display-serif mt-4 text-4xl leading-none sm:text-5xl">Une refonte<br /><em className="not-italic italic text-primary">maîtrisée.</em></h2><p className="mt-5 text-sm leading-6 text-muted-foreground">Chaque étape a un rôle. Nous évitons de refaire tout le site avant d'avoir compris ce qui doit réellement changer.</p></div>
          <div className="divide-y divide-border/70 rounded-3xl border border-border/70">{process.map(([num,title,text]) => <div key={num} className="grid gap-4 p-6 sm:grid-cols-[70px_190px_1fr] sm:items-start"><span className="label-mono text-xs text-primary">{num}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[0.06] p-7 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div><p className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">À PARTIR DE 999 €</p><h2 className="display-serif mt-4 text-4xl leading-none sm:text-6xl">On peut repartir<br />sur de <em className="not-italic italic text-primary">bonnes bases.</em></h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Envoyez-nous votre site : nous pouvons commencer par l'analyser, identifier les problèmes prioritaires et vous montrer ce que nous changerions.</p></div>
            <div className="rounded-3xl border border-border/70 bg-background/80 p-6 backdrop-blur-xl"><p className="label-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Inclus selon périmètre</p><ul className="mt-4 space-y-3 text-sm">{["Audit de l'existant","Nouvelle direction UX / UI","Responsive complet","SEO technique de base","Mise en ligne et contrôles","Accompagnement post-livraison"].map(x => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{x}</li>)}</ul><EmberButton href="/#quote" className="mt-6 w-full justify-center">Obtenir mon devis <ArrowRight className="h-4 w-4" /></EmberButton></div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60"><div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24"><p className="label-mono text-[10px] uppercase tracking-[0.28em] text-primary">FAQ</p><h2 className="display-serif mt-4 text-4xl sm:text-5xl">Questions fréquentes</h2><div className="mt-10 divide-y divide-border/70 border-y border-border/70">{faqs.map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-base font-semibold">{q}</summary><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></div></section>
    </main>
    <Contact />
  </div>;
}
