import axios, { AxiosError } from "axios";
import { env } from "../../env/server.mjs";
import { TRPCError } from "@trpc/server";

const createSeed = async (params: {
	seed?: string;
	settingsString: string;
}): Promise<SeedReturnType> => {
	try {
		const response = await axios.get(
			"https://www.ootrandomizer.com/api/seed/create",
			{
				params: {
					key: env.OOTRANDOMIZER_API_KEY,
					version: "7.1",
					...params,
				},
			}
		);

		return response.data as SeedReturnType;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err) && typeof err.response?.data === "string") {
			if (
				err.response.data.includes("must have at least one output type")
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message:
						"You must enable the Create Spoiler Log setting to make this work.",
				});
			} else if (
				err.response.data.includes("generate a seed once every")
			) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message:
						"Rate limited by the ootrandomizer.com API. Try again in 5 seconds.",
				});
			} else if (
				err.response.data.includes(
					"get_settings_from_command_line_args"
				)
			) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message:
						"Invalid settings string. Check with ootrandomizer.com and try again.",
				});
			}
		}
		throw err;
	}
};

export type SeedReturnType = {
	":version": string;
	file_hash: string[];
	":seed": string;
	":settings_string": string;
	":enable_distribution_file": boolean;
	settings: {
		world_count: number;
		create_spoiler: boolean;
		randomize_settings: boolean;
		open_forest: string;
		open_kakariko: string;
		open_door_of_time: boolean;
		zora_fountain: string;
		gerudo_fortress: string;
		bridge: string;
		bridge_medallions: number;
		triforce_hunt: boolean;
		logic_rules: string;
		reachable_locations: string;
		bombchus_in_logic: boolean;
		one_item_per_dungeon: boolean;
		trials_random: boolean;
		trials: number;
		skip_child_zelda: boolean;
		no_escape_sequence: boolean;
		no_guard_stealth: boolean;
		no_epona_race: boolean;
		skip_some_minigame_phases: boolean;
		useful_cutscenes: boolean;
		complete_mask_quest: boolean;
		fast_chests: boolean;
		logic_no_night_tokens_without_suns_song: boolean;
		free_scarecrow: boolean;
		fast_bunny_hood: boolean;
		start_with_rupees: boolean;
		start_with_consumables: boolean;
		starting_hearts: number;
		chicken_count_random: boolean;
		chicken_count: number;
		big_poe_count_random: boolean;
		big_poe_count: number;
		shuffle_kokiri_sword: boolean;
		shuffle_ocarinas: boolean;
		shuffle_gerudo_card: boolean;
		shuffle_song_items: string;
		shuffle_cows: boolean;
		shuffle_beans: boolean;
		shuffle_medigoron_carpet_salesman: boolean;
		shuffle_interior_entrances: string;
		shuffle_grotto_entrances: boolean;
		shuffle_dungeon_entrances: string;
		shuffle_overworld_entrances: boolean;
		owl_drops: boolean;
		warp_songs: boolean;
		spawn_positions: boolean;
		shuffle_scrubs: string;
		shopsanity: string;
		tokensanity: string;
		shuffle_mapcompass: string;
		shuffle_smallkeys: string;
		shuffle_hideoutkeys: string;
		shuffle_bosskeys: string;
		shuffle_ganon_bosskey: string;
		lacs_condition: string;
		enhance_map_compass: boolean;
		mq_dungeons_random: boolean;
		mq_dungeons_mode: string;
		disabled_locations: string[];
		allowed_tricks: string[];
		logic_earliest_adult_trade: string;
		logic_latest_adult_trade: string;
		starting_equipment: string[];
		starting_items: {
			[key: string]: number;
		};
		starting_songs: string[];
		ocarina_songs: boolean;
		correct_chest_sizes: boolean;
		clearer_hints: boolean;
		no_collectible_hearts: boolean;
		hints: string;
		hint_dist: string;
		item_hints: string[];
		hint_dist_user: unknown;
		text_shuffle: string;
		misc_hints: boolean;
		ice_trap_appearance: string;
		junk_ice_traps: string;
		item_pool_value: string;
		damage_multiplier: string;
		starting_tod: string;
		starting_age: string;
	};
	randomized_settings: { starting_age: "child" | "adult" };
	item_pool: {
		[key: string]: number;
	};
	dungeons: {
		[key: string]: "vanilla" | "mq";
	};
	trials: {
		Forest: "active" | "inactive";
		Fire: "active" | "inactive";
		Water: "active" | "inactive";
		Spirit: "active" | "inactive";
		Shadow: "active" | "inactive";
		Light: "active" | "inactive";
	};
	songs: unknown;
	entrances: {
		"Adult Spawn -> Temple of Time": "Market Shooting Gallery";
		"Child Spawn -> KF Links House": {
			region: "Market";
			from: "Market Bombchu Bowling";
		};
	};
	locations: {
		[key: string]: string | { item: string; price: number };
	};
	":woth_locations": {
		[key: string]: string;
	};
	":goal_locations": {
		rainbow_bridge: {
			"Path to Volvagia": {
				"Kak Man on Roof": "Progressive Strength Upgrade";
				"Song from Malon": "Zeldas Lullaby";
				"Song from Royal Familys Tomb": "Sarias Song";
				"Sheik in Crater": "Suns Song";
				"LW Skull Kid": "Progressive Scale";
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet";
				"Dodongos Cavern Map Chest": "Megaton Hammer";
				"LH Freestanding PoH": "Progressive Hookshot";
				"Forest Temple First Room Chest": "Hover Boots";
			};
			"Path to Phantom Ganon": {
				"Kak Man on Roof": "Progressive Strength Upgrade";
				"Song from Malon": "Zeldas Lullaby";
				"Song from Royal Familys Tomb": "Sarias Song";
				"LW Skull Kid": "Progressive Scale";
				"Dodongos Cavern Map Chest": "Megaton Hammer";
				"LH Freestanding PoH": "Progressive Hookshot";
			};
			"Path to Queen Gohma": {
				"Kak Man on Roof": "Progressive Strength Upgrade";
				"Song from Malon": "Zeldas Lullaby";
				"Sheik at Temple": "Nocturne of Shadow";
				"Song from Royal Familys Tomb": "Sarias Song";
				"Sheik in Crater": "Suns Song";
				"LW Skull Kid": "Progressive Scale";
				"Sheik in Forest": "Requiem of Spirit";
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet";
				"Dodongos Cavern Map Chest": "Megaton Hammer";
				"GC Maze Left Chest": "Magic Meter";
				"LH Freestanding PoH": "Progressive Hookshot";
				"Fire Temple Boulder Maze Side Room Chest": "Dins Fire";
				"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade";
				"Shadow Temple Map Chest": "Progressive Wallet";
				"Kak 50 Gold Skulltula Reward": "Iron Boots";
				"Spirit Temple Map Chest": "Progressive Strength Upgrade";
				"OGC Great Fairy Reward": "Mirror Shield";
				"Water Temple Central Pillar Chest": "Bomb Bag";
				"Spirit Temple Near Four Armos Chest": "Kokiri Sword";
			};
			"Path to Bongo Bongo": {
				"Kak Man on Roof": "Progressive Strength Upgrade";
				"Song from Malon": "Zeldas Lullaby";
				"Sheik at Temple": "Nocturne of Shadow";
				"Song from Royal Familys Tomb": "Sarias Song";
				"Sheik in Crater": "Suns Song";
				"LW Skull Kid": "Progressive Scale";
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet";
				"Dodongos Cavern Map Chest": "Megaton Hammer";
				"GC Maze Left Chest": "Magic Meter";
				"LH Freestanding PoH": "Progressive Hookshot";
				"Fire Temple Boulder Maze Side Room Chest": "Dins Fire";
				"Forest Temple First Room Chest": "Hover Boots";
				"Shadow Temple Map Chest": "Progressive Wallet";
				"Kak 50 Gold Skulltula Reward": "Iron Boots";
				"Water Temple Central Pillar Chest": "Bomb Bag";
			};
			"Path to Twinrova": {
				"Kak Man on Roof": "Progressive Strength Upgrade";
				"Song from Malon": "Zeldas Lullaby";
				"Sheik at Temple": "Nocturne of Shadow";
				"Song from Royal Familys Tomb": "Sarias Song";
				"Sheik in Crater": "Suns Song";
				"LW Skull Kid": "Progressive Scale";
				"Sheik in Forest": "Requiem of Spirit";
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet";
				"Dodongos Cavern Map Chest": "Megaton Hammer";
				"GC Maze Left Chest": "Magic Meter";
				"LH Freestanding PoH": "Progressive Hookshot";
				"Fire Temple Boulder Maze Side Room Chest": "Dins Fire";
				"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade";
				"Shadow Temple Map Chest": "Progressive Wallet";
				"Kak 50 Gold Skulltula Reward": "Iron Boots";
				"Spirit Temple Map Chest": "Progressive Strength Upgrade";
				"OGC Great Fairy Reward": "Mirror Shield";
				"Water Temple Central Pillar Chest": "Bomb Bag";
			};
		};
	};
	":barren_regions": string[];
	gossip_stones: {
		[key: string]: { text: string; colors: string[] };
	};
	":playthrough": {
		[key: string]: {
			[key: string]: string;
		};
	};
	":entrance_playthrough": {
		"1": {
			"Child Spawn -> KF Links House": {
				region: "Market";
				from: "Market Bombchu Bowling";
			};
		};
		"2": { "Adult Spawn -> Temple of Time": "Market Shooting Gallery" };
	};
};

export default createSeed;
