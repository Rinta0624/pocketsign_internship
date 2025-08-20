/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,vue,svelte}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
],
theme: {
    extend: {},
},
plugins: [],
}