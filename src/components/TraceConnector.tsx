import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

// ─── Trace Context ───────────────────────────────────────────────

interface TraceContextType {
  registerNode: (id: string, ref: React.RefObject<HTMLDivElement>) => void;
  unregisterNode: (id: string) => void;
}

const TraceContext = createContext<TraceContextType | null>(null);

export function TraceProvider({ children }: { children: ReactNode }) {
  const nodesRef = useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map());

  const registerNode = useCallback((id: string, ref: React.RefObject<HTMLDivElement>) => {
    nodesRef.current.set(id, ref);
  }, []);

  const unregisterNode = useCallback((id: string) => {
    nodesRef.current.delete(id);
  }, []);

  return (
    <TraceContext.Provider value={{ registerNode, unregisterNode }}>
      {children}
      <TraceLine />
    </TraceContext.Provider>
  );
}

export function useTrace() {
  const ctx = useContext(TraceContext);
  if (!ctx) throw new Error("useTrace must be used within TraceProvider");
  return ctx;
}

// ─── Trace Line Component ────────────────────────────────────────

function TraceLine() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [surging, setSurging] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    function onSurge() {
      setSurging(true);
      const t = setTimeout(() => setSurging(false), 900);
      return () => clearTimeout(t);
    }
    window.addEventListener("trace:surge", onSurge);
    return () => window.removeEventListener("trace:surge", onSurge);
  }, [prefersReducedMotion]);

  // The trace is a vertical line that lights up as you scroll
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 z-40 pointer-events-none">
      <svg
        width="24"
        height="100%"
        viewBox="0 0 24 1000"
        preserveAspectRatio="none"
        className="h-full w-6"
      >
        {/* Background trace (dimmed) */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="1000"
          stroke="#1E3A5F"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* Active trace (cyan, animated) — fully lit static line if
            prefers-reduced-motion, scroll-linked + surge-reactive otherwise */}
        {prefersReducedMotion ? (
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="1000"
            stroke="#14B8A6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 4px rgba(20, 184, 166, 0.5))" }}
          />
        ) : (
          <motion.line
            x1="12"
            y1="0"
            x2="12"
            y2="1000"
            stroke="#14B8A6"
            vectorEffect="non-scaling-stroke"
            animate={{ strokeWidth: surging ? 4 : 2 }}
            transition={{ duration: 0.3 }}
            style={{
              pathLength,
              filter: surging
                ? "drop-shadow(0 0 8px #14B8A6) drop-shadow(0 0 3px #14B8A6)"
                : "drop-shadow(0 0 4px rgba(20, 184, 166, 0.5))",
            }}
            className="trace-glow"
          />
        )}
        {/* Node dots live on each section itself via <TraceNode>, not
            here — these used to be hardcoded at arbitrary fixed
            positions that didn't correspond to real section boundaries. */}
      </svg>
    </div>
  );
}

// ─── Section Node ──────────────────────────────────────────────

interface TraceNodeProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function TraceNode({ id, children, className = "" }: TraceNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerNode, unregisterNode } = useTrace();
  const [isVisible, setIsVisible] = useState(false);

  // Register this node with the trace system
  useEffect(() => {
    registerNode(id, ref);
    return () => unregisterNode(id);
  }, [id, registerNode, unregisterNode]);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onViewportEnter={() => setIsVisible(true)}
    >
      {/* Active node indicator */}
      <div
        className={`absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-trace-cyan transition-all duration-500 ${
          isVisible ? "bg-trace-cyan scale-100" : "bg-circuit-navy scale-75"
        }`}
        style={{
          boxShadow: isVisible ? "0 0 8px rgba(20, 184, 166, 0.6)" : "none",
        }}
      />
      {children}
    </motion.div>
  );
}
