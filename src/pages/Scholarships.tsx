import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import CurrentPulseButton from "@/components/ui/CurrentPulseButton";

/*
  Header copy verified via live fetch of acesknust.com/scholarships.
  No real scholarship listings were visible in that fetch — treated as
  genuinely empty rather than inventing opportunities that may not exist.

  "Notify me" now actually does something: validates the email, stores
  it (localStorage — demo only, no real backend or email service wired
  up), and swaps to a confirmation state. Previously the button had no
  onClick at all, so nothing happened when tapped.
*/

const NOTIFY_KEY = "aces_scholarship_notify_email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Scholarships() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNotify = () => {
    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    try {
      window.localStorage.setItem(NOTIFY_KEY, trimmed);
    } catch {
      // localStorage unavailable — the confirmation still shows, it just
      // won't persist across a refresh. Not worth blocking the UX for.
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="scholarships // opportunities"
        title="Scholarship Opportunities"
        description="Explore various scholarships available and apply. Make sure to read eligibility criteria before applying and provide the necessary documents."
      />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState
              icon={<CircleCheck className="h-8 w-8" />}
              title="You're on the list"
              description={`We'll email ${email.trim()} the moment a new scholarship opens.`}
            />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmptyState
              title="No open scholarships right now"
              description="Leave your email and we'll notify you when a new opportunity opens."
              action={
                <div className="flex w-full max-w-sm flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                      placeholder="Email address"
                      type="email"
                      className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/30"
                    />
                    <CurrentPulseButton size="sm" onClick={handleNotify}>
                      Notify me
                    </CurrentPulseButton>
                  </div>
                  {error && <p className="text-xs font-medium text-red-400">{error}</p>}
                </div>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
