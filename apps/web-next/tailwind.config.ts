import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#CD6648"
        },
        grayx: {
          700: "#495057"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
