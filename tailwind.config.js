/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      25: "25px",
      50: "50px",
    },
    fontFamily: {
      text: ["Roboto Flex", "sans-serif"],
      heading: ["Archivo Black", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "#2B2129", //off-white
      black: "#000",
      white: "#fff",
      primary: "#DE8E59", // Very dark gray
      secondary: "#E5D1B8", // Orange
      accent: "#708A81", // Teal
      accentTwo: "#C2956E", //Tan
    },
    extend: {},
  },
  plugins: [],
};
