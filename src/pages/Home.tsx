import AmbientBackground from "@/components/AmbientBackground";
import HeroSection from "@/components/sections/HeroSection";
import ClubsSection from "@/components/sections/ClubsSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <AmbientBackground />
      <HeroSection />
      <ClubsSection />
      <EventsSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
