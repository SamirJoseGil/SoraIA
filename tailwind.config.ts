import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Darker blue theme colors
        soraia: {
          light: '#1a1f28',       // Slightly darker background
          primary: '#3a75b0',     // Darker blue for primary
          secondary: '#345d8a',   // Darker secondary blue
          dark: '#e7eff3',        // Keeping light text
          accent: '#8ab3d8',      // Slightly darker accent blue
          neutral: '#b4b4bc',
          muted: '#6284a3',
          50: '#1a1f28',          // Dark base
          300: '#8ab3d8',         // Darker accent
          500: '#3a75b0',         // Darker primary
          700: '#345d8a',         // Darker secondary
          900: '#e7eff3',         // Light text
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
