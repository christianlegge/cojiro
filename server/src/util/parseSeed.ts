import { SeedReturnType } from "../services/createSeed";
import { ISeed } from "../models/Seed";

function parseSeed(seed: SeedReturnType): ISeed {
	let locationMap = new Map<string, { item: string; price?: number }>();

	Object.keys(seed.locations).forEach((location) => {
		let entry: { item: string; price?: number };
		if (typeof seed.locations[location] === "string") {
			entry = { item: seed.locations[location] as string };
		} else {
			entry = {
				...(seed.locations[location] as {
					item: string;
					price: number;
				}),
			};
		}
		locationMap.set(location, entry);
	});
	let stonesMap = new Map<string, string>();
	Object.keys(seed.gossip_stones).forEach((stone) => {
		stonesMap.set(stone, seed.gossip_stones[stone].text);
	});
	return {
		locations: new Map(locationMap),
		gossip_stones: new Map(stonesMap),
	};
}

export default parseSeed;
