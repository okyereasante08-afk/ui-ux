import { motion } from "framer-motion";
import { User } from "lucide-react";

export interface Executive {
  id: string;
  name: string;
  role: string;
  bio: string;
  socials: {
    linkedin?: string;
    whatsapp?: string;
    snapchat?: string;
    instagram?: string;
  };
}

interface ExecutiveCardProps {
  executive: Executive;
  onClick: () => void;
  index: number;
}

export default function ExecutiveCard({ executive, onClick, index }: ExecutiveCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileTap={{ scale: 0.97 }}
      className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3 text-left hover:border-aces-blue/30 transition-colors"
    >
      <div className="aspect-square w-full rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-3">
        <User className="h-8 w-8 text-foreground/25" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-board-white leading-tight">{executive.name}</p>
      <p className="font-mono text-[11px] uppercase tracking-wide text-aces-blue/80 mt-0.5">
        {executive.role}
      </p>
    </motion.button>
  );
}
