import { motion, AnimatePresence } from "framer-motion";
import { Download, Check } from "lucide-react";
import { useDownloadSimulation } from "@/hooks/useDownloadSimulation";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  sizeKB: number;
  className?: string;
  /** Compact = icon-forward, used inside tight ResourceCard footers. Full = used in PreviewModal's wider layout. */
  variant?: "compact" | "full";
}

// A short pool of playful "done" lines so repeat downloads across a
// session don't all say the exact same thing — picked once per
// completed download, not re-rolled on every render.
const QUIPS = [
  "Saved to device!",
  "Snagged it for you.",
  "Tucked safely on your phone.",
  "Nabbed! It's yours now.",
  "Landed in your downloads.",
];

export default function DownloadButton({ sizeKB, className, variant = "compact" }: DownloadButtonProps) {
  const { state, progress, start } = useDownloadSimulation(sizeKB);
  const quip = QUIPS[Math.floor(sizeKB) % QUIPS.length];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        start();
      }}
      disabled={state !== "idle"}
      className={cn(
        "relative flex items-center justify-center gap-1.5 overflow-hidden rounded-lg py-2 text-xs font-medium text-white transition-colors",
        variant === "full" && "py-2.5 text-sm",
        state === "done" ? "bg-green-600" : "bg-aces-blue hover:bg-aces-blue/90",
        className,
      )}
    >
      {/* Progress fill — a lighter overlay sweeping left to right, sits
          behind the label so both are visible at once. */}
      {state === "downloading" && (
        <motion.div
          className="absolute inset-y-0 left-0 bg-white/20"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.06 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-1.5">
        <AnimatePresence mode="wait" initial={false}>
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <Download className={variant === "full" ? "h-4 w-4" : "h-3.5 w-3.5"} />
              Download
            </motion.span>
          )}

          {state === "downloading" && (
            <motion.span
              key="downloading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 font-mono tabular-nums"
            >
              {progress}%
            </motion.span>
          )}

          {state === "done" && (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center gap-1.5"
            >
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.05 }}
              >
                <Check className={variant === "full" ? "h-4 w-4" : "h-3.5 w-3.5"} />
              </motion.span>
              {quip}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
