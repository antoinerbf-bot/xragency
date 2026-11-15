/**
 * Générateur de contenu & publication automatique massive pour XR Agency
 * Cibles : Facebook, Instagram (Reels & Carrousels), TikTok
 * Site : https://xragencyai.com
 */

import fs from 'fs';
import path from 'path';
import { generateAllAssetsForPost } from './generate-visual-assets.js';

const CALENDAR_FILE = path.join(process.cwd(), 'social-calendar.json');

export const CAMPAIGN_CATALOG = [
  {
    theme: "Configurateur IA de Devis",
    tiktokHook: "Pourquoi les devis d'agences prennent 3 jours alors qu'on peut en avoir un en 30 secondes ?",
    tiktokScript: "Plan 1 (0-3s) : Gros plan sur l'écran avec le curseur qui bouge sur xragencyai.com.\nPlan 2 (3-8s) : Ajustement en temps réel des modules (Site 3D, Agent IA, Automations).\nPlan 3 (8-15s) : Le prix et le calendrier se calculent en direct. Voix off : 'Lien en bio pour tester le tien gratuitement.'",
    instaCaption: `Combien coûte un site web nouvelle génération ou une solution IA en 2026 ? 🚀\n\nChez XR Agency, on a automatisé tout le processus : notre configurateur intelligent calcule votre devis en direct.\n\n✨ 3D temps réel\n⚡ Stack ultra-rapide (React 19 / TanStack)\n🤖 Intégration d'agents IA autonomes\n\n👉 Testez-le en direct : xragencyai.com (lien en bio)\n\n#agenceia #webdesign #tanstack #react #automation #intelligenceartificielle #tech`,
    facebookPost: `Finies les attentes de 3 jours pour recevoir une proposition commerciale.\n\nSur notre nouvelle plateforme XR Agency, configurez votre projet digital en temps réel (Site Web 3D immersif, Agent IA autonome, Automatisation métier) et obtenez un chiffrage immédiat.\n\n👉 Découvrir la démo en direct : https://xragencyai.com`
  },
  {
    theme: "Agents IA Autonomes en Entreprise",
    tiktokHook: "Voici comment une IA qualifie des prospects et gère le CRM 24h/24 sans jamais dormir.",
    tiktokScript: "Plan 1 (0-3s) : Alerte prospect reçue à 2h du matin.\nPlan 2 (3-9s) : L'agent IA analyse le besoin, vérifie le calendrier et booke un appel qualifié.\nPlan 3 (9-15s) : Tableau de bord des leads convertis. CTA : 'Toutes les infos sur xragencyai.com'",
    instaCaption: `Automatiser 80% des tâches répétitives de son entreprise, c'est possible dès aujourd'hui ⚡\n\nOn déploie des agents IA connectés directement à vos bases de données, CRM et réseaux pour qualifier et convertir vos prospects en continu.\n\nDécouvrez nos architectures sur xragencyai.com 🔥\n\n#ia #agentsia #automation #crm #businessonline #entrepreneuriat #productivite`,
    facebookPost: `Comment les entreprises modernes automatisent leurs opérations avec des agents IA sur-mesure.\n\nDe la qualification automatique de leads au support client autonome 24/7, découvrez nos études de cas et solutions sur https://xragencyai.com`
  },
  {
    theme: "Sites Web Immersifs & 3D Temps Réel",
    tiktokHook: "Les sites web en 2026 ressemblent à ça, et votre site actuel a pris 10 ans d'un coup.",
    tiktokScript: "Plan 1 (0-3s) : Scroll ultra-fluide avec interaction 3D dynamique.\nPlan 2 (3-9s) : Transitions cinématiques et vitesse de chargement instantanée.\nPlan 3 (9-15s) : 'Ton site convertit ou il fait fuir tes visiteurs ? Rendez-vous sur xragencyai.com pour un audit gratuit.'",
    instaCaption: `Pourquoi se contenter d'un template classique quand votre marque peut offrir une expérience visuelle digne d'un film ? 🎬✨\n\nFluidité 120 FPS, 3D interactive, temps de chargement éclair.\n\nExplorez nos réalisations sur xragencyai.com\n\n#webgl #threejs #uxdesign #webdesigninspiration #creativecoding #luxurybrand`,
    facebookPost: `L'immersion visuelle au service de votre taux de conversion.\n\nDécouvrez comment nous concevons des plateformes web immersives alliant performance technique extrême et design cinématique.\n\nVisitez https://xragencyai.com`
  },
  {
    theme: "Audit Performance : WordPress vs TanStack Start",
    tiktokHook: "Ton site met plus de 2 secondes à charger ? Tu perds littéralement 53% de tes ventes.",
    tiktokScript: "Plan 1 (0-3s) : Chronomètre comparatif entre un vieux CMS lourd et une architecture React 19 / Vite.\nPlan 2 (3-8s) : Score 100/100 sur Google PageSpeed Insights.\nPlan 3 (8-15s) : 'Optimise ta conversion avec XR Agency : audit express sur xragencyai.com'",
    instaCaption: `La vitesse est le premier facteur de conversion web en 2026 🏎️💨\n\nChaque seconde de chargement en trop détruit votre taux de rebond. Nous développons des applications ultra-légères avec TanStack Start et Tailwind v4.\n\nRésultat : Score 100/100 garanti et conversion maximale.\n\n👉 Audit offert de votre site actuel sur xragencyai.com\n\n#pagespeed #webperf #seo #react19 #tanstack #developpeurweb`,
    facebookPost: `Saviez-vous que plus de la moitié des visiteurs quittent un site s'il met plus de 3 secondes à s'afficher ?\n\nNos architectures web modernes garantissent des performances extrêmes et un SEO technique sans compromis.\n\nFaites tester votre site gratuitement sur https://xragencyai.com`
  },
  {
    theme: "Automatisation Funnel & CRM en Temps Réel",
    tiktokHook: "Ce système transforme 1 visiteur froid en rendez-vous qualifié en moins de 2 minutes.",
    tiktokScript: "Plan 1 (0-3s) : Notification d'un nouveau prospect entrant.\nPlan 2 (3-9s) : Workflow automatisé n8n / IA qui enrichit les données du lead et génère une proposition sur-mesure.\nPlan 3 (9-15s) : Le client confirme en un clic. 'Configure le tien sur xragencyai.com'",
    instaCaption: `Ne laissez plus aucun lead refroidir 🔥\n\nAvec nos pipelines automatisés, chaque demande est traitée instantanément par nos agents intelligents : qualification, calcul de tarif, relance personnalisée.\n\nBoostez vos ventes avec l'IA sur xragencyai.com 📈\n\n#growth #funneldevente #salesautomation #entrepreneur #saas #ia`,
    facebookPost: `L'automatisation intelligente au service de votre croissance commerciale.\n\nDécouvrez comment réduire vos coûts d'acquisition tout en multipliant vos prises de rendez-vous qualifiés.\n\nEn savoir plus sur https://xragencyai.com`
  },
  {
    theme: "Studio Digital & IA : L'Agence Nouvelle Génération",
    tiktokHook: "Les agences web traditionnelles sont mortes, voici ce qui les remplace.",
    tiktokScript: "Plan 1 (0-3s) : Contraste 'Ancienne agence (2 mois de délais, devis opaque)' vs 'XR Agency (IA + 3D en temps réel)'.\nPlan 2 (3-9s) : Navigation interactive sur le studio xragencyai.com.\nPlan 3 (9-15s) : 'Passe au niveau supérieur dès aujourd'hui.'",
    instaCaption: `Le monde digital a changé. Votre agence partenaire doit maîtriser les technologies d'aujourd'hui, pas celles d'il y a 10 ans 🌐\n\nChez XR Agency, nous fusionnons design cinématique, 3D interactive et automatisation IA pour créer des plateformes qui dominent leur marché.\n\nPrêt à transformer votre présence en ligne ? Visitez xragencyai.com 🚀\n\n#designagency #webdesign #luxury #branding #futur #innovation`,
    facebookPost: `Redéfinir les standards de l'expérience digitale.\n\nXR Agency accompagne les marques exigeantes dans la conception d'expériences web immersives et de systèmes d'IA opérationnels.\n\nConfigurez votre projet en ligne sur https://xragencyai.com`
  }
];

export function generateFullCampaignBatch(days = 15) {
  let calendar = [];
  if (fs.existsSync(CALENDAR_FILE)) {
    try {
      calendar = JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf-8'));
    } catch (e) {
      calendar = [];
    }
  }

  const newItems = [];
  const baseDate = new Date();

  for (let i = 0; i < days; i++) {
    const template = CAMPAIGN_CATALOG[i % CAMPAIGN_CATALOG.length];
    const postDate = new Date(baseDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
    const id = `campaign_${Date.now()}_${i + 1}`;

    const postObj = {
      id,
      theme: template.theme,
      scheduled_for: postDate.toISOString(),
      status: "ready_to_publish",
      target_site: "https://xragencyai.com",
      tiktok: {
        hook: template.tiktokHook,
        script: template.tiktokScript
      },
      instagram: {
        caption: template.instaCaption
      },
      facebook: {
        post: template.facebookPost
      }
    };

    // Génération automatique des assets visuels associés
    const assets = generateAllAssetsForPost(postObj);
    postObj.assets = {
      storySvg: assets.story.relativeUrl,
      squareSvg: assets.square.relativeUrl
    };

    newItems.push(postObj);
    calendar.push(postObj);
  }

  fs.writeFileSync(CALENDAR_FILE, JSON.stringify(calendar, null, 2), 'utf-8');
  console.log(`✅ ${newItems.length} nouvelles campagnes multicanales (Facebook, Insta, TikTok) créées avec visuels !`);
  return newItems;
}

if (process.argv[1]?.endsWith('generate-social-posts.js')) {
  generateFullCampaignBatch(10);
}
