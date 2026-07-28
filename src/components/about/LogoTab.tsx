import { useState } from "react";
import { motion } from "framer-motion";
import LogoTrace from "./LogoTrace";

const elements = [
  { title: "Shield", description: "Integrity and professionalism." },
  { title: "Stylized \"A\"", description: "ACES, ambition, and excellence." },
  { title: "Circuit Node", description: "Computing and digital technology." },
  { title: "Circular Node", description: "Connectivity and collaboration." },
  { title: "Orbital Arc", description: "Innovation and continuous growth." },
  { title: "Gear", description: "Engineering and problem-solving." },
  { title: "Blue Color", description: "Trust, knowledge, and technology." },
];

const springPop = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay: 0.15 + i * 0.06 },
  }),
};

export default function LogoTab() {
  const [playKey, setPlayKey] = useState(0);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <button
          onClick={() => setPlayKey((k) => k + 1)}
          aria-label="Replay logo animation"
          className="mb-6"
        >
          <LogoTrace key={playKey} size={160} />
        </button>
        <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80 mb-2">
          aces // knust
        </p>
        <p className="text-sm text-foreground/50 max-w-xs">
          Tap the mark to replay the trace.
        </p>
      </div>

      <div className="mt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80 mb-3">
          about the logo
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed max-w-xl mb-6">
          The ACES logo is made up of six key elements: a shield, a stylized
          "A", a circuit node, a circular node, an orbital arc, and a gear.
          Together, they represent the association's identity and the blend
          of computing and engineering.
        </p>

        <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/40 mb-3">
          what each element represents
        </p>
        <div className="space-y-2.5 max-w-xl">
          {elements.map((el, i) => (
            <motion.div
              key={el.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              variants={springPop}
              className="flex items-start gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.02] px-4 py-3"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-aces-blue" />
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="font-heading font-bold text-board-white">{el.title}</span>
                {" — "}
                {el.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
