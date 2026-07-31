import { motion } from "framer-motion";
import { User, MapPin, Mail, Linkedin } from "lucide-react";

export interface Official {
  id: string;
  name: string;
  title: string;
  department: string;
  office: string;
  // Only the HOD entry (verified, real) has a bio right now — everyone
  // else is placeholder data with just contact-style fields, so this
  // has to be optional rather than required.
  bio?: string;
  // Optional for the same reason: the HOD's real email/LinkedIn weren't
  // confirmed, so Staff.tsx deliberately omits them rather than
  // inventing one. Placeholder officials use email; the HOD may not.
  email?: string;
  linkedin?: string;
  // Attached by Staff.tsx via getOfficialPhoto(id) — undefined when no
  // photo exists yet for that official, in which case the card falls
  // back to the placeholder User icon it already had.
  photo?: string;
}

interface OfficialCardProps {
  official: Official;
  index: number;
}

export default function OfficialCard({ official, index }: OfficialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="snap-center shrink-0 w-[78vw] max-w-[300px] rounded-2xl border border-foreground/10 bg-card overflow-hidden shadow-lg"
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] bg-foreground/5">
        {official.photo ? (
          <img
            src={official.photo}
            alt={official.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-16 w-16 text-foreground/15" strokeWidth={1} />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 45%, hsl(var(--surface)) 100%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-aces-blue mb-1">
            0{index + 1}
          </p>
          <h3 className="font-heading text-lg font-bold text-board-white leading-tight">
            {official.name}
          </h3>
          <p className="text-xs text-foreground/60 mt-0.5">{official.title}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
          {official.department}
        </p>

        {official.bio && (
          <p className="text-xs leading-relaxed text-foreground/60">{official.bio}</p>
        )}

        <div className="space-y-1.5 text-xs text-foreground/60">
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-foreground/35" />
            <span>{official.office}</span>
          </div>
          {official.email && (
            <a
              href={`mailto:${official.email}`}
              className="flex items-start gap-2 hover:text-aces-blue transition-colors"
            >
              <Mail className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-foreground/35" />
              <span className="break-all">{official.email}</span>
            </a>
          )}
        </div>

        {official.linkedin && (
          <a
            href={official.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 text-foreground/50 hover:border-aces-blue/40 hover:text-aces-blue transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
