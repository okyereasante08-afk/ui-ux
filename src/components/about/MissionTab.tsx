import { motion } from "framer-motion";

const missionItems = [
  {
    title: "Objective",
    description:
      "Our primary objective is to enhance the academic experience of Computer Engineering students by providing resources, workshops, and study groups that reinforce classroom learning and encourage independent study.",
  },
  {
    title: "Dedication",
    description:
      "We are dedicated to fostering professional growth through career development programs, networking events, and mentorship opportunities that connect students with industry leaders and alumni.",
  },
  {
    title: "Commitment",
    description:
      "ACES is committed to community impact, organizing outreach programs and initiatives that leverage technology to address societal challenges and promote tech literacy beyond the university.",
  },
];

const springPop = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20, delay: i * 0.12 },
  }),
};

export default function MissionTab() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {missionItems.map((item, i) => (
        <motion.div
          key={item.title}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={springPop}
          className="rounded-xl border border-foreground/10 bg-foreground/[0.03] backdrop-blur-sm p-5"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-aces-blue mb-2">
            0{i + 1}
          </p>
          <h3 className="font-heading text-lg font-bold text-board-white mb-2">{item.title}</h3>
          <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
