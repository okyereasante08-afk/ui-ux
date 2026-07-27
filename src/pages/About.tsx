import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import LogoTrace from "@/components/about/LogoTrace";
import MissionTab from "@/components/about/MissionTab";
import VisionTab from "@/components/about/VisionTab";
import LogoTab from "@/components/about/LogoTab";
import aboutBg from "@/assets/about-bg.jpg";
import { cn } from "@/lib/utils";

/*
  Content verified via live fetch of acesknust.com/about — not invented.
  Confirm with the org before final ship in case wording has changed.

  Background photo (CodeFest VR demo) is scoped to this page only, per
  request — not a site-wide pattern.
*/

const tabs = [
  { id: "mission", label: "Mission" },
  { id: "vision", label: "Vision" },
  { id: "logo", label: "Logo" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>("mission");
  const [introDone, setIntroDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 350], [0.55, 0]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Intro overlay — the logo traces itself in once when the page opens */}
      <AnimatePresence>
        {!introDone && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-circuit-navy"
          >
            <LogoTrace size={120} onComplete={() => setTimeout(() => setIntroDone(true), 250)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background photo, scoped to this page — fades into bg-background
          both via a fixed gradient and a scroll-linked opacity fade, so it
          blends into the text rather than cutting off hard. */}
      <div className="fixed inset-x-0 top-0 h-[62vh] -z-10 overflow-hidden pointer-events-none">
        <motion.img
          src={aboutBg}
          alt=""
          style={{ opacity: prefersReducedMotion ? 0.35 : bgOpacity }}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-circuit-navy/50" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 88%)" }}
        />
      </div>

      <div className="relative z-10 px-8 pb-24">
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
            Our association is committed to supporting students through a
            wide range of initiatives, including technical workshops, career
            development programs, mentorship, industrial visits, networking
            events, and community service.
          </p>
        </div>

        {/* Segmented tab control */}
        <div className="mt-10 mb-6 inline-flex rounded-full border border-foreground/10 bg-foreground/[0.03] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-5 py-2 font-mono text-xs uppercase tracking-widest rounded-full transition-colors",
                activeTab === tab.id ? "text-white" : "text-foreground/50 hover:text-foreground/80",
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="about-tab-pill"
                  className="absolute inset-0 rounded-full bg-aces-blue"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {activeTab === "mission" && <MissionTab />}
            {activeTab === "vision" && <VisionTab />}
            {activeTab === "logo" && <LogoTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
