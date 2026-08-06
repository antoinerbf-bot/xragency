import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en" | "vi";
export type L = Record<Lang, string>;

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "vi", label: "VI", flag: "🇻🇳" },
];

/**
 * Reference prices are stored once, in EUR.
 * Vietnam pricing uses a 20% market adjustment on top of the VND conversion rate.
 */
export const RATES: Record<Lang, number> = {
  fr: 1,
  en: 1.08,
  vi: 22400,
};

export function formatPrice(eur: number, lang: Lang): string {
  if (lang === "en") {
    const usd = Math.round(eur * RATES.en);
    return `$${usd.toLocaleString("en-US")}`;
  }
  if (lang === "vi") {
    const vnd = Math.round((eur * RATES.vi) / 1000) * 1000;
    return `${vnd.toLocaleString("vi-VN")} ₫`;
  }
  return `${Math.round(eur).toLocaleString("fr-FR")} €`;
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (value: L) => string;
  price: (eur: number) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("xr-lang") as Lang | null;
    if (stored && ["fr", "en", "vi"].includes(stored)) {
      setLangState(stored);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "vi") setLangState("vi");
    else if (nav !== "fr") setLangState("en");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("xr-lang", l);
    document.documentElement.lang = l;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (v: L) => v[lang],
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