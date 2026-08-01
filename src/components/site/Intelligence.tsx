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
  { id: "visibility", label: { fr: "Être visible sur Google", en: "Be visible on Google", vi: "Hiển thị trên Google" } },
  { id: "local", label: { fr: "Attirer des clients de ma zone", en: "Attract customers nearby", vi: "Thu hút khách hàng quanh khu vực" } },
  { id: "leads", label: { fr: "Générer plus de demandes", en: "Generate more enquiries", vi: "Tạo thêm yêu cầu khách hàng" } },
  { id: "brand", label: { fr: "Créer une marque forte", en: "Build a strong brand", vi: "Xây dựng thương hiệu mạnh" } },
  { id: "automation", label: { fr: "Automatiser mon service client", en: "Automate customer service", vi: "Tự động hóa chăm sóc khách hàng" } },
  { id: "sell", label: { fr: "Vendre ou réserver en ligne", en: "Sell or take bookings online", vi: "Bán hàng hoặc nhận đặt chỗ trực tuyến" } },
];

const SITUATIONS: Opt[] = [
  { id: "none", label: { fr: "Je n'ai pas encore de site", en: "I don't have a website yet", vi: "Tôi chưa có website" } },
  { id: "old", label: { fr: "Mon site est dépassé", en: "My website is outdated", vi: "Website của tôi đã lỗi thời" } },
  { id: "notraffic", label: { fr: "Mon site existe mais ne convertit pas", en: "My site exists but doesn't convert", vi: "Website có nhưng không chuyển đổi" } },
  { id: "solid", label: { fr: "Mon site est bon, je veux accélérer", en: "My site is good, I want to scale", vi: "Website tốt, tôi muốn tăng tốc" } },
];

const BUDGETS: Opt[] = [
  { id: "s", label: { fr: "Moins de 300 € / mois", en: "Under $325 / month", vi: "Dưới 8.400.000 ₫ / tháng" } },
  { id: "m", label: { fr: "300 — 800 € / mois", en: "$325 — $865 / month", vi: "8.400.000 — 22.400.000 ₫ / tháng" } },
  { id: "l", label: { fr: "800 — 2 000 € / mois", en: "$865 — $2,160 / month", vi: "22.400.000 — 56.000.000 ₫ / tháng" } },
  { id: "xl", label: { fr: "Plus de 2 000 € / mois", en: "Over $2,160 / month", vi: "Trên 56.000.000 ₫ / tháng" } },
];

const svc = (id: string) => SERVICES.find((s) => s.id === id)!;

type Reco = { title: L; plan: L; eur: number; period: "once" | "month" | "year" };

/** Sectors that always require online booking / transactions -> E-commerce & Booking plan. */
const BOOKING_SECTORS = ["hotel", "resto", "retail"];

function buildReco(sector: string, objective: string, situation: string, budget: string): Reco[] {
  const tier = budget === "s" ? 0 : budget === "m" ? 1 : budget === "l" ? 2 : 2;
  const out: Reco[] = [];

  const websites = svc("websites");
  const needsBooking = objective === "sell" || BOOKING_SECTORS.includes(sector);
  if (situation === "none" || situation === "old" || needsBooking) {
    // Booking / e-commerce sectors always get the transactional plan (1099 €).
    const idx = needsBooking ? 2 : Math.min(tier, 2);
    const p = websites.plans[idx];
    out.push({ title: websites.title, plan: p.name, eur: p.eur, period: "once" });
  }

  if (objective === "brand" || situation === "none") {
    const branding = svc("branding");
    const p = branding.plans[Math.min(tier, 2)];
    out.push({ title: branding.title, plan: p.name, eur: p.eur, period: "once" });
  }

  if (objective === "visibility" || objective === "leads" || situation === "notraffic" || situation === "solid") {
    const seo = svc("seo");
    const p = seo.plans[Math.min(tier, 2)];
    out.push({ title: seo.title, plan: p.name, eur: p.eur, period: "month" });
  }

  const localSectors = ["resto", "hotel", "sante", "juridique", "artisan", "beaute", "immo"];
  if (objective === "local" || objective === "leads" || localSectors.includes(sector)) {
    const maps = svc("maps");
    out.push({ title: maps.title, plan: maps.plans[0].name, eur: maps.plans[0].eur, period: "year" });
  }

  if (objective === "automation" || sector === "resto" || sector === "hotel" || budget === "xl") {
    const ai = svc("ai");
    const p = ai.plans[budget === "xl" ? 1 : 0];
    out.push({ title: ai.title, plan: p.name, eur: p.eur, period: "month" });
  }

  if (objective === "brand" && tier >= 1) {
    const social = svc("social");
    const p = social.plans[Math.min(tier, 2)];
    out.push({ title: social.title, plan: p.name, eur: p.eur, period: "month" });
  }

  const maint = svc("maintenance");
  const mp = maint.plans[Math.min(tier, 2)];
  out.push({ title: maint.title, plan: mp.name, eur: mp.eur, period: "month" });

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
      <div className="pointer-events-none absolute inset-0 opacity-45">
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
                <div className="flex items-center gap-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="label-mono text-muted-foreground">
                    {t(UI.intelStep)} {step + 1} {t(UI.intelOf)} 4
                  </span>
                </div>
                <div className="mt-4 h-px w-full bg-border">
                  <div
                    className="h-px bg-primary transition-all duration-500"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>

                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  {t(UI.intelIntro)}
                </p>
                <h3 className="display-serif mt-6 text-2xl sm:text-3xl">
                  {t(steps[step].question)}
                </h3>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {steps[step].options.map((o) => {
                    const active = answers[steps[step].key] === o.id;
                    const Icon = o.icon;
                    return (
                      <button
                        key={o.id}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [steps[step].key]: o.id }));
                          setStep((s) => s + 1);
                        }}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl border border-border bg-background/40 px-5 py-4 text-left text-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/5 hover:shadow-[var(--shadow-ember)]",
                          active && "border-primary bg-primary/10",
                        )}
                      >
                        {Icon ? (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:border-primary/70 group-hover:bg-primary/10">
                            <Icon className="h-4 w-4" />
                          </span>
                        ) : null}
                        <span className="flex-1">{t(o.label)}</span>
                        <span className="label-mono text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                          →
                        </span>
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
                  <div className="rounded-2xl border border-border p-5">
                    <p className="label-mono text-muted-foreground">{t(UI.intelSetup)}</p>
                    <p className="display-serif mt-2 text-2xl text-primary">{price(setup)}</p>
                  </div>
                  <div className="rounded-2xl border border-border p-5">
                    <p className="label-mono text-muted-foreground">{t(UI.intelRecurring)}</p>
                    <p className="display-serif mt-2 text-2xl text-primary">{price(monthly)}</p>
                  </div>
                  <div className="rounded-2xl border border-border p-5">
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