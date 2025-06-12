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
          50: '#0f0f23',
          100: '#1a1a2e',
          200: '#16213e',
          300: '#1e293b',
          400: '#334155',
          500: '#1e1b4b',
          600: '#312e81',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Much darker blue theme colors
        soraia: {
          50: '#e7eff3',          // Light text
          100: '#6b7280',         // Darker neutral
          200: '#374151',         // Much darker accent
          300: '#1f2937',         // Even darker accent
          400: '#111827',         // Very dark muted
          500: '#0f1419',         // Much darker primary
          600: '#0a0f14',         // Very dark secondary
          700: '#050a0f',         // Almost black secondary
          800: '#000000',         // Pure black background
          900: '#e7eff3',         // Light text
          light: '#000000',       // Pure black background (fixes bg-soraia-light error)
          primary: '#3a75b0',     // Keeping this for the gradient end
          secondary: '#345d8a',   // Dark secondary blue
          dark: '#e7eff3',        // Light text
          accent: '#374151',      // Much darker accent blue
          neutral: '#6b7280',     // Darker neutral
          muted: '#111827',       // Very dark muted
        },
      },
      backgroundImage: {
        'gradient-landing': 'linear-gradient(to bottom, #000000 0%, #0f0f23 20%, #1e1b4b 40%, #312e81 60%, #4338ca 80%, #3a75b0 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
