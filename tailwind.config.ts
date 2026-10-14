import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1500px" },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          muted: "hsl(var(--sidebar-muted))",
          accent: "hsl(var(--sidebar-accent))",
        },
        ink: {
          950: "#08161a",
          900: "#0d1f24",
          800: "#142b30",
          700: "#1b363b",
          600: "#25474e",
          500: "#3a6169",
          400: "#5d7f87",
          300: "#8aa5ab",
          200: "#b9ccd0",
          100: "#dce7e9",
          50: "#eef3f4",
        },
        copper: {
          950: "#2e1c13",
          900: "#4f3224",
          800: "#6b4430",
          700: "#875638",
          600: "#a56b44",
          500: "#bc8158",
          400: "#c99a74",
          300: "#d6b294",
          200: "#e7d4c2",
          100: "#f3e9e0",
          50: "#faf6f2",
        },
        sea: {
          950: "#062a22",
          900: "#0a3a2f",
          800: "#0c4839",
          700: "#0d5a46",
          600: "#0f7257",
          500: "#188b6a",
          400: "#3aa986",
          300: "#6fc6a9",
          200: "#a8ddc9",
          100: "#d3eee3",
          50: "#eef8f4",
        },
        amberish: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#f2b544",
          500: "#dc9418",
          600: "#b8730e",
          700: "#8d560f",
        },
        crimson: {
          50: "#fef2f2",
          100: "#fde0de",
          400: "#e5776a",
          500: "#d76255",
          600: "#b84336",
          700: "#93332a",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(13,31,36,.04)",
        "card-hover": "0 1px 2px rgba(13,31,36,.06)",
        pop: "0 6px 20px rgba(13,31,36,.14)",
        inset: "inset 0 1px 0 rgba(255,255,255,.04)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down .2s ease-out",
        "accordion-up": "accordion-up .2s ease-out",
        fade: "fade .18s ease-out",
        "slide-up": "slide-up .22s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
