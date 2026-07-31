import { motion, AnimatePresence } from "framer-motion";
import { X, User, Linkedin, Instagram } from "lucide-react";
import type { Executive } from "./ExecutiveCard";
import { WhatsAppIcon, SnapchatIcon } from "./SocialIcons";
import acesCrest from "@/assets/aces-crest.png";

interface ExecutiveModalProps {
  executive: Executive | null;
  onClose: () => void;
}

const socialLinks = (socials: Executive["socials"]) =>
  [
    socials.linkedin && { key: "linkedin", href: socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
    socials.whatsapp && { key: "whatsapp", href: socials.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp" },
    socials.snapchat && { key: "snapchat", href: socials.snapchat, Icon: SnapchatIcon, label: "Snapchat" },
    socials.instagram && { key: "instagram", href: socials.instagram, Icon: Instagram, label: "Instagram" },
  ].filter(Boolean) as { key: string; href: string; Icon: React.ElementType; label: string }[];

export default function ExecutiveModal({ executive, onClose }: ExecutiveModalProps) {
  return (
    <AnimatePresence>
      {executive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="pointer-events-auto w-full max-w-sm rounded-2xl border border-aces-blue/20 bg-card shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="relative p-6 pb-4 text-center border-b border-foreground/10">
                <button
                  onClick={onClose}
                  aria-label="Close profile"
                  className="absolute right-4 top-4 text-foreground/50 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center overflow-hidden">
                  {executive.photo ? (
                    <img src={executive.photo} alt={executive.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-9 w-9 text-foreground/25" strokeWidth={1.5} />
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-board-white">{executive.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-aces-blue mt-1">
                  {executive.role}
                </p>
              </div>

              <div className="p-6 pt-4">
                <p className="text-sm text-foreground/60 leading-relaxed mb-5">{executive.bio}</p>

                {socialLinks(executive.socials).length > 0 && (
                  <div className="flex items-center justify-center gap-3 mb-6">
                    {socialLinks(executive.socials).map(({ key, href, Icon, label }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 hover:border-aces-blue/40 hover:text-aces-blue transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 pt-4 border-t border-foreground/10">
                  <img src={acesCrest} alt="ACES" className="h-6 w-auto opacity-70" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    Technology For Our Age
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
