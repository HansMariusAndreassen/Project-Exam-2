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
      background: "#FDF2DC",
      black: "#000",
      white: "#fff",
      orange: "#AD4000",
      yellow: "#F2AF5C",
      brown: "#8C4F2B",
      teal: "#8697A6",
    },
    extend: {},
  },
  plugins: [],
};
