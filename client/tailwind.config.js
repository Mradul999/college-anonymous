/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F5F5F5",
          dark: "#181616",
        },
        cardBg: {
          DEFAULT: "#F9F9F9",
          dark: "#272727",
        },
        textColor: {
          DEFAULT: "#4A4A4A",
        },
      },
    },
  },
  plugins: [],
};
