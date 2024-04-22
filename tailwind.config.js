/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      25: "25px",
    },
    fontFamily: {
      text: ["Roboto Flex", "sans-serif"],
      heading: ["Archivo Black", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "#E5D1B8", //off-white
      black: "#000",
      white: "#fff",
      primary: "#DE8E59", // Very dark gray
      secondary: "#2B2129", // Orange
      accent: "#708A81", // Teal
      accentTwo: "#C2956E", //Tan
    },
    extend: {},
  },
  plugins: [],
};
