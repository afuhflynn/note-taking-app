import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        // Custom colors from design system
        neutral: {
          950: "hsl(var(--neutral-950))",
          900: "hsl(var(--neutral-900))",
          800: "hsl(var(--neutral-800))",
          700: "hsl(var(--neutral-700))",
          600: "hsl(var(--neutral-600))",
          500: "hsl(var(--neutral-500))",
          400: "hsl(var(--neutral-400))",
          300: "hsl(var(--neutral-300))",
          200: "hsl(var(--neutral-200))",
          100: "hsl(var(--neutral-100))",
          50: "hsl(var(--neutral-50))",
          0: "hsl(var(--neutral-0))",
        },
        blue: {
          700: "hsl(var(--blue-700))",
          500: "hsl(var(--blue-500))",
          50: "hsl(var(--blue-50))",
        },
        green: {
          500: "hsl(var(--green-500))",
          100: "hsl(var(--green-100))",
        },
        red: {
          500: "hsl(var(--red-500))",
          100: "hsl(var(--red-100))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        xs: [
          "var(--font-size-xs)",
          {
            lineHeight: "var(--line-height-xs)",
            letterSpacing: "var(--letter-spacing-xs)",
          },
        ],
        sm: [
          "var(--font-size-sm)",
          {
            lineHeight: "var(--line-height-sm)",
            letterSpacing: "var(--letter-spacing-sm)",
          },
        ],
        base: [
          "var(--font-size-base)",
          {
            lineHeight: "var(--line-height-base)",
            letterSpacing: "var(--letter-spacing-base)",
          },
        ],
        lg: [
          "var(--font-size-lg)",
          {
            lineHeight: "var(--line-height-lg)",
            letterSpacing: "var(--letter-spacing-lg)",
          },
        ],
        xl: [
          "var(--font-size-xl)",
          {
            lineHeight: "var(--line-height-xl)",
            letterSpacing: "var(--letter-spacing-xl)",
          },
        ],
        "2xl": [
          "var(--font-size-2xl)",
          {
            lineHeight: "var(--line-height-2xl)",
            letterSpacing: "var(--letter-spacing-2xl)",
          },
        ],
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
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "slide-in": "slide-in 0.2s ease-out",
        "slide-out": "slide-out 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
      },
    },
    fontFamily: {
      "source-code-pro-bold": ["SourceCodePro-Bold"],
      "source-code-pro-medium": ["SourceCodePro-Medium"],
      "source-code-pro-regular": ["SourceCodePro-Regular"],
      "source-code-pro-semibold": ["SourceCodePro-SemiBold"],
      "noto-serif-bold": ["NotoSerif-Bold"],
      "noto-serif-medium": ["NotoSerif-Medium"],
      "noto-serif-regular": ["NotoSerif-Regular"],
      "noto-serif-semibold": ["NotoSerif-SemiBold"],
      "inter-18pt-bold": ["Inter_18pt-Bold"],
      "inter-18pt-medium": ["Inter_18pt-Medium"],
      "inter-18pt-regular": ["Inter_18pt-Regular"],
      "inter-18pt-semibold": ["Inter_18pt-SemiBold"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
