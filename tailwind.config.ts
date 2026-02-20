import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07090f",
        "surface-1": "#0d1117",
        "surface-2": "#111620",
        "surface-3": "#161d2c",
        border: "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.16)",
        text: "#dde4f0",
        "text-muted": "#8b95aa",
        "text-dim": "#4a5568",
        cyan: "#00d4ff",
        violet: "#8b5cf6",
        rose: "#f43f5e",
        amber: "#f59e0b",
        emerald: "#10b981"
      },
      fontFamily: {
        sans: ["var(--font-epilogue)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-syne)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
