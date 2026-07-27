import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TraceNode } from "@/components/TraceConnector";

const testimonials = [
  {
    // TODO: replace with a real, permission-granted member testimonial.
    // Do not attribute invented quotes to real names — the previous
    // version of this file used a real name from the live site's
    // testimonial section paired with a fabricated quote about a
    // different club entirely, plus a second person invented outright.
    quote: "TODO: real member testimonial, with their permission.",
    name: "Member name (TBD)",
    role: "TODO: verify role/year",
    highlight: "TODO: verify affiliation",
  },
];

export default function TestimonialsSection() {
  return (
    <TraceNode id="testimonials" className="py-20 px-6 md:px-12 lg:px-24">
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
            04 // Voices
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-board-white">
            What Members Say
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="space-y-6">
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
