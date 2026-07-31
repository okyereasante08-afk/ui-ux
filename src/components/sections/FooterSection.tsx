import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

/*
  Real socials, verified via live fetch — the previous version had a
  fabricated GitHub link that doesn't exist on the live site (it's
  LinkedIn/Instagram/X, not GitHub).

  Padding: pt-16 → pt-12 trimmed to match the reduction on the other
  sections. pb-32 was LEFT AS-IS on purpose, not trimmed like the rest —
  BottomNav is a fixed h-16 (4rem) bar sitting on top of the page
  content, so the footer needs real clearance underneath its last line
  or the copyright text would sit against/behind the nav. pb-32 is 8rem,
  double the nav's height, which reads as intentional breathing room
  rather than an oversight. If it still feels excessive in practice,
  the safer next trim is pb-32 → pb-24 (6rem, 2rem of clearance beyond
  the nav) rather than matching the ~14 used elsewhere on the page.
*/

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/aces-knust/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/aces_knust/" },
  { icon: Twitter, label: "X", href: "https://x.com/aces_knust" },
];

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Executives", to: "/executives" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
  { label: "Marketplace", to: "/marketplace" },
];

export default function FooterSection() {
  return (
    <footer className="relative bg-circuit-navy border-t border-foreground/5 pt-12 pb-32 px-8 md:px-12 lg:px-24">
      {/* Ground plane grid moved to the shared AmbientBackground component
          (rendered once in Home.tsx behind all sections) — previously
          this was a second, slightly different copy of the same grid
          pattern used in HeroSection. */}

      <div className="relative z-10 max-w-2xl mx-auto md:mx-0">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="font-mono text-2xl font-bold text-board-white tracking-tight">
            ACES
          </p>
          <p className="font-mono text-xs text-foreground/30 uppercase tracking-widest mt-1">
            Association of Computer Engineering Students
          </p>
        </motion.div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 mb-10">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-mono text-xs text-foreground/40 hover:text-aces-blue transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-4 mb-10">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-aces-blue/10 hover:text-aces-blue transition-colors text-foreground/40"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-foreground/5">
          <p className="font-mono text-[10px] text-foreground/20 uppercase tracking-wider">
            © 2026 ACES KNUST · Dept. of Computer Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
