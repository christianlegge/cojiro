import { SeedReturnType } from "../server/external/createSeed";
import { TRPCError } from "@trpc/server";

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
	seedValue: string;
	settingsString: string;
};

const requiredSettings = {
	shopsanity: "off",
	mq_dungeons: 0,
	triforce_hunt: false,
	world_count: 1,
	shuffle_beans: false,
	shuffle_ocarinas: false,
	shuffle_interior_entrances: "off",
	shuffle_grotto_entrances: false,
	shuffle_dungeon_entrances: false,
	shuffle_overworld_entrances: false,
};

function parseSeed(seed: SeedReturnType): ParsedSeed {
	const locations: ParsedSeed["locations"] = Object.keys(
		seed.locations
	).reduce((acc, el) => {
		const loc = seed.locations[el];
		return {
			...acc,
			[el]: {
				item: typeof loc === "string" ? loc : loc.item,
				price: typeof loc === "string" ? undefined : loc.price,
			},
		};
	}, {});
	const gossip_stones: ParsedSeed["gossip_stones"] = Object.keys(
		seed.gossip_stones
	).reduce((acc, el) => ({ ...acc, [el]: seed.gossip_stones[el].text }), {});

	let setting: keyof typeof requiredSettings;
	for (setting in requiredSettings) {
		if (seed.settings[setting] !== requiredSettings[setting]) {
			throw new TRPCError({
				code: "METHOD_NOT_SUPPORTED",
				message: `Seed must have ${setting} set to ${requiredSettings[setting]}`,
			});
		}
	}

	return {
		locations,
		gossip_stones,
		seedValue: seed[":seed"],
		settingsString: seed[":settings_string"],
	};
}

export default parseSeed;
