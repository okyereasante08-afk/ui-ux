import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const pillars = [
  { title: "Internships", description: "Create opportunities for students to obtain practical exposure through industrial attachments." },
  { title: "Skills", description: "Create opportunities for students to acquire skills useful in the field of computer engineering." },
  { title: "Exchange", description: "Organize exchange programs with other computer engineering institutions." },
  { title: "Outreach", description: "Make computer engineering attractive to students in second cycle institutions." },
  { title: "Application", description: "Help students put into practice the knowledge acquired." },
];

function DoricColumn({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 110" className="w-full h-auto overflow-visible">
      {/* Capital (top plate) */}
      <rect x="2" y="4" width="36" height="6" rx="1" className={active ? "fill-aces-blue" : "fill-dim-trace"} />
      <rect x="6" y="10" width="28" height="4" className={active ? "fill-aces-blue/70" : "fill-dim-trace/70"} />
      {/* Fluted shaft */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={7 + i * 5}
          y1="16"
          x2={7 + i * 5}
          y2="90"
          strokeWidth="2"
          strokeLinecap="round"
          className={active ? "stroke-aces-blue" : "stroke-dim-trace"}
        />
      ))}
      {/* Base */}
      <rect x="6" y="90" width="28" height="4" className={active ? "fill-aces-blue/70" : "fill-dim-trace/70"} />
      <rect x="2" y="94" width="36" height="6" rx="1" className={active ? "fill-aces-blue" : "fill-dim-trace"} />
    </svg>
  );
}

export default function VisionTab() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80 mb-6">
        the five pillars
      </p>

      <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-6">
        {pillars.map((pillar, i) => {
          const isActive = i === active;
          return (
            <button
              key={pillar.title}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div
                animate={{ y: isActive ? -6 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="w-full"
                style={{
                  filter: isActive ? "drop-shadow(0 0 6px rgba(11,95,255,0.5))" : "none",
                }}
              >
                <DoricColumn active={isActive} />
              </motion.div>
              <span
                className={cn(
                  "font-mono text-[9px] sm:text-[10px] uppercase tracking-wide text-center leading-tight",
                  isActive ? "text-aces-blue" : "text-foreground/40",
                )}
              >
                {pillar.title}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-xl border border-aces-blue/20 bg-foreground/[0.03] backdrop-blur-sm p-5"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-aces-blue mb-2">
            0{active + 1} / 05
          </p>
          <h3 className="font-heading text-lg font-bold text-board-white mb-2">
            {pillars[active].title}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed">
            {pillars[active].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
