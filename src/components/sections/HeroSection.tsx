import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CurrentPulseButton from "@/components/ui/CurrentPulseButton";

// Easter egg — a console message for anyone who actually opens devtools.
// Zero risk, on-brand for a computer engineering department.
function useConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%cACES // KNUST",
      "color:#0B5FFF; font-family:monospace; font-size:20px; font-weight:bold;",
    );
    console.log(
      "%c> dept. of computer engineering — if you're reading this, you already belong here.",
      "color:#8b95a8; font-family:monospace; font-size:12px;",
    );
  }, []);
}

export default function HeroSection() {
  useConsoleEasterEgg();
  const prefersReducedMotion = useReducedMotion();
  const clickTimes = useRef<number[]>([]);

  // Easter egg — tap the eyebrow line 5 times within 1.5s to trigger a
  // brief power-surge on the trace line. Attached to the eyebrow (not
  // the decorative desktop-only "A" mark below) so it's reachable on
  // mobile too, since that's the primary target here.
  function handleEyebrowTap() {
    if (prefersReducedMotion) return;
    const now = Date.now();
    clickTimes.current = [...clickTimes.current, now].filter((t) => now - t < 1500);
    if (clickTimes.current.length >= 5) {
      window.dispatchEvent(new CustomEvent("trace:surge"));
      clickTimes.current = [];
    }
  }
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-8 md:px-12 lg:px-24 overflow-hidden">
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11, 95, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11, 95, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow — mono label. Also the easter-egg tap target (see above). */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={handleEyebrowTap}
            className="font-mono text-xs tracking-widest text-aces-blue/80 uppercase cursor-pointer select-none"
          >
            aces // knust · dept. of computer engineering
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-1.5 shrink-0"
          >
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aces-blue opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aces-blue" />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-foreground/40">
              ONLINE
            </span>
          </motion.div>
        </div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-board-white leading-[1.1] mb-6"
        >
          Welcome to the{" "}
          <span className="text-aces-blue">Land of ACES</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-foreground/60 font-medium leading-relaxed mb-10 max-w-md"
        >
          The Association of Computer Engineering Students at KNUST — 
          building circuits, writing code, and shaping the future of technology.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CurrentPulseButton
            variant="primary"
            size="lg"
            onClick={() => window.dispatchEvent(new CustomEvent("sidebar:open"))}
          >
            Explore ACES
          </CurrentPulseButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 left-6 md:left-12 flex items-center gap-2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-aces-blue" />
        </motion.div>
        <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest">
          Scroll
        </span>
      </motion.div>

      {/* ACES Mark — SVG trace-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
      >
        <svg width="300" height="300" viewBox="0 0 100 100">
          <motion.text
            x="50"
            y="55"
            textAnchor="middle"
            className="font-mono"
            fill="none"
            stroke="#0B5FFF"
            strokeWidth="0.5"
            fontSize="48"
            fontWeight="700"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            A
          </motion.text>
        </svg>
      </motion.div>
    </section>
  );
}
