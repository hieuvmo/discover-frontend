/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        "sm-max": { max: "576px" },
        md: "768px",
        "md-max": { max: "768px" },
        lg: "992px",
        "lg-max": { max: "992px" },
        xl: "1200px",
        "xl-max": { max: "1200px" },
        "2xl": "1320px",
        "2xl-max": { max: "1320px" }
      },
      colors: {
        primary: "#7F56D9",
        error: "#ff4d4f"
      },
      boxShadow: {
        select:
          "0px 0.6px 1.8px rgba(0, 0, 0, 0.19), 0px 3.2px 7.2px rgba(0, 0, 0, 0.27)"
      }
    }
  },
  plugins: []
};
