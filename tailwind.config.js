/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          950: "#05060f",
          900: "#0a0b1a",
          800: "#11122a",
          700: "#1a1b3a",
          600: "#262756",
        },
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(99,102,241,0.18), transparent 40%), radial-gradient(circle at 80% 10%, rgba(34,211,238,0.12), transparent 45%), radial-gradient(circle at 50% 100%, rgba(139,92,246,0.14), transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(129,140,248,0.25), 0 10px 40px -10px rgba(79,70,229,0.45)",
        float: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
