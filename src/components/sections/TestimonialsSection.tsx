import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TraceNode } from "@/components/TraceConnector";

/*
  Trimmed py-20 → py-14, header mb-12 → mb-8, card gap space-y-6 →
  space-y-4 — same reduction already applied to ClubsSection. This
  section only renders one testimonial right now, so its py-20 was
  producing a large empty-feeling block around a single card; the
  smaller padding reads better at this content density regardless of
  whether more testimonials get added later.
*/

const testimonials = [
  {
    // TODO: replace with a real, permission-granted member testimonial.
    // Do not attribute invented quotes to real names — the previous
    // version of this file used a real name from the live site's
    // testimonial section paired with a fabricated quote about a
    // different club entirely, plus a second person invented outright.
    quote: "This Platform helped me study for examinations. I love how everything is organized and intuitive. I would recommend it to anyone who wants to study effectively.",
    name: "Benjamin Etornam Abotsi",
    role: "Great Mind behind Prep Ai",
    highlight: "Founder of Prep Ai",
  },
];

export default function TestimonialsSection() {
  return (
    <TraceNode id="testimonials" className="py-14 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto md:mx-0">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="font-mono text-xs text-aces-blue uppercase tracking-widest mb-2">
            04 // Voices
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-board-white">
            What Members Say
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="space-y-4">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="relative bg-foreground/[0.03] border border-foreground/10 rounded-lg p-6">
                {/* Quote icon */}
                <Quote size={20} className="text-aces-blue/30 mb-4" />

                {/* Quote text */}
                <p className="text-sm text-foreground/70 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-aces-blue/10 flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-aces-blue">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-board-white">
                      {t.name}
                    </p>
                    <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                      {t.role} · {t.highlight}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TraceNode>
  );
}
