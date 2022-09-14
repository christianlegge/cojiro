import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();

const createSeed = async (params: {
	seed?: string;
	settingsString: string;
}): Promise<SeedReturnType> => {
	try {
		let response = await axios.get(
			"https://www.ootrandomizer.com/api/seed/create",
			{
				params: {
					key: process.env.OOTRANDOMIZER_API_KEY,
					...params,
				},
			}
		);

		return response.data as SeedReturnType;
	} catch (err) {
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
		shuffle_dungeon_entrances: boolean;
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
		mq_dungeons: number;
		disabled_locations: string[];
		allowed_tricks: string[];
		logic_earliest_adult_trade: string;
		logic_latest_adult_trade: string;
		starting_equipment: string[];
		starting_items: string[];
		starting_songs: string[];
		ocarina_songs: boolean;
		correct_chest_sizes: boolean;
		clearer_hints: boolean;
		no_collectible_hearts: boolean;
		hints: string;
		hint_dist: string;
		item_hints: string[];
		hint_dist_user: {};
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
	starting_items: {
		[key: string]: number;
	};
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
	songs: {};
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

export const sampleSeed: SeedReturnType = {
	":version": "6.2.0 Release",
	file_hash: ["Frog", "Slingshot", "Hover Boots", "Map", "SOLD OUT"],
	":seed": "OODJ06KV3E",
	":settings_string":
		"AJTWXFCSKAA8KLAHJAASAECCEFCAUCBAAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAYMASBFAB",
	":enable_distribution_file": false,
	settings: {
		world_count: 1,
		create_spoiler: true,
		randomize_settings: false,
		open_forest: "closed_deku",
		open_kakariko: "open",
		open_door_of_time: true,
		zora_fountain: "closed",
		gerudo_fortress: "fast",
		bridge: "medallions",
		bridge_medallions: 6,
		triforce_hunt: false,
		logic_rules: "glitchless",
		reachable_locations: "all",
		bombchus_in_logic: false,
		one_item_per_dungeon: false,
		trials_random: false,
		trials: 0,
		skip_child_zelda: true,
		no_escape_sequence: true,
		no_guard_stealth: true,
		no_epona_race: true,
		skip_some_minigame_phases: true,
		useful_cutscenes: false,
		complete_mask_quest: false,
		fast_chests: true,
		logic_no_night_tokens_without_suns_song: false,
		free_scarecrow: false,
		fast_bunny_hood: true,
		start_with_rupees: false,
		start_with_consumables: true,
		starting_hearts: 3,
		chicken_count_random: false,
		chicken_count: 7,
		big_poe_count_random: false,
		big_poe_count: 1,
		shuffle_kokiri_sword: true,
		shuffle_ocarinas: false,
		shuffle_gerudo_card: false,
		shuffle_song_items: "song",
		shuffle_cows: false,
		shuffle_beans: false,
		shuffle_medigoron_carpet_salesman: false,
		shuffle_interior_entrances: "off",
		shuffle_grotto_entrances: false,
		shuffle_dungeon_entrances: false,
		shuffle_overworld_entrances: false,
		owl_drops: false,
		warp_songs: false,
		spawn_positions: true,
		shuffle_scrubs: "off",
		shopsanity: "off",
		tokensanity: "off",
		shuffle_mapcompass: "startwith",
		shuffle_smallkeys: "dungeon",
		shuffle_hideoutkeys: "vanilla",
		shuffle_bosskeys: "dungeon",
		shuffle_ganon_bosskey: "remove",
		lacs_condition: "vanilla",
		enhance_map_compass: false,
		mq_dungeons_random: false,
		mq_dungeons: 0,
		disabled_locations: ["Deku Theater Mask of Truth"],
		allowed_tricks: [
			"logic_fewer_tunic_requirements",
			"logic_grottos_without_agony",
			"logic_child_deadhand",
			"logic_man_on_roof",
			"logic_dc_jump",
			"logic_rusted_switches",
			"logic_windmill_poh",
			"logic_crater_bean_poh_with_hovers",
			"logic_forest_vines",
			"logic_lens_botw",
			"logic_lens_castle",
			"logic_lens_gtg",
			"logic_lens_shadow",
			"logic_lens_shadow_back",
			"logic_lens_spirit",
		],
		logic_earliest_adult_trade: "prescription",
		logic_latest_adult_trade: "claim_check",
		starting_equipment: ["deku_shield"],
		starting_items: ["ocarina"],
		starting_songs: [] as string[],
		ocarina_songs: false,
		correct_chest_sizes: true,
		clearer_hints: true,
		no_collectible_hearts: false,
		hints: "always",
		hint_dist: "tournament",
		item_hints: [] as string[],
		hint_dist_user: {},
		text_shuffle: "none",
		misc_hints: true,
		ice_trap_appearance: "junk_only",
		junk_ice_traps: "off",
		item_pool_value: "balanced",
		damage_multiplier: "normal",
		starting_tod: "default",
		starting_age: "random",
	},
	randomized_settings: { starting_age: "child" },
	starting_items: {
		"Deku Nuts": 99,
		"Deku Shield": 1,
		"Deku Sticks": 99,
		Ocarina: 1,
	},
	item_pool: {
		"Arrows (10)": 7,
		"Arrows (30)": 6,
		"Arrows (5)": 4,
		"Biggoron Sword": 1,
		"Bolero of Fire": 1,
		"Bomb Bag": 3,
		"Bombchus (10)": 3,
		"Bombchus (20)": 1,
		"Bombchus (5)": 1,
		"Bombs (10)": 4,
		"Bombs (20)": 2,
		"Bombs (5)": 8,
		Boomerang: 1,
		"Bottle with Bugs": 2,
		"Bottle with Poe": 1,
		Bow: 3,
		"Deku Nut Capacity": 2,
		"Deku Nuts (10)": 1,
		"Deku Nuts (5)": 6,
		"Deku Seeds (30)": 1,
		"Deku Shield": 3,
		"Deku Stick (1)": 1,
		"Deku Stick Capacity": 2,
		"Dins Fire": 1,
		"Double Defense": 1,
		"Eponas Song": 1,
		"Farores Wind": 1,
		"Fire Arrows": 1,
		"Goron Tunic": 1,
		"Heart Container": 8,
		"Hover Boots": 1,
		"Hylian Shield": 2,
		"Ice Arrows": 1,
		"Iron Boots": 1,
		"Kokiri Sword": 1,
		"Lens of Truth": 1,
		"Light Arrows": 1,
		"Magic Meter": 2,
		"Megaton Hammer": 1,
		"Minuet of Forest": 1,
		"Mirror Shield": 1,
		"Nayrus Love": 1,
		"Nocturne of Shadow": 1,
		"Piece of Heart (Treasure Chest Game)": 1,
		"Piece of Heart": 35,
		"Prelude of Light": 1,
		Prescription: 1,
		"Progressive Hookshot": 2,
		"Progressive Scale": 2,
		"Progressive Strength Upgrade": 3,
		"Progressive Wallet": 2,
		"Recovery Heart": 11,
		"Requiem of Spirit": 1,
		"Rupee (1)": 1,
		"Rupees (20)": 7,
		"Rupees (200)": 6,
		"Rupees (5)": 23,
		"Rupees (50)": 8,
		"Rutos Letter": 1,
		"Sarias Song": 1,
		"Serenade of Water": 1,
		Slingshot: 3,
		"Song of Storms": 1,
		"Song of Time": 1,
		"Stone of Agony": 1,
		"Suns Song": 1,
		"Zeldas Lullaby": 1,
		"Zora Tunic": 1,
	},
	dungeons: {
		"Deku Tree": "vanilla",
		"Dodongos Cavern": "vanilla",
		"Jabu Jabus Belly": "vanilla",
		"Bottom of the Well": "vanilla",
		"Ice Cavern": "vanilla",
		"Gerudo Training Ground": "vanilla",
		"Forest Temple": "vanilla",
		"Fire Temple": "vanilla",
		"Water Temple": "vanilla",
		"Spirit Temple": "vanilla",
		"Shadow Temple": "vanilla",
		"Ganons Castle": "vanilla",
	},
	trials: {
		Forest: "inactive",
		Fire: "inactive",
		Water: "inactive",
		Spirit: "inactive",
		Shadow: "inactive",
		Light: "inactive",
	},
	songs: {},
	entrances: {
		"Adult Spawn -> Temple of Time": "Market Shooting Gallery",
		"Child Spawn -> KF Links House": {
			region: "Market",
			from: "Market Bombchu Bowling",
		},
	},
	locations: {
		"Links Pocket": "Forest Medallion",
		"Queen Gohma": "Shadow Medallion",
		"King Dodongo": "Goron Ruby",
		Barinade: "Zora Sapphire",
		"Phantom Ganon": "Water Medallion",
		Volvagia: "Fire Medallion",
		Morpha: "Kokiri Emerald",
		"Bongo Bongo": "Spirit Medallion",
		Twinrova: "Light Medallion",
		"Song from Impa": "Bolero of Fire",
		"Song from Malon": "Zeldas Lullaby",
		"Song from Saria": "Prelude of Light",
		"Song from Royal Familys Tomb": "Sarias Song",
		"Song from Ocarina of Time": "Eponas Song",
		"Song from Windmill": "Song of Time",
		"Sheik in Forest": "Requiem of Spirit",
		"Sheik in Crater": "Suns Song",
		"Sheik in Ice Cavern": "Minuet of Forest",
		"Sheik at Colossus": "Song of Storms",
		"Sheik in Kakariko": "Serenade of Water",
		"Sheik at Temple": "Nocturne of Shadow",
		"KF Midos Top Left Chest": "Arrows (10)",
		"KF Midos Top Right Chest": "Light Arrows",
		"KF Midos Bottom Left Chest": "Recovery Heart",
		"KF Midos Bottom Right Chest": "Piece of Heart",
		"KF Kokiri Sword Chest": "Bombs (10)",
		"KF Storms Grotto Chest": "Deku Shield",
		"LW Ocarina Memory Game": "Piece of Heart",
		"LW Target in Woods": "Arrows (10)",
		"LW Near Shortcuts Grotto Chest": "Rupees (20)",
		"Deku Theater Skull Mask": "Arrows (30)",
		"Deku Theater Mask of Truth": "Bombs (5)",
		"LW Skull Kid": "Progressive Scale",
		"LW Deku Scrub Near Bridge": { item: "Bombs (20)", price: 40 },
		"LW Deku Scrub Grotto Front": { item: "Rupees (5)", price: 40 },
		"SFM Wolfos Grotto Chest": "Rupees (200)",
		"HF Near Market Grotto Chest": "Heart Container",
		"HF Tektite Grotto Freestanding PoH": "Bombs (5)",
		"HF Southeast Grotto Chest": "Piece of Heart",
		"HF Open Grotto Chest": "Heart Container",
		"HF Deku Scrub Grotto": { item: "Arrows (30)", price: 10 },
		"Market Shooting Gallery Reward": "Rupees (5)",
		"Market Bombchu Bowling First Prize": "Rupees (5)",
		"Market Bombchu Bowling Second Prize": "Rupees (200)",
		"Market Lost Dog": "Rupees (50)",
		"Market Treasure Chest Game Reward": "Piece of Heart",
		"Market 10 Big Poes": "Piece of Heart",
		"ToT Light Arrows Cutscene": "Arrows (30)",
		"HC Great Fairy Reward": "Fire Arrows",
		"LLR Talons Chickens": "Bottle with Bugs",
		"LLR Freestanding PoH": "Rupees (5)",
		"Kak Anju as Child": "Deku Nuts (5)",
		"Kak Anju as Adult": "Deku Stick Capacity",
		"Kak Impas House Freestanding PoH": "Hylian Shield",
		"Kak Windmill Freestanding PoH": "Piece of Heart",
		"Kak Man on Roof": "Progressive Strength Upgrade",
		"Kak Open Grotto Chest": "Rupees (200)",
		"Kak Redead Grotto Chest": "Piece of Heart",
		"Kak Shooting Gallery Reward": "Rupees (200)",
		"Kak 10 Gold Skulltula Reward": "Piece of Heart",
		"Kak 20 Gold Skulltula Reward": "Stone of Agony",
		"Kak 30 Gold Skulltula Reward": "Arrows (30)",
		"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade",
		"Kak 50 Gold Skulltula Reward": "Iron Boots",
		"Graveyard Shield Grave Chest": "Rupees (20)",
		"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
		"Graveyard Royal Familys Tomb Chest": "Rutos Letter",
		"Graveyard Freestanding PoH": "Piece of Heart",
		"Graveyard Dampe Gravedigging Tour": "Bombs (5)",
		"Graveyard Hookshot Chest": "Arrows (10)",
		"Graveyard Dampe Race Freestanding PoH": "Rupees (5)",
		"DMT Freestanding PoH": "Deku Stick (1)",
		"DMT Chest": "Slingshot",
		"DMT Storms Grotto Chest": "Rupees (5)",
		"DMT Great Fairy Reward": "Recovery Heart",
		"DMT Biggoron": "Piece of Heart",
		"GC Darunias Joy": "Deku Nuts (5)",
		"GC Pot Freestanding PoH": "Biggoron Sword",
		"GC Rolling Goron as Child": "Bomb Bag",
		"GC Rolling Goron as Adult": "Rupees (5)",
		"GC Maze Left Chest": "Magic Meter",
		"GC Maze Right Chest": "Piece of Heart",
		"GC Maze Center Chest": "Arrows (30)",
		"DMC Volcano Freestanding PoH": "Rupees (5)",
		"DMC Wall Freestanding PoH": "Piece of Heart",
		"DMC Upper Grotto Chest": "Bow",
		"DMC Great Fairy Reward": "Deku Nuts (5)",
		"ZR Open Grotto Chest": "Slingshot",
		"ZR Frogs in the Rain": "Rupees (50)",
		"ZR Frogs Ocarina Game": "Piece of Heart",
		"ZR Near Open Grotto Freestanding PoH": "Deku Nut Capacity",
		"ZR Near Domain Freestanding PoH": "Piece of Heart",
		"ZD Diving Minigame": "Arrows (5)",
		"ZD Chest": "Rupees (50)",
		"ZD King Zora Thawed": "Heart Container",
		"ZF Great Fairy Reward": "Arrows (5)",
		"ZF Iceberg Freestanding PoH": "Recovery Heart",
		"ZF Bottom Freestanding PoH": "Heart Container",
		"LH Underwater Item": "Rupees (5)",
		"LH Child Fishing": "Deku Nuts (5)",
		"LH Adult Fishing": "Rupees (50)",
		"LH Lab Dive": "Piece of Heart",
		"LH Freestanding PoH": "Progressive Hookshot",
		"LH Sun": "Piece of Heart",
		"GV Crate Freestanding PoH": "Rupees (5)",
		"GV Waterfall Freestanding PoH": "Bombs (20)",
		"GV Chest": "Rupees (50)",
		"GF Chest": "Bombs (5)",
		"GF HBA 1000 Points": "Slingshot",
		"GF HBA 1500 Points": "Bow",
		"Wasteland Chest": "Piece of Heart",
		"Colossus Great Fairy Reward": "Rupees (50)",
		"Colossus Freestanding PoH": "Heart Container",
		"OGC Great Fairy Reward": "Mirror Shield",
		"Deku Tree Map Chest": "Bomb Bag",
		"Deku Tree Slingshot Room Side Chest": "Piece of Heart",
		"Deku Tree Slingshot Chest": "Hylian Shield",
		"Deku Tree Compass Chest": "Rupees (50)",
		"Deku Tree Compass Room Side Chest": "Recovery Heart",
		"Deku Tree Basement Chest": "Piece of Heart",
		"Deku Tree Queen Gohma Heart": "Rupees (5)",
		"Dodongos Cavern Map Chest": "Megaton Hammer",
		"Dodongos Cavern Compass Chest": "Deku Shield",
		"Dodongos Cavern Bomb Flower Platform Chest": "Piece of Heart",
		"Dodongos Cavern Bomb Bag Chest": "Deku Nut Capacity",
		"Dodongos Cavern End of Bridge Chest": "Rupees (5)",
		"Dodongos Cavern Boss Room Chest": "Piece of Heart",
		"Dodongos Cavern King Dodongo Heart": "Arrows (10)",
		"Jabu Jabus Belly Boomerang Chest": "Heart Container",
		"Jabu Jabus Belly Map Chest": "Recovery Heart",
		"Jabu Jabus Belly Compass Chest": "Zora Tunic",
		"Jabu Jabus Belly Barinade Heart": "Rupees (5)",
		"Bottom of the Well Front Left Fake Wall Chest": "Bombs (5)",
		"Bottom of the Well Front Center Bombable Chest": "Rupees (5)",
		"Bottom of the Well Back Left Bombable Chest": "Rupees (200)",
		"Bottom of the Well Underwater Left Chest":
			"Small Key (Bottom of the Well)",
		"Bottom of the Well Freestanding Key": "Bombs (10)",
		"Bottom of the Well Compass Chest": "Small Key (Bottom of the Well)",
		"Bottom of the Well Center Skulltula Chest": "Recovery Heart",
		"Bottom of the Well Right Bottom Fake Wall Chest": "Rupees (5)",
		"Bottom of the Well Fire Keese Chest": "Deku Stick Capacity",
		"Bottom of the Well Like Like Chest": "Bombs (5)",
		"Bottom of the Well Map Chest": "Recovery Heart",
		"Bottom of the Well Underwater Front Chest": "Piece of Heart",
		"Bottom of the Well Invisible Chest": "Small Key (Bottom of the Well)",
		"Bottom of the Well Lens of Truth Chest": "Rupees (5)",
		"Forest Temple First Room Chest": "Hover Boots",
		"Forest Temple First Stalfos Chest": "Rupees (5)",
		"Forest Temple Raised Island Courtyard Chest":
			"Small Key (Forest Temple)",
		"Forest Temple Map Chest": "Small Key (Forest Temple)",
		"Forest Temple Well Chest": "Boss Key (Forest Temple)",
		"Forest Temple Eye Switch Chest": "Piece of Heart",
		"Forest Temple Boss Key Chest": "Small Key (Forest Temple)",
		"Forest Temple Floormaster Chest": "Bombchus (20)",
		"Forest Temple Red Poe Chest": "Small Key (Forest Temple)",
		"Forest Temple Bow Chest": "Bombchus (10)",
		"Forest Temple Blue Poe Chest": "Small Key (Forest Temple)",
		"Forest Temple Falling Ceiling Room Chest": "Rupees (200)",
		"Forest Temple Basement Chest": "Piece of Heart (Treasure Chest Game)",
		"Forest Temple Phantom Ganon Heart": "Double Defense",
		"Fire Temple Near Boss Chest": "Small Key (Fire Temple)",
		"Fire Temple Flare Dancer Chest": "Small Key (Fire Temple)",
		"Fire Temple Boss Key Chest": "Bombchus (5)",
		"Fire Temple Big Lava Room Lower Open Door Chest":
			"Small Key (Fire Temple)",
		"Fire Temple Big Lava Room Blocked Door Chest":
			"Small Key (Fire Temple)",
		"Fire Temple Boulder Maze Lower Chest": "Boss Key (Fire Temple)",
		"Fire Temple Boulder Maze Side Room Chest": "Dins Fire",
		"Fire Temple Map Chest": "Deku Nuts (5)",
		"Fire Temple Boulder Maze Shortcut Chest": "Bombchus (10)",
		"Fire Temple Boulder Maze Upper Chest": "Small Key (Fire Temple)",
		"Fire Temple Scarecrow Chest": "Arrows (30)",
		"Fire Temple Compass Chest": "Deku Shield",
		"Fire Temple Megaton Hammer Chest": "Small Key (Fire Temple)",
		"Fire Temple Highest Goron Chest": "Small Key (Fire Temple)",
		"Fire Temple Volvagia Heart": "Small Key (Fire Temple)",
		"Water Temple Compass Chest": "Small Key (Water Temple)",
		"Water Temple Map Chest": "Small Key (Water Temple)",
		"Water Temple Cracked Wall Chest": "Small Key (Water Temple)",
		"Water Temple Torches Chest": "Small Key (Water Temple)",
		"Water Temple Boss Key Chest": "Boss Key (Water Temple)",
		"Water Temple Central Pillar Chest": "Bomb Bag",
		"Water Temple Central Bow Target Chest": "Small Key (Water Temple)",
		"Water Temple Longshot Chest": "Small Key (Water Temple)",
		"Water Temple River Chest": "Recovery Heart",
		"Water Temple Dragon Chest": "Bombchus (10)",
		"Water Temple Morpha Heart": "Deku Seeds (30)",
		"Shadow Temple Map Chest": "Progressive Wallet",
		"Shadow Temple Hover Boots Chest": "Piece of Heart",
		"Shadow Temple Compass Chest": "Arrows (10)",
		"Shadow Temple Early Silver Rupee Chest": "Small Key (Shadow Temple)",
		"Shadow Temple Invisible Blades Visible Chest": "Rupees (5)",
		"Shadow Temple Invisible Blades Invisible Chest": "Arrows (5)",
		"Shadow Temple Falling Spikes Lower Chest": "Rupees (5)",
		"Shadow Temple Falling Spikes Upper Chest": "Small Key (Shadow Temple)",
		"Shadow Temple Falling Spikes Switch Chest": "Lens of Truth",
		"Shadow Temple Invisible Spikes Chest": "Prescription",
		"Shadow Temple Freestanding Key": "Small Key (Shadow Temple)",
		"Shadow Temple Wind Hint Chest": "Small Key (Shadow Temple)",
		"Shadow Temple After Wind Enemy Chest": "Small Key (Shadow Temple)",
		"Shadow Temple After Wind Hidden Chest": "Piece of Heart",
		"Shadow Temple Spike Walls Left Chest": "Piece of Heart",
		"Shadow Temple Boss Key Chest": "Ice Arrows",
		"Shadow Temple Invisible Floormaster Chest": "Boss Key (Shadow Temple)",
		"Shadow Temple Bongo Bongo Heart": "Nayrus Love",
		"Spirit Temple Child Bridge Chest": "Small Key (Spirit Temple)",
		"Spirit Temple Child Early Torches Chest": "Small Key (Spirit Temple)",
		"Spirit Temple Child Climb North Chest": "Piece of Heart",
		"Spirit Temple Child Climb East Chest": "Rupees (20)",
		"Spirit Temple Map Chest": "Progressive Strength Upgrade",
		"Spirit Temple Sun Block Room Chest": "Magic Meter",
		"Spirit Temple Silver Gauntlets Chest": "Rupees (20)",
		"Spirit Temple Compass Chest": "Piece of Heart",
		"Spirit Temple Early Adult Right Chest": "Small Key (Spirit Temple)",
		"Spirit Temple First Mirror Left Chest": "Bombs (5)",
		"Spirit Temple First Mirror Right Chest": "Heart Container",
		"Spirit Temple Statue Room Northeast Chest":
			"Small Key (Spirit Temple)",
		"Spirit Temple Statue Room Hand Chest": "Recovery Heart",
		"Spirit Temple Near Four Armos Chest": "Kokiri Sword",
		"Spirit Temple Hallway Right Invisible Chest": "Bottle with Poe",
		"Spirit Temple Hallway Left Invisible Chest":
			"Small Key (Spirit Temple)",
		"Spirit Temple Mirror Shield Chest": "Piece of Heart",
		"Spirit Temple Boss Key Chest": "Boss Key (Spirit Temple)",
		"Spirit Temple Topmost Chest": "Progressive Scale",
		"Spirit Temple Twinrova Heart": "Arrows (5)",
		"Ice Cavern Map Chest": "Rupees (20)",
		"Ice Cavern Compass Chest": "Bow",
		"Ice Cavern Freestanding PoH": "Rupees (5)",
		"Ice Cavern Iron Boots Chest": "Rupees (5)",
		"Gerudo Training Ground Lobby Left Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Lobby Right Chest": "Piece of Heart",
		"Gerudo Training Ground Stalfos Chest": "Bombs (10)",
		"Gerudo Training Ground Before Heavy Block Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Heavy Block First Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Heavy Block Second Chest": "Piece of Heart",
		"Gerudo Training Ground Heavy Block Third Chest": "Rupees (5)",
		"Gerudo Training Ground Heavy Block Fourth Chest": "Boomerang",
		"Gerudo Training Ground Eye Statue Chest": "Piece of Heart",
		"Gerudo Training Ground Near Scarecrow Chest": "Deku Nuts (10)",
		"Gerudo Training Ground Hammer Room Clear Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Hammer Room Switch Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Freestanding Key": "Deku Nuts (5)",
		"Gerudo Training Ground Maze Right Central Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Maze Right Side Chest": "Bombs (10)",
		"Gerudo Training Ground Underwater Silver Rupee Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Beamos Chest": "Farores Wind",
		"Gerudo Training Ground Hidden Ceiling Chest": "Piece of Heart",
		"Gerudo Training Ground Maze Path First Chest": "Rupees (20)",
		"Gerudo Training Ground Maze Path Second Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Maze Path Third Chest":
			"Small Key (Gerudo Training Ground)",
		"Gerudo Training Ground Maze Path Final Chest": "Rupees (5)",
		"Ganons Castle Forest Trial Chest": "Goron Tunic",
		"Ganons Castle Water Trial Left Chest": "Rupees (20)",
		"Ganons Castle Water Trial Right Chest": "Recovery Heart",
		"Ganons Castle Shadow Trial Front Chest": "Arrows (10)",
		"Ganons Castle Shadow Trial Golden Gauntlets Chest": "Piece of Heart",
		"Ganons Castle Light Trial First Left Chest": "Progressive Hookshot",
		"Ganons Castle Light Trial Second Left Chest": "Recovery Heart",
		"Ganons Castle Light Trial Third Left Chest": "Arrows (10)",
		"Ganons Castle Light Trial First Right Chest":
			"Small Key (Ganons Castle)",
		"Ganons Castle Light Trial Second Right Chest": "Bottle with Bugs",
		"Ganons Castle Light Trial Third Right Chest": "Rupees (50)",
		"Ganons Castle Light Trial Invisible Enemies Chest":
			"Small Key (Ganons Castle)",
		"Ganons Castle Light Trial Lullaby Chest": "Rupee (1)",
		"Ganons Castle Spirit Trial Crystal Switch Chest": "Piece of Heart",
		"Ganons Castle Spirit Trial Invisible Chest": "Bombs (5)",
		"Ganons Tower Boss Key Chest": "Heart Container",
	},
	":woth_locations": {
		"KF Midos Top Right Chest": "Light Arrows",
		"Kak Man on Roof": "Progressive Strength Upgrade",
		"Song from Malon": "Zeldas Lullaby",
		"Sheik at Temple": "Nocturne of Shadow",
		"Song from Royal Familys Tomb": "Sarias Song",
		"Sheik in Crater": "Suns Song",
		"LW Skull Kid": "Progressive Scale",
		"Sheik in Forest": "Requiem of Spirit",
		"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
		"Dodongos Cavern Map Chest": "Megaton Hammer",
		"GC Maze Left Chest": "Magic Meter",
		"LH Freestanding PoH": "Progressive Hookshot",
		"Fire Temple Boulder Maze Side Room Chest": "Dins Fire",
		"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade",
		"Forest Temple First Room Chest": "Hover Boots",
		"Shadow Temple Map Chest": "Progressive Wallet",
		"Kak 50 Gold Skulltula Reward": "Iron Boots",
		"Spirit Temple Map Chest": "Progressive Strength Upgrade",
		"OGC Great Fairy Reward": "Mirror Shield",
		"Water Temple Central Pillar Chest": "Bomb Bag",
		"Spirit Temple Near Four Armos Chest": "Kokiri Sword",
	},
	":goal_locations": {
		rainbow_bridge: {
			"Path to Volvagia": {
				"Kak Man on Roof": "Progressive Strength Upgrade",
				"Song from Malon": "Zeldas Lullaby",
				"Song from Royal Familys Tomb": "Sarias Song",
				"Sheik in Crater": "Suns Song",
				"LW Skull Kid": "Progressive Scale",
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
				"Dodongos Cavern Map Chest": "Megaton Hammer",
				"LH Freestanding PoH": "Progressive Hookshot",
				"Forest Temple First Room Chest": "Hover Boots",
			},
			"Path to Phantom Ganon": {
				"Kak Man on Roof": "Progressive Strength Upgrade",
				"Song from Malon": "Zeldas Lullaby",
				"Song from Royal Familys Tomb": "Sarias Song",
				"LW Skull Kid": "Progressive Scale",
				"Dodongos Cavern Map Chest": "Megaton Hammer",
				"LH Freestanding PoH": "Progressive Hookshot",
			},
			"Path to Queen Gohma": {
				"Kak Man on Roof": "Progressive Strength Upgrade",
				"Song from Malon": "Zeldas Lullaby",
				"Sheik at Temple": "Nocturne of Shadow",
				"Song from Royal Familys Tomb": "Sarias Song",
				"Sheik in Crater": "Suns Song",
				"LW Skull Kid": "Progressive Scale",
				"Sheik in Forest": "Requiem of Spirit",
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
				"Dodongos Cavern Map Chest": "Megaton Hammer",
				"GC Maze Left Chest": "Magic Meter",
				"LH Freestanding PoH": "Progressive Hookshot",
				"Fire Temple Boulder Maze Side Room Chest": "Dins Fire",
				"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade",
				"Shadow Temple Map Chest": "Progressive Wallet",
				"Kak 50 Gold Skulltula Reward": "Iron Boots",
				"Spirit Temple Map Chest": "Progressive Strength Upgrade",
				"OGC Great Fairy Reward": "Mirror Shield",
				"Water Temple Central Pillar Chest": "Bomb Bag",
				"Spirit Temple Near Four Armos Chest": "Kokiri Sword",
			},
			"Path to Bongo Bongo": {
				"Kak Man on Roof": "Progressive Strength Upgrade",
				"Song from Malon": "Zeldas Lullaby",
				"Sheik at Temple": "Nocturne of Shadow",
				"Song from Royal Familys Tomb": "Sarias Song",
				"Sheik in Crater": "Suns Song",
				"LW Skull Kid": "Progressive Scale",
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
				"Dodongos Cavern Map Chest": "Megaton Hammer",
				"GC Maze Left Chest": "Magic Meter",
				"LH Freestanding PoH": "Progressive Hookshot",
				"Fire Temple Boulder Maze Side Room Chest": "Dins Fire",
				"Forest Temple First Room Chest": "Hover Boots",
				"Shadow Temple Map Chest": "Progressive Wallet",
				"Kak 50 Gold Skulltula Reward": "Iron Boots",
				"Water Temple Central Pillar Chest": "Bomb Bag",
			},
			"Path to Twinrova": {
				"Kak Man on Roof": "Progressive Strength Upgrade",
				"Song from Malon": "Zeldas Lullaby",
				"Sheik at Temple": "Nocturne of Shadow",
				"Song from Royal Familys Tomb": "Sarias Song",
				"Sheik in Crater": "Suns Song",
				"LW Skull Kid": "Progressive Scale",
				"Sheik in Forest": "Requiem of Spirit",
				"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
				"Dodongos Cavern Map Chest": "Megaton Hammer",
				"GC Maze Left Chest": "Magic Meter",
				"LH Freestanding PoH": "Progressive Hookshot",
				"Fire Temple Boulder Maze Side Room Chest": "Dins Fire",
				"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade",
				"Shadow Temple Map Chest": "Progressive Wallet",
				"Kak 50 Gold Skulltula Reward": "Iron Boots",
				"Spirit Temple Map Chest": "Progressive Strength Upgrade",
				"OGC Great Fairy Reward": "Mirror Shield",
				"Water Temple Central Pillar Chest": "Bomb Bag",
			},
		},
	},
	":barren_regions": [
		"Gerudo Valley",
		"the Haunted Wasteland",
		"the Market",
		"Zora's Domain",
		"Zora's Fountain",
		"the Deku Tree",
		"the Bottom of the Well",
	],
	gossip_stones: {
		"Colossus (Spirit Temple)": {
			text: "They say that plundering #the Deku Tree# is a foolish choice.",
			colors: ["Pink"],
		},
		"DMC (Bombable Wall)": {
			text: "They say that #Biggoron# crafts #a Piece of Heart#.",
			colors: ["Green", "Red"],
		},
		"DMC (Upper Grotto)": {
			text: "They say that shooting #the sun# grants #a Piece of Heart#.",
			colors: ["Green", "Red"],
		},
		"DMT (Biggoron)": {
			text: "They say that #Dodongo's Cavern# is on the path to #Twinrova#.",
			colors: ["Yellow", "Light Blue"],
		},
		"DMT (Storms Grotto)": {
			text: "They say that the final prize of #the thieves' training# is #a Blue Rupee#.",
			colors: ["Green", "Red"],
		},
		"Dodongos Cavern (Bombable Wall)": {
			text: "They say that plundering #the Deku Tree# is a foolish choice.",
			colors: ["Pink"],
		},
		"GC (Maze)": {
			text: "They say that #outside Ganon's Castle# is on the path to #Queen Gohma#.",
			colors: ["Green", "Light Blue"],
		},
		"GC (Medigoron)": {
			text: "They say that slaying #50 Gold Skulltulas# reveals #the Iron Boots#.",
			colors: ["Green", "Red"],
		},
		"GV (Waterfall)": {
			text: "They say that plundering #Gerudo Valley# is a foolish choice.",
			colors: ["Pink"],
		},
		"Graveyard (Shadow Temple)": {
			text: "They say that slaying #30 Gold Skulltulas# reveals #Arrows (30 pieces)#.",
			colors: ["Green", "Red"],
		},
		"HC (Malon)": {
			text: "They say that slaying #40 Gold Skulltulas# reveals #a Strength Upgrade#.",
			colors: ["Green", "Red"],
		},
		"HC (Rock Wall)": {
			text: "They say that the #final treasure of Ice Cavern# is #a Blue Rupee#.",
			colors: ["Green", "Red"],
		},
		"HC (Storms Grotto)": {
			text: "They say that #the Graveyard# is on the path to #Phantom Ganon#.",
			colors: ["Green", "Light Blue"],
		},
		"HF (Cow Grotto)": {
			text: "They say that the final prize of #the thieves' training# is #a Blue Rupee#.",
			colors: ["Green", "Red"],
		},
		"HF (Near Market Grotto)": {
			text: "They say that plundering #Gerudo Valley# is a foolish choice.",
			colors: ["Pink"],
		},
		"HF (Open Grotto)": {
			text: "They say that the #Ocarina of Time# teaches #Epona's Song#.",
			colors: ["Green", "Red"],
		},
		"HF (Southeast Grotto)": {
			text: "They say that a chest in the #central pillar of Water Temple# contains #a Bomb Bag#.",
			colors: ["Green", "Red"],
		},
		"KF (Deku Tree Left)": {
			text: "They say that a chest in the #central pillar of Water Temple# contains #a Bomb Bag#.",
			colors: ["Green", "Red"],
		},
		"KF (Deku Tree Right)": {
			text: "They say that slaying #30 Gold Skulltulas# reveals #Arrows (30 pieces)#.",
			colors: ["Green", "Red"],
		},
		"KF (Outside Storms)": {
			text: "They say that plundering #the Market# is a foolish choice.",
			colors: ["Pink"],
		},
		"KF (Storms Grotto)": {
			text: "They say that #Forest Temple# is on the path to #Volvagia#.",
			colors: ["Red", "Light Blue"],
		},
		"Kak (Open Grotto)": {
			text: "They say that #Biggoron# crafts #a Piece of Heart#.",
			colors: ["Green", "Red"],
		},
		"LH (Lab)": {
			text: "They say that shooting #the sun# grants #a Piece of Heart#.",
			colors: ["Green", "Red"],
		},
		"LH (Southeast Corner)": {
			text: "They say that #frogs in a storm# gift #a Purple Rupee#.",
			colors: ["Green", "Red"],
		},
		"LH (Southwest Corner)": {
			text: "They say that slaying #40 Gold Skulltulas# reveals #a Strength Upgrade#.",
			colors: ["Green", "Red"],
		},
		"LW (Bridge)": {
			text: "They say that the #Skull Mask# yields #Arrows (30 pieces)#.",
			colors: ["Green", "Red"],
		},
		"LW (Near Shortcuts Grotto)": {
			text: "They say that the #Skull Mask# yields #Arrows (30 pieces)#.",
			colors: ["Green", "Red"],
		},
		"SFM (Maze Lower)": {
			text: "They say that #Forest Temple# is on the path to #Volvagia#.",
			colors: ["Red", "Light Blue"],
		},
		"SFM (Maze Upper)": {
			text: "They say that #the Graveyard# is on the path to #Phantom Ganon#.",
			colors: ["Green", "Light Blue"],
		},
		"SFM (Saria)": {
			text: "They say that the #Ocarina of Time# teaches #Epona's Song#.",
			colors: ["Green", "Red"],
		},
		"ToT (Left)": {
			text: "They say that plundering #the Market# is a foolish choice.",
			colors: ["Pink"],
		},
		"ToT (Left-Center)": {
			text: "They say that the final reward from the #Frogs of Zora's River# is #a Piece of Heart#.",
			colors: ["Green", "Red"],
		},
		"ToT (Right)": {
			text: "They say that the #final treasure of Ice Cavern# is #a Blue Rupee#.",
			colors: ["Green", "Red"],
		},
		"ToT (Right-Center)": {
			text: "They say that #frogs in a storm# gift #a Purple Rupee#.",
			colors: ["Green", "Red"],
		},
		"ZD (Mweep)": {
			text: "They say that #Dodongo's Cavern# is on the path to #Twinrova#.",
			colors: ["Yellow", "Light Blue"],
		},
		"ZF (Fairy)": {
			text: "They say that #the Lost Woods# is on the path to #Bongo Bongo#.",
			colors: ["Pink", "Light Blue"],
		},
		"ZF (Jabu)": {
			text: "They say that the final reward from the #Frogs of Zora's River# is #a Piece of Heart#.",
			colors: ["Green", "Red"],
		},
		"ZR (Near Domain)": {
			text: "They say that #the Lost Woods# is on the path to #Bongo Bongo#.",
			colors: ["Pink", "Light Blue"],
		},
		"ZR (Near Grottos)": {
			text: "They say that #outside Ganon's Castle# is on the path to #Queen Gohma#.",
			colors: ["Green", "Light Blue"],
		},
		"ZR (Open Grotto)": {
			text: "They say that slaying #50 Gold Skulltulas# reveals #the Iron Boots#.",
			colors: ["Green", "Red"],
		},
	},
	":playthrough": {
		"1": {
			"HC Zeldas Letter": "Zeldas Letter",
			"KF Midos Top Right Chest": "Light Arrows",
			"KF Shop Item 1": "Buy Deku Shield",
			"Kak GS Guards House": "Gold Skulltula Token",
			"Kak GS House Under Construction": "Gold Skulltula Token",
			"Kak GS Skulltula House": "Gold Skulltula Token",
			"Kak GS Tree": "Gold Skulltula Token",
			"Kak Man on Roof": "Progressive Strength Upgrade",
			"LLR GS Rain Shed": "Gold Skulltula Token",
			"LLR GS Tree": "Gold Skulltula Token",
			"Links Pocket": "Forest Medallion",
			"Market GS Guard House": "Gold Skulltula Token",
			"Market Potion Shop Item 5": "Buy Deku Nut (5)",
			"Master Sword Pedestal": "Time Travel",
			"Song from Impa": "Bolero of Fire",
		},
		"2": {
			"Dodongos Cavern GS Side Room Near Lower Lizalfos":
				"Gold Skulltula Token",
			"Dodongos Cavern GS Vines Above Stairs": "Gold Skulltula Token",
			"Dodongos Cavern Map Chest": "Megaton Hammer",
			"Fire Temple Near Boss Chest": "Small Key (Fire Temple)",
			"GC GS Center Platform": "Gold Skulltula Token",
			"LLR Talons Chickens": "Bottle with Bugs",
			"OGC GS": "Gold Skulltula Token",
			Pierre: "Scarecrow Song",
			"Sheik at Temple": "Nocturne of Shadow",
			"Sheik in Crater": "Suns Song",
			"Song from Malon": "Zeldas Lullaby",
			"Song from Windmill": "Song of Time",
			"ZR Open Grotto Chest": "Slingshot",
		},
		"3": {
			"DMC GS Crate": "Gold Skulltula Token",
			"DMC Upper Grotto Chest": "Bow",
			"DMT GS Above Dodongos Cavern": "Gold Skulltula Token",
			"DMT GS Falling Rocks Path": "Gold Skulltula Token",
			"DMT GS Near Kak": "Gold Skulltula Token",
			"Fire Temple Big Lava Room Lower Open Door Chest":
				"Small Key (Fire Temple)",
			"Fire Temple Flare Dancer Chest": "Small Key (Fire Temple)",
			"Fire Temple GS Boss Key Loop": "Gold Skulltula Token",
			"Fire Temple GS Song of Time Room": "Gold Skulltula Token",
			"GC Maze Left Chest": "Magic Meter",
			"Graveyard Heart Piece Grave Chest": "Progressive Wallet",
			"HC GS Tree": "Gold Skulltula Token",
			"KF GS Know It All House": "Gold Skulltula Token",
			"Kak GS Watchtower": "Gold Skulltula Token",
			"LH GS Small Island": "Gold Skulltula Token",
			"Song from Royal Familys Tomb": "Sarias Song",
			"ZR GS Tree": "Gold Skulltula Token",
			"ZR Open Grotto Bug Shrub": "Bugs",
		},
		"4": {
			"DMC GS Bean Patch": "Gold Skulltula Token",
			"DMT GS Bean Patch": "Gold Skulltula Token",
			"GC Shop Item 5": "Buy Goron Tunic",
			"GV GS Bean Patch": "Gold Skulltula Token",
			"Graveyard GS Bean Patch": "Gold Skulltula Token",
			"KF GS Bean Patch": "Gold Skulltula Token",
			"LH GS Bean Patch": "Gold Skulltula Token",
			"LW GS Bean Patch Near Bridge": "Gold Skulltula Token",
			"LW GS Bean Patch Near Theater": "Gold Skulltula Token",
			"LW Skull Kid": "Progressive Scale",
			"Sheik in Forest": "Requiem of Spirit",
			"ZD GS Frozen Waterfall": "Gold Skulltula Token",
		},
		"5": {
			"Colossus GS Bean Patch": "Gold Skulltula Token",
			"Fire Temple Boulder Maze Lower Chest": "Boss Key (Fire Temple)",
			"Fire Temple Boulder Maze Side Room Chest": "Dins Fire",
			"Spirit Temple Child Bridge Chest": "Small Key (Spirit Temple)",
			"Spirit Temple GS Metal Fence": "Gold Skulltula Token",
			"ZR GS Ladder": "Gold Skulltula Token",
			"ZR Magic Bean Salesman": "Magic Bean",
		},
		"6": {
			"Colossus GS Hill": "Gold Skulltula Token",
			"LH Freestanding PoH": "Progressive Hookshot",
			"LW GS Above Theater": "Gold Skulltula Token",
			"Spirit Temple Child Early Torches Chest":
				"Small Key (Spirit Temple)",
			"Spirit Temple GS Sun on Floor Room": "Gold Skulltula Token",
		},
		"7": {
			"Colossus GS Tree": "Gold Skulltula Token",
			"Dodongos Cavern GS Alcove Above Stairs": "Gold Skulltula Token",
			"Dodongos Cavern GS Scarecrow": "Gold Skulltula Token",
			"Forest Temple First Room Chest": "Hover Boots",
			"Forest Temple GS First Room": "Gold Skulltula Token",
			"Forest Temple GS Lobby": "Gold Skulltula Token",
			"Forest Temple GS Raised Island Courtyard": "Gold Skulltula Token",
			"Forest Temple Map Chest": "Small Key (Forest Temple)",
			"Forest Temple Raised Island Courtyard Chest":
				"Small Key (Forest Temple)",
			"Forest Temple Well Chest": "Boss Key (Forest Temple)",
			"HF GS Cow Grotto": "Gold Skulltula Token",
			"HF GS Near Kak Grotto": "Gold Skulltula Token",
			"KF GS House of Twins": "Gold Skulltula Token",
			"Kak GS Above Impas House": "Gold Skulltula Token",
			"SFM GS": "Gold Skulltula Token",
			"Shadow Temple Map Chest": "Progressive Wallet",
			"ZR GS Above Bridge": "Gold Skulltula Token",
			"ZR GS Near Raised Grottos": "Gold Skulltula Token",
		},
		"8": {
			"Forest Temple Boss Key Chest": "Small Key (Forest Temple)",
			"Kak 40 Gold Skulltula Reward": "Progressive Strength Upgrade",
			"Kak 50 Gold Skulltula Reward": "Iron Boots",
			"Kak Potion Shop Item 5": "Buy Blue Fire",
			"Shadow Temple Early Silver Rupee Chest":
				"Small Key (Shadow Temple)",
			Volvagia: "Fire Medallion",
		},
		"9": {
			"Forest Temple Blue Poe Chest": "Small Key (Forest Temple)",
			"Forest Temple Red Poe Chest": "Small Key (Forest Temple)",
			"Spirit Temple Early Adult Right Chest":
				"Small Key (Spirit Temple)",
			"ZD Shop Item 1": "Buy Zora Tunic",
		},
		"10": {
			"Phantom Ganon": "Water Medallion",
			"Spirit Temple Map Chest": "Progressive Strength Upgrade",
			"Spirit Temple Statue Room Northeast Chest":
				"Small Key (Spirit Temple)",
			"Water Temple Central Pillar Chest": "Bomb Bag",
		},
		"11": {
			"OGC Great Fairy Reward": "Mirror Shield",
			"Shadow Temple Falling Spikes Upper Chest":
				"Small Key (Shadow Temple)",
			"Spirit Temple Hallway Left Invisible Chest":
				"Small Key (Spirit Temple)",
		},
		"12": {
			"Shadow Temple Freestanding Key": "Small Key (Shadow Temple)",
			"Spirit Temple Boss Key Chest": "Boss Key (Spirit Temple)",
			"Spirit Temple Near Four Armos Chest": "Kokiri Sword",
		},
		"13": {
			"Queen Gohma": "Shadow Medallion",
			"Shadow Temple After Wind Enemy Chest": "Small Key (Shadow Temple)",
			"Shadow Temple Wind Hint Chest": "Small Key (Shadow Temple)",
			Twinrova: "Light Medallion",
		},
		"14": {
			"Shadow Temple Invisible Floormaster Chest":
				"Boss Key (Shadow Temple)",
		},
		"15": { "Bongo Bongo": "Spirit Medallion" },
		"16": { Ganon: "Triforce" },
	},
	":entrance_playthrough": {
		"1": {
			"Child Spawn -> KF Links House": {
				region: "Market",
				from: "Market Bombchu Bowling",
			},
		},
		"2": { "Adult Spawn -> Temple of Time": "Market Shooting Gallery" },
	},
};

export default createSeed;
