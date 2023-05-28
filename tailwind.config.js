/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkGrey: "#121212",
        midGrey: "#212121",
        lightGrey: "#424242",
        lowGrey: "#616161",
        grey: "#757575",
        textGrey: "#EEEEEE",
        darkBlue: "#1c2431",
        lightBlue: "#03a9f4",
        testColor: "#018786",
        hoverColor: "#03DAC6",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
