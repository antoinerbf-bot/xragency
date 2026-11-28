import { ArrowRight, BadgeCheck, FileCheck2, MessageSquareText } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PRINCIPLES = [
  {
    icon: FileCheck2,
    title: "Un périmètre écrit",
    description:
      "Les livrables, délais prévisionnels et modalités sont précisés avant le démarrage.",
  },
  {
    icon: MessageSquareText,
    title: "Des retours traçables",
    description: "Les étapes de validation et les échanges projet restent documentés.",
  },
  {
    icon: BadgeCheck,
    title: "Des preuves vérifiables",
    description: "Les références et indicateurs ne sont publiés qu’avec validation du client.",
  },
];

export function NexProReviews() {
  const { lang } = useLang();
  const copy = {
    fr: {
      eyebrow: "Transparence & méthode",
      title: "Des engagements clairs. Des preuves qui peuvent être vérifiées.",
      intro:
        "Nous ne publions pas de faux avis, de notes Google reconstituées ou de résultats commerciaux non documentés. Les références nominatives sont partagées uniquement lorsqu’elles sont vérifiables et autorisées par le client.",
      items: [
        [
          "Un périmètre écrit",
          "Les livrables, délais prévisionnels et modalités sont précisés avant le démarrage.",
        ],
        [
          "Des retours traçables",
          "Les étapes de validation et les échanges projet restent documentés.",
        ],
        [
          "Des preuves vérifiables",
          "Les références et indicateurs ne sont publiés qu’avec validation du client.",
        ],
      ],
      cta: "Échanger sur votre projet",
    },
    en: {
      eyebrow: "Transparency & method",
      title: "Clear commitments. Evidence that can be verified.",
      intro:
        "We do not publish fabricated reviews, reconstructed Google ratings or undocumented commercial results. Named references are shared only when verifiable and approved by the client.",
      items: [
        [
          "A written scope",
          "Deliverables, indicative timing and terms are set out before work begins.",
        ],
        ["Traceable feedback", "Project reviews and approval stages remain documented."],
        [
          "Verifiable evidence",
          "References and performance indicators are published only with client approval.",
        ],
      ],
      cta: "Discuss your project",
    },
    vi: {
      eyebrow: "Minh bạch và phương pháp",
      title: "Cam kết rõ ràng. Bằng chứng có thể kiểm chứng.",
      intro:
        "Chúng tôi không đăng đánh giá giả, điểm Google dựng lại hoặc kết quả kinh doanh không có tài liệu chứng minh. Chỉ chia sẻ tên khách hàng khi có thể xác minh và được khách hàng đồng ý.",
      items: [
        [
          "Phạm vi bằng văn bản",
          "Sản phẩm bàn giao, thời gian dự kiến và điều kiện được xác định trước khi bắt đầu.",
        ],
        ["Phản hồi có lưu vết", "Các bước duyệt và trao đổi dự án được ghi nhận."],
        ["Bằng chứng xác minh được", "Chỉ công bố tham chiếu và chỉ số khi khách hàng chấp thuận."],
      ],
      cta: "Trao đổi về dự án",
    },
    ar: {
      eyebrow: "الشفافية والمنهجية",
      title: "التزامات واضحة وأدلة قابلة للتحقق.",
      intro:
        "لا ننشر تقييمات مصطنعة أو درجات Google مُعاد تركيبها أو نتائج تجارية غير موثقة. لا نشارك أسماء العملاء إلا عند إمكانية التحقق والحصول على موافقتهم.",
      items: [
        ["نطاق عمل مكتوب", "تُحدد المخرجات والجدول المتوقع والشروط قبل بدء العمل."],
        ["ملاحظات موثقة", "تظل مراحل المراجعة والموافقة موثقة."],
        ["أدلة قابلة للتحقق", "لا تُنشر المراجع والمؤشرات إلا بعد موافقة العميل."],
      ],
      cta: "ناقش مشروعك",
    },
    ru: {
      eyebrow: "Прозрачность и методика",
      title: "Чёткие обязательства. Проверяемые подтверждения.",
      intro:
        "Мы не публикуем вымышленные отзывы, искусственные оценки Google или неподтверждённые коммерческие результаты. Именные рекомендации размещаются только с разрешения клиента и при возможности проверки.",
      items: [
        ["Письменный объём работ", "Результаты, сроки и условия фиксируются до начала работ."],
        ["Документированные отзывы", "Этапы проверки и согласования проекта сохраняются."],
        ["Проверяемые подтверждения", "Отзывы и показатели публикуются только с согласия клиента."],
      ],
      cta: "Обсудить проект",
    },
  }[lang] ?? {
    eyebrow: "Transparency & method",
    title: "Clear commitments. Verifiable evidence.",
    intro:
      "Client references and performance claims are published only when verified and approved.",
    items: [
      ["Written scope", "Deliverables and terms are agreed before work begins."],
      ["Traceable feedback", "Reviews and approval stages are documented."],
      ["Verifiable evidence", "References are shared only with client approval."],
    ],
    cta: "Discuss your project",
  };
  return (
    <section
      id="avis"
      className="border-t border-white/10 bg-[#101114] py-20 text-[#f8f6f0] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#c5a880]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">{copy.title}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">{copy.intro}</p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[.025] p-6"
              >
                <Icon className="h-5 w-5 text-[#c5a880]" strokeWidth={1.6} />
                <h3 className="mt-8 text-base font-medium">{copy.items[index][0]}</h3>
                <p className="mt-3 text-xs leading-6 text-white/60">{copy.items[index][1]}</p>
              </article>
            );
          })}
        </div>

        <a
          href="#quote"
          className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 px-5 py-3 text-xs font-medium text-[#e8dcc4] transition-colors hover:bg-white/5"
        >
          {copy.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
