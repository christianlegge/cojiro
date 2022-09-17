import hints from "../data/hints.json";

const hintsMap = new Map();

let hintsObj = hints as { [key: string]: string[] };

Object.keys(hintsObj).forEach((k) => {
	hintsObj[k].forEach((h) => {
		hintsMap.set(h, k);
	});
});

const parseHint = (
	hint: string
):
	| { type: "woth" | "barren"; region: string }
	| { type: "item"; item: string; location: string }
	| { type: "junk" } => {
	// let keywords = /#([^#])+#.*#([^#])+#/.exec(hint);
	// if (!keywords) {
	// 	return { type: "junk" };
	// }
	// if (hint.toLowerCase().includes("way of the hero")) {
	// 	return { type: "woth", region: keywords[1] };
	// }
	// if (hint.toLowerCase().includes("foolish choice")) {
	// 	return { type: "barren", region: keywords[1] };
	// }
	// return { type: "junk" };
	let rand = Math.floor(Math.random() * 4);
	switch (rand) {
		case 0:
			return { type: "junk" };
		case 1:
			return { type: "woth", region: "Sacred Forest Meadow" };
		case 2:
			return { type: "barren", region: "Fire Temple" };
		case 3:
		default:
			return {
				type: "item",
				item: "Mirror Shield",
				location: "Kak Man on Roof",
			};
	}
};

export default parseHint;
