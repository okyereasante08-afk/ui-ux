import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = login(email, password);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    // Vendors land on their dashboard; shoppers return to browsing.
    navigate(result.user?.role === "vendor" ? "/vendor-dashboard" : "/marketplace");
  };

  return (
    <div className="min-h-screen bg-circuit-navy px-6 pb-24">
      <PageHeader
        eyebrow="student marketplace"
        title="Welcome Back"
        description="Log in to manage your store on the ACES Marketplace."
      />

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
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

        <div>
          <label htmlFor="password" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-foreground/50">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-sm text-board-white outline-none transition-colors focus:border-aces-blue/50 placeholder:text-foreground/30"
          />
        </div>

        {error && <p className="text-xs font-medium text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-aces-blue py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Log In"}
        </button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-foreground/50">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-aces-blue hover:text-aces-blue/80">
          Create one here
        </Link>
      </p>
    </div>
  );
}
