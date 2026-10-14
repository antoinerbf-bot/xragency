import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en" | "vi" | "ar" | "ru";
export type L = Record<string, string>;

export const LANGS: { code: string; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

/**
 * Prices use EUR as the source of truth.
 * FR: unchanged EUR prices. VI: 20% local-market reduction, displayed in VND.
 * EN/RU/AR: one shared +20% international price grid, displayed in USD/RUB/AED.
 * Exchange rates are presentation estimates and should be reviewed periodically.
 */
export const EUR_TO_USD = 1.12;
export const EUR_TO_VND = 27500;
export const EUR_TO_RUB = 94.16;
export const EUR_TO_AED = 4.1165;
const INTERNATIONAL_MARKUP = 1.2;

export function formatPrice(eur: number, lang: Lang): string {
  if (lang === "en") {
    const value = Math.round(eur * INTERNATIONAL_MARKUP * EUR_TO_USD);
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }
  if (lang === "vi") {
    const value = Math.round((eur * 0.8 * EUR_TO_VND) / 1000) * 1000;
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
  }
  if (lang === "ru") {
    const value = Math.round(eur * INTERNATIONAL_MARKUP * EUR_TO_RUB / 100) * 100;
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
  }
  if (lang === "ar") {
    const value = Math.round(eur * INTERNATIONAL_MARKUP * EUR_TO_AED);
    return new Intl.NumberFormat("ar-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value);
  }
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(eur);
}

/** Localize explicit euro amounts embedded in translated service copy as well as numeric price components. */
export function localizePriceText(value: string, lang: Lang): string {
  if (lang === "fr" || !value.includes("€")) return value;

  const convert = (raw: string) => {
    const normalized = raw.replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
    const amount = Number(normalized);
    return Number.isFinite(amount) ? formatPrice(amount, lang) : raw;
  };

  let result = value.replace(/([\d][\d\s\u00a0\u202f.,]*)\s*[–—-]\s*([\d][\d\s\u00a0\u202f.,]*)\s*€/g, (_match, low: string, high: string) => `${convert(low.trim())} – ${convert(high.trim())}`);
  result = result.replace(/€\s*([\d][\d\s\u00a0\u202f.,]*)/g, (_match, amount: string) => convert(amount));
  result = result.replace(/([\d][\d\s\u00a0\u202f.,]*)\s*€/g, (_match, amount: string) => convert(amount));
  return result;
}

type Ctx = {
  lang: Lang;
  setLang: (l: string) => void;
  t: (value: L) => string;
  price: (eur: number) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("xr-lang") as string | null;
    if (stored && ["fr", "en", "vi", "ar", "ru"].includes(stored)) {
      setLangState(stored as Lang);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "vi") setLangState("vi");
    else if (nav === "ar") setLangState("ar" as Lang);
    else if (nav === "ru") setLangState("ru" as Lang);
    else if (nav !== "fr") setLangState("en");
  }, []);

  const setLang = useCallback((l: string) => {
    setLangState(l as Lang);
    window.localStorage.setItem("xr-lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (v: L | undefined) => {
        if (!v) return "";
        const value = (v as Record<string, string>)[lang];
        return localizePriceText(value ?? v.en ?? v.fr ?? Object.values(v)[0] ?? "", lang);
      },
      price: (eur: number) => formatPrice(eur, lang),
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
