/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				twitchpurple: "rgb(130, 5, 180)",
				discordblurple: "#5865F2",
			},
		},
	},
	plugins: [],
};
