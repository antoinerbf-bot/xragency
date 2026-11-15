import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { CONTACT } from "./content";
import { FUNNEL_UI, HERO_FUNNEL_PILLS } from "./funnel-i18n";
import type { Lang } from "./i18n";

export interface FunnelState {
  sector: string;
  goal: string;
  selectedServices: string[];
  websiteTier: "showcase" | "business" | "ecommerce";
  brandingTier: "starter" | "premium";
  activeSection: string;
}

interface FunnelContextType extends FunnelState {
  setSector: (s: string) => void;
  setGoal: (g: string) => void;
  toggleService: (id: string) => void;
  setServices: (ids: string[]) => void;
  setWebsiteTier: (tier: "showcase" | "business" | "ecommerce") => void;
  setBrandingTier: (tier: "starter" | "premium") => void;
  setActiveSection: (sec: string) => void;
  applyGoalPreset: (goalId: string) => void;
  scrollToSection: (anchor: string) => void;
  computedPricing: { totalOnce: number; totalMonth: number };
  buildWhatsAppUrl: (lang: Lang) => string;
}

const FunnelContext = createContext<FunnelContextType | null>(null);

const STORAGE_KEY = "xr_sales_funnel_state_v1";

const BASE_SERVICE_PRICES: Record<string, { price: number; period: "once" | "month" }> = {
  website: { price: 499, period: "once" },
  branding: { price: 179, period: "once" },
  seo: { price: 299, period: "once" },
  maps: { price: 990, period: "once" },
  ads: { price: 299, period: "once" },
  social: { price: 299, period: "once" },
  content: { price: 399, period: "once" },
  conversion: { price: 299, period: "once" },
  maintenance: { price: 29, period: "month" },
  robotics: { price: 499, period: "month" },
};

const DEFAULT_STATE: FunnelState = {
  sector: "restaurant",
  goal: "local_domination",
  selectedServices: ["website", "maps", "branding"],
  websiteTier: "showcase",
  brandingTier: "starter",
  activeSection: "hero",
};

export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FunnelState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_STATE, ...parsed };
        }
      } catch {
        // ignore fallback to default
      }
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore storage quota
      }
    }
  }, [state]);

  const setSector = useCallback((sector: string) => {
    setState((prev) => ({ ...prev, sector }));
  }, []);

  const setGoal = useCallback((goal: string) => {
    setState((prev) => ({ ...prev, goal }));
  }, []);

  const toggleService = useCallback((id: string) => {
    setState((prev) => {
      const exists = prev.selectedServices.includes(id);
      const updated = exists
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id];
      return { ...prev, selectedServices: updated.length ? updated : ["website"] };
    });
  }, []);

  const setServices = useCallback((selectedServices: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedServices: selectedServices.length ? selectedServices : ["website"],
    }));
  }, []);

  const setWebsiteTier = useCallback((websiteTier: "showcase" | "business" | "ecommerce") => {
    setState((prev) => ({ ...prev, websiteTier }));
  }, []);

  const setBrandingTier = useCallback((brandingTier: "starter" | "premium") => {
    setState((prev) => ({ ...prev, brandingTier }));
  }, []);

  const setActiveSection = useCallback((activeSection: string) => {
    setState((prev) => ({ ...prev, activeSection }));
  }, []);

  const scrollToSection = useCallback((anchor: string) => {
    if (typeof window === "undefined") return;
    const cleanId = anchor.replace(/^#/, "");
    const target = document.getElementById(cleanId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const applyGoalPreset = useCallback((goalId: string) => {
    const pill = HERO_FUNNEL_PILLS.find((p) => p.id === goalId);
    if (pill) {
      setState((prev) => ({
        ...prev,
        goal: goalId,
        selectedServices: Array.from(new Set([...prev.selectedServices, ...pill.services])),
      }));
      scrollToSection(pill.targetAnchor);
    }
  }, [scrollToSection]);

  const computedPricing = useMemo(() => {
    let totalOnce = 0;
    let totalMonth = 0;

    state.selectedServices.forEach((svcId) => {
      if (svcId === "website") {
        const p = state.websiteTier === "ecommerce" ? 1499 : state.websiteTier === "business" ? 799 : 499;
        totalOnce += p;
      } else if (svcId === "branding") {
        const p = state.brandingTier === "premium" ? 349 : 179;
        totalOnce += p;
      } else {
        const spec = BASE_SERVICE_PRICES[svcId];
        if (spec) {
          if (spec.period === "month") totalMonth += spec.price;
          else totalOnce += spec.price;
        }
      }
    });

    return { totalOnce, totalMonth };
  }, [state.selectedServices, state.websiteTier, state.brandingTier]);

  const buildWhatsAppUrl = useCallback((lang: Lang) => {
    const intro = FUNNEL_UI.sticky.waIntro[lang] ?? FUNNEL_UI.sticky.waIntro.fr;
    const servicesList = state.selectedServices.join(", ");
    const text = `${intro}\n• Secteur : ${state.sector}\n• Services : ${servicesList}\n• Estimation : ${computedPricing.totalOnce} €${computedPricing.totalMonth > 0 ? ` + ${computedPricing.totalMonth} €/mois` : ""}`;
    return `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [state.selectedServices, state.sector, computedPricing]);

  const value = useMemo(
    () => ({
      ...state,
      setSector,
      setGoal,
      toggleService,
      setServices,
      setWebsiteTier,
      setBrandingTier,
      setActiveSection,
      applyGoalPreset,
      scrollToSection,
      computedPricing,
      buildWhatsAppUrl,
    }),
    [
      state,
      setSector,
      setGoal,
      toggleService,
      setServices,
      setWebsiteTier,
      setBrandingTier,
      setActiveSection,
      applyGoalPreset,
      scrollToSection,
      computedPricing,
      buildWhatsAppUrl,
    ]
  );

  return <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>;
}

export function useFunnel() {
  const ctx = useContext(FunnelContext);
  if (!ctx) {
    throw new Error("useFunnel must be used within a FunnelProvider");
  }
  return ctx;
}
