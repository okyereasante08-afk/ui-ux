import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TraceNode } from "@/components/TraceConnector";
import { clubs } from "@/data/clubs";

export default function ClubsSection() {
  return (
    <TraceNode id="clubs" className="py-20 px-8 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto md:mx-0">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-aces-blue uppercase tracking-widest mb-2">
            02 // Our Clubs
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-board-white">
            Specialization Tracks
          </h2>
        </motion.div>

        {/* Club cards — each links to its own detail page now */}
        <div className="space-y-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/clubs/${club.slug}`}
                className="chip-notch relative flex items-start gap-4 bg-foreground/[0.03] border border-foreground/10 rounded-lg p-4 hover:border-aces-blue/30 transition-colors duration-300 group"
              >
                {/* Chip notch visual indicator */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-aces-blue/40 rounded-tl" />

                <img
                  src={club.image}
                  alt={club.name}
                  className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-heading text-lg font-bold text-board-white group-hover:text-aces-blue transition-colors mb-1">
                    {club.name}
                  </h3>
                  <p className="text-sm font-medium text-foreground/50 leading-relaxed">
                    {club.description}
                  </p>
                </div>

                <ChevronRight className="h-5 w-5 text-foreground/30 group-hover:text-aces-blue transition-colors flex-shrink-0 self-center" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </TraceNode>
  );
}
