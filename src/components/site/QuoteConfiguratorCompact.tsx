import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { ArrowRight, Check, Globe2, Mail, MessageCircle, RotateCcw, Sparkles, WandSparkles } from "lucide-react";
import { JulieAdvisor } from "./JulieAdvisor";

type Choice = { id: string; label: string; detail: string };
type Sector = Choice & { goals: string[] };
type Proposal = { id: string; label: string; detail: string; price: number; period: "once" | "month" };
const SECTORS: Sector[] = [
  { id: "restaurant", label: "Restaurant · bar · café", detail: "Restaurant, rooftop, bar, coffee shop, food", goals: ["Augmenter les réservations", "Être trouvé localement", "Monter en gamme"] },
  { id: "hotel", label: "Hôtel · resort · hospitality", detail: "Hôtel, villa, resort, guesthouse", goals: ["Augmenter les réservations", "Attirer une clientèle internationale", "Améliorer la visibilité"] },
  { id: "realestate", label: "Immobilier · location · conciergerie", detail: "Agence, promoteur, location, gestion", goals: ["Générer plus de demandes", "Valoriser les biens", "Attirer une clientèle premium"] },
  { id: "law", label: "Avocat · juridique", detail: "Cabinet, droit des affaires, conseil", goals: ["Gagner en crédibilité", "Obtenir des prospects qualifiés", "Être visible sur Google"] },
  { id: "finance", label: "Finance · assurance · conseil", detail: "Finance, patrimoine, assurance, consulting", goals: ["Gagner en confiance", "Générer des leads", "Structurer l'image de marque"] },
  { id: "health", label: "Santé · bien-être · beauté", detail: "Clinique, cabinet, spa, esthétique, fitness", goals: ["Générer des prises de rendez-vous", "Être trouvé localement", "Professionnaliser l'image"] },
  { id: "architecture", label: "Architecture · design · construction", detail: "Architecte, intérieur, immobilier, construction", goals: ["Montrer les réalisations", "Attirer des projets premium", "Être trouvé sur Google"] },
  { id: "luxury", label: "Luxe · mode · automobile", detail: "Maison, joaillerie, mode, voitures premium", goals: ["Renforcer l'image premium", "Générer des demandes", "Créer une présence internationale"] },
  { id: "commerce", label: "Commerce · e-commerce · retail", detail: "Boutique, marque, catalogue, vente en ligne", goals: ["Vendre davantage", "Améliorer la conversion", "Développer la marque"] },
  { id: "tourism", label: "Tourisme · activités · loisirs", detail: "Excursions, expériences, loisirs, événements", goals: ["Augmenter les réservations", "Être trouvé par les touristes", "Convertir davantage"] },
  { id: "agency", label: "Agence · studio · freelance", detail: "Créatif, marketing, tech, production", goals: ["Présenter l'expertise", "Générer des leads", "Monter en gamme"] },
  { id: "other", label: "Autre activité", detail: "Votre métier ne figure pas ici ? Julie s'adapte.", goals: ["Développer mon activité", "Professionnaliser mon image", "Construire une présence forte"] },
];
const SERVICES: Choice[] = [
  { id: "website", label: "Site web", detail: "Vitrine, Business, e-commerce ou réservation" }, { id: "branding", label: "Branding", detail: "Logo, identité, direction artistique et univers" }, { id: "seo", label: "SEO", detail: "Positionnement organique et acquisition Google" }, { id: "maps", label: "Google Maps", detail: "Fiche locale, visibilité et optimisation locale" }, { id: "ads", label: "Google Ads", detail: "Campagnes sponsorisées et acquisition payante" }, { id: "social", label: "Social Media", detail: "Stratégie, contenus et animation des réseaux" }, { id: "content", label: "Contenu · photo · vidéo", detail: "Direction de contenu, visuels et formats de campagne" }, { id: "conversion", label: "Conversion & parcours", detail: "UX, landing pages, CTA et optimisation commerciale" }, { id: "maintenance", label: "WebCare", detail: "Corrections, évolutions et suivi du site" },
];
const SITUATIONS: Choice[] = [
  { id: "none", label: "Pas encore de site", detail: "Créer un socle digital propre dès le départ" }, { id: "existing", label: "J'ai déjà un site", detail: "Le conserver et l'améliorer" }, { id: "redesign", label: "Mon site doit être refait", detail: "Design, structure, mobile ou conversion à revoir" }, { id: "outdated", label: "Il fonctionne mais il est daté", detail: "Moderniser sans repartir de zéro" }, { id: "invisible", label: "J'ai peu de visibilité", detail: "Le problème est surtout l'acquisition" }, { id: "selling", label: "Je vends / prends des réservations", detail: "Catalogue, paiement, réservation ou rendez-vous" }, { id: "international", label: "Je vise l'international", detail: "Langues, image premium et acquisition internationale" }, { id: "launch", label: "Je lance une nouvelle activité", detail: "Construire l'offre et la présence dès le départ" },
];
const BUDGETS: Choice[] = [
  { id: "under500", label: "Moins de 500 €", detail: "Un levier prioritaire" }, { id: "500_1000", label: "500 – 1 000 €", detail: "Une présence solide" }, { id: "1000_2500", label: "1 000 – 2 500 €", detail: "Un dispositif complet" }, { id: "2500_5000", label: "2 500 – 5 000 €", detail: "Une stratégie structurée" }, { id: "5000_plus", label: "5 000 € +", detail: "Un projet premium sur mesure" },
];
const DISCOVERY: Choice[] = [
  { id: "google", label: "Google / Maps", detail: "Recherche, SEO ou visibilité locale" }, { id: "social", label: "Instagram / Facebook / TikTok", detail: "Réseaux sociaux et recommandations" }, { id: "referral", label: "Bouche-à-oreille", detail: "Recommandations et réseau" }, { id: "mixed", label: "Un peu de tout", detail: "Acquisition déjà diversifiée" },
];
const SERVICE_ORDER: Record<string, string[]> = { restaurant: ["website","maps","seo","social","branding","maintenance"], hotel: ["website","maps","seo","social","branding","maintenance"], realestate: ["website","maps","branding","seo","social","maintenance"], law: ["website","seo","branding","maps","conversion","maintenance"], finance: ["website","branding","seo","conversion","maps","maintenance"], health: ["website","maps","seo","social","conversion","maintenance"], architecture: ["website","branding","seo","content","conversion","maintenance"], luxury: ["website","branding","seo","content","conversion","social"], commerce: ["website","conversion","seo","social","branding","maintenance"], tourism: ["website","maps","seo","social","content","maintenance"], agency: ["website","branding","seo","content","conversion","social"], other: ["website","seo","branding","maps","conversion","maintenance"] };
const BASE_PRICES: Record<string, number> = { website: 499, branding: 199, seo: 299, maps: 199, ads: 299, social: 499, content: 399, conversion: 299, maintenance: 29 };const PROFILE_SERVICE_RULES: Record<string, string[]> = {
  restaurant: ["website","maps","seo","social"], hotel: ["website","maps","seo","social"], realestate: ["website","maps","branding","seo"], law: ["website","seo","branding","conversion"], finance: ["website","branding","seo","conversion"], health: ["website","maps","seo","conversion"], architecture: ["website","branding","seo","content"], luxury: ["website","branding","seo","content"], commerce: ["website","conversion","seo","social"], tourism: ["website","maps","seo","social"], agency: ["website","branding","seo","conversion"], other: ["website","seo","branding","maps"]
};
