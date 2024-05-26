/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      25: "25px",
      50: "50px",
      full: "50%",
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
      "background-light": "#E5D1B8", // Light background
      "background-dark": "#2B2129", // Dark background
      "primary-light": "#DE8E59", // Light primary
      "primary-dark": "#C2956E", // Dark primary
      "text-light": "#000000", // Light text color
      "text-dark": "#FFFFFF", // Dark text color
      "secondary-dark": "#2B2129", // Dark mode secondary
    },
    extend: {},
  },
  plugins: [],
};
