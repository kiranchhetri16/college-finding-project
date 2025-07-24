// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans the right files
  theme: {
    extend: {
      colors: {
        primary: "#0052cc",
        secondary: "#091e42",
        fontColor: "#091e42",
      },
    },
  },
  plugins: [],
};