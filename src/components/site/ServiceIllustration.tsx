import { ArrowUpRight, Bot, Gauge, Globe2, MapPin, Megaphone, Palette, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { XR_PHOTOS } from "@/lib/photography";
import { Parallax } from "./primitives";
import { useLang, type Lang } from "@/lib/i18n";

type Props = { service: string; title?: string };
type Meta = { number: string; label: string; photo?: keyof typeof XR_PHOTOS; position?: string };

const META: Record<string, Meta> = {
  websites: { number: "01", label: "WEB DESIGN", photo: "websites", position: "50% 42%" },
  branding: { number: "02", label: "BRANDING", photo: "branding", position: "50% 50%" },
  seo: { number: "03", label: "SEO", photo: "seo", position: "50% 45%" },
  maps: { number: "04", label: "GOOGLE MAPS", photo: "maps", position: "50% 18%" },
  social: { number: "05", label: "SOCIAL MEDIA", photo: "social", position: "50% 45%" },
  maintenance: { number: "06", label: "WEBCARE", photo: "maintenance", position: "50% 50%" },
  robotics: { number: "07", label: "ROBOTIQUE", photo: "robotics", position: "50% 50%" },
  refonte: { number: "08", label: "REFONTE", photo: "refonte", position: "50% 46%" },
  ads: { number: "09", label: "GOOGLE ADS", photo: "ads", position: "50% 48%" },
  strategy: { number: "10", label: "STRATÉGIE", photo: "strategy", position: "50% 42%" },
  ai: { number: "11", label: "IA", photo: "ai", position: "50% 50%" },
};


const VISUAL_COPY: Record<string, Partial<Record<Lang, string>>> = {
  "01 / WEB DESIGN": { en:"01 / WEB DESIGN",vi:"01 / THIẾT KẾ WEB",ar:"01 / تصميم المواقع",ru:"01 / ВЕБ-ДИЗАЙН" },
  "02 / BRANDING": { en:"02 / BRANDING",vi:"02 / THƯƠNG HIỆU",ar:"02 / الهوية التجارية",ru:"02 / БРЕНДИНГ" },
  "03 / SEO NATUREL": { en:"03 / ORGANIC SEO",vi:"03 / SEO TỰ NHIÊN",ar:"03 / تحسين البحث العضوي",ru:"03 / ОРГАНИЧЕСКОЕ SEO" },
  "05 / SOCIAL MEDIA": { en:"05 / SOCIAL MEDIA",vi:"05 / MẠNG XÃ HỘI",ar:"05 / وسائل التواصل الاجتماعي",ru:"05 / СОЦСЕТИ" },
  "06 / WEBCARE": { en:"06 / WEBCARE",vi:"06 / WEBCARE",ar:"06 / الصيانة التقنية",ru:"06 / WEBCARE" },
  "07 / ROBOTIQUE": { en:"07 / ROBOTICS",vi:"07 / ROBOT",ar:"07 / الروبوتات",ru:"07 / РОБОТОТЕХНИКА" },
  "08 / REFONTE": { en:"08 / REDESIGN",vi:"08 / THIẾT KẾ LẠI",ar:"08 / إعادة التصميم",ru:"08 / РЕДИЗАЙН" },
  "09 / ADS": { en:"09 / ADS",vi:"09 / QUẢNG CÁO",ar:"09 / الإعلانات",ru:"09 / РЕКЛАМА" },
  "10 / STRATÉGIE": { en:"10 / STRATEGY",vi:"10 / CHIẾN LƯỢC",ar:"10 / الاستراتيجية",ru:"10 / СТРАТЕГИЯ" },
  "11 / IA": { en:"11 / AI",vi:"11 / AI",ar:"11 / الذكاء الاصطناعي",ru:"11 / ИИ" },
  "ARCHITECTURE ULTRA-RAPIDE": { en:"ULTRA-FAST ARCHITECTURE",vi:"KIẾN TRÚC SIÊU NHANH",ar:"بنية فائقة السرعة",ru:"СВЕРХБЫСТРАЯ АРХИТЕКТУРА" },
  "Vitesse < 0.4s · Mobile-First": { en:"Load < 0.4s · Mobile-first",vi:"Tải < 0,4 giây · Ưu tiên di động",ar:"تحميل أقل من 0.4 ثانية · أولوية للهاتف",ru:"Загрузка < 0,4 с · Сначала мобильные" },
  "LIVRABLES CLÉ EN MAIN": { en:"READY-TO-USE DELIVERABLES",vi:"SẢN PHẨM BÀN GIAO SẴN SÀNG",ar:"مخرجات جاهزة للاستخدام",ru:"ГОТОВЫЕ РЕЗУЛЬТАТЫ" },
  "Vitrine, Business & E-commerce": { en:"Showcase, business & e-commerce",vi:"Website giới thiệu, doanh nghiệp & thương mại điện tử",ar:"موقع تعريفي وأعمال وتجارة إلكترونية",ru:"Сайт-визитка, бизнес-сайт и интернет-магазин" },
  "Design unique 100% sur-mesure, CMS moderne, formulaires interactifs et paiements Stripe intégrés.": { en:"Fully bespoke design, modern CMS, interactive forms and integrated Stripe payments.",vi:"Thiết kế riêng hoàn toàn, CMS hiện đại, biểu mẫu tương tác và thanh toán Stripe tích hợp.",ar:"تصميم مخصص بالكامل ونظام إدارة محتوى حديث ونماذج تفاعلية ومدفوعات Stripe مدمجة.",ru:"Полностью индивидуальный дизайн, современная CMS, интерактивные формы и встроенные платежи Stripe." },
  "SCORE TECHNIQUE": { en:"TECHNICAL SCORE",vi:"ĐIỂM KỸ THUẬT",ar:"التقييم التقني",ru:"ТЕХНИЧЕСКАЯ ОЦЕНКА" },
  "CHARGEMENT": { en:"LOAD TIME",vi:"THỜI GIAN TẢI",ar:"وقت التحميل",ru:"ВРЕМЯ ЗАГРУЗКИ" },
  "RGPD OK": { en:"GDPR READY",vi:"ĐẠT GDPR",ar:"متوافق مع GDPR",ru:"СООТВЕТСТВИЕ GDPR" },
  "PRÊT À CONVERTIR": { en:"READY TO CONVERT",vi:"SẴN SÀNG CHUYỂN ĐỔI",ar:"جاهز للتحويل",ru:"ГОТОВ К КОНВЕРСИИ" },
  "STUDIO BRANDING & DIRECTION ARTISTIQUE": { en:"BRANDING & ART DIRECTION STUDIO",vi:"STUDIO THƯƠNG HIỆU & ĐỊNH HƯỚNG NGHỆ THUẬT",ar:"استوديو الهوية والتوجيه الفني",ru:"СТУДИЯ БРЕНДИНГА И АРТ-ДИРЕКШНА" },
  "ATELIER TYPOGRAPHIE & COULEURS": { en:"TYPE & COLOUR STUDIO",vi:"XƯỞNG KIỂU CHỮ & MÀU SẮC",ar:"استوديو الخطوط والألوان",ru:"СТУДИЯ ТИПОГРАФИКИ И ЦВЕТА" },
  "Papeterie, Packaging & Brand Book": { en:"Stationery, packaging & brand book",vi:"Văn phòng phẩm, bao bì & Brand Book",ar:"المطبوعات والتغليف ودليل العلامة",ru:"Полиграфия, упаковка и брендбук" },
  "HARMONIE CHROMATIQUE EXCLUSIVE": { en:"EXCLUSIVE COLOUR HARMONY",vi:"HÒA SẮC ĐỘC QUYỀN",ar:"تناغم لوني حصري",ru:"ЭКСКЛЮЗИВНАЯ ЦВЕТОВАЯ ГАРМОНИЯ" },
  "Livrables Vectoriels HD": { en:"HD vector deliverables",vi:"Tệp vector HD bàn giao",ar:"ملفات متجهة عالية الدقة",ru:"Векторные материалы HD" },
  "PRÊT À IMPRIMER": { en:"PRINT-READY",vi:"SẴN SÀNG IN",ar:"جاهز للطباعة",ru:"ГОТОВ К ПЕЧАТИ" },
  "IDENTITÉ DE PRESTIGE": { en:"PREMIUM IDENTITY",vi:"NHẬN DIỆN CAO CẤP",ar:"هوية متميزة",ru:"ПРЕМИАЛЬНАЯ АЙДЕНТИКА" },
  "PILOTAGE ACQUISITION ORGANIQUE": { en:"ORGANIC ACQUISITION MANAGEMENT",vi:"QUẢN LÝ THU HÚT TỰ NHIÊN",ar:"إدارة الاكتساب العضوي",ru:"УПРАВЛЕНИЕ ОРГАНИЧЕСКИМ ПРИВЛЕЧЕНИЕМ" },
  "Top 1 Google · Croissance +184%": { en:"Google #1 · Growth +184%",vi:"Top 1 Google · Tăng trưởng +184%",ar:"المركز الأول على Google · نمو +184%",ru:"Google №1 · Рост +184%" },
  "Certifié A+": { en:"A+ rated",vi:"Xếp hạng A+",ar:"تصنيف A+",ru:"Рейтинг A+" },
  "Audit sémantique + Cocon SEO + Backlinks": { en:"Semantic audit + SEO silo + backlinks",vi:"Audit ngữ nghĩa + cấu trúc SEO + backlink",ar:"تدقيق دلالي + هيكلة SEO + روابط خلفية",ru:"Семантический аудит + SEO-кластер + обратные ссылки" },
  "Dès 299 €/m": { en:"From 299 € / month",vi:"Từ 299 € / tháng",ar:"ابتداءً من 299 € شهريًا",ru:"От 299 € в месяц" },
  "À PARTIR DE 299 €/MOIS": { en:"FROM 299 € / MONTH",vi:"TỪ 299 € / THÁNG",ar:"ابتداءً من 299 € شهريًا",ru:"ОТ 299 € В МЕСЯЦ" },
  "STUDIO COMMUNITY MANAGEMENT · TOURNAGES & REELS 4K": { en:"COMMUNITY MANAGEMENT · 4K FILMING & REELS",vi:"QUẢN LÝ CỘNG ĐỒNG · QUAY & REELS 4K",ar:"إدارة المجتمع · تصوير ومقاطع Reels بدقة 4K",ru:"КОМЬЮНИТИ-МЕНЕДЖМЕНТ · СЪЁМКА И REELS 4K" },
  "Feed & Reels 4K": { en:"Feed & 4K Reels",vi:"Feed & Reels 4K",ar:"المنشورات وReels بدقة 4K",ru:"Лента и Reels 4K" },
  "Engagement": { en:"Engagement",vi:"Tương tác",ar:"التفاعل",ru:"Вовлечённость" },
  "Formats Verticaux": { en:"Vertical formats",vi:"Định dạng dọc",ar:"تنسيقات عمودية",ru:"Вертикальные форматы" },
  "Vues vidéo": { en:"Video views",vi:"Lượt xem video",ar:"مشاهدات الفيديو",ru:"Просмотры видео" },
  "B2B & Local": { en:"B2B & local",vi:"B2B & địa phương",ar:"الأعمال بين الشركات والمحلي",ru:"B2B и локальный рынок" },
  "Portée qualifiée": { en:"Qualified reach",vi:"Phạm vi tiếp cận chất lượng",ar:"وصول مؤهل",ru:"Целевой охват" },
  "Accompagnement avec engagement garanti": { en:"Managed support with a clear commitment",vi:"Đồng hành với cam kết rõ ràng",ar:"مرافقة مع التزام واضح",ru:"Сопровождение с чёткими обязательствами" },
  "· Planning éditorial, tournages, montage et modération active": { en:"· Editorial planning, filming, editing and active moderation",vi:"· Lịch nội dung, quay phim, dựng và quản lý tương tác",ar:"· تخطيط تحريري وتصوير ومونتاج وإدارة نشطة",ru:"· Контент-план, съёмка, монтаж и активная модерация" },
  "ENGAGEMENT MINIMUM SUR-MESURE": { en:"TAILORED MINIMUM COMMITMENT",vi:"CAM KẾT TỐI THIỂU THEO NHU CẦU",ar:"الحد الأدنى للالتزام حسب الحاجة",ru:"ИНДИВИДУАЛЬНЫЙ МИНИМАЛЬНЫЙ СРОК" },
  "SUPERVISION CLOUD DÉDIÉE · SÉCURITÉ & MAINTENANCE": { en:"DEDICATED CLOUD MONITORING · SECURITY & MAINTENANCE",vi:"GIÁM SÁT CLOUD RIÊNG · BẢO MẬT & BẢO TRÌ",ar:"مراقبة سحابية مخصصة · الأمان والصيانة",ru:"ВЫДЕЛЕННЫЙ ОБЛАЧНЫЙ МОНИТОРИНГ · БЕЗОПАСНОСТЬ И ОБСЛУЖИВАНИЕ" },
  "TEMPS DE RÉPONSE": { en:"RESPONSE TIME",vi:"THỜI GIAN PHẢN HỒI",ar:"زمن الاستجابة",ru:"ВРЕМЯ ОТКЛИКА" },
  "DISPONIBILITÉ": { en:"AVAILABILITY",vi:"TÍNH SẴN SÀNG",ar:"التوافر",ru:"ДОСТУПНОСТЬ" },
  "SÉCURITÉ SSL": { en:"SSL SECURITY",vi:"BẢO MẬT SSL",ar:"أمان SSL",ru:"БЕЗОПАСНОСТЬ SSL" },
  "SLA Contractuel": { en:"Contractual SLA",vi:"SLA theo hợp đồng",ar:"اتفاقية مستوى خدمة تعاقدية",ru:"Договорный SLA" },
  "Protection WAF": { en:"WAF protection",vi:"Bảo vệ WAF",ar:"حماية WAF",ru:"Защита WAF" },
  "Intervention Proactive & Mises à Jour Mensuelles": { en:"Proactive intervention & monthly updates",vi:"Can thiệp chủ động & cập nhật hàng tháng",ar:"تدخل استباقي وتحديثات شهرية",ru:"Проактивное обслуживание и ежемесячные обновления" },
  "Sauvegardes quotidiennes redondantes, restauration immédiate, modifications régulières de contenus et surveillance continue contre les cybermenaces.": { en:"Redundant daily backups, immediate recovery, regular content updates and continuous cyber-threat monitoring.",vi:"Sao lưu hàng ngày dự phòng, khôi phục tức thì, cập nhật nội dung định kỳ và giám sát mối đe dọa liên tục.",ar:"نسخ احتياطية يومية مكررة واستعادة فورية وتحديثات محتوى منتظمة ومراقبة مستمرة للتهديدات.",ru:"Ежедневные резервные копии с дублированием, быстрое восстановление, регулярные обновления контента и постоянный мониторинг киберугроз." },
  "SÉRÉNITÉ TOTALE DÈS 29 €/MOIS": { en:"PEACE OF MIND FROM 29 € / MONTH",vi:"AN TÂM TỪ 29 € / THÁNG",ar:"راحة بال ابتداءً من 29 € شهريًا",ru:"СПОКОЙСТВИЕ ОТ 29 € В МЕСЯЦ" },
  "ROBOTS DE SERVICE · ÉLÉGANCE OPÉRATIONNELLE": { en:"SERVICE ROBOTS · OPERATIONAL ELEGANCE",vi:"ROBOT DỊCH VỤ · VẬN HÀNH TINH TẾ",ar:"روبوتات الخدمة · أناقة تشغيلية",ru:"СЕРВИСНЫЕ РОБОТЫ · ЭФФЕКТИВНАЯ ЭЛЕГАНТНОСТЬ" },
  "DISPONIBLE DÉMO": { en:"DEMO AVAILABLE",vi:"CÓ BẢN DEMO",ar:"عرض تجريبي متاح",ru:"ДЕМО ДОСТУПНО" },
  "NAVIGATION LIDAR 3D DYNAMIQUE": { en:"DYNAMIC 3D LIDAR NAVIGATION",vi:"ĐIỀU HƯỚNG LIDAR 3D ĐỘNG",ar:"ملاحة LIDAR ثلاثية الأبعاد ديناميكية",ru:"ДИНАМИЧЕСКАЯ 3D-НАВИГАЦИЯ LIDAR" },
  "Évitement d'obstacles en temps réel": { en:"Real-time obstacle avoidance",vi:"Tránh chướng ngại vật theo thời gian thực",ar:"تجنب العوائق في الوقت الفعلي",ru:"Объезд препятствий в реальном времени" },
  "Prêt à l'emploi": { en:"Ready to deploy",vi:"Sẵn sàng sử dụng",ar:"جاهز للاستخدام",ru:"Готов к работе" },
  "Capacités de Terrain": { en:"Operational capabilities",vi:"Khả năng vận hành",ar:"القدرات التشغيلية",ru:"Рабочие возможности" },
  "Service en salle, port de plateaux lourds (jusqu'à 40 kg), accueil VIP et guidage interactif des clients.": { en:"Table service, carrying heavy trays (up to 40 kg), VIP reception and interactive guest guidance.",vi:"Phục vụ bàn, mang khay nặng (tối đa 40 kg), đón tiếp VIP và hướng dẫn khách tương tác.",ar:"خدمة الطاولات وحمل الصواني الثقيلة (حتى 40 كجم) واستقبال كبار الشخصيات وإرشاد الضيوف.",ru:"Обслуживание в зале, перенос тяжёлых подносов (до 40 кг), VIP-встреча и интерактивная навигация гостей." },
  "0 Bruit": { en:"Zero noise",vi:"Không tiếng ồn",ar:"دون ضوضاء",ru:"Без шума" },
  "Moteurs silencieux": { en:"Silent motors",vi:"Động cơ yên tĩnh",ar:"محركات صامتة",ru:"Бесшумные двигатели" },
  "100% Sûr": { en:"100% safe",vi:"An toàn 100%",ar:"آمن بنسبة 100%",ru:"100% безопасно" },
  "Capteurs 360°": { en:"360° sensors",vi:"Cảm biến 360°",ar:"مستشعرات 360°",ru:"Датчики 360°" },
  "Location événementielle ou vente": { en:"Event rental or purchase",vi:"Thuê sự kiện hoặc mua",ar:"تأجير للفعاليات أو شراء",ru:"Аренда для мероприятий или покупка" },
  "HÔTELLERIE · RESTAURATION · ÉVÉNEMENTS VIP · SALONS": { en:"HOSPITALITY · RESTAURANTS · VIP EVENTS · TRADE SHOWS",vi:"LƯU TRÚ · NHÀ HÀNG · SỰ KIỆN VIP · TRIỂN LÃM",ar:"الضيافة · المطاعم · فعاليات VIP · المعارض",ru:"ОТЕЛИ · РЕСТОРАНЫ · VIP-МЕРОПРИЯТИЯ · ВЫСТАВКИ" },
  "ESSAI GRATUIT SUR SITE POSSIBLE": { en:"ON-SITE TRIAL MAY BE AVAILABLE",vi:"CÓ THỂ THỬ NGHIỆM TẠI CHỖ",ar:"قد تتوفر تجربة مجانية في الموقع",ru:"ВОЗМОЖНО БЕСПЛАТНОЕ ТЕСТИРОВАНИЕ НА МЕСТЕ" },
  "AUDIT & TRANSFORMATION DIGITALE": { en:"DIGITAL AUDIT & TRANSFORMATION",vi:"AUDIT & CHUYỂN ĐỔI SỐ",ar:"التدقيق والتحول الرقمي",ru:"ЦИФРОВОЙ АУДИТ И ТРАНСФОРМАЦИЯ" },
  "AVANT REFONTE": { en:"BEFORE REDESIGN",vi:"TRƯỚC KHI THIẾT KẾ LẠI",ar:"قبل إعادة التصميم",ru:"ДО РЕДИЗАЙНА" },
  "Site Obsolète": { en:"Outdated website",vi:"Website lỗi thời",ar:"موقع قديم",ru:"Устаревший сайт" },
  "• Temps de chargement : 4.8s": { en:"• Load time: 4.8s",vi:"• Thời gian tải: 4,8 giây",ar:"• وقت التحميل: 4.8 ثانية",ru:"• Время загрузки: 4,8 с" },
  "• Mobile non optimisé": { en:"• Mobile not optimised",vi:"• Chưa tối ưu di động",ar:"• غير محسّن للهاتف",ru:"• Не оптимизирован для мобильных" },
  "• Taux de conversion : 0.8%": { en:"• Conversion rate: 0.8%",vi:"• Tỷ lệ chuyển đổi: 0,8%",ar:"• معدل التحويل: 0.8%",ru:"• Конверсия: 0,8%" },
  "APRÈS XR REFONTE": { en:"AFTER XR REDESIGN",vi:"SAU KHI XR THIẾT KẾ LẠI",ar:"بعد إعادة تصميم XR",ru:"ПОСЛЕ РЕДИЗАЙНА XR" },
  "Architecture Next-Gen": { en:"Next-gen architecture",vi:"Kiến trúc thế hệ mới",ar:"بنية الجيل التالي",ru:"Архитектура нового поколения" },
  "• Temps de chargement : 0.3s": { en:"• Load time: 0.3s",vi:"• Thời gian tải: 0,3 giây",ar:"• وقت التحميل: 0.3 ثانية",ru:"• Время загрузки: 0,3 с" },
  "• 100% Mobile-First & Fluide": { en:"• 100% mobile-first & fluid",vi:"• 100% ưu tiên di động & mượt mà",ar:"• أولوية كاملة للهاتف وتجربة سلسة",ru:"• Полный приоритет мобильным устройствам и плавность" },
  "• Taux de conversion : 4.6% (×5.7)": { en:"• Conversion rate: 4.6% (×5.7)",vi:"• Tỷ lệ chuyển đổi: 4,6% (×5,7)",ar:"• معدل التحويل: 4.6% (×5.7)",ru:"• Конверсия: 4,6% (×5,7)" },
  "Migration sans perte de trafic ni de SEO existant": { en:"Migration without losing traffic or existing SEO",vi:"Di chuyển mà không mất lưu lượng hoặc SEO hiện có",ar:"نقل دون فقدان الزيارات أو تحسين البحث الحالي",ru:"Миграция без потери трафика и существующего SEO" },
  "ZÉRO REGRESSION": { en:"ZERO REGRESSION",vi:"KHÔNG SUY GIẢM",ar:"دون تراجع",ru:"БЕЗ РЕГРЕССИИ" },
  "AUDIT UX · REFONTE CODE · CONVERSIONS BOOSTÉES": { en:"UX AUDIT · CODE REDESIGN · IMPROVED CONVERSIONS",vi:"AUDIT UX · VIẾT LẠI CODE · TĂNG CHUYỂN ĐỔI",ar:"تدقيق UX · إعادة بناء الكود · تحسين التحويل",ru:"UX-АУДИТ · ПЕРЕРАБОТКА КОДА · РОСТ КОНВЕРСИИ" },
  "ON RECONSTRUIT POUR GAGNER": { en:"REBUILD TO WIN",vi:"XÂY DỰNG LẠI ĐỂ BỨT PHÁ",ar:"نعيد البناء لتحقيق النجاح",ru:"ПЕРЕСОЗДАЁМ ДЛЯ РЕЗУЛЬТАТА" },
  "CTR MOYEN": { en:"AVERAGE CTR",vi:"CTR TRUNG BÌNH",ar:"متوسط CTR",ru:"СРЕДНИЙ CTR" },
  "COÛT PAR LEAD": { en:"COST PER LEAD",vi:"CHI PHÍ MỖI LEAD",ar:"تكلفة العميل المحتمل",ru:"СТОИМОСТЬ ЛИДА" },
  "RETOUR / INVEST.": { en:"RETURN / INVESTMENT",vi:"LỢI NHUẬN / ĐẦU TƯ",ar:"العائد / الاستثمار",ru:"ОТДАЧА / ИНВЕСТИЦИИ" },
  "Rentabilité nette": { en:"Net profitability",vi:"Khả năng sinh lời ròng",ar:"الربحية الصافية",ru:"Чистая рентабельность" },
  "Campagnes Précises & Mots-Clés Intentionnistes": { en:"Precise campaigns & high-intent keywords",vi:"Chiến dịch chính xác & từ khóa có ý định mua",ar:"حملات دقيقة وكلمات مفتاحية ذات نية عالية",ru:"Точные кампании и ключевые слова с высоким намерением" },
  "TRACKING SERVER-SIDE": { en:"SERVER-SIDE TRACKING",vi:"THEO DÕI PHÍA MÁY CHỦ",ar:"تتبع من جانب الخادم",ru:"СЕРВЕРНОЕ ОТСЛЕЖИВАНИЕ" },
  "Ciblage ultra-qualifié à fort pouvoir d'achat, A/B testing continu des accroches et landing pages dédiées à forte conversion.": { en:"Highly qualified targeting, continuous A/B testing of messages and dedicated high-conversion landing pages.",vi:"Nhắm mục tiêu chất lượng cao, A/B testing liên tục và landing page tối ưu chuyển đổi.",ar:"استهداف عالي الجودة واختبارات A/B مستمرة للرسائل وصفحات هبوط مخصصة للتحويل.",ru:"Точный таргетинг, постоянные A/B-тесты сообщений и посадочные страницы с высокой конверсией." },
  "SEARCH · SHOPPING · REMARKETING · SCALING": { en:"SEARCH · SHOPPING · REMARKETING · SCALING",vi:"SEARCH · SHOPPING · REMARKETING · MỞ RỘNG",ar:"البحث · التسوق · إعادة الاستهداف · التوسع",ru:"ПОИСК · SHOPPING · РЕТАРГЕТИНГ · МАСШТАБИРОВАНИЕ" },
  "ACQUISITION RENTABLE & MESURABLE": { en:"PROFITABLE, MEASURABLE ACQUISITION",vi:"THU HÚT KHÁCH HÀNG CÓ LỜI & ĐO LƯỜNG ĐƯỢC",ar:"اكتساب عملاء مربح وقابل للقياس",ru:"РЕНТАБЕЛЬНОЕ И ИЗМЕРИМОЕ ПРИВЛЕЧЕНИЕ" },
  "STRATÉGIE DIGITALE & EXPANSION": { en:"DIGITAL STRATEGY & EXPANSION",vi:"CHIẾN LƯỢC SỐ & MỞ RỘNG",ar:"الاستراتيجية الرقمية والتوسع",ru:"ЦИФРОВАЯ СТРАТЕГИЯ И РАСШИРЕНИЕ" },
  "PLAN D'ACTION CONCRET · KPIS CHIFFRÉS · ROADMAP 90J": { en:"CONCRETE ACTION PLAN · MEASURABLE KPIS · 90-DAY ROADMAP",vi:"KẾ HOẠCH HÀNH ĐỘNG · KPI CỤ THỂ · LỘ TRÌNH 90 NGÀY",ar:"خطة عمل واضحة · مؤشرات أداء رقمية · خارطة طريق 90 يومًا",ru:"КОНКРЕТНЫЙ ПЛАН · ИЗМЕРИМЫЕ KPI · ДОРОЖНАЯ КАРТА НА 90 ДНЕЙ" },
  "DIRECTION STRATÉGIQUE CLAIRE": { en:"CLEAR STRATEGIC DIRECTION",vi:"ĐỊNH HƯỚNG CHIẾN LƯỢC RÕ RÀNG",ar:"توجيه استراتيجي واضح",ru:"ЧЁТКОЕ СТРАТЕГИЧЕСКОЕ НАПРАВЛЕНИЕ" },
  "INTELLIGENCE ARTIFICIELLE & AUTOMATISATION": { en:"ARTIFICIAL INTELLIGENCE & AUTOMATION",vi:"TRÍ TUỆ NHÂN TẠO & TỰ ĐỘNG HÓA",ar:"الذكاء الاصطناعي والأتمتة",ru:"ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ И АВТОМАТИЗАЦИЯ" },
  "Capture & Triage": { en:"Capture & triage",vi:"Thu thập & phân loại",ar:"الالتقاط والفرز",ru:"Сбор и сортировка" },
  "Qualification automatique des leads entrants 24/7": { en:"Automatic qualification of inbound leads 24/7",vi:"Tự động phân loại lead đầu vào 24/7",ar:"تأهيل تلقائي للعملاء المحتملين الواردين على مدار الساعة",ru:"Автоматическая квалификация входящих лидов 24/7" },
  "RAG & Connaissance": { en:"RAG & knowledge",vi:"RAG & tri thức",ar:"RAG والمعرفة",ru:"RAG и база знаний" },
  "Réponses ultra-précises basées sur vos documents": { en:"Highly precise answers based on your documents",vi:"Câu trả lời chính xác dựa trên tài liệu của bạn",ar:"إجابات دقيقة للغاية تستند إلى مستنداتك",ru:"Точные ответы на основе ваших документов" },
  "Workflows Métier": { en:"Business workflows",vi:"Quy trình nghiệp vụ",ar:"سير العمل التجاري",ru:"Бизнес-процессы" },
  "Génération automatique de devis et synchronisation": { en:"Automatic quote generation and synchronisation",vi:"Tự động tạo báo giá và đồng bộ hóa",ar:"إنشاء عروض الأسعار والمزامنة تلقائيًا",ru:"Автоматическое создание смет и синхронизация" },
  "TRANSFORMATION IA IMMÉDIATE": { en:"IMMEDIATE AI TRANSFORMATION",vi:"CHUYỂN ĐỔI AI NGAY LẬP TỨC",ar:"تحول فوري بالذكاء الاصطناعي",ru:"НЕМЕДЛЕННАЯ ТРАНСФОРМАЦИЯ С ИИ" },
  "REACT · TANSTACK · TAILWIND · HÉBERGEMENT 1 AN INCLUS": { en:"REACT · TANSTACK · TAILWIND · 1 YEAR HOSTING INCLUDED",vi:"REACT · TANSTACK · TAILWIND · BAO GỒM HOSTING 1 NĂM",ar:"REACT · TANSTACK · TAILWIND · استضافة سنة مشمولة",ru:"REACT · TANSTACK · TAILWIND · ХОСТИНГ НА 1 ГОД ВКЛЮЧЁН" },
  "CESSION 100% DROITS": { en:"100% RIGHTS TRANSFER",vi:"CHUYỂN GIAO 100% QUYỀN",ar:"نقل الحقوق بنسبة 100٪",ru:"ПЕРЕДАЧА 100% ПРАВ" },
  "DÈS 179 €": { fr:"DÈS 199 €",en:"FROM 199 €",vi:"TỪ 199 €",ar:"ابتداءً من 199 €",ru:"ОТ 199 €" },
  "DÈS 499 €": { en:"FROM 499 €",vi:"TỪ 499 €",ar:"ابتداءً من 499 €",ru:"ОТ 499 €" },
  "Dès 499 €": { en:"From 499 €",vi:"Từ 499 €",ar:"ابتداءً من 499 €",ru:"От 499 €" },
  "Logo vectoriel (AI, SVG, PNG), favicon, Brand Book 20+ pages et gabarits réseaux sociaux.": { en:"Vector logo files (AI, SVG, PNG), favicon, 20+ page brand book and social media templates.",vi:"Tệp logo vector (AI, SVG, PNG), favicon, Brand Book hơn 20 trang và mẫu mạng xã hội.",ar:"ملفات شعار متجهة (AI وSVG وPNG) وأيقونة موقع ودليل علامة بأكثر من 20 صفحة وقوالب اجتماعية.",ru:"Векторный логотип (AI, SVG, PNG), фавикон, брендбук на 20+ страниц и шаблоны для соцсетей." },
  "AI · SVG · PDF PRINT 300 DPI · GABARITS RÉSEAUX SOCIAUX": { en:"AI · SVG · 300 DPI PRINT PDF · SOCIAL MEDIA TEMPLATES",vi:"AI · SVG · PDF IN 300 DPI · MẪU MẠNG XÃ HỘI",ar:"AI · SVG · PDF للطباعة 300 DPI · قوالب التواصل",ru:"AI · SVG · PDF ДЛЯ ПЕЧАТИ 300 DPI · ШАБЛОНЫ СОЦСЕТЕЙ" },
  "Création de sites internet haut de gamme, branding & acquisition locale.": { en:"Premium website creation, branding and local acquisition.",vi:"Thiết kế website cao cấp, thương hiệu và thu hút khách địa phương.",ar:"إنشاء مواقع متميزة وهوية تجارية واكتساب عملاء محليين.",ru:"Создание премиальных сайтов, брендинг и локальное привлечение клиентов." },
  "NETLINKING · COCON SÉMANTIQUE · CORE WEB VITALS": { en:"LINK BUILDING · SEO SILO · CORE WEB VITALS",vi:"LINK BUILDING · CẤU TRÚC SEO · CORE WEB VITALS",ar:"بناء الروابط · هيكلة SEO · مؤشرات Core Web Vitals",ru:"ЛИНКБИЛДИНГ · SEO-КЛАСТЕРЫ · CORE WEB VITALS" },
  "GESTION 100% DÉLÉGUÉE": { en:"100% DELEGATED MANAGEMENT",vi:"QUẢN LÝ ỦY QUYỀN 100%",ar:"إدارة مفوضة بالكامل",ru:"ПОЛНОСТЬЮ ДЕЛЕГИРОВАННОЕ УПРАВЛЕНИЕ" },
  "DÈS 299 € / MOIS": { en:"FROM 299 € / MONTH",vi:"TỪ 299 € / THÁNG",ar:"ابتداءً من 299 € شهريًا",ru:"ОТ 299 € В МЕСЯЦ" },
  "SUPPORT 24/7": { en:"24/7 SUPPORT",vi:"HỖ TRỢ 24/7",ar:"دعم على مدار الساعة",ru:"ПОДДЕРЖКА 24/7" },
  "SAUVEGARDES · MISES À JOUR DU CŒUR · MODIFICATIONS INCLUSES": { en:"BACKUPS · CORE UPDATES · INCLUDED CHANGES",vi:"SAO LƯU · CẬP NHẬT LÕI · BAO GỒM CHỈNH SỬA",ar:"نسخ احتياطية · تحديثات أساسية · تعديلات مشمولة",ru:"РЕЗЕРВНЫЕ КОПИИ · ОБНОВЛЕНИЯ ЯДРА · ПРАВКИ ВКЛЮЧЕНЫ" },
  "12H AUTONOMIE": { en:"12H BATTERY LIFE",vi:"PIN 12 GIỜ",ar:"استقلالية 12 ساعة",ru:"АВТОНОМНОСТЬ 12 ЧАСОВ" },
  "GOOGLE ADS & META ADS CAMPAIGNS": { en:"GOOGLE ADS & META ADS CAMPAIGNS",vi:"CHIẾN DỊCH GOOGLE ADS & META ADS",ar:"حملات Google Ads وMeta Ads",ru:"КАМПАНИИ GOOGLE ADS И META ADS" },
  "+140% vs marché": { en:"+140% vs. market",vi:"+140% so với thị trường",ar:"+140٪ مقارنة بالسوق",ru:"+140% к рынку" },
  "12.50 €": { en:"12.50 €",vi:"12,50 €",ar:"12.50 €",ru:"12,50 €" },
  "15 à 25h / semaine": { en:"15–25h / week",vi:"15–25 giờ / tuần",ar:"15–25 ساعة أسبوعيًا",ru:"15–25 часов в неделю" },
  "100% INTÉGRÉ": { en:"100% INTEGRATED",vi:"TÍCH HỢP 100%",ar:"تكامل كامل",ru:"100% ИНТЕГРИРОВАНО" },
  "LLMS SUR-MESURE · EMBEDDINGS · AUTOMATION N8N/MAKE": { en:"CUSTOM LLMS · EMBEDDINGS · N8N/MAKE AUTOMATION",vi:"LLM TÙY CHỈNH · EMBEDDING · TỰ ĐỘNG HÓA N8N/MAKE",ar:"نماذج لغوية مخصصة · Embeddings · أتمتة N8N/MAKE",ru:"КАСТОМНЫЕ LLM · ЭМБЕДДИНГИ · АВТОМАТИЗАЦИЯ N8N/MAKE" },
};
function VisualText({ children }: { children: ReactNode }) {
  const { lang, t } = useLang();
  if (typeof children !== "string") return <>{children}</>;
  const key = children.trim();
  const translated = VISUAL_COPY[key];
  return <>{translated ? t({ fr: key, en: translated.en ?? key, vi: translated.vi ?? key, ar: translated.ar ?? key, ru: translated.ru ?? key }) : children}</>;
}

function Stage({ children, className = "", accent = "rgba(255,255,255,.08)" }: { children: ReactNode; className?: string; accent?: string }) {
  return (
    <div
      className={
        "xr-depth relative min-h-[360px] overflow-hidden rounded-[2rem] border xr-line bg-[var(--xr-bg-elev)] sm:min-h-[430px] " +
        className
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 z-[1] h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: accent }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,.08)_46%,transparent_62%)]" />
      <div className="relative z-[2] h-full">{children}</div>
    </div>
  );
}

function Photo({
  src,
  position = "50% 50%",
  className = "",
}: {
  src: string;
  position?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      style={{ objectPosition: position }}
      className={"absolute inset-0 h-full w-full object-cover " + className}
    />
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="label-mono text-[7px] tracking-[.2em] text-white/55">{children}</span>;
}

function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-[1.35rem] border border-white/15 bg-black/58 shadow-[0_30px_90px_-45px_rgba(0,0,0,.85)] backdrop-blur-xl " +
        className
      }
    >
      {children}
    </div>
  );
}

function WebVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[var(--xr-bg)] to-[var(--xr-surface)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {/* Halo immersif subtil */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-slate-500/10 blur-3xl" />

      {/* Barre supérieure fluide type navigateur de luxe */}
      <div className="flex items-center justify-between border-b xr-line pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-3 label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>HTTPS://XRAGENCYAI.COM</VisualText></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-500"><VisualText>
            PERFORMANCE 100/100
          </VisualText></span>
          <Label><VisualText>01 / WEB DESIGN</VisualText></Label>
        </div>
      </div>

      {/* Contenu immersif sans coupure brutale */}
      <div className="py-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr] items-center">
        <div className="group relative overflow-hidden rounded-[1.8rem] border xr-line shadow-xl">
          <img
            src={XR_PHOTOS.websites}
            alt="Site web vitrine, business et e-commerce sur-mesure"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div>
              <span className="label-mono text-[7px] text-emerald-400 font-bold"><VisualText>ARCHITECTURE ULTRA-RAPIDE</VisualText></span>
              <p className="text-xs font-semibold text-white"><VisualText>Vitesse &lt; 0.4s · Mobile-First</VisualText></p>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 label-mono text-[7px] font-bold text-white backdrop-blur-md"><VisualText>
              DÈS 499 €
            </VisualText></span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)]/80 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>LIVRABLES CLÉ EN MAIN</VisualText></span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h4 className="mt-1 text-xs font-bold text-[var(--xr-ink)]"><VisualText>Vitrine, Business & E-commerce</VisualText></h4>
            <p className="mt-1 text-[8.5px] leading-relaxed xr-muted"><VisualText>
              Design unique 100% sur-mesure, CMS moderne, formulaires interactifs et paiements Stripe intégrés.
            </VisualText></p>
          </div>

          <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)]/80 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>SCORE TECHNIQUE</VisualText></span>
              <span className="label-mono text-[7px] font-bold text-emerald-500"><VisualText>GRADE A+</VisualText></span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center text-[7.5px]">
              <div className="rounded-lg bg-[var(--xr-bg)] p-2 border xr-line">
                <span className="block font-bold text-emerald-500"><VisualText>100/100</VisualText></span>
                <span className="label-mono text-[5.5px] xr-muted"><VisualText>SEO SCORE</VisualText></span>
              </div>
              <div className="rounded-lg bg-[var(--xr-bg)] p-2 border xr-line">
                <span className="block font-bold text-[var(--xr-ink)]"><VisualText>&lt; 0.4s</VisualText></span>
                <span className="label-mono text-[5.5px] xr-muted"><VisualText>CHARGEMENT</VisualText></span>
              </div>
              <div className="rounded-lg bg-[var(--xr-bg)] p-2 border xr-line">
                <span className="block font-bold text-[var(--xr-ink)]"><VisualText>100%</VisualText></span>
                <span className="label-mono text-[5.5px] xr-muted"><VisualText>RGPD OK</VisualText></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-4">
        <span className="label-mono text-[7px] xr-muted"><VisualText>REACT · TANSTACK · TAILWIND · HÉBERGEMENT 1 AN INCLUS</VisualText></span>
        <span className="label-mono text-[7px] font-bold text-emerald-500"><VisualText>PRÊT À CONVERTIR</VisualText></span>
      </div>
    </div>
  );
}

function BrandingVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[var(--xr-bg)] to-[var(--xr-surface)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {/* Halo d'ambiance subtil */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Entête épurée */}
      <div className="flex items-center justify-between border-b xr-line pb-4">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-emerald-500" />
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>STUDIO BRANDING & DIRECTION ARTISTIQUE</VisualText></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-500"><VisualText>
            CESSION 100% DROITS
          </VisualText></span>
          <Label><VisualText>02 / BRANDING</VisualText></Label>
        </div>
      </div>

      {/* Contenu visuel intégré et fluide */}
      <div className="py-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center">
        <div className="group relative overflow-hidden rounded-[1.8rem] border xr-line shadow-xl">
          <img
            src={XR_PHOTOS.branding}
            alt="Direction artistique, Brand Book et papeterie de prestige"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div>
              <span className="label-mono text-[7px] text-emerald-400 font-bold"><VisualText>ATELIER TYPOGRAPHIE & COULEURS</VisualText></span>
              <p className="text-xs font-semibold text-white"><VisualText>Papeterie, Packaging & Brand Book</VisualText></p>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 label-mono text-[7px] font-bold text-white backdrop-blur-md"><VisualText>
              DÈS 179 €
            </VisualText></span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)]/80 p-4 shadow-sm backdrop-blur-xl">
            <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>HARMONIE CHROMATIQUE EXCLUSIVE</VisualText></span>
            <div className="mt-3 flex gap-2">
              {[
                { hex: "#090A0D", label: "Obsidian" },
                { hex: "#F8F6F0", label: "Warm White" },
                { hex: "#4B5563", label: "Titanium" },
                { hex: "#10B981", label: "Emerald" },
              ].map((c) => (
                <div key={c.hex} className="flex-1 text-center">
                  <div
                    className="h-10 w-full rounded-xl border border-black/10 dark:border-white/20 shadow-sm"
                    style={{ background: c.hex }}
                  />
                  <span className="mt-1 block text-[7px] font-mono font-medium xr-muted truncate">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border xr-line bg-[var(--xr-surface-strong)]/80 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[var(--xr-ink)]"><VisualText>Livrables Vectoriels HD</VisualText></span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 label-mono text-[6.5px] font-bold text-emerald-500"><VisualText>
                PRÊT À IMPRIMER
              </VisualText></span>
            </div>
            <p className="mt-1.5 text-[8.5px] leading-relaxed xr-muted"><VisualText>
              Logo vectoriel (AI, SVG, PNG), favicon, Brand Book 20+ pages et gabarits réseaux sociaux.
            </VisualText></p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-4">
        <span className="label-mono text-[7px] xr-muted"><VisualText>AI · SVG · PDF PRINT 300 DPI · GABARITS RÉSEAUX SOCIAUX</VisualText></span>
        <span className="label-mono text-[7px] font-bold text-emerald-500"><VisualText>IDENTITÉ DE PRESTIGE</VisualText></span>
      </div>
    </div>
  );
}

function SeoVisual() {
  return (
    <Stage accent="rgba(56,189,248,.18)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-sky-500" />
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>GOOGLE SERP PREVIEW</VisualText></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold"><VisualText>+184% TRAFIC</VisualText></span>
            <Label><VisualText>03 / SEO NATUREL</VisualText></Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.1fr_.9fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-lg group">
            <img
              src={XR_PHOTOS.seo}
              alt="Dashboard SEO & Positionnement Google Top 1"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90"><VisualText>PILOTAGE ACQUISITION ORGANIQUE</VisualText></span>
                <p className="text-[10px] font-semibold text-white"><VisualText>Top 1 Google · Croissance +184%</VisualText></p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[7px] text-emerald-300 backdrop-blur-md"><VisualText>Certifié A+</VisualText></span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[8px] xr-muted">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-neutral-900 text-[6px] font-black text-white"><VisualText>XR</VisualText></span>
                <span><VisualText>https://xragencyai.com</VisualText></span>
                <span className="label-mono text-[6px] text-emerald-500 font-bold ml-auto"><VisualText>POSITION #1</VisualText></span>
              </div>
              <h4 className="mt-1 text-xs font-semibold text-sky-600 dark:text-sky-400"><VisualText>
                XR Agency | Agence Web & Performance Digitale
              </VisualText></h4>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted line-clamp-2"><VisualText>
                Création de sites internet haut de gamme, branding & acquisition locale.
              </VisualText></p>
            </div>

            <div className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px]">
              <span className="xr-muted"><VisualText>Audit sémantique + Cocon SEO + Backlinks</VisualText></span>
              <span className="label-mono text-[7px] font-bold xr-accent"><VisualText>Dès 299 €/m</VisualText></span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted"><VisualText>NETLINKING · COCON SÉMANTIQUE · CORE WEB VITALS</VisualText></span>
          <span className="label-mono text-[7px] xr-accent font-semibold"><VisualText>À PARTIR DE 299 €/MOIS</VisualText></span>
        </div>
      </div>
    </Stage>
  );
}

function MapsVisual() {
  const { lang, t } = useLang();
  const searchTerm = lang === "vi" ? "công ty thiết kế website Đà Nẵng" : lang === "ar" ? "وكالة تصميم مواقع دبي" : lang === "ru" ? "веб-агентство Дубай" : lang === "en" ? "web design agency Dubai" : "agence web Paris";
  const searchUrl = "https://www.google.com/maps/search/" + encodeURIComponent(searchTerm).replace(/%20/g, "+") + "/";
  const screenshotUrl = "https://image.thum.io/get/width/1600/crop/1000/noanimate/" + searchUrl;
  return (
    <div className="relative isolate overflow-hidden rounded-[1.5rem] border xr-line bg-[var(--xr-bg-elev)] p-4 shadow-[var(--xr-shadow)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b xr-line pb-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border xr-line bg-[var(--xr-surface)]"><MapPin className="h-4 w-4" /></span>
          <div>
            <span className="label-mono block text-[7px] tracking-[.18em] xr-muted">{t({fr:"GOOGLE MAPS · RECHERCHE RÉELLE",en:"GOOGLE MAPS · LIVE SEARCH",vi:"GOOGLE MAPS · TÌM KIẾM THỰC TẾ",ar:"خرائط Google · بحث فعلي",ru:"GOOGLE MAPS · РЕАЛЬНЫЙ ПОИСК"})}</span>
            <span className="mt-1 block text-xs font-medium">{searchTerm}</span>
          </div>
        </div>
        <a href={searchUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border xr-line px-3 py-2 label-mono text-[7px] xr-muted transition hover:bg-[var(--xr-surface)]">
          {t({fr:"OUVRIR LA RECHERCHE",en:"OPEN SEARCH",vi:"MỞ TÌM KIẾM",ar:"فتح البحث",ru:"ОТКРЫТЬ ПОИСК"})} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <a href={searchUrl} target="_blank" rel="noreferrer" className="group relative mt-4 block overflow-hidden rounded-xl border xr-line bg-white">
        <img
          src={screenshotUrl}
          alt={t({fr:"Capture de l’interface Google Maps montrant une recherche réelle d’agences web à Paris",en:"Capture of the Google Maps interface showing a real web agency search in Dubai",vi:"Ảnh chụp giao diện Google Maps với kết quả tìm kiếm công ty thiết kế website thực tế",ar:"لقطة من واجهة خرائط Google تعرض بحثًا فعليًا عن وكالات تصميم المواقع",ru:"Снимок интерфейса Google Maps с реальным поиском веб-агентств"})}
          loading="lazy"
          className="block h-auto max-h-[640px] min-h-[320px] w-full object-cover object-top transition duration-500 group-hover:scale-[1.01]"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-white/95 px-4 py-3 text-[#202124] shadow-[0_-8px_30px_rgba(0,0,0,.08)]">
          <span className="text-xs font-medium">{t({fr:"Résultats publics Google Maps",en:"Public Google Maps results",vi:"Kết quả Google Maps công khai",ar:"نتائج خرائط Google العامة",ru:"Открытые результаты Google Maps"})}</span>
          <span className="label-mono text-[7px] text-[#5f6368]">{t({fr:"CAPTURE EXTERNE · RÉSULTATS VARIABLES",en:"EXTERNAL CAPTURE · RESULTS VARY",vi:"ẢNH CHỤP BÊN NGOÀI · KẾT QUẢ THAY ĐỔI",ar:"لقطة خارجية · النتائج متغيرة",ru:"ВНЕШНЯЯ КАПЧА · РЕЗУЛЬТАТЫ МЕНЯЮТСЯ"})}</span>
        </div>
      </a>
      <p className="mt-3 text-[9px] leading-5 xr-muted">{t({fr:"Les positions et résultats évoluent selon la requête, la zone géographique et le contexte de recherche. Cette capture illustre une recherche réelle, sans simuler de classement ni de performance client.",en:"Positions and results vary by query, geographic area and search context. This is a real search capture, not a simulated ranking or client-performance claim.",vi:"Vị trí và kết quả thay đổi theo truy vấn, khu vực địa lý và ngữ cảnh tìm kiếm. Đây là ảnh chụp tìm kiếm thực tế, không mô phỏng thứ hạng hay hiệu quả khách hàng.",ar:"تختلف المواقع والنتائج بحسب عبارة البحث والمنطقة والسياق. تعرض هذه اللقطة بحثًا فعليًا ولا تحاكي ترتيبًا أو أداءً لعميل.",ru:"Позиции и результаты зависят от запроса, региона и контекста поиска. Это снимок реального поиска, а не имитация рейтинга или результатов клиента."})}</p>
    </div>
  );
}

function SocialVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[var(--xr-bg)] to-[var(--xr-surface)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {/* Halos sociaux dynamiques */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="flex items-center justify-between border-b xr-line pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>STUDIO COMMUNITY MANAGEMENT · TOURNAGES & REELS 4K</VisualText></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-500"><VisualText>
            GESTION 100% DÉLÉGUÉE
          </VisualText></span>
          <Label><VisualText>05 / SOCIAL MEDIA</VisualText></Label>
        </div>
      </div>

      <div className="py-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Instagram Card */}
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[7px] font-bold text-pink-500"><VisualText>INSTAGRAM</VisualText></span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-xs font-bold text-[var(--xr-ink)]"><VisualText>Feed & Reels 4K</VisualText></p>
            <div className="mt-2.5 flex items-baseline justify-between text-[8px] xr-muted">
              <span><VisualText>Engagement</VisualText></span>
              <span className="label-mono font-bold text-emerald-500"><VisualText>+18.4%</VisualText></span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
            </div>
          </div>

          {/* TikTok Card */}
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[7px] font-bold text-cyan-500"><VisualText>TIKTOK</VisualText></span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-xs font-bold text-[var(--xr-ink)]"><VisualText>Formats Verticaux</VisualText></p>
            <div className="mt-2.5 flex items-baseline justify-between text-[8px] xr-muted">
              <span><VisualText>Vues vidéo</VisualText></span>
              <span className="label-mono font-bold text-emerald-500"><VisualText>240K+</VisualText></span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
            </div>
          </div>

          {/* LinkedIn / Facebook Card */}
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[7px] font-bold text-blue-500"><VisualText>LINKEDIN / FB</VisualText></span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-xs font-bold text-[var(--xr-ink)]"><VisualText>B2B & Local</VisualText></p>
            <div className="mt-2.5 flex items-baseline justify-between text-[8px] xr-muted">
              <span><VisualText>Portée qualifiée</VisualText></span>
              <span className="label-mono font-bold text-emerald-500"><VisualText>×3.2</VisualText></span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div className="h-full w-[70%] rounded-full bg-blue-500" />
            </div>
          </div>
        </div>

        {/* Workflow & Engagement badge */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-[var(--xr-ink)]"><VisualText>Accompagnement avec engagement garanti</VisualText></span>
              <span className="xr-muted"><VisualText>· Planning éditorial, tournages, montage et modération active</VisualText></span>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 label-mono text-[7px] font-bold text-emerald-400 shrink-0 self-start sm:self-center"><VisualText>
              DÈS 299 € / MOIS
            </VisualText></span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-4">
        <span className="label-mono text-[7px] xr-muted"><VisualText>INSTAGRAM · TIKTOK · LINKEDIN · FACEBOOK</VisualText></span>
        <span className="label-mono text-[7px] font-bold text-emerald-500"><VisualText>ENGAGEMENT MINIMUM SUR-MESURE</VisualText></span>
      </div>
    </div>
  );
}

function WebcareVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border xr-line bg-gradient-to-b from-[var(--xr-surface)] via-[var(--xr-bg)] to-[var(--xr-surface)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {/* Halos cloud subtils */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="flex items-center justify-between border-b xr-line pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-500">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>SUPERVISION CLOUD DÉDIÉE · SÉCURITÉ & MAINTENANCE</VisualText></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-500"><VisualText>
            99.99% UPTIME
          </VisualText></span>
          <Label><VisualText>06 / WEBCARE</VisualText></Label>
        </div>
      </div>

      <div className="py-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>TEMPS DE RÉPONSE</VisualText></span>
            <p className="mt-1 text-xl font-bold text-emerald-500"><VisualText>&lt; 150 ms</VisualText></p>
            <span className="label-mono text-[6px] text-emerald-400 font-medium"><VisualText>Performance A+</VisualText></span>
          </div>
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>DISPONIBILITÉ</VisualText></span>
            <p className="mt-1 text-xl font-bold text-[var(--xr-ink)]"><VisualText>99.99%</VisualText></p>
            <span className="label-mono text-[6px] text-emerald-400 font-medium"><VisualText>SLA Contractuel</VisualText></span>
          </div>
          <div className="rounded-[1.4rem] border xr-line bg-[var(--xr-surface-strong)]/90 p-4 shadow-sm backdrop-blur-xl">
            <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>SÉCURITÉ SSL</VisualText></span>
            <p className="mt-1 text-xl font-bold text-emerald-500"><VisualText>TLS 1.3</VisualText></p>
            <span className="label-mono text-[6px] text-emerald-400 font-medium"><VisualText>Protection WAF</VisualText></span>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/25 bg-[var(--xr-surface-strong)] p-4 shadow-sm backdrop-blur-xl ring-1 ring-emerald-500/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-[var(--xr-ink)]"><VisualText>Intervention Proactive & Mises à Jour Mensuelles</VisualText></span>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 label-mono text-[6.5px] font-bold text-emerald-400"><VisualText>
              SUPPORT 24/7
            </VisualText></span>
          </div>
          <p className="mt-1.5 text-[8.5px] leading-relaxed xr-muted"><VisualText>
            Sauvegardes quotidiennes redondantes, restauration immédiate, modifications régulières de contenus et surveillance continue contre les cybermenaces.
          </VisualText></p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t xr-line pt-4">
        <span className="label-mono text-[7px] xr-muted"><VisualText>SAUVEGARDES · MISES À JOUR DU CŒUR · MODIFICATIONS INCLUSES</VisualText></span>
        <span className="label-mono text-[7px] font-bold text-emerald-500"><VisualText>SÉRÉNITÉ TOTALE DÈS 29 €/MOIS</VisualText></span>
      </div>
    </div>
  );
}

function RoboticsVisual() {
  return (
    <Stage accent="rgba(148,163,184,.15)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-500/10 text-neutral-400">
              <Bot className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>ROBOTS DE SERVICE · ÉLÉGANCE OPÉRATIONNELLE</VisualText></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold"><VisualText>DISPONIBLE DÉMO</VisualText></span>
            <Label><VisualText>07 / ROBOTIQUE</VisualText></Label>
          </div>
        </div>

        <div className="my-auto py-3 grid gap-4 lg:grid-cols-[1.2fr_.8fr] items-center">
          <div className="relative overflow-hidden rounded-2xl border xr-line shadow-xl group">
            <img
              src={XR_PHOTOS.robotics}
              alt="Robot de service autonome de luxe en hôtel 5 étoiles"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="label-mono text-[7px] text-white/90"><VisualText>NAVIGATION LIDAR 3D DYNAMIQUE</VisualText></span>
                <p className="text-[10px] font-semibold text-white"><VisualText>Évitement d'obstacles en temps réel</VisualText></p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[7px] font-bold text-emerald-300 backdrop-blur-md"><VisualText>Prêt à l'emploi</VisualText></span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--xr-ink)]"><VisualText>Capacités de Terrain</VisualText></span>
                <span className="label-mono text-[6px] text-emerald-500 font-bold"><VisualText>12H AUTONOMIE</VisualText></span>
              </div>
              <p className="mt-1 text-[8.5px] leading-relaxed xr-muted"><VisualText>
                Service en salle, port de plateaux lourds (jusqu'à 40 kg), accueil VIP et guidage interactif des clients.
              </VisualText></p>
              <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-center text-[7.5px]">
                <div className="rounded-lg border xr-line bg-[var(--xr-bg)] p-1.5">
                  <span className="block font-bold text-[var(--xr-ink)]"><VisualText>0 Bruit</VisualText></span>
                  <span className="xr-muted-2"><VisualText>Moteurs silencieux</VisualText></span>
                </div>
                <div className="rounded-lg border xr-line bg-[var(--xr-bg)] p-1.5">
                  <span className="block font-bold text-[var(--xr-ink)]"><VisualText>100% Sûr</VisualText></span>
                  <span className="xr-muted-2"><VisualText>Capteurs 360°</VisualText></span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-[9px]">
              <span className="xr-muted"><VisualText>Location événementielle ou vente</VisualText></span>
              <span className="label-mono text-[7px] font-bold text-emerald-400"><VisualText>Dès 499 €</VisualText></span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted"><VisualText>HÔTELLERIE · RESTAURATION · ÉVÉNEMENTS VIP · SALONS</VisualText></span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold"><VisualText>ESSAI GRATUIT SUR SITE POSSIBLE</VisualText></span>
        </div>
      </div>
    </Stage>
  );
}

function RefonteVisual() {
  return (
    <Stage accent="rgba(148,163,184,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-500/10 text-neutral-300">
              <Globe2 className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>AUDIT & TRANSFORMATION DIGITALE</VisualText></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold"><VisualText>REBUILD A+</VisualText></span>
            <Label><VisualText>08 / REFONTE</VisualText></Label>
          </div>
        </div>

        {/* Before / After comparison matrix */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-red-400"><VisualText>AVANT REFONTE</VisualText></span>
                <span className="text-[10px] text-red-400"><VisualText>✕</VisualText></span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-[var(--xr-ink)]"><VisualText>Site Obsolète</VisualText></p>
              <div className="mt-2 space-y-1 text-[8px] xr-muted">
                <p><VisualText>• Temps de chargement : 4.8s</VisualText></p>
                <p><VisualText>• Mobile non optimisé</VisualText></p>
                <p><VisualText>• Taux de conversion : 0.8%</VisualText></p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 backdrop-blur-md ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="label-mono text-[6.5px] font-bold text-emerald-400"><VisualText>APRÈS XR REFONTE</VisualText></span>
                <span className="text-[10px] text-emerald-400 font-bold"><VisualText>✓</VisualText></span>
              </div>
              <p className="mt-1.5 text-xs font-bold text-[var(--xr-ink)]"><VisualText>Architecture Next-Gen</VisualText></p>
              <div className="mt-2 space-y-1 text-[8px] font-medium text-emerald-300">
                <p><VisualText>• Temps de chargement : 0.3s</VisualText></p>
                <p><VisualText>• 100% Mobile-First & Fluide</VisualText></p>
                <p><VisualText>• Taux de conversion : 4.6% (×5.7)</VisualText></p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border xr-line bg-[var(--xr-surface)] px-3 py-2 text-[9px] flex items-center justify-between">
            <span className="xr-muted"><VisualText>Migration sans perte de trafic ni de SEO existant</VisualText></span>
            <span className="label-mono text-[7px] text-emerald-400 font-bold"><VisualText>ZÉRO REGRESSION</VisualText></span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted"><VisualText>AUDIT UX · REFONTE CODE · CONVERSIONS BOOSTÉES</VisualText></span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold"><VisualText>ON RECONSTRUIT POUR GAGNER</VisualText></span>
        </div>
      </div>
    </Stage>
  );
}

function AdsVisual() {
  return (
    <Stage accent="rgba(56,189,248,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/10 text-sky-400">
              <Megaphone className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>GOOGLE ADS & META ADS CAMPAIGNS</VisualText></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold"><VisualText>ROAS 4.8×</VisualText></span>
            <Label><VisualText>09 / ADS</VisualText></Label>
          </div>
        </div>

        {/* Paid acquisition metrics console */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>CTR MOYEN</VisualText></span>
              <p className="mt-1 text-base font-bold text-sky-400"><VisualText>8.4%</VisualText></p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium"><VisualText>+140% vs marché</VisualText></span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>COÛT PAR LEAD</VisualText></span>
              <p className="mt-1 text-base font-bold text-[var(--xr-ink)]"><VisualText>12.50 €</VisualText></p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium"><VisualText>-42% CPA</VisualText></span>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] xr-muted-2"><VisualText>RETOUR / INVEST.</VisualText></span>
              <p className="mt-1 text-base font-bold text-emerald-500"><VisualText>4.8× ROAS</VisualText></p>
              <span className="label-mono text-[6px] text-emerald-400 font-medium"><VisualText>Rentabilité nette</VisualText></span>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-[var(--xr-surface-strong)] p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--xr-ink)]"><VisualText>Campagnes Précises & Mots-Clés Intentionnistes</VisualText></span>
              <span className="label-mono text-[6.5px] font-bold text-sky-400"><VisualText>TRACKING SERVER-SIDE</VisualText></span>
            </div>
            <p className="mt-1 text-[8.5px] leading-relaxed xr-muted"><VisualText>
              Ciblage ultra-qualifié à fort pouvoir d'achat, A/B testing continu des accroches et landing pages dédiées à forte conversion.
            </VisualText></p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted"><VisualText>SEARCH · SHOPPING · REMARKETING · SCALING</VisualText></span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold"><VisualText>ACQUISITION RENTABLE & MESURABLE</VisualText></span>
        </div>
      </div>
    </Stage>
  );
}

function StrategyVisual() {
  return (
    <Stage accent="rgba(129,140,248,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
              <Gauge className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>STRATÉGIE DIGITALE & EXPANSION</VisualText></span>
          </div>
          <Label><VisualText>10 / STRATÉGIE</VisualText></Label>
        </div>

        {/* Strategy Roadmap */}
        <div className="my-auto py-3 space-y-2.5">
          {[
            { phase: "PHASE 1", label: "Diagnostic d'Opportunité & Concurrence", status: "Terminé", color: "text-emerald-400" },
            { phase: "PHASE 2", label: "Positionnement de Prestige & Offre Irrésistible", status: "En cours", color: "text-indigo-400" },
            { phase: "PHASE 3", label: "Tunnel de Vente & Canaux d'Acquisition Directe", status: "Prévu", color: "xr-muted" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="label-mono text-[6.5px] font-bold text-indigo-300">{item.phase}</span>
                <span className="text-[11px] font-semibold text-[var(--xr-ink)]">{item.label}</span>
              </div>
              <span className={`label-mono text-[6.5px] font-bold ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted"><VisualText>PLAN D'ACTION CONCRET · KPIS CHIFFRÉS · ROADMAP 90J</VisualText></span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold"><VisualText>DIRECTION STRATÉGIQUE CLAIRE</VisualText></span>
        </div>
      </div>
    </Stage>
  );
}

function AiVisual() {
  return (
    <Stage accent="rgba(192,132,252,.14)">
      <div className="relative h-full min-h-[380px] p-5 sm:min-h-[430px] sm:p-7 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b xr-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/10 text-purple-400">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="label-mono text-[7px] tracking-[.18em] xr-muted"><VisualText>INTELLIGENCE ARTIFICIELLE & AUTOMATISATION</VisualText></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-mono text-[7px] text-emerald-500 font-bold"><VisualText>IA ACTIVE</VisualText></span>
            <Label><VisualText>11 / IA</VisualText></Label>
          </div>
        </div>

        {/* AI Workflow Agents */}
        <div className="my-auto py-3 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold"><VisualText>AGENT 01</VisualText></span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]"><VisualText>Capture & Triage</VisualText></p>
              <p className="mt-1 text-[7.5px] xr-muted"><VisualText>Qualification automatique des leads entrants 24/7</VisualText></p>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold"><VisualText>AGENT 02</VisualText></span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]"><VisualText>RAG & Connaissance</VisualText></p>
              <p className="mt-1 text-[7.5px] xr-muted"><VisualText>Réponses ultra-précises basées sur vos documents</VisualText></p>
            </div>
            <div className="rounded-2xl border xr-line bg-[var(--xr-surface)] p-3 backdrop-blur-md">
              <span className="label-mono text-[6.5px] text-purple-400 font-bold"><VisualText>AGENT 03</VisualText></span>
              <p className="mt-1 text-[11px] font-bold text-[var(--xr-ink)]"><VisualText>Workflows Métier</VisualText></p>
              <p className="mt-1 text-[7.5px] xr-muted"><VisualText>Génération automatique de devis et synchronisation</VisualText></p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-[9px]">
            <span className="font-semibold text-[var(--xr-ink)]">Gain de productivité constaté : <span className="text-emerald-400 font-bold"><VisualText>15 à 25h / semaine</VisualText></span> par collaborateur</span>
            <span className="label-mono text-[7px] text-purple-300 font-bold shrink-0"><VisualText>100% INTÉGRÉ</VisualText></span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t xr-line pt-3">
          <span className="label-mono text-[7px] xr-muted"><VisualText>LLMS SUR-MESURE · EMBEDDINGS · AUTOMATION N8N/MAKE</VisualText></span>
          <span className="label-mono text-[7px] text-emerald-500 font-semibold"><VisualText>TRANSFORMATION IA IMMÉDIATE</VisualText></span>
        </div>
      </div>
    </Stage>
  );
}

function GenericVisual({ info }: { info: Meta }) {
  const src = info.photo ? XR_PHOTOS[info.photo] : undefined;
  return (
    <Stage>
      {src ? <Photo src={src} position={info.position} className="opacity-[.9]" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/6 to-transparent" />
      <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
        <Label>{info.number} / {info.label}</Label>
      </div>
    </Stage>
  );
}

export function ServiceIllustration({ service, title }: Props) {
  const info = META[service] ?? META.websites;
  const visual =
    service === "websites" ? <WebVisual /> :
    service === "branding" ? <BrandingVisual /> :
    service === "seo" ? <SeoVisual /> :
    service === "maps" ? <MapsVisual /> :
    service === "social" ? <SocialVisual /> :
    service === "maintenance" ? <WebcareVisual /> :
    service === "robotics" ? <RoboticsVisual /> :
    service === "refonte" ? <RefonteVisual /> :
    service === "ads" ? <AdsVisual /> :
    service === "strategy" ? <StrategyVisual /> :
    service === "ai" ? <AiVisual /> :
    <GenericVisual info={info} />;

  return (
    <figure className="group relative w-full overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] shadow-[var(--xr-shadow)]">
      {visual}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[5%] top-[5%] h-8 w-8 rounded-tl-xl border-l border-t border-white/20" />
        <div className="absolute bottom-[5%] right-[5%] h-8 w-8 rounded-br-xl border-b border-r border-white/20" />
      </div>
      <figcaption className="sr-only">{title ?? info.label}</figcaption>
    </figure>
  );
}
