import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569"
        },
        brand: {
          700: "#1d4ed8",
          600: "#2563eb",
          50: "#eff6ff"
        },
        line: "#d9e2ec",
        surface: "#ffffff",
        wash: "#f6f8fb",
        success: {
          700: "#047857",
          50: "#ecfdf5"
        },
        caution: {
          700: "#b45309",
          50: "#fffbeb"
        },
        danger: {
          700: "#b91c1c",
          50: "#fef2f2"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
