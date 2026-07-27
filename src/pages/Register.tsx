import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { registerUser } from "@/lib/auth";
import { UserRole } from "@/types/marketplace";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("shopper");
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = registerUser({ name, email, password, role, storeName });

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    navigate(role === "vendor" ? "/vendor-dashboard" : "/marketplace");
  };

  return (
    <div className="min-h-screen bg-circuit-navy px-6 pb-24">
      <PageHeader
        eyebrow="student marketplace"
        title="Create Your Account"
        description="Join the ACES Marketplace to shop or sell to fellow engineering students."
      />

      {/* Role toggle drives whether storeName is required/shown, and which
          route the user lands on after submit. */}
      <div className="mb-5 grid grid-cols-2 gap-2">
        {(["shopper", "vendor"] as UserRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              "rounded-lg border py-3 text-sm font-semibold transition-colors",
              role === r
                ? "border-aces-blue/50 bg-aces-blue/10 text-aces-blue"
                : "border-border text-foreground/60 hover:border-aces-blue/30",
            )}
          >
            {r === "shopper" ? "I'm shopping" : "I'm selling"}
          </button>
        ))}
      </div>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-foreground/50">
            Full Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kwame Mensah"
            className="w-full rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-sm text-board-white outline-none transition-colors focus:border-aces-blue/50 placeholder:text-foreground/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-foreground/50">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@knust.edu.gh"
            className="w-full rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-sm text-board-white outline-none transition-colors focus:border-aces-blue/50 placeholder:text-foreground/30"
          />
        </div>

        {role === "vendor" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
          >
            <label htmlFor="storeName" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-foreground/50">
              Store Name
            </label>
            <input
              id="storeName"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g. Ama's Threads"
              className="w-full rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-sm text-board-white outline-none transition-colors focus:border-aces-blue/50 placeholder:text-foreground/30"
            />
          </motion.div>
        )}

        <div>
          <label htmlFor="password" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-foreground/50">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-sm text-board-white outline-none transition-colors focus:border-aces-blue/50 placeholder:text-foreground/30"
          />
        </div>

        {error && <p className="text-xs font-medium text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-aces-blue py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Create Account"}
        </button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-foreground/50">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-aces-blue hover:text-aces-blue/80">
          Log in
        </Link>
      </p>
    </div>
  );
}
