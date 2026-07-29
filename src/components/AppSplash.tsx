import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LogoTrace from "@/components/about/LogoTrace";

const SESSION_KEY = "aces-intro-seen";

type Stage = "logo" | "gate" | "done";

export default function AppSplash() {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window === "undefined") return "done";
    return window.sessionStorage.getItem(SESSION_KEY) ? "done" : "logo";
  });

  useEffect(() => {
    if (stage !== "done") return;
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, [stage]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-circuit-navy"
        >
          {stage === "logo" && (
            <LogoTrace size={120} onComplete={() => setTimeout(() => setStage("gate"), 200)} />
          )}

          {stage === "gate" && (
            <motion.button
              onClick={() => setStage("done")}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-aces-blue/70">
                aces // knust
              </span>
              <span className="font-heading text-5xl font-extrabold leading-none text-aces-blue">
                Explore
                <br />
                ACES
              </span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 font-mono text-[11px] uppercase tracking-widest text-foreground/40"
              >
                tap anywhere to enter
              </motion.span>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
