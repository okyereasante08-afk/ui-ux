import { motion } from "framer-motion";
import { Briefcase, Zap, ArrowLeftRight, Megaphone, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

/*
  Content verified via live fetch of acesknust.com/about — not invented.
  Confirm with the org before final ship in case wording has changed.
*/

const pillars = [
  { icon: Briefcase, title: "Internships", description: "Create opportunities for students to obtain practical exposure through industrial attachments." },
  { icon: Zap, title: "Skills", description: "Create opportunities for students to acquire skills useful in the field of computer engineering." },
  { icon: ArrowLeftRight, title: "Exchange", description: "Organize exchange programs with other computer engineering institutions." },
  { icon: Megaphone, title: "Outreach", description: "Make computer engineering attractive to students in second cycle institutions." },
  { icon: CheckCircle2, title: "Application", description: "Help students put into practice the knowledge acquired." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="about // aces-knust"
        title="Association of Computer Engineering Students"
      />

      <div className="space-y-4 text-sm leading-relaxed text-foreground/60 max-w-xl">
        <p>
          The Association of Computer Engineering Students (ACES) is the
          official student body representing all Computer Engineering
          students at KNUST. As a vibrant community of innovative and
          forward-thinking individuals, ACES serves as a platform for
          students to connect, learn, and grow together in the field of
          Computer Engineering.
        </p>
        <p>
          Our association is committed to supporting students through a wide
          range of initiatives, including technical workshops, career
          development programs, mentorship, industrial visits, networking
          events, and community service.
        </p>
      </div>

      <div className="mt-12">
        <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80 mb-4">
          pillars // 01–05
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 hover:border-aces-blue/30 transition-colors"
            >
              <pillar.icon className="h-5 w-5 text-aces-blue mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">{pillar.title}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
