import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { TraceNode } from "@/components/TraceConnector";
import { upcomingEvents } from "@/data/events";

export default function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <TraceNode id="events" className="py-20">
      <div className="px-8 md:px-12 lg:px-24 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs text-aces-blue uppercase tracking-widest mb-2">
            03 // Upcoming
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-board-white">
            Events
          </h2>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-8 md:px-12 lg:px-24 pb-4 snap-x snap-mandatory"
      >
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
          >
            <div className="h-full bg-foreground/[0.03] border border-foreground/10 rounded-lg overflow-hidden hover:border-aces-blue/30 transition-colors duration-300 group">
              {event.image && (
                <div className="h-32 w-full overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-4">
                  <span className="font-mono text-xs text-foreground/30 uppercase tracking-wider bg-foreground/5 px-2 py-1 rounded">
                    Date TBD
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-board-white mb-3 leading-snug group-hover:text-aces-blue transition-colors">
                  {event.title}
                </h3>

                <p className="text-xs font-medium text-foreground/50 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-4 pt-4 border-t border-foreground/5">
                  <a
                    href="/events"
                    className="flex items-center gap-1 text-xs font-mono text-aces-blue/80 hover:text-aces-blue transition-colors uppercase tracking-wider"
                  >
                    Details
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex-shrink-0 w-8" />
      </div>
    </TraceNode>
  );
}
