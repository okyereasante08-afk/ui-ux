import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ACES brand palette — theme-aware via CSS variables (see
        // src/index.css). Values match the official brand sheet:
        // ACES Blue #0B5FFF · Deep Navy #0B1F3A · Light Blue #EAF4FF ·
        // White #FFFFFF · Text #111827 · Muted Text #5B6B7E.
        "circuit-navy": "hsl(var(--surface))",
        "aces-blue": "hsl(var(--aces-blue))",
        "board-white": "hsl(var(--heading))",
        "dim-trace": "hsl(var(--trace-track))",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        heading: ["Syne", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "pulse-once": "pulse-once 0.4s ease-out",
      },
      keyframes: {
        "pulse-once": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
