import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <style>{`
        .dark body { background: var(--background); color: var(--foreground); }
        .dark .surface-plate {
          background: linear-gradient(160deg, oklch(0.20 0.035 265 / 0.96), oklch(0.15 0.035 265 / 0.98));
          border-color: oklch(1 0 0 / 0.10);
          box-shadow: 0 20px 50px -36px oklch(0 0 0 / 0.65);
        }
        .dark .grain::after { opacity: 0.025; }
        .dark .bg-white, .dark .bg-white\\/95, .dark .bg-white\\/90, .dark .bg-white\\/80 { background-color: var(--card) !important; }
        .dark .text-black { color: var(--foreground) !important; }
        html, body { max-width: 100%; overflow-x: hidden; }
      `}</style>
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border bg-background/90 text-foreground backdrop-blur-xl transition-all duration-200 hover:bg-accent active:scale-95",
          className,
        )}
        aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
        title={theme === "dark" ? "Mode clair" : "Mode sombre"}
      >
        {theme === "dark" ? <Sun className="h-4 w-4 text-primary" aria-hidden="true" /> : <Moon className="h-4 w-4 text-primary" aria-hidden="true" />}
      </button>
    </>
  );
}
