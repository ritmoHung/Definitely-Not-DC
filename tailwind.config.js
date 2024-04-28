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
            // https://utopia.fyi/type/calculator?c=576,14,1.25,1200,18,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12
            fontSize: {
                "200": "clamp(0.56rem, 0.4123rem + 0.4103vw, 0.72rem)",
                "300": "clamp(0.7rem, 0.5154rem + 0.5128vw, 0.9rem)",
                "400": "clamp(0.875rem, 0.6442rem + 0.641vw, 1.125rem)",
                "500": "clamp(1.0938rem, 0.8053rem + 0.8013vw, 1.4063rem)",
                "600": "clamp(1.3675rem, 1.0069rem + 1.0016vw, 1.7581rem)",
                "700": "clamp(1.7088rem, 1.2576rem + 1.2532vw, 2.1975rem)",
                "800": "clamp(2.1363rem, 1.5726rem + 1.5657vw, 2.7469rem)",
                "900": "clamp(2.67rem, 1.9656rem + 1.9567vw, 3.4331rem)",
            },
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
