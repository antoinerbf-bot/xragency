import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LANGS, useLang } from "@/lib/i18n";
import { UI } from "@/lib/copy";
import { Logo, EmberButton } from "./primitives";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export function Nav() {
  const { t, lang, setLang } = useLang();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (isHome) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/#" + id;
  };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-white/10 bg-[#090a0b]/78 py-2 backdrop-blur-2xl" : "border-b border-transparent bg-black/15 py-2.5 backdrop-blur-sm")}>
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo className="shrink-0 text-white" />
        <div className="hidden items-center gap-1 lg:flex">
          <button onClick={() => go("homepage-services")} className="rounded-full px-3.5 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">{t(UI.navServices)}</button>
          <a href="/work" className="rounded-full px-3.5 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">{t(UI.navWork)}</a>
          <button onClick={() => go("quote")} className="rounded-full px-3.5 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">Devis</button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">{LANGS.map(l => <button key={l.code} onClick={() => setLang(l.code)} className={cn("rounded-full px-2.5 py-1 text-xs", lang === l.code ? "bg-white text-black" : "text-white/55 hover:text-white")}>{l.label}</button>)}</div>
          <ThemeSwitcher className="h-9 w-9 border-white/15 bg-black/25 text-white" />
          <EmberButton href={isHome ? "#quote" : "/#quote"} className="hidden min-h-9 bg-[var(--warm)] px-4 text-[11px] text-black sm:inline-flex">Devis</EmberButton>
          <button type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(v => !v)} className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/15 bg-black/25 text-white backdrop-blur lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {open && <div className="border-t border-white/10 bg-[#090a0b]/96 px-5 py-5 backdrop-blur-2xl lg:hidden">
        <div className="grid gap-2">
          <button onClick={() => go("homepage-services")} className="min-h-11 rounded-xl border border-white/10 px-4 text-left text-sm text-white/80">Expertises</button>
          <a href="/work" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-sm text-white/80">Réalisations</a>
          <button onClick={() => go("quote")} className="min-h-11 rounded-xl bg-[var(--warm)] px-4 text-left text-sm font-semibold text-black">Faire mon devis</button>
        </div>
      </div>}
    </header>
  );
}
