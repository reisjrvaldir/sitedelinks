import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#B8FF00",
        dark: "#0a0a0a",
        "dark-secondary": "#1a1a1a",
        // Paleta da Apple Store, usada na página de preços.
        apple: {
          bg: "#ffffff",
          surface: "#f5f5f7",
          ink: "#1d1d1f",
          muted: "#6e6e73",
          blue: "#0071e3",
          "blue-hover": "#0077ed",
          highlight: "#bf4800",
          hairline: "#d2d2d7",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Helvetica Neue",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "neon-glow": "0 0 20px rgba(184, 255, 0, 0.4), 0 0 40px rgba(184, 255, 0, 0.2)",
        "neon-glow-lg": "0 0 40px rgba(184, 255, 0, 0.5), 0 0 80px rgba(184, 255, 0, 0.3)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(184, 255, 0, 0.4), 0 0 40px rgba(184, 255, 0, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(184, 255, 0, 0.6), 0 0 80px rgba(184, 255, 0, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
