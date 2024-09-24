/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,mjs}","./index.html","./tester.html", "./listings/index.html"],
  theme: {
    extend: {
      fontFamily: {
        marcellus: [`Marcellus`, `serif`],
        "pt-serif": [`PT Serif`, `serif`],
      },
      colors: {
        "custom-green": `#354242`,
        "custom-light-green": `#495A58`,
        "custom-orange": `#E17042`,
      },
      borderRadius: {
        "4xl": "2rem",
      }
    },
  },
  plugins: [],
}

