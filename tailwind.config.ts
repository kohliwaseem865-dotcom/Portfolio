import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark luxury base
        base: {
          950: "#050507",
          900: "#0a0a0f",
          850: "#0d0d14",
          800: "#12121b",
          700: "#1a1a26",
          600: "#242433",
        },
        // Refined accent — cool aurora violet/cyan
        accent: {
          DEFAULT: "#7c5cff",
          50: "#efeaff",
          100: "#dcd2ff",
          200: "#bcaaff",
          300: "#9c82ff",
          400: "#7c5cff",
          500: "#6039f5",
          600: "#4c28d1",
          700: "#3c1fa3",
        },
        cyan: {
          glow: "#38e6ff",
        },
        ink: {
          DEFAULT: "#e7e7ee",
          muted: "#a1a1b3",
          faint: "#6c6c80",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": ["9rem", { lineHeight: "0.9" }],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(124, 92, 255, 0.45)",
        "glow-cyan": "0 0 40px -8px rgba(56, 230, 255, 0.35)",
        "inner-line": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #050507), radial-gradient(circle at 50% 0%, rgba(124,92,255,0.12), transparent 55%)",
        "aurora":
          "conic-gradient(from 180deg at 50% 50%, #7c5cff 0deg, #38e6ff 120deg, #7c5cff 240deg, #38e6ff 360deg)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "spin-slow": "spin-slow 18s linear infinite",
        shimmer: "shimmer 2.5s infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
