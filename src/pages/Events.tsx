import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { upcomingEvents, pastEvents } from "@/data/events";

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="events // full schedule"
        title="ACES Events"
        description="Stay updated with the latest workshops, tech talks, social gatherings, and departmental activities."
      />

      <div className="flex gap-2 mb-6">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
              tab === t ? "bg-primary text-white" : "bg-foreground/5 text-foreground/50"
            }`}
          >
            {t} Events
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden hover:border-aces-blue/30 transition-colors"
          >
            {event.image && (
              <div className="h-40 w-full overflow-hidden">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <span className="font-mono text-[10px] uppercase tracking-wider bg-foreground/5 text-foreground/40 px-2 py-1 rounded">
                {tab === "upcoming" ? "Date TBD" : "Past"}
              </span>
              <h3 className="mt-3 text-sm font-heading font-bold text-foreground">{event.title}</h3>
              <p className="mt-1 text-xs text-foreground/50 leading-relaxed">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
