import { useState, useRef } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import OfficialCard, { type Official } from "@/components/staff/OfficialCard";
import acesCrest from "@/assets/aces-crest.png";

/*
  Content verified via live fetch of acesknust.com/department.
  Real find: this page is "Department Officials" — actual faculty
  leading the Computer Engineering department, NOT student staff. Don't
  confuse this with a student volunteer list.

  PLACEHOLDER DATA below — names, offices, emails are all stand-ins to
  preview the card design (not built on the live site yet either, as of
  the fetch above). Swap for real faculty profiles before ship.
*/

const officials: Official[] = [
  { id: "1", name: "Full Name", title: "Head of Department", department: "Computer Engineering Department", office: "Office — TBD, CpE Block", email: "hod.cpe@knust.edu.gh", linkedin: "#" },
  { id: "2", name: "Full Name", title: "Deputy Head of Department", department: "Computer Engineering Department", office: "Office — TBD, CpE Block", email: "deputy.cpe@knust.edu.gh", linkedin: "#" },
  { id: "3", name: "Full Name", title: "Examinations Officer", department: "Computer Engineering Department", office: "Office — TBD, CpE Block", email: "exams.cpe@knust.edu.gh" },
  { id: "4", name: "Full Name", title: "Industrial Attachment Coordinator", department: "Computer Engineering Department", office: "Office — TBD, CpE Block", email: "attachment.cpe@knust.edu.gh", linkedin: "#" },
];

export default function Staff() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / officials.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(officials.length - 1, idx)));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-8">
        <PageHeader
          eyebrow="department // officials"
          title="Department Officials"
          description="Meet the dedicated faculty members leading the Computer Engineering Department."
        />
      </div>

      {officials.length === 0 ? (
        <div className="px-8">
          <EmptyState
            title="No officials listed yet"
            description="TODO: wire in real faculty profiles (photo, name, title) — not built on the live site yet either, as of this fetch."
          />
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-8 pr-8 pb-2"
          >
            {officials.map((official, i) => (
              <OfficialCard key={official.id} official={official} index={i} />
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {officials.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 bg-aces-blue" : "w-1.5 bg-foreground/15"
                }`}
              />
            ))}
          </div>

          {/* Crest + motto */}
          <div className="flex flex-col items-center gap-2 mt-10">
            <img src={acesCrest} alt="ACES" className="h-8 w-auto opacity-60" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/35">
              Technology For Our Age
            </p>
          </div>
        </>
      )}
    </div>
  );
}
