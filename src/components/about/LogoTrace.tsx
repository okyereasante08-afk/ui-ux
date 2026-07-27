import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import acesCrest from "@/assets/aces-crest.png";

// Real ACES crest (cropped from the provided logo, transparent bg).
// Aspect ratio preserved: 155 x 218.
const CREST_ASPECT = 155 / 218;

// Corner ticks around the crest, echoing the site's chip-pin motif —
// draw in first, then the crest itself wipes in top-to-bottom with a
// synced glow scan line, then a brief pulse settles it.
const tickPositions = [
  { d: "M-10 10 H4", top: "6%" },
  { d: "M-10 10 H4", top: "94%" },
];

interface LogoTraceProps {
  size?: number;
  className?: string;
  onComplete?: () => void;
}

export default function LogoTrace({ size = 96, className = "", onComplete }: LogoTraceProps) {
  const prefersReducedMotion = useReducedMotion();
  const width = size * CREST_ASPECT;
  const height = size;

  useEffect(() => {
    if (!prefersReducedMotion) return;
    onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const total = 350 + 800 + 450; // ticks + reveal + pulse, ms
    const t = setTimeout(() => onComplete?.(), total);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (prefersReducedMotion) {
    return (
      <div style={{ width, height }} className={className}>
        <img src={acesCrest} alt="ACES" className="w-full h-full object-contain" />
      </div>
    );
  }

  return (
    <div style={{ width, height }} className={`relative ${className}`}>
      {/* Corner ticks (chip pins), draw in first */}
      <svg
        width={width + 24}
        height={height + 24}
        viewBox={`0 0 ${width + 24} ${height + 24}`}
        className="absolute -left-3 -top-3 pointer-events-none"
        fill="none"
      >
        {[
          { x1: 0, y1: 0, x2: 14, y2: 0 },
          { x1: 0, y1: 0, x2: 0, y2: 14 },
          { x1: width + 24, y1: 0, x2: width + 10, y2: 0 },
          { x1: width + 24, y1: 0, x2: width + 24, y2: 14 },
          { x1: 0, y1: height + 24, x2: 14, y2: height + 24 },
          { x1: 0, y1: height + 24, x2: 0, y2: height + 10 },
          { x1: width + 24, y1: height + 24, x2: width + 10, y2: height + 24 },
          { x1: width + 24, y1: height + 24, x2: width + 24, y2: height + 10 },
        ].map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#0B5FFF"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(11,95,255,0.6))" }}
          />
        ))}
      </svg>

      {/* Crest reveal: top-to-bottom wipe */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeInOut" }}
      >
        <img src={acesCrest} alt="ACES" className="w-full h-full object-contain" />
      </motion.div>

      {/* Scan line, synced with the reveal above */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-aces-blue"
        initial={{ top: "0%", opacity: 1 }}
        animate={{ top: "100%", opacity: [1, 1, 0] }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeInOut", times: [0, 0.9, 1] }}
        style={{ boxShadow: "0 0 8px #0B5FFF, 0 0 3px #0B5FFF" }}
      />

      {/* Settle pulse once the reveal finishes */}
      <motion.div
        className="absolute inset-0 bg-aces-blue rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 0.45, delay: 1.15, ease: "easeOut" }}
        style={{ filter: "blur(16px)" }}
      />
    </div>
  );
}
