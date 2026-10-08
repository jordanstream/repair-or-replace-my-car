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
          950: "#16201d",
          800: "#2a3732",
          700: "#33413b",
          600: "#58645e",
          400: "#89958f"
        },
        brand: {
          700: "#9f3218",
          600: "#c94724",
          100: "#f8d8cc",
          50: "#fdf0eb"
        },
        line: "#c7cec9",
        "line-strong": "#89958f",
        surface: "#ffffff",
        canvas: "#f4f6f3",
        wash: "#e9edea",
        success: {
          700: "#0b6e4f",
          100: "#d8eee6",
          50: "#edf8f4"
        },
        caution: {
          800: "#8a5700",
          700: "#8a5700",
          100: "#fbe8b8",
          50: "#fff7df"
        },
        danger: {
          800: "#821d1d",
          700: "#a32525",
          100: "#f6dada",
          50: "#fff0f0"
        }
      },
      boxShadow: {
        soft: "0 8px 20px rgba(22, 32, 29, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "Arial", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
