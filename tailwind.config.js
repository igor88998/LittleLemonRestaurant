/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#495E57',
				secondary: '#D9D9D9',
				yellow: '#F4CE14',
				orange: '#FF8A00',
				gray: '#747474',
				'light-gray': '#EFEFEF',
				'dark-gray': '#565656',
			}
		},
	},
	plugins: [],
};
