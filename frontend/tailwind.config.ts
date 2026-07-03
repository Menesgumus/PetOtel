import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#061F45',
          white: '#FFFFFF',
          soft: '#F7F4EF',
          gold: '#C9A76A',
          text: '#172033',
          border: '#E7E2DA'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
