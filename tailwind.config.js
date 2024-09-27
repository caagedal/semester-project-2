/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,mjs}","./index.html","./tester.html", "./listings/index.html", "./login/.html" ],
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
        "custom-362": "22.625rem",
        "custom-249": "15.563rem",
      },
      flex: {
        "2": "1 1 25%",
      }
    },
  },
  plugins: [],
}

