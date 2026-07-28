import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LogoTrace from "@/components/about/LogoTrace";

const SESSION_KEY = "aces-intro-seen";

export default function AppSplash() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    if (!visible) return;
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, [visible]);

  if (!visible || prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-circuit-navy"
        >
          <LogoTrace size={140} onComplete={() => setTimeout(() => setVisible(false), 250)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
