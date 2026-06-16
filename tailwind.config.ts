import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionTimingFunction: {
        //efeito spring sutil
        "brand-bouce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        //saida rapida e elegante para modals e menus
        "brand-exit": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-header": "var(--bg-header)",
        "bg-footer": "var(--bg-footer)",
        accent: "var(--accent)",
        "accent-alt": "var(--accent-alt)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-dark": "var(--text-dark)",
      },
      fontFamily: {
        sans: ["Outfit", "Arial", "Helvetica", "sans-serif"],
        display: ["Oswald", "sans-serif"],
        body: ["Outfit", "Arial", "Helvetica", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
