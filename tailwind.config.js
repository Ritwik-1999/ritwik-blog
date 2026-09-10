/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        white: "rgb(var(--contrast) / <alpha-value>)",

        crimson: "rgb(var(--accent) / <alpha-value>)",
        crimsonBright: "#FF2D55",
        crimsonDeep: "#7A0019",

        softWhite: "rgb(var(--foreground) / <alpha-value>)",
        mutedWhite: "rgb(var(--muted) / <alpha-value>)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        crimsonGlow: "0 0 40px rgba(193, 18, 31, 0.25)",
      },
    },
  },

  plugins: [],
}
