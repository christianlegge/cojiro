import { TRPCError } from "@trpc/server";
import h from "../data/hints.json";

const hintsMap = new Map<string, { meanings: string[]; type: string }>();
const hints = h as { [key: string]: { names: string[]; type: string } };

Object.keys(hints).forEach((k) => {
	if (k.includes("MQ")) return;
	if (/Item \d/.test(k)) return;
	if (!["region", "location", "item"].includes(hints[k].type)) return;
	hints[k].names.forEach((name) => {
		if (!hintsMap.has(name)) {
			hintsMap.set(name, { meanings: [], type: hints[k].type });
		}
		hintsMap.set(name, {
			meanings: [
				...(hintsMap.has(name)
					? (
							hintsMap.get(name) as {
								meanings: string[];
								type: string;
							}
					  ).meanings
					: []),
				k,
			],
			type: hints[k].type,
		});
	});
});

const parseHint = (
	hint: string,
	seedLocations: string[]
):
	| { type: "woth" | "barren"; region: string }
	| { type: "path"; region: string; location: string }
	| { type: "item"; item: string; location: string }
	| { type: "junk" } => {
	// let oneMatch = /#([^#]+)#/.exec(hint);
	// let firstKeyword = oneMatch && oneMatch[1];
	// let twoMatch = /#([^#]+)#.*#([^#]+)#/.exec(hint);
	// let secondKeyword = twoMatch && twoMatch[2];

	const mapArray: [string, { meanings: string[]; type: string }][] = [];
	hintsMap.forEach((v, k) => {
		mapArray.push([k, v]);
	});
	const matches = mapArray.filter(([k, v]) => hint.includes(k));

	const locations = matches.filter(([k, v]) => v.type === "location");
	const location =
		(locations.length > 0 &&
			locations[0][1].meanings.filter((el) =>
				seedLocations.includes(el)
			)[0]) ||
		undefined;

	const items = matches.filter(([k, v]) => v.type === "item");
	const item = (items.length > 0 && items[0][1].meanings[0]) || undefined;

	const regions = matches.filter(([k, v]) => v.type === "region");
	const region =
		(regions.length > 0 && regions[0][1].meanings[0]) || undefined;

	if (
		matches.length === 0 ||
		matches.filter(([k, v]) => v.type === "junk").length > 0
	) {
		return { type: "junk" };
	} else if (location && item) {
		return { type: "item", location: location, item: item };
	} else if (region) {
		if (hint.toLowerCase().includes("way of the hero")) {
			return { type: "woth", region: region };
		} else if (hint.toLowerCase().includes("foolish choice")) {
			return { type: "barren", region: region };
		} else if (hint.toLowerCase().includes("on the path to") && location) {
			return { type: "path", region: region, location: location };
		}
	}
	throw new TRPCError({
		code: "INTERNAL_SERVER_ERROR",
		message: `Error parsing hint: ${hint}`,
	});
};

export default parseHint;
