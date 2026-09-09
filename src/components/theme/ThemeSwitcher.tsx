import { useTheme } from "./ThemeProvider";
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'flex items-center justify-center rounded-full p-2 transition-colors hover:bg-muted',
        className,
      )}
      aria-label="Toggle dark/light theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-primary" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
}
