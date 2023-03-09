/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-500": "#2b3945",
        "dark-600": "#202c37",
        "black-200": "rgba(0,0,0,.2)",
        light: "#fafafa",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fill, minmax(250px, 1fr))",
      },
      boxShadow: {
        thin: "0 0 20px 0 rgba(0,0,0,.2)",
        thiner: "0 0 10px 0 rgba(0,0,0,.2)",
      },
    },
  },
  plugins: [],
};
