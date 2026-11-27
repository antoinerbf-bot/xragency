import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Sparkles,
  Check,
  CheckCircle2,
  Utensils,
  Receipt,
  Package,
  ChefHat,
  Bike,
  TrendingUp,
  DollarSign,
  Gamepad2,
  Layers,
  ShieldCheck,
  MapPin,
  Printer,
  Smartphone,
  Flame,
  ArrowUpRight,
  Clock,
  Building2,
  Users,
  Compass,
  Zap,
  Eye,
  Store,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { CONTACT } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// Mock menu items for interactive POS
const POS_MENU_ITEMS = [
  {
    id: "poke-salmon",
    name: "Poké Saumon Truffe",
    cat: "Plats",
    price: 15.9,
    stock: 24,
    icon: "🍣",
  },
  { id: "poke-tuna", name: "Poké Thon Spicy", cat: "Plats", price: 16.5, stock: 18, icon: "🐟" },
  {
    id: "burger-wagyu",
    name: "Burger Wagyu Truffé",
    cat: "Plats",
    price: 18.9,
    stock: 12,
    icon: "🍔",
  },
  {
    id: "bowl-vegan",
    name: "Green Bowl Avocat & Tofu",
    cat: "Plats",
    price: 14.0,
    stock: 35,
    icon: "🥑",
  },
  {
    id: "drink-matcha",
    name: "Iced Matcha Latte Bio",
    cat: "Boissons",
    price: 5.5,
    stock: 45,
    icon: "🍵",
  },
  {
    id: "drink-yuzu",
    name: "Limonade Yuzu & Gingembre",
    cat: "Boissons",
    price: 4.9,
    stock: 60,
    icon: "🍋",
  },
  {
    id: "dessert-mochi",
    name: "Duo Mochis Artisanaux",
    cat: "Desserts",
    price: 6.0,
    stock: 14,
    icon: "🍡",
  },
];

export function CustomCrmShowcase() {
  const { lang } = useLang();
  const isEn = lang === "en";

  // --- 1. SIMULATEUR UBER EATS / COMMISSIONS ---
  const [monthlyDeliveryRevenue, setMonthlyDeliveryRevenue] = useState<number>(10000);
  const [selectedCountry, setSelectedCountry] = useState<"france" | "belgique" | "suisse">(
    "france",
  );

  const commissionRate = 0.3; // 30% commission standard Uber Eats / Deliveroo
  const monthlyCommissionLost = Math.round(monthlyDeliveryRevenue * commissionRate);
  const yearlyCommissionLost = monthlyCommissionLost * 12;
  const threeYearsCommissionLost = yearlyCommissionLost * 3;
  const crmBasePrice = 2000;
  const paybackDays = Math.max(1, Math.round((crmBasePrice / monthlyCommissionLost) * 30));
  const threeYearsNetSavings = threeYearsCommissionLost - crmBasePrice;
  const curr = selectedCountry === "suisse" ? "CHF" : "€";

  // --- 1.5 MULTI-SECTOR CRM SHOWCASE ---
  const [sectorCrmTab, setSectorCrmTab] = useState<"restaurant" | "hotel" | "clinic" | "immo" | "retail">("restaurant");

  // --- 2. INTERACTIVE DEMO VIEWS (POS, KDS, LIVREUR, STOCKS, 3D GTA) ---
  const [demoTab, setDemoTab] = useState<"pos" | "kds" | "driver" | "stocks" | "gta3d">("pos");

  // POS State
  const [posCart, setPosCart] = useState<
    { id: string; name: string; price: number; qty: number }[]
  >([
    { id: "poke-salmon", name: "Poké Saumon Truffe", price: 15.9, qty: 1 },
    { id: "drink-matcha", name: "Iced Matcha Latte Bio", price: 5.5, qty: 1 },
  ]);
  const [lastTicket, setLastTicket] = useState<{
    number: string;
    date: string;
    items: { name: string; qty: number; price: number }[];
    total: number;
    tva: number;
  } | null>(null);

  const cartTotal = posCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartTva = Math.round(cartTotal * 0.1 * 100) / 100;

  const addToPosCart = (item: (typeof POS_MENU_ITEMS)[0]) => {
    setPosCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const handlePrintTicket = () => {
    if (posCart.length === 0) return;
    const ticketNum = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastTicket({
      number: ticketNum,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      items: [...posCart],
      total: cartTotal,
      tva: cartTva,
    });
  };

  // Stocks State
  const [stocksList, setStocksList] = useState([
    { name: "Saumon Frais Label Rouge (kg)", current: 14.2, max: 20, unit: "kg", alert: false },
    { name: "Riz Japonais Koshihikari (kg)", current: 48, max: 50, unit: "kg", alert: false },
    { name: "Avocats Hass Mûrs (pièces)", current: 8, max: 50, unit: "pcs", alert: true },
    {
      name: "Emballages Biodégradables (boîtes)",
      current: 180,
      max: 300,
      unit: "boîtes",
      alert: false,
    },
    { name: "Sauce Truffe Maison (litres)", current: 2.1, max: 10, unit: "L", alert: true },
  ]);

  // Kitchen Orders (KDS)
  const [kitchenOrders, setKitchenOrders] = useState([
    {
      id: "CMD-201",
      type: "Click & Collect",
      elapsed: "3 min",
      status: "cooking",
      items: "1x Poké Saumon, 1x Matcha Latte",
    },
    {
      id: "CMD-202",
      type: "Livraison Directe",
      elapsed: "7 min",
      status: "ready",
      items: "2x Burger Wagyu, 2x Limonade Yuzu",
    },
    {
      id: "CMD-203",
      type: "Sur Place (Table 4)",
      elapsed: "1 min",
      status: "cooking",
      items: "1x Green Bowl Avocat, 1x Duo Mochis",
    },
  ]);

  // Driver Orders
  const [driverOrders, setDriverOrders] = useState([
    {
      id: "LIV-88",
      client: "Alexandre D.",
      address: "14 Rue de Rivoli, Paris",
      time: "12 min",
      status: "en_cours",
    },
    {
      id: "LIV-89",
      client: "Sophie M.",
      address: "28 Bd Saint-Germain, Paris",
      time: "18 min",
      status: "attribue",
    },
  ]);

  // Interactive 3D GTA Mode View toggles
  const [gtaFloor, setGtaFloor] = useState<"restaurant" | "city">("restaurant");

  // --- 3. QUESTIONNAIRE DE QUALIFICATION EN AMONT ---
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [bizType, setBizType] = useState<string>("Restaurant & Food");
  const [currentChannels, setCurrentChannels] = useState<string[]>([
    "Uber Eats / Deliveroo (30% de commission)",
    "Vente sur place / Caisse",
  ]);
  const [expectedFeatures, setExpectedFeatures] = useState<string[]>([
    "Caisse tactile & Tickets réels",
    "Gestion des stocks & Ingrédients",
    "Site commande en ligne (0% com)",
    "Écran cuisine KDS",
    "Application Livreurs",
  ]);
  const [budgetTier, setBudgetTier] = useState<"2000" | "5000">("2000");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleChannel = (item: string) => {
    setCurrentChannels((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleFeature = (item: string) => {
    setExpectedFeatures((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const submitProposal = async (e: FormEvent) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim()) {
      setErrorMsg("Veuillez renseigner votre nom et votre adresse e-mail.");
      return;
    }
    setSending(true);
    setErrorMsg("");
    try {
      const message =
        `DEMANDE OFFRE CRM & LOGICIEL CAISSE POS (Économie 30% Uber Eats)\n` +
        `Activité : ${bizType}\n` +
        `Pays : ${selectedCountry.toUpperCase()}\n` +
        `CA Mensuel livraison estimé : ${monthlyDeliveryRevenue} €/mois\n` +
        `Économie potentielle estimée : ${yearlyCommissionLost} € / an\n` +
        `Budget visé : ${budgetTier === "2000" ? "Pack Pro 2 000 €" : "Pack Immersion 3D GTA/Sims 5 000 €"}\n` +
        `Canaux actuels : ${currentChannels.join(", ")}\n` +
        `Fonctionnalités souhaitées : ${expectedFeatures.join(", ")}\n` +
        `Téléphone : ${contact.phone || "Non renseigné"}\n` +
        `Société / Enseigne : ${contact.company || "Non renseigné"}`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          company: contact.company.trim() || bizType,
          need: `Logiciel Caisse POS & CRM (${budgetTier === "2000" ? "2 000 €" : "5 000 € 3D"})`,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur d'envoi");
      setSentOk(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="crm-sur-mesure"
      className="relative overflow-hidden border-b border-[#E8E6E0] bg-[#FAF8F5] py-16 sm:py-24 text-[#12110E]"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-b from-[#C5A880]/15 via-transparent to-transparent blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-16 relative z-10">
        {/* ════════════════════════════════════════════════════════════════
            1. HERO & POSITIONNEMENT COMMERCIAL CHOC
            ════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#C5A880]" />
            <span className="font-mono text-[9px] font-bold tracking-[.2em] text-[#C5A880] uppercase">
              NOUVELLE OFFRE · LOGICIEL CAISSE POS, STOCKS &amp; CRM OMNICANAL
            </span>
          </div>

          <h2 className="text-[clamp(2.5rem,5.5vw,4.8rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#12110E]">
            Arrêtez de donner{" "}
            <span className="text-red-500 underline decoration-red-500/50">30% à Uber Eats</span>.{" "}
            <span className="text-[#C5A880] font-light italic">Reprenez le contrôle.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#52504A] max-w-3xl mx-auto leading-relaxed">
            Votre propre <strong>logiciel de caisse tactile</strong> qui génère de vrais tickets,
            gère vos <strong>stocks au gramme près</strong>, synchronise votre{" "}
            <strong>site de commande directe sans commission</strong>, pilote l&apos;écran cuisine
            KDS et guide vos livreurs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E0] bg-white px-3.5 py-2 text-xs font-semibold text-[#2B2925] shadow-sm">
              <Check className="h-4 w-4 text-[#C5A880]" /> Caisse tactile &amp; Tickets certifiés
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E0] bg-white px-3.5 py-2 text-xs font-semibold text-[#2B2925] shadow-sm">
              <Check className="h-4 w-4 text-[#C5A880]" /> Gestion des stocks en direct
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E0] bg-white px-3.5 py-2 text-xs font-semibold text-[#2B2925] shadow-sm">
              <Check className="h-4 w-4 text-[#C5A880]" /> 0% de commission à vie
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E0] bg-white px-3.5 py-2 text-xs font-semibold text-[#2B2925] shadow-sm">
              <Check className="h-4 w-4 text-[#C5A880]" /> Multi-établissements &amp; Franchise
            </span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2. LE SIMULATEUR D'ÉCONOMIES UBER EATS (FRANCE & BELGIQUE)
            ════════════════════════════════════════════════════════════════ */}
        <div className="rounded-[2.5rem] border border-red-500/30 bg-gradient-to-br from-[#12080a] via-[#090b10] to-[#0c0d16] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-400">
                  SIMULATEUR DE RENTABILITÉ · FRANCE, BELGIQUE, SUISSE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Combien perdez-vous chaque mois en commissions de livraison ?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Que vous soyez en France, en Belgique ou en Suisse, Uber Eats, Deliveroo et les plateformes de commande prélèvent en
                  moyenne <strong>30% de votre chiffre d&apos;affaires</strong>. Voici le calcul
                  réel de ce que vous préservez en passant sur votre propre système :
                </p>
              </div>

              {/* Country Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400">Votre localisation :</span>
                {[
                  { id: "france" as const, label: "🇫🇷 France" },
                  { id: "belgique" as const, label: "🇧🇪 Belgique" },
                  { id: "suisse" as const, label: "🇨🇭 Suisse" },
                ].map((country) => (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => setSelectedCountry(country.id)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                      selectedCountry === country.id
                        ? "bg-white text-black shadow-md"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10",
                    )}
                  >
                    {country.label}
                  </button>
                ))}
              </div>

              {/* Interactive Revenue Slider */}
              <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-baseline justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider">
                    Votre CA mensuel en livraison / commandes :
                  </label>
                  <span className="text-2xl font-black text-[#d4af37] font-mono">
                    {monthlyDeliveryRevenue.toLocaleString("fr-FR")} {curr} / mois
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="40000"
                  step="1000"
                  value={monthlyDeliveryRevenue}
                  onChange={(e) => setMonthlyDeliveryRevenue(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer h-2 bg-white/20 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                  <span>2 000 € (Petit restau)</span>
                  <span>10 000 € (Moyenne)</span>
                  <span>40 000 €+ (Gros volume)</span>
                </div>
              </div>
            </div>

            {/* Right: The Shocking ROI Numbers */}
            <div className="lg:col-span-5 rounded-3xl border border-red-500/40 bg-black/60 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
              <div className="space-y-1 border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Prélevé par les plateformes (30%) :
                </span>
                <div className="text-3xl font-black text-red-400 font-mono">
                  - {monthlyCommissionLost.toLocaleString("fr-FR")} {curr}{" "}
                  <span className="text-xs text-neutral-400">/ mois</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Soit{" "}
                  <strong className="text-white">
                    - {yearlyCommissionLost.toLocaleString("fr-FR")} {curr}
                  </strong>{" "}
                  perdus chaque année.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300">Votre CRM XR Agency :</span>
                  <span className="font-bold text-white">À partir de 2 000 {curr} (1 seule fois)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300">Commission sur vos ventes :</span>
                  <span className="font-bold text-[#00f2fe]">0% À VIE</span>
                </div>
                <div className="flex justify-between text-xs items-center bg-[#d4af37]/10 p-2.5 rounded-xl border border-[#d4af37]/30">
                  <span className="font-bold text-[#d4af37]">Amorti en seulement :</span>
                  <span className="text-lg font-black text-white font-mono">
                    {paybackDays} JOURS
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#D8B788]/15 border border-[#D8B788]/30 p-4 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C696]">
                  Gain net conservé sur 3 ans :
                </span>
                <p className="text-2xl font-black text-[#F2D7B0] font-mono">
                  + {threeYearsNetSavings.toLocaleString("fr-FR")} {curr}
                </p>
                <p className="text-[11px] text-neutral-300">
                  Directement dans la poche de votre entreprise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2.5 DES CRM SUR-MESURE PAR SECTEUR D'ACTIVITÉ (DÈS 2 000 €)
            ════════════════════════════════════════════════════════════════ */}
        <div className="rounded-[2.5rem] border border-[#d4af37]/30 bg-gradient-to-br from-[#0c0d16] via-[#090a12] to-[#120f0a] p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                <Sparkles className="h-4 w-4" /> SECTEURS D'EXCELLENCE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Un CRM Taillé pour Votre Métier, Zéro Abonnement Prédateur.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed">
              Restaurants, hôtels, cliniques ou immobilier : nos logiciels métier sont 100% propriétaires, sans commission sur votre chiffre d'affaires, dès 2 000 € clé en main.
            </p>
          </div>

          {/* Sector Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "restaurant" as const, label: "🍣 Restauration & Dark Kitchens", gain: "0% commission Uber Eats" },
              { id: "hotel" as const, label: "🏨 Hôtellerie & Conciergerie", gain: "0% commission Booking.com" },
              { id: "clinic" as const, label: "⚕️ Cliniques & Médecine Esthétique", gain: "Zéro abonnement Doctolib" },
              { id: "immo" as const, label: "🏛️ Immobilier & Promoteurs", gain: "Mandats & matching off-market" },
              { id: "retail" as const, label: "🛍️ Retail & Boutiques de Luxe", gain: "Caisse & omnicanal unifié" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSectorCrmTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 border",
                  sectorCrmTab === tab.id
                    ? "bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20 -translate-y-0.5"
                    : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:border-white/20",
                )}
              >
                <span>{tab.label}</span>
                <span className={cn(
                  "font-mono text-[9px] uppercase px-2 py-0.5 rounded-md",
                  sectorCrmTab === tab.id ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-[#d4af37]"
                )}>
                  {tab.gain}
                </span>
              </button>
            ))}
          </div>

          {/* Active Sector Content */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
            {sectorCrmTab === "restaurant" && (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    SECTEUR RESTAURATION · FOOD &amp; POKÉ BARS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Caisse tactile NF525, Commande en ligne directe &amp; KDS cuisine
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Comme pour notre client <strong>Pok-N Ball (pokenball.be)</strong>, vos clients commandent directement sur votre propre application web. Les commandes partent instantanément en cuisine sur l'écran KDS et s'impriment en caisse. Vous économisez 30% sur chaque commande.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Caisse Tactile &amp; Tickets</strong>
                      <span className="text-neutral-400">Encaissement CB, espèces, tickets restaurant, conformité légale.</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Fiches Recettes &amp; Stocks</strong>
                      <span className="text-neutral-400">Décompte automatique des ingrédients au gramme près.</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#161208] to-[#0A0B0E] p-6 text-center space-y-4">
                  <div className="text-4xl">🍣</div>
                  <h4 className="text-lg font-bold text-white">Pack Restauration Clé en Main</h4>
                  <p className="text-xs text-neutral-300">
                    Caisse + Menu interactif + Click &amp; Collect + Module cuisine KDS.
                  </p>
                  <p className="text-2xl font-black text-[#d4af37] font-mono">Dès 2 000 {curr}</p>
                  <a
                    href="#configurateur"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#e6c24d]"
                  >
                    Configurer mon CRM Restauration <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {sectorCrmTab === "hotel" && (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    HÔTELLERIE, RESORTS &amp; CONCIERGERIE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Moteur de Réservation Direct 0% OTA &amp; Conciergerie VIP
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Ne laissez plus Booking.com ou Expedia capter 18% de votre revenu chambre. Vos clients réservent en direct avec paiement sécurisé Stripe, choix des extras, room-service sur QR code en chambre et planning d'entretien des étages en temps réel.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ PMS &amp; Planning Chambres</strong>
                      <span className="text-neutral-400">Check-in autonome, attribution des clés, synchronisation iCal/Channel.</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Fiches Clients VIP</strong>
                      <span className="text-neutral-400">Historique des séjours, préférences alimentaires et conciergerie privée.</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#161208] to-[#0A0B0E] p-6 text-center space-y-4">
                  <div className="text-4xl">🏨</div>
                  <h4 className="text-lg font-bold text-white">Pack Hôtellerie &amp; Réservation</h4>
                  <p className="text-xs text-neutral-300">
                    Moteur direct sans commission + Gestion des chambres &amp; Room-service.
                  </p>
                  <p className="text-2xl font-black text-[#d4af37] font-mono">Dès 2 500 {curr}</p>
                  <a
                    href="#configurateur"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#e6c24d]"
                  >
                    Demander une étude Hôtellerie <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {sectorCrmTab === "clinic" && (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    CLINIQUES PRIVÉES, MÉDECINE ESTHÉTIQUE &amp; BIEN-ÊTRE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Dossier Patient Sécurisé &amp; Rappels Automatisés Zéro Doctolib
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Reprenez la souveraineté sur votre fichier patient. Prise de rendez-vous qualifiée en ligne, rappels automatiques par SMS et WhatsApp pour réduire les rendez-vous manqués à moins de 2%, et dossiers cliniques chiffrés avec historique des actes.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Rappels WhatsApp / SMS</strong>
                      <span className="text-neutral-400">Confirmation automatique, consignes pré-opératoires et suivi post-acte.</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Multi-Praticiens &amp; Cabines</strong>
                      <span className="text-neutral-400">Gestion des plannings de salles, machines laser et praticiens.</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#161208] to-[#0A0B0E] p-6 text-center space-y-4">
                  <div className="text-4xl">⚕️</div>
                  <h4 className="text-lg font-bold text-white">Pack Médical &amp; Esthétique</h4>
                  <p className="text-xs text-neutral-300">
                    Prise de RDV + Dossier patient chiffré + Rappels WhatsApp automatiques.
                  </p>
                  <p className="text-2xl font-black text-[#d4af37] font-mono">Dès 2 000 {curr}</p>
                  <a
                    href="#configurateur"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#e6c24d]"
                  >
                    Consulter nos experts Santé <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {sectorCrmTab === "immo" && (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    IMMOBILIER DE PRESTIGE &amp; PROMOTEURS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Matching Acquéreurs / Mandats Off-Market &amp; Signature Électronique
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Centralisez vos mandats exclusifs, vos programmes neufs et votre portefeuille d'acquéreurs qualifiés. L'algorithme croise instantanément les critères financiers d'un acquéreur avec vos biens off-market pour accélérer les ventes privées.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Portail Investisseurs VIP</strong>
                      <span className="text-neutral-400">Accès sécurisé sous accord de confidentialité pour biens d'exception.</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Pipeline Transactions</strong>
                      <span className="text-neutral-400">Du mandat à l'acte notarié avec documents et relances automatiques.</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#161208] to-[#0A0B0E] p-6 text-center space-y-4">
                  <div className="text-4xl">🏛️</div>
                  <h4 className="text-lg font-bold text-white">Pack Immobilier de Prestige</h4>
                  <p className="text-xs text-neutral-300">
                    Mandats + Matching acquéreurs + Portail privé sécurisé.
                  </p>
                  <p className="text-2xl font-black text-[#d4af37] font-mono">Dès 2 500 {curr}</p>
                  <a
                    href="#configurateur"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#e6c24d]"
                  >
                    Déployer mon CRM Immobilier <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {sectorCrmTab === "retail" && (
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    COMMERCE, BOUTIQUES DE LUXE &amp; RETAIL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Caisse Magasin Unifiée, E-Commerce &amp; Fidélité Omnicanale
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Fini les écarts entre les ventes en boutique et les ventes sur votre site. Votre stock physique et votre catalogue e-commerce se synchronisent en temps réel. Vos clients cumulent leurs privilèges fidélité en ligne comme en boutique physique.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Caisse &amp; Douchette Code-barres</strong>
                      <span className="text-neutral-400">Scan ultra-rapide, gestion des retours, avoirs et cartes cadeaux.</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <strong className="block text-white mb-1">✓ Alertes de Réassort</strong>
                      <span className="text-neutral-400">Commandes fournisseurs suggérées dès franchissement du seuil minimum.</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#161208] to-[#0A0B0E] p-6 text-center space-y-4">
                  <div className="text-4xl">🛍️</div>
                  <h4 className="text-lg font-bold text-white">Pack Retail &amp; Commerce</h4>
                  <p className="text-xs text-neutral-300">
                    Caisse boutique + E-commerce synchronisé + Carte fidélité.
                  </p>
                  <p className="text-2xl font-black text-[#d4af37] font-mono">Dès 2 000 {curr}</p>
                  <a
                    href="#configurateur"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#e6c24d]"
                  >
                    Découvrir l'offre Commerce <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. DÉMO INTERACTIVE 5-EN-1 : TESTEZ LE CRM & LE JUMEAU 3D
            ════════════════════════════════════════════════════════════════ */}
        <div className="rounded-[2.5rem] border border-white/12 bg-[#080911] p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00f2fe] uppercase tracking-wider mb-1">
                <Zap className="h-4 w-4" /> DÉMO INTERACTIVE EN DIRECT
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Testez les modules de notre écosystème
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              Naviguez entre la caisse tactile, l&apos;écran cuisine, le suivi des livreurs, les
              stocks et le jumeau numérique 3D immersif.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              {
                id: "pos" as const,
                label: "1. Caisse Tactile & Ticket (POS)",
                icon: Receipt,
                badge: "Indispensable",
              },
              {
                id: "kds" as const,
                label: "2. Écran Cuisine KDS",
                icon: ChefHat,
                badge: `${kitchenOrders.length} cmds`,
              },
              {
                id: "driver" as const,
                label: "3. Interface Livreurs GPS",
                icon: Bike,
                badge: `${driverOrders.length} tournées`,
              },
              {
                id: "stocks" as const,
                label: "4. Gestion des Stocks en direct",
                icon: Package,
                badge: "Alertes auto",
              },
              {
                id: "gta3d" as const,
                label: "5. Jumeau 3D (Style GTA / Les Sims)",
                icon: Gamepad2,
                badge: "Pack 5 000 €",
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = demoTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDemoTab(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold transition-all border",
                    active
                      ? "bg-[#d4af37] text-[#050608] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]"
                      : "bg-white/5 text-neutral-300 border-white/8 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-extrabold",
                        active ? "bg-black text-[#d4af37]" : "bg-white/10 text-neutral-300",
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* VIEW 1: CAISSE TACTILE (POS) & TICKET RÉEL */}
          {demoTab === "pos" && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Product Grid */}
              <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-black/40 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Store className="h-4 w-4 text-[#d4af37]" /> Écran tactile de caisse · Tapez
                    pour ajouter
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Compatible Tablette iPad / Android / Écran PC
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {POS_MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => addToPosCart(item)}
                      className="flex flex-col justify-between rounded-2xl border border-white/8 bg-white/5 p-4 text-left transition hover:border-[#d4af37] hover:bg-white/10 active:scale-95 group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-neutral-400">Stock restant : {item.stock}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
                        <span className="text-xs font-black text-[#d4af37] font-mono">
                          {item.price.toFixed(2)} €
                        </span>
                        <span className="rounded-full bg-[#d4af37] p-1 text-black opacity-0 group-hover:opacity-100 transition">
                          <Check className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Cart & Receipt Ticket */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-[#0d0f18] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-white">Commande en cours</span>
                    <button
                      type="button"
                      onClick={() => setPosCart([])}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Vider
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 text-xs">
                    {posCart.length === 0 ? (
                      <p className="text-neutral-500 italic py-4 text-center">
                        Panier vide. Cliquez sur un article.
                      </p>
                    ) : (
                      posCart.map((i) => (
                        <div
                          key={i.id}
                          className="flex justify-between items-center py-1 border-b border-white/5"
                        >
                          <span className="text-neutral-200">
                            <strong>{i.qty}x</strong> {i.name}
                          </span>
                          <span className="font-mono font-bold text-white">
                            {(i.price * i.qty).toFixed(2)} €
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-3 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>Dont TVA (10%) :</span>
                      <span>{cartTva.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-white pt-1">
                      <span>TOTAL TTC :</span>
                      <span className="text-[#d4af37] text-base">{cartTotal.toFixed(2)} €</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrintTicket}
                    disabled={posCart.length === 0}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e6ca65] p-3 text-xs font-black text-black shadow-lg hover:opacity-90 active:scale-95 transition disabled:opacity-40"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Encaisser &amp; Générer Ticket Réel</span>
                  </button>
                </div>

                {/* Rendered Physical Thermal Ticket */}
                {lastTicket && (
                  <div className="rounded-2xl border border-dashed border-neutral-600 bg-[#faf8f4] text-neutral-900 p-4 font-mono text-[11px] shadow-2xl animate-in slide-in-from-top-2">
                    <div className="text-center border-b border-dashed border-neutral-400 pb-2 mb-2">
                      <p className="font-black text-xs uppercase tracking-widest">
                        XR AGENCY BISTROT
                      </p>
                      <p className="text-[9px] text-neutral-600">
                        75001 Paris · N° TVA : FR123456789
                      </p>
                      <p className="text-[10px] mt-1 font-bold">
                        TICKET DE CAISSE CERTIFIÉ {lastTicket.number}
                      </p>
                      <p className="text-[9px] text-neutral-500">
                        Date : {lastTicket.date} · Caisse #01
                      </p>
                    </div>

                    <div className="space-y-1 border-b border-dashed border-neutral-400 pb-2">
                      {lastTicket.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.qty}x {it.name}
                          </span>
                          <span>{(it.price * it.qty).toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 space-y-0.5 text-right font-bold text-xs">
                      <div className="flex justify-between text-[10px] text-neutral-600">
                        <span>TVA 10.0% :</span>
                        <span>{lastTicket.tva.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-sm font-black pt-1">
                        <span>TOTAL PAYÉ :</span>
                        <span>{lastTicket.total.toFixed(2)} €</span>
                      </div>
                    </div>

                    <div className="text-center pt-3 border-t border-dashed border-neutral-400 mt-2 text-[9px] text-neutral-500">
                      <p>★★ Merci de votre visite ! ★★</p>
                      <p className="mt-1">[ e-Ticket &amp; Fidélité via QR Code ]</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: KITCHEN DISPLAY SYSTEM (KDS) */}
          {demoTab === "kds" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-[#00f2fe]" /> Écran Cuisine Tactile (KDS) ·
                  Synchronisation temps réel
                </span>
                <span className="text-[10px] text-[#E5C696] font-mono flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#E5C696] animate-ping" /> Serveur
                  WebSockets Connecté
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {kitchenOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className={cn(
                      "rounded-3xl border p-5 space-y-4 transition shadow-lg",
                      ord.status === "ready"
                        ? "border-[#D8B788]/50 bg-[#1A1815]/80"
                        : "border-[#00f2fe]/40 bg-black/50",
                    )}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div>
                        <span className="text-xs font-black text-white">{ord.id}</span>
                        <span className="block text-[10px] text-[#d4af37]">{ord.type}</span>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-mono font-bold text-neutral-300">
                        ⏱ {ord.elapsed}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-white leading-relaxed">{ord.items}</p>

                    <div className="pt-2 flex gap-2">
                      {ord.status === "cooking" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setKitchenOrders((prev) =>
                              prev.map((o) => (o.id === ord.id ? { ...o, status: "ready" } : o)),
                            );
                          }}
                          className="w-full rounded-xl bg-[#00f2fe] p-2 text-xs font-bold text-black hover:opacity-90 transition"
                        >
                          Marquer Prêt
                        </button>
                      ) : (
                        <div className="w-full rounded-xl bg-[#D8B788]/20 border border-[#D8B788]/40 p-2 text-center text-xs font-bold text-[#E5C696]">
                          ✓ Prêt au comptoir
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: INTERFACE LIVREUR & TOURNEES GPS */}
          {demoTab === "driver" && (
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-black/40 p-5 space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Bike className="h-4 w-4 text-[#d4af37]" /> Application Mobile pour vos livreurs
                </span>

                <div className="space-y-3">
                  {driverOrders.map((d) => (
                    <div
                      key={d.id}
                      className="rounded-2xl border border-white/8 bg-[#0c0d16] p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">
                          {d.id} · {d.client}
                        </span>
                        <span className="rounded-full bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 text-[10px] font-mono font-bold">
                          Trajet ~ {d.time}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-red-400" /> {d.address}
                      </p>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => alert(`Lancement GPS vers ${d.address}`)}
                          className="flex-1 rounded-xl bg-white/10 p-2 text-xs font-bold text-white hover:bg-white/20 transition"
                        >
                          Ouvrir GPS (Waze/Maps)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDriverOrders((prev) => prev.filter((o) => o.id !== d.id));
                          }}
                          className="flex-1 rounded-xl bg-[#E5C696] p-2 text-xs font-bold text-black hover:opacity-90 transition"
                        >
                          Valider Livraison ✓
                        </button>
                      </div>
                    </div>
                  ))}
                  {driverOrders.length === 0 && (
                    <p className="text-xs text-neutral-500 italic py-6 text-center">
                      Toutes les livraisons sont terminées !
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#090b14] p-5 space-y-3 text-xs">
                <span className="font-bold text-white uppercase tracking-wider block">
                  Pourquoi vos propres livreurs ?
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  Au lieu de payer 30% à Uber Eats et de subir des retards de livreurs externes,
                  vous gérez vos propres coursiers ou vous basculez automatiquement sur un coursier
                  partenaire uniquement en cas de rush.
                </p>
                <div className="rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-3.5 text-neutral-200 space-y-1">
                  <strong className="text-white block">
                    Suivi en direct pour le client final :
                  </strong>
                  <p className="text-[11px] text-neutral-300">
                    Le client reçoit un lien SMS avec la carte de tracking en temps réel comme sur
                    Uber, sous votre propre marque.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: GESTION DES STOCKS EN DIRECT & RECETTES */}
          {demoTab === "stocks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#d4af37]" /> Décrémentation automatique &amp;
                  Fiches Recettes
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Chaque plat vendu décompte les ingrédients au gramme
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stocksList.map((st, idx) => {
                  const pct = Math.round((st.current / st.max) * 100);
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-2xl border p-4 space-y-3",
                        st.alert ? "border-red-500/40 bg-red-950/20" : "border-white/8 bg-black/40",
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-white">{st.name}</span>
                        {st.alert && (
                          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[8px] font-black uppercase text-white animate-pulse">
                            RÉASSORT REQUIS
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-400">Stock actuel :</span>
                          <span
                            className={cn(
                              "font-bold",
                              st.alert ? "text-red-400" : "text-[#d4af37]",
                            )}
                          >
                            {st.current} / {st.max} {st.unit}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              st.alert ? "bg-red-500" : "bg-[#d4af37]",
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[10px] text-neutral-400">
                        {st.alert
                          ? "⚠️ Seuil critique atteint : commande fournisseur suggérée."
                          : "Niveau optimal."}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 5: LE JUMEAU NUMÉRIQUE 3D IMMERSIF (OPTION 5 000 € - GTA / LES SIMS) */}
          {demoTab === "gta3d" && (
            <div className="rounded-3xl border border-[#c5a880]/25 bg-gradient-to-br from-[#171613] via-[#101114] to-[#090a0b] p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-purple-300">
                    <Gamepad2 className="h-3.5 w-3.5" /> Jumeau Numérique 3D Temps Réel · Style GTA
                    6 / Les Sims
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Pilotez votre établissement comme dans un jeu vidéo
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGtaFloor("restaurant")}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                      gtaFloor === "restaurant"
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10",
                    )}
                  >
                    Vue Restaurant 3D (Sims)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGtaFloor("city")}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                      gtaFloor === "city"
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10",
                    )}
                  >
                    Radar Flotte Ville (GTA Mini-map)
                  </button>
                </div>
              </div>

              {/* Simulated 3D Isometric View */}
              {gtaFloor === "restaurant" ? (
                <div className="relative rounded-2xl border border-purple-500/30 bg-[#05060b] p-6 h-80 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Subtle 3D grid perspective background */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                  {/* HUD Top bar */}
                  <div className="relative z-10 flex justify-between items-center text-xs font-mono">
                    <span className="text-purple-300 font-bold flex items-center gap-2">
                      <Eye className="h-4 w-4" /> VUE ISOMÉTRIQUE SALLE &amp; CUISINE (120 FPS)
                    </span>
                    <span className="text-[#E5C696] font-bold">
                      12 TABLES OCCUPÉES · CA JOUR : 2 480 €
                    </span>
                  </div>

                  {/* Interactive Virtual Tables */}
                  <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto">
                    {[
                      {
                        id: "T1",
                        status: "Occupée",
                        total: "64.50 €",
                        items: "3 pers",
                        color: "bg-[#E5C696]",
                      },
                      {
                        id: "T2",
                        status: "En attente addition",
                        total: "112.00 €",
                        items: "4 pers",
                        color: "bg-[#d4af37]",
                      },
                      {
                        id: "T3",
                        status: "Libre",
                        total: "0.00 €",
                        items: "Prête",
                        color: "bg-neutral-600",
                      },
                      {
                        id: "T4",
                        status: "Commande en cuisine",
                        total: "48.90 €",
                        items: "2 pers",
                        color: "bg-[#00f2fe]",
                      },
                    ].map((table) => (
                      <div
                        key={table.id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center space-y-1.5 backdrop-blur-md hover:scale-105 transition cursor-pointer group"
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                          <span>Table {table.id}</span>
                          <span className={cn("h-2 w-2 rounded-full", table.color)} />
                        </div>
                        <p className="text-base font-black text-white group-hover:text-purple-300 transition">
                          {table.total}
                        </p>
                        <p className="text-[10px] text-neutral-300">{table.status}</p>
                      </div>
                    ))}
                  </div>

                  {/* HUD Bottom status */}
                  <div className="relative z-10 flex justify-between text-[11px] text-neutral-400 border-t border-white/10 pt-3">
                    <span>Avatars Staff : 2 Serveurs en salle · 2 Cuisiniers actifs</span>
                    <span className="text-purple-300 font-bold">
                      Inclus dans la formule Enterprise 5 000 €
                    </span>
                  </div>
                </div>
              ) : (
                /* GTA Mini-Map City View */
                <div className="relative rounded-2xl border border-purple-500/30 bg-[#07090e] p-6 h-80 flex flex-col justify-between overflow-hidden shadow-2xl">
                  <div className="relative z-10 flex justify-between text-xs font-mono">
                    <span className="text-[#00f2fe] font-bold flex items-center gap-2">
                      <Compass className="h-4 w-4" /> GTA MINI-MAP RADAR · SUIVI FLOTTE VILLE EN
                      DIRECT
                    </span>
                    <span className="text-white font-bold">3 COURSIERS EN MISSION</span>
                  </div>

                  <div className="relative z-10 my-auto flex flex-wrap justify-around items-center gap-4">
                    <div className="rounded-2xl border border-[#00f2fe]/40 bg-[#00f2fe]/10 p-4 text-center">
                      <span className="text-2xl">🛵</span>
                      <p className="text-xs font-black text-white mt-1">Livreur #1 (Karim)</p>
                      <p className="text-[10px] text-[#00f2fe]">Arrivée client dans 4 min</p>
                    </div>
                    <div className="rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/10 p-4 text-center">
                      <span className="text-2xl">⚡</span>
                      <p className="text-xs font-black text-white mt-1">Livreur #2 (Lucas)</p>
                      <p className="text-[10px] text-[#d4af37]">Retour restaurant</p>
                    </div>
                    <div className="rounded-2xl border border-purple-400/40 bg-purple-500/10 p-4 text-center">
                      <span className="text-2xl">📍</span>
                      <p className="text-xs font-black text-white mt-1">Hub Central</p>
                      <p className="text-[10px] text-purple-300">2 commandes en préparation</p>
                    </div>
                  </div>

                  <div className="relative z-10 text-center text-xs text-neutral-400 border-t border-white/10 pt-3">
                    Modélisation 3D WebGL fluide, compatible écrans de contrôle mural ou iPad du
                    manager.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            4. LE COMPARATIF LIMPIDE : CRM 2 000 € vs CRM 5 000 €
            ════════════════════════════════════════════════════════════════ */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#9E7F5A]">
              TRANSPARENCE TARIFAIRE TOTALE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#12110E]">
              Quelle formule correspond à votre entreprise ?
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554B]">
              Du restaurant indépendant qui veut rentabiliser son outil en 3 semaines, au groupe qui
              veut une immersion 3D digne d&apos;un jeu vidéo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* TIER 1: PACK PRO STANDARD 2 000 € */}
            <div className="rounded-[2.5rem] border border-white/15 bg-[#090a12] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <span className="rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase">
                    OFFRE PRO BUSINESS
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Caisse POS &amp; CRM Omnicanal
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Pour les restaurants indépendants, dark kitchens, commerces et boutiques qui
                    veulent supprimer les 30% d&apos;Uber Eats et digitaliser leurs opérations.
                  </p>
                  <div className="pt-4 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                      2 000 €
                    </span>
                    <span className="text-xs text-neutral-400">
                      paiement unique · 0% de commission
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="font-bold text-[#d4af37] uppercase tracking-wider text-[10px]">
                    Inclus dans la formule 2 000 € :
                  </p>
                  {[
                    "Caisse tactile POS web/tablette (conforme et normée)",
                    "Génération et impression de vrais tickets de caisse (papier + e-ticket)",
                    "Gestion complète des stocks & décrémentation automatique des ingrédients",
                    "Site internet e-commerce / commande en ligne directe (0% prélevé)",
                    "Écran cuisine KDS en temps réel avec chronomètres",
                    "Interface mobile chauffeurs / livreurs avec guidage GPS",
                    "Gestion des employés (pointage, clôture de caisse Z)",
                    "Amorti en moins de 30 jours grâce aux économies de commissions",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-neutral-200">
                      <Check className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#audit-crm"
                  onClick={() => setBudgetTier("2000")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white p-4 text-xs font-black text-black hover:bg-[#d4af37] transition shadow-lg active:scale-95"
                >
                  <span>Commander l&apos;Offre Pro 2 000 €</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* TIER 2: PACK ENTERPRISE 3D IMMERSIF 5 000 € */}
            <div className="rounded-[2.5rem] border-2 border-[#A67C40] bg-gradient-to-b from-[#171613] via-[#101114] to-[#090a0b] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 rounded-bl-3xl bg-gradient-to-l from-amber-600 via-[#A67C40] to-yellow-500 px-4 py-1.5 text-[9px] font-black uppercase text-black tracking-widest shadow-lg">
                JUMEAU NUMÉRIQUE 3D MULTI-SITES
              </div>

              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <span className="rounded-full bg-[#A67C40]/20 border border-[#A67C40]/40 px-3 py-1 font-mono text-[9px] font-bold text-[#E5C696] uppercase">
                    HAUTE INGÉNIERIE &amp; SUPERVISION 3D
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Jumeau Numérique 3D &amp; Multi-Sites
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Pour les groupes hôteliers, chaînes de restauration, cliniques de prestige et réseaux multi-boutiques qui souhaitent piloter l&apos;ensemble de leurs établissements en temps réel dans un univers 3D interactif et ultra-productif.
                  </p>
                  <div className="pt-4 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#E5C696] font-mono">
                      5 000 €
                    </span>
                    <span className="text-xs text-neutral-400">
                      à partir de · livrable sur-mesure clé en main
                    </span>
                  </div>
                </div>

                {/* Visual Preview Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-lg">
                  <img
                    src="/showcase/crm_digital_twin_3d.jpg"
                    alt="Jumeau Numérique 3D Multi-Sites CRM"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                    <span className="rounded bg-black/70 px-2 py-0.5 border border-white/20">3D ISOMÉTRIQUE TEMPS RÉEL</span>
                    <span className="text-[#E5C696] font-bold">MULTI-ÉTABLISSEMENTS</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="font-bold text-[#E5C696] uppercase tracking-wider text-[10px]">
                    Tout le Pack Pro 2 000 € PLUS :
                  </p>
                  {[
                    "Modélisation architecturale 3D isométrique temps réel de vos bâtiments et espaces",
                    "Visualisation 3D interactive des tables, suites ou blocs opératoires avec statuts en direct",
                    "Radar GPS multi-zones pour le suivi en direct de vos flottes de livraison ou équipes terrain",
                    "Supervision multi-sites centralisée : pilotez de 2 à 50 établissements sur un seul écran",
                    "Intégration d'écrans tactiles kiosque clients & synchronisation instantanée des stocks",
                    "Algorithmes d'Intelligence Artificielle prédictive des flux et optimisation des marges",
                    "Interface haut de gamme ultra valorisante pour vos investisseurs et partenaires",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-neutral-200">
                      <Sparkles className="h-4 w-4 text-[#A67C40] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#audit-crm"
                  onClick={() => setBudgetTier("5000")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E5C696] via-[#D5B07A] to-[#C3995F] p-4 text-xs font-black text-[#14110E] hover:opacity-95 transition shadow-lg active:scale-95"
                >
                  <span>Configurer mon Jumeau 3D (5 000 €)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            5. FORMULAIRE D'AUDIT D'ÉCONOMIES & ONBOARDING EN AMONT
            ════════════════════════════════════════════════════════════════ */}
        <div
          id="audit-crm"
          className="rounded-[2.5rem] border border-white/12 bg-[#090a14] p-8 sm:p-12 shadow-2xl space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#00f2fe]">
              AUDIT DE RENTABILITÉ GRATUIT &amp; DÉMO PRIVÉE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Préparez le déploiement de votre système
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Remplissez ces quelques informations pour recevoir votre projection d&apos;économies
              personnalisée et planifier votre démonstration en direct.
            </p>
          </div>

          {sentOk ? (
            <div className="rounded-3xl border border-[#D8B788]/40 bg-[#171613] p-8 text-center space-y-4 max-w-lg mx-auto">
              <CheckCircle2 className="h-12 w-12 text-[#E5C696] mx-auto" />
              <h3 className="text-xl font-bold text-white">Votre demande a bien été transmise !</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Notre équipe prépare votre simulation d&apos;économies anti-commission et vous
                contactera sous 24h pour organiser votre démo en direct.
              </p>
              <div className="pt-2">
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                    `Bonjour XR Agency, je viens d'envoyer une demande pour l'offre Caisse & CRM (${budgetTier === "2000" ? "2 000 €" : "5 000 € 3D"}). Je souhaite une démo rapide !`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E5C696] px-6 py-3 text-xs font-bold text-black hover:bg-[#F2D7B0] transition"
                >
                  <span>Accélérer sur WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={submitProposal} className="max-w-3xl mx-auto space-y-6">
              {/* Type d'établissement */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  1. Votre type d&apos;activité :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "Restaurant & Food",
                    "Dark Kitchen / Livraison",
                    "Boutique & Retail",
                    "Groupe / Franchise",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBizType(type)}
                      className={cn(
                        "rounded-xl border p-3 text-xs font-bold text-center transition",
                        bizType === type
                          ? "border-[#d4af37] bg-[#d4af37] text-black"
                          : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canaux actuels */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  2. Vos canaux de vente actuels :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    "Uber Eats / Deliveroo (30% de commission)",
                    "Vente sur place / Caisse",
                    "Click & Collect web",
                  ].map((chan) => {
                    const active = currentChannels.includes(chan);
                    return (
                      <button
                        key={chan}
                        type="button"
                        onClick={() => toggleChannel(chan)}
                        className={cn(
                          "rounded-xl border p-3 text-xs font-bold text-left transition flex items-center justify-between",
                          active
                            ? "border-red-500/60 bg-red-950/30 text-white"
                            : "border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10",
                        )}
                      >
                        <span>{chan}</span>
                        {active && <Check className="h-3.5 w-3.5 text-red-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Choix Formule */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  3. Formule envisagée :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBudgetTier("2000")}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition space-y-1",
                      budgetTier === "2000"
                        ? "border-[#d4af37] bg-[#d4af37]/15 text-white shadow-lg"
                        : "border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10",
                    )}
                  >
                    <p className="text-xs font-black text-[#d4af37]">PACK PRO BUSINESS · 2 000 €</p>
                    <p className="text-[11px] text-neutral-300">
                      Caisse tactile, tickets réels, stocks, site web commande directe, écran
                      cuisine et livreurs.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBudgetTier("5000")}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition space-y-1",
                      budgetTier === "5000"
                        ? "border-purple-500 bg-purple-500/15 text-white shadow-lg"
                        : "border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10",
                    )}
                  >
                    <p className="text-xs font-black text-purple-400">
                      PACK DIGITAL TWIN 3D · 5 000 €
                    </p>
                    <p className="text-[11px] text-neutral-300">
                      Tout le pack Pro + modélisation 3D temps réel GTA/Sims, multi-sites et IA
                      prédictive.
                    </p>
                  </button>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    Votre Nom &amp; Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    placeholder="Ex: Antoine Dupont"
                    className="w-full rounded-xl border border-white/15 bg-black/50 p-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#d4af37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    Votre Adresse E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="Ex: antoine@monrestaurant.fr"
                    className="w-full rounded-xl border border-white/15 bg-black/50 p-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#d4af37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    Numéro de Téléphone (Mobile)
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="Ex: +33 6 12 34 56 78"
                    className="w-full rounded-xl border border-white/15 bg-black/50 p-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#d4af37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 block mb-1">
                    Nom de l&apos;Établissement / Enseigne
                  </label>
                  <input
                    type="text"
                    value={contact.company}
                    onChange={(e) => setContact({ ...contact, company: e.target.value })}
                    placeholder="Ex: Poké Bowl Fresh Paris"
                    className="w-full rounded-xl border border-white/15 bg-black/50 p-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>

              {errorMsg && <p className="text-xs font-bold text-red-400 text-center">{errorMsg}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e5ca65] p-4 text-xs font-black text-black shadow-xl hover:opacity-95 transition disabled:opacity-50 active:scale-95"
              >
                {sending ? (
                  <span>Transmission en cours...</span>
                ) : (
                  <>
                    <span>Recevoir mon Audit d&apos;Économies &amp; Planifier ma Démo</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
