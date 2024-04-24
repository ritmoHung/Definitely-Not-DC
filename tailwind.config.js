/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

const gridAreaAuto = {
	gridArea: "auto",
};
const gridAreaStack = {
	gridArea: "stack",
};

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
        screens: {
			xs: "420px",
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1200px",
			"2xl": "1400px",
		},
		extend: {
            screens: {
                // Logic opposite to widths
                petite: { raw: "(max-height: 576px)" },
				compact: { raw: "(max-height: 768px)" },
			},
			scale: {
				125: "1.25",
				175: "1.75",
				200: "2",
				300: "3",
			},
			spacing: {
				"ch": "1ch",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "13.333%",
				"5/6": "86.667%",
				"1/8": "12.5%",
				"3/8": "37.5%",
				"5/8": "62.5%",
				"7/8": "87.5%",
			},
			transitionTimingFunction: {
				"in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
				"out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
			},
			zIndex: {
				1: "1",
				2: "2",
			},
		},
	},
	plugins: [
		plugin(function({ addComponents }) {
			const components = {
				".grid-stack-none": {
					gridTemplateAreas: "none",
					"& > *": { ...gridAreaAuto },
				},
				".grid-stack": {
					gridTemplateAreas: '"stack"',
					"& > *": { ...gridAreaStack },
				},
				".grid-area-auto": { ...gridAreaAuto },
				".grid-area-stack": { ...gridAreaStack },
			}
			addComponents(components);
		}),
	],
};
