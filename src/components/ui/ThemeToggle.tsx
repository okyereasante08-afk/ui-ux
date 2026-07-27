import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      className={cn(
        "relative flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2 text-xs font-mono uppercase tracking-wider text-foreground/70 transition-colors hover:border-aces-blue/40 hover:text-aces-blue",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </motion.span>
      </AnimatePresence>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
