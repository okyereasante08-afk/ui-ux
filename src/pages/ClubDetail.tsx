import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Instagram } from "lucide-react";
import { clubs } from "@/data/clubs";

export default function ClubDetail() {
  const { slug } = useParams<{ slug: string }>();
  const club = clubs.find((c) => c.slug === slug);

  if (!club) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
      </div>

      <div className="px-8 md:px-12 lg:px-24 -mt-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-aces-blue uppercase tracking-widest mb-2">
            {club.code} // club profile
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-board-white mb-4">
            {club.name}
          </h1>
          <p className="text-base font-medium text-foreground/70 leading-relaxed max-w-xl">
            {club.description}
          </p>
        </motion.div>

        {/* Honest placeholder — no fabricated meeting times, leaders, or
            project history. Fill this in with real specifics once the
            club provides them, rather than inventing detail. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6"
        >
          <h2 className="font-heading text-lg font-bold text-board-white mb-2">
            Getting Involved
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed mb-4">
            Full details on meeting times and current projects are being put
            together. In the meantime, keep an eye on ACES's socials for the
            latest from {club.name}.
          </p>
          <a
            href="https://www.instagram.com/aces_knust/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-aces-blue hover:underline"
          >
            <Instagram className="h-4 w-4" />
            @aces_knust
          </a>
        </motion.div>
      </div>
    </div>
  );
}
