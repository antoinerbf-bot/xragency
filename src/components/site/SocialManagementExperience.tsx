import { Check, ArrowRight, Instagram, Linkedin, Video } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    price: 499,
    key: "essential",
    name: "Présence Essentielle",
    audience: "Nous faisons vivre votre compte.",
    posts: 12,
    stories: 8,
    videos: 0,
    networks: 1,
    comments: "3 jours / semaine",
    dm: "Non inclus",
    reports: "1 / mois",
    features: ["Calendrier éditorial mensuel", "Direction artistique & ligne éditoriale", "12 publications / carrousels", "8 Stories", "Programmation & publication", "Commentaires gérés 3 jours / semaine", "1 reporting mensuel"],
  },
  {
    price: 799,
    key: "active",
    name: "Croissance Active",
    audience: "Nous faisons travailler votre présence.",
    posts: 16,
    stories: 8,
    videos: 2,
    networks: 2,
    comments: "5 jours / semaine",
    dm: "5 jours / semaine",
    reports: "2 / mois",
    features: ["Tout le niveau Essentiel", "16 publications / carrousels", "8 Stories", "2 vidéos courtes / mois", "Publication sur 2 réseaux", "Commentaires gérés 5 jours / semaine", "Messages privés gérés 5 jours / semaine", "2 reportings mensuels", "Ajustements éditoriaux mensuels"],
  },
  {
    price: 999,
    key: "authority",
    name: "Social Authority",
    audience: "Vous nous confiez votre présence sociale.",
    posts: 20,
    stories: 15,
    videos: 4,
    networks: 3,
    comments: "6 jours / semaine",
    dm: "6 jours / semaine",
    reports: "Stratégique / mois",
    features: ["Tout le niveau Croissance Active", "20 publications / carrousels", "15 Stories", "4 vidéos courtes / mois", "Publication sur 3 réseaux", "Commentaires gérés 6 jours / semaine", "Messages privés gérés 6 jours / semaine", "Animation : sondages, questions, CTA", "Reporting stratégique & recommandations mensuelles"],
  },
] as const;

const ICONS = [Instagram, Video, Linkedin];

export function SocialManagementExperience() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(1);
  const plan = PLANS[selected];
  const isFr = lang === "fr";

  const labels = isFr
    ? {
        eyebrow: "SOCIAL MANAGEMENT / OPERATING SYSTEM",
        title: "Vous n'achetez pas des posts. Vous déléguez votre présence sociale.",
        intro: "Une gestion structurée de la stratégie, de la création, de la publication, de la communauté et du pilotage — avec un niveau de délégation clairement défini.",
        question: "Quel niveau de présence voulez-vous ?",
        presence: "Être présent",
        growth: "Accélérer",
        authority: "Déléguer",
        month: "Votre mois de contenu",
        posts: "PUBLICATIONS",
        stories: "STORIES",
        videos: "VIDÉOS COURTES",
        networks: "RÉSEAUX",
        delegation: "Niveau de délégation",
        comments: "Commentaires",
        dm: "Messages privés",
        reports: "Reporting",
        included: "Ce qui est compris",
        strategy: "STRATÉGIE",
        creation: "CRÉATION",
        publishing: "PUBLICATION",
        community: "COMMUNAUTÉ",
        pilotage: "PILOTAGE",
        language: "1 langue incluse · +100 € / langue supplémentaire",
        note: "Les volumes correspondent à un mois de gestion. Shooting photo/vidéo, déplacement, mannequins, studio et toute production sur site font l'objet d'un devis séparé. Les campagnes publicitaires payantes ne sont pas incluses.",
        cta: "Démarrer ce forfait",
        recommended: "RECOMMANDÉ",
      }
    : {
        eyebrow: "SOCIAL MANAGEMENT / OPERATING SYSTEM",
        title: "You are not buying posts. You are delegating your social presence.",
        intro: "A structured system covering strategy, creation, publishing, community management and reporting — with a clearly defined level of delegation.",
        question: "What level of presence do you want?",
        presence: "Be present",
        growth: "Accelerate",
        authority: "Delegate",
        month: "Your content month",
        posts: "POSTS",
        stories: "STORIES",
        videos: "SHORT VIDEOS",
        networks: "NETWORKS",
        delegation: "Delegation level",
        comments: "Comments",
        dm: "Private messages",
        reports: "Reporting",
        included: "What is included",
        strategy: "STRATEGY",
        creation: "CREATION",
        publishing: "PUBLISHING",
        community: "COMMUNITY",
        pilotage: "REPORTING",
        language: "1 language included · +€100 / additional language",
        note: "Volumes are monthly. Photo/video shoots, travel, models, studio and on-site production are quoted separately. Paid advertising campaigns are not included.",
        cta: "Start this plan",
        recommended: "RECOMMENDED",
      };

  const stageNames = [labels.presence, labels.growth, labels.authority];
  const waText = encodeURIComponent(`Bonjour XR Agency, je souhaite choisir le forfait Social « ${plan.name} » à ${plan.price} €/mois.`);

  return (
    <section id="plans" className="border-y border-border/60 bg-card/20 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-5xl">
          <p className="label-mono text-xs uppercase tracking-[0.2em] text-primary">{labels.eyebrow}</p>
          <h2 className="display-serif mt-5 text-4xl leading-[.95] sm:text-6xl lg:text-7xl">{labels.title}</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{labels.intro}</p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-5">
          {[labels.strategy, labels.creation, labels.publishing, labels.community, labels.pilotage].map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return <div key={item} className="bg-background p-5 sm:p-6"><div className="flex items-center justify-between"><span className="label-mono text-[10px] text-primary">0{index + 1}</span><Icon className="h-4 w-4 text-muted-foreground" /></div><p className="label-mono mt-8 text-[10px] tracking-[0.15em] text-foreground">{item}</p></div>;
          })}
        </div>

        <div className="mt-20">
          <p className="label-mono text-xs uppercase tracking-[0.2em] text-primary">{labels.question}</p>
          <div className="mt-5 grid gap-2 rounded-2xl border border-border bg-background/60 p-2 sm:grid-cols-3">
            {stageNames.map((name, index) => <button key={name} type="button" onClick={() => setSelected(index)} className={cn("rounded-xl px-5 py-4 text-left transition-all duration-300", selected === index ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-accent hover:text-foreground")}><span className="label-mono block text-[9px] uppercase tracking-[0.18em] opacity-70">0{index + 1}</span><span className="display-serif mt-1 block text-2xl">{name}</span></button>)}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-background shadow-xl">
          <div className="grid lg:grid-cols-[.75fr_1.25fr]">
            <div className="border-b border-border bg-primary/[0.06] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between"><span className="label-mono text-xs text-primary">0{selected + 1} / 03</span>{selected === 1 && <span className="label-mono rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">{labels.recommended}</span>}</div>
              <h3 className="display-serif mt-8 text-4xl sm:text-5xl">{plan.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.audience}</p>
              <div className="mt-8 flex items-end gap-2 border-y border-border/70 py-6"><span className="display-serif text-6xl text-primary">{plan.price} €</span><span className="label-mono mb-2 text-xs text-muted-foreground">/ mois</span></div>
              <a href={`${CONTACT.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5">{labels.cta}<ArrowRight className="h-4 w-4" /></a>
            </div>

            <div className="p-7 sm:p-10">
              <p className="label-mono text-xs uppercase tracking-[0.2em] text-primary">{labels.month}</p>
              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
                {[[plan.posts, labels.posts], [plan.stories, labels.stories], [plan.videos, labels.videos], [plan.networks, labels.networks]].map(([value, label]) => <div key={label} className="bg-card p-5"><span className="display-serif text-4xl text-primary">{value}</span><span className="label-mono mt-2 block text-[9px] leading-4 text-muted-foreground">{label}</span></div>)}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[[labels.comments, plan.comments], [labels.dm, plan.dm], [labels.reports, plan.reports]].map(([label, value]) => <div key={label} className="rounded-xl border border-border/70 p-4"><span className="label-mono text-[9px] uppercase text-primary">{label}</span><p className="mt-2 text-sm font-medium">{value}</p></div>)}
              </div>

              <div className="mt-9"><p className="label-mono text-xs uppercase tracking-[0.2em] text-primary">{labels.included}</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{feature}</span></li>)}</ul></div>
            </div>
          </div>
        </div>

        <p className="mt-7 text-xs leading-relaxed text-muted-foreground">{labels.language}<br />{labels.note}</p>
      </div>
    </section>
  );
}
