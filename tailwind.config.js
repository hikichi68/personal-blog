/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // 👈 これでTSXファイルもスキャン
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};