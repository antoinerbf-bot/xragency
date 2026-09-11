import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "fixed left-3 top-3 z-[70] flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-lg backdrop-blur-xl transition-all duration-200 hover:bg-accent active:scale-95 sm:left-5 sm:top-5",
        className,
      )}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 text-primary" aria-hidden="true" />
      )}
    </button>
  );
}
