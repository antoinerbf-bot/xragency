import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  MessageCircle,
  Palette,
  PhoneCall,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import webLuxuryShowcase from "@/assets/web-luxury-showcase.jpg";
import agentXrPortrait from "@/assets/agent-xr-portrait.jpg";

export const Route = createFileRoute("/school")({
  head: () => ({
    meta: [
      { title: "XR School · Lancez votre agence digitale rentable en 90 jours (4 000 €) — XR Agency" },
      {
        name: "description",
        content:
          "Formation vente 90 jours, site web + identité de marque complète, ligne téléphonique pro, leads fournis dans notre CRM interne, recrutement ou sous-traitance XR Agency. 4 000 € avec accompagnement autonomie financière.",
      },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/school" }],
  }),
  component: XrSchoolPage,
});

const VIDEO_CHAPTERS = [
  { id: "c1", num: "01", label: "Vision 90j & Garantie", time: 0 },
  { id: "c2", num: "02", label: "Site, Marque & Ligne", time: 8.2 },
  { id: "c3", num: "03", label: "Leads & CRM Équipe", time: 17.2 },
  { id: "c4", num: "04", label: "Recruter ou Sous-Traiter", time: 27.2 },
  { id: "c5", num: "05", label: "Intégrer (4 000 €)", time: 36.2 },
];

const SIX_PILLARS = [
  {
    icon: Palette,
    badge: "01 · IDENTITÉ & SITE",
    title: "Votre site web + Image de marque complète",
    desc: "Nos designers et développeurs créent votre propre site haute couture, votre logo, votre Brand Book et vos tunnels de devis prêts à encaisser sous votre marque.",
  },
  {
    icon: PhoneCall,
    badge: "02 · INFRASTRUCTURE APPELS",
    title: "Ligne téléphonique professionnelle fournie",
    desc: "Vous démarrez avec votre ligne pro dédiée, vos scripts d'ouverture validés sur le terrain et vos séquences de relance WhatsApp/SMS.",
  },
  {
    icon: Sparkles,
    badge: "03 · ACQUISITION DIRECTE",
    title: "Leads qualifiés envoyés dans votre CRM",
    desc: "Nous vous ouvrons un accès membre sur notre CRM interne (/crm) et vous dispatchons directement des prospects qualifiés prêts à être appelés.",
  },
  {
    icon: GraduationCap,
    badge: "04 · FORMATION 90 JOURS",
    title: "Vidéos closing, vente & maîtrise d'offres",
    desc: "90 jours de formation vidéo pratique : gestion des objections, argumentation Sites / Google Maps / Branding et debriefings hebdomadaires sur vos appels.",
  },
  {
    icon: Users,
    badge: "05 · SCALING ÉQUIPE",
    title: "Suivi & formation pour recruter vos vendeurs",
    desc: "Apprenez à sourcer, former et piloter vos propres commerciaux directement dans votre CRM avec tableaux de bord de performance et commissions.",
  },
  {
    icon: Wrench,
    badge: "06 · SOUS-TRAITANCE LIBRE",
    title: "Déléguez-nous le travail quand vous voulez",
    desc: "Selon vos envies, vos besoins et votre capacité, sous-traitez la production technique (sites, Maps, SEO, branding) à XR Agency et gardez la marge.",
  },
];

function XrSchoolPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  // Interactive profitability projection state
  const [clientsPerMonth, setClientsPerMonth] = useState(3);
  const [avgContract, setAvgContract] = useState(1800);
  const monthlyGross = clientsPerMonth * avgContract;
  const breakEvenDays = Math.max(12, Math.min(90, Math.round((4000 / Math.max(1, monthlyGross)) * 30)));

  // Checkout enrollment state
  const [paymentPlan, setPaymentPlan] = useState<"full" | "split">("full");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const playVideoAt = (idx: number, t: number) => {
    setActiveChapter(idx);
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.currentTime = t;
    v.play().catch(() => {});
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const t = v.currentTime;
    for (let i = VIDEO_CHAPTERS.length - 1; i >= 0; i--) {
      if (t >= VIDEO_CHAPTERS[i].time - 0.3) {
        setActiveChapter(i);
        break;
      }
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setCheckoutBusy(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "checkout",
          currency: "eur",
          selectedServices: [paymentPlan === "full" ? "school_academy" : "school_installment"],
          client: {
            email: email.trim(),
            name: fullName.trim() || "Élève XR School",
            whatsapp: phone.trim(),
            company: "XR School 90j",
          },
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Paiement Stripe indisponible actuellement — finalisez votre inscription sur WhatsApp.");
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Erreur paiement.");
    } finally {
      setCheckoutBusy(false);
    }
  };

  const waEnrollment = encodeURIComponent(
    `Bonjour XR Agency, je souhaite rejoindre XR School (Programme 90 jours Clés-en-Main à 4 000 €).\n\nNom : ${fullName || "À compléter"}\nTéléphone : ${phone || "À compléter"}\nOption souhaitée : ${paymentPlan === "full" ? "4 000 € comptant" : "Paiement échelonné 3x"}\n\nPouvons-nous planifier l'appel de validation ?`
  );

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#141312]">
      <Nav />

      {/* ── 1. OBSIDIAN HERO + 90-DAY EXPLAINER VIDEO ── */}
      <section className="relative overflow-hidden bg-[#121110] pt-28 pb-16 sm:pt-32 sm:pb-20 text-[#f7f4ed]">
        <img
          src={heroCinematic}
          alt="XR School Paris"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#121110]/85 via-[#121110]/80 to-[#121110]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-white/75 hover:text-[#e8cfa6] transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Retour à l&apos;agence
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/45 bg-[#c5a880]/15 px-3.5 py-1.5 label-mono text-[8.5px] font-bold text-[#e8cfa6]">
              <GraduationCap className="h-3.5 w-3.5" /> XR SCHOOL · PROGRAMME FONDATEUR 90 JOURS
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="display-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.04] tracking-tight text-[#f7f4ed]">
              Bâtissez votre <em className="italic font-normal text-[#c5a880]">agence de com rentable</em> en 90 jours.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#d7d1c6]">
              Ne partez pas de zéro : nous créons votre site + marque complète, fournissons votre ligne pro et vos leads dans notre CRM interne, et vous formons au closing, au recrutement — ou prenons en charge la sous-traitance technique.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#school-checkout"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e7cfa8] to-[#c5a880] px-7 py-3.5 text-xs font-black uppercase tracking-[.1em] text-[#141312] shadow-lg hover:brightness-105 transition"
              >
                Rejoindre XR School · 4 000 € <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/crm"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#c5a880] transition"
              >
                <Briefcase className="h-4 w-4 text-[#c5a880]" /> Aperçu du CRM Interne
              </Link>
            </div>
          </div>

          {/* 90-Day Video Presentation Player */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#c5a880]/35 bg-[#0e0d0c] shadow-[0_34px_95px_-25px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-video bg-[#0e0d0c]">
              <video
                ref={videoRef}
                src="/videos/xr-school-90j.mp4"
                poster="/videos/school-poster.jpg"
                controls={playing}
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                className="h-full w-full object-cover"
              >
                <source src="/videos/xr-school-90j.mp4" type="video/mp4" />
              </video>

              {!playing && (
                <button
                  type="button"
                  onClick={() => playVideoAt(0, 0)}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-3 sm:pb-7 bg-gradient-to-t from-black/75 via-transparent to-transparent cursor-pointer"
                >
                  <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-[#c5a880]/55 bg-[#141312]/95 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-[#f7f4ed] shadow-2xl hover:scale-105 transition">
                    <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-gradient-to-br from-[#e7cfa8] to-[#c5a880] text-[#141312]">
                      <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current ml-0.5" />
                    </span>
                    <span className="sm:hidden">Lancer la vidéo 90 jours</span>
                    <span className="hidden sm:inline">Voir l&apos;explication complète du programme 90 jours</span>
                  </div>
                </button>
              )}
            </div>

            <div className="border-t border-white/10 bg-[#141312] p-3">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {VIDEO_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => playVideoAt(idx, ch.time)}
                    className={cn(
                      "rounded-xl border px-2.5 py-2 text-left transition",
                      activeChapter === idx
                        ? "border-[#c5a880] bg-[#c5a880]/20 text-[#f7f4ed]"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    <span className="label-mono text-[7px] text-[#e8cfa6] block">{ch.num}</span>
                    <span className="text-[10.5px] font-semibold line-clamp-1">{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SIX PILLARS PROVIDED (CREAM LUXURY WORKSPACE) ── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="label-mono text-[10px] font-bold text-[#9b7b4b] uppercase tracking-[.2em]">
              CE QUE VOUS RECEVEZ DÈS VOTRE ENTRÉE
            </span>
            <h2 className="display-serif mt-2 text-3xl sm:text-4xl text-[#141312]">
              Une agence complète, armée pour signer — <em className="italic text-[#9b7b4b]">même sans expérience technique.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SIX_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-[#141312]/10 bg-white p-6 shadow-xs space-y-3 hover:border-[#b48f5a]/60 transition">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-[8.5px] font-bold text-[#9b7b4b]">{item.badge}</span>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f3ead9] text-[#9b7b4b]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#141312]">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#5d564c]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. ROADMAP 90 JOURS + GUARANTEE ── */}
      <section className="py-12 sm:py-16 border-y border-[#141312]/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="rounded-3xl bg-[#141312] p-6 sm:p-9 text-[#f7f4ed] grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/15 px-3 py-1 label-mono text-[8px] font-bold text-[#e8cfa6]">
                <Award className="h-3.5 w-3.5" /> GARANTIE D&apos;AUTONOMIE FINANCIÈRE SUR 90 JOURS
              </div>
              <h3 className="display-serif text-2xl sm:text-3xl leading-tight">
                Nous restons à vos côtés jusqu&apos;à ce que votre agence génère ses revenus de façon autonome.
              </h3>
              <p className="text-xs sm:text-sm text-[#d7d1c6] leading-relaxed">
                En combinant votre propre identité digitale, notre CRM interne alimenté en leads, notre méthode de closing et l&apos;option sous-traitance totale vers notre studio, vous éliminez les 6 mois d&apos;errance technique pour encaisser dès le premier trimestre.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-4 flex items-center gap-4">
              <img src={agentXrPortrait} alt="Direction XR School" className="h-16 w-16 rounded-2xl object-cover object-top border border-[#c5a880]" />
              <div>
                <p className="text-xs font-bold text-[#e8cfa6]">Protocole XR School · Engagement Résultat</p>
                <p className="mt-1 text-[11px] text-white/75 leading-snug">
                  Suivi hebdo, attribution directe de leads et accès prioritaire à nos tarifs partenaires de sous-traitance.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                period: "JOURS 1 À 30",
                title: "Création de votre agence & maîtrise vente",
                points: [
                  "Livraison de votre site vitrine + Brand Book + logo",
                  "Activation de votre ligne téléphonique dédiée",
                  "Assimilation des vidéos vente & closing haute valeur",
                ],
              },
              {
                period: "JOURS 31 À 60",
                title: "Leads envoyés & Premiers encaissements",
                points: [
                  "Réception de vos leads dans l'espace CRM (/crm)",
                  "Appels accompagnés & debriefing de vos closings",
                  "Option : délégation de vos premiers chantiers à XR",
                ],
              },
              {
                period: "JOURS 61 À 90",
                title: "Autonomie, Recrutement ou Sous-traitance",
                points: [
                  "Recrutement & onboarding de vos propres commerciaux",
                  "Tableaux de stats et pilotage commissions dans le CRM",
                  "Modèle 100% libre selon vos envies & capacité",
                ],
              },
            ].map((phase) => (
              <div key={phase.period} className="rounded-3xl border border-[#141312]/10 bg-[#faf7f1] p-6 space-y-3">
                <span className="inline-block rounded-full bg-[#141312] px-3 py-1 label-mono text-[8px] font-bold text-[#e8cfa6]">
                  {phase.period}
                </span>
                <h4 className="display-serif text-xl text-[#141312]">{phase.title}</h4>
                <ul className="space-y-2 text-xs text-[#4e483f]">
                  {phase.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#9b7b4b] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ROI SIMULATOR + 4 000 € ENROLLMENT CHECKOUT ── */}
      <section id="school-checkout" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* ROI Simulation Card */}
          <div className="rounded-3xl border border-[#141312]/10 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="label-mono text-[9px] font-bold text-[#9b7b4b] uppercase">RENTABILITÉ ESTIMÉE</span>
              <h3 className="display-serif mt-1.5 text-2xl sm:text-3xl text-[#141312]">
                Combien rapporte votre agence dès 90 jours ?
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span>Clients signés par mois</span>
                  <span className="text-[#9b7b4b]">{clientsPerMonth} client(s) / mois</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={clientsPerMonth}
                  onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                  className="w-full accent-[#b48f5a]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span>Panier moyen client (Site / Maps / SEO)</span>
                  <span className="text-[#9b7b4b]">{avgContract.toLocaleString("fr-FR")} €</span>
                </div>
                <input
                  type="range"
                  min={800}
                  max={3500}
                  step={100}
                  value={avgContract}
                  onChange={(e) => setAvgContract(Number(e.target.value))}
                  className="w-full accent-[#b48f5a]"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-[#141312] p-5 text-[#f7f4ed] grid grid-cols-2 gap-4">
              <div>
                <span className="label-mono text-[8px] text-[#e8cfa6] uppercase block">CA Mensuel Projeté</span>
                <p className="display-serif mt-1 text-3xl font-semibold text-[#e8cfa6]">
                  {monthlyGross.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div>
                <span className="label-mono text-[8px] text-white/60 uppercase block">Amortissement 4 000 €</span>
                <p className="display-serif mt-1 text-3xl font-semibold text-white">
                  ~{breakEvenDays} jours
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#141312]/10">
              <img src={webLuxuryShowcase} alt="Exemple de site livré pour votre agence" className="h-44 w-full object-cover" />
            </div>
          </div>

          {/* Checkout Card 4 000 € */}
          <div className="rounded-3xl border-2 border-[#b48f5a] bg-[#121110] p-6 sm:p-8 text-[#f7f4ed] shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="label-mono text-[9px] font-bold text-[#e8cfa6] uppercase">OFFRE INTÉGRALE 90 JOURS</span>
                <h3 className="display-serif mt-1 text-3xl">XR School Clés-en-Main</h3>
              </div>
              <div className="text-right">
                <span className="display-serif text-4xl font-bold text-[#e8cfa6]">4 000 €</span>
                <span className="block text-[10px] text-white/60">Tout inclus · Site &amp; Leads compris</span>
              </div>
            </div>

            {/* Mode selector */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentPlan("full")}
                className={cn(
                  "rounded-2xl border p-3.5 text-left transition",
                  paymentPlan === "full"
                    ? "border-[#c5a880] bg-[#c5a880]/20 text-white"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                )}
              >
                <span className="text-xs font-bold block">Comptant · 4 000 €</span>
                <span className="text-[10px] text-[#e8cfa6]">Accès immédiat complet</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentPlan("split")}
                className={cn(
                  "rounded-2xl border p-3.5 text-left transition",
                  paymentPlan === "split"
                    ? "border-[#c5a880] bg-[#c5a880]/20 text-white"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                )}
              >
                <span className="text-xs font-bold block">Échelonné · 3× 1 350 €</span>
                <span className="text-[10px] text-white/70">1er versement aujourd&apos;hui</span>
              </button>
            </div>

            <form onSubmit={handleCheckout} className="space-y-3">
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom et Prénom *"
                className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-[#c5a880] focus:outline-none"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail professionnel *"
                  className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-[#c5a880] focus:outline-none"
                />
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Téléphone / WhatsApp *"
                  className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              {checkoutError && (
                <div className="rounded-xl border border-amber-400/40 bg-amber-500/15 px-3.5 py-2.5 text-xs text-amber-200">
                  {checkoutError}
                </div>
              )}

              <button
                type="submit"
                disabled={checkoutBusy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e7cfa8] to-[#c5a880] px-6 py-4 text-xs font-black uppercase tracking-[.1em] text-[#141312] shadow-lg hover:brightness-105 transition disabled:opacity-50"
              >
                <CreditCard className="h-4 w-4" />
                {checkoutBusy
                  ? "Redirection Stripe..."
                  : paymentPlan === "full"
                    ? "Payer 4 000 € & Démarrer mes 90 jours"
                    : "Régler 1ère échéance (1 350 €) via Stripe"}
              </button>
            </form>

            <a
              href={`${CONTACT.whatsapp}?text=${waEnrollment}`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#c5a880] transition"
            >
              <MessageCircle className="h-4 w-4 text-[#c5a880]" /> Poser une question sur WhatsApp avant de démarrer
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[10.5px] text-white/65">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#c5a880]" /> Site &amp; Marque livrés</span>
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-[#c5a880]" /> Ligne + Leads inclus</span>
              <span className="inline-flex items-center gap-1"><Wrench className="h-3.5 w-3.5 text-[#c5a880]" /> Option sous-traitance XR</span>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}

