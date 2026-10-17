import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Globe2, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/recrutement")({
  head: () => ({
    meta: [
      { title: "Affiliation & Recruitment — XR Agency" },
      { name: "description", content: "Join XR Agency as an independent sales partner or affiliate and earn 10% to 20% commission on business you refer." },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/recrutement" }],
  }),
  component: RecruitmentPage,
});

const COPY = {
  fr: {
    back: "Accueil", eyebrow: "XR / RECRUTEMENT & PROGRAMME D’AFFILIATION",
    title: "Générez des revenus.", emphasis: "Peu importe votre langue.",
    intro: "XR Agency recrute des commerciaux indépendants dans le monde entier et récompense ses clients et apporteurs d’affaires avec 10 % à 20 % du chiffre d’affaires généré, sous forme de réduction sur vos offres ou de commission.",
    whatsapp: "Postuler sur WhatsApp", email: "Postuler par e-mail",
    program: "PROGRAMME DE RECOMMANDATION & D’APPORT D’AFFAIRES", commission: "10 % à 20 % de commission",
    recommend: "Recommandez nos services (création de sites web, branding, SEO, Google Maps et robotique) à votre réseau ou à vos clients.",
    base: "10 % dès la première mise en relation", baseText: "Déduits de vos prestations ou versés sous forme de commission, selon les modalités convenues.",
    high: "Jusqu’à 20 % sur les projets d’envergure", highText: "Pour les refontes globales, les déploiements robotiques et les contrats annuels récurrents.",
    transparent: "100 % TRANSPARENT", tracking: "SUIVI COMMERCIAL ASSURÉ PAR XR",
    languages: "Toutes les langues acceptées", languagesText: "Français, anglais, espagnol, arabe, vietnamien, russe, mandarin… Nous travaillons avec une clientèle internationale.",
    unlimited: "Commissions sans plafond", unlimitedText: "Gagnez une commission sur chaque contrat signé : sites web, SEO, visibilité Google Maps, réseaux sociaux et solutions robotiques.",
    tools: "Outils & supports fournis", toolsText: "Fiches services, simulateurs, tarifs officiels et accompagnement direct par notre équipe commerciale.",
    join: "REJOIGNEZ L’ÉQUIPE COMMERCIALE", network: "Vous avez un réseau ? Valorisez-le.",
    joinText: "Commercial expérimenté, apporteur d’affaires, freelance ou client satisfait : vous pouvez commencer à recommander XR Agency dès aujourd’hui.",
    discuss: "Nous contacter sur WhatsApp", apply: "Candidater par e-mail",
    mailSubject: "Candidature / Programme d’affiliation — XR Agency",
    mailBody: "Bonjour XR Agency,\n\nJe souhaite postuler comme commercial indépendant / rejoindre votre programme d’affiliation.\n\nNom et prénom :\nLangues parlées :\nExpérience commerciale ou réseau :\nVille / Pays :\nWhatsApp :\n\nMerci,",
    waText: "Bonjour XR Agency, je souhaite postuler comme commercial indépendant / rejoindre votre programme d’affiliation (10 % à 20 % de commission).",
  },
  en: {
    back: "Home", eyebrow: "XR / RECRUITMENT & AFFILIATE PROGRAM",
    title: "Generate income.", emphasis: "Whatever your language.",
    intro: "XR Agency is recruiting independent sales partners worldwide and rewards clients and referral partners with 10% to 20% of the revenue generated, either as a discount on our services or as a commission.",
    whatsapp: "Apply on WhatsApp", email: "Apply by email",
    program: "REFERRAL & PARTNER PROGRAM", commission: "10% to 20% commission",
    recommend: "Recommend our services (website creation, branding, SEO, Google Maps and robotics) to your network or clients.",
    base: "10% from the first referral", baseText: "Applied as a discount on your services or paid as a commission, according to the agreed terms.",
    high: "Up to 20% on major projects", highText: "For full-scale website redesigns, robotics deployments and recurring annual contracts.",
    transparent: "100% TRANSPARENT", tracking: "SALES FOLLOW-UP MANAGED BY XR",
    languages: "All languages welcome", languagesText: "French, English, Spanish, Arabic, Vietnamese, Russian, Mandarin and more. We serve an international clientele.",
    unlimited: "Unlimited earning potential", unlimitedText: "Earn commission on every signed contract: websites, SEO, Google Maps visibility, social media and robotics solutions.",
    tools: "Tools & resources provided", toolsText: "Service sheets, quote simulators, official pricing and direct support from our sales team.",
    join: "JOIN THE SALES TEAM", network: "Have a network? Make it count.",
    joinText: "Whether you are an experienced salesperson, referral partner, freelancer or satisfied client, you can start recommending XR Agency today.",
    discuss: "Chat with us on WhatsApp", apply: "Apply by email",
    mailSubject: "Application / Affiliate Program — XR Agency",
    mailBody: "Hello XR Agency,\n\nI would like to apply as an independent sales partner / join your affiliate program.\n\nFull name:\nLanguages spoken:\nSales experience or network:\nCity / Country:\nWhatsApp:\n\nThank you,",
    waText: "Hello XR Agency, I would like to apply as an independent sales partner / join your affiliate program (10% to 20% commission).",
  },
  vi: {
    back: "Trang chủ", eyebrow: "XR / TUYỂN DỤNG & CHƯƠNG TRÌNH TIẾP THỊ LIÊN KẾT",
    title: "Tạo thêm thu nhập.", emphasis: "Dù bạn sử dụng ngôn ngữ nào.",
    intro: "XR Agency tuyển cộng tác viên kinh doanh độc lập trên toàn thế giới. Khách hàng và đối tác giới thiệu có thể nhận hoa hồng từ 10% đến 20% doanh thu mang về, dưới hình thức giảm giá dịch vụ hoặc thanh toán hoa hồng.",
    whatsapp: "Ứng tuyển qua WhatsApp", email: "Ứng tuyển qua email",
    program: "CHƯƠNG TRÌNH GIỚI THIỆU ĐỐI TÁC", commission: "Hoa hồng từ 10% đến 20%",
    recommend: "Giới thiệu dịch vụ của chúng tôi (thiết kế website, xây dựng thương hiệu, SEO, Google Maps và robot) cho mạng lưới quan hệ hoặc khách hàng của bạn.",
    base: "10% ngay từ lượt giới thiệu đầu tiên", baseText: "Được trừ vào dịch vụ hoặc thanh toán dưới dạng hoa hồng theo thỏa thuận.",
    high: "Lên đến 20% cho dự án lớn", highText: "Áp dụng cho dự án thiết kế lại toàn diện, triển khai robot và hợp đồng thường niên.",
    transparent: "MINH BẠCH 100%", tracking: "XR THEO DÕI VÀ HỖ TRỢ BÁN HÀNG",
    languages: "Chấp nhận mọi ngôn ngữ", languagesText: "Tiếng Pháp, tiếng Anh, tiếng Tây Ban Nha, tiếng Ả Rập, tiếng Việt, tiếng Nga, tiếng Trung và nhiều ngôn ngữ khác.",
    unlimited: "Hoa hồng không giới hạn", unlimitedText: "Nhận hoa hồng cho mỗi hợp đồng được ký: website, SEO, Google Maps, mạng xã hội và giải pháp robot.",
    tools: "Cung cấp công cụ & tài liệu", toolsText: "Tài liệu dịch vụ, công cụ dự toán, bảng giá chính thức và hỗ trợ trực tiếp từ đội ngũ kinh doanh.",
    join: "THAM GIA ĐỘI NGŨ KINH DOANH", network: "Bạn có mạng lưới quan hệ? Hãy tận dụng.",
    joinText: "Dù bạn là nhân viên kinh doanh, đối tác giới thiệu, freelancer hay khách hàng hài lòng, bạn có thể bắt đầu giới thiệu XR Agency ngay hôm nay.",
    discuss: "Trao đổi qua WhatsApp", apply: "Ứng tuyển qua email",
    mailSubject: "Ứng tuyển / Chương trình liên kết — XR Agency",
    mailBody: "Xin chào XR Agency,\n\nTôi muốn ứng tuyển làm cộng tác viên kinh doanh độc lập / tham gia chương trình liên kết.\n\nHọ và tên:\nNgôn ngữ sử dụng:\nKinh nghiệm kinh doanh hoặc mạng lưới quan hệ:\nThành phố / Quốc gia:\nWhatsApp:\n\nXin cảm ơn,",
    waText: "Xin chào XR Agency, tôi muốn ứng tuyển làm cộng tác viên kinh doanh độc lập / tham gia chương trình liên kết (hoa hồng 10% đến 20%).",
  },
  ar: {
    back: "الرئيسية", eyebrow: "XR / التوظيف وبرنامج الشراكة بالعمولة",
    title: "حقّق دخلاً إضافياً.", emphasis: "بأي لغة تتحدث.",
    intro: "تستقطب XR Agency شركاء مبيعات مستقلين حول العالم، وتكافئ العملاء وشركاء الإحالة بعمولة تتراوح بين 10% و20% من الإيرادات الناتجة، على شكل خصم على الخدمات أو دفعة عمولة.",
    whatsapp: "التقديم عبر واتساب", email: "التقديم عبر البريد الإلكتروني",
    program: "برنامج الإحالة والشراكة", commission: "عمولة من 10% إلى 20%",
    recommend: "رشّح خدماتنا (إنشاء المواقع، والهوية التجارية، وتحسين محركات البحث، وGoogle Maps، والروبوتات) لشبكتك أو لعملائك.",
    base: "10% ابتداءً من أول إحالة", baseText: "تُخصم من خدماتك أو تُدفع كعمولة وفقاً للشروط المتفق عليها.",
    high: "حتى 20% للمشاريع الكبرى", highText: "لإعادة تصميم المواقع بالكامل، ومشاريع الروبوتات، والعقود السنوية المتجددة.",
    transparent: "شفافية كاملة", tracking: "متابعة المبيعات من XR",
    languages: "جميع اللغات مرحّب بها", languagesText: "الفرنسية والإنجليزية والإسبانية والعربية والفيتنامية والروسية والصينية وغيرها. نخدم عملاء من مختلف أنحاء العالم.",
    unlimited: "عمولات بلا سقف", unlimitedText: "احصل على عمولة عن كل عقد موقّع: المواقع الإلكترونية، وSEO، وGoogle Maps، ووسائل التواصل الاجتماعي، وحلول الروبوتات.",
    tools: "أدوات وموارد متاحة", toolsText: "ملفات الخدمات، وأدوات إعداد عروض الأسعار، والأسعار الرسمية، ودعم مباشر من فريق المبيعات.",
    join: "انضم إلى فريق المبيعات", network: "لديك شبكة علاقات؟ استفد منها.",
    joinText: "سواء كنت مندوب مبيعات خبيراً أو شريك إحالة أو مستقلاً أو عميلاً راضياً، يمكنك البدء في ترشيح XR Agency اليوم.",
    discuss: "تواصل معنا عبر واتساب", apply: "التقديم عبر البريد الإلكتروني",
    mailSubject: "طلب انضمام / برنامج الشراكة — XR Agency",
    mailBody: "مرحباً XR Agency،\n\nأرغب في التقدم للعمل كشريك مبيعات مستقل / الانضمام إلى برنامج الشراكة بالعمولة.\n\nالاسم الكامل:\nاللغات التي أتحدثها:\nالخبرة التجارية أو شبكة العلاقات:\nالمدينة / الدولة:\nواتساب:\n\nشكراً لكم،",
    waText: "مرحباً XR Agency، أرغب في التقدم كشريك مبيعات مستقل / الانضمام إلى برنامج الشراكة (عمولة من 10% إلى 20%).",
  },
  ru: {
    back: "Главная", eyebrow: "XR / НАБОР СОТРУДНИКОВ И ПАРТНЁРСКАЯ ПРОГРАММА",
    title: "Создавайте дополнительный доход.", emphasis: "На любом языке.",
    intro: "XR Agency приглашает независимых партнёров по продажам со всего мира. Клиенты и партнёры, приводящие заказчиков, получают 10–20% от привлечённой выручки в виде скидки на наши услуги или денежного вознаграждения.",
    whatsapp: "Откликнуться в WhatsApp", email: "Откликнуться по электронной почте",
    program: "ПАРТНЁРСКАЯ И РЕФЕРАЛЬНАЯ ПРОГРАММА", commission: "Комиссия от 10% до 20%",
    recommend: "Рекомендуйте наши услуги (создание сайтов, брендинг, SEO, Google Maps и робототехника) своим знакомым и клиентам.",
    base: "10% уже за первое знакомство", baseText: "Сумма вычитается из стоимости ваших услуг или выплачивается как комиссия согласно согласованным условиям.",
    high: "До 20% за крупные проекты", highText: "Для комплексного редизайна, внедрения робототехники и ежегодных контрактов с продлением.",
    transparent: "ПОЛНАЯ ПРОЗРАЧНОСТЬ", tracking: "XR СОПРОВОЖДАЕТ ПРОДАЖИ",
    languages: "Принимаются любые языки", languagesText: "Французский, английский, испанский, арабский, вьетнамский, русский, китайский и другие. Мы работаем с международными клиентами.",
    unlimited: "Комиссия без ограничений", unlimitedText: "Получайте комиссию за каждый подписанный договор: сайты, SEO, Google Maps, социальные сети и робототехнические решения.",
    tools: "Инструменты и материалы", toolsText: "Описания услуг, калькуляторы предложений, официальные цены и поддержка нашей команды продаж.",
    join: "ПРИСОЕДИНЯЙТЕСЬ К КОМАНДЕ ПРОДАЖ", network: "Есть полезные знакомства? Используйте их.",
    joinText: "Вы можете рекомендовать XR Agency уже сегодня — будь вы опытным продавцом, партнёром по рекомендациям, фрилансером или довольным клиентом.",
    discuss: "Написать в WhatsApp", apply: "Откликнуться по электронной почте",
    mailSubject: "Заявка / Партнёрская программа — XR Agency",
    mailBody: "Здравствуйте, XR Agency!\n\nЯ хочу стать независимым партнёром по продажам / присоединиться к партнёрской программе.\n\nИмя и фамилия:\nЯзыки:\nОпыт продаж или круг контактов:\nГород / страна:\nWhatsApp:\n\nСпасибо,",
    waText: "Здравствуйте, XR Agency! Я хочу стать независимым партнёром по продажам / присоединиться к партнёрской программе (комиссия 10–20%).",
  },
} as const;

function RecruitmentPage() {
  const { lang } = useLang();
  const c = COPY[lang] ?? COPY.fr;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(c.mailBody)}`;
  const waAffiliate = `${CONTACT.whatsapp}?text=${encodeURIComponent(c.waText)}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Nav />
      <main className="pt-28">
        <section className="relative overflow-hidden border-b border-border/70">
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 76% 24%, rgba(16,185,129,.12), transparent 30%), radial-gradient(circle at 12% 70%, rgba(255,255,255,.05), transparent 30%)" }} />
          <div className="relative mx-auto grid min-h-[75vh] max-w-[1500px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-12">
            <div>
              <Link to="/" className="label-mono inline-flex items-center gap-2 text-[8px] tracking-[.18em] text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
              </Link>
              <span className="mt-8 block label-mono text-[9px] tracking-[.32em] text-emerald-500 font-bold">{c.eyebrow}</span>
              <h1 className="display-serif mt-5 max-w-5xl text-[clamp(3.5rem,7.5vw,7.8rem)] leading-[.82] tracking-[-.07em]">
                {c.title}<br /><em className="not-italic text-emerald-500">{c.emphasis}</em>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{c.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={waAffiliate} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-7 py-4 text-[9.5px] font-bold uppercase tracking-[.14em] text-white shadow-xl transition hover:bg-emerald-500">
                  <MessageCircle className="h-4 w-4" /> {c.whatsapp}
                </a>
                <a href={mailto} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground transition hover:border-primary">
                  {c.email} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-card via-background to-card p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <span className="label-mono text-[8px] tracking-[.25em] text-emerald-500 font-bold">{c.program}</span>
              <h3 className="display-serif mt-3 text-3xl sm:text-4xl">{c.commission}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.recommend}</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white font-bold text-base">10%</span>
                  <div><h4 className="text-xs font-bold text-foreground">{c.base}</h4><p className="text-[10px] text-muted-foreground">{c.baseText}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-foreground text-background font-bold text-base">20%</span>
                  <div><h4 className="text-xs font-bold text-foreground">{c.high}</h4><p className="text-[10px] text-muted-foreground">{c.highText}</p></div>
                </div>
              </div>
              <div className="mt-6 border-t border-border/70 pt-4 flex items-center justify-between text-[9px]">
                <span className="label-mono text-muted-foreground">{c.transparent}</span><span className="label-mono font-bold text-emerald-500">{c.tracking}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-sm">
              <Globe2 className="h-6 w-6 text-emerald-500" /><h3 className="mt-4 text-xl font-bold">{c.languages}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{c.languagesText}</p>
            </div>
            <div className="rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-sm">
              <TrendingUp className="h-6 w-6 text-emerald-500" /><h3 className="mt-4 text-xl font-bold">{c.unlimited}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{c.unlimitedText}</p>
            </div>
            <div className="rounded-[2rem] border border-border/80 bg-card/60 p-7 shadow-sm">
              <Sparkles className="h-6 w-6 text-emerald-500" /><h3 className="mt-4 text-xl font-bold">{c.tools}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{c.toolsText}</p>
            </div>
          </div>
          <div className="mt-20 rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-card to-background p-8 sm:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div><span className="label-mono text-[8px] tracking-[.3em] text-emerald-500 font-bold">{c.join}</span><h2 className="display-serif mt-3 text-4xl sm:text-6xl text-foreground">{c.network}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{c.joinText}</p></div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a href={waAffiliate} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-4 text-xs font-bold uppercase tracking-[.14em] text-white shadow-xl hover:bg-emerald-500"><MessageCircle className="h-4 w-4" /> {c.discuss}</a>
                <a href={mailto} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-4 label-mono text-[9px] font-semibold tracking-[.12em] text-foreground hover:bg-muted">{c.apply}</a>
              </div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </div>
  );
}
