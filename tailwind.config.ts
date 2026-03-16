import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0a0a12",
          secondary: "#12121e",
          card: "#1a1a2e",
          cardHover: "#222240",
          input: "#0f0f1c",
        },
        border: {
          DEFAULT: "#2a2a45",
          focus: "#7c3aed",
        },
        text: {
          primary: "#e8e8f0",
          secondary: "#9898b0",
          muted: "rgba(104, 104, 128, 0.55)",
        },
        accent: {
          purple: "#a78bfa",
          cyan: "#06b6d4",
          green: "#34d399",
          orange: "#fb923c",
          pink: "#f472b6",
          red: "#f87171",
        },
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #a78bfa, #06b6d4)",
        "gradient-warm": "linear-gradient(135deg, #f472b6, #fb923c)",
        "gradient-cool": "linear-gradient(135deg, #34d399, #06b6d4)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0,0,0,0.3)",
        md: "0 4px 20px rgba(0,0,0,0.4)",
        lg: "0 8px 40px rgba(0,0,0,0.5)",
        glow: "0 0 30px rgba(167,139,250,0.15)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
