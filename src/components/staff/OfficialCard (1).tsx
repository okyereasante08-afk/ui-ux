import { motion } from "framer-motion";
import { User, MapPin, Mail, Linkedin } from "lucide-react";

export interface Official {
  id: string;
  name: string;
  title: string;
  department: string;
  office: string;
  email?: string;
  linkedin?: string;
  bio?: string;
  photo?: string;
}

interface OfficialCardProps {
  official: Official;
  index: number;
}

export default function OfficialCard({ official, index }: OfficialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="w-[260px] shrink-0 snap-start rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"
    >
      <div className="aspect-square w-full rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-3 overflow-hidden">
        {official.photo ? (
          <img src={official.photo} alt={official.name} className="h-full w-full object-cover" />
        ) : (
          <User className="h-8 w-8 text-foreground/25" strokeWidth={1.5} />
        )}
      </div>

      <p className="text-sm font-heading font-bold text-board-white leading-tight">
        {official.name}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-wide text-aces-blue/80 mt-0.5 mb-2">
        {official.title}
      </p>
      <p className="text-xs text-foreground/50 leading-snug mb-3">{official.department}</p>

      {official.bio && (
        <p className="text-xs text-foreground/60 leading-relaxed mb-3">{official.bio}</p>
      )}

      <div className="space-y-1.5 border-t border-foreground/10 pt-3">
        <div className="flex items-start gap-1.5 text-xs text-foreground/50">
          <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span className="leading-snug">{official.office}</span>
        </div>
        {official.email && (
          <a
            href={`mailto:${official.email}`}
            className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-aces-blue transition-colors"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{official.email}</span>
          </a>
        )}
        {official.linkedin && (
          <a
            href={official.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-aces-blue transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5 shrink-0" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
