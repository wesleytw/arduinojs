/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    themes: [
      {
        mytheme: {
          "primary": "#3282F6",
          "secondary": "#E3D5FA",
          "accent": "#3ce499",
          "neutral": "#808694",
          "base-100": "#EAE5EB",
          "info": "#2F125C",
          "success": "#15935A",
          "warning": "#F0AB0A",
          "error": "#fdd7e4",
        },
      }
    ]
  }
}
