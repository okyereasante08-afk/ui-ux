import { motion } from "framer-motion";
import { Cpu, Code2, Bot } from "lucide-react";
import { TraceNode } from "@/components/TraceConnector";

const clubs = [
  {
    icon: Cpu,
    name: "Arduino Club",
    description: "Dive into real hardware projects with Arduino boards. Build circuits, write embedded C, and bring physical systems to life.",
  },
  {
    icon: Code2,
    name: "Coding Club",
    description: "Build beautiful websites and applications. HTML, CSS, JavaScript, and modern frameworks.",
  },
  {
    icon: Bot,
    name: "Robotics Club",
    description: "Design, build, and program intelligent robots — from autonomous vehicles to robotic arms.",
  },
];

export default function ClubsSection() {
  return (
    <TraceNode id="clubs" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto md:mx-0">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-trace-cyan uppercase tracking-widest mb-2">
            02 // Our Clubs
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-board-white">
            Specialization Tracks
          </h2>
        </motion.div>

        {/* Club cards */}
        <div className="space-y-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="chip-notch relative bg-white/[0.03] border border-white/10 rounded-lg p-6 hover:border-trace-cyan/30 transition-colors duration-300 group">
                {/* Chip notch visual indicator */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-trace-cyan/40 rounded-tl" />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-trace-cyan/10 flex items-center justify-center">
                    <club.icon size={24} className="text-trace-cyan" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-lg font-semibold text-board-white group-hover:text-trace-cyan transition-colors mb-2">
                      {club.name}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {club.description}
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
