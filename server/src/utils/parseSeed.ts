import { SeedReturnType } from "../services/createSeed";

export type ParsedSeed = {
	locations: {
		[key: string]: {
			item: string;
			price?: number;
		};
	};
	gossip_stones: {
		[key: string]: string;
	};
};

function parseSeed(seed: SeedReturnType): ParsedSeed {
	let locations: ParsedSeed["locations"] = Object.keys(seed.locations).reduce(
		(acc, el) => {
			let loc = seed.locations[el];
			return {
				...acc,
				[el]: {
					item: typeof loc === "string" ? loc : loc.item,
					price: typeof loc === "string" ? undefined : loc.price,
				},
			};
		},
		{}
	);
	let gossip_stones: ParsedSeed["gossip_stones"] = Object.keys(
		seed.gossip_stones
	).reduce((acc, el) => ({ ...acc, [el]: seed.gossip_stones[el].text }), {});

	return {
		locations,
		gossip_stones,
	};
}

export default parseSeed;
