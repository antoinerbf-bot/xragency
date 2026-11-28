import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { FAQ, type FaqCategory } from "@/lib/content";
import { Reveal } from "./primitives";

const CATEGORIES: { key: FaqCategory | "all"; labelKey: keyof typeof UI }[] = [
  { key: "all", labelKey: "faqCatAll" },
  { key: "sites", labelKey: "faqCatSites" },
  { key: "seo", labelKey: "faqCatSeo" },
  { key: "ia", labelKey: "faqCatIa" },
  { key: "tarifs", labelKey: "faqCatTarifs" },
  { key: "delais", labelKey: "faqCatDelais" },
  { key: "general", labelKey: "faqCatGeneral" },
];

const FAQ_HEAD: Record<
  Lang,
  { eyebrow: string; title: string; accent: string; intro: string; showMore: string; showLess: string }
> = {
  fr: {
    eyebrow: "QUESTIONS FRÉQUENTES",
    title: "Toutes les réponses,",
    accent: "sans détour.",
    intro:
      "Une question sur nos offres, nos délais ou notre façon de travailler ? Retrouvez l’essentiel ci-dessous ou contactez-nous directement.",
    showMore: "Afficher toutes les questions",
    showLess: "Réduire la liste",
  },
  en: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Clear answers,",
    accent: "no jargon.",
    intro:
      "Have a question about our services, pricing or process? Find the key points below or reach out to our team directly.",
    showMore: "Show all questions",
    showLess: "Show fewer",
  },
  vi: {
    eyebrow: "CÂU HỎI THƯỜNG GẶP",
    title: "Giải đáp rõ ràng,",
    accent: "trực diện.",
    intro:
      "Bạn có câu hỏi về dịch vụ, chi phí hoặc quy trình làm việc? Xem các thông tin chính bên dưới hoặc liên hệ trực tiếp với đội ngũ.",
    showMore: "Xem tất cả câu hỏi",
    showLess: "Thu gọn",
  },
  ar: {
    eyebrow: "الأسئلة الشائعة",
    title: "إجابات واضحة،",
    accent: "دون تعقيد.",
    intro:
      "هل لديك سؤال حول خدماتنا أو أسعارنا أو طريقة عملنا؟ تجد أهم الإجابات أدناه أو يمكنك التواصل معنا مباشرة.",
    showMore: "عرض جميع الأسئلة",
    showLess: "عرض أقل",
  },
  ru: {
    eyebrow: "ЧАСТЫЕ ВОПРОСЫ",
    title: "Ясные ответы,",
    accent: "по существу.",
    intro:
      "Есть вопросы об услугах, тарифах или процессе работы? Основные ответы собраны ниже, либо напишите нам напрямую.",
    showMore: "Показать все вопросы",
    showLess: "Свернуть список",
  },
};

const INITIAL_VISIBLE = 6;

export function Faq() {
  const { t, lang } = useLang();
  const h = FAQ_HEAD[lang] ?? FAQ_HEAD.fr;
  const [open, setOpen] = useState<number | null>(0);
  const [activeCat, setActiveCat] = useState<FaqCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (activeCat === "all" ? FAQ : FAQ.filter((f) => f.category === activeCat)),
    [activeCat],
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <section
      id="faq"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative border-t border-[#171613]/12 bg-[#F7F4EE] py-20 text-[#171613] sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9E7F5A]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7D6344]">
                {h.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#171613]">
              {h.title}{" "}
              <span className="font-serif font-normal italic text-[#9E7F5A]">{h.accent}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C574F] sm:text-[15px]">
              {h.intro}
            </p>
          </div>
        </Reveal>

        {/* Category filter pills */}
        <div className="mt-7 flex flex-wrap gap-2">
          {CATEGORIES.map(({ key, labelKey }) => {
            const count = key === "all" ? FAQ.length : FAQ.filter((f) => f.category === key).length;
            if (key !== "all" && count === 0) return null;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveCat(key);
                  setOpen(null);
                  setShowAll(false);
                }}
                className={cn(
                  "min-h-10 rounded-full border px-4 py-1.5 text-xs font-medium transition",
                  activeCat === key
                    ? "border-[#171613] bg-[#171613] text-[#F7F4EE]"
                    : "border-[#171613]/15 bg-white text-[#5C574F] hover:border-[#9E7F5A] hover:text-[#171613]",
                )}
              >
                {t(UI[labelKey])}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div className="mt-8 divide-y divide-[#171613]/12 border-y border-[#171613]/12 bg-white/75 rounded-2xl border">
          {visible.map((item, i) => {
            const globalIdx = FAQ.indexOf(item);
            const active = open === globalIdx;

            return (
              <div
                key={globalIdx}
                className={cn("transition-colors duration-200", active && "bg-white")}
              >
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : globalIdx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start sm:px-7"
                  aria-expanded={active}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-[#9E7F5A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-[#171613] sm:text-[15.5px]">
                      {t(item.q)}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-[#7D6344] transition-transform duration-200",
                      active && "rotate-180",
                    )}
                  />
                </button>
                {active && (
                  <div className="px-5 pb-6 ps-14 text-sm leading-7 text-[#5C574F] sm:px-7 sm:ps-16">
                    {t(item.a)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex min-h-11 items-center rounded-full border border-[#171613]/18 bg-white px-5 py-2 text-xs font-semibold text-[#171613] hover:border-[#9E7F5A]"
            >
              {showAll ? h.showLess : h.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
