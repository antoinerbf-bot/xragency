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

export const SUPPORTED_LANGS: readonly Lang[] = ["fr", "en", "vi", "ar", "ru"] as const;

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

/**
 * All prices are stored once in EUR (source of truth).
 * EN = +20% vs EU price, then converted to USD (rate ~1.08).
 * VI = -20% vs EU price, then converted to VND (rate ~27 500).
 */
export const EUR_TO_USD = 1.08;
export const EUR_TO_VND = 27500;

export function formatPrice(eur: number, lang: Lang): string {
  if (lang === "en") {
    const usd = Math.round(eur * 1.2 * EUR_TO_USD);
    return `$${usd.toLocaleString("en-US")}`;
  }
  if (lang === "vi") {
    const vnd = Math.round((eur * 0.8 * EUR_TO_VND) / 1000) * 1000;
    return `${vnd.toLocaleString("vi-VN")} ₫`;
  }
  return `${Math.round(eur).toLocaleString("fr-FR")} €`;
}

type Ctx = {
  lang: Lang;
  setLang: (l: string) => void;
  t: (value: L | undefined) => string;
  price: (eur: number) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

function applyDocumentLanguage(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function resolveLanguage(value: string | null | undefined): Lang | null {
  if (!value) return null;
  const normalized = value.slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(normalized as Lang) ? (normalized as Lang) : null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = resolveLanguage(window.localStorage.getItem("xr-lang"));
    const browser = resolveLanguage(window.navigator.language);
    const initial = stored ?? browser ?? "fr";
    setLangState(initial);
    applyDocumentLanguage(initial);
  }, []);

  const setLang = useCallback((value: string) => {
    const next = resolveLanguage(value);
    if (!next) return;
    setLangState(next);
    window.localStorage.setItem("xr-lang", next);
    applyDocumentLanguage(next);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (v: L | undefined) => {
        if (!v) return "";
        // Missing translations are still detectable by the audit script; English is
        // the intentional last-resort fallback, never an accidental French leak.
        return v[lang] ?? v.en ?? v.fr ?? Object.values(v)[0] ?? "";
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
