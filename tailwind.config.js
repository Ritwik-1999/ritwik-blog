/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0B0B0B",

        crimson: "#C1121F",
        crimsonBright: "#FF2D55",
        crimsonDeep: "#7A0019",

        softWhite: "#F5F5F5",
        mutedWhite: "#B8B8B8",
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