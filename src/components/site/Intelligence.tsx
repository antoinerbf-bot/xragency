import { useMemo, useState, useEffect, useRef } from "react";
import {
  Building2,
  Check,
  Gem,
  Hammer,
  HeartPulse,
  Hotel,
  Rocket,
  Scale,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Compass,
  Search,
  MapPinned,
  Megaphone,
  BadgeCheck,
  Bot,
  CreditCard,
  CircleSlash,
  History,
  TrendingDown,
  TrendingUp,
  Wallet,
  Coins,
  Banknote,
  Landmark,
  ArrowRight,
  Copy,
  CheckCheck,
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  Zap,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type L } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT, SERVICES } from "@/lib/content";
import { EmberButton, Reveal } from "./primitives";
import { Globe } from "./Globe";

type Opt = { id: string; label: L; icon?: typeof Check };

const SECTORS: Opt[] = [
  {
    id: "resto",
    icon: UtensilsCrossed,
    label: {
      fr: "Restaurant / Bar / Café",
      en: "Restaurant / Bar / Café",
      vi: "Nhà hàng / Quán cà phê",
    },
  },
  {
    id: "hotel",
    icon: Hotel,
    label: {
      fr: "Hôtel / Résidence / Spa",
      en: "Hotel / Resort / Spa",
      vi: "Khách sạn / Resort / Spa",
    },
  },
  {
    id: "sante",
    icon: HeartPulse,
    label: {
      fr: "Santé / Cabinet médical",
      en: "Health / Medical clinic",
      vi: "Y tế / Phòng khám",
    },
  },
  {
    id: "juridique",
    icon: Scale,
    label: {
      fr: "Avocat / Notaire / Conseil",
      en: "Lawyer / Consultant / Finance",
      vi: "Luật sư / Tư vấn / Tài chính",
    },
  },
  {
    id: "immo",
    icon: Building2,
    label: {
      fr: "Immobilier & Promoteur",
      en: "Real estate & Architecture",
      vi: "Bất động sản & Kiến trúc",
    },
  },
  {
    id: "retail",
    icon: ShoppingBag,
    label: {
      fr: "Boutique / E-commerce de luxe",
      en: "Boutique / Luxury E-commerce",
      vi: "Bán lẻ / Thương mại điện tử",
    },
  },
  {
    id: "artisan",
    icon: Hammer,
    label: { fr: "Artisan d'art / BTP", en: "Craftsman / Construction", vi: "Thủ công / Xây dựng" },
  },
  {
    id: "beaute",
    icon: Gem,
    label: {
      fr: "Beauté / Esthétique / Luxe",
      en: "Beauty / Luxury & Lifestyle",
      vi: "Làm đẹp / Sang trọng",
    },
  },
  {
    id: "tech",
    icon: Rocket,
    label: { fr: "Startup / SaaS / Tech", en: "Startup / SaaS / Tech", vi: "Startup / Công nghệ" },
  },
  {
    id: "autre",
    icon: Compass,
    label: { fr: "Autre secteur d'activité", en: "Other business sector", vi: "Lĩnh vực khác" },
  },
];

const SITUATIONS: Opt[] = [
  {
    id: "creation",
    icon: Sparkles,
    label: {
      fr: "Lancement complet (aucun site ni identité existante)",
      en: "Brand new launch (no website or existing branding)",
      vi: "Dự án mới (chưa có website hay nhận diện)",
    },
  },
  {
    id: "refonte",
    icon: History,
    label: {
      fr: "Site ou identité vieillissante à moderniser",
      en: "Outdated website or identity to modernize",
      vi: "Website hoặc thương hiệu cũ cần làm mới",
    },
  },
  {
    id: "visibilite",
    icon: TrendingDown,
    label: {
      fr: "Site en ligne mais manque critique de visibilité / clients",
      en: "Online website but lack of traffic and leads",
      vi: "Có website nhưng ít khách hàng và lượt truy cập",
    },
  },
  {
    id: "scale",
    icon: TrendingUp,
    label: {
      fr: "Activité établie souhaitant automatiser et dominer son marché",
      en: "Established business scaling with AI and dominance",
      vi: "Doanh nghiệp phát triển muốn mở rộng và tự động hóa",
    },
  },
];

const OBJECTIVES: Opt[] = [
  {
    id: "local",
    icon: MapPinned,
    label: {
      fr: "Dominer Google Maps & attirer une clientèle locale",
      en: "Dominate Google Maps & attract local clientele",
      vi: "Thống trị Google Maps & thu hút khách địa phương",
    },
  },
  {
    id: "prestige",
    icon: Gem,
    label: {
      fr: "Créer un site vitrine d'exception & asseoir mon autorité",
      en: "Create a prestigious website & establish authority",
      vi: "Xây dựng website đẳng cấp & khẳng định uy tín",
    },
  },
  {
    id: "conversion",
    icon: Search,
    label: {
      fr: "Propulser mon référencement SEO & convertir mes visiteurs",
      en: "Skyrocket organic SEO & convert high-intent visitors",
      vi: "Bứt phá SEO Google & chuyển đổi khách tiềm năng",
    },
  },
  {
    id: "ai_auto",
    icon: Bot,
    label: {
      fr: "Automatiser mon service client 24/7 avec un assistant IA",
      en: "Automate 24/7 customer service with an AI assistant",
      vi: "Tự động hóa chăm sóc khách hàng 24/7 với trợ lý AI",
    },
  },
];

const BUDGETS: Opt[] = [
  {
    id: "starter",
    icon: Wallet,
    label: {
      fr: "Démarrage pragmatique (< 1 000 €)",
      en: "Essential kickoff (< $1,000)",
      vi: "Khởi đầu thiết yếu (< 25.000.000 ₫)",
    },
  },
  {
    id: "growth",
    icon: Coins,
    label: {
      fr: "Croissance & Visibilité Pro (1 000 € — 2 500 €)",
      en: "Growth & Pro Visibility ($1,000 — $2,500)",
      vi: "Tăng trưởng & Chuyên nghiệp (25M — 60M ₫)",
    },
  },
  {
    id: "scale",
    icon: Banknote,
    label: {
      fr: "Écosystème Digital Complet (2 500 € — 5 000 €+)",
      en: "Complete Digital Ecosystem ($2,500 — $5,000+)",
      vi: "Hệ sinh thái toàn diện (60M — 120M ₫+)",
    },
  },
  {
    id: "retainer",
    icon: Landmark,
    label: {
      fr: "Accompagnement mensuel récurrent sur mesure",
      en: "Tailored monthly growth retainer",
      vi: "Đồng hành hàng tháng theo yêu cầu",
    },
  },
];

interface RecommendationItem {
  id: string;
  title: L;
  plan: L;
  eur: number;
  period: "once" | "month" | "year";
  why: L;
}

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: Opt[];
  recommendation?: {
    diagnosis: string;
    items: RecommendationItem[];
    setup: number;
    monthly: number;
    yearly: number;
  };
}

export function Intelligence() {
  const { t, price, lang } = useLang();
  const [mode, setMode] = useState<"chat" | "quiz">("chat");

  // Conversational Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    sector?: string;
    situation?: string;
    objective?: string;
    budget?: string;
  }>({});
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize first AI message
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: Record<string, string> = {
        fr: "Bonjour et bienvenue chez XR Agency. Je suis Alexandre, conseiller stratégique digital. Afin de concevoir l'accompagnement le plus rentable pour votre entreprise, quel est votre secteur d'activité ?",
        en: "Hello and welcome to XR Agency. I'm Alexandre, Senior Digital Strategist. To design the most profitable growth roadmap for your business, what is your industry sector?",
        vi: "Xin chào và chào mừng bạn đến với XR Agency. Tôi là Alexandre, chuyên gia tư vấn chiến lược kỹ thuật số. Để thiết kế lộ trình phát triển tối ưu nhất cho doanh nghiệp của bạn, lĩnh vực kinh doanh của bạn là gì?",
      };

      setMessages([
        {
          id: "welcome",
          sender: "ai",
          text: initialGreeting[lang] || initialGreeting.fr,
          options: SECTORS,
        },
      ]);
    }
  }, [lang, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Strategic rule engine for recommendations
  const generateRecommendations = (
    sectorId?: string,
    situationId?: string,
    objectiveId?: string,
    budgetId?: string,
  ): RecommendationItem[] => {
    const recs: RecommendationItem[] = [];

    // Core website recommendation
    if (situationId === "creation" || objectiveId === "prestige" || budgetId === "scale") {
      recs.push({
        id: "websites",
        title: { fr: "Création de site web", en: "Website Creation", vi: "Thiết kế Website" },
        plan: {
          fr:
            budgetId === "scale" ? "Formule E-commerce / Sur-mesure" : "Formule Business Prestige",
          en: budgetId === "scale" ? "E-commerce / Custom Plan" : "Business Prestige Plan",
          vi: budgetId === "scale" ? "Gói E-commerce / Cao cấp" : "Gói Doanh nghiệp Prestige",
        },
        eur: budgetId === "scale" ? 1099 : 799,
        period: "once",
        why: {
          fr: "Votre site constitue le socle de conversion incontournable pour valoriser votre autorité et convertir vos visiteurs en clients payants.",
          en: "Your website is the core conversion foundation required to build authority and turn visitors into high-paying clients.",
          vi: "Website là nền tảng chuyển đổi cốt lõi giúp nâng cao uy tín và chuyển đổi khách truy cập thành khách hàng.",
        },
      });
    }

    // Google Maps & Local Dominance
    if (
      objectiveId === "local" ||
      sectorId === "resto" ||
      sectorId === "hotel" ||
      sectorId === "sante" ||
      sectorId === "artisan"
    ) {
      recs.push({
        id: "maps",
        title: { fr: "Google Maps TOP 3", en: "Google Maps TOP 3", vi: "Google Maps TOP 3" },
        plan: {
          fr: "Pack Annuel Garanti TOP 3",
          en: "Guaranteed Annual TOP 3 Pack",
          vi: "Gói TOP 3 Đảm bảo Hàng năm",
        },
        eur: 999,
        period: "year",
        why: {
          fr: "Pour votre activité locale, 78% des recherches se font sur Google Maps. Le TOP 3 garanti génère un flux continu d'appels et de visites directes.",
          en: "For your local business, 78% of searches occur on Google Maps. A guaranteed TOP 3 position drives a steady stream of direct calls and visits.",
          vi: "Đối với mô hình kinh doanh của bạn, 78% lượt tìm kiếm diễn ra trên Google Maps. TOP 3 giúp mang lại lượng khách hàng gọi điện và ghé thăm đều đặn.",
        },
      });
    }

    // SEO Domination
    if (objectiveId === "conversion" || situationId === "visibilite") {
      recs.push({
        id: "seo",
        title: {
          fr: "Système de Domination SEO",
          en: "SEO Domination System",
          vi: "Chiến dịch SEO Chuyên sâu",
        },
        plan: {
          fr: budgetId === "starter" ? "Pack SEO Local" : "Pack SEO Domination Boost",
          en: budgetId === "starter" ? "Local SEO Pack" : "SEO Domination Boost Pack",
          vi: budgetId === "starter" ? "Gói SEO Địa phương" : "Gói Bứt phá SEO Domination",
        },
        eur: budgetId === "starter" ? 199 : 349,
        period: "month",
        why: {
          fr: "Un positionnement organique durable en première page Google sur vos mots-clés les plus rentables sans dépendre du coût publicitaire.",
          en: "Sustainable page 1 Google rankings for high-intent keywords, freeing you from perpetual advertising costs.",
          vi: "Vị trí top đầu Google bền vững cho các từ khóa mang lại doanh thu cao mà không phụ thuộc vào quảng cáo.",
        },
      });
    }

    // 24/7 AI Assistant
    if (objectiveId === "ai_auto" || budgetId === "scale" || situationId === "scale") {
      recs.push({
        id: "ai",
        title: { fr: "Assistants IA 24/7", en: "24/7 AI Assistants", vi: "Trợ lý AI Tự động 24/7" },
        plan: {
          fr: "Pack Assistant IA Chatbot & Qualification",
          en: "AI Assistant & Lead Qualification Pack",
          vi: "Gói Trợ lý AI Tư vấn & Thu thập Lead",
        },
        eur: 499,
        period: "month",
        why: {
          fr: "Répond instantanément à chaque prospect jour et nuit, qualifie les besoins et pré-remplit les devis sans intervention humaine.",
          en: "Instantly engages every lead 24/7, qualifies their requirements, and prepares custom quotes without human delay.",
          vi: "Phản hồi ngay lập tức mọi khách hàng 24/7, phân loại nhu cầu và tạo báo giá tự động.",
        },
      });
    }

    // Default fallback if minimal options
    if (recs.length === 0) {
      recs.push({
        id: "websites",
        title: { fr: "Création de site web", en: "Website Creation", vi: "Thiết kế Website" },
        plan: { fr: "Pack Vitrine Pro", en: "Pro Showcase Pack", vi: "Gói Giới thiệu Pro" },
        eur: 499,
        period: "once",
        why: {
          fr: "Une présence web moderne, ultra-rapide et responsive pour valider votre professionnalisme auprès de vos futurs clients.",
          en: "A modern, high-speed, and responsive web presence to establish authority with prospective clients.",
          vi: "Website hiện đại, tốc độ cao và tối ưu di động để khẳng định sự chuyên nghiệp.",
        },
      });
    }

    return recs;
  };

  const handleSelectOption = (stepIndex: number, opt: Opt) => {
    const updatedAnswers = { ...answers };

    if (stepIndex === 0) updatedAnswers.sector = opt.id;
    if (stepIndex === 1) updatedAnswers.situation = opt.id;
    if (stepIndex === 2) updatedAnswers.objective = opt.id;
    if (stepIndex === 3) updatedAnswers.budget = opt.id;

    setAnswers(updatedAnswers);

    // User reply message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: t(opt.label),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const nextStep = stepIndex + 1;
      setCurrentStep(nextStep);

      if (nextStep === 1) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text:
              lang === "vi"
                ? `Rất tốt. Để định hình chiến lược chính xác nhất, tình trạng hiện tại của doanh nghiệp bạn là gì?`
                : lang === "en"
                  ? `Excellent. To identify your growth bottlenecks, what is your current business situation?`
                  : `Très bien noté. Pour cibler le levier le plus efficace, quelle est la situation actuelle de votre activité ?`,
            options: SITUATIONS,
          },
        ]);
      } else if (nextStep === 2) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text:
              lang === "vi"
                ? `Đã hiểu. Mục tiêu ưu tiên hàng đầu của bạn trong 6 tháng tới là gì?`
                : lang === "en"
                  ? `Understood. What is your #1 priority goal for the next 6 months?`
                  : `C'est très clair. Quel est votre objectif numéro 1 pour les 6 prochains mois ?`,
            options: OBJECTIVES,
          },
        ]);
      } else if (nextStep === 3) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text:
              lang === "vi"
                ? `Hoàn hảo. Bạn dự kiến ngân sách và hình thức đầu tư như thế nào?`
                : lang === "en"
                  ? `Perfect. What approximate investment budget are you planning for this project?`
                  : `Parfait. Quel est votre horizon budgétaire approximatif pour ce déploiement ?`,
            options: BUDGETS,
          },
        ]);
      } else {
        // Final Strategic Diagnostic & Synthesis
        const finalRecs = generateRecommendations(
          updatedAnswers.sector,
          updatedAnswers.situation,
          updatedAnswers.objective,
          opt.id,
        );

        const setupTotal = finalRecs
          .filter((r) => r.period === "once")
          .reduce((a, b) => a + b.eur, 0);
        const monthlyTotal = finalRecs
          .filter((r) => r.period === "month")
          .reduce((a, b) => a + b.eur, 0);
        const yearlyTotal = finalRecs
          .filter((r) => r.period === "year")
          .reduce((a, b) => a + b.eur, 0);

        const diagnosisText =
          lang === "vi"
            ? `Tôi đã hoàn tất phân tích toàn diện cho doanh nghiệp của bạn. Dựa trên mục tiêu và tình hình thực tế, đây là lộ trình chiến lược được tối ưu hóa cao nhất:`
            : lang === "en"
              ? `I have completed the strategic analysis for your business. Based on your goals and digital maturity, here is your high-impact tailored roadmap:`
              : `J'ai finalisé l'analyse stratégique de votre profil. Au vu de vos objectifs et de votre secteur, voici la feuille de route la plus rentable et pérenne que je vous recommande :`;

        setMessages((prev) => [
          ...prev,
          {
            id: `ai-reco-${Date.now()}`,
            sender: "ai",
            text: diagnosisText,
            recommendation: {
              diagnosis: diagnosisText,
              items: finalRecs,
              setup: setupTotal,
              monthly: monthlyTotal,
              yearly: yearlyTotal,
            },
          },
        ]);
      }
    }, 700);
  };

  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Advance to next intelligent question or final recommendation
      if (currentStep < 3) {
        handleSelectOption(currentStep, SECTORS[0]);
      } else {
        handleSelectOption(3, BUDGETS[1]);
      }
    }, 800);
  };

  const handleRestart = () => {
    setMessages([]);
    setAnswers({});
    setCurrentStep(0);
  };

  return (
    <section id="intelligence" className="grain relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background Atmosphere */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-halo)" }} />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="label-mono text-xs text-muted-foreground">
                {t(UI.intelAdvisorActive)}
              </span>
            </div>
            <span className="label-mono text-xs text-muted-foreground/70">
              {t(UI.intelAuditTimer)}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <div>
              <h2 className="display-serif text-4xl sm:text-5xl lg:text-6xl text-foreground">
                XRAGENCY <span className="text-primary">Intelligence</span>
              </h2>
              <p className="label-mono mt-3 text-xs uppercase tracking-widest text-primary">
                Audit Stratégique & Recommandation Personnalisée
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          {/* Main Interactive AI Interface Container */}
          <div className="surface-plate mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl backdrop-blur-xl">
            {/* Top Assistant Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-accent/20 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/30">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="display-serif text-sm font-semibold text-foreground">
                    {t(UI.intelAdvisorName)}
                  </h4>
                  <p className="label-mono text-[10px] text-muted-foreground">
                    {t(UI.intelAdvisorSub)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="label-mono inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                {t(UI.intelRestartLabel)}
              </button>
            </div>

            {/* Chat Flow Stream */}
            <div className="max-h-[560px] min-h-[320px] sm:min-h-[380px] overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300",
                      isAi ? "items-start" : "flex-row-reverse items-end",
                    )}
                  >
                    {isAi ? (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/40">
                        <Bot className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl p-4.5 sm:p-5 text-sm leading-relaxed",
                        isAi
                          ? "border border-border/80 bg-accent/30 text-foreground"
                          : "bg-primary text-primary-foreground font-medium",
                      )}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Options Chips Selection */}
                      {msg.options && currentStep < 4 ? (
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {msg.options.map((opt) => {
                            const IconComponent = opt.icon;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleSelectOption(currentStep, opt)}
                                className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card/80 p-3 sm:p-3.5 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:translate-x-0.5 min-h-[44px]"
                              >
                                {IconComponent ? (
                                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-accent/40 text-primary group-hover:border-primary/50">
                                    <IconComponent className="h-3.5 w-3.5" />
                                  </div>
                                ) : null}
                                <span className="label-mono text-xs text-foreground group-hover:text-primary">
                                  {t(opt.label)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {/* Final Recommendation Summary Card */}
                      {msg.recommendation ? (
                        <div className="mt-6 space-y-6">
                          {/* Recommended Services List */}
                          <div className="space-y-4">
                            {msg.recommendation.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                                      0{idx + 1}
                                    </span>
                                    <h5 className="display-serif text-base font-semibold text-foreground">
                                      {t(item.title)}
                                    </h5>
                                  </div>
                                  <span className="display-serif text-base font-bold text-primary">
                                    {price(item.eur)}{" "}
                                    <span className="label-mono text-xs font-normal text-muted-foreground">
                                      {item.period === "month"
                                        ? "/m"
                                        : item.period === "year"
                                          ? "/an"
                                          : ""}
                                    </span>
                                  </span>
                                </div>
                                <p className="label-mono mt-2 text-xs font-medium text-foreground">
                                  {t(UI.intelFormule)} {t(item.plan)}
                                </p>
                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                  <strong className="text-foreground">
                                    {t(UI.intelWhyLabel)}{" "}
                                  </strong>
                                  {t(item.why)}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Totals Summary */}
                          <div className="grid gap-3 sm:grid-cols-3 rounded-2xl border border-border/80 bg-accent/40 p-4">
                            <div>
                              <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                {t(UI.intelSetupLabel)}
                              </span>
                              <p className="display-serif mt-1 text-xl text-primary">
                                {price(msg.recommendation.setup)}
                              </p>
                            </div>
                            <div>
                              <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                {t(UI.intelMonthlyLabel)}
                              </span>
                              <p className="display-serif mt-1 text-xl text-primary">
                                {msg.recommendation.monthly > 0
                                  ? `${price(msg.recommendation.monthly)} /m`
                                  : "—"}
                              </p>
                            </div>
                            <div>
                              <span className="label-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                {t(UI.intelYearlyLabel)}
                              </span>
                              <p className="display-serif mt-1 text-xl text-primary">
                                {msg.recommendation.yearly > 0
                                  ? `${price(msg.recommendation.yearly)} /an`
                                  : "—"}
                              </p>
                            </div>
                          </div>

                          {/* Direct Actions */}
                          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                            <a
                              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                                `Bonjour Alexandre, je viens de terminer mon audit IA sur votre site. Voici les prestations recommandées : ${msg.recommendation.items
                                  .map((r) => `${t(r.title)} (${t(r.plan)})`)
                                  .join(", ")}. Pouvons-nous valider ce plan ensemble ?`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-emerald-500 min-h-[44px]"
                            >
                              <MessageSquare className="h-4 w-4" />
                              {t(UI.intelSendWhatsapp)}
                            </a>

                            <button
                              onClick={() => {
                                const summary = `XR Agency — Diagnostic & Recommandation\n\n${msg.recommendation?.items
                                  .map(
                                    (r) =>
                                      `• ${t(r.title)} (${t(r.plan)}) : ${price(r.eur)}${
                                        r.period === "month"
                                          ? "/m"
                                          : r.period === "year"
                                            ? "/an"
                                            : ""
                                      }`,
                                  )
                                  .join("\n")}\n\nMise en place : ${price(
                                  msg.recommendation?.setup || 0,
                                )}\nSuivi Mensuel : ${price(
                                  msg.recommendation?.monthly || 0,
                                )}\nGoogle Maps : ${
                                  msg.recommendation?.yearly
                                    ? price(msg.recommendation.yearly)
                                    : "—"
                                }`;
                                navigator.clipboard.writeText(summary);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2500);
                              }}
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-xs font-medium uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-all min-h-[44px]"
                            >
                              {copied ? (
                                <>
                                  <CheckCheck className="h-4 w-4 text-emerald-500" />
                                  <span>{t(UI.intelPlanCopied)}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  <span>{t(UI.intelCopyPlan)}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/40">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                  </div>
                </div>
              ) : null}

              <div ref={chatEndRef} />
            </div>

            {/* Freeform Message Input Footer */}
            <form
              onSubmit={handleCustomTextSubmit}
              className="flex items-center gap-2 sm:gap-3 border-t border-border/60 bg-card/60 p-3 sm:p-4"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  lang === "vi"
                    ? "Nhập câu trả lời hoặc câu hỏi của bạn..."
                    : lang === "en"
                      ? "Type your answer or question here..."
                      : "Répondez ou posez une question sur votre projet..."
                }
                className="flex-1 min-h-[44px] rounded-full border border-border bg-background/80 px-4 sm:px-5 py-2.5 sm:py-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition-all hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
