/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,mjs}","./index.html","./tester.html", "./listings/index.html", "./listings/testytest.html", "./login/.html", "./listing/index.html","./profile/index.html" ],
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
        "custom-white": `#E5E3DC`,
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3.125rem",
      },
      spacing: {
        "custom-295": "18.438rem",
        "custom-395": "24.688rem",
        "custom-249": "15.563rem",
        "custom-215": "13.438rem",
        "custom-500": "31.25rem"
      },
      flex: {
        "2": "1 1 25%",
      }
    },
  },
  plugins: [],
}

