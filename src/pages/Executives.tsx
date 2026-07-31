import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import ExecutiveCard, { type Executive } from "@/components/executives/ExecutiveCard";
import ExecutiveModal from "@/components/executives/ExecutiveModal";

/*
  Content verified via live fetch of acesknust.com/executives.
  Live site's year dropdown has nothing selected by default, reading as
  dead on first load — defaults to the first year here as a fix.

  PLACEHOLDER DATA below for 2025/2026 — names, bios, and social links are
  all stand-ins to preview the card/modal design. Swap for real executive
  profiles (photo, name, role, bio, actual social URLs) before ship.
  Previous years are left as honest empty states since there's no real
  data for them yet either.
*/

const years = ["2025/2026", "2024/2025", "2023/2024"];

const placeholderExecutives: Executive[] = [
  { id: "1", name: "Hanz Ofosuhene Sintim", role: "President", bio: "ACES President|Kwame Nkrumah University of Science and Technology| Semiconductor engineer Enthusiast", socials: { linkedin: "#", whatsapp: "#", instagram: "#" } },
  { id: "2", name: "Full Name", role: "Vice President", bio: "Placeholder bio — add a short description of what this executive does once real profiles are available.", socials: { linkedin: "#", whatsapp: "#", instagram: "#" } },
  { id: "3", name: "Full Name", role: "General Secretary", bio: "Placeholder bio — add a short description of what this executive does once real profiles are available.", socials: { linkedin: "#", whatsapp: "#", snapchat: "#" } },
  { id: "4", name: "Full Name", role: "Financial Secretary", bio: "Placeholder bio — add a short description of what this executive does once real profiles are available.", socials: { linkedin: "#", whatsapp: "#", snapchat: "#" } },
  { id: "5", name: "Full Name", role: "Public Relations Officer", bio: "Placeholder bio — add a short description of what this executive does once real profiles are available.", socials: { linkedin: "#", instagram: "#", snapchat: "#" } },
  { id: "6", name: "Full Name", role: "Organizing Secretary", bio: "Placeholder bio — add a short description of what this executive does once real profiles are available.", socials: { linkedin: "#", whatsapp: "#" } },
];

const executivesByYear: Record<string, Executive[]> = {
  "2025/2026": placeholderExecutives,
};

export default function Executives() {
  const [year, setYear] = useState(years[0]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Executive | null>(null);
  const executives = executivesByYear[year] ?? [];

  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="executives // by year"
        title="Meet Your Leaders"
        description="We are a student-led association that aims to provide an environment where students can grow and develop their skills."
      />

      <div className="relative w-fit mx-auto mb-10">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white"
        >
          {year} Executives
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            >
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => { setYear(y); setOpen(false); }}
                  className="block w-full px-4 py-2 text-left text-sm text-foreground/80 hover:bg-foreground/5"
                >
                  {y}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {executives.length === 0 ? (
        <EmptyState
          title={`No executives added yet for ${year}`}
          description="TODO: wire in real executive profiles (photo, name, role) for this academic year."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {executives.map((exec, i) => (
            <ExecutiveCard
              key={exec.id}
              executive={exec}
              index={i}
              onClick={() => setSelected(exec)}
            />
          ))}
        </div>
      )}

      <ExecutiveModal executive={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
