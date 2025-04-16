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
        // Nueva paleta de colores
        soraia: {
          light: '#e7eff3',
          primary: '#4486ce',
          dark: '#636d7c',
          accent: '#a1c5e4',
          secondary: '#477eb8',
          neutral: '#b4b4bc',
          muted: '#7296b5',
          50: '#e7eff3',
          300: '#a1c5e4',
          500: '#4486ce',
          700: '#477eb8',
          900: '#636d7c',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
