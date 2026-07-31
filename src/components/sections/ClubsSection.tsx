import { motion } from "framer-motion";
import { TraceNode } from "@/components/TraceConnector";
import { clubs } from "@/data/clubs";

/*
  Tracks were previously wrapped in <Link to={`/clubs/${club.slug}`}>,
  but no /clubs/:slug route exists anywhere in the app, so tapping one
  navigated to a dead route and rendered blank. Made non-clickable per
  request rather than building out individual track detail pages — a
  bigger scope than this fix. ChevronRight (a "this leads somewhere"
  affordance) and the hover color/border/cursor states tied to
  clickability were removed along with the Link, since keeping them
  would visually promise an interaction that no longer exists.

  Also trimmed vertical spacing (py-20 → py-14, mb-12 → mb-8,
  space-y-6 → space-y-4) — this section was contributing a lot of
  compounding whitespace, especially if HeroSection above and
  EventsSection below carry similar padding.
*/

export default function ClubsSection() {
  return (
    <TraceNode id="clubs" className="py-14 px-8 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto md:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="font-mono text-xs text-aces-blue uppercase tracking-widest mb-2">
            02 // Our Clubs
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-board-white">
            Specialization Tracks
          </h2>
        </motion.div>

        <div className="space-y-4">
          {clubs.map((club, index) => (
            <motion.div
              key={club.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="chip-notch relative flex items-start gap-4 bg-foreground/[0.03] border border-foreground/10 rounded-lg p-4">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-aces-blue/40 rounded-tl" />

                <img
                  src={club.image}
                  alt={club.name}
                  className="w-20 h-20 rounded-md object-cover flex-shrink-0 bg-foreground/5"
                  onError={(e) => {
                    // Prevents a broken-image icon from looking like a
                    // dead page if the asset is missing from /public/clubs/
                    (e.target as HTMLImageElement).style.visibility = "hidden";
                  }}
                />

                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-heading text-lg font-bold text-board-white mb-1">
                    {club.name}
                  </h3>
                  <p className="text-sm font-medium text-foreground/50 leading-relaxed">
                    {club.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TraceNode>
  );
}
