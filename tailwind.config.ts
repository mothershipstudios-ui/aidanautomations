import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A5FFF",
        "primary-dark": "#0D1B3D",
        cyan: "#00D9FF",
        lavender: "#8B7FF5",
        "gray-bg": "#F5F7FA",
        success: "#00C853",
        warning: "#FF9800",
        error: "#FF3B3B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2", letterSpacing: "-0.5px" }],
        h2: ["36px", { lineHeight: "1.2", letterSpacing: "-0.5px" }],
        h3: ["28px", { lineHeight: "1.3", letterSpacing: "-0.25px" }],
        h4: ["20px", { lineHeight: "1.4", letterSpacing: "0" }],
        h5: ["16px", { lineHeight: "1.5", letterSpacing: "0" }],
        "body-l": ["18px", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-m": ["16px", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-s": ["14px", { lineHeight: "1.6", letterSpacing: "0.25px" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.3px" }],
      },
      spacing: {
        44: "44px",
      },
    },
  },
  plugins: [],
};

export default config;
