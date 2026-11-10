/**
 * Générateur de contenu & publication automatique pour XR Agency
 * Cibles : Facebook, Instagram (Reels & Carrousels), TikTok
 * Site : https://xragencyai.com
 */

export const SOCIAL_PILLARS = [
  {
    theme: "DÉMO CONFIGURATEUR IA DE DEVIS",
    tiktokHook: "Pourquoi les devis d'agences prennent 3 jours alors qu'on peut en avoir un en 30 secondes ?",
    instaCaption: `Combien coûte réellement un site web ou une solution IA sur-mesure en 2026 ? 🚀\n\nChez XR Agency, on a automatisé tout le processus : teste notre configurateur intelligent en direct et obtiens une estimation instantanée.\n\n👉 Lien en bio : xragencyai.com\n\n#agenceia #webdesign #tanstack #react #automation #freelancedev #techbusiness`,
    facebookPost: `Finies les attentes interminables pour recevoir une estimation de projet digital.\n\nSur notre plateforme XR Agency, configurez en temps réel votre projet (Site 3D immersif, Agent IA autonome, Application Web) et recevez un chiffrage immédiat.\n\nDécouvrez la démo en ligne sur https://xragencyai.com`,
    videoScene: "Capture d'écran rapide en split screen montrant le slider de budget et les options qui s'animent en temps réel sur xragencyai.com"
  },
  {
    theme: "AGENTS IA AUTONOMES EN PRODUCTION",
    tiktokHook: "Voici comment une IA gère le support client et la qualification de leads 24h/24 sans dormir.",
    instaCaption: `Automatiser 80% des tâches répétitives de son entreprise, c'est possible dès aujourd'hui ⚡\n\nOn intègre des agents IA connectés directement à vos bases de données, CRM et réseaux pour qualifier vos prospects en continu.\n\nDécouvrez nos architectures sur xragencyai.com 🔥\n\n#intelligenceartificielle #ia #automation #crm #businessonline #entrepreneuriat`,
    facebookPost: `Comment les entreprises modernes automatisent leurs opérations avec des agents IA sur-mesure.\n\nRetrouvez notre étude de cas et nos architectures déployées sur https://xragencyai.com`,
    videoScene: "Animation du terminal ou dashboard montrant l'agent IA répondant et déclenchant des actions en temps réel"
  },
  {
    theme: "SITES WEB CINEMATIC & 3D IMMERSIFS",
    tiktokHook: "Les sites web en 2026 ressemblent à ça, et votre site actuel a pris 10 ans d'un coup.",
    instaCaption: `Pourquoi se contenter d'un template classique quand votre marque peut offrir une expérience visuelle digne d'un film ? 🎬✨\n\nFluidité 120 FPS, 3D interactive, temps de chargement éclair.\n\nExplorez nos réalisations sur xragencyai.com\n\n#webgl #threejs #uxdesign #webdesigninspiration #creativecoding #luxurybrand`,
    facebookPost: `L'immersion visuelle au service de votre taux de conversion.\n\nDécouvrez comment nous concevons des plateformes web immersives alliant performance technique extrême et design cinématique.\n\nVisitez https://xragencyai.com`,
    videoScene: "Séquence dynamique montrant les interactions 3D, animations fluides et transitions cinématiques du site xragency"
  }
];

export function displayContentBatch() {
  console.log("=== BATCH DE PUBLICATION XR AGENCY (FB / INSTA / TIKTOK) ===");
  SOCIAL_PILLARS.forEach((p, index) => {
    console.log(`\n--- [POST ${index + 1}] : ${p.theme} ---`);
    console.log(`🎵 TIKTOK (Hook 3s) : "${p.tiktokHook}"`);
    console.log(`🎬 SCÈNE VIDÉO : ${p.videoScene}`);
    console.log(`📸 INSTAGRAM : \n${p.instaCaption}`);
    console.log(`📘 FACEBOOK : \n${p.facebookPost}`);
  });
}

if (process.argv[1]?.endsWith('generate-social-posts.js')) {
  displayContentBatch();
}

