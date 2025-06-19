/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			wjo: '#007244',
			'wjo-dark': '#022517',
			'wjo-dim': '#5D736A',
		},
		fontFamily: {
			knile: ['Knile', ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('radix-active', '&[data-state="active"]');
			addVariant('radix-inactive', '&[data-state="inactive"]');
		}),
	],
};