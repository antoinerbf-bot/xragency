import type { L } from "./i18n";
import { SERVICES_PART1 } from "./content-services-a";
import { SERVICES_PART2 } from "./content-services-b";


const SERVICE_TEXT_TRANSLATIONS: Record<string, { ar: string; ru: string }> = {
  "Optimized architecture and performance tracking": { ar: "بنية محسّنة ومتابعة الأداء", ru: "Оптимизированная архитектура и отслеживание производительности" },
  "Performance and media optimization": { ar: "تحسين الأداء والوسائط", ru: "Оптимизация производительности и медиа" },
  "Multi-sector experience": { ar: "خبرة في قطاعات متعددة", ru: "Опыт работы в разных отраслях" },
  "Pro Showcase Site": { ar: "موقع تعريفي احترافي", ru: "Премиальный сайт-визитка" },
  "Bespoke responsive mobile-first design": { ar: "تصميم مخصص ومتجاوب مع أولوية للهواتف", ru: "Индивидуальный адаптивный дизайн с приоритетом мобильных устройств" },
  "Up to 3 complete structured pages": { ar: "حتى 3 صفحات متكاملة ومنظمة", ru: "До 3 полноценных структурированных страниц" },
  "Contact form & direct WhatsApp button": { ar: "نموذج اتصال وزر WhatsApp مباشر", ru: "Форма обратной связи и прямая кнопка WhatsApp" },
  "On-page SEO & semantic tags": { ar: "تحسين SEO داخل الصفحة والوسوم الدلالية", ru: "Внутренняя SEO-оптимизация и семантическая разметка" },
  "1 year high-speed hosting + SSL included": { ar: "استضافة عالية السرعة لمدة عام وشهادة SSL مشمولة", ru: "Высокоскоростной хостинг на год и SSL включены" },
  "Business Site": { ar: "موقع أعمال", ru: "Бизнес-сайт" },
  "Everything in Pro Showcase included": { ar: "يشمل جميع مزايا الموقع التعريفي الاحترافي", ru: "Включает всё из пакета Pro Showcase" },
  "Up to 5 bespoke premium pages": { ar: "حتى 5 صفحات متميزة مصممة حسب الطلب", ru: "До 5 премиальных страниц по индивидуальному дизайну" },
  "Integrated blog & news module with intuitive CMS": { ar: "مدونة مدمجة وقسم أخبار مع نظام إدارة محتوى سهل", ru: "Встроенный блог и новости с удобной CMS" },
  "Advanced SEO architecture & internal linking": { ar: "بنية SEO متقدمة وروابط داخلية", ru: "Продвинутая SEO-архитектура и внутренняя перелинковка" },
  "Lead capture & qualified quote form": { ar: "نموذج عرض سعر مؤهل وجمع بيانات العملاء المحتملين", ru: "Форма запроса сметы и сбор квалифицированных лидов" },
  "Ultra-fast loading speed (<0.5s)": { ar: "سرعة تحميل فائقة (أقل من 0.5 ثانية)", ru: "Сверхбыстрая загрузка (менее 0,5 с)" },
  "Google Analytics & Search Console setup": { ar: "إعداد Google Analytics وSearch Console", ru: "Настройка Google Analytics и Search Console" },
  "Indicative starting price from €1,499 (custom quote required)": { ar: "سعر إرشادي يبدأ من 1,499 € (يتطلب عرض سعر مخصصًا)", ru: "Ориентировочная цена от 1 499 € (требуется индивидуальная смета)" },
  "Mandatory scoping discussion with a specialist": { ar: "جلسة إلزامية مع مختص لتحديد نطاق المشروع", ru: "Обязательное обсуждение объёма проекта со специалистом" },
  "Everything in Business Site included": { ar: "يشمل جميع مزايا موقع الأعمال", ru: "Включает всё из пакета Business Site" },
  "Unlimited product catalog & inventory management": { ar: "كتالوج منتجات غير محدود وإدارة المخزون", ru: "Неограниченный каталог товаров и управление запасами" },
  "Secure checkout via Card, Apple Pay & Google Pay (Stripe)": { ar: "دفع آمن بالبطاقة وApple Pay وGoogle Pay عبر Stripe", ru: "Безопасная оплата картой, Apple Pay и Google Pay через Stripe" },
  "Online booking module with dynamic calendar": { ar: "نظام حجز عبر الإنترنت مع تقويم تفاعلي", ru: "Модуль онлайн-бронирования с динамическим календарём" },
  "Ultra-smooth mobile checkout journey optimized for conversion": { ar: "مسار شراء سلس على الهاتف ومحسّن للتحويل", ru: "Удобный мобильный путь оформления заказа, оптимизированный для конверсии" },
  "Secure customer account & automated order tracking": { ar: "حساب عميل آمن وتتبع تلقائي للطلبات", ru: "Защищённый аккаунт клиента и автоматическое отслеживание заказов" },
  "Main bespoke logo": { ar: "الشعار الرئيسي المصمم حسب الطلب", ru: "Основной логотип по индивидуальному дизайну" },
  "Essential variations (dark, light, monochrome)": { ar: "نسخ أساسية داكنة وفاتحة وأحادية اللون", ru: "Основные варианты: тёмный, светлый и монохромный" },
  "High-resolution vector files (AI, SVG, PNG, PDF)": { ar: "ملفات متجهة عالية الدقة بصيغ AI وSVG وPNG وPDF", ru: "Векторные файлы высокого разрешения в форматах AI, SVG, PNG и PDF" },
  "Optimized favicon & app icon": { ar: "أيقونة موقع وأيقونة تطبيق محسّنتان", ru: "Оптимизированные фавикон и иконка приложения" },
  "Full commercial usage rights": { ar: "نقل كامل لحقوق الاستخدام التجاري", ru: "Полные права на коммерческое использование" },
  "Brand Identity Kit": { ar: "حزمة الهوية التجارية", ru: "Комплект фирменной айдентики" },
  "Everything in Signature Logo included": { ar: "يشمل جميع مزايا شعار Signature", ru: "Включает всё из пакета Signature Logo" },
  "Luxury color palette (HEX, RGB, CMYK codes)": { ar: "لوحة ألوان فاخرة مع رموز HEX وRGB وCMYK", ru: "Премиальная палитра с кодами HEX, RGB и CMYK" },
  "Premium typography pairing & visual hierarchy": { ar: "اختيار خطوط متميز وتسلسل بصري واضح", ru: "Премиальный подбор шрифтов и визуальная иерархия" },
  "Brand patterns, graphic elements & textures": { ar: "أنماط العلامة وعناصر رسومية وخامات", ru: "Фирменные паттерны, графические элементы и текстуры" },
  "Ready-to-use social media templates (Instagram/LinkedIn)": { ar: "قوالب جاهزة لوسائل التواصل (Instagram وLinkedIn)", ru: "Готовые шаблоны для соцсетей (Instagram/LinkedIn)" },
  "Full Brand Suite": { ar: "حزمة هوية متكاملة", ru: "Полный комплект брендинга" },
  "Everything in Brand Identity Kit included": { ar: "يشمل جميع مزايا حزمة الهوية التجارية", ru: "Включает всё из Brand Identity Kit" },
  "Complete Brand Book & visual identity guidelines (20+ pages PDF)": { ar: "دليل علامة تجارية كامل وإرشادات الهوية (PDF بأكثر من 20 صفحة)", ru: "Полный брендбук и руководство по айдентике (PDF более 20 страниц)" },
  "Luxury stationery kit (business cards, letterheads, invoice templates)": { ar: "حزمة مطبوعات فاخرة تشمل بطاقات العمل والترويسات وقوالب الفواتير", ru: "Премиальный комплект деловой полиграфии: визитки, бланки и шаблоны счетов" },
  "Corporate & animated email signatures pack": { ar: "حزمة توقيعات بريد إلكتروني احترافية ومتحركة", ru: "Комплект корпоративных и анимированных email-подписей" },
  "Dedicated art director support & priority revisions": { ar: "دعم مباشر من مدير فني ومراجعات ذات أولوية", ru: "Персональная поддержка арт-директора и приоритетные правки" },
  "SEO Starter": { ar: "باقة SEO الأساسية", ru: "Базовый SEO-пакет" },
  "Audit & keywords": { ar: "تدقيق وبحث الكلمات المفتاحية", ru: "Аудит и подбор ключевых слов" },
  "On-page optimisation": { ar: "تحسين صفحات الموقع", ru: "Внутренняя оптимизация страниц" },
  "SEO Growth": { ar: "باقة نمو SEO", ru: "SEO Growth" },
  "Everything in Starter": { ar: "يشمل جميع مزايا الباقة الأساسية", ru: "Включает всё из пакета Starter" },
  "Monthly content": { ar: "محتوى شهري", ru: "Ежемесячный контент" },
  "Reporting": { ar: "التقارير", ru: "Отчётность" },
};

Object.assign(SERVICE_TEXT_TRANSLATIONS, {
  "Google Business Profile optimisation and local strategy with a clear commitment: target Top 3 visibility for the searches and areas defined at diagnosis, with a « Top 3 or money back » guarantee when the agreed criteria, timeframe and guarantee conditions are met.": { ar: "تحسين ملف Google Business Profile واستراتيجية محلية بهدف الظهور ضمن أفضل 3 نتائج لعبارات البحث والمناطق المحددة أثناء التشخيص، مع ضمان «ضمن أفضل 3 أو استرداد المبلغ» عند استيفاء المعايير والمهل والشروط المتفق عليها.", ru: "Оптимизация профиля Google Business Profile и локальная стратегия с целью выхода в топ-3 по запросам и регионам, согласованным при диагностике. Гарантия «Топ-3 или возврат средств» действует при соблюдении согласованных критериев, сроков и условий." },
  "Maps Top 3": { ar: "خرائط Google — أفضل 3 نتائج", ru: "Google Maps — топ-3" },
  "Geolocated semantic & competitive audit": { ar: "تدقيق دلالي وتنافسي حسب الموقع الجغرافي", ru: "Геолокализованный семантический и конкурентный аудит" },
  "Comprehensive Google Business Profile optimization": { ar: "تحسين شامل لملف Google Business Profile", ru: "Комплексная оптимизация профиля Google Business Profile" },
  "Contractual commitment « Top 3 or Refunded »": { ar: "التزام تعاقدي «أفضل 3 أو استرداد المبلغ»", ru: "Договорное обязательство «Топ-3 или возврат средств»" },
  "5-star customer reviews collection strategy": { ar: "استراتيجية لجمع تقييمات العملاء بخمس نجوم", ru: "Стратегия сбора пятизвёздочных отзывов клиентов" },
  "Local netlinking & NAP citations": { ar: "بناء روابط محلية واستشهادات NAP (الاسم والعنوان والهاتف)", ru: "Локальный линкбилдинг и упоминания NAP (название, адрес, телефон)" },
  "Monthly visibility & generated calls reports": { ar: "تقارير شهرية عن الظهور والمكالمات الناتجة", ru: "Ежемесячные отчёты о видимости и полученных звонках" },
  "Editorial calendar, content creation and management of Instagram, Facebook, LinkedIn and TikTok.": { ar: "تقويم تحريري وإنشاء محتوى وإدارة Instagram وFacebook وLinkedIn وTikTok.", ru: "Редакционный календарь, создание контента и ведение Instagram, Facebook, LinkedIn и TikTok." },
  "Essential Presence": { ar: "الحضور الأساسي", ru: "Базовое присутствие" },
  "3 months minimum commitment (strategy ramp-up)": { ar: "التزام لمدة لا تقل عن 3 أشهر لتأسيس الاستراتيجية", ru: "Минимальный срок — 3 месяца для запуска стратегии" },
  "1 social network of choice (Instagram, LinkedIn or TikTok)": { ar: "شبكة اجتماعية واحدة من اختيارك (Instagram أو LinkedIn أو TikTok)", ru: "Одна социальная сеть на выбор (Instagram, LinkedIn или TikTok)" },
  "8 curated posts / month (HD visuals + copywriting)": { ar: "8 منشورات منسقة شهريًا مع صور عالية الدقة وكتابة المحتوى", ru: "8 подготовленных публикаций в месяц: HD-визуалы и тексты" },
  "Art direction & cohesive feed styling": { ar: "توجيه فني وتنسيق متناسق للمنشورات", ru: "Арт-дирекшн и единое оформление ленты" },
  "Automated peak-hours scheduling": { ar: "جدولة تلقائية خلال ساعات الذروة", ru: "Автоматическая публикация в часы пик" },
  "Moderation and key comments replies": { ar: "إدارة التعليقات والرد على التعليقات المهمة", ru: "Модерация и ответы на ключевые комментарии" },
  "Active Growth": { ar: "النمو النشط", ru: "Активный рост" },
  "6 months minimum commitment (sustainable growth)": { ar: "التزام لمدة لا تقل عن 6 أشهر لتحقيق نمو مستدام", ru: "Минимальный срок — 6 месяцев для устойчивого роста" },
  "2 social networks (e.g. Instagram + TikTok or LinkedIn)": { ar: "شبكتان اجتماعيتان (مثل Instagram وTikTok أو LinkedIn)", ru: "Две социальные сети (например, Instagram + TikTok или LinkedIn)" },
  "20 posts / month (carousels, photos & reels)": { ar: "20 منشورًا شهريًا (منشورات دوارة وصور ومقاطع Reels)", ru: "20 публикаций в месяц: карусели, фото и Reels" },
  "Short-form video editing (Reels / TikTok / Shorts)": { ar: "تحرير مقاطع قصيرة (Reels وTikTok وShorts)", ru: "Монтаж коротких видео (Reels / TikTok / Shorts)" },
  "Regular interactive stories (polls, news, behind the scenes)": { ar: "قصص تفاعلية منتظمة تشمل استطلاعات وأخبارًا وكواليس", ru: "Регулярные интерактивные stories: опросы, новости и закулисье" },
  "Active community moderation & engagement": { ar: "إدارة نشطة للمجتمع وزيادة التفاعل", ru: "Активная модерация сообщества и вовлечение" },
  "Monthly performance report & strategic insights": { ar: "تقرير أداء شهري ورؤى استراتيجية", ru: "Ежемесячный отчёт об эффективности и стратегические рекомендации" },
  "Social Domination": { ar: "الهيمنة على وسائل التواصل", ru: "Доминирование в соцсетях" },
  "6 months minimum commitment (daily production)": { ar: "التزام لمدة لا تقل عن 6 أشهر مع إنتاج يومي", ru: "Минимальный срок — 6 месяцев с ежедневным производством контента" },
  "3 full social networks (Instagram + TikTok + LinkedIn/FB)": { ar: "إدارة 3 شبكات اجتماعية كاملة (Instagram وTikTok وLinkedIn/Facebook)", ru: "Полное ведение 3 соцсетей (Instagram + TikTok + LinkedIn/Facebook)" },
  "30 premium posts / month (daily cadence)": { ar: "30 منشورًا متميزًا شهريًا بمعدل يومي", ru: "30 премиальных публикаций в месяц — ежедневно" },
  "Creation, scriptwriting & 4K cinematic Reels editing": { ar: "إنشاء المحتوى وكتابة السيناريو ومونتاج Reels سينمائية بدقة 4K", ru: "Создание, написание сценариев и кинематографичный монтаж Reels в 4K" },
  "Daily stories & event highlights coverage": { ar: "قصص يومية وتغطية أبرز الفعاليات", ru: "Ежедневные stories и освещение ключевых событий" },
  "Proactive moderation & engagement 6 days a week": { ar: "إدارة استباقية وتفاعل 6 أيام أسبوعيًا", ru: "Проактивная модерация и вовлечение 6 дней в неделю" },
  "Competitive benchmark & comprehensive analytical report": { ar: "تحليل تنافسي وتقرير تحليلي شامل", ru: "Конкурентный анализ и подробный аналитический отчёт" },
  "WebCare & Maintenance": { ar: "WebCare والصيانة", ru: "WebCare и обслуживание" },
  "Fixes, updates and site monitoring.": { ar: "إصلاحات وتحديثات ومراقبة الموقع.", ru: "Исправления, обновления и мониторинг сайта." },
  "Technical maintenance, security updates and small evolutions to keep your site reliable.": { ar: "صيانة تقنية وتحديثات أمنية وتحسينات صغيرة للحفاظ على موثوقية موقعك.", ru: "Техническое обслуживание, обновления безопасности и небольшие доработки для надёжной работы сайта." },
  "Security updates": { ar: "تحديثات أمنية", ru: "Обновления безопасности" },
  "Priority support": { ar: "دعم ذو أولوية", ru: "Приоритетная поддержка" },
  "Essential": { ar: "أساسي", ru: "Базовый" },
  "4 content changes / month (texts, photos)": { ar: "4 تعديلات للمحتوى شهريًا (نصوص وصور)", ru: "4 изменения контента в месяц (тексты, фото)" },
  "Security updates & continuous SSL monitoring": { ar: "تحديثات أمنية ومراقبة مستمرة لشهادة SSL", ru: "Обновления безопасности и постоянный мониторинг SSL" },
  "Weekly automated Cloud backups": { ar: "نسخ احتياطية أسبوعية تلقائية على السحابة", ru: "Еженедельное автоматическое резервное копирование в облако" },
  "Anti-downtime monitoring with 99.9% uptime": { ar: "مراقبة الأعطال مع ضمان توافر بنسبة 99.9%", ru: "Мониторинг сбоев при доступности 99,9%" },
  "Technical email support within 24h": { ar: "دعم فني عبر البريد الإلكتروني خلال 24 ساعة", ru: "Техническая поддержка по электронной почте в течение 24 часов" },
  "Business": { ar: "الأعمال", ru: "Бизнес" },
  "10 changes / month (sections, forms, visuals)": { ar: "10 تعديلات شهريًا (الأقسام والنماذج والمرئيات)", ru: "10 изменений в месяц: разделы, формы и визуальные материалы" },
  "Weekly core & plugins updates": { ar: "تحديثات أسبوعية للنظام الأساسي والإضافات", ru: "Еженедельные обновления ядра и плагинов" },
  "Redundant daily off-site backups": { ar: "نسخ احتياطية يومية متعددة خارج الخادم", ru: "Ежедневные резервные копии на внешнем хранилище с дублированием" },
  "Ongoing loading speed optimization": { ar: "تحسين مستمر لسرعة التحميل", ru: "Постоянная оптимизация скорости загрузки" },
  "Priority WhatsApp & email support within 12h": { ar: "دعم ذو أولوية عبر WhatsApp والبريد خلال 12 ساعة", ru: "Приоритетная поддержка в WhatsApp и по email в течение 12 часов" },
  "Guaranteed emergency restore in case of failure": { ar: "استعادة طارئة مضمونة عند حدوث عطل", ru: "Гарантированное аварийное восстановление при сбое" },
  "Unlimited": { ar: "غير محدود", ru: "Без ограничений" },
  "Unlimited content & visual modifications": { ar: "تعديلات غير محدودة للمحتوى والمرئيات", ru: "Неограниченные изменения контента и визуальных материалов" },
  "New pages & sections creation on demand": { ar: "إنشاء صفحات وأقسام جديدة عند الطلب", ru: "Создание новых страниц и разделов по запросу" },
  "Proactive security audit & anti-malware shield": { ar: "تدقيق أمني استباقي وحماية من البرمجيات الخبيثة", ru: "Проактивный аудит безопасности и защита от вредоносного ПО" },
  "Emergency interventions priority within 4h": { ar: "تدخلات طارئة ذات أولوية خلال 4 ساعات", ru: "Приоритетное экстренное вмешательство в течение 4 часов" },
  "Direct dedicated developer line 7 days a week": { ar: "خط مباشر مع مطور مخصص طوال أيام الأسبوع", ru: "Прямая связь с выделенным разработчиком 7 дней в неделю" },
  "Monthly health, traffic & performance report": { ar: "تقرير شهري عن حالة الموقع والزيارات والأداء", ru: "Ежемесячный отчёт о состоянии сайта, трафике и производительности" },
  "Tailored leasing": { ar: "تأجير حسب الاحتياج", ru: "Индивидуальная аренда" },
  "Robot matched to the use case": { ar: "روبوت مناسب لحالة الاستخدام", ru: "Робот, подобранный под задачу" },
  "Leasing from €499/month": { ar: "إيجار ابتداءً من 499 € شهريًا", ru: "Аренда от 499 € в месяц" },
  "Maintenance and updates included according to offer": { ar: "الصيانة والتحديثات مشمولة حسب العرض", ru: "Обслуживание и обновления включены согласно предложению" },
  "Deployment support": { ar: "دعم التنفيذ والتشغيل", ru: "Поддержка внедрения" },
  "Professional purchase": { ar: "شراء مهني", ru: "Покупка для бизнеса" },
  "Published range €8,000–€21,000 excl. tax depending on model": { ar: "نطاق السعر المنشور من 8,000 إلى 21,000 € قبل الضريبة حسب الطراز", ru: "Опубликованный диапазон — 8 000–21 000 € без налога в зависимости от модели" },
  "Configuration and customisation by project": { ar: "التهيئة والتخصيص حسب المشروع", ru: "Настройка и адаптация под проект" },
  "Deployment and support quoted by project": { ar: "التنفيذ والدعم حسب عرض السعر", ru: "Внедрение и сопровождение по отдельной смете" },
  "Demo / event": { ar: "عرض تجريبي / فعالية", ru: "Демонстрация / мероприятие" },
  "Event rental published from €250": { ar: "إيجار الفعاليات يبدأ من 250 € وفق السعر المنشور", ru: "Аренда для мероприятий — от 250 € по опубликованному тарифу" },
  "Robot matched to demo or activation": { ar: "روبوت مناسب للعروض أو الأنشطة التفاعلية", ru: "Робот для демонстрации или промоактивации" },
  "Terms confirmed by duration and location": { ar: "تُحدد الشروط وفق المدة والموقع", ru: "Условия уточняются в зависимости от срока и места" },
  "Diagnosis": { ar: "التشخيص", ru: "Диагностика" },
  "We identify repetitive tasks, flows and site constraints.": { ar: "نحدد المهام المتكررة وتدفقات العمل وقيود الموقع.", ru: "Определяем повторяющиеся задачи, рабочие потоки и ограничения площадки." },
  "Selection": { ar: "الاختيار", ru: "Подбор" },
  "Welcome, delivery, cleaning, logistics or humanoid: we match the right family.": { ar: "الاستقبال أو التوصيل أو التنظيف أو الخدمات اللوجستية أو الروبوتات البشرية: نحدد الفئة المناسبة.", ru: "Роботы для приёма гостей, доставки, уборки, логистики или гуманоидные модели — подберём подходящий тип." },
  "Deployment": { ar: "التنفيذ", ru: "Внедрение" },
  "Mapping, configuration, content and integration by scenario.": { ar: "رسم الخرائط والتهيئة والمحتوى والتكامل وفق السيناريو.", ru: "Картографирование, настройка, контент и интеграция под конкретный сценарий." },
  "Operations": { ar: "التشغيل", ru: "Эксплуатация" },
  "starting / month": { ar: "ابتداءً من / شهر", ru: "от / месяц" },
  "Tailored leasing published by Korben.": { ar: "سعر التأجير المخصص المنشور من Korben.", ru: "Опубликованный тариф индивидуальной аренды Korben." },
  "purchase excl. tax": { ar: "سعر الشراء قبل الضريبة", ru: "Покупка без налога" },
  "Published purchase range depending on model.": { ar: "نطاق سعر الشراء المنشور حسب الطراز.", ru: "Опубликованный диапазон цены покупки в зависимости от модели." },
  "families": { ar: "فئات", ru: "категории" },
  "Welcome, delivery, cleaning, humanoid / versatile.": { ar: "الاستقبال والتوصيل والتنظيف والروبوتات البشرية أو متعددة الاستخدامات.", ru: "Приём гостей, доставка, уборка, гуманоидные и универсальные модели." },
  "How much does a Korben robot cost?": { ar: "كم تبلغ تكلفة روبوت Korben؟", ru: "Сколько стоит робот Korben?" },
  "Korben publishes a purchase range of €8,000–€21,000 excl. tax depending on model. Tailored leasing starts at €499/month. Exact pricing depends on robot and project.": { ar: "تنشر Korben نطاق شراء يتراوح بين 8,000 و21,000 € قبل الضريبة حسب الطراز. يبدأ التأجير المخصص من 499 € شهريًا. ويتوقف السعر النهائي على الروبوت والمشروع.", ru: "Korben указывает стоимость покупки в диапазоне 8 000–21 000 € без налога в зависимости от модели. Индивидуальная аренда начинается от 499 € в месяц. Точная цена зависит от робота и проекта." },
  "Does the robot replace staff?": { ar: "هل يحل الروبوت محل الموظفين؟", ru: "Заменяет ли робот сотрудников?" },
  "Korben presents its robots as assistants handling repetitive tasks so teams can focus on higher-value work.": { ar: "تقدم Korben روبوتاتها كمساعدين يتولون المهام المتكررة ليتمكن الفريق من التركيز على الأعمال الأعلى قيمة.", ru: "Korben позиционирует роботов как помощников для повторяющихся задач, позволяющих команде сосредоточиться на более ценной работе." },
  "Can we test before committing?": { ar: "هل يمكننا التجربة قبل الالتزام؟", ru: "Можно ли протестировать перед покупкой?" },
  "Yes. Korben offers short trials of a robot matched to the use case, subject to availability and terms.": { ar: "نعم. تقدم Korben إمكانية تجربة روبوت مناسب لاحتياجك لبضعة أيام، وفق التوفر والشروط.", ru: "Да. Korben предлагает краткосрочное тестирование подходящего робота в течение нескольких дней при наличии и на согласованных условиях." },
});
function completeServiceTranslations(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(completeServiceTranslations);
    return;
  }
  if (!value || typeof value !== "object") return;
  const entry = value as Record<string, unknown>;
  if (typeof entry.en === "string" && typeof entry.fr === "string") {
    const translated = SERVICE_TEXT_TRANSLATIONS[entry.en];
    if (translated) {
      if (typeof entry.ar !== "string") entry.ar = translated.ar;
      if (typeof entry.ru !== "string") entry.ru = translated.ru;
    }
  }
  Object.values(entry).forEach(completeServiceTranslations);
}

completeServiceTranslations(SERVICES_PART1);
completeServiceTranslations(SERVICES_PART2);

export const CONTACT = {
  email: "contact.xragency@gmail.com",
  whatsapp: "https://wa.me/33767566783",
  phone: "+33 7 67 56 67 83",
  instagram: "https://www.instagram.com/xragency_",
  linkedin: "https://linkedin.com/company/xragency",
  facebook: "",
  tiktok: "",
  cities: "France · Dubaï · Asie · International",
};

export type Plan = {
  name: L;
  audience?: L;
  eur: number;
  period: "once" | "month" | "year";
  features: L[];
  popular?: boolean;
  isQuoteOnly?: boolean;
};

export type ServiceStep = {
  num: string;
  title: L;
  desc: L;
};

export type ServiceDeliverable = {
  title: L;
  desc: L;
};

export type ServiceMetric = {
  metric: string;
  label: L;
  desc: L;
};

export type ServiceComparison = {
  feature: L;
  us: L;
  them: L;
};

export type Service = {
  id: string;
  num: string;
  title: L;
  short: L;
  description: L;
  fromEur: number;
  fromPeriod: "once" | "month" | "year";
  highlights: L[];
  plans: Plan[];
  premium?: boolean;
  steps?: ServiceStep[];
  deliverables?: ServiceDeliverable[];
  metrics?: ServiceMetric[];
  comparisons?: ServiceComparison[];
  serviceFaqs?: { q: L; a: L }[];
};

export const PERIOD_LABEL: Record<Plan["period"], L> = {
  once: { fr: "paiement unique", en: "one-time payment", vi: "thanh toán một lần", ar: "دفعة واحدة", ru: "разовый платёж" },
  month: { fr: "/ mois", en: "/ month", vi: "/ tháng", ar: "/ شهر", ru: "/ месяц" },
  year: { fr: "/ an", en: "/ year", vi: "/ năm", ar: "/ سنة", ru: "/ год" },
};

export const SERVICES: Service[] = [...SERVICES_PART1, ...SERVICES_PART2] as Service[];

export type FaqCategory = "sites" | "seo" | "ads" | "ia" | "tarifs" | "delais" | "general";

export const FAQ: { q: L; a: L; category: FaqCategory }[] = [
  {
    category: "delais",
    q: {
      fr: "Combien de temps faut-il pour créer mon site ?",
      en: "How long does it take to build my website?",
      vi: "Mất bao lâu để hoàn thành website của tôi?",
      ar: "كم من الوقت يستغرق إنشاء موقعي؟",
      ru: "Сколько времени занимает создание сайта?",
    },
    a: {
      fr: "Selon la formule choisie : 7 jours pour un Site Vitrine, 14 jours pour un Site Business et 21 jours pour un E-commerce. Ces délais incluent la conception et les révisions.",
      en: "Depending on the plan: 7 days for a Showcase Site, 14 days for a Business Site and 21 days for an E-commerce site. These timeframes include design and revisions.",
      vi: "Tùy theo gói: 7 ngày cho website giới thiệu, 14 ngày cho website doanh nghiệp và 21 ngày cho thương mại điện tử. Thời gian này đã bao gồm thiết kế và chỉnh sửa.",
      ar: "بحسب الباقة: 7 أيام للموقع التعريفي، و14 يومًا لموقع الأعمال، و21 يومًا لمتجر إلكتروني. تشمل هذه المدد التصميم والمراجعات.",
      ru: "В зависимости от пакета: 7 дней для презентационного сайта, 14 дней для бизнес-сайта и 21 день для интернет-магазина. Сроки включают дизайн и правки.",
    },
  },
  {
    category: "tarifs",
    q: {
      fr: "Les prix affichés sont-ils définitifs ?",
      en: "Are the displayed prices final?",
      vi: "Giá hiển thị có phải là giá cuối cùng không?",
      ar: "هل الأسعار المعروضة نهائية؟",
      ru: "Окончательные ли указанные цены?",
    },
    a: {
      fr: "Les tarifs indiqués sont des prix de départ. Le devis final dépend du périmètre exact (pages, langues, intégrations). Aucun frais caché n'est ajouté après validation du devis.",
      en: "Listed rates are starting prices. The final quote depends on the exact scope (pages, languages, integrations). No hidden fees are added after quote approval.",
      vi: "Mức giá niêm yết là giá khởi điểm. Báo giá cuối phụ thuộc phạm vi cụ thể (trang, ngôn ngữ, tích hợp). Không có phí ẩn sau khi duyệt báo giá.",
      ar: "الأسعار المنشورة هي أسعار بدء. يعتمد العرض النهائي على النطاق الفعلي من صفحات ولغات وتكاملات. لا تتم إضافة رسوم مخفية بعد اعتماد العرض.",
      ru: "Опубликованные цены являются стартовыми. Финальная смета зависит от точного объёма: страниц, языков и интеграций. После согласования сметы скрытые сборы не добавляются.",
    },
  },
  {
    category: "general",
    q: {
      fr: "Travaillez-vous à distance et à l'international ?",
      en: "Do you work remotely and internationally?",
      vi: "Bạn có làm việc từ xa và quốc tế không?",
    },
    a: {
      fr: "Oui. XR Agency accompagne des clients en France, en Asie et à l'international, entièrement à distance, avec des points de suivi réguliers.",
      en: "Yes. XR Agency works with clients in France, Asia and internationally, fully remotely, with regular check-ins.",
      vi: "Có. XR Agency đồng hành với khách hàng tại Pháp, Châu Á và quốc tế, hoàn toàn từ xa, với các buổi cập nhật định kỳ.",
      ar: "نعم. تعمل XR Agency مع عملاء في فرنسا وآسيا ودوليًا عن بُعد بالكامل، مع نقاط متابعة منتظمة.",
      ru: "Да. XR Agency работает с клиентами во Франции, Азии и на международном уровне полностью удалённо, с регулярными точками контроля.",
    },
  },
  {
    category: "general",
    q: {
      fr: "Les droits d'utilisation de mon identité sont-ils inclus ?",
      en: "Are the usage rights to my identity included?",
      vi: "Quyền sử dụng bộ nhận diện có được bao gồm không?",
    },
    a: {
      fr: "Oui. Vous êtes propriétaire de votre identité visuelle : tous les droits d'utilisation commerciale sont cédés à la livraison.",
      en: "Yes. You own your visual identity: all commercial usage rights are transferred on delivery.",
      vi: "Có. Bạn sở hữu bộ nhận diện của mình: toàn bộ quyền sử dụng thương mại được chuyển giao khi bàn giao.",
      ar: "نعم. تصبح الهوية البصرية ملكًا لكم، مع نقل حقوق الاستخدام التجاري عند التسليم.",
      ru: "Да. Вы владеете своей визуальной айдентикой, а коммерческие права передаются при сдаче проекта.",
    },
  },
];

export const SHOWCASE = [
  { id: "xr-pok-n-ball", name: "Pok-N Ball", url: "https://pokebowlfresh.vercel.app/", sectorKey: "sectorGastronomie", services: ["websites"], type: { fr: "site restaurant / commande", en: "restaurant / ordering site", vi: "website nhà hàng / đặt món" }, desc: { fr: "Projet XR Agency : expérience digitale orientée commande et conversion.", en: "XR Agency project focused on ordering and conversion.", vi: "Dự án XR Agency tập trung vào đặt món và chuyển đổi." }, metric: "XR AGENCY · WEBSITE + COMMANDE", image: "https://image.thum.io/get/width/1800/crop/1050/noanimate/https://pokebowlfresh.vercel.app/" },
];

export const PORTFOLIO = SHOWCASE.map((s, i) => ({
  plate: String(i + 1).padStart(2, "0"),
  name: s.name,
  sector: s.type,
  result: { fr: s.metric, en: s.metric, vi: s.metric },
  tags: [s.type.en],
  image: s.image,
}));

export const TESTIMONIALS = [];
