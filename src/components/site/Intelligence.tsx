import { useMemo, useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type L } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { CONTACT, SERVICES } from "@/lib/content";
import { EmberButton, Reveal } from "./primitives";
import { Globe } from "./Globe";

type Opt = { id: string; label: L; icon?: typeof Check };

const SECTORS: Opt[] = [
  { id: "resto", icon: UtensilsCrossed, label: { fr: "Restaurant / Café", en: "Restaurant / Café", vi: "Nhà hàng / Quán cà phê" } },
  { id: "hotel", icon: Hotel, label: { fr: "Hôtel / Spa", en: "Hotel / Spa", vi: "Khách sạn / Spa" } },
  { id: "sante", icon: HeartPulse, label: { fr: "Santé / Médical", en: "Health / Medical", vi: "Y tế / Sức khỏe" } },
  { id: "juridique", icon: Scale, label: { fr: "Avocat / Conseil", en: "Law / Consulting", vi: "Luật / Tư vấn" } },
  { id: "immo", icon: Building2, label: { fr: "Immobilier", en: "Real estate", vi: "Bất động sản" } },
  { id: "retail", icon: ShoppingBag, label: { fr: "Boutique / E-commerce", en: "Retail / E-commerce", vi: "Bán lẻ / Thương mại điện tử" } },
  { id: "artisan", icon: Hammer, label: { fr: "Artisan / BTP", en: "Craftsman / Construction", vi: "Thợ thủ công / Xây dựng" } },
  { id: "beaute", icon: Gem, label: { fr: "Beauté / Bien-être", en: "Beauty / Wellness", vi: "Làm đẹp / Chăm sóc" } },
  { id: "tech", icon: Rocket, label: { fr: "Startup / Tech", en: "Startup / Tech", vi: "Startup / Công nghệ" } },
  { id: "autre", icon: Compass, label: { fr: "Autre secteur", en: "Other sector", vi: "Lĩnh vực khác" } },
];

const OBJECTIVES: Opt[] = [
  { id: "visibility", icon: Search, label: { fr: "Être visible sur Google", en: "Be visible on Google", vi: "Hiển thị trên Google" } },
  { id: "local", icon: MapPinned, label: { fr: "Attirer des clients de ma zone", en: "Attract customers nearby", vi: "Thu hút khách hàng quanh khu vực" } },
  { id: "leads", icon: Megaphone, label: { fr: "Générer plus de demandes", en: "Generate more enquiries", vi: "Tạo thêm yêu cầu khách hàng" } },
  { id: "brand", icon: BadgeCheck, label: { fr: "Créer une marque forte", en: "Build a strong brand", vi: "Xây dựng thương hiệu mạnh" } },
  { id: "automation", icon: Bot, label: { fr: "Automatiser mon service client", en: "Automate customer service", vi: "Tự động hóa chăm sóc khách hàng" } },
  { id: "sell", icon: CreditCard, label: { fr: "Vendre ou réserver en ligne", en: "Sell or take bookings online", vi: "Bán hàng hoặc nhận đặt chỗ trực tuyến" } },
];

const SITUATIONS: Opt[] = [
  { id: "none", icon: CircleSlash, label: { fr: "Je n'ai pas encore de site", en: "I don't have a website yet", vi: "Tôi chưa có website" } },
  { id: "old", icon: History, label: { fr: "Mon site est dépassé", en: "My website is outdated", vi: "Website của tôi đã lỗi thời" } },
  { id: "notraffic", icon: TrendingDown, label: { fr: "Mon site existe mais ne convertit pas", en: "My site exists but doesn't convert", vi: "Website có nhưng không chuyển đổi" } },
  { id: "solid", icon: TrendingUp, label: { fr: "Mon site est bon, je veux accélérer", en: "My site is good, I want to scale", vi: "Website tốt, tôi muốn tăng tốc" } },
];

const BUDGETS: Opt[] = [
  { id: "s", icon: Wallet, label: { fr: "Moins de 300 € / mois", en: "Under $325 / month", vi: "Dưới 8.400.000 ₫ / tháng" } },
  { id: "m", icon: Coins, label: { fr: "300 — 800 € / mois", en: "$325 — $865 / month", vi: "8.400.000 — 22.400.000 ₫ / tháng" } },
  { id: "l", icon: Banknote, label: { fr: "800 — 2 000 € / mois", en: "$865 — $2,160 / month", vi: "22.400.000 — 56.000.000 ₫ / tháng" } },
  { id: "xl", icon: Landmark, label: { fr: "Plus de 2 000 € / mois", en: "Over $2,160 / month", vi: "Trên 56.000.000 ₫ / tháng" } },
];

const svc = (id: string) => SERVICES.find((s) => s.id === id)!;

type Reco = { title: L; plan: L; eur: number; period: "once" | "month" | "year"; why: L };

/** Sectors that always require online booking / transactions -> E-commerce & Booking plan. */
const BOOKING_SECTORS = ["hotel", "resto", "retail"];

function buildReco(sector: string, objective: string, situation: string, budget: string): Reco[] {
  const tier = budget === "s" ? 0 : budget === "m" ? 1 : budget === "l" ? 2 : 2;
  const out: Reco[] = [];

  const websites = svc("websites");
  const needsBooking = objective === "sell" || BOOKING_SECTORS.includes(sector);
  const buildsSite = situation === "none" || situation === "old" || needsBooking;
  if (buildsSite) {
    // Booking / e-commerce sectors always get the transactional plan (1099 €).
    const idx = needsBooking ? 2 : Math.min(tier, 2);
    const p = websites.plans[idx];
    out.push({
      title: websites.title,
      plan: p.name,
      eur: p.eur,
      period: "once",
      why: needsBooking
        ? {
            fr: "Votre activité encaisse ou réserve en ligne : il faut une base transactionnelle, pas une simple vitrine.",
            en: "Your business sells or takes bookings online: you need a transactional base, not a simple showcase.",
            vi: "Doanh nghiệp của bạn bán hàng hoặc nhận đặt chỗ trực tuyến: cần nền tảng giao dịch, không chỉ là trang giới thiệu.",
          }
        : {
            fr: "Sans site à jour, chaque recherche à votre nom profite à un concurrent.",
            en: "Without an up-to-date site, every search for your name benefits a competitor.",
            vi: "Không có website cập nhật, mỗi lượt tìm kiếm tên bạn đều làm lợi cho đối thủ.",
          },
    });
  }

  if (objective === "brand" || situation === "none") {
    const branding = svc("branding");
    const p = branding.plans[Math.min(tier, 2)];
    out.push({
      title: branding.title,
      plan: p.name,
      eur: p.eur,
      period: "once",
      why: {
        fr: "Une identité cohérente augmente la mémorisation et justifie un prix plus élevé.",
        en: "A consistent identity increases recall and justifies a higher price point.",
        vi: "Nhận diện nhất quán giúp khách nhớ lâu hơn và biện minh cho mức giá cao hơn.",
      },
    });
  }

  if (objective === "visibility" || objective === "leads" || situation === "notraffic" || situation === "solid") {
    const seo = svc("seo");
    const p = seo.plans[Math.min(tier, 2)];
    out.push({
      title: seo.title,
      plan: p.name,
      eur: p.eur,
      period: "month",
      why: {
        fr: "Le SEO est le seul canal qui continue de produire des demandes sans budget publicitaire.",
        en: "SEO is the only channel that keeps producing enquiries without ad spend.",
        vi: "SEO là kênh duy nhất tiếp tục mang lại khách hàng mà không cần ngân sách quảng cáo.",
      },
    });
  }

  const localSectors = ["resto", "hotel", "sante", "juridique", "artisan", "beaute", "immo"];
  if (objective === "local" || objective === "leads" || localSectors.includes(sector)) {
    const maps = svc("maps");
    out.push({
      title: maps.title,
      plan: maps.plans[0].name,
      eur: maps.plans[0].eur,
      period: "year",
      why: {
        fr: "90 % des clics locaux vont aux 3 premières fiches Google Maps.",
        en: "90% of local clicks go to the first three Google Maps listings.",
        vi: "90% lượt nhấp địa phương thuộc về 3 hồ sơ Google Maps đầu tiên.",
      },
    });
  }

  if (objective === "automation" || sector === "resto" || sector === "hotel" || budget === "xl") {
    const ai = svc("ai");
    const p = ai.plans[budget === "xl" ? 1 : 0];
    out.push({
      title: ai.title,
      plan: p.name,
      eur: p.eur,
      period: "month",
      why: {
        fr: "L'assistant répond la nuit, le week-end et dans la langue du client.",
        en: "The assistant replies at night, on weekends and in the customer's language.",
        vi: "Trợ lý trả lời ban đêm, cuối tuần và bằng ngôn ngữ của khách hàng.",
      },
    });
  }

  if (objective === "brand" && tier >= 1) {
    const social = svc("social");
    const p = social.plans[Math.min(tier, 2)];
    out.push({
      title: social.title,
      plan: p.name,
      eur: p.eur,
      period: "month",
      why: {
        fr: "Une marque forte se prouve chaque semaine, pas une fois par an.",
        en: "A strong brand proves itself weekly, not once a year.",
        vi: "Thương hiệu mạnh được chứng minh hàng tuần, không phải mỗi năm một lần.",
      },
    });
  }

  // Maintenance only makes sense when a site is built or already exists online.
  if (buildsSite || situation === "notraffic" || situation === "solid") {
    const maint = svc("maintenance");
    const mp = maint.plans[Math.min(tier, 2)];
    out.push({
      title: maint.title,
      plan: mp.name,
      eur: mp.eur,
      period: "month",
      why: {
        fr: "Sécurité, sauvegardes et vitesse : un site négligé perd son classement en quelques mois.",
        en: "Security, backups and speed: a neglected site loses its ranking within months.",
        vi: "Bảo mật, sao lưu và tốc độ: website bị bỏ bê sẽ mất thứ hạng chỉ sau vài tháng.",
      },
    });
  }

  return out;
}

export function Intelligence() {
  const { t, price, lang } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const steps = [
    { key: "sector", question: UI.intelQ1, options: SECTORS },
    { key: "objective", question: UI.intelQ2, options: OBJECTIVES },
    { key: "situation", question: UI.intelQ3, options: SITUATIONS },
    { key: "budget", question: UI.intelQ4, options: BUDGETS },
  ];

  const done = step > 3;
  const reco = useMemo(
    () =>
      done
        ? buildReco(answers.sector, answers.objective, answers.situation, answers.budget)
        : [],
    [done, answers],
  );

  const setup = reco.filter((r) => r.period === "once").reduce((a, b) => a + b.eur, 0);
  const monthly = reco.filter((r) => r.period === "month").reduce((a, b) => a + b.eur, 0);
  const yearly = reco.filter((r) => r.period === "year").reduce((a, b) => a + b.eur, 0);

  const waMessage = encodeURIComponent(
    lang === "vi"
      ? `Xin chào XR Agency, tôi vừa hoàn tất phân tích XRAGENCY Intelligence. Đề xuất: ${reco
          .map((r) => t(r.plan))
          .join(", ")}. Tôi muốn nhận báo giá chi tiết.`
      : lang === "en"
        ? `Hello XR Agency, I just completed the XRAGENCY Intelligence analysis. Recommended: ${reco
            .map((r) => t(r.plan))
            .join(", ")}. I'd like a detailed quote.`
        : `Bonjour XR Agency, je viens de terminer l'analyse XRAGENCY Intelligence. Recommandation : ${reco
            .map((r) => t(r.plan))
            .join(", ")}. Je souhaite recevoir un devis détaillé.`,
  );

  return (
    <section id="intelligence" className="grain relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <Globe />
      </div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-halo)" }} />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="label-mono text-muted-foreground">{t(UI.intelOnline)}</span>
            </div>
            <span className="label-mono text-muted-foreground/70">{t(UI.intelDuration)}</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="display-serif mt-8 text-4xl sm:text-5xl lg:text-6xl">
            XRAGENCY <span className="text-primary">Intelligence</span>
          </h2>
          <p className="label-mono mt-4 text-primary">{t(UI.intelLabel)}</p>
        </Reveal>

        <Reveal delay={140}>
          <div className="surface-plate mt-10 rounded-3xl p-6 sm:p-10">
            {!done ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                    <span className="label-mono text-muted-foreground">
                      {t(UI.intelStep)} {step + 1} {t(UI.intelOf)} 4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {steps.map((st, i) => (
                      <button
                        key={st.key}
                        onClick={() => i < step && setStep(i)}
                        disabled={i > step}
                        aria-label={`step-${i + 1}`}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          i === step
                            ? "w-10 bg-primary"
                            : i < step
                              ? "w-6 cursor-pointer bg-primary/45 hover:bg-primary"
                              : "w-6 bg-border",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-border">
                  <div
                    className="h-px bg-primary transition-all duration-700"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>

                {step > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {steps.slice(0, step).map((st, i) => {
                      const chosen = st.options.find((o) => o.id === answers[st.key]);
                      if (!chosen) return null;
                      return (
                        <button
                          key={st.key}
                          onClick={() => setStep(i)}
                          className="label-mono rounded-full border border-border bg-background/60 px-3 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {t(chosen.label)}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  {t(UI.intelIntro)}
                </p>
                <h3 className="display-serif mt-6 text-2xl sm:text-3xl">
                  {t(steps[step].question)}
                </h3>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {steps[step].options.map((o, i) => {
                    const active = answers[steps[step].key] === o.id;
                    const Icon = o.icon;
                    return (
                      <button
                        key={o.id}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [steps[step].key]: o.id }));
                          setStep((s) => s + 1);
                        }}
                        style={{ animation: `ember-rise 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms both` }}
                        className={cn(
                          "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card px-5 py-5 text-left text-sm shadow-[var(--shadow-ember)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-plate)]",
                          active && "border-primary bg-accent",
                        )}
                      >
                        {Icon ? (
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                        ) : null}
                        <span className="flex-1 font-medium">{t(o.label)}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                      </button>
                    );
                  })}
                </div>

                {step > 0 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="label-mono mt-8 text-muted-foreground transition-colors hover:text-primary"
                  >
                    ← {t(UI.intelBack)}
                  </button>
                ) : null}
              </>
            ) : (
              <div className="animate-rise">
                <p className="label-mono text-primary">{t(UI.intelResultLabel)}</p>
                <h3 className="display-serif mt-4 text-3xl sm:text-4xl">{t(UI.intelResultTitle)}</h3>

                <ul className="mt-8 divide-y divide-border border-y border-border">
                  {reco.map((r, i) => (
                    <li key={i} className="flex flex-wrap items-center gap-3 py-4">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-foreground">{t(r.plan)}</p>
                        <p className="label-mono mt-1 text-muted-foreground">{t(r.title)}</p>
                      </div>
                      <span className="label-mono text-primary">
                        {price(r.eur)}
                        {r.period === "month" ? " /m" : r.period === "year" ? " /a" : ""}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-ember)]">
                    <p className="label-mono text-muted-foreground">{t(UI.intelSetup)}</p>
                    <p className="display-serif mt-2 text-2xl text-primary">{price(setup)}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-ember)]">
                    <p className="label-mono text-muted-foreground">{t(UI.intelRecurring)}</p>
                    <p className="display-serif mt-2 text-2xl text-primary">{price(monthly)}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-ember)]">
                    <p className="label-mono text-muted-foreground">Google Maps</p>
                    <p className="display-serif mt-2 text-2xl text-primary">
                      {yearly ? price(yearly) : "—"}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  {t(UI.intelDisclaimer)}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <EmberButton href={`${CONTACT.whatsapp}?text=${waMessage}`}>
                    {t(UI.intelSend)}
                  </EmberButton>
                  <EmberButton
                    variant="ghost"
                    onClick={() => {
                      setAnswers({});
                      setStep(0);
                    }}
                  >
                    {t(UI.intelRestart)}
                  </EmberButton>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}