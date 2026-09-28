import { ArrowRight, FileImage, Search, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const copy = {
  fr: { kicker: "COMMENCER EN 60 SECONDES", title: "Votre prochain pas.", lead: "Pas de catalogue à parcourir. Choisissez simplement ce dont vous avez besoin maintenant.", audit: "Analyser mon site", auditDesc: "Un audit digital rapide pour voir ce qui bloque la visibilité, le design ou la conversion.", mockup: "Demander ma maquette", mockupDesc: "Une proposition visuelle gratuite pour vous projeter avant de vous engager.", quote: "Construire mon projet", quoteDesc: "Quelques questions pour cadrer votre besoin et obtenir une première estimation.", tag1: "GRATUIT", tag2: "SANS ENGAGEMENT", tag3: "RÉPONSE RAPIDE" },
  en: { kicker: "START IN 60 SECONDS", title: "Your next step.", lead: "No catalogue to navigate. Simply choose what you need right now.", audit: "Analyze my website", auditDesc: "A quick digital audit to identify what is limiting visibility, design or conversion.", mockup: "Request my mockup", mockupDesc: "A free visual proposal so you can see the direction before committing.", quote: "Build my project", quoteDesc: "A few questions to frame your needs and get an initial estimate.", tag1: "FREE", tag2: "NO COMMITMENT", tag3: "FAST RESPONSE" },
  vi: { kicker: "BẮT ĐẦU TRONG 60 GIÂY", title: "Bước tiếp theo của bạn.", lead: "Không cần xem cả danh mục. Chỉ cần chọn điều bạn cần ngay lúc này.", audit: "Phân tích website", auditDesc: "Audit nhanh để xác định điều đang cản trở khả năng hiển thị, thiết kế hoặc chuyển đổi.", mockup: "Nhận thiết kế mẫu", mockupDesc: "Một đề xuất hình ảnh miễn phí để bạn hình dung trước khi quyết định.", quote: "Xây dựng dự án", quoteDesc: "Vài câu hỏi để xác định nhu cầu và nhận ước tính ban đầu.", tag1: "MIỄN PHÍ", tag2: "KHÔNG CAM KẾT", tag3: "PHẢN HỒI NHANH" },
  ar: { kicker: "ابدأ خلال 60 ثانية", title: "خطوتك التالية.", lead: "لا حاجة لتصفح كل الخدمات. اختر ببساطة ما تحتاجه الآن.", audit: "حلّل موقعي", auditDesc: "تدقيق رقمي سريع لمعرفة ما يحد من الظهور أو التصميم أو التحويل.", mockup: "اطلب النموذج", mockupDesc: "تصور بصري مجاني لتقييم الاتجاه قبل الالتزام.", quote: "ابدأ مشروعي", quoteDesc: "بضع أسئلة لتحديد احتياجك والحصول على تقدير أولي.", tag1: "مجاني", tag2: "بدون التزام", tag3: "رد سريع" },
  ru: { kicker: "СТАРТ ЗА 60 СЕКУНД", title: "Следующий шаг.", lead: "Не нужно изучать весь каталог. Просто выберите то, что нужно сейчас.", audit: "Проверить сайт", auditDesc: "Быстрый digital-аудит, чтобы увидеть, что мешает видимости, дизайну или конверсии.", mockup: "Запросить макет", mockupDesc: "Бесплатная визуальная концепция, чтобы увидеть направление до решения.", quote: "Создать проект", quoteDesc: "Несколько вопросов, чтобы определить задачу и получить предварительную оценку.", tag1: "БЕСПЛАТНО", tag2: "БЕЗ ОБЯЗАТЕЛЬСТВ", tag3: "БЫСТРЫЙ ОТВЕТ" },
} as const;

export function ImmersiveJourney() {
  const { lang } = useLang();
  const t = copy[lang as keyof typeof copy] ?? copy.en;
  const mockupUrl = CONTACT.whatsapp + "?text=" + encodeURIComponent("Bonjour XRAGENCY, je souhaite ma maquette gratuite (valeur 200 €).");
  const cards = [
    { icon: Search, title: t.audit, desc: t.auditDesc, href: "#audit", primary: false },
    { icon: FileImage, title: t.mockup, desc: t.mockupDesc, href: mockupUrl, primary: true },
    { icon: ArrowRight, title: t.quote, desc: t.quoteDesc, href: "#quote", primary: false },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background" aria-label={t.title}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,hsl(var(--primary)/.10),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-7 border-b border-border/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label-mono text-[9px] tracking-[.3em] text-primary">XR AGENCY · {t.kicker}</span>
            <h2 className="display-serif mt-3 text-[clamp(2.7rem,5vw,5.2rem)] leading-[.88] tracking-[-.045em]">{t.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">{t.lead}</p>
        </div>

        <div className="mt-7 grid gap-3 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const external = card.href.startsWith("http");
            const cardClass = card.primary
              ? "border-primary/35 bg-primary/[.08]"
              : "border-border/70 bg-card/45";
            const iconClass = card.primary
              ? "border-primary/35 bg-primary/10 text-primary"
              : "border-border bg-background text-primary";
            return (
              <a key={card.title} href={card.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}
                className={"group rounded-[1.35rem] border p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/45 " + cardClass}>
                <div className="flex items-start justify-between gap-5">
                  <span className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-full border " + iconClass}><Icon className="h-4 w-4" /></span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-lg font-semibold tracking-[-.02em]">{card.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{card.desc}</p>
              </a>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[t.tag1, t.tag2, t.tag3].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2 label-mono text-[8px] tracking-[.16em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
