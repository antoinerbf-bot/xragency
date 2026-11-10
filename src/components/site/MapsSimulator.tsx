import { useState, useMemo, useEffect } from "react";
import {
  MapPinned,
  Building2,
  CheckCircle2,
  Check,
  AlertTriangle,
  Minus,
  ExternalLink,
  ArrowRight,
  MessageCircle,
  Zap,
  BarChart3,
  Gauge,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { useFunnel } from "@/lib/funnel";
import pfMaisonLumiere from "@/assets/pf-01-maison-lumiere.jpg";
import pfVillaAzur from "@/assets/pf-02-villa-azur.jpg";
import pfNoirOr from "@/assets/pf-03-noir-or.jpg";
import pfCabinetMercier from "@/assets/pf-04-cabinet-mercier.jpg";
import pfElanStudio from "@/assets/pf-05-elan-studio.jpg";
import pfZenRetreat from "@/assets/pf-06-zen-retreat.jpg";
import pfNeoGear from "@/assets/pf-08-neo-gear.jpg";


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
    "Amorti dès le 1er mois grâce aux contacts entrants.": "Paid off from month 1 through incoming leads.",
    "Visibilité locale": "Local visibility",
    "Profil complet": "Complete profile",
    "Photos (24)": "Photos (24)",
    "Avis clients (4,8 ★)": "Reviews (4.8 ★)",
    "Position locale": "Local ranking",
    "Concurrence (3)": "Competitors (3)",
    "Nos recommandations": "Our recommendations",
    "3 actions prioritaires pour améliorer votre positionnement.": "3 priority actions to boost your local ranking.",
    "Améliorer ma visibilité": "Boost my visibility",
    "Analysez votre fiche, comparez votre position et découvrez vos opportunités de croissance.": "Analyze your profile, compare your ranking and unlock your local growth potential."
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
    "Amorti dès le 1er mois grâce aux contacts entrants.": "Hoàn vốn ngay từ tháng đầu tiên nhờ khách hàng chủ động liên hệ.",
    "Visibilité locale": "Hiển thị địa phương",
    "Profil complet": "Hồ sơ hoàn chỉnh",
    "Photos (24)": "Hình ảnh (24)",
    "Avis clients (4,8 ★)": "Đánh giá (4,8 ★)",
    "Position locale": "Thứ hạng khu vực",
    "Concurrence (3)": "Đối thủ (3)",
    "Nos recommandations": "Đề xuất của chúng tôi",
    "3 actions prioritaires pour améliorer votre positionnement.": "3 hành động ưu tiên để cải thiện thứ hạng của bạn.",
    "Améliorer ma visibilité": "Nâng cao khả năng hiển thị",
    "Analysez votre fiche, comparez votre position et découvrez vos opportunités de croissance.": "Phân tích hồ sơ, so sánh thứ hạng và khám phá cơ hội tăng trưởng địa phương."
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
    "Amorti dès le 1er mois grâce aux contacts entrants.": "Окупается с первого месяца за счёт входящих обращений.",
    "Visibilité locale": "Локальная видимость",
    "Profil complet": "Профиль заполнен",
    "Photos (24)": "Фото (24)",
    "Avis clients (4,8 ★)": "Отзывы (4,8 ★)",
    "Position locale": "Локальная позиция",
    "Concurrence (3)": "Конкуренты (3)",
    "Nos recommandations": "Наши рекомендации",
    "3 actions prioritaires pour améliorer votre positionnement.": "3 приоритетных действия для роста позиций.",
    "Améliorer ma visibilité": "Повысить видимость",
    "Analysez votre fiche, comparez votre position et découvrez vos opportunités de croissance.": "Проанализируйте профиль, сравните позиции и откройте точки локального роста."
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
    "Amorti dès le 1er mois grâce aux contacts entrants.": "تسترد استثمارك من الشهر الأول عبر العملاء الجدد.",
    "Visibilité locale": "الظهور المحلي",
    "Profil complet": "ملف مكتمل",
    "Photos (24)": "الصور (24)",
    "Avis clients (4,8 ★)": "تقييمات العملاء (4,8 ★)",
    "Position locale": "الترتيب المحلي",
    "Concurrence (3)": "المنافسة (3)",
    "Nos recommandations": "توصياتنا",
    "3 actions prioritaires pour améliorer votre positionnement.": "3 إجراءات ذات أولوية لتحسين ترتيبك.",
    "Améliorer ma visibilité": "تعزيز ظهوري المحلي",
    "Analysez votre fiche, comparez votre position et découvrez vos opportunités de croissance.": "حلّل ملفك، قارن ترتيبك واكتشف فرص النمو المحلي المتاحة لك."
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

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

const SAMPLE_PLACES: Record<string, { name: string; cat: string; img: string; rating: string; reviews: number }> = {
  resto: { name: "Le Bistrot Parisien", cat: "Restaurant", img: pfMaisonLumiere, rating: "4,8", reviews: 324 },
  hotel: { name: "Hôtel Villa d'Or", cat: "Hôtel & Spa", img: pfVillaAzur, rating: "4,9", reviews: 412 },
  sante: { name: "Clinique Saint-Honoré", cat: "Santé", img: pfZenRetreat, rating: "4,9", reviews: 198 },
  juridique: { name: "Cabinet Mercier & Associés", cat: "Cabinet", img: pfCabinetMercier, rating: "4,9", reviews: 164 },
  immo: { name: "Propriétés Rive Gauche", cat: "Immobilier", img: pfNoirOr, rating: "4,8", reviews: 236 },
  artisan: { name: "Atelier Haussmann", cat: "Architecture & BTP", img: pfElanStudio, rating: "4,9", reviews: 142 },
  beaute: { name: "Maison Zen & Soin", cat: "Beauté & Spa", img: pfZenRetreat, rating: "4,8", reviews: 289 },
  autre: { name: "Maison XR Sélection", cat: "Commerce", img: pfNeoGear, rating: "4,8", reviews: 215 },
};

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
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center gap-1 rounded-2xl border px-3 py-2.5 text-center text-xs transition-all duration-200",
        selected
          ? "border-[#b48f5a] bg-[#f2ead9] text-[#141312] shadow-sm ring-1 ring-[#c5a880]"
          : "border-[#141312]/10 bg-white text-[#5d564c] hover:border-[#b48f5a]/50 hover:text-[#141312]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function MapsSimulator() {
  const { lang } = useLang();
  const tx = (value: string) => translateMaps(value, lang);

  let funnel: ReturnType<typeof useFunnel> | null = null;
  try {
    funnel = useFunnel();
  } catch {
    funnel = null;
  }

  const [sector, setSector] = useState(SECTORS[0].id);
  const [citySize, setCitySize] = useState(CITY_SIZES[0].id);
  const [keywords, setKeywords] = useState(KEYWORD_RANGES[0].id);
  const [rank, setRank] = useState(CURRENT_RANKS[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState<"growth" | "domination" | "annual">("domination");

  useEffect(() => {
    if (!funnel?.sector) return;
    const map: Record<string, string> = {
      restaurant: "resto",
      hospitality: "hotel",
      health: "sante",
      realestate: "immo",
      beauty: "beaute",
      services: "juridique",
      commerce: "autre",
    };
    const target = map[funnel.sector];
    if (target && target !== sector) {
      setSector(target);
    }
  }, [funnel?.sector, sector]);

  const selectedSector = SECTORS.find((s) => s.id === sector);
  const sectorLabel = tx(selectedSector?.label ?? "");
  const cityLabel = tx(CITY_SIZES.find((c) => c.id === citySize)?.label ?? "");
  const kwLabel = `${KEYWORD_RANGES.find((k) => k.id === keywords)?.label ?? ""} ${tx("mots-clés principaux")}`;
  const rankLabel = tx(CURRENT_RANKS.find((r) => r.id === rank)?.label ?? "");

  const samplePlace = SAMPLE_PLACES[sector] ?? SAMPLE_PLACES.resto;
  const visibilityScore = rank === "4to10" ? 89 : rank === "below20" ? 83 : 78;

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

  const cardCityDisplay = citySize === "small" && lang === "fr" ? "Paris" : roiMetrics.cityName;

  const PLAN_OPTIONS = {
    growth: {
      name: "Pack Gestion & Croissance Locale",
      priceDisplay: "99 € / mois",
      detail: "Audit GBP, 4 Google Posts mensuels SEO, modération des avis et rapport mensuel.",
      badge: "GESTION 99€/M",
    },
    domination: {
      name: "Pack Domination Top 3 & Acquisition",
      priceDisplay: "159 € / mois",
      detail: "Engagement Top 3 Garanti, 8 posts SEO, Geotagging EXIF, +40 annuaires & Plaque NFC offerte.",
      badge: "MACHINE À CASH · TOP 3",
    },
    annual: {
      name: "Pack Annuel Sérénité",
      priceDisplay: "990 € / an",
      detail: "Paiement annuel en 1 fois : économisez 198 € (2 mois offerts par rapport à la mensualisation).",
      badge: "2 MOIS OFFERTS",
    },
  };

  const waPrefill = encodeURIComponent(({
    fr: `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.\n\n` +
      `• Secteur : ${sectorLabel}\n` +
      `• Taille de ville : ${cityLabel}\n` +
      `• Mots-clés : ${kwLabel}\n` +
      `• Position actuelle : ${rankLabel}\n` +
      `• Formule sélectionnée : ${PLAN_OPTIONS[selectedPlanId].name} (${PLAN_OPTIONS[selectedPlanId].priceDisplay})\n\n` +
      `Pouvons-nous lancer l'audit personnalisé ?`,
    en: `Hello XR Agency, I would like a tailored Google Maps Top 3 study.\n\n` +
      `• Industry: ${sectorLabel}\n` +
      `• City size: ${cityLabel}\n` +
      `• Keywords: ${kwLabel}\n` +
      `• Current ranking: ${rankLabel}\n` +
      `• Selected Plan: ${PLAN_OPTIONS[selectedPlanId].name} (${PLAN_OPTIONS[selectedPlanId].priceDisplay})\n\n` +
      `Can we start the personalised audit?`,
    vi: `Xin chào XR Agency, tôi muốn được tư vấn gói Google Maps Top 3 theo yêu cầu.\n\n` +
      `• Lĩnh vực: ${sectorLabel}\n` +
      `• Quy mô thành phố: ${cityLabel}\n` +
      `• Từ khóa: ${kwLabel}\n` +
      `• Thứ hạng hiện tại: ${rankLabel}\n` +
      `• Gói đã chọn: ${PLAN_OPTIONS[selectedPlanId].name} (${PLAN_OPTIONS[selectedPlanId].priceDisplay})\n\n` +
      `Chúng ta có thể bắt đầu kiểm toán cá nhân hóa không?`,
    ar: `مرحبًا XR Agency، أود الحصول على دراسة مخصصة لبلوغ أفضل 3 مراتب على Google Maps.\n\n` +
      `• مجال النشاط: ${sectorLabel}\n` +
      `• حجم المدينة: ${cityLabel}\n` +
      `• الكلمات المفتاحية: ${kwLabel}\n` +
      `• الترتيب الحالي: ${rankLabel}\n` +
      `• الباقة المختارة: ${PLAN_OPTIONS[selectedPlanId].name} (${PLAN_OPTIONS[selectedPlanId].priceDisplay})\n\n` +
      `هل يمكننا بدء التدقيق المخصص؟`,
    ru: `Здравствуйте, XR Agency! Хочу заказать индивидуальный расчёт по выводу в топ-3 Google Maps.\n\n` +
      `• Сфера: ${sectorLabel}\n` +
      `• Размер города: ${cityLabel}\n` +
      `• Ключевые слова: ${kwLabel}\n` +
      `• Текущая позиция: ${rankLabel}\n` +
      `• Выбранный тариф: ${PLAN_OPTIONS[selectedPlanId].name} (${PLAN_OPTIONS[selectedPlanId].priceDisplay})\n\n` +
      `Можем ли мы запустить персональный аудит?`,
  } as const)[(lang as "fr" | "en" | "vi" | "ar" | "ru")] ?? `Bonjour XR Agency, je souhaite une étude Google Maps Top 3 sur mesure.`);

  const ringRadius = 49;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringDashOffset = ringCircumference * (1 - visibilityScore / 100);

  return (
    <section id="maps" className="relative border-y xr-line py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-[#141312]/12 bg-[#121110] shadow-[0_32px_90px_-36px_rgba(20,19,18,0.45)]">
            {/* ── Screen 3 Obsidian Luxury Radar Header ── */}
            <div className="relative overflow-hidden bg-[#121110] px-5 pt-6 pb-11 sm:px-8 sm:pt-8 sm:pb-12 text-[#f7f4ed]">
              {/* Subtle Golden Radar Grid & Pin on right (matches Screen 3 mobile & desktop) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 82% 52%, rgba(197,168,128,0.22), transparent 46%), linear-gradient(rgba(247,244,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(247,244,237,0.06) 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 42px 42px, 42px 42px",
                }}
              />
              {/* Floating Champagne Pin & Concentric Rings */}
              <div aria-hidden className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center opacity-90">
                <span className="absolute h-36 w-36 rounded-full border border-[#c5a880]/20" />
                <span className="absolute h-24 w-24 rounded-full border border-[#c5a880]/35 animate-pulse" />
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e7cfa8] to-[#b48f5a] text-[#141312] shadow-[0_12px_34px_rgba(197,168,128,0.5)]">
                  <MapPinned className="h-5 w-5" />
                </div>
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-label="Google Maps" role="img">
                      <path fill="#EA4335" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                      <circle cx="12" cy="9" r="2.7" fill="#FFFFFF" />
                      <path fill="#4285F4" d="M12 2a7 7 0 0 1 6.71 5H14.2A2.7 2.7 0 0 0 12 6.3V2Z" />
                      <path fill="#34A853" d="M12 11.7a2.7 2.7 0 0 0 2.2-4.7H18.7C19.6 10.6 15.2 17.5 12 22v-10.3Z" opacity="0.85" />
                    </svg>
                    <span className="text-xs font-semibold tracking-wide text-[#f7f4ed]">Google Maps</span>
                  </div>
                  <span className="label-mono rounded-full border border-[#c5a880]/35 bg-[#c5a880]/12 px-3 py-1 text-[9px] text-[#e8cfa6]">
                    TOP 3 LOCAL PACK · AUDIT LIVE
                  </span>
                </div>

                <h2 className="display-serif mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.06] text-[#f7f4ed]">
                  Développez <em className="italic font-normal text-[#c5a880]">votre</em>
                  <br />
                  visibilité locale.
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#d7d1c6] max-w-lg">
                  {tx("Analysez votre fiche, comparez votre position et découvrez vos opportunités de croissance.")}
                </p>
              </div>
            </div>

            {/* ── Warm Ivory/Cream Luxury Workspace Sheet ── */}
            <div className="relative z-10 -mt-5 rounded-t-[1.75rem] lg:rounded-t-[2.1rem] bg-[#f7f4ed] px-4 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9 text-[#141312] space-y-7">
              {/* Row 1: Split Stage (Left = Screen 3 Diagnostic Scorecard, Right = Live Google Pack + Radar Map) */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                {/* ── Left Column: Screen 3 Scorecard ── */}
                <div className="space-y-4">
                  {/* Establishment Preview Header Card */}
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#141312]/10 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={samplePlace.img}
                        alt={samplePlace.name}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover border border-[#141312]/10"
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-[#141312] truncate">
                          {samplePlace.name}
                        </h3>
                        <p className="text-xs text-[#6f675b] truncate">
                          {samplePlace.cat} · {cardCityDisplay}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 text-xs">
                          <span className="font-bold text-[#141312]">{samplePlace.rating}</span>
                          <span className="text-[#c59b49] tracking-tighter text-[11px]" aria-label="5 stars">★★★★★</span>
                          <span className="text-[#6f675b] text-[11px]">({samplePlace.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href="#maps-serp"
                      aria-label="Voir simulation Google"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#141312]/10 bg-[#f7f4ed] text-[#141312]/70 transition hover:border-[#b48f5a] hover:text-[#141312]"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Screen 3 Gauge + 5 Status Rows */}
                  <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[142px_1fr] items-center gap-4 rounded-2xl border border-[#141312]/10 bg-white p-4 shadow-sm">
                    <div className="relative flex flex-col items-center justify-center">
                      <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-32 sm:w-32 -rotate-90">
                        <defs>
                          <linearGradient id="mapsRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d8b989" />
                            <stop offset="100%" stopColor="#b08950" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="60"
                          cy="60"
                          r={ringRadius}
                          fill="none"
                          stroke="#eae3d5"
                          strokeWidth="10"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r={ringRadius}
                          fill="none"
                          stroke="url(#mapsRingGrad)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={ringCircumference}
                          strokeDashoffset={ringDashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      </svg>
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="flex items-baseline gap-0.5">
                          <span className="display-serif text-3xl sm:text-[2rem] font-semibold leading-none text-[#141312]">
                            {visibilityScore}
                          </span>
                          <span className="text-[11px] font-medium text-[#7b7367]">/100</span>
                        </div>
                        <span className="mt-0.5 text-[9.5px] font-medium text-[#6f675b]">
                          {tx("Visibilité locale")}
                        </span>
                      </div>
                    </div>

                    {/* 5 Checklist Status Pills */}
                    <div className="space-y-1.5">
                      {[
                        { kind: "ok" as const, label: tx("Profil complet") },
                        { kind: "ok" as const, label: tx("Photos (24)") },
                        { kind: "warn" as const, label: tx("Avis clients (4,8 ★)") },
                        { kind: "warn" as const, label: tx("Position locale") },
                        { kind: "neutral" as const, label: tx("Concurrence (3)") },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center gap-2 rounded-xl border border-[#141312]/6 bg-[#f7f4ed]/70 px-2.5 py-1.5 text-xs"
                        >
                          <span
                            className={cn(
                              "grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full text-white",
                              row.kind === "ok"
                                ? "bg-[#2e7d4f]"
                                : row.kind === "warn"
                                  ? "bg-[#d4963a]"
                                  : "bg-[#b9b4aa]"
                            )}
                          >
                            {row.kind === "ok" ? (
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            ) : row.kind === "warn" ? (
                              <AlertTriangle className="h-2.5 w-2.5 stroke-[2.5]" />
                            ) : (
                              <Minus className="h-2.5 w-2.5 stroke-[3]" />
                            )}
                          </span>
                          <span className="font-medium text-[#2c2823] truncate">{row.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations Callout Row */}
                  <a
                    href="#maps-config"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[#141312]/10 bg-white p-3.5 shadow-sm transition hover:border-[#b48f5a]/60"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3ead9] text-[#a8834d]">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#141312]">{tx("Nos recommandations")}</p>
                        <p className="text-[11px] text-[#6f675b] leading-snug">
                          {tx("3 actions prioritaires pour améliorer votre positionnement.")}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#6f675b] transition-transform group-hover:translate-x-0.5 group-hover:text-[#141312]" />
                  </a>

                  {/* Primary Obsidian Pill CTA */}
                  <button
                    type="button"
                    onClick={() => document.getElementById("maps-plans")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#141312] px-6 py-3.5 text-sm font-semibold text-[#f7f4ed] shadow-[0_14px_30px_-14px_rgba(20,19,18,0.65)] transition hover:bg-[#26231f]"
                  >
                    {tx("Améliorer ma visibilité")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* ── Right Column: Google Search Local 3-Pack & Radar Map ── */}
                <div id="maps-serp" className="overflow-hidden rounded-2xl border border-[#141312]/12 bg-white shadow-sm">
                  {/* Google Search Mockup Bar */}
                  <div className="flex flex-col gap-2.5 border-b border-[#141312]/10 bg-[#faf7f1] px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-xs ring-1 ring-black/8">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Google" role="img">
                          <path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z" />
                          <path fill="#34A853" d="M12 21.55c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.55Z" />
                          <path fill="#FBBC05" d="M6.53 13.64A5.84 5.84 0 0 1 6.23 12c0-.57.1-1.12.3-1.64V7.84H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.16l3.25-2.52Z" />
                          <path fill="#EA4335" d="M12 6.33c1.43 0 2.7.49 3.71 1.45l2.78-2.78C16.84 3.42 14.63 2.45 12 2.45a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52c.77-2.31 2.93-4.03 5.47-4.03Z" />
                        </svg>
                      </span>
                      <div className="flex flex-1 items-center justify-between gap-2 rounded-full border border-[#141312]/12 bg-white px-3.5 py-1.5 text-xs text-[#141312]">
                        <span className="font-medium truncate">
                          {sectorLabel} <span className="text-[#6f675b]">à</span> {cardCityDisplay}
                        </span>
                        <span className="label-mono shrink-0 text-[8px] font-bold text-[#9b7b4b]">LOCAL PACK #1</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#2e7d4f]/25 bg-[#2e7d4f]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#24663f]">
                        ✓ {tx("Ouvert actuellement")}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#141312]/10 bg-white px-2.5 py-0.5 text-[10px] font-medium text-[#4e483f]">
                        ★ {tx("Note 4,5★ et +")}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#141312]/10 bg-white px-2.5 py-0.5 text-[10px] font-medium text-[#4e483f]">
                        {tx("Visite virtuelle")}
                      </span>
                      <span className="ml-auto label-mono text-[8px] text-[#6f675b]">
                        {roiMetrics.baseSearches.toLocaleString("fr-FR")} {tx("Recherches locales / mois")}
                      </span>
                    </div>
                  </div>

                  {/* SERP + Vector Map */}
                  <div className="grid grid-cols-1 divide-y divide-[#141312]/10">
                    {/* #1 Winner Card */}
                    <div className="p-4">
                      <div className="rounded-xl border-2 border-[#b48f5a] bg-gradient-to-br from-[#fdfbf7] to-[#f4ead7] p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#141312] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#e8cfa6]">
                            ⚡ {tx("TOP 1 PACK LOCAL · PROJECTION XR AGENCY")}
                          </span>
                          <span className="label-mono text-[8px] font-bold text-[#9b7b4b]">#1 GOOGLE</span>
                        </div>

                        <h4 className="mt-2 text-sm sm:text-base font-bold text-[#141312]">
                          {tx("Votre Établissement")} — <span className="font-normal text-[#4e483f]">{sectorLabel}</span>
                        </h4>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="font-bold text-[#a8834d]">4.9</span>
                          <span className="text-[#c59b49] text-xs tracking-tighter">★★★★★</span>
                          <span className="text-[11px] text-[#6f675b]">({tx("4.9 ★★★★★ (284 avis Google vérifiés)")})</span>
                        </div>

                        <p className="mt-1 text-[11px] text-[#6f675b]">
                          {sectorLabel} · {cardCityDisplay} · <span className="font-semibold text-[#24663f]">{tx("Ouvert · Ferme à 23h30")}</span>
                        </p>

                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <a href="#maps-plans" className="inline-flex items-center gap-1 rounded-full bg-[#141312] px-3 py-1 text-[10px] font-semibold text-[#f7f4ed] transition hover:bg-[#2a2621]">
                            {tx("Site web")}
                          </a>
                          <a href="#maps-plans" className="inline-flex items-center gap-1 rounded-full border border-[#141312]/15 bg-white px-3 py-1 text-[10px] font-semibold text-[#141312] transition hover:border-[#b48f5a]">
                            {tx("Itinéraire")}
                          </a>
                          <a href="#maps-plans" className="inline-flex items-center gap-1 rounded-full border border-[#141312]/15 bg-white px-3 py-1 text-[10px] font-semibold text-[#141312] transition hover:border-[#b48f5a]">
                            {tx("Appeler")}
                          </a>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg border border-[#b48f5a]/25 bg-white/80 px-3 py-1.5">
                          <span className="text-[10px] font-semibold text-[#8c6c3c]">
                            ⚡ +340% d&apos;appels entrants vs position hors Top 3
                          </span>
                          <span className="label-mono text-[7.5px] font-bold text-[#9b7b4b] shrink-0">38% CTR</span>
                        </div>
                      </div>

                      {/* Competitors #2 & #3 */}
                      <div className="mt-2.5 divide-y divide-[#141312]/8 rounded-xl border border-[#141312]/8 bg-[#faf7f1]/70">
                        <div className="flex items-center justify-between px-3 py-2 opacity-75">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#141312]/10 text-[9px] font-bold text-[#141312]">2</span>
                            <span className="text-[11px] font-semibold text-[#141312] truncate">{tx("Concurrent B (Fiche standard)")}</span>
                          </div>
                          <span className="text-[10px] font-medium text-[#6f675b] shrink-0">4.1 ★ (34)</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 opacity-55">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#141312]/10 text-[9px] font-bold text-[#141312]">3</span>
                            <span className="text-[11px] font-semibold text-[#141312] truncate">{tx("Concurrent C (Peu visible)")}</span>
                          </div>
                          <span className="text-[10px] font-medium text-[#6f675b] shrink-0">3.8 ★ (12)</span>
                        </div>
                      </div>
                    </div>

                    {/* Dark Obsidian Vector Map */}
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-[#121110] text-white">
                      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-80">
                        <rect width="600" height="400" fill="#121110" />
                        <path d="M-20 190 C140 155 260 230 420 205 S560 165 620 185" fill="none" stroke="#1d1b18" strokeWidth="42" strokeLinecap="round" />
                        <path d="M0 70 H600 M0 140 H600 M0 265 H600 M0 340 H600" stroke="#24211c" strokeWidth="5" />
                        <path d="M100 0 V400 M220 0 V400 M360 0 V400 M480 0 V400" stroke="#24211c" strokeWidth="5" />
                        <path d="M-20 105 Q300 95 620 120" stroke="#312c24" strokeWidth="10" />
                        <path d="M260 -20 Q280 200 310 420" stroke="#312c24" strokeWidth="10" />
                        <path d="M80 340 L220 340 L220 220 L360 220 L360 145" fill="none" stroke="#c5a880" strokeWidth="4" strokeDasharray="6 4" />
                      </svg>

                      {/* Animated #1 Champagne Pin */}
                      <div className="absolute left-[60%] top-[36%] -translate-x-1/2 -translate-y-1/2">
                        <div className="relative flex items-center justify-center">
                          <span className="absolute h-16 w-16 rounded-full bg-[#c5a880]/25 animate-xr-pin-pulse" />
                          <span className="absolute h-10 w-10 rounded-full bg-[#c5a880]/45" />
                          <div className="relative z-10 flex flex-col items-center drop-shadow-[0_8px_20px_rgba(197,168,128,0.6)]">
                            <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#c5a880] text-xs font-black text-[#141312] shadow-lg">
                              #1
                            </div>
                            <div className="h-2 w-2 -mt-1 rotate-45 bg-[#c5a880]" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-[37%] top-[56%] -translate-x-1/2 -translate-y-1/2 opacity-75">
                        <div className="grid h-6 w-6 place-items-center rounded-full border border-white/40 bg-[#2a2722] text-[9px] font-bold text-white shadow">
                          #2
                        </div>
                      </div>

                      <div className="absolute left-[78%] top-[70%] -translate-x-1/2 -translate-y-1/2 opacity-55">
                        <div className="grid h-6 w-6 place-items-center rounded-full border border-white/25 bg-[#1e1c18] text-[8px] font-bold text-neutral-300">
                          #3
                        </div>
                      </div>

                      <div className="absolute left-3 top-3 rounded-xl border border-white/15 bg-black/75 px-3 py-1 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#c5a880] animate-pulse" />
                          <span className="font-mono text-[9px] font-semibold text-[#f7f4ed]">
                            2,4 km · 6 min ({tx("Trafic fluide")})
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/80 px-3 py-1.5 backdrop-blur-md">
                        <span className="font-mono text-[8px] tracking-wider text-white/75">
                          {rank === "absent" ? tx("VISIBILITÉ À CONSTRUIRE") : rank === "below20" ? tx("SIGNAL À RENFORCER") : tx("POSITIONNEMENT À DÉVELOPPER")}
                        </span>
                        <span className="font-mono text-[8px] font-bold text-[#e8cfa6]">
                          TOP 3 PACK VISÉ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Row 2: Intelligent Configurator ── */}
              <div id="maps-config" className="rounded-3xl border border-[#141312]/10 bg-white p-4 sm:p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-3 border-b border-[#141312]/8 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#141312] text-[#e8cfa6]">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="label-mono text-[10px] font-semibold text-[#9b7b4b]">{tx("Configurateur de projet")}</p>
                    <h3 className="display-serif text-lg sm:text-xl text-[#141312] mt-0.5">
                      {tx("Estimez votre investissement Google Maps")}
                    </h3>
                  </div>
                </div>

                {/* Step 1 — Sector */}
                <div>
                  <p className="label-mono mb-2.5 flex items-center gap-2 text-[11px] font-semibold text-[#5d564c]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#141312] text-[10px] font-bold text-[#f7f4ed]">1</span>
                    {tx("Votre secteur d'activité")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {SECTORS.map((s) => (
                      <SelectorBtn key={s.id} selected={sector === s.id} onClick={() => setSector(s.id)}>
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-[11px] font-medium leading-tight">{tx(s.label)}</span>
                      </SelectorBtn>
                    ))}
                  </div>
                </div>

                {/* Step 2 — City Size */}
                <div>
                  <p className="label-mono mb-2.5 flex items-center gap-2 text-[11px] font-semibold text-[#5d564c]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#141312] text-[10px] font-bold text-[#f7f4ed]">2</span>
                    {tx("Taille de votre ville")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {CITY_SIZES.map((c) => (
                      <SelectorBtn key={c.id} selected={citySize === c.id} onClick={() => setCitySize(c.id)}>
                        <Building2 className="h-4 w-4 text-[#9b7b4b]" />
                        <span className="font-semibold text-[12px]">{tx(c.label)}</span>
                        <span className="text-[10px] opacity-70">{tx(c.sub)}</span>
                      </SelectorBtn>
                    ))}
                  </div>
                </div>

                {/* Step 3 & Step 4 side by side on Desktop */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <p className="label-mono mb-2.5 flex items-center gap-2 text-[11px] font-semibold text-[#5d564c]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#141312] text-[10px] font-bold text-[#f7f4ed]">3</span>
                      {tx("Nombre de mots-clés principaux")}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {KEYWORD_RANGES.map((k) => (
                        <SelectorBtn key={k.id} selected={keywords === k.id} onClick={() => setKeywords(k.id)}>
                          <BarChart3 className="h-4 w-4 text-[#9b7b4b]" />
                          <span className="font-bold text-sm">{tx(k.label)}</span>
                          <span className="text-[9.5px] opacity-70">{tx(k.sub)}</span>
                        </SelectorBtn>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="label-mono mb-2.5 flex items-center gap-2 text-[11px] font-semibold text-[#5d564c]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#141312] text-[10px] font-bold text-[#f7f4ed]">4</span>
                      {tx("Votre positionnement actuel sur Google Maps")}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {CURRENT_RANKS.map((r) => (
                        <SelectorBtn key={r.id} selected={rank === r.id} onClick={() => setRank(r.id)}>
                          <MapPinned className="h-4 w-4 text-[#9b7b4b]" />
                          <span className="font-semibold text-[11.5px] leading-tight">{tx(r.label)}</span>
                          <span className="text-[9.5px] opacity-70 leading-tight">{tx(r.sub)}</span>
                        </SelectorBtn>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Obsidian Luxury ROI Calculator */}
                <div className="rounded-2xl bg-[#121110] p-5 sm:p-6 text-[#f7f4ed] shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/15 px-2.5 py-0.5 label-mono text-[8px] font-bold text-[#e8cfa6]">
                        ⚡ {tx("Calculateur de Rentabilité & ROI Local")}
                      </span>
                      <h4 className="mt-1.5 text-sm sm:text-base font-bold text-[#f7f4ed]">
                        {tx("Impact direct du Top 3 Google Maps sur votre chiffre d'affaires :")}
                      </h4>
                    </div>
                    <span className="label-mono text-[8.5px] font-semibold text-[#e8cfa6] bg-[#c5a880]/12 border border-[#c5a880]/30 rounded-full px-3 py-1 self-start sm:self-center">
                      {cardCityDisplay} · 38% CAPTURÉ
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <span className="label-mono text-[7.5px] text-white/60">{tx("Recherches locales / mois")}</span>
                      <p className="mt-1 text-base sm:text-lg font-bold text-[#f7f4ed]">{roiMetrics.baseSearches.toLocaleString("fr-FR")}</p>
                      <span className="text-[9px] text-white/55">Volume ciblé</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <span className="label-mono text-[7.5px] text-white/60">{tx("Trafic capté par le Top 3")}</span>
                      <p className="mt-1 text-base sm:text-lg font-bold text-[#e8cfa6] font-mono">+{roiMetrics.top3Captured.toLocaleString("fr-FR")}</p>
                      <span className="text-[9px] text-white/55">Vues directes (38%)</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <span className="label-mono text-[7.5px] text-white/60">{tx("Nouveaux clients estimés")}</span>
                      <p className="mt-1 text-base sm:text-lg font-bold text-[#f7f4ed]">+{roiMetrics.newClients} / mois</p>
                      <span className="text-[9px] text-white/55">Appels & réservations</span>
                    </div>
                    <div className="rounded-xl border border-[#c5a880]/45 bg-[#c5a880]/15 p-3">
                      <span className="label-mono text-[7.5px] font-bold text-[#e8cfa6]">{tx("CA additionnel estimé")}</span>
                      <p className="mt-1 text-base sm:text-lg font-black text-[#e8cfa6] font-mono">+{formatEur(roiMetrics.addedRevenueMonth)} / m</p>
                      <span className="text-[9px] text-[#e8cfa6]/85 font-medium leading-tight block mt-0.5">{tx("Amorti dès le 1er mois grâce aux contacts entrants.")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Row 3: 3 Selectable Conversion Plans (99€/m · 159€/m · 990€/an) ── */}
              <div id="maps-plans" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="label-mono text-xs font-bold uppercase tracking-wider text-[#141312]">
                    Sélectionnez votre formule d&apos;acquisition locale :
                  </span>
                  <span className="label-mono rounded-full border border-[#b48f5a]/35 bg-[#f2ead9] px-3 py-1 text-[8px] font-bold text-[#8c6c3c]">
                    PILOTAGE MENSUEL OU ANNUEL
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Plan 1: 99 € / m */}
                  <div
                    onClick={() => setSelectedPlanId("growth")}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative",
                      selectedPlanId === "growth"
                        ? "border-[#b48f5a] bg-white shadow-md ring-2 ring-[#c5a880]/45"
                        : "border-[#141312]/10 bg-white/80 hover:border-[#b48f5a]/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-[7.5px] font-bold text-[#8c6c3c] uppercase">
                        {PLAN_OPTIONS.growth.badge}
                      </span>
                      {selectedPlanId === "growth" && (
                        <CheckCircle2 className="h-4.5 w-4.5 text-[#b48f5a]" />
                      )}
                    </div>
                    <h5 className="mt-2 text-sm font-bold text-[#141312]">{PLAN_OPTIONS.growth.name}</h5>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="display-serif text-3xl font-semibold text-[#141312]">99 €</span>
                      <span className="label-mono text-[9px] text-[#6f675b]">/ mois</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#5d564c]">
                      {PLAN_OPTIONS.growth.detail}
                    </p>
                  </div>

                  {/* Plan 2: 159 € / m (Popular Featured Obsidian) */}
                  <div
                    onClick={() => setSelectedPlanId("domination")}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative text-[#f7f4ed] bg-[#141312]",
                      selectedPlanId === "domination"
                        ? "border-[#c5a880] shadow-[0_22px_50px_-20px_rgba(20,19,18,0.7)] ring-2 ring-[#c5a880]"
                        : "border-[#141312]/40 hover:border-[#c5a880]/70"
                    )}
                  >
                    <div className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-[#e4c79a] to-[#b48f5a] px-3 py-0.5 label-mono text-[7px] font-black text-[#141312] shadow-md">
                      POPULAIRE · ROI MAX
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-[7.5px] font-bold text-[#e8cfa6] uppercase">
                        {PLAN_OPTIONS.domination.badge}
                      </span>
                      {selectedPlanId === "domination" && (
                        <CheckCircle2 className="h-4.5 w-4.5 text-[#e8cfa6]" />
                      )}
                    </div>
                    <h5 className="mt-2 text-sm font-bold text-[#f7f4ed]">{PLAN_OPTIONS.domination.name}</h5>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="display-serif text-3xl font-semibold text-[#e8cfa6]">159 €</span>
                      <span className="label-mono text-[9px] text-white/65">/ mois</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#d7d1c6]">
                      {PLAN_OPTIONS.domination.detail}
                    </p>
                  </div>

                  {/* Plan 3: 990 € / an */}
                  <div
                    onClick={() => setSelectedPlanId("annual")}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative",
                      selectedPlanId === "annual"
                        ? "border-[#b48f5a] bg-white shadow-md ring-2 ring-[#c5a880]/45"
                        : "border-[#141312]/10 bg-white/80 hover:border-[#b48f5a]/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-[7.5px] font-bold text-[#8c6c3c] uppercase">
                        {PLAN_OPTIONS.annual.badge}
                      </span>
                      {selectedPlanId === "annual" && (
                        <CheckCircle2 className="h-4.5 w-4.5 text-[#b48f5a]" />
                      )}
                    </div>
                    <h5 className="mt-2 text-sm font-bold text-[#141312]">{PLAN_OPTIONS.annual.name}</h5>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="display-serif text-3xl font-semibold text-[#141312]">990 €</span>
                      <span className="label-mono text-[9px] text-[#6f675b]">/ an (comptant)</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#5d564c]">
                      {PLAN_OPTIONS.annual.detail}
                    </p>
                  </div>
                </div>

                {/* Selected Action Bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#b48f5a]/35 bg-white p-4 sm:p-5 shadow-sm">
                  <div>
                    <span className="label-mono text-[8px] font-bold text-[#9b7b4b] block uppercase">
                      Formule validée : {PLAN_OPTIONS[selectedPlanId].name}
                    </span>
                    <p className="text-sm text-[#141312] mt-0.5">
                      Tarif : <span className="font-bold">{PLAN_OPTIONS[selectedPlanId].priceDisplay}</span> · Audit personnalisé offert
                    </p>
                  </div>

                  <a
                    href={`${CONTACT.whatsapp}?text=${waPrefill}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141312] px-6 py-3.5 text-xs font-semibold text-[#f7f4ed] transition-all duration-200 hover:bg-[#27231e] hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4 text-[#e8cfa6]" />
                    Réserver ma place · {PLAN_OPTIONS[selectedPlanId].priceDisplay}
                  </a>
                </div>

                {/* Trust Signals */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                  {[
                    tx("Audit initial offert"),
                    tx("Périmètre contractuel clair"),
                    tx("Rapport mensuel inclus"),
                    tx("Sans engagement minimum"),
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#b48f5a]" />
                      <span className="label-mono text-[10px] text-[#5d564c]">{text}</span>
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
            <div className="mb-6 text-center">
              <p className="label-mono text-xs text-[#9b7b4b]">{tx("Méthodologie exclusive")}</p>
              <h3 className="display-serif mt-2 text-2xl sm:text-3xl text-foreground">
                {tx("Le processus en 7 phases")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                {tx("Une approche structurée, transparente et mesurable pour travailler votre visibilité locale.")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PHASES.map((ph) => (
                <div
                  key={ph.num}
                  className="rounded-2xl border border-[#141312]/10 bg-[#faf7f1] dark:bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b48f5a]/50 hover:shadow-md"
                >
                  <span className="label-mono text-[8px] font-bold text-[#9b7b4b] block">{ph.num} · {tx(ph.name)}</span>
                  <p className="mt-1 text-sm font-bold text-foreground">{tx(ph.title)}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{tx(ph.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
