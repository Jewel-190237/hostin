/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./app/**/*.js", 'components/**/*.js'],
  theme: {
      extend: {
          fontFamily: {
            roboto: ["Roboto"],
            montserrat: ["Montserrat"],
          },
          screens: {
            'xs': '500px',
            'xsm': '375px',
          },
          boxShadow: {
              'custom-light': ' 0px 4px 25px -1px rgba(0, 0, 0, 0.20)',
            },
            colors: {
              primary: "#EF8121",
              textMain: "#1C486F",
              textBody: "#2C2C2C",
              tertialText: "#A2A8AF",
          }
      },
  },
  plugins: [],
};