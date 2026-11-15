import { useState } from "react";
import {
  Sparkles,
  Copy,
  ExternalLink,
  Check,
  RefreshCw,
  Flame,
  Zap,
  Clock,
  Layers,
  Share2,
  Download,
  CheckCircle2,
  Play,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialCampaign {
  id: string;
  theme: string;
  status: "ready" | "published";
  target_site: string;
  tiktok: {
    hook: string;
    script: string;
  };
  instagram: {
    caption: string;
  };
  facebook: {
    post: string;
  };
  assets?: {
    squareSvg: string;
    storySvg: string;
  };
}

const INITIAL_CAMPAIGNS: SocialCampaign[] = [
  {
    id: "camp-1",
    theme: "Configurateur IA de Devis",
    status: "ready",
    target_site: "https://xragencyai.com",
    tiktok: {
      hook: "Pourquoi les devis d'agences prennent 3 jours alors qu'on peut en avoir un en 30 secondes ?",
      script:
        "Plan 1 (0-3s) : Gros plan sur l'écran avec le curseur qui bouge sur xragencyai.com.\nPlan 2 (3-8s) : Ajustement en temps réel des modules (Site 3D, Agent IA, Automations).\nPlan 3 (8-15s) : Le prix et le calendrier se calculent en direct. Voix off : 'Lien en bio pour tester le tien gratuitement.'",
    },
    instagram: {
      caption: `Combien coûte un site web nouvelle génération ou une solution IA en 2026 ? 🚀\n\nChez XR Agency, on a automatisé tout le processus : notre configurateur intelligent calcule votre devis en direct.\n\n✨ 3D temps réel\n⚡ Stack ultra-rapide (React 19 / TanStack)\n🤖 Intégration d'agents IA autonomes\n\n👉 Testez-le en direct : xragencyai.com (lien en bio)\n\n#agenceia #webdesign #tanstack #react #automation #intelligenceartificielle #tech`,
    },
    facebook: {
      post: `Finies les attentes de 3 jours pour recevoir une proposition commerciale.\n\nSur notre nouvelle plateforme XR Agency, configurez votre projet digital en temps réel (Site Web 3D immersif, Agent IA autonome, Automatisation métier) et obtenez un chiffrage immédiat.\n\n👉 Découvrir la démo en direct : https://xragencyai.com`,
    },
    assets: {
      squareSvg: "/social-assets/demo-square.svg",
      storySvg: "/social-assets/demo-story.svg",
    },
  },
  {
    id: "camp-2",
    theme: "Agents IA Autonomes en Entreprise",
    status: "ready",
    target_site: "https://xragencyai.com",
    tiktok: {
      hook: "Voici comment une IA qualifie des prospects et gère le CRM 24h/24 sans jamais dormir.",
      script:
        "Plan 1 (0-3s) : Alerte prospect reçue à 2h du matin.\nPlan 2 (3-9s) : L'agent IA analyse le besoin, vérifie le calendrier et booke un appel qualifié.\nPlan 3 (9-15s) : Tableau de bord des leads convertis. CTA : 'Toutes les infos sur xragencyai.com'",
    },
    instagram: {
      caption: `Automatiser 80% des tâches répétitives de son entreprise, c'est possible dès aujourd'hui ⚡\n\nOn déploie des agents IA connectés directement à vos bases de données, CRM et réseaux pour qualifier et convertir vos prospects en continu.\n\nDécouvrez nos architectures sur xragencyai.com 🔥\n\n#ia #agentsia #automation #crm #businessonline #entrepreneuriat #productivite`,
    },
    facebook: {
      post: `Comment les entreprises modernes automatisent leurs opérations avec des agents IA sur-mesure.\n\nDe la qualification automatique de leads au support client autonome 24/7, découvrez nos études de cas et solutions sur https://xragencyai.com`,
    },
    assets: {
      squareSvg: "/social-assets/demo-square.svg",
      storySvg: "/social-assets/demo-story.svg",
    },
  },
  {
    id: "camp-3",
    theme: "Sites Web Immersifs & 3D Temps Réel",
    status: "ready",
    target_site: "https://xragencyai.com",
    tiktok: {
      hook: "Les sites web en 2026 ressemblent à ça, et votre site actuel a pris 10 ans d'un coup.",
      script:
        "Plan 1 (0-3s) : Scroll ultra-fluide avec interaction 3D dynamique.\nPlan 2 (3-9s) : Transitions cinématiques et vitesse de chargement instantanée.\nPlan 3 (9-15s) : 'Ton site convertit ou il fait fuir tes visiteurs ? Rendez-vous sur xragencyai.com pour un audit gratuit.'",
    },
    instagram: {
      caption: `Pourquoi se contenter d'un template classique quand votre marque peut offrir une expérience visuelle digne d'un film ? 🎬✨\n\nFluidité 120 FPS, 3D interactive, temps de chargement éclair.\n\nExplorez nos réalisations sur xragencyai.com\n\n#webgl #threejs #uxdesign #webdesigninspiration #creativecoding #luxurybrand`,
    },
    facebook: {
      post: `L'immersion visuelle au service de votre taux de conversion.\n\nDécouvrez comment nous concevons des plateformes web immersives alliant performance technique extrême et design cinématique.\n\nVisitez https://xragencyai.com`,
    },
    assets: {
      squareSvg: "/social-assets/demo-square.svg",
      storySvg: "/social-assets/demo-story.svg",
    },
  },
  {
    id: "camp-4",
    theme: "Audit Performance : WordPress vs TanStack Start",
    status: "ready",
    target_site: "https://xragencyai.com",
    tiktok: {
      hook: "Ton site met plus de 2 secondes à charger ? Tu perds littéralement 53% de tes ventes.",
      script:
        "Plan 1 (0-3s) : Chronomètre comparatif entre un vieux CMS lourd et une architecture React 19 / Vite.\nPlan 2 (3-8s) : Score 100/100 sur Google PageSpeed Insights.\nPlan 3 (8-15s) : 'Optimise ta conversion avec XR Agency : audit express sur xragencyai.com'",
    },
    instagram: {
      caption: `La vitesse est le premier facteur de conversion web en 2026 🏎️💨\n\nChaque seconde de chargement en trop détruit votre taux de rebond. Nous développons des applications ultra-légères avec TanStack Start et Tailwind v4.\n\nRésultat : Score 100/100 garanti et conversion maximale.\n\n👉 Audit offert de votre site actuel sur xragencyai.com\n\n#pagespeed #webperf #seo #react19 #tanstack #developpeurweb`,
    },
    facebook: {
      post: `Saviez-vous que plus de la moitié des visiteurs quittent un site s'il met plus de 3 secondes à s'afficher ?\n\nNos architectures web modernes garantissent des performances extrêmes et un SEO technique sans compromis.\n\nFaites tester votre site gratuitement sur https://xragencyai.com`,
    },
    assets: {
      squareSvg: "/social-assets/demo-square.svg",
      storySvg: "/social-assets/demo-story.svg",
    },
  },
  {
    id: "camp-5",
    theme: "Automatisation Funnel & CRM en Temps Réel",
    status: "ready",
    target_site: "https://xragencyai.com",
    tiktok: {
      hook: "Ce système transforme 1 visiteur froid en rendez-vous qualifié en moins de 2 minutes.",
      script:
        "Plan 1 (0-3s) : Notification d'un nouveau prospect entrant.\nPlan 2 (3-9s) : Workflow automatisé n8n / IA qui enrichit les données du lead et génère une proposition sur-mesure.\nPlan 3 (9-15s) : Le client confirme en un clic. 'Configure le tien sur xragencyai.com'",
    },
    instagram: {
      caption: `Ne laissez plus aucun lead refroidir 🔥\n\nAvec nos pipelines automatisés, chaque demande est traitée instantanément par nos agents intelligents : qualification, calcul de tarif, relance personnalisée.\n\nBoostez vos ventes avec l'IA sur xragencyai.com 📈\n\n#growth #funneldevente #salesautomation #entrepreneur #saas #ia`,
    },
    facebook: {
      post: `L'automatisation intelligente au service de votre croissance commerciale.\n\nDécouvrez comment réduire vos coûts d'acquisition tout en multipliant vos prises de rendez-vous qualifiés.\n\nEn savoir plus sur https://xragencyai.com`,
    },
    assets: {
      squareSvg: "/social-assets/demo-square.svg",
      storySvg: "/social-assets/demo-story.svg",
    },
  },
];

export function CrmSocialStudio() {
  const [campaigns, setCampaigns] = useState<SocialCampaign[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("xr_crm_social_campaigns");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_CAMPAIGNS;
  });

  const [filter, setFilter] = useState<"all" | "ready" | "published">("all");
  const [selectedPlatform, setSelectedPlatform] = useState<Record<string, "instagram" | "facebook" | "tiktok">>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveCampaigns = (newItems: SocialCampaign[]) => {
    setCampaigns(newItems);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xr_crm_social_campaigns", JSON.stringify(newItems));
      } catch {}
    }
  };

  const toggleStatus = (id: string) => {
    const updated = campaigns.map((c) =>
      c.id === id ? { ...c, status: c.status === "ready" ? ("published" as const) : ("ready" as const) } : c
    );
    saveCampaigns(updated);
    showToast("Statut de la campagne mis à jour !");
  };

  const handleCopy = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copié dans le presse-papier !`);
    }
  };

  const handle1ClickPublish = (platform: "instagram" | "facebook" | "tiktok", text: string, campaignId: string) => {
    handleCopy(text, `Texte ${platform}`);
    setCopiedId(campaignId);

    const urls = {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      tiktok: "https://www.tiktok.com/creator-center/upload",
    };

    setTimeout(() => {
      window.open(urls[platform], "_blank", "noopener,noreferrer");
      showToast(`Texte copié ! Page ${platform} ouverte — Collez (Cmd+V) et publiez !`);
    }, 200);
  };

  const handleGenerateMore = () => {
    const newItems: SocialCampaign[] = [
      {
        id: `gen-${Date.now()}-1`,
        theme: "IA Multimodale & Génération 3D",
        status: "ready",
        target_site: "https://xragencyai.com",
        tiktok: {
          hook: "Voici le futur du web design : générer des scènes 3D interactives avec une simple phrase.",
          script:
            "Plan 1 : Saisie d'un prompt dans l'interface de xragencyai.com.\nPlan 2 : La scène 3D se matérialise en direct avec textures et éclairage dynamique.\nPlan 3 : 'L'avenir est déjà en ligne sur xragencyai.com'",
        },
        instagram: {
          caption: `L'intelligence artificielle transforme la création web 🔮✨\n\nDécouvrez comment nous intégrons la 3D interactive et les modèles génératifs directement dans vos plateformes.\n\nExplorez nos démos sur xragencyai.com 🚀\n\n#3dweb #generativeai #webgl #creativetech #futurism`,
        },
        facebook: {
          post: `La 3D interactive devient la nouvelle norme du web premium.\n\nRetrouvez nos études de cas et solutions sur https://xragencyai.com`,
        },
      },
      {
        id: `gen-${Date.now()}-2`,
        theme: "Gains de Productivité : De 40h à 4h par semaine",
        status: "ready",
        target_site: "https://xragencyai.com",
        tiktok: {
          hook: "Comment cette PME a divisé ses coûts opérationnels par 3 en 30 jours grâce à un agent IA.",
          script:
            "Plan 1 : Graphique des tâches manuelles répétitives.\nPlan 2 : L'agent IA connecté à Gmail, WhatsApp et au CRM qui traite les leads instantanément.\nPlan 3 : 'Configure ton propre système sur xragencyai.com'",
        },
        instagram: {
          caption: `Gagnez 30 heures par semaine grâce à des agents IA autonomes ⚙️💡\n\nFini la saisie manuelle et les devis qui traînent : tout s'automatise avec notre stack intelligente.\n\nDemandez votre audit gratuit sur xragencyai.com 🚀\n\n#automation #ia #gaindetemps #productivite #growth`,
        },
        facebook: {
          post: `Pourquoi et comment déléguer 80% de vos tâches répétitives à des agents IA fiables.\n\nChiffrez votre projet en 30 secondes sur https://xragencyai.com`,
        },
      },
    ];

    saveCampaigns([...newItems, ...campaigns]);
    showToast("⚡ 2 nouvelles campagnes IA ajoutées avec succès !");
  };

  const filtered = campaigns.filter((c) => {
    if (filter === "ready") return c.status === "ready";
    if (filter === "published") return c.status === "published";
    return true;
  });

  const readyCount = campaigns.filter((c) => c.status === "ready").length;
  const publishedCount = campaigns.filter((c) => c.status === "published").length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-[#00f2fe]/40 bg-[#090b10] px-5 py-3.5 text-xs font-bold text-white shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4">
          <Sparkles className="h-4 w-4 text-[#00f2fe] animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-[#0c0d14] via-[#090b10] to-[#121422] p-6 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#00f2fe]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-[#00f2fe]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00f2fe] animate-ping" />
              XR Social Command · 1-Clic Publish
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Générateur &amp; Pilote Réseaux Sociaux IA
            </h2>
            <p className="max-w-2xl text-xs text-neutral-300 leading-relaxed">
              Créez et publiez en <strong className="text-white">1 clic</strong> sur vos comptes{" "}
              <strong className="text-[#00f2fe]">Instagram</strong>, <strong className="text-[#1877f2]">Facebook</strong> et{" "}
              <strong className="text-white">TikTok</strong> pour propulser le trafic vers{" "}
              <strong className="text-[#d4af37]">xragencyai.com</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateMore}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] px-4 py-2.5 text-xs font-bold text-[#050608] shadow-lg shadow-[#00f2fe]/20 hover:opacity-95 transition active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Générer +2 Campagnes IA</span>
            </button>
            <a
              href="https://xragencyai.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition"
            >
              <span>xragencyai.com</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 pt-4 text-xs">
          <div className="rounded-xl border border-white/8 bg-black/20 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Total Campagnes</span>
            <p className="text-lg font-black text-white">{campaigns.length}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-black/20 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Prêtes à publier</span>
            <p className="text-lg font-black text-[#00f2fe]">{readyCount}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-black/20 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Déjà diffusées</span>
            <p className="text-lg font-black text-[#d4af37]">{publishedCount}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-black/20 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Mode Diffusion</span>
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Session Mac 1-Clic Active
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
          {[
            { id: "all" as const, label: `Toutes (${campaigns.length})` },
            { id: "ready" as const, label: `À publier (${readyCount})` },
            { id: "published" as const, label: `Publiées (${publishedCount})` },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 font-bold transition",
                filter === item.id ? "bg-[#d4af37] text-[#050608]" : "text-neutral-400 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="hidden text-xs text-neutral-400 sm:block">
          💡 Cliquez sur un bouton : le texte se copie et le réseau social s'ouvre directement.
        </p>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((camp) => {
          const activePlatform = selectedPlatform[camp.id] || "instagram";
          const currentText =
            activePlatform === "instagram"
              ? camp.instagram.caption
              : activePlatform === "facebook"
              ? camp.facebook.post
              : `[HOOK 3s]\n${camp.tiktok.hook}\n\n[SCÉNARIO VIDÉO]\n${camp.tiktok.script}`;

          return (
            <div
              key={camp.id}
              className={cn(
                "flex flex-col justify-between rounded-3xl border bg-[#0b0c13] p-5 shadow-xl transition hover:border-[#00f2fe]/40",
                camp.status === "published" ? "border-white/8 opacity-75" : "border-white/12"
              )}
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[#00f2fe]">
                      {camp.theme}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {camp.tiktok.hook}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStatus(camp.id)}
                    className={cn(
                      "rounded-full p-1 text-[10px] font-bold transition",
                      camp.status === "published"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-white/5 text-neutral-400 hover:text-white"
                    )}
                    title={camp.status === "published" ? "Marquer comme à publier" : "Marquer comme publié"}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Platform Selector Buttons */}
                <div className="flex rounded-xl border border-white/8 bg-black/30 p-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform((prev) => ({ ...prev, [camp.id]: "instagram" }))}
                    className={cn(
                      "flex-1 rounded-lg py-1 font-bold text-center transition",
                      activePlatform === "instagram"
                        ? "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    📸 Insta
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform((prev) => ({ ...prev, [camp.id]: "facebook" }))}
                    className={cn(
                      "flex-1 rounded-lg py-1 font-bold text-center transition",
                      activePlatform === "facebook" ? "bg-[#1877f2] text-white shadow-sm" : "text-neutral-400 hover:text-white"
                    )}
                  >
                    📘 Facebook
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform((prev) => ({ ...prev, [camp.id]: "tiktok" }))}
                    className={cn(
                      "flex-1 rounded-lg py-1 font-bold text-center transition",
                      activePlatform === "tiktok" ? "bg-black text-[#00f2fe] border border-white/20 shadow-sm" : "text-neutral-400 hover:text-white"
                    )}
                  >
                    🎵 TikTok
                  </button>
                </div>

                {/* Content Text Box */}
                <div className="relative rounded-2xl border border-white/8 bg-black/40 p-3.5">
                  <div className="max-h-36 overflow-y-auto pr-1 text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                    {currentText}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentText, "Contenu")}
                    className="absolute top-2.5 right-2.5 rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-300 hover:bg-white/10 hover:text-white transition"
                    title="Copier le texte seul"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Visual Assets Links */}
                {camp.assets && (
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={camp.assets.squareSvg}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition"
                    >
                      <Download className="h-3 w-3 text-[#00f2fe]" />
                      <span>Visuel Feed 1:1</span>
                    </a>
                    <a
                      href={camp.assets.storySvg}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition"
                    >
                      <Download className="h-3 w-3 text-[#d4af37]" />
                      <span>Visuel Story 9:16</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons: 1-Click Multi Publish */}
              <div className="mt-5 space-y-2 border-t border-white/8 pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handle1ClickPublish("instagram", camp.instagram.caption, camp.id)}
                    className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-2 text-white shadow-sm hover:opacity-90 active:scale-95 transition"
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider">Insta</span>
                    <span className="text-[8px] font-medium opacity-90">1-Clic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handle1ClickPublish("facebook", camp.facebook.post, camp.id)}
                    className="flex flex-col items-center justify-center rounded-xl bg-[#1877f2] p-2 text-white shadow-sm hover:bg-[#166fe5] active:scale-95 transition"
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider">Facebook</span>
                    <span className="text-[8px] font-medium opacity-90">1-Clic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handle1ClickPublish(
                        "tiktok",
                        `[HOOK] ${camp.tiktok.hook}\n\n[SCRIPT]\n${camp.tiktok.script}`,
                        camp.id
                      )
                    }
                    className="flex flex-col items-center justify-center rounded-xl bg-black border border-white/20 p-2 text-[#00f2fe] shadow-sm hover:bg-white/5 active:scale-95 transition"
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider">TikTok</span>
                    <span className="text-[8px] font-medium opacity-90">1-Clic</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
