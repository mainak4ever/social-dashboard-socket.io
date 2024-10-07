/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: 'rgb(227,160,38)',
        dark1: 'rgb(15,15,15)',
        dark2: 'rgb(30,30,30)',
        light:'rgba(255,255,255,0.49)'
      },
    },
  },
  plugins: [],
};
