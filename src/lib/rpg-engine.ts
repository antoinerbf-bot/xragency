import type { Prospect, Audit } from "./saas/types";
import { getAdvisorById, XR_ADVISORS } from "./xr-advisors";

/* ==========================================================================
   1. BARÈME OFFICIEL D'XP & MULTIPLICATEURS DE STREAKS
   ========================================================================== */
export const RPG_XP_REWARDS = {
  call: 50,
  audit: 150,
  meeting: 300,
  deal_closed: 1000,
} as const;

export type RpgActionType = keyof typeof RPG_XP_REWARDS;

export interface RpgRank {
  level: 1 | 2 | 3 | 4 | 5;
  name: "Rookie Scout" | "Field Hunter" | "Closer Pro" | "Master Rainmaker" | "Apex Legend";
  title: "Rookie Scout" | "Field Hunter" | "Closer Pro" | "Master Rainmaker" | "Apex Legend";
  minXp: number;
  maxXp: number | null;
  badge: string;
  accentColor: string;
  badgeColor: string;
  perks: string;
  perk: string;
}

export const RPG_RANKS: RpgRank[] = [
  {
    level: 1,
    name: "Rookie Scout",
    title: "Rookie Scout",
    minXp: 0,
    maxXp: 999,
    badge: "🛡️ ROOKIE SCOUT",
    accentColor: "#94A3B8",
    badgeColor: "#94A3B8",
    perks: "Accès pipeline entrant & scripts de qualification",
    perk: "Accès pipeline entrant & scripts de qualification",
  },
  {
    level: 2,
    name: "Field Hunter",
    title: "Field Hunter",
    minXp: 1000,
    maxXp: 2999,
    badge: "⚔️ FIELD HUNTER",
    accentColor: "#38BDF8",
    badgeColor: "#38BDF8",
    perks: "Déblocage des leads chauds Google Maps & Audit Express",
    perk: "Déblocage des leads chauds Google Maps & Audit Express",
  },
  {
    level: 3,
    name: "Closer Pro",
    title: "Closer Pro",
    minXp: 3000,
    maxXp: 6999,
    badge: "🔥 CLOSER PRO",
    accentColor: "#10B981",
    badgeColor: "#10B981",
    perks: "Priorité sur les demandes de devis entrantes & bonus +2%",
    perk: "Priorité sur les demandes de devis entrantes & bonus +2%",
  },
  {
    level: 4,
    name: "Master Rainmaker",
    title: "Master Rainmaker",
    minXp: 7000,
    maxXp: 14999,
    badge: "💎 MASTER RAINMAKER",
    accentColor: "#D4AF37",
    badgeColor: "#D4AF37",
    perks: "Attribution grands comptes (E-commerce, POS & Robotique)",
    perk: "Attribution grands comptes (E-commerce, POS & Robotique)",
  },
  {
    level: 5,
    name: "Apex Legend",
    title: "Apex Legend",
    minXp: 15000,
    maxXp: null,
    badge: "👑 APEX LEGEND",
    accentColor: "#D4AF37",
    badgeColor: "#10B981",
    perks: "Cercle Direction · Rétrocessions récurrentes MRR & statut Élite",
    perk: "Cercle Direction · Rétrocessions récurrentes MRR & statut Élite",
  },
];

export function getRankForXp(xp: number): RpgRank {
  let current = RPG_RANKS[0];
  for (const r of RPG_RANKS) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}

export function getNextRank(xp: number): RpgRank | null {
  const current = getRankForXp(xp);
  const idx = RPG_RANKS.indexOf(current);
  return idx < RPG_RANKS.length - 1 ? RPG_RANKS[idx + 1] : null;
}

export function getStreakMultiplier(streakDays: number): {
  multiplier: number;
  label: string;
} {
  if (streakDays >= 14) return { multiplier: 2.0, label: "STREAK FEU SACRÉ x2.0" };
  if (streakDays >= 7) return { multiplier: 1.5, label: "STREAK INARRÊTABLE x1.5" };
  if (streakDays >= 3) return { multiplier: 1.2, label: "STREAK ACTIF x1.2" };
  return { multiplier: 1.0, label: "STREAK STANDARD x1.0" };
}

/* ==========================================================================
   2. QUÊTES QUOTIDIENNES ALÉATOIRES (DAILY QUESTS)
   ========================================================================== */
export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpBonus: number;
  bonusXp: number;
  category: RpgActionType;
  actionType: RpgActionType;
  completed: boolean;
}

export const DAILY_QUEST_POOL: DailyQuest[] = [
  {
    id: "q-calls-5",
    title: "Blitz Téléphonique Matinal",
    description: "Passer 5 appels de qualification sur des leads Google Maps ou Refonte.",
    targetCount: 5,
    currentCount: 2,
    xpBonus: 250,
    bonusXp: 250,
    category: "call",
    actionType: "call",
    completed: false,
  },
  {
    id: "q-audits-3",
    title: "Chirurgien du Diagnostic",
    description: "Générer et envoyer 3 audits 5 piliers complets à des dirigeants PME.",
    targetCount: 3,
    currentCount: 1,
    xpBonus: 450,
    bonusXp: 450,
    category: "audit",
    actionType: "audit",
    completed: false,
  },
  {
    id: "q-close-1",
    title: "Chasseur de Signature",
    description: "Passer au moins 1 dossier en statut « Signé / Gagné » aujourd'hui.",
    targetCount: 1,
    currentCount: 0,
    xpBonus: 1000,
    bonusXp: 1000,
    category: "deal_closed",
    actionType: "deal_closed",
    completed: false,
  },
];

/* ==========================================================================
   3. EFFETS JUICE UX : CONFETTIS OR & ÉMERAUDE + SON TRIOMPHAL WEB AUDIO API
   ========================================================================== */
export function playXpChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.14); // A5

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } catch {
    // Ignore audio context restrictions if not yet interacted
  }
}

export function playVictoryFanfare() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Accord triomphal Or & Émeraude (C5 - E5 - G5 - C6)
    const notes = [
      { freq: 523.25, delay: 0, duration: 0.16 },
      { freq: 659.25, delay: 0.11, duration: 0.16 },
      { freq: 783.99, delay: 0.22, duration: 0.18 },
      { freq: 1046.5, delay: 0.34, duration: 0.55 },
    ];

    for (const n of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(n.freq, now + n.delay);

      gain.gain.setValueAtTime(0.001, now + n.delay);
      gain.gain.linearRampToValueAtTime(0.22, now + n.delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + n.delay + n.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.delay);
      osc.stop(now + n.delay + n.duration + 0.02);
    }
  } catch {
    // Ignore if blocked
  }
}

export function triggerVictoryConfetti() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  // Palette stricte Dark Luxury : Or Champagne (#D4AF37), Émeraude Finance (#10B981), Ivoire (#F8FAFC)
  const colors = ["#D4AF37", "#10B981", "#F5D061", "#34D399", "#F8FAFC"];
  const particles = Array.from({ length: 130 }, () => {
    const angle = (Math.random() * Math.PI) + Math.PI;
    const speed = 7 + Math.random() * 14;
    return {
      x: canvas.width * (0.25 + Math.random() * 0.5),
      y: canvas.height * 0.45,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: -Math.abs(Math.sin(angle) * speed) - 4,
      size: 6 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      opacity: 1,
    };
  });

  let frame = 0;
  const maxFrames = 135;

  const render = () => {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.36; // gravité
      p.vx *= 0.99;
      p.rotation += p.vRot;
      if (frame > maxFrames * 0.65) {
        p.opacity = Math.max(0, p.opacity - 0.03);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    if (frame < maxFrames) {
      window.requestAnimationFrame(render);
    } else {
      canvas.remove();
    }
  };

  window.requestAnimationFrame(render);
}

/* ==========================================================================
   4. OUTILS DE CLOSING : ALERTE 48H, WHATSAPP 1-CLIC & PROMPT LOVABLE 1-CLIC
   ========================================================================== */
export function isLeadInactive48h(updatedAtIso: string, status: string): boolean {
  if (status === "client" || status === "signed") return false;
  const updatedMs = new Date(updatedAtIso).getTime();
  if (Number.isNaN(updatedMs)) return false;
  const diffHours = (Date.now() - updatedMs) / (1000 * 60 * 60);
  return diffHours >= 48;
}

export function getInactiveHours(updatedAtIso: string): number {
  const updatedMs = new Date(updatedAtIso).getTime();
  if (Number.isNaN(updatedMs)) return 0;
  return Math.max(0, Math.round((Date.now() - updatedMs) / (1000 * 60 * 60)));
}

export function buildOneClickWhatsAppRelance(
  prospect: Prospect,
  advisorNameOverride?: string,
  scoreOverride?: number,
): string {
  const advisor = getAdvisorById(prospect.owner_id || "martin");
  const firstName = advisorNameOverride || advisor.firstName;
  const contact = prospect.contact_name || "Bonjour";
  const company = prospect.business_name || prospect.website_url;
  const effectiveScore = scoreOverride ?? prospect.latest_score;
  const scoreTxt =
    typeof effectiveScore === "number"
      ? `Suite à notre diagnostic digital (${effectiveScore}/100 sur les 5 piliers)`
      : `Suite à l'analyse de la présence digitale de ${company}`;

  let script = "";
  if (prospect.status === "new" || prospect.status === "audited") {
    script = `${contact}, ici ${firstName} de XR Agency. ${scoreTxt}, j'ai préparé 3 axes concrets pour capter les appels et demandes de devis que vos concurrents récupèrent actuellement sur ${prospect.city || "votre secteur"}. Avez-vous 5 minutes aujourd'hui à 14h ou 17h ?`;
  } else if (prospect.status === "contacted") {
    script = `${contact}, c'est ${firstName} (XR Agency). Je viens de finaliser la maquette interactive et le chiffrage sur-mesure pour ${company}. Je vous envoie le lien de prévisualisation ici ou par email ?`;
  } else if (prospect.status === "qualified") {
    script = `${contact}, ici ${firstName} de XR Agency. Tout est prêt de notre côté pour bloquer votre créneau de production et lancer le déploiement de ${company}. Souhaitez-vous que je vous renvoie le lien de signature électronique du devis ?`;
  } else {
    script = `${contact}, ici ${firstName} de XR Agency. Point rapide concernant le suivi de ${company} — tout se passe bien de votre côté ?`;
  }

  const cleanPhone = (prospect.phone || "+33767566783").replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(script)}`;
}

export function generateLovableArchitecturePrompt(prospect: Prospect, audit?: Audit | null): string {
  const advisor = getAdvisorById(prospect.owner_id || "romain");
  const company = prospect.business_name || "Entreprise Client";
  const city = prospect.city || "Paris";
  const industry = prospect.industry || "Services & Commerce";
  const url = prospect.website_url || "https://exemple.fr";

  const auditSummary = audit
    ? `Scores actuels détectés : Global ${audit.total_score ?? 42}/100 (Tech: ${audit.score_tech ?? 8}/20, SEO: ${audit.score_seo ?? 9}/20, UX: ${audit.score_ux ?? 8}/20, Local Maps: ${audit.score_local ?? 8}/20, Perf: ${audit.score_perf ?? 9}/20).`
    : `Score initial estimé : ${prospect.latest_score ?? 44}/100 — fort manque à gagner sur Google Maps et la conversion mobile.`;

  return `# BRIEF ARCHITECTURAL LOVABLE — PROTOTYPE HAUTE CONVERSION POUR ${company.toUpperCase()}
## Préparé par ${advisor.fullName} (${advisor.roleTitle} — XR Agency)

### 1. CONTEXTE CLIENT & OBJECTIF COMMERCIAL
- **Entreprise** : ${company}
- **Secteur d'activité** : ${industry}
- **Localisation cible** : ${city} (${prospect.country || "France"})
- **Site actuel audité** : ${url}
- **Diagnostic XR Agency (5 Piliers)** : ${auditSummary}
- **Notes du Closer** : ${prospect.notes || "Refonte orientée génération de leads, appels directs et réassurance immédiate."}

### 2. DIRECTION ARTISTIQUE & UI/UX
- **Esthétique** : Dark Luxury & Tech Précision (Fond #080B10, Cartes #0F172A, Accents Or Champagne #D4AF37 et Vert Émeraude #10B981).
- **Photographie** : Exclusivement des photographies studio 85mm authentiques du secteur ${industry} (zéro illustration IA générique).
- **Mobile-First** : Barre d'appel direct et WhatsApp flottante sur smartphone, chargement instantané.

### 3. STRUCTURE DE LA LANDING PAGE À GÉNÉRER
1. **Hero Haute Conversion** : Proposition de valeur immédiate pour ${company} à ${city}, badge d'autorité locale, double CTA (« Demander un devis » + « Appeler maintenant »).
2. **Preuve Sociale & Ancrage Local (${city})** : Intégration des avis Google Maps vérifiés, carte interactive et garanties métier.
3. **Catalogue Clair des Prestations** : Présentation structurée des offres phares de ${company} avec appels à l'action directs.
4. **Module de Devis / Réservation en 3 clics** : Formulaire qualifié relié au CRM sans friction.
5. **FAQ SEO Locale & Footer Complet** : Balisage Schema.org LocalBusiness optimisé pour dominer le Top 3 Google Maps sur « ${industry} ${city} ».`;
}

/* ==========================================================================
   5. JEU DE DONNÉES INITIAL RÉTROCOMPATIBLE SUPABASE (PROSPECTS & AUDITS)
   ========================================================================== */
export const INITIAL_SUPABASE_PROSPECTS: Prospect[] = [
  {
    id: "pros-001",
    owner_id: "martin",
    business_name: "Maison Bellecour Joaillerie",
    website_url: "https://maison-bellecour-lyon.fr",
    industry: "Joaillerie & Horlogerie",
    country: "France",
    city: "Lyon 2e",
    contact_name: "Édouard Vasseur",
    contact_email: "direction@maison-bellecour-lyon.fr",
    phone: "+33 6 14 28 91 04",
    notes: "Hors du Top 3 Google Maps sur 'Joaillier Lyon'. Intéressé par Domination Locale (299€) + SEO Local Conquête (550€) + 4 plaques NFC comptoir.",
    status: "qualified",
    latest_score: 46,
    created_at: new Date(Date.now() - 3600000 * 90).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 54).toISOString(), // > 48h -> Alerte rouge clignotante !
  },
  {
    id: "pros-002",
    owner_id: "romain",
    business_name: "Cabinet d'Architecture Valmont",
    website_url: "https://valmont-architectes.fr",
    industry: "Architecture & Design Intérieur",
    country: "France",
    city: "Paris 8e",
    contact_name: "Claire Valmont",
    contact_email: "c.valmont@valmont-architectes.fr",
    phone: "+33 6 72 45 19 88",
    notes: "Site lent sous WordPress datant de 2019. Devis préparé pour Site Business (799 €) + Identité de Marque (299 €).",
    status: "contacted",
    latest_score: 52,
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "pros-003",
    owner_id: "damien",
    business_name: "Brasserie L'Impérial",
    website_url: "https://brasserie-imperial-bordeaux.fr",
    industry: "Restauration & Brasserie",
    country: "France",
    city: "Bordeaux",
    contact_name: "Marc-Antoine Delmas",
    contact_email: "contact@brasserie-imperial-bordeaux.fr",
    phone: "+33 6 88 12 34 59",
    notes: "Perd 2 400 €/mois en commissions plateformes. Souhaite le Système Caisse POS (2 000 €) + E-commerce Click & Collect (1 499 €) + Démo Robot (250 €).",
    status: "qualified",
    latest_score: 38,
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 61).toISOString(), // > 48h -> Alerte rouge clignotante !
  },
  {
    id: "pros-004",
    owner_id: "hugo",
    business_name: "Clinique Esthétique Vendôme",
    website_url: "https://clinique-vendome-esthetique.fr",
    industry: "Santé & Esthétique",
    country: "France",
    city: "Paris 1er",
    contact_name: "Dr. Sophie Moreau",
    contact_email: "s.moreau@clinique-vendome.fr",
    phone: "+33 6 51 90 23 11",
    notes: "Audit 5 piliers généré. Fort besoin sur le Protocole SEO Croissance (499 €/mois) + refonte tunnel de prise de RDV.",
    status: "audited",
    latest_score: 58,
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "pros-005",
    owner_id: "julie",
    business_name: "Groupe Immobilier Horizon",
    website_url: "https://horizon-prestige-immo.fr",
    industry: "Immobilier de Prestige",
    country: "France",
    city: "Nice",
    contact_name: "Laurent Giraud",
    contact_email: "l.giraud@horizon-prestige.fr",
    phone: "+33 6 33 81 09 42",
    notes: "Contrat signé : Site Business (799 €) + WebCare Business avec Julie (99 €/mois) + Infrastructure annuelle (79 €/an).",
    status: "client",
    latest_score: 94,
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "pros-006",
    owner_id: "christelle",
    business_name: "Hôtel & Spa Les Roches Blanches",
    website_url: "https://roches-blanches-annecy.fr",
    industry: "Hôtellerie & Spa",
    country: "France",
    city: "Annecy",
    contact_name: "Hélène Garnier",
    contact_email: "direction@roches-blanches-annecy.fr",
    phone: "+33 6 44 19 82 70",
    notes: "Demande Charte Graphique Complète (399 €) + E-commerce & Réservation (1 499 €). En attente de relance depuis 52h.",
    status: "new",
    latest_score: 49,
    created_at: new Date(Date.now() - 3600000 * 55).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 52).toISOString(), // > 48h -> Alerte rouge clignotante !
  },
  {
    id: "pros-007",
    owner_id: "edgar",
    business_name: "Poke-N-Ball",
    website_url: "https://poke-n-ball.fr",
    industry: "Restauration Rapide Premium",
    country: "France",
    city: "Paris",
    contact_name: "Direction Poke-N-Ball",
    contact_email: "contact@poke-n-ball.fr",
    phone: "+33 7 67 56 67 83",
    notes: "Client actif : Site Web + Commande en ligne + Système de caisse POS + Pack Croissance Social Media (499 €/mois).",
    status: "client",
    latest_score: 96,
    created_at: new Date(Date.now() - 3600000 * 240).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

export const INITIAL_SUPABASE_AUDITS: Audit[] = [
  {
    id: "aud-001",
    prospect_id: "pros-001",
    owner_id: "martin",
    website_url: "https://maison-bellecour-lyon.fr",
    status: "completed",
    total_score: 46,
    score_tech: 11,
    score_seo: 9,
    score_ux: 10,
    score_local: 6,
    score_perf: 10,
    pages_crawled: 5,
    page_count: 5,
    executive_summary:
      "Absence du Pack Local Top 3 sur Lyon 2e, fiche GBP incomplète sans suivi d'avis NFC, et temps de chargement mobile supérieur à 3,8s.",
    started_at: new Date(Date.now() - 3600000 * 80).toISOString(),
    completed_at: new Date(Date.now() - 3600000 * 79).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 80).toISOString(),
  },
  {
    id: "aud-002",
    prospect_id: "pros-004",
    owner_id: "hugo",
    website_url: "https://clinique-vendome-esthetique.fr",
    status: "completed",
    total_score: 58,
    score_tech: 13,
    score_seo: 10,
    score_ux: 12,
    score_local: 11,
    score_perf: 12,
    pages_crawled: 8,
    page_count: 8,
    executive_summary:
      "Potentiel sémantique sous-exploité : aucune page dédiée par acte esthétique, balisage H1/H2 dilué et absence de maillage interne vers la prise de RDV.",
    started_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    completed_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

export { XR_ADVISORS };
