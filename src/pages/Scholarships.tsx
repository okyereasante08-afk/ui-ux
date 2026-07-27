import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import CurrentPulseButton from "@/components/ui/CurrentPulseButton";

/*
  Header copy verified via live fetch of acesknust.com/scholarships.
  No real scholarship listings were visible in that fetch — treated as
  genuinely empty rather than inventing opportunities that may not exist.
*/

export default function Scholarships() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-circuit-navy px-8 pb-24">
      <PageHeader
        eyebrow="scholarships // opportunities"
        title="Scholarship Opportunities"
        description="Explore various scholarships available and apply. Make sure to read eligibility criteria before applying and provide the necessary documents."
      />
      <EmptyState
        title="No open scholarships right now"
        description="Leave your email and we'll notify you when a new opportunity opens."
        action={
          <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 text-sm text-white placeholder:text-foreground/30"
            />
            <CurrentPulseButton size="sm">Notify me</CurrentPulseButton>
          </div>
        }
      />
    </div>
  );
}
