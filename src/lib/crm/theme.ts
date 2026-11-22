// ── XR AGENCY CRM — Système de thèmes colorés, ludiques & sympathiques ──

export type CrmThemeId = "pop" | "mint" | "sunset";

export interface CrmThemeTokens {
  id: CrmThemeId;
  label: string;
  emoji: string;
  isDark: boolean;
  pageBg: string;
  card: string;
  cardHover: string;
  subCard: string;
  modalBg: string;
  inputBg: string;
  border: string;
  textMain: string;
  textMuted: string;
  textSoft: string;
  tabBarBg: string;
  tabActive: string;
  tabIdle: string;
  badgeSoft: string;
}

export const CRM_THEMES: Record<CrmThemeId, CrmThemeTokens> = {
  pop: {
    id: "pop",
    label: "Pop Coloré",
    emoji: "🌈",
    isDark: false,
    pageBg: "bg-gradient-to-br from-[#f4f3ff] via-[#fff7f2] to-[#ecfeff] text-slate-900",
    card: "bg-white/95 border-slate-200/90 shadow-sm shadow-indigo-950/[0.04]",
    cardHover: "hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10",
    subCard: "bg-slate-50/95 border-slate-200/70",
    modalBg: "bg-white border-slate-200 shadow-2xl",
    inputBg: "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400",
    border: "border-slate-200/80",
    textMain: "text-slate-900",
    textMuted: "text-slate-600",
    textSoft: "text-slate-400",
    tabBarBg: "bg-white/80 border-slate-200/80 shadow-sm",
    tabActive: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 border-transparent",
    tabIdle: "text-slate-600 hover:text-slate-900 hover:bg-indigo-50/80",
    badgeSoft: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  mint: {
    id: "mint",
    label: "Soleil & Menthe",
    emoji: "☀️",
    isDark: false,
    pageBg: "bg-gradient-to-br from-[#ecfdf5] via-[#fffbeb] to-[#fff1f2] text-slate-900",
    card: "bg-white/95 border-emerald-200/70 shadow-sm shadow-emerald-950/[0.04]",
    cardHover: "hover:border-teal-300 hover:shadow-md hover:shadow-teal-500/10",
    subCard: "bg-emerald-50/50 border-emerald-200/50",
    modalBg: "bg-white border-emerald-200 shadow-2xl",
    inputBg: "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400",
    border: "border-emerald-200/70",
    textMain: "text-slate-900",
    textMuted: "text-slate-600",
    textSoft: "text-slate-400",
    tabBarBg: "bg-white/85 border-emerald-200/70 shadow-sm",
    tabActive: "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-500/25 border-transparent",
    tabIdle: "text-slate-600 hover:text-slate-900 hover:bg-emerald-50",
    badgeSoft: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  sunset: {
    id: "sunset",
    label: "Sunset Vibrant",
    emoji: "🌅",
    isDark: true,
    pageBg: "bg-gradient-to-br from-[#141132] via-[#1f1645] to-[#0f2639] text-white",
    card: "bg-white/[0.06] border-white/[0.12] backdrop-blur-md shadow-lg shadow-black/20",
    cardHover: "hover:border-amber-400/50 hover:bg-white/[0.09]",
    subCard: "bg-black/25 border-white/[0.08]",
    modalBg: "bg-[#171336] border-white/[0.15] shadow-2xl",
    inputBg: "bg-black/30 border-white/[0.12] text-white placeholder:text-white/40",
    border: "border-white/[0.12]",
    textMain: "text-white",
    textMuted: "text-indigo-100/75",
    textSoft: "text-indigo-200/45",
    tabBarBg: "bg-white/[0.05] border-white/[0.1]",
    tabActive: "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/25 border-transparent",
    tabIdle: "text-indigo-100/70 hover:text-white hover:bg-white/[0.07]",
    badgeSoft: "bg-amber-400/15 text-amber-200 border-amber-400/30",
  },
};
