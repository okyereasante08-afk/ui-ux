import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

/*
  Content verified via live fetch of acesknust.com/events — real header
  copy, real "upcoming/past" tab structure. Event list reuses the same
  real events shown on Home (see EventsSection.tsx) rather than
  inventing new ones. Past events section is an honest empty state —
  no real archive data has been pulled yet.
*/

const events = [
  { title: "CodeFest 2025", description: "Join us for a thrilling day of coding challenges, workshops, and networking with tech enthusiasts." },
  { title: "ACES Robotics Meeting", description: "Explore the latest in robotics. Collaborate, build bots, and automate solutions with fellow members." },
  { title: "ACES Dinner 2025", description: "A night of fun, food, and fellowship. Connect with ACES members over an elegant dinner." },
  { title: "ACES Hangout", description: "Unwind with games, conversations, and chill vibes in this relaxed member-exclusive event." },
];

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

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

      {tab === "upcoming" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 hover:border-aces-blue/30 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider bg-foreground/5 text-foreground/40 px-2 py-1 rounded">
                Date TBD
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{event.title}</h3>
              <p className="mt-1 text-xs text-foreground/50 leading-relaxed">{event.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No past events archived yet"
          description="TODO: pull real past-event records once available — don't fabricate history."
        />
      )}
    </div>
  );
}
