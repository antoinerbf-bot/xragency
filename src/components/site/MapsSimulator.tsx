import { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPinned,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Award,
  Zap,
  Users,
  BarChart3,
  Gauge,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";


const MAPS_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Restaurant / Bar": "Restaurant / Bar", "Hôtel / Spa": "Hotel / Spa", "Santé / Médecin": "Healthcare / Doctor", "Avocat / Notaire": "Lawyer / Notary", "Immobilier": "Real Estate", "Artisan / BTP": "Trades / Construction", "Beauté / Bien-être": "Beauty / Wellness", "Autre commerce": "Other Business",
    "Petite ville": "Small Town", "Ville moyenne": "Mid-sized City", "Grande ville": "Major City", "Métropole": "Metropolis",
    "< 50 000 hab.": "< 50,000 inhab.", "50 000 – 150 000": "50,000 – 150,000", "150 000 – 500 000": "150,000 – 500,000", "500 000+": "500,000+",
    "1 à 3": "1 to 3", "4 à 6": "4 to 6", "7 à 10": "7 to 10",
    "mots-clés principaux": "main keywords",
    "Absent de Maps": "Not on Maps", "Fiche non créée ou invisible": "Listing not created or invisible",
    "Hors Top 20": "Outside Top 20", "Très peu visible": "Very low visibility",
    "Position 4 – 10": "Position 4 – 10", "Visible mais pas dans le Pack": "Visible but outside the Local Pack",
    "SIMULATION EN DIRECT": "LIVE SIMULATION", "RECHERCHE CIBLE": "TARGET SEARCH", "POSITION ACTUELLE": "CURRENT POSITION",
    "VISIBILITÉ À CONSTRUIRE": "VISIBILITY TO BUILD", "SIGNAL À RENFORCER": "SIGNAL TO STRENGTHEN", "POSITIONNEMENT À DÉVELOPPER": "POSITIONING TO IMPROVE",
    "Configurateur de projet": "Project Configurator",
    "Estimez votre investissement Google Maps": "Estimate your Google Maps investment",
    "Votre secteur d'activité": "Your industry",
    "Taille de votre ville": "City size",
    "Nombre de mots-clés principaux": "Number of main keywords",
    "Votre positionnement actuel sur Google Maps": "Your current Google Maps ranking",
    "Budget indicatif · à partir de 990 € / an": "Indicative budget · from €990 / year",
    "/ an": "/ year",
    "Estimation indicative · tarif exact après audit personnalisé": "Indicative estimate · exact price after personalized audit",
    "Objectif Top 3 · étude locale sur mesure": "Top 3 Target · tailored local study",
    "Lancer mon audit gratuit": "Start my free audit",
    "Audit initial offert": "Initial audit included",
    "Périmètre contractuel clair": "Clear contractual scope",
    "Rapport mensuel inclus": "Monthly report included",
    "Sans engagement minimum": "No minimum commitment",
    "Méthodologie exclusive": "Exclusive methodology",
    "Le processus en 7 phases": "The 7-Phase Process",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.": "A structured, transparent and measurable approach to enhance your local visibility.",
    "à partir de 990 € / an · objectif Top 3 sans garantie de position": "From €990 / year · Top 3 objective without position guarantee",
    "Analyse Initiale": "Initial Analysis", "Diagnostic de présence": "Presence Diagnostic", "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.": "Complete technical audit of your current listing, review history, NAP data consistency and potential penalties.",
    "Audit Concurrentiel": "Competitor Audit", "Décryptage du TOP 3": "Top 3 Breakdown", "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.": "In-depth analysis of the 3 competitors currently occupying the Local Pack: review volume, keywords and authority.",
    "Stratégie Ciblée": "Targeted Strategy", "Mots-clés & Zones": "Keywords & Areas", "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.": "Rigorous selection of high-converting search queries and mapping of priority geographical radiuses.",
    "Optimisation GBP": "GBP Optimization", "Restructuration Pro": "Pro Restructuring", "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.": "Optimization of primary/secondary categories, geotagged HD visuals, key attributes and service catalog.",
    "Autorité Locale": "Local Authority", "Signaux & Citations NAP": "NAP Signals & Citations", "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.": "Deployment of consistent local citations (Name, Address, Phone) and reinforcement of territorial authority.",
    "Pilotage Actif": "Active Management", "Veille & Ajustements": "Monitoring & Tuning", "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.": "Regular strategic updates, geotagged posts publication and conversion-optimized review responses.",
    "Résultats & ROI": "Results & ROI", "Mesure transparente": "Transparent Tracking", "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.": "Weekly ranking dashboard, phone call tracking and direction request metrics.",
    "TOP 1 PACK LOCAL · PROJECTION XR AGENCY": "TOP 1 LOCAL PACK · XR AGENCY PROJECTION",
    "Votre Établissement": "Your Business",
    "4.9 ★★★★★ (284 avis Google vérifiés)": "4.9 ★★★★★ (284 verified Google reviews)",
    "Ouvert · Ferme à 23h30": "Open · Closes 11:30 PM",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée": "Local excellence · Exceptional setting, flawless service and certified reputation",
    "Site web": "Website", "Itinéraire": "Directions", "Appeler": "Call",
    "Concurrent B (Fiche standard)": "Competitor B (Standard listing)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 reviews) · Unoptimized listing",
    "Concurrent C (Peu visible)": "Competitor C (Low visibility)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs": "3.8 ★★★☆☆ (12 reviews) · Missing catalog and attributes",
    "Ouvert actuellement": "Open now", "Note 4,5★ et +": "Rated 4.5★+", "Visite virtuelle": "Virtual tour",
    "Trafic fluide": "Clear traffic", "Calculateur de Rentabilité & ROI Local": "Local Profitability & ROI Calculator",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :": "Direct Top 3 Google Maps impact on your revenue:",
    "Recherches locales / mois": "Local searches / mo",
    "Trafic capté par le Top 3": "Traffic captured by Top 3",
    "Nouveaux clients estimés": "Estimated new clients",
    "CA additionnel estimé": "Estimated added revenue",
    "Réserver mon secteur avant mes concurrents": "Claim my sector before competitors",
    "Amorti dès le 1er mois grâce aux contacts entrants.": "Paid off from month 1 through incoming leads."
  },
  vi: {
    "Restaurant / Bar": "Nhà hàng / Bar", "Hôtel / Spa": "Khách sạn / Spa", "Santé / Médecin": "Y tế / Bác sĩ", "Avocat / Notaire": "Luật sư / Công chứng viên", "Immobilier": "Bất động sản", "Artisan / BTP": "Thợ thủ công / Xây dựng", "Beauté / Bien-être": "Làm đẹp / Sức khỏe", "Autre commerce": "Doanh nghiệp khác",
    "Petite ville": "Thành phố nhỏ", "Ville moyenne": "Thành phố vừa", "Grande ville": "Thành phố lớn", "Métropole": "Đô thị lớn",
    "< 50 000 hab.": "< 50.000 dân", "50 000 – 150 000": "50.000 – 150.000", "150 000 – 500 000": "150.000 – 500.000", "500 000+": "500.000+",
    "1 à 3": "1 đến 3", "4 à 6": "4 đến 6", "7 à 10": "7 đến 10",
    "mots-clés principaux": "từ khóa chính",
    "Absent de Maps": "Chưa có trên Maps", "Fiche non créée ou invisible": "Chưa tạo hồ sơ hoặc không hiển thị",
    "Hors Top 20": "Ngoài Top 20", "Très peu visible": "Khả năng hiển thị rất thấp",
    "Position 4 – 10": "Vị trí 4 – 10", "Visible mais pas dans le Pack": "Có hiển thị nhưng ngoài Local Pack",
    "SIMULATION EN DIRECT": "MÔ PHỎNG TRỰC TIẾP", "RECHERCHE CIBLE": "TÌM KIẾM MỤC TIÊU", "POSITION ACTUELLE": "VỊ TRÍ HIỆN TẠI",
    "VISIBILITÉ À CONSTRUIRE": "CẦN XÂY DỰNG HIỂN THỊ", "SIGNAL À RENFORCER": "CẦN TĂNG CƯỜNG TÍN HIỆU", "POSITIONNEMENT À DÉVELOPPER": "CẦN CẢI THIỆN THỨ HẠNG",
    "Configurateur de projet": "Cấu hình dự án",
    "Estimez votre investissement Google Maps": "Ước tính ngân sách Google Maps",
    "Votre secteur d'activité": "Lĩnh vực hoạt động",
    "Taille de votre ville": "Quy mô thành phố",
    "Nombre de mots-clés principaux": "Số lượng từ khóa chính",
    "Votre positionnement actuel sur Google Maps": "Thứ hạng Google Maps hiện tại",
    "Budget indicatif · à partir de 990 € / an": "Ngân sách tham khảo · từ 990 € / năm",
    "/ an": "/ năm",
    "Estimation indicative · tarif exact après audit personnalisé": "Ước tính tham khảo · giá chính xác sau kiểm toán cá nhân hóa",
    "Objectif Top 3 · étude locale sur mesure": "Mục tiêu Top 3 · nghiên cứu địa phương theo yêu cầu",
    "Lancer mon audit gratuit": "Bắt đầu kiểm toán miễn phí",
    "Audit initial offert": "Miễn phí kiểm toán ban đầu",
    "Périmètre contractuel clair": "Phạm vi hợp đồng rõ ràng",
    "Rapport mensuel inclus": "Bao gồm báo cáo hằng tháng",
    "Sans engagement minimum": "Không cam kết thời hạn tối thiểu",
    "Méthodologie exclusive": "Phương pháp độc quyền",
    "Le processus en 7 phases": "Quy trình 7 giai đoạn",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.": "Phương pháp tiếp cận có cấu trúc, minh bạch và đo lường được để nâng cao khả năng hiển thị địa phương của bạn.",
    "à partir de 990 € / an · objectif Top 3 sans garantie de position": "Từ 990 € / năm · Mục tiêu Top 3 không cam kết vị trí cố định",
    "Analyse Initiale": "Phân tích ban đầu", "Diagnostic de présence": "Chẩn đoán hiện diện", "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.": "Kiểm toán kỹ thuật toàn diện hồ sơ hiện tại, lịch sử đánh giá, tính nhất quán dữ liệu và các hình phạt tiềm ẩn.",
    "Audit Concurrentiel": "Kiểm toán đối thủ", "Décryptage du TOP 3": "Phân tích TOP 3", "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.": "Phân tích chuyên sâu 3 đối thủ đang chiếm giữ Local Pack: lượng đánh giá, từ khóa và độ uy tín.",
    "Stratégie Ciblée": "Chiến lược mục tiêu", "Mots-clés & Zones": "Từ khóa & Khu vực", "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.": "Lựa chọn kỹ lưỡng các truy vấn có tỷ lệ chuyển đổi cao và lập bản đồ bán kính địa lý ưu tiên.",
    "Optimisation GBP": "Tối ưu hóa GBP", "Restructuration Pro": "Tái cấu trúc chuyên nghiệp", "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.": "Tối ưu danh mục chính/phụ, gắn tọa độ hình ảnh HD, thuộc tính cốt lõi và danh mục dịch vụ.",
    "Autorité Locale": "Uy tín địa phương", "Signaux & Citations NAP": "Tín hiệu & Trích dẫn NAP", "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.": "Triển khai trích dẫn địa phương đồng bộ (Tên, Địa chỉ, Số điện thoại) và tăng cường vị thế khu vực.",
    "Pilotage Actif": "Quản trị chủ động", "Veille & Ajustements": "Theo dõi & Điều chỉnh", "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.": "Cập nhật chiến lược định kỳ, xuất bản bài đăng cục bộ và phản hồi đánh giá khách hàng tối ưu.",
    "Résultats & ROI": "Kết quả & ROI", "Mesure transparente": "Đo lường minh bạch", "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.": "Bảng điều khiển theo dõi thứ hạng hằng tuần, số cuộc gọi đến và yêu cầu chỉ đường.",
    "TOP 1 PACK LOCAL · PROJECTION XR AGENCY": "TOP 1 LOCAL PACK · DỰ BÁO XR AGENCY",
    "Votre Établissement": "Doanh nghiệp của bạn",
    "4.9 ★★★★★ (284 avis Google vérifiés)": "4.9 ★★★★★ (284 đánh giá Google đã xác minh)",
    "Ouvert · Ferme à 23h30": "Đang mở cửa · Đóng cửa lúc 23:30",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée": "Uy tín hàng đầu · Không gian đẳng cấp, dịch vụ hoàn hảo và danh tiếng chứng thực",
    "Site web": "Website", "Itinéraire": "Chỉ đường", "Appeler": "Gọi điện",
    "Concurrent B (Fiche standard)": "Đối thủ B (Hồ sơ tiêu chuẩn)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 đánh giá) · Chưa tối ưu",
    "Concurrent C (Peu visible)": "Đối thủ C (Hiển thị kém)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs": "3.8 ★★★☆☆ (12 đánh giá) · Thiếu danh mục và thuộc tính",
    "Ouvert actuellement": "Đang mở cửa", "Note 4,5★ et +": "Đánh giá 4.5★+", "Visite virtuelle": "Tham quan ảo",
    "Trafic fluide": "Giao thông thông suốt", "Calculateur de Rentabilité & ROI Local": "Công cụ tính Lợi nhuận & ROI địa phương",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :": "Tác động trực tiếp của Top 3 Google Maps lên doanh thu của bạn:",
    "Recherches locales / mois": "Lượt tìm kiếm địa phương / tháng",
    "Trafic capté par le Top 3": "Lưu lượng Top 3 nắm giữ",
    "Nouveaux clients estimés": "Khách hàng mới ước tính",
    "CA additionnel estimé": "Doanh thu bổ sung ước tính",
    "Réserver mon secteur avant mes concurrents": "Đặt chỗ khu vực của tôi trước đối thủ",
    "Amorti dès le 1er mois grâce aux contacts entrants.": "Hoàn vốn ngay từ tháng đầu tiên nhờ khách hàng chủ động liên hệ."
  },
  ru: {
    "Restaurant / Bar": "Ресторан / бар", "Hôtel / Spa": "Отель / спа", "Santé / Médecin": "Медицина / врач", "Avocat / Notaire": "Юрист / нотариус", "Immobilier": "Недвижимость", "Artisan / BTP": "Мастер / строительство", "Beauté / Bien-être": "Красота / wellness", "Autre commerce": "Другой бизнес",
    "Petite ville": "Небольшой город", "Ville moyenne": "Средний город", "Grande ville": "Крупный город", "Métropole": "Мегаполис",
    "< 50 000 hab.": "< 50 000 жит.", "50 000 – 150 000": "50 000 – 150 000", "150 000 – 500 000": "150 000 – 500 000", "500 000+": "500 000+",
    "1 à 3": "1–3", "4 à 6": "4–6", "7 à 10": "7–10",
    "mots-clés principaux": "основных ключевых слов",
    "Absent de Maps": "Нет на Maps", "Fiche non créée ou invisible": "Профиль не создан или не виден",
    "Hors Top 20": "За пределами топ-20", "Très peu visible": "Очень низкая видимость",
    "Position 4 – 10": "Позиция 4–10", "Visible mais pas dans le Pack": "Видимость есть, но не в Local Pack",
    "SIMULATION EN DIRECT": "ИНТЕРАКТИВНАЯ СИМУЛЯЦИЯ", "RECHERCHE CIBLE": "ЦЕЛЕВОЙ ПОИСК", "POSITION ACTUELLE": "ТЕКУЩАЯ ПОЗИЦИЯ",
    "VISIBILITÉ À CONSTRUIRE": "ВИДИМОСТЬ НУЖНО СОЗДАТЬ", "SIGNAL À RENFORCER": "СИГНАЛ НУЖНО УСИЛИТЬ", "POSITIONNEMENT À DÉVELOPPER": "ПОЗИЦИЮ НУЖНО УЛУЧШИТЬ",
    "Configurateur de projet": "Конфигуратор проекта",
    "Estimez votre investissement Google Maps": "Оцените инвестиции в Google Maps",
    "Votre secteur d'activité": "Ваша сфера деятельности",
    "Taille de votre ville": "Размер города",
    "Nombre de mots-clés principaux": "Количество основных ключевых слов",
    "Votre positionnement actuel sur Google Maps": "Ваше текущее положение в Google Maps",
    "Budget indicatif · à partir de 990 € / an": "Ориентировочный бюджет · от 990 € в год",
    "/ an": "/ год",
    "Estimation indicative · tarif exact après audit personnalisé": "Предварительная оценка · точная цена после персонального аудита",
    "Objectif Top 3 · étude locale sur mesure": "Цель — топ-3 · индивидуальное локальное исследование",
    "Lancer mon audit gratuit": "Начать бесплатный аудит",
    "Audit initial offert": "Первичный аудит включён",
    "Périmètre contractuel clair": "Чёткий объём договора",
    "Rapport mensuel inclus": "Ежемесячный отчёт включён",
    "Sans engagement minimum": "Без минимального срока обязательств",
    "Méthodologie exclusive": "Эксклюзивная методология",
    "Le processus en 7 phases": "Процесс из 7 этапов",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.": "Структурированный, прозрачный и измеримый подход для усиления вашей локальной видимости.",
    "à partir de 990 € / an · objectif Top 3 sans garantie de position": "От 990 € в год · Цель — топ-3 без гарантии точной позиции",
    "Analyse Initiale": "Начальный анализ", "Diagnostic de présence": "Диагностика присутствия", "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.": "Полный технический аудит текущего профиля, истории отзывов, согласованности данных и возможных санкций.",
    "Audit Concurrentiel": "Анализ конкурентов", "Décryptage du TOP 3": "Разбор топ-3", "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.": "Детальный анализ 3 лидеров в Local Pack: объём отзывов, ключевые слова и авторитет профиля.",
    "Stratégie Ciblée": "Целевая стратегия", "Mots-clés & Zones": "Ключи и зоны", "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.": "Тщательный отбор конверсионных запросов и картирование приоритетных географических зон.",
    "Optimisation GBP": "Оптимизация GBP", "Restructuration Pro": "Про-реструктуризация", "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.": "Оптимизация категорий, геотегирование HD-фото, ключевые атрибуты и каталог услуг.",
    "Autorité Locale": "Локальный авторитет", "Signaux & Citations NAP": "Сигналы и NAP-цитирования", "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.": "Размещение единых локальных упоминаний (Имя, Адрес, Телефон) и усиление территориального доверия.",
    "Pilotage Actif": "Активное управление", "Veille & Ajustements": "Мониторинг и правки", "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.": "Регулярные стратегические обновления, публикации с геолокацией и оптимизированные ответы на отзывы.",
    "Résultats & ROI": "Результаты и ROI", "Mesure transparente": "Прозрачная отчётность", "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.": "Еженедельный дашборд отслеживания позиций, звонков и запросов маршрута.",
    "TOP 1 PACK LOCAL · PROJECTION XR AGENCY": "ТОП-1 LOCAL PACK · ПРОГНОЗ XR AGENCY",
    "Votre Établissement": "Ваша компания",
    "4.9 ★★★★★ (284 avis Google vérifiés)": "4.9 ★★★★★ (284 проверенных отзыва в Google)",
    "Ouvert · Ferme à 23h30": "Открыто · Закрывается в 23:30",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée": "Локальный лидер · Премиальный сервис, безупречное качество и подтверждённая репутация",
    "Site web": "Сайт", "Itinéraire": "Маршрут", "Appeler": "Позвонить",
    "Concurrent B (Fiche standard)": "Конкурент B (Обычный профиль)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 отзыва) · Профиль не оптимизирован",
    "Concurrent C (Peu visible)": "Конкурент C (Низкая видимость)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs": "3.8 ★★★☆☆ (12 отзывов) · Нет каталога и атрибутов",
    "Ouvert actuellement": "Открыто сейчас", "Note 4,5★ et +": "Оценка 4.5★+", "Visite virtuelle": "3D-тур",
    "Trafic fluide": "Дорога свободна", "Calculateur de Rentabilité & ROI Local": "Калькулятор окупаемости и локального ROI",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :": "Прямое влияние топ-3 Google Maps на вашу прибыль:",
    "Recherches locales / mois": "Локальных поисков / мес",
    "Trafic capté par le Top 3": "Трафик, забираемый топ-3",
    "Nouveaux clients estimés": "Оценка новых клиентов",
    "CA additionnel estimé": "Ориентировочная доп. выручка",
    "Réserver mon secteur avant mes concurrents": "Занять нишу раньше конкурентов",
    "Amorti dès le 1er mois grâce aux contacts entrants.": "Окупается с первого месяца за счёт входящих обращений."
  },
  ar: {
    "Restaurant / Bar": "مطعم / بار", "Hôtel / Spa": "فندق / سبا", "Santé / Médecin": "الصحة / طبيب", "Avocat / Notaire": "محامٍ / موثق", "Immobilier": "العقارات", "Artisan / BTP": "حرفي / إنشاءات", "Beauté / Bien-être": "الجمال / العافية", "Autre commerce": "نشاط تجاري آخر",
    "Petite ville": "مدينة صغيرة", "Ville moyenne": "مدينة متوسطة", "Grande ville": "مدينة كبيرة", "Métropole": "منطقة حضرية كبرى",
    "< 50 000 hab.": "< 50,000 نسمة", "50 000 – 150 000": "50,000 – 150,000", "150 000 – 500 000": "150,000 – 500,000", "500 000+": "+500,000",
    "1 à 3": "1 إلى 3", "4 à 6": "4 إلى 6", "7 à 10": "7 إلى 10",
    "mots-clés principaux": "كلمات مفتاحية رئيسية",
    "Absent de Maps": "غير موجود على Maps", "Fiche non créée ou invisible": "الملف غير منشأ أو غير ظاهر",
    "Hors Top 20": "خارج أفضل 20", "Très peu visible": "ظهور محدود جدًا",
    "Position 4 – 10": "الترتيب 4–10", "Visible mais pas dans le Pack": "ظاهر ولكن خارج الحزمة المحلية",
    "SIMULATION EN DIRECT": "محاكاة مباشرة", "RECHERCHE CIBLE": "البحث المستهدف", "POSITION ACTUELLE": "الترتيب الحالي",
    "VISIBILITÉ À CONSTRUIRE": "يلزم بناء الظهور", "SIGNAL À RENFORCER": "يلزم تعزيز الإشارات", "POSITIONNEMENT À DÉVELOPPER": "يلزم تحسين الترتيب",
    "Configurateur de projet": "مُهيّئ المشروع",
    "Estimez votre investissement Google Maps": "قدّر استثمارك في Google Maps",
    "Votre secteur d'activité": "مجال نشاطك",
    "Taille de votre ville": "حجم مدينتك",
    "Nombre de mots-clés principaux": "عدد الكلمات المفتاحية الرئيسية",
    "Votre positionnement actuel sur Google Maps": "ترتيبك الحالي على Google Maps",
    "Budget indicatif · à partir de 990 € / an": "ميزانية تقديرية · ابتداءً من 990 € سنويًا",
    "/ an": "/ سنويًا",
    "Estimation indicative · tarif exact après audit personnalisé": "تقدير أولي · السعر الدقيق بعد التدقيق المخصص",
    "Objectif Top 3 · étude locale sur mesure": "هدف أفضل 3 · دراسة محلية مخصصة",
    "Lancer mon audit gratuit": "ابدأ التدقيق المجاني",
    "Audit initial offert": "التدقيق الأولي مشمول",
    "Périmètre contractuel clair": "نطاق تعاقدي واضح",
    "Rapport mensuel inclus": "تقرير شهري مشمول",
    "Sans engagement minimum": "دون حد أدنى للالتزام",
    "Méthodologie exclusive": "منهجية حصرية",
    "Le processus en 7 phases": "العملية في 7 مراحل",
    "Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.": "نهج منظم وشفاف وقابل للقياس لتعزيز ظهورك المحلي.",
    "à partir de 990 € / an · objectif Top 3 sans garantie de position": "ابتداءً من 990 € سنويًا · هدف الوصول لأفضل 3 دون ضمان ترتيب محدد",
    "Analyse Initiale": "التحليل الأولي", "Diagnostic de présence": "تشخيص الحضور", "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles.": "تدقيق تقني شامل لملفك الحالي، وسجل التقييمات، وتناسق البيانات، وأي عقوبات محتملة.",
    "Audit Concurrentiel": "تدقيق المنافسين", "Décryptage du TOP 3": "تحليل أفضل 3", "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité.": "تحليل دقيق لأبرز 3 منافسين يتصدرون الحزمة المحلية: حجم التقييمات، والكلمات المفتاحية، والسمعة.",
    "Stratégie Ciblée": "استراتيجية مستهدفة", "Mots-clés & Zones": "الكلمات والمناطق", "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires.": "اختيار مدروس للعبارات ذات معدل التحويل العالي وتحديد النطاقات الجغرافية ذات الأولوية.",
    "Optimisation GBP": "تحسين ملف GBP", "Restructuration Pro": "إعادة هيكلة احترافية", "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services.": "تحسين الفئات الأساسية والفرعية، ووضع الإحداثيات لصور HD، والسمات الرئيسية وكتالوج الخدمات.",
    "Autorité Locale": "السلطة المحلية", "Signaux & Citations NAP": "إشارات واقتباسات NAP", "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale.": "نشر اقتباسات محلية متطابقة (الاسم، العنوان، الهاتف) وتعزيز الموثوقية في نطاقك الجغرافي.",
    "Pilotage Actif": "إدارة ومتابعة نشطة", "Veille & Ajustements": "رصد وتحديثات مستمرة", "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients.": "تحديثات استراتيجية دورية، نشر منشورات جغرافية، وردود مُحسَّنة على تقييمات العملاء.",
    "Résultats & ROI": "النتائج وعائد الاستثمار", "Mesure transparente": "قياس شفاف", "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire.": "لوحة تحكم أسبوعية لتتبع الترتيب، وعدد المكالمات الهاتفية، وطلبات الاتجاهات.",
    "TOP 1 PACK LOCAL · PROJECTION XR AGENCY": "أفضل 1 بالحزمة المحلية · توقعات XR AGENCY",
    "Votre Établissement": "منشأتك",
    "4.9 ★★★★★ (284 avis Google vérifiés)": "4.9 ★★★★★ (284 تقييم موثق على Google)",
    "Ouvert · Ferme à 23h30": "مفتوح · يغلق عند الساعة 23:30",
    "Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée": "ريادة محلية · موقع استثنائي، خدمة رفيعة المستوى وسمعة معتمدة",
    "Site web": "الموقع الإلكتروني", "Itinéraire": "الاتجاهات", "Appeler": "اتصال",
    "Concurrent B (Fiche standard)": "المنافس ب (ملف قياسي)",
    "4.1 ★★★★☆ (34 avis) · Fiche non optimisée": "4.1 ★★★★☆ (34 تقييم) · ملف غير محسّن",
    "Concurrent C (Peu visible)": "المنافس ج (ظهور ضعيف)",
    "3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs": "3.8 ★★★☆☆ (12 تقييم) · يفتقر للكتالوج والميزات",
    "Ouvert actuellement": "مفتوح حالياً", "Note 4,5★ et +": "تقييم 4.5★ فما فوق", "Visite virtuelle": "جولة افتراضية",
    "Trafic fluide": "حركة مرور سلسة", "Calculateur de Rentabilité & ROI Local": "حاسبة العائد والربحية المحلية",
    "Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :": "الأثر المباشر لبلوغ أفضل 3 على إيراداتك:",
    "Recherches locales / mois": "عمليات البحث المحلية / شهر",
    "Trafic capté par le Top 3": "حركة المرور المكتسبة من أفضل 3",
    "Nouveaux clients estimés": "العملاء الجدد المتوقعون",
    "CA additionnel estimé": "الإيراد الإضافي المتوقع",
    "Réserver mon secteur avant mes concurrents": "احجز قطاعك قبل منافسيك",
    "Amorti dès le 1er mois grâce aux contacts entrants.": "تسترد استثمارك من الشهر الأول عبر العملاء الجدد."
  }
};
function translateMaps(value: string, lang: string) { return MAPS_TRANSLATIONS[lang]?.[value] ?? value; }

/* ── Sector options ── */
const SECTORS = [
  { id: "resto", icon: "🍽️", label: "Restaurant / Bar" },
  { id: "hotel", icon: "🏨", label: "Hôtel / Spa" },
  { id: "sante", icon: "⚕️", label: "Santé / Médecin" },
  { id: "juridique", icon: "⚖️", label: "Avocat / Notaire" },
  { id: "immo", icon: "🏠", label: "Immobilier" },
  { id: "artisan", icon: "🔨", label: "Artisan / BTP" },
  { id: "beaute", icon: "💆", label: "Beauté / Bien-être" },
  { id: "autre", icon: "💼", label: "Autre commerce" },
];

/* ── City size options ── */
const CITY_SIZES = [
  { id: "small", label: "Petite ville", sub: "< 50 000 hab.", multiplier: 1.0 },
  { id: "medium", label: "Ville moyenne", sub: "50 000 – 150 000", multiplier: 1.3 },
  { id: "large", label: "Grande ville", sub: "150 000 – 500 000", multiplier: 1.6 },
  { id: "metro", label: "Métropole", sub: "500 000+", multiplier: 2.1 },
];

/* ── Keywords volume options ── */
const KEYWORD_RANGES = [
  { id: "k1", label: "1 à 3", sub: "mots-clés principaux", factor: 1.0 },
  { id: "k2", label: "4 à 6", sub: "mots-clés principaux", factor: 1.25 },
  { id: "k3", label: "7 à 10", sub: "mots-clés principaux", factor: 1.55 },
];

/* ── Current ranking options ── */
const CURRENT_RANKS = [
  { id: "absent", label: "Absent de Maps", sub: "Fiche non créée ou invisible", penalty: 1.15 },
  { id: "below20", label: "Hors Top 20", sub: "Très peu visible", penalty: 1.08 },
  { id: "4to10", label: "Position 4 – 10", sub: "Visible mais pas dans le Pack", penalty: 1.0 },
];

/* ── 7-Phase methodology ── */
const PHASES = [
  { num: "01", name: "Analyse Initiale", title: "Diagnostic de présence", desc: "Audit technique complet de votre fiche actuelle, historique des avis, cohérence des données et pénalités éventuelles." },
  { num: "02", name: "Audit Concurrentiel", title: "Décryptage du TOP 3", desc: "Analyse chirurgicale des 3 concurrents occupant actuellement le Local Pack : volume d'avis, mots-clés et autorité." },
  { num: "03", name: "Stratégie Ciblée", title: "Mots-clés & Zones", desc: "Sélection rigoureuse des requêtes à fort volume de conversion et cartographie des rayons géographiques prioritaires." },
  { num: "04", name: "Optimisation GBP", title: "Restructuration Pro", desc: "Optimisation des catégories primaires/secondaires, géolocalisation des visuels HD, attributs clés et catalogue de services." },
  { num: "05", name: "Autorité Locale", title: "Signaux & Citations NAP", desc: "Déploiement de citations locales cohérentes (Nom, Adresse, Téléphone) et renforcement de votre crédibilité territoriale." },
  { num: "06", name: "Pilotage Actif", title: "Veille & Ajustements", desc: "Mises à jour stratégiques régulières, animation de posts géolocalisés et réponses optimisées aux avis clients." },
  { num: "07", name: "Résultats & ROI", title: "Mesure transparente", desc: "Tableau de bord de suivi hebdomadaire des positions, suivi des appels téléphoniques et des demandes d’itinéraire." },
];

/* ── Animated price counter ── */
function useAnimatedPrice(target: number, duration = 500) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

/* ── Selector Button ── */
function SelectorBtn({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center text-xs transition-all duration-200",
        selected
          ? "border-[var(--xr-ink)] bg-[var(--xr-accent-soft)] text-[var(--xr-ink)] shadow-sm ring-1 ring-[var(--xr-ink)]/15"
          : "border-border bg-card/60 text-muted-foreground hover:border-[var(--xr-ink)]/40 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function MapsSimulator() {
  const { price: formatPrice, lang } = useLang();
  const tx = (value: string) => translateMaps(value, lang);

  const [sector, setSector] = useState(SECTORS[0].id);
  const [citySize, setCitySize] = useState(CITY_SIZES[0].id);
  const [keywords, setKeywords] = useState(KEYWORD_RANGES[0].id);
  const [rank, setRank] = useState(CURRENT_RANKS[0].id);

  /* ── Dynamic price calculation ── */
  const { priceMin, priceMax } = useMemo(() => {
    const base = 990;
    const sizeMul = CITY_SIZES.find((c) => c.id === citySize)?.multiplier ?? 1;
    const kwFactor = KEYWORD_RANGES.find((k) => k.id === keywords)?.factor ?? 1;
    const rankPenalty = CURRENT_RANKS.find((r) => r.id === rank)?.penalty ?? 1;
    const raw = base * sizeMul * kwFactor * rankPenalty;
    return {
      priceMin: Math.round(raw / 100) * 100,
      priceMax: Math.round((raw * 1.45) / 100) * 100,
    };
  }, [citySize, keywords, rank]);

  const animMin = useAnimatedPrice(priceMin);
  const animMax = useAnimatedPrice(priceMax);

  const selectedSector = SECTORS.find((s) => s.id === sector);
  const sectorLabel = tx(selectedSector?.label ?? "");
  const cityLabel = tx(CITY_SIZES.find((c) => c.id === citySize)?.label ?? "");
  const kwLabel = `${KEYWORD_RANGES.find((k) => k.id === keywords)?.label ?? ""} ${tx("mots-clés principaux")}`;
  const rankLabel = tx(CURRENT_RANKS.find((r) => r.id === rank)?.label ?? "");

  const roiMetrics = useMemo(() => {
    const cityData: Record<string, { searches: number; example: Record<string, string> }> = {
      small: { searches: 2400, example: { fr: "Cannes", en: "Oxford", vi: "Đà Lạt", ar: "عجمان", ru: "Сочи" } },
      medium: { searches: 5200, example: { fr: "Bordeaux", en: "Bristol", vi: "Đà Nẵng", ar: "الشارقة", ru: "Казань" } },
      large: { searches: 11400, example: { fr: "Lyon", en: "Manchester", vi: "Hà Nội", ar: "أبوظبي", ru: "Санкт-Петербург" } },
      metro: { searches: 24800, example: { fr: "Paris 8e", en: "London Mayfair", vi: "TP. Hồ Chí Minh", ar: "دبي", ru: "Москва" } },
    };

    const kwFactor = keywords === "k1" ? 1 : keywords === "k2" ? 1.75 : 2.5;
    const baseSearches = Math.round((cityData[citySize]?.searches ?? 5000) * kwFactor);
    const top3Captured = Math.round(baseSearches * 0.38); // 38% CTR Local Pack
    const newClients = Math.max(16, Math.round(top3Captured * 0.045));
    const avgBasket = sector === "juridique" ? 450 : sector === "hotel" ? 280 : sector === "immo" ? 850 : sector === "resto" ? 75 : sector === "sante" ? 120 : 95;
    const addedRevenueMonth = Math.round(newClients * avgBasket);
    const cityName = cityData[citySize]?.example[lang as keyof typeof cityData.small.example] ?? cityData[citySize]?.example.fr;

    return {
      baseSearches,
      top3Captured,
      newClients,
      addedRevenueMonth,
      cityName,
    };
  }, [citySize, keywords, sector, lang]);

  const waPrefill = encodeURIComponent(({
    fr: `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.\n\n` +
      `• Secteur : ${sectorLabel}\n` +
      `• Taille de ville : ${cityLabel}\n` +
      `• Mots-clés : ${kwLabel}\n` +
      `• Position actuelle : ${rankLabel}\n\n` +
      `Référence de départ : à partir de 990 € / an · devis sur mesure\n\n` +
      `Pouvons-nous lancer l'audit personnalisé ?`,
    en: `Hello XR Agency, I would like a tailored Google Maps Top 3 study.\n\n` +
      `• Industry: ${sectorLabel}\n` +
      `• City size: ${cityLabel}\n` +
      `• Keywords: ${kwLabel}\n` +
      `• Current ranking: ${rankLabel}\n\n` +
      `Starting benchmark: from €990 / year · tailored quote\n\n` +
      `Can we start the personalised audit?`,
    vi: `Xin chào XR Agency, tôi muốn được tư vấn gói Google Maps Top 3 theo yêu cầu.\n\n` +
      `• Lĩnh vực: ${sectorLabel}\n` +
      `• Quy mô thành phố: ${cityLabel}\n` +
      `• Từ khóa: ${kwLabel}\n` +
      `• Thứ hạng hiện tại: ${rankLabel}\n\n` +
      `Mức tham khảo: từ 990 € / năm · báo giá theo yêu cầu\n\n` +
      `Chúng ta có thể bắt đầu kiểm toán cá nhân hóa không?`,
    ar: `مرحبًا XR Agency، أود الحصول على دراسة مخصصة لبلوغ أفضل 3 مراتب على Google Maps.\n\n` +
      `• مجال النشاط: ${sectorLabel}\n` +
      `• حجم المدينة: ${cityLabel}\n` +
      `• الكلمات المفتاحية: ${kwLabel}\n` +
      `• الترتيب الحالي: ${rankLabel}\n\n` +
      `المرجع المبدئي: ابتداءً من 990 € سنويًا · عرض مخصص\n\n` +
      `هل يمكننا بدء التدقيق المخصص؟`,
    ru: `Здравствуйте, XR Agency! Хочу заказать индивидуальный расчёт по выводу в топ-3 Google Maps.\n\n` +
      `• Сфера: ${sectorLabel}\n` +
      `• Размер города: ${cityLabel}\n` +
      `• Ключевые слова: ${kwLabel}\n` +
      `• Текущая позиция: ${rankLabel}\n\n` +
      `Базовый ориентир: от 990 € в год · индивидуальный расчёт\n\n` +
      `Можем ли мы запустить персональный аудит?`,
  } as const)[(lang as "fr" | "en" | "vi" | "ar" | "ru")] ?? `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.`);

  return (
    <section id="maps" className="xr-section-elevated relative border-y xr-line py-20 sm:py-28 lg:py-32">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: "var(--gradient-halo)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 space-y-16 sm:space-y-20">

        {/* ── Section Header ── */}
        <div>
          <SectionHeading
            label={{ fr: "GOOGLE BUSINESS PROFILE · LOCAL SEO", en: "GOOGLE BUSINESS PROFILE · LOCAL SEO", vi: "GOOGLE BUSINESS PROFILE · LOCAL SEO" }}
            line1={{ fr: "Construisons votre visibilité", en: "Build your local visibility", vi: "Xây dựng khả năng hiển thị địa phương", ru: "Повысим вашу видимость", ar: "لنبنِ ظهورك" }}
            line2={{
              fr: "sur Google Maps, sur mesure.",
              en: "on Google Maps, built around you.",
              vi: "trên Google Maps, theo nhu cầu của bạn.",
              ru: "в Google Maps с учётом ваших задач.",
              ar: "على Google Maps بما يناسبك.",
            }}
            lead={{
              fr: "À partir de 990 € / an. Audit, optimisation Google Business Profile, stratégie locale et suivi adaptés à votre zone, votre concurrence et vos requêtes.",
              en: "From €990 / year. Audit, Google Business Profile optimisation, local strategy and monitoring adapted to your area, competition and target searches.",
              vi: "Từ 990 € / năm. Kiểm toán, tối ưu Google Business Profile, chiến lược địa phương và theo dõi theo khu vực, đối thủ và truy vấn mục tiêu.",
              ru: "От 990 € в год. Аудит, оптимизация Google Business Profile, локальная стратегия и мониторинг с учётом района, конкурентов и запросов.",
              ar: "ابتداءً من 990 € سنويًا. تدقيق وتحسين Google Business Profile واستراتيجية محلية ومتابعة وفق منطقتك ومنافسيك وطلبات البحث.",
            }}
          />

          {/* ── Exclusivity Badge — very visible ── */}
          <Reveal delay={80}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-5 py-3.5 shadow-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-black shadow-sm"><svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google" role="img"><path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z"/><path fill="#34A853" d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z"/><path fill="#FBBC05" d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z"/><path fill="#EA4335" d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"/></svg></span>
              <Zap className="h-5 w-5 shrink-0 text-[var(--xr-bg)]" />
              <p className="text-sm font-semibold text-foreground leading-snug">
                {tx("à partir de 990 € / an · objectif Top 3 sans garantie de position")}
              </p>
              <Award className="h-5 w-5 shrink-0 text-[var(--xr-ink)]" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <div className="overflow-hidden rounded-[2.2rem] border xr-line bg-[var(--xr-bg-elev)] text-[var(--xr-ink)] shadow-[var(--xr-shadow)]">
            {/* Google Search Mockup Bar */}
            <div className="flex flex-col gap-3 border-b xr-line bg-[var(--xr-surface)] px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-label="Google" role="img">
                    <path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z" />
                    <path fill="#34A853" d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z" />
                    <path fill="#FBBC05" d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z" />
                    <path fill="#EA4335" d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z" />
                  </svg>
                </span>
                <div className="flex flex-1 items-center justify-between rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs text-neutral-800 shadow-inner dark:border-white/10 dark:bg-black/40 dark:text-neutral-200">
                  <span className="font-medium truncate">
                    {tx(selectedSector?.label ?? "")} <span className="opacity-60">à</span> {roiMetrics.cityName}
                  </span>
                  <span className="label-mono text-[8px] text-emerald-500 font-bold shrink-0">LOCAL PACK #1</span>
                </div>
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-500">
                  ✓ {tx("Ouvert actuellement")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-medium opacity-80">
                  ★ {tx("Note 4,5★ et +")}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-medium opacity-80">
                  {tx("Visite virtuelle")}
                </span>
                <span className="ml-auto label-mono text-[7px] text-muted-foreground">
                  {roiMetrics.baseSearches.toLocaleString()} {tx("Recherches locales / mois")}
                </span>
              </div>
            </div>

            {/* Main Stage: Left SERP Local 3-Pack + Right Vector Map */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.22fr_.78fr]">
              {/* Left Column: Local Pack Listings */}
              <div className="flex flex-col divide-y xr-line p-3 sm:p-5">
                {/* #1 Winner Card - XR Agency Client Profile */}
                <div className="relative rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-[var(--xr-surface)] to-[var(--xr-surface)] p-4 shadow-lg transition duration-300 hover:border-emerald-500/60">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-black shadow-sm">
                      ⚡ {tx("TOP 1 PACK LOCAL · PROJECTION XR AGENCY")}
                    </span>
                    <span className="label-mono text-[8px] font-bold text-emerald-500">#1 GOOGLE</span>
                  </div>

                  <h4 className="mt-2 text-base font-bold text-foreground">
                    {tx("Votre Établissement")} — <span className="opacity-90">{tx(selectedSector?.label ?? "")}</span>
                  </h4>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-amber-500">4.9</span>
                    <div className="flex text-amber-500 text-xs tracking-tighter" aria-label="5 stars">★★★★★</div>
                    <span className="text-xs text-muted-foreground font-semibold">({tx("4.9 ★★★★★ (284 avis Google vérifiés)")})</span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {tx(selectedSector?.label ?? "")} · {roiMetrics.cityName} · <span className="text-emerald-500 font-semibold">{tx("Ouvert · Ferme à 23h30")}</span>
                  </p>

                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground italic border-l-2 border-emerald-500/40 pl-2">
                    "{tx("Excellence locale · Cadre d'exception, service irréprochable et réputation certifiée")}"
                  </p>

                  {/* Google Action Buttons */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a href="#quote" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-black transition hover:bg-emerald-400">
                      🌐 {tx("Site web")}
                    </a>
                    <a href="#quote" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[var(--xr-surface-strong)] px-3 py-1.5 text-[10px] font-semibold text-foreground transition hover:bg-[var(--xr-accent-soft)]">
                      🧭 {tx("Itinéraire")}
                    </a>
                    <a href="#quote" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[var(--xr-surface-strong)] px-3 py-1.5 text-[10px] font-semibold text-foreground transition hover:bg-[var(--xr-accent-soft)]">
                      📞 {tx("Appeler")}
                    </a>
                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
                    <span className="text-[10px] font-semibold text-emerald-500">
                      ⚡ +340% d'appels entrants par rapport à votre position actuelle
                    </span>
                    <span className="label-mono text-[7px] font-bold text-emerald-500 shrink-0">
                      38% DU TRAFIC
                    </span>
                  </div>
                </div>

                {/* #2 Competitor Card */}
                <div className="p-3.5 opacity-65 transition hover:opacity-90">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-muted font-bold text-[9px] text-muted-foreground">2</span>
                      <h5 className="text-xs font-semibold text-foreground">{tx("Concurrent B (Fiche standard)")}</h5>
                    </div>
                    <span className="text-[10px] text-amber-500">4.1 ★★★★☆ (34)</span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {tx("4.1 ★★★★☆ (34 avis) · Fiche non optimisée")} · Horaires incomplets
                  </p>
                </div>

                {/* #3 Competitor Card */}
                <div className="p-3.5 opacity-45 transition hover:opacity-80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-muted font-bold text-[9px] text-muted-foreground">3</span>
                      <h5 className="text-xs font-semibold text-foreground">{tx("Concurrent C (Peu visible)")}</h5>
                    </div>
                    <span className="text-[10px] text-amber-500">3.8 ★★★☆☆ (12)</span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {tx("3.8 ★★★☆☆ (12 avis) · Pas de catalogue ni attributs")}
                  </p>
                </div>
              </div>

              {/* Right Column: Realistic Modern Dark/Light Map */}
              <div className="relative min-h-[320px] overflow-hidden border-t lg:border-t-0 lg:border-l xr-line bg-[#0d1117] text-white">
                {/* Vector map roads & parks */}
                <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-65">
                  <rect width="600" height="480" fill="#0d1117" />
                  {/* Water river */}
                  <path d="M-20 220 C140 180 260 270 420 240 S560 190 620 210" fill="none" stroke="#152636" strokeWidth="48" strokeLinecap="round" />
                  {/* Parks / Green areas */}
                  <rect x="40" y="40" width="120" height="90" rx="16" fill="#13231b" />
                  <rect x="420" y="60" width="140" height="110" rx="20" fill="#13231b" />
                  <rect x="280" y="320" width="160" height="100" rx="20" fill="#13231b" />
                  {/* Secondary roads */}
                  <path d="M0 80 H600 M0 160 H600 M0 300 H600 M0 380 H600" stroke="#1f2937" strokeWidth="6" />
                  <path d="M100 0 V480 M220 0 V480 M360 0 V480 M480 0 V480" stroke="#1f2937" strokeWidth="6" />
                  {/* Main highways */}
                  <path d="M-20 120 Q300 110 620 140" stroke="#374151" strokeWidth="12" />
                  <path d="M260 -20 Q280 240 310 500" stroke="#374151" strokeWidth="12" />
                  {/* Active navigation route line to Pin #1 */}
                  <path d="M80 400 L220 400 L220 260 L360 260 L360 180" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="6 4" />
                </svg>

                {/* Animated #1 Google Maps Pin with Radar Ring */}
                <div className="absolute left-[60%] top-[38%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Radar Ring */}
                    <span className="absolute h-16 w-16 rounded-full bg-emerald-500/30 animate-xr-pin-pulse" />
                    <span className="absolute h-10 w-10 rounded-full bg-emerald-500/50" />
                    {/* The Google Pin */}
                    <div className="relative z-10 flex flex-col items-center drop-shadow-[0_8px_20px_rgba(16,185,129,0.7)]">
                      <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-emerald-500 text-xs font-black text-black shadow-lg">
                        #1
                      </div>
                      <div className="h-2 w-2 -mt-1 rotate-45 bg-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Competitor Pin #2 */}
                <div className="absolute left-[37%] top-[55%] -translate-x-1/2 -translate-y-1/2 opacity-70">
                  <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-neutral-400 bg-neutral-700 text-[9px] font-bold text-white shadow-md">
                    #2
                  </div>
                </div>

                {/* Competitor Pin #3 */}
                <div className="absolute left-[78%] top-[68%] -translate-x-1/2 -translate-y-1/2 opacity-50">
                  <div className="grid h-6 w-6 place-items-center rounded-full border border-neutral-500 bg-neutral-800 text-[8px] font-bold text-neutral-300">
                    #3
                  </div>
                </div>

                {/* Floating GPS Navigation chip */}
                <div className="absolute left-3 top-3 rounded-xl border border-white/15 bg-black/75 px-3 py-1.5 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] font-semibold text-white">
                      📍 2,4 km · 6 min ({tx("Trafic fluide")})
                    </span>
                  </div>
                </div>

                {/* Status Indicator at bottom of map */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/80 px-3 py-2 text-xs backdrop-blur-md">
                  <span className="font-mono text-[8px] tracking-wider text-white/70">
                    {rank === "absent" ? tx("VISIBILITÉ À CONSTRUIRE") : rank === "below20" ? tx("SIGNAL À RENFORCER") : tx("POSITIONNEMENT À DÉVELOPPER")}
                  </span>
                  <span className="font-mono text-[8px] font-bold text-emerald-400">
                    TOP 3 PACK VISÉ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Intelligent Configurator ── */}
        <Reveal delay={60}>
          <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
            {/* Configurator header */}
            <div className="border-b border-border/60 bg-accent/20 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--xr-ink)] text-[var(--xr-bg)]">
                  <Gauge className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{tx("Configurateur de projet")}</p>
                  <p className="display-serif text-lg text-foreground mt-0.5">
                    {tx("Estimez votre investissement Google Maps")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Step 1 — Sector */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">1</span>
                  {tx("Votre secteur d'activité")}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SECTORS.map((s) => (
                    <SelectorBtn
                      key={s.id}
                      selected={sector === s.id}
                      onClick={() => setSector(s.id)}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-[11px] leading-tight">{tx(s.label)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 2 — City Size */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">2</span>
                  {tx("Taille de votre ville")}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CITY_SIZES.map((c) => (
                    <SelectorBtn
                      key={c.id}
                      selected={citySize === c.id}
                      onClick={() => setCitySize(c.id)}
                    >
                      <Building2 className="h-4 w-4" />
                      <span className="font-semibold text-[12px]">{tx(c.label)}</span>
                      <span className="text-[10px] opacity-60">{tx(c.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 3 — Keywords */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">3</span>
                  {tx("Nombre de mots-clés principaux")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {KEYWORD_RANGES.map((k) => (
                    <SelectorBtn
                      key={k.id}
                      selected={keywords === k.id}
                      onClick={() => setKeywords(k.id)}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="font-bold text-base">{tx(k.label)}</span>
                      <span className="text-[10px] opacity-60">{tx(k.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* Step 4 — Current Ranking */}
              <div>
                <p className="label-mono mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--xr-ink)] text-[10px] font-bold text-[var(--xr-bg)]">4</span>
                  {tx("Votre positionnement actuel sur Google Maps")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {CURRENT_RANKS.map((r) => (
                    <SelectorBtn
                      key={r.id}
                      selected={rank === r.id}
                      onClick={() => setRank(r.id)}
                    >
                      <MapPinned className="h-4 w-4" />
                      <span className="font-semibold text-[12px] leading-tight">{tx(r.label)}</span>
                      <span className="text-[10px] opacity-60 leading-tight">{tx(r.sub)}</span>
                    </SelectorBtn>
                  ))}
                </div>
              </div>

              {/* ── High-Converting Local ROI Calculator ── */}
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-[var(--xr-surface-strong)] to-[var(--xr-surface)] p-5 sm:p-6 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b xr-line pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 label-mono text-[7.5px] font-bold text-emerald-500">
                      ⚡ {tx("Calculateur de Rentabilité & ROI Local")}
                    </span>
                    <h4 className="mt-1.5 text-base font-bold text-foreground">
                      {tx("Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :")}
                    </h4>
                  </div>
                  <span className="label-mono text-[8px] text-emerald-500 font-semibold bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
                    {roiMetrics.cityName} · 38% CAPTURÉ
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3">
                    <span className="label-mono text-[6.5px] text-muted-foreground">{tx("Recherches locales / mois")}</span>
                    <p className="mt-1 text-base font-bold text-foreground">{roiMetrics.baseSearches.toLocaleString()}</p>
                    <span className="text-[8px] text-muted-foreground">Volume ciblé</span>
                  </div>
                  <div className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3">
                    <span className="label-mono text-[6.5px] text-muted-foreground">{tx("Trafic capté par le Top 3")}</span>
                    <p className="mt-1 text-base font-bold text-emerald-500 font-mono">+{roiMetrics.top3Captured.toLocaleString()}</p>
                    <span className="text-[8px] text-muted-foreground">Vues directes (38%)</span>
                  </div>
                  <div className="rounded-xl border xr-line bg-[var(--xr-surface)] p-3">
                    <span className="label-mono text-[6.5px] text-muted-foreground">{tx("Nouveaux clients estimés")}</span>
                    <p className="mt-1 text-base font-bold text-foreground">+{roiMetrics.newClients} / mois</p>
                    <span className="text-[8px] text-muted-foreground">Appels & réservations</span>
                  </div>
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-3">
                    <span className="label-mono text-[6.5px] text-emerald-400 font-bold">{tx("CA additionnel estimé")}</span>
                    <p className="mt-1 text-base font-black text-emerald-400 font-mono">+{formatEur(roiMetrics.addedRevenueMonth)} / m</p>
                    <span className="text-[8px] text-emerald-300 font-medium">{tx("Amorti dès le 1er mois grâce aux contacts entrants.")}</span>
                  </div>
                </div>
              </div>

              {/* ── Dynamic Price Result ── */}
              <div className="rounded-2xl border-2 border-primary/30 bg-[var(--xr-ink)]/5 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="label-mono text-xs text-muted-foreground">{tx("Budget indicatif · à partir de 990 € / an")}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span
                        key={animMin}
                        className="display-serif text-3xl font-bold text-[var(--xr-ink)] sm:text-4xl animate-price-reveal"
                      >
                        {formatEur(animMin)}
                      </span>
                      <span className="display-serif text-xl text-[var(--xr-ink)]/60">–</span>
                      <span
                        key={animMax}
                        className="display-serif text-3xl font-bold text-[var(--xr-ink)] sm:text-4xl animate-price-reveal"
                      >
                        {formatEur(animMax)}
                      </span>
                      <span className="label-mono text-xs text-muted-foreground">{tx("/ an")}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground/70">
                      {tx("Estimation indicative · tarif exact après audit personnalisé")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    {/* Guarantee badge */}
                    <div className="flex items-center gap-2 rounded-xl border border-[var(--xr-line)] bg-[var(--xr-accent-soft)] px-3 py-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--xr-ink)]" />
                      <span className="label-mono text-[10px] font-bold text-[var(--xr-ink)]">
                        {tx("Objectif Top 3 · étude locale sur mesure")}
                      </span>
                    </div>
                    <a
                      href={`${CONTACT.whatsapp}?text=${waPrefill}`}
                      target="_blank"
                      rel="noreferrer"
                      className="label-mono inline-flex items-center gap-2 rounded-full bg-[var(--xr-ink)] px-5 py-2.5 text-xs font-semibold text-[var(--xr-bg)] transition-all duration-200 hover:bg-[var(--xr-ink)]/90 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      {tx("Lancer mon audit gratuit")}
                    </a>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--xr-ink)]/20 pt-4">
                  {[
                    { icon: CheckCircle2, text: tx("Audit initial offert") },
                    { icon: CheckCircle2, text: tx("Périmètre contractuel clair") },
                    { icon: CheckCircle2, text: tx("Rapport mensuel inclus") },
                    { icon: CheckCircle2, text: tx("Sans engagement minimum") },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--xr-ink)]" />
                      <span className="label-mono text-[10px] text-muted-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 7-Phase Methodology ── */}
        <Reveal delay={80}>
          <div>
            <div className="mb-8 text-center">
              <p className="label-mono text-xs text-[var(--xr-ink)]">{tx("Méthodologie exclusive")}</p>
              <h3 className="display-serif mt-2 text-2xl sm:text-3xl text-foreground">
                {tx("Le processus en 7 phases")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                {tx("Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.")}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PHASES.slice(0, 4).map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--xr-ink)]/30"
                >
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{ph.num} · {tx(ph.name)}</p>
                  <p className="display-serif mt-1.5 text-base text-foreground">{tx(ph.title)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tx(ph.desc)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {PHASES.slice(4).map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--xr-ink)]/30"
                >
                  <p className="label-mono text-xs text-[var(--xr-ink)]">{ph.num} · {tx(ph.name)}</p>
                  <p className="display-serif mt-1.5 text-base text-foreground">{tx(ph.title)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tx(ph.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
