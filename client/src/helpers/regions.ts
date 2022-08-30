type Location = {
	name: string;
	child?: boolean;
	adult?: boolean;
};

type Exit = Location & { destination: Region };

type Region = {
	name: string;
	child?: boolean;
	adult?: boolean;
	locations: Record<Location["name"], Location>;
	exits: Exit[];
};

const regions: Record<Region["name"], Region> = {
	None: {
		name: "None",
		child: true,
		adult: true,
		locations: {
			"Links Pocket": { name: "Links Pocket", child: true, adult: true },
			"Queen Gohma": { name: "Queen Gohma", child: true, adult: true },
			"King Dodongo": { name: "King Dodongo", child: true, adult: true },
			Barinade: { name: "Barinade", child: true, adult: true },
			"Phantom Ganon": {
				name: "Phantom Ganon",
				child: true,
				adult: true,
			},
			Volvagia: { name: "Volvagia", child: true, adult: true },
			Morpha: { name: "Morpha", child: true, adult: true },
			"Bongo Bongo": { name: "Bongo Bongo", child: true, adult: true },
			Twinrova: { name: "Twinrova", child: true, adult: true },
			Ganon: { name: "Ganon", child: true, adult: true },
			"Gift from Sages": {
				name: "Gift from Sages",
				child: true,
				adult: true,
			},
			Pierre: { name: "Pierre", child: true, adult: true },
			"Deliver Rutos Letter": {
				name: "Deliver Rutos Letter",
				child: true,
				adult: true,
			},
			"Master Sword Pedestal": {
				name: "Master Sword Pedestal",
				child: true,
				adult: true,
			},
			"Deku Baba Sticks": {
				name: "Deku Baba Sticks",
				child: true,
				adult: true,
			},
			"Deku Baba Nuts": {
				name: "Deku Baba Nuts",
				child: true,
				adult: true,
			},
			"Stick Pot": { name: "Stick Pot", child: true, adult: true },
			"Nut Pot": { name: "Nut Pot", child: true, adult: true },
			"Nut Crate": { name: "Nut Crate", child: true, adult: true },
			"Blue Fire": { name: "Blue Fire", child: true, adult: true },
			"Lone Fish": { name: "Lone Fish", child: true, adult: true },
			"Fish Group": { name: "Fish Group", child: true, adult: true },
			"Bug Rock": { name: "Bug Rock", child: true, adult: true },
			"Bug Shrub": { name: "Bug Shrub", child: true, adult: true },
			"Wandering Bugs": {
				name: "Wandering Bugs",
				child: true,
				adult: true,
			},
			"Fairy Pot": { name: "Fairy Pot", child: true, adult: true },
			"Free Fairies": { name: "Free Fairies", child: true, adult: true },
			"Wall Fairy": { name: "Wall Fairy", child: true, adult: true },
			"Butterfly Fairy": {
				name: "Butterfly Fairy",
				child: true,
				adult: true,
			},
			"Gossip Stone Fairy": {
				name: "Gossip Stone Fairy",
				child: true,
				adult: true,
			},
			"Bean Plant Fairy": {
				name: "Bean Plant Fairy",
				child: true,
				adult: true,
			},
			"Fairy Pond": { name: "Fairy Pond", child: true, adult: true },
			"Big Poe Kill": { name: "Big Poe Kill", child: true, adult: true },
			"DMC Gossip Stone": {
				name: "DMC Gossip Stone",
				child: true,
				adult: true,
			},
			"DMT Gossip Stone": {
				name: "DMT Gossip Stone",
				child: true,
				adult: true,
			},
			"Colossus Gossip Stone": {
				name: "Colossus Gossip Stone",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Gossip Stone": {
				name: "Dodongos Cavern Gossip Stone",
				child: true,
				adult: true,
			},
			"GV Gossip Stone": {
				name: "GV Gossip Stone",
				child: true,
				adult: true,
			},
			"GC Maze Gossip Stone": {
				name: "GC Maze Gossip Stone",
				child: true,
				adult: true,
			},
			"GC Medigoron Gossip Stone": {
				name: "GC Medigoron Gossip Stone",
				child: true,
				adult: true,
			},
			"Graveyard Gossip Stone": {
				name: "Graveyard Gossip Stone",
				child: true,
				adult: true,
			},
			"HC Malon Gossip Stone": {
				name: "HC Malon Gossip Stone",
				child: true,
				adult: true,
			},
			"HC Rock Wall Gossip Stone": {
				name: "HC Rock Wall Gossip Stone",
				child: true,
				adult: true,
			},
			"HC Storms Grotto Gossip Stone": {
				name: "HC Storms Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"HF Cow Grotto Gossip Stone": {
				name: "HF Cow Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"KF Deku Tree Gossip Stone (Left)": {
				name: "KF Deku Tree Gossip Stone (Left)",
				child: true,
				adult: true,
			},
			"KF Deku Tree Gossip Stone (Right)": {
				name: "KF Deku Tree Gossip Stone (Right)",
				child: true,
				adult: true,
			},
			"KF Gossip Stone": {
				name: "KF Gossip Stone",
				child: true,
				adult: true,
			},
			"LH Lab Gossip Stone": {
				name: "LH Lab Gossip Stone",
				child: true,
				adult: true,
			},
			"LH Gossip Stone (Southeast)": {
				name: "LH Gossip Stone (Southeast)",
				child: true,
				adult: true,
			},
			"LH Gossip Stone (Southwest)": {
				name: "LH Gossip Stone (Southwest)",
				child: true,
				adult: true,
			},
			"LW Gossip Stone": {
				name: "LW Gossip Stone",
				child: true,
				adult: true,
			},
			"SFM Maze Gossip Stone (Lower)": {
				name: "SFM Maze Gossip Stone (Lower)",
				child: true,
				adult: true,
			},
			"SFM Maze Gossip Stone (Upper)": {
				name: "SFM Maze Gossip Stone (Upper)",
				child: true,
				adult: true,
			},
			"SFM Saria Gossip Stone": {
				name: "SFM Saria Gossip Stone",
				child: true,
				adult: true,
			},
			"ToT Gossip Stone (Left)": {
				name: "ToT Gossip Stone (Left)",
				child: true,
				adult: true,
			},
			"ToT Gossip Stone (Left-Center)": {
				name: "ToT Gossip Stone (Left-Center)",
				child: true,
				adult: true,
			},
			"ToT Gossip Stone (Right)": {
				name: "ToT Gossip Stone (Right)",
				child: true,
				adult: true,
			},
			"ToT Gossip Stone (Right-Center)": {
				name: "ToT Gossip Stone (Right-Center)",
				child: true,
				adult: true,
			},
			"ZD Gossip Stone": {
				name: "ZD Gossip Stone",
				child: true,
				adult: true,
			},
			"ZF Fairy Gossip Stone": {
				name: "ZF Fairy Gossip Stone",
				child: true,
				adult: true,
			},
			"ZF Jabu Gossip Stone": {
				name: "ZF Jabu Gossip Stone",
				child: true,
				adult: true,
			},
			"ZR Near Grottos Gossip Stone": {
				name: "ZR Near Grottos Gossip Stone",
				child: true,
				adult: true,
			},
			"ZR Near Domain Gossip Stone": {
				name: "ZR Near Domain Gossip Stone",
				child: true,
				adult: true,
			},
			"HF Near Market Grotto Gossip Stone": {
				name: "HF Near Market Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"HF Southeast Grotto Gossip Stone": {
				name: "HF Southeast Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"HF Open Grotto Gossip Stone": {
				name: "HF Open Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"Kak Open Grotto Gossip Stone": {
				name: "Kak Open Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"ZR Open Grotto Gossip Stone": {
				name: "ZR Open Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"KF Storms Grotto Gossip Stone": {
				name: "KF Storms Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"LW Near Shortcuts Grotto Gossip Stone": {
				name: "LW Near Shortcuts Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"DMT Storms Grotto Gossip Stone": {
				name: "DMT Storms Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"DMC Upper Grotto Gossip Stone": {
				name: "DMC Upper Grotto Gossip Stone",
				child: true,
				adult: true,
			},
			"Ganondorf Hint": {
				name: "Ganondorf Hint",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Hyrule Castle": {
		name: "Hyrule Castle",
		child: true,
		locations: {
			"Song from Impa": {
				name: "Song from Impa",
				child: true,
			},
			"HC Malon Egg": { name: "HC Malon Egg", child: true },
			"HC Zeldas Letter": {
				name: "HC Zeldas Letter",
				child: true,
			},
			"HC Great Fairy Reward": {
				name: "HC Great Fairy Reward",
				child: true,
			},
			"HC GS Tree": { name: "HC GS Tree", child: true },
			"HC GS Storms Grotto": {
				name: "HC GS Storms Grotto",
				child: true,
			},
		},
		exits: [],
	},
	"Lon Lon Ranch": {
		name: "Lon Lon Ranch",
		child: true,
		adult: true,
		locations: {
			"Song from Malon": {
				name: "Song from Malon",
				child: true,
			},
			"LLR Talons Chickens": {
				name: "LLR Talons Chickens",
				child: true,
			},
			"LLR Freestanding PoH": {
				name: "LLR Freestanding PoH",
				child: true,
			},
			"LLR Deku Scrub Grotto Left": {
				name: "LLR Deku Scrub Grotto Left",
				child: true,
				adult: true,
			},
			"LLR Deku Scrub Grotto Center": {
				name: "LLR Deku Scrub Grotto Center",
				child: true,
				adult: true,
			},
			"LLR Deku Scrub Grotto Right": {
				name: "LLR Deku Scrub Grotto Right",
				child: true,
				adult: true,
			},
			"LLR Stables Left Cow": {
				name: "LLR Stables Left Cow",
				child: true,
				adult: true,
			},
			"LLR Stables Right Cow": {
				name: "LLR Stables Right Cow",
				child: true,
				adult: true,
			},
			"LLR Tower Left Cow": {
				name: "LLR Tower Left Cow",
				child: true,
				adult: true,
			},
			"LLR Tower Right Cow": {
				name: "LLR Tower Right Cow",
				child: true,
				adult: true,
			},
			"LLR GS House Window": {
				name: "LLR GS House Window",
				child: true,
				adult: true,
			},
			"LLR GS Tree": { name: "LLR GS Tree", child: true, adult: true },
			"LLR GS Rain Shed": {
				name: "LLR GS Rain Shed",
				child: true,
				adult: true,
			},
			"LLR GS Back Wall": {
				name: "LLR GS Back Wall",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Sacred Forest Meadow": {
		name: "Sacred Forest Meadow",
		child: true,
		adult: true,
		locations: {
			"Song from Saria": {
				name: "Song from Saria",
				child: true,
			},
			"Sheik in Forest": {
				name: "Sheik in Forest",
				adult: true,
			},
			"SFM Wolfos Grotto Chest": {
				name: "SFM Wolfos Grotto Chest",
				child: true,
				adult: true,
			},
			"SFM Deku Scrub Grotto Front": {
				name: "SFM Deku Scrub Grotto Front",
				child: true,
				adult: true,
			},
			"SFM Deku Scrub Grotto Rear": {
				name: "SFM Deku Scrub Grotto Rear",
				child: true,
				adult: true,
			},
			"SFM GS": { name: "SFM GS", child: true, adult: true },
		},
		exits: [],
	},
	Graveyard: {
		name: "Graveyard",
		child: true,
		adult: true,
		locations: {
			"Song from Royal Familys Tomb": {
				name: "Song from Royal Familys Tomb",
				child: true,
				adult: true,
			},
			"Graveyard Shield Grave Chest": {
				name: "Graveyard Shield Grave Chest",
				child: true,
				adult: true,
			},
			"Graveyard Heart Piece Grave Chest": {
				name: "Graveyard Heart Piece Grave Chest",
				child: true,
				adult: true,
			},
			"Graveyard Royal Familys Tomb Chest": {
				name: "Graveyard Royal Familys Tomb Chest",
				child: true,
				adult: true,
			},
			"Graveyard Freestanding PoH": {
				name: "Graveyard Freestanding PoH",
				child: true,
				adult: true,
			},
			"Graveyard Dampe Gravedigging Tour": {
				name: "Graveyard Dampe Gravedigging Tour",
				child: true,
				adult: true,
			},
			"Graveyard Hookshot Chest": {
				name: "Graveyard Hookshot Chest",
				child: true,
				adult: true,
			},
			"Graveyard Dampe Race Freestanding PoH": {
				name: "Graveyard Dampe Race Freestanding PoH",
				child: true,
				adult: true,
			},
			"Graveyard GS Bean Patch": {
				name: "Graveyard GS Bean Patch",
				child: true,
				adult: true,
			},
			"Graveyard GS Wall": {
				name: "Graveyard GS Wall",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Hyrule Field": {
		name: "Hyrule Field",
		child: true,
		adult: true,
		locations: {
			"Song from Ocarina of Time": {
				name: "Song from Ocarina of Time",
				child: true,
				adult: true,
			},
			"HF Ocarina of Time Item": {
				name: "HF Ocarina of Time Item",
				child: true,
				adult: true,
			},
			"HF Near Market Grotto Chest": {
				name: "HF Near Market Grotto Chest",
				child: true,
				adult: true,
			},
			"HF Tektite Grotto Freestanding PoH": {
				name: "HF Tektite Grotto Freestanding PoH",
				child: true,
				adult: true,
			},
			"HF Southeast Grotto Chest": {
				name: "HF Southeast Grotto Chest",
				child: true,
				adult: true,
			},
			"HF Open Grotto Chest": {
				name: "HF Open Grotto Chest",
				child: true,
				adult: true,
			},
			"HF Deku Scrub Grotto": {
				name: "HF Deku Scrub Grotto",
				child: true,
				adult: true,
			},
			"HF Cow Grotto Cow": {
				name: "HF Cow Grotto Cow",
				child: true,
				adult: true,
			},
			"HF GS Cow Grotto": {
				name: "HF GS Cow Grotto",
				child: true,
				adult: true,
			},
			"HF GS Near Kak Grotto": {
				name: "HF GS Near Kak Grotto",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Kakariko Village": {
		name: "Kakariko Village",
		child: true,
		adult: true,
		locations: {
			"Song from Windmill": {
				name: "Song from Windmill",
				child: true,
				adult: true,
			},
			"Sheik in Kakariko": {
				name: "Sheik in Kakariko",
				child: true,
				adult: true,
			},
			"Kak Anju as Child": {
				name: "Kak Anju as Child",
				child: true,
				adult: true,
			},
			"Kak Anju as Adult": {
				name: "Kak Anju as Adult",
				child: true,
				adult: true,
			},
			"Kak Impas House Freestanding PoH": {
				name: "Kak Impas House Freestanding PoH",
				child: true,
				adult: true,
			},
			"Kak Windmill Freestanding PoH": {
				name: "Kak Windmill Freestanding PoH",
				child: true,
				adult: true,
			},
			"Kak Man on Roof": {
				name: "Kak Man on Roof",
				child: true,
				adult: true,
			},
			"Kak Open Grotto Chest": {
				name: "Kak Open Grotto Chest",
				child: true,
				adult: true,
			},
			"Kak Redead Grotto Chest": {
				name: "Kak Redead Grotto Chest",
				child: true,
				adult: true,
			},
			"Kak Shooting Gallery Reward": {
				name: "Kak Shooting Gallery Reward",
				child: true,
				adult: true,
			},
			"Kak 10 Gold Skulltula Reward": {
				name: "Kak 10 Gold Skulltula Reward",
				child: true,
				adult: true,
			},
			"Kak 20 Gold Skulltula Reward": {
				name: "Kak 20 Gold Skulltula Reward",
				child: true,
				adult: true,
			},
			"Kak 30 Gold Skulltula Reward": {
				name: "Kak 30 Gold Skulltula Reward",
				child: true,
				adult: true,
			},
			"Kak 40 Gold Skulltula Reward": {
				name: "Kak 40 Gold Skulltula Reward",
				child: true,
				adult: true,
			},
			"Kak 50 Gold Skulltula Reward": {
				name: "Kak 50 Gold Skulltula Reward",
				child: true,
				adult: true,
			},
			"Kak Impas House Cow": {
				name: "Kak Impas House Cow",
				child: true,
				adult: true,
			},
			"Kak GS Tree": { name: "Kak GS Tree", child: true, adult: true },
			"Kak GS Guards House": {
				name: "Kak GS Guards House",
				child: true,
				adult: true,
			},
			"Kak GS Watchtower": {
				name: "Kak GS Watchtower",
				child: true,
				adult: true,
			},
			"Kak GS Skulltula House": {
				name: "Kak GS Skulltula House",
				child: true,
				adult: true,
			},
			"Kak GS House Under Construction": {
				name: "Kak GS House Under Construction",
				child: true,
				adult: true,
			},
			"Kak GS Above Impas House": {
				name: "Kak GS Above Impas House",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 1": {
				name: "Kak Bazaar Item 1",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 2": {
				name: "Kak Bazaar Item 2",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 3": {
				name: "Kak Bazaar Item 3",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 4": {
				name: "Kak Bazaar Item 4",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 5": {
				name: "Kak Bazaar Item 5",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 6": {
				name: "Kak Bazaar Item 6",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 7": {
				name: "Kak Bazaar Item 7",
				child: true,
				adult: true,
			},
			"Kak Bazaar Item 8": {
				name: "Kak Bazaar Item 8",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 1": {
				name: "Kak Potion Shop Item 1",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 2": {
				name: "Kak Potion Shop Item 2",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 3": {
				name: "Kak Potion Shop Item 3",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 4": {
				name: "Kak Potion Shop Item 4",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 5": {
				name: "Kak Potion Shop Item 5",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 6": {
				name: "Kak Potion Shop Item 6",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 7": {
				name: "Kak Potion Shop Item 7",
				child: true,
				adult: true,
			},
			"Kak Potion Shop Item 8": {
				name: "Kak Potion Shop Item 8",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Death Mountain Crater": {
		name: "Death Mountain Crater",
		child: true,
		adult: true,
		locations: {
			"Sheik in Crater": {
				name: "Sheik in Crater",
				child: true,
				adult: true,
			},
			"DMC Volcano Freestanding PoH": {
				name: "DMC Volcano Freestanding PoH",
				child: true,
				adult: true,
			},
			"DMC Wall Freestanding PoH": {
				name: "DMC Wall Freestanding PoH",
				child: true,
				adult: true,
			},
			"DMC Upper Grotto Chest": {
				name: "DMC Upper Grotto Chest",
				child: true,
				adult: true,
			},
			"DMC Great Fairy Reward": {
				name: "DMC Great Fairy Reward",
				child: true,
				adult: true,
			},
			"DMC Deku Scrub": {
				name: "DMC Deku Scrub",
				child: true,
				adult: true,
			},
			"DMC Deku Scrub Grotto Left": {
				name: "DMC Deku Scrub Grotto Left",
				child: true,
				adult: true,
			},
			"DMC Deku Scrub Grotto Center": {
				name: "DMC Deku Scrub Grotto Center",
				child: true,
				adult: true,
			},
			"DMC Deku Scrub Grotto Right": {
				name: "DMC Deku Scrub Grotto Right",
				child: true,
				adult: true,
			},
			"DMC GS Crate": { name: "DMC GS Crate", child: true, adult: true },
			"DMC GS Bean Patch": {
				name: "DMC GS Bean Patch",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Ice Cavern": {
		name: "Ice Cavern",
		adult: true,
		locations: {
			"Sheik in Ice Cavern": {
				name: "Sheik in Ice Cavern",
				child: true,
				adult: true,
			},
			"Ice Cavern Map Chest": {
				name: "Ice Cavern Map Chest",
				child: true,
				adult: true,
			},
			"Ice Cavern Compass Chest": {
				name: "Ice Cavern Compass Chest",
				child: true,
				adult: true,
			},
			"Ice Cavern Freestanding PoH": {
				name: "Ice Cavern Freestanding PoH",
				child: true,
				adult: true,
			},
			"Ice Cavern Iron Boots Chest": {
				name: "Ice Cavern Iron Boots Chest",
				child: true,
				adult: true,
			},
			"Ice Cavern GS Spinning Scythe Room": {
				name: "Ice Cavern GS Spinning Scythe Room",
				child: true,
				adult: true,
			},
			"Ice Cavern GS Heart Piece Room": {
				name: "Ice Cavern GS Heart Piece Room",
				child: true,
				adult: true,
			},
			"Ice Cavern GS Push Block Room": {
				name: "Ice Cavern GS Push Block Room",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ Map Chest": {
				name: "Ice Cavern MQ Map Chest",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ Compass Chest": {
				name: "Ice Cavern MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ Freestanding PoH": {
				name: "Ice Cavern MQ Freestanding PoH",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ Iron Boots Chest": {
				name: "Ice Cavern MQ Iron Boots Chest",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ GS Red Ice": {
				name: "Ice Cavern MQ GS Red Ice",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ GS Ice Block": {
				name: "Ice Cavern MQ GS Ice Block",
				child: true,
				adult: true,
			},
			"Ice Cavern MQ GS Scarecrow": {
				name: "Ice Cavern MQ GS Scarecrow",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Desert Colossus": {
		name: "Desert Colossus",
		child: true,
		adult: true,
		locations: {
			"Sheik at Colossus": {
				name: "Sheik at Colossus",
				child: true,
				adult: true,
			},
			"Colossus Great Fairy Reward": {
				name: "Colossus Great Fairy Reward",
				child: true,
				adult: true,
			},
			"Colossus Freestanding PoH": {
				name: "Colossus Freestanding PoH",
				child: true,
				adult: true,
			},
			"Colossus Deku Scrub Grotto Front": {
				name: "Colossus Deku Scrub Grotto Front",
				child: true,
				adult: true,
			},
			"Colossus Deku Scrub Grotto Rear": {
				name: "Colossus Deku Scrub Grotto Rear",
				child: true,
				adult: true,
			},
			"Colossus GS Bean Patch": {
				name: "Colossus GS Bean Patch",
				child: true,
				adult: true,
			},
			"Colossus GS Tree": {
				name: "Colossus GS Tree",
				child: true,
				adult: true,
			},
			"Colossus GS Hill": {
				name: "Colossus GS Hill",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Temple of Time": {
		name: "Temple of Time",
		child: true,
		adult: true,
		locations: {
			"Sheik at Temple": {
				name: "Sheik at Temple",
				child: true,
				adult: true,
			},
			"ToT Light Arrows Cutscene": {
				name: "ToT Light Arrows Cutscene",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Kokiri Forest": {
		name: "Kokiri Forest",
		child: true,
		adult: true,
		locations: {
			"KF Midos Top Left Chest": {
				name: "KF Midos Top Left Chest",
				child: true,
			},
			"KF Midos Top Right Chest": {
				name: "KF Midos Top Right Chest",
				child: true,
			},
			"KF Midos Bottom Left Chest": {
				name: "KF Midos Bottom Left Chest",
				child: true,
			},
			"KF Midos Bottom Right Chest": {
				name: "KF Midos Bottom Right Chest",
				child: true,
			},
			"KF Kokiri Sword Chest": {
				name: "KF Kokiri Sword Chest",
				child: true,
				adult: true,
			},
			"KF Storms Grotto Chest": {
				name: "KF Storms Grotto Chest",
				child: true,
				adult: true,
			},
			"KF Links House Cow": {
				name: "KF Links House Cow",
				child: true,
				adult: true,
			},
			"KF GS Know It All House": {
				name: "KF GS Know It All House",
				child: true,
				adult: true,
			},
			"KF GS Bean Patch": {
				name: "KF GS Bean Patch",
				child: true,
				adult: true,
			},
			"KF GS House of Twins": {
				name: "KF GS House of Twins",
				child: true,
				adult: true,
			},
			"KF Shop Item 1": {
				name: "KF Shop Item 1",
				child: true,
				adult: true,
			},
			"KF Shop Item 2": {
				name: "KF Shop Item 2",
				child: true,
				adult: true,
			},
			"KF Shop Item 3": {
				name: "KF Shop Item 3",
				child: true,
				adult: true,
			},
			"KF Shop Item 4": {
				name: "KF Shop Item 4",
				child: true,
				adult: true,
			},
			"KF Shop Item 5": {
				name: "KF Shop Item 5",
				child: true,
				adult: true,
			},
			"KF Shop Item 6": {
				name: "KF Shop Item 6",
				child: true,
				adult: true,
			},
			"KF Shop Item 7": {
				name: "KF Shop Item 7",
				child: true,
				adult: true,
			},
			"KF Shop Item 8": {
				name: "KF Shop Item 8",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Lost Woods": {
		name: "Lost Woods",
		child: true,
		adult: true,
		locations: {
			"LW Gift from Saria": {
				name: "LW Gift from Saria",
				child: true,
				adult: true,
			},
			"LW Ocarina Memory Game": {
				name: "LW Ocarina Memory Game",
				child: true,
				adult: true,
			},
			"LW Target in Woods": {
				name: "LW Target in Woods",
				child: true,
				adult: true,
			},
			"LW Near Shortcuts Grotto Chest": {
				name: "LW Near Shortcuts Grotto Chest",
				child: true,
				adult: true,
			},
			"Deku Theater Skull Mask": {
				name: "Deku Theater Skull Mask",
				child: true,
				adult: true,
			},
			"Deku Theater Mask of Truth": {
				name: "Deku Theater Mask of Truth",
				child: true,
				adult: true,
			},
			"LW Skull Kid": { name: "LW Skull Kid", child: true, adult: true },
			"LW Deku Scrub Near Bridge": {
				name: "LW Deku Scrub Near Bridge",
				child: true,
				adult: true,
			},
			"LW Deku Scrub Near Deku Theater Left": {
				name: "LW Deku Scrub Near Deku Theater Left",
				child: true,
				adult: true,
			},
			"LW Deku Scrub Near Deku Theater Right": {
				name: "LW Deku Scrub Near Deku Theater Right",
				child: true,
				adult: true,
			},
			"LW Deku Scrub Grotto Front": {
				name: "LW Deku Scrub Grotto Front",
				child: true,
				adult: true,
			},
			"LW Deku Scrub Grotto Rear": {
				name: "LW Deku Scrub Grotto Rear",
				child: true,
				adult: true,
			},
			"LW GS Bean Patch Near Bridge": {
				name: "LW GS Bean Patch Near Bridge",
				child: true,
				adult: true,
			},
			"LW GS Bean Patch Near Theater": {
				name: "LW GS Bean Patch Near Theater",
				child: true,
				adult: true,
			},
			"LW GS Above Theater": {
				name: "LW GS Above Theater",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	Market: {
		name: "Market",
		child: true,
		adult: true,
		locations: {
			"Market Shooting Gallery Reward": {
				name: "Market Shooting Gallery Reward",
				child: true,
			},
			"Market Bombchu Bowling First Prize": {
				name: "Market Bombchu Bowling First Prize",
				child: true,
			},
			"Market Bombchu Bowling Second Prize": {
				name: "Market Bombchu Bowling Second Prize",
				child: true,
			},
			"Market Bombchu Bowling Bombchus": {
				name: "Market Bombchu Bowling Bombchus",
				child: true,
			},
			"Market Lost Dog": {
				name: "Market Lost Dog",
				child: true,
			},
			"Market Treasure Chest Game Reward": {
				name: "Market Treasure Chest Game Reward",
				child: true,
			},
			"Market 10 Big Poes": {
				name: "Market 10 Big Poes",
				adult: true,
			},
			"Market GS Guard House": {
				name: "Market GS Guard House",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 1": {
				name: "Market Bazaar Item 1",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 2": {
				name: "Market Bazaar Item 2",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 3": {
				name: "Market Bazaar Item 3",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 4": {
				name: "Market Bazaar Item 4",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 5": {
				name: "Market Bazaar Item 5",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 6": {
				name: "Market Bazaar Item 6",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 7": {
				name: "Market Bazaar Item 7",
				child: true,
				adult: true,
			},
			"Market Bazaar Item 8": {
				name: "Market Bazaar Item 8",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 1": {
				name: "Market Potion Shop Item 1",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 2": {
				name: "Market Potion Shop Item 2",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 3": {
				name: "Market Potion Shop Item 3",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 4": {
				name: "Market Potion Shop Item 4",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 5": {
				name: "Market Potion Shop Item 5",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 6": {
				name: "Market Potion Shop Item 6",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 7": {
				name: "Market Potion Shop Item 7",
				child: true,
				adult: true,
			},
			"Market Potion Shop Item 8": {
				name: "Market Potion Shop Item 8",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 1": {
				name: "Market Bombchu Shop Item 1",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 2": {
				name: "Market Bombchu Shop Item 2",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 3": {
				name: "Market Bombchu Shop Item 3",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 4": {
				name: "Market Bombchu Shop Item 4",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 5": {
				name: "Market Bombchu Shop Item 5",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 6": {
				name: "Market Bombchu Shop Item 6",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 7": {
				name: "Market Bombchu Shop Item 7",
				child: true,
				adult: true,
			},
			"Market Bombchu Shop Item 8": {
				name: "Market Bombchu Shop Item 8",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Death Mountain Trail": {
		name: "Death Mountain Trail",
		child: true,
		adult: true,
		locations: {
			"DMT Freestanding PoH": {
				name: "DMT Freestanding PoH",
				child: true,
				adult: true,
			},
			"DMT Chest": { name: "DMT Chest", child: true, adult: true },
			"DMT Storms Grotto Chest": {
				name: "DMT Storms Grotto Chest",
				child: true,
				adult: true,
			},
			"DMT Great Fairy Reward": {
				name: "DMT Great Fairy Reward",
				child: true,
				adult: true,
			},
			"DMT Biggoron": { name: "DMT Biggoron", child: true, adult: true },
			"DMT Cow Grotto Cow": {
				name: "DMT Cow Grotto Cow",
				child: true,
				adult: true,
			},
			"DMT GS Near Kak": {
				name: "DMT GS Near Kak",
				child: true,
				adult: true,
			},
			"DMT GS Bean Patch": {
				name: "DMT GS Bean Patch",
				child: true,
				adult: true,
			},
			"DMT GS Above Dodongos Cavern": {
				name: "DMT GS Above Dodongos Cavern",
				child: true,
				adult: true,
			},
			"DMT GS Falling Rocks Path": {
				name: "DMT GS Falling Rocks Path",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Goron City": {
		name: "Goron City",
		child: true,
		adult: true,
		locations: {
			"GC Darunias Joy": {
				name: "GC Darunias Joy",
				child: true,
				adult: true,
			},
			"GC Pot Freestanding PoH": {
				name: "GC Pot Freestanding PoH",
				child: true,
				adult: true,
			},
			"GC Rolling Goron as Child": {
				name: "GC Rolling Goron as Child",
				child: true,
				adult: true,
			},
			"GC Rolling Goron as Adult": {
				name: "GC Rolling Goron as Adult",
				child: true,
				adult: true,
			},
			"GC Medigoron": { name: "GC Medigoron", child: true, adult: true },
			"GC Maze Left Chest": {
				name: "GC Maze Left Chest",
				child: true,
				adult: true,
			},
			"GC Maze Right Chest": {
				name: "GC Maze Right Chest",
				child: true,
				adult: true,
			},
			"GC Maze Center Chest": {
				name: "GC Maze Center Chest",
				child: true,
				adult: true,
			},
			"GC Deku Scrub Grotto Left": {
				name: "GC Deku Scrub Grotto Left",
				child: true,
				adult: true,
			},
			"GC Deku Scrub Grotto Center": {
				name: "GC Deku Scrub Grotto Center",
				child: true,
				adult: true,
			},
			"GC Deku Scrub Grotto Right": {
				name: "GC Deku Scrub Grotto Right",
				child: true,
				adult: true,
			},
			"GC GS Center Platform": {
				name: "GC GS Center Platform",
				child: true,
				adult: true,
			},
			"GC GS Boulder Maze": {
				name: "GC GS Boulder Maze",
				child: true,
				adult: true,
			},
			"GC Shop Item 1": {
				name: "GC Shop Item 1",
				child: true,
				adult: true,
			},
			"GC Shop Item 2": {
				name: "GC Shop Item 2",
				child: true,
				adult: true,
			},
			"GC Shop Item 3": {
				name: "GC Shop Item 3",
				child: true,
				adult: true,
			},
			"GC Shop Item 4": {
				name: "GC Shop Item 4",
				child: true,
				adult: true,
			},
			"GC Shop Item 5": {
				name: "GC Shop Item 5",
				child: true,
				adult: true,
			},
			"GC Shop Item 6": {
				name: "GC Shop Item 6",
				child: true,
				adult: true,
			},
			"GC Shop Item 7": {
				name: "GC Shop Item 7",
				child: true,
				adult: true,
			},
			"GC Shop Item 8": {
				name: "GC Shop Item 8",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Zora's River": {
		name: "Zora's River",
		child: true,
		adult: true,
		locations: {
			"ZR Magic Bean Salesman": {
				name: "ZR Magic Bean Salesman",
				child: true,
				adult: true,
			},
			"ZR Open Grotto Chest": {
				name: "ZR Open Grotto Chest",
				child: true,
				adult: true,
			},
			"ZR Frogs in the Rain": {
				name: "ZR Frogs in the Rain",
				child: true,
				adult: true,
			},
			"ZR Frogs Ocarina Game": {
				name: "ZR Frogs Ocarina Game",
				child: true,
				adult: true,
			},
			"ZR Near Open Grotto Freestanding PoH": {
				name: "ZR Near Open Grotto Freestanding PoH",
				child: true,
				adult: true,
			},
			"ZR Near Domain Freestanding PoH": {
				name: "ZR Near Domain Freestanding PoH",
				child: true,
				adult: true,
			},
			"ZR Deku Scrub Grotto Front": {
				name: "ZR Deku Scrub Grotto Front",
				child: true,
				adult: true,
			},
			"ZR Deku Scrub Grotto Rear": {
				name: "ZR Deku Scrub Grotto Rear",
				child: true,
				adult: true,
			},
			"ZR GS Tree": { name: "ZR GS Tree", child: true, adult: true },
			"ZR GS Ladder": { name: "ZR GS Ladder", child: true, adult: true },
			"ZR GS Near Raised Grottos": {
				name: "ZR GS Near Raised Grottos",
				child: true,
				adult: true,
			},
			"ZR GS Above Bridge": {
				name: "ZR GS Above Bridge",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Zora's Domain": {
		name: "Zora's Domain",
		child: true,
		adult: true,
		locations: {
			"ZD Diving Minigame": {
				name: "ZD Diving Minigame",
				child: true,
				adult: true,
			},
			"ZD Chest": { name: "ZD Chest", child: true, adult: true },
			"ZD King Zora Thawed": {
				name: "ZD King Zora Thawed",
				child: true,
				adult: true,
			},
			"ZD GS Frozen Waterfall": {
				name: "ZD GS Frozen Waterfall",
				child: true,
				adult: true,
			},
			"ZD Shop Item 1": {
				name: "ZD Shop Item 1",
				child: true,
				adult: true,
			},
			"ZD Shop Item 2": {
				name: "ZD Shop Item 2",
				child: true,
				adult: true,
			},
			"ZD Shop Item 3": {
				name: "ZD Shop Item 3",
				child: true,
				adult: true,
			},
			"ZD Shop Item 4": {
				name: "ZD Shop Item 4",
				child: true,
				adult: true,
			},
			"ZD Shop Item 5": {
				name: "ZD Shop Item 5",
				child: true,
				adult: true,
			},
			"ZD Shop Item 6": {
				name: "ZD Shop Item 6",
				child: true,
				adult: true,
			},
			"ZD Shop Item 7": {
				name: "ZD Shop Item 7",
				child: true,
				adult: true,
			},
			"ZD Shop Item 8": {
				name: "ZD Shop Item 8",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Zora's Fountain": {
		name: "Zora's Fountain",
		child: true,
		adult: true,
		locations: {
			"ZF Great Fairy Reward": {
				name: "ZF Great Fairy Reward",
				child: true,
				adult: true,
			},
			"ZF Iceberg Freestanding PoH": {
				name: "ZF Iceberg Freestanding PoH",
				child: true,
				adult: true,
			},
			"ZF Bottom Freestanding PoH": {
				name: "ZF Bottom Freestanding PoH",
				child: true,
				adult: true,
			},
			"ZF GS Above the Log": {
				name: "ZF GS Above the Log",
				child: true,
				adult: true,
			},
			"ZF GS Tree": { name: "ZF GS Tree", child: true, adult: true },
			"ZF GS Hidden Cave": {
				name: "ZF GS Hidden Cave",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Lake Hylia": {
		name: "Lake Hylia",
		child: true,
		adult: true,
		locations: {
			"LH Underwater Item": {
				name: "LH Underwater Item",
				child: true,
				adult: true,
			},
			"LH Child Fishing": {
				name: "LH Child Fishing",
				child: true,
				adult: true,
			},
			"LH Adult Fishing": {
				name: "LH Adult Fishing",
				child: true,
				adult: true,
			},
			"LH Lab Dive": { name: "LH Lab Dive", child: true, adult: true },
			"LH Freestanding PoH": {
				name: "LH Freestanding PoH",
				child: true,
				adult: true,
			},
			"LH Sun": { name: "LH Sun", child: true, adult: true },
			"LH Deku Scrub Grotto Left": {
				name: "LH Deku Scrub Grotto Left",
				child: true,
				adult: true,
			},
			"LH Deku Scrub Grotto Center": {
				name: "LH Deku Scrub Grotto Center",
				child: true,
				adult: true,
			},
			"LH Deku Scrub Grotto Right": {
				name: "LH Deku Scrub Grotto Right",
				child: true,
				adult: true,
			},
			"LH GS Bean Patch": {
				name: "LH GS Bean Patch",
				child: true,
				adult: true,
			},
			"LH GS Lab Wall": {
				name: "LH GS Lab Wall",
				child: true,
				adult: true,
			},
			"LH GS Small Island": {
				name: "LH GS Small Island",
				child: true,
				adult: true,
			},
			"LH GS Lab Crate": {
				name: "LH GS Lab Crate",
				child: true,
				adult: true,
			},
			"LH GS Tree": { name: "LH GS Tree", child: true, adult: true },
		},
		exits: [],
	},
	"Gerudo Valley": {
		name: "Gerudo Valley",
		child: true,
		adult: true,
		locations: {
			"GV Crate Freestanding PoH": {
				name: "GV Crate Freestanding PoH",
				child: true,
				adult: true,
			},
			"GV Waterfall Freestanding PoH": {
				name: "GV Waterfall Freestanding PoH",
				child: true,
				adult: true,
			},
			"GV Chest": { name: "GV Chest", child: true, adult: true },
			"GV Deku Scrub Grotto Front": {
				name: "GV Deku Scrub Grotto Front",
				child: true,
				adult: true,
			},
			"GV Deku Scrub Grotto Rear": {
				name: "GV Deku Scrub Grotto Rear",
				child: true,
				adult: true,
			},
			"GV Cow": { name: "GV Cow", child: true, adult: true },
			"GV GS Small Bridge": {
				name: "GV GS Small Bridge",
				child: true,
				adult: true,
			},
			"GV GS Bean Patch": {
				name: "GV GS Bean Patch",
				child: true,
				adult: true,
			},
			"GV GS Behind Tent": {
				name: "GV GS Behind Tent",
				child: true,
				adult: true,
			},
			"GV GS Pillar": { name: "GV GS Pillar", child: true, adult: true },
		},
		exits: [],
	},
	"Gerudo's Fortress": {
		name: "Gerudo's Fortress",
		child: true,
		adult: true,
		locations: {
			"GF Chest": { name: "GF Chest", child: true, adult: true },
			"GF HBA 1000 Points": {
				name: "GF HBA 1000 Points",
				child: true,
				adult: true,
			},
			"GF HBA 1500 Points": {
				name: "GF HBA 1500 Points",
				child: true,
				adult: true,
			},
			"GF GS Top Floor": {
				name: "GF GS Top Floor",
				child: true,
				adult: true,
			},
			"GF GS Archery Range": {
				name: "GF GS Archery Range",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Thieves' Hideout": {
		name: "Thieves' Hideout",
		child: true,
		adult: true,
		locations: {
			"Hideout Jail Guard (1 Torch)": {
				name: "Hideout Jail Guard (1 Torch)",
				child: true,
				adult: true,
			},
			"Hideout Jail Guard (2 Torches)": {
				name: "Hideout Jail Guard (2 Torches)",
				child: true,
				adult: true,
			},
			"Hideout Jail Guard (3 Torches)": {
				name: "Hideout Jail Guard (3 Torches)",
				child: true,
				adult: true,
			},
			"Hideout Jail Guard (4 Torches)": {
				name: "Hideout Jail Guard (4 Torches)",
				child: true,
				adult: true,
			},
			"Hideout Gerudo Membership Card": {
				name: "Hideout Gerudo Membership Card",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Haunted Wasteland": {
		name: "Haunted Wasteland",
		child: true,
		adult: true,
		locations: {
			"Wasteland Bombchu Salesman": {
				name: "Wasteland Bombchu Salesman",
				adult: true,
			},
			"Wasteland Chest": {
				name: "Wasteland Chest",
				adult: true,
			},
			"Wasteland GS": { name: "Wasteland GS", adult: true },
		},
		exits: [],
	},
	"Outside Ganon's Castle": {
		name: "Outside Ganon's Castle",
		adult: true,
		locations: {
			"OGC Great Fairy Reward": {
				name: "OGC Great Fairy Reward",
				child: true,
				adult: true,
			},
			"OGC GS": { name: "OGC GS", child: true, adult: true },
		},
		exits: [],
	},
	"Deku Tree": {
		name: "Deku Tree",
		child: true,
		locations: {
			"Deku Tree Map Chest": {
				name: "Deku Tree Map Chest",
				child: true,
				adult: true,
			},
			"Deku Tree Slingshot Room Side Chest": {
				name: "Deku Tree Slingshot Room Side Chest",
				child: true,
				adult: true,
			},
			"Deku Tree Slingshot Chest": {
				name: "Deku Tree Slingshot Chest",
				child: true,
				adult: true,
			},
			"Deku Tree Compass Chest": {
				name: "Deku Tree Compass Chest",
				child: true,
				adult: true,
			},
			"Deku Tree Compass Room Side Chest": {
				name: "Deku Tree Compass Room Side Chest",
				child: true,
				adult: true,
			},
			"Deku Tree Basement Chest": {
				name: "Deku Tree Basement Chest",
				child: true,
				adult: true,
			},
			"Deku Tree GS Compass Room": {
				name: "Deku Tree GS Compass Room",
				child: true,
				adult: true,
			},
			"Deku Tree GS Basement Vines": {
				name: "Deku Tree GS Basement Vines",
				child: true,
				adult: true,
			},
			"Deku Tree GS Basement Gate": {
				name: "Deku Tree GS Basement Gate",
				child: true,
				adult: true,
			},
			"Deku Tree GS Basement Back Room": {
				name: "Deku Tree GS Basement Back Room",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Map Chest": {
				name: "Deku Tree MQ Map Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Slingshot Chest": {
				name: "Deku Tree MQ Slingshot Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Slingshot Room Back Chest": {
				name: "Deku Tree MQ Slingshot Room Back Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Compass Chest": {
				name: "Deku Tree MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Basement Chest": {
				name: "Deku Tree MQ Basement Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Before Spinning Log Chest": {
				name: "Deku Tree MQ Before Spinning Log Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ After Spinning Log Chest": {
				name: "Deku Tree MQ After Spinning Log Chest",
				child: true,
				adult: true,
			},
			"Deku Tree MQ Deku Scrub": {
				name: "Deku Tree MQ Deku Scrub",
				child: true,
				adult: true,
			},
			"Deku Tree MQ GS Lobby": {
				name: "Deku Tree MQ GS Lobby",
				child: true,
				adult: true,
			},
			"Deku Tree MQ GS Compass Room": {
				name: "Deku Tree MQ GS Compass Room",
				child: true,
				adult: true,
			},
			"Deku Tree MQ GS Basement Graves Room": {
				name: "Deku Tree MQ GS Basement Graves Room",
				child: true,
				adult: true,
			},
			"Deku Tree MQ GS Basement Back Room": {
				name: "Deku Tree MQ GS Basement Back Room",
				child: true,
				adult: true,
			},
			"Deku Tree Queen Gohma Heart": {
				name: "Deku Tree Queen Gohma Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Dodongo's Cavern": {
		name: "Dodongo's Cavern",
		child: true,
		adult: true,
		locations: {
			"Dodongos Cavern Map Chest": {
				name: "Dodongos Cavern Map Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Compass Chest": {
				name: "Dodongos Cavern Compass Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Bomb Flower Platform Chest": {
				name: "Dodongos Cavern Bomb Flower Platform Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Bomb Bag Chest": {
				name: "Dodongos Cavern Bomb Bag Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern End of Bridge Chest": {
				name: "Dodongos Cavern End of Bridge Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Deku Scrub Side Room Near Dodongos": {
				name: "Dodongos Cavern Deku Scrub Side Room Near Dodongos",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Deku Scrub Lobby": {
				name: "Dodongos Cavern Deku Scrub Lobby",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Deku Scrub Near Bomb Bag Left": {
				name: "Dodongos Cavern Deku Scrub Near Bomb Bag Left",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Deku Scrub Near Bomb Bag Right": {
				name: "Dodongos Cavern Deku Scrub Near Bomb Bag Right",
				child: true,
				adult: true,
			},
			"Dodongos Cavern GS Side Room Near Lower Lizalfos": {
				name: "Dodongos Cavern GS Side Room Near Lower Lizalfos",
				child: true,
				adult: true,
			},
			"Dodongos Cavern GS Scarecrow": {
				name: "Dodongos Cavern GS Scarecrow",
				child: true,
				adult: true,
			},
			"Dodongos Cavern GS Alcove Above Stairs": {
				name: "Dodongos Cavern GS Alcove Above Stairs",
				child: true,
				adult: true,
			},
			"Dodongos Cavern GS Vines Above Stairs": {
				name: "Dodongos Cavern GS Vines Above Stairs",
				child: true,
				adult: true,
			},
			"Dodongos Cavern GS Back Room": {
				name: "Dodongos Cavern GS Back Room",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Map Chest": {
				name: "Dodongos Cavern MQ Map Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Bomb Bag Chest": {
				name: "Dodongos Cavern MQ Bomb Bag Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Torch Puzzle Room Chest": {
				name: "Dodongos Cavern MQ Torch Puzzle Room Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Larvae Room Chest": {
				name: "Dodongos Cavern MQ Larvae Room Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Compass Chest": {
				name: "Dodongos Cavern MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Under Grave Chest": {
				name: "Dodongos Cavern MQ Under Grave Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Deku Scrub Lobby Front": {
				name: "Dodongos Cavern MQ Deku Scrub Lobby Front",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Deku Scrub Lobby Rear": {
				name: "Dodongos Cavern MQ Deku Scrub Lobby Rear",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Deku Scrub Side Room Near Lower Lizalfos": {
				name: "Dodongos Cavern MQ Deku Scrub Side Room Near Lower Lizalfos",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ Deku Scrub Staircase": {
				name: "Dodongos Cavern MQ Deku Scrub Staircase",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ GS Scrub Room": {
				name: "Dodongos Cavern MQ GS Scrub Room",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ GS Larvae Room": {
				name: "Dodongos Cavern MQ GS Larvae Room",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ GS Lizalfos Room": {
				name: "Dodongos Cavern MQ GS Lizalfos Room",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ GS Song of Time Block Room": {
				name: "Dodongos Cavern MQ GS Song of Time Block Room",
				child: true,
				adult: true,
			},
			"Dodongos Cavern MQ GS Back Area": {
				name: "Dodongos Cavern MQ GS Back Area",
				child: true,
				adult: true,
			},
			"Dodongos Cavern Boss Room Chest": {
				name: "Dodongos Cavern Boss Room Chest",
				child: true,
				adult: true,
			},
			"Dodongos Cavern King Dodongo Heart": {
				name: "Dodongos Cavern King Dodongo Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Jabu Jabu's Belly": {
		name: "Jabu Jabu's Belly",
		child: true,
		locations: {
			"Jabu Jabus Belly Boomerang Chest": {
				name: "Jabu Jabus Belly Boomerang Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly Map Chest": {
				name: "Jabu Jabus Belly Map Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly Compass Chest": {
				name: "Jabu Jabus Belly Compass Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly Deku Scrub": {
				name: "Jabu Jabus Belly Deku Scrub",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly GS Water Switch Room": {
				name: "Jabu Jabus Belly GS Water Switch Room",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly GS Lobby Basement Lower": {
				name: "Jabu Jabus Belly GS Lobby Basement Lower",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly GS Lobby Basement Upper": {
				name: "Jabu Jabus Belly GS Lobby Basement Upper",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly GS Near Boss": {
				name: "Jabu Jabus Belly GS Near Boss",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Map Chest": {
				name: "Jabu Jabus Belly MQ Map Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ First Room Side Chest": {
				name: "Jabu Jabus Belly MQ First Room Side Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Second Room Lower Chest": {
				name: "Jabu Jabus Belly MQ Second Room Lower Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Compass Chest": {
				name: "Jabu Jabus Belly MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Basement Near Switches Chest": {
				name: "Jabu Jabus Belly MQ Basement Near Switches Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Basement Near Vines Chest": {
				name: "Jabu Jabus Belly MQ Basement Near Vines Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Boomerang Room Small Chest": {
				name: "Jabu Jabus Belly MQ Boomerang Room Small Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Boomerang Chest": {
				name: "Jabu Jabus Belly MQ Boomerang Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Falling Like Like Room Chest": {
				name: "Jabu Jabus Belly MQ Falling Like Like Room Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Second Room Upper Chest": {
				name: "Jabu Jabus Belly MQ Second Room Upper Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Near Boss Chest": {
				name: "Jabu Jabus Belly MQ Near Boss Chest",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ Cow": {
				name: "Jabu Jabus Belly MQ Cow",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ GS Boomerang Chest Room": {
				name: "Jabu Jabus Belly MQ GS Boomerang Chest Room",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ GS Tailpasaran Room": {
				name: "Jabu Jabus Belly MQ GS Tailpasaran Room",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ GS Invisible Enemies Room": {
				name: "Jabu Jabus Belly MQ GS Invisible Enemies Room",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly MQ GS Near Boss": {
				name: "Jabu Jabus Belly MQ GS Near Boss",
				child: true,
				adult: true,
			},
			"Jabu Jabus Belly Barinade Heart": {
				name: "Jabu Jabus Belly Barinade Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Bottom of the Well": {
		name: "Bottom of the Well",
		child: true,
		locations: {
			"Bottom of the Well Front Left Fake Wall Chest": {
				name: "Bottom of the Well Front Left Fake Wall Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Front Center Bombable Chest": {
				name: "Bottom of the Well Front Center Bombable Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Back Left Bombable Chest": {
				name: "Bottom of the Well Back Left Bombable Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Underwater Left Chest": {
				name: "Bottom of the Well Underwater Left Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Freestanding Key": {
				name: "Bottom of the Well Freestanding Key",
				child: true,
				adult: true,
			},
			"Bottom of the Well Compass Chest": {
				name: "Bottom of the Well Compass Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Center Skulltula Chest": {
				name: "Bottom of the Well Center Skulltula Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Right Bottom Fake Wall Chest": {
				name: "Bottom of the Well Right Bottom Fake Wall Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Fire Keese Chest": {
				name: "Bottom of the Well Fire Keese Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Like Like Chest": {
				name: "Bottom of the Well Like Like Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Map Chest": {
				name: "Bottom of the Well Map Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Underwater Front Chest": {
				name: "Bottom of the Well Underwater Front Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Invisible Chest": {
				name: "Bottom of the Well Invisible Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well Lens of Truth Chest": {
				name: "Bottom of the Well Lens of Truth Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well GS West Inner Room": {
				name: "Bottom of the Well GS West Inner Room",
				child: true,
				adult: true,
			},
			"Bottom of the Well GS East Inner Room": {
				name: "Bottom of the Well GS East Inner Room",
				child: true,
				adult: true,
			},
			"Bottom of the Well GS Like Like Cage": {
				name: "Bottom of the Well GS Like Like Cage",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ Map Chest": {
				name: "Bottom of the Well MQ Map Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ East Inner Room Freestanding Key": {
				name: "Bottom of the Well MQ East Inner Room Freestanding Key",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ Compass Chest": {
				name: "Bottom of the Well MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ Dead Hand Freestanding Key": {
				name: "Bottom of the Well MQ Dead Hand Freestanding Key",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ Lens of Truth Chest": {
				name: "Bottom of the Well MQ Lens of Truth Chest",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ GS Coffin Room": {
				name: "Bottom of the Well MQ GS Coffin Room",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ GS West Inner Room": {
				name: "Bottom of the Well MQ GS West Inner Room",
				child: true,
				adult: true,
			},
			"Bottom of the Well MQ GS Basement": {
				name: "Bottom of the Well MQ GS Basement",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Forest Temple": {
		name: "Forest Temple",
		adult: true,
		locations: {
			"Forest Temple First Room Chest": {
				name: "Forest Temple First Room Chest",
				child: true,
				adult: true,
			},
			"Forest Temple First Stalfos Chest": {
				name: "Forest Temple First Stalfos Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Raised Island Courtyard Chest": {
				name: "Forest Temple Raised Island Courtyard Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Map Chest": {
				name: "Forest Temple Map Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Well Chest": {
				name: "Forest Temple Well Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Eye Switch Chest": {
				name: "Forest Temple Eye Switch Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Boss Key Chest": {
				name: "Forest Temple Boss Key Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Floormaster Chest": {
				name: "Forest Temple Floormaster Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Red Poe Chest": {
				name: "Forest Temple Red Poe Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Bow Chest": {
				name: "Forest Temple Bow Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Blue Poe Chest": {
				name: "Forest Temple Blue Poe Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Falling Ceiling Room Chest": {
				name: "Forest Temple Falling Ceiling Room Chest",
				child: true,
				adult: true,
			},
			"Forest Temple Basement Chest": {
				name: "Forest Temple Basement Chest",
				child: true,
				adult: true,
			},
			"Forest Temple GS First Room": {
				name: "Forest Temple GS First Room",
				child: true,
				adult: true,
			},
			"Forest Temple GS Lobby": {
				name: "Forest Temple GS Lobby",
				child: true,
				adult: true,
			},
			"Forest Temple GS Raised Island Courtyard": {
				name: "Forest Temple GS Raised Island Courtyard",
				child: true,
				adult: true,
			},
			"Forest Temple GS Level Island Courtyard": {
				name: "Forest Temple GS Level Island Courtyard",
				child: true,
				adult: true,
			},
			"Forest Temple GS Basement": {
				name: "Forest Temple GS Basement",
				child: true,
				adult: true,
			},
			"Forest Temple MQ First Room Chest": {
				name: "Forest Temple MQ First Room Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Wolfos Chest": {
				name: "Forest Temple MQ Wolfos Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Well Chest": {
				name: "Forest Temple MQ Well Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Raised Island Courtyard Lower Chest": {
				name: "Forest Temple MQ Raised Island Courtyard Lower Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Raised Island Courtyard Upper Chest": {
				name: "Forest Temple MQ Raised Island Courtyard Upper Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Boss Key Chest": {
				name: "Forest Temple MQ Boss Key Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Redead Chest": {
				name: "Forest Temple MQ Redead Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Map Chest": {
				name: "Forest Temple MQ Map Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Bow Chest": {
				name: "Forest Temple MQ Bow Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Compass Chest": {
				name: "Forest Temple MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Falling Ceiling Room Chest": {
				name: "Forest Temple MQ Falling Ceiling Room Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ Basement Chest": {
				name: "Forest Temple MQ Basement Chest",
				child: true,
				adult: true,
			},
			"Forest Temple MQ GS First Hallway": {
				name: "Forest Temple MQ GS First Hallway",
				child: true,
				adult: true,
			},
			"Forest Temple MQ GS Raised Island Courtyard": {
				name: "Forest Temple MQ GS Raised Island Courtyard",
				child: true,
				adult: true,
			},
			"Forest Temple MQ GS Level Island Courtyard": {
				name: "Forest Temple MQ GS Level Island Courtyard",
				child: true,
				adult: true,
			},
			"Forest Temple MQ GS Well": {
				name: "Forest Temple MQ GS Well",
				child: true,
				adult: true,
			},
			"Forest Temple MQ GS Block Push Room": {
				name: "Forest Temple MQ GS Block Push Room",
				child: true,
				adult: true,
			},
			"Forest Temple Phantom Ganon Heart": {
				name: "Forest Temple Phantom Ganon Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Fire Temple": {
		name: "Fire Temple",
		adult: true,
		locations: {
			"Fire Temple Near Boss Chest": {
				name: "Fire Temple Near Boss Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Flare Dancer Chest": {
				name: "Fire Temple Flare Dancer Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Boss Key Chest": {
				name: "Fire Temple Boss Key Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Big Lava Room Lower Open Door Chest": {
				name: "Fire Temple Big Lava Room Lower Open Door Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Big Lava Room Blocked Door Chest": {
				name: "Fire Temple Big Lava Room Blocked Door Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Boulder Maze Lower Chest": {
				name: "Fire Temple Boulder Maze Lower Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Boulder Maze Side Room Chest": {
				name: "Fire Temple Boulder Maze Side Room Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Map Chest": {
				name: "Fire Temple Map Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Boulder Maze Shortcut Chest": {
				name: "Fire Temple Boulder Maze Shortcut Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Boulder Maze Upper Chest": {
				name: "Fire Temple Boulder Maze Upper Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Scarecrow Chest": {
				name: "Fire Temple Scarecrow Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Compass Chest": {
				name: "Fire Temple Compass Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Megaton Hammer Chest": {
				name: "Fire Temple Megaton Hammer Chest",
				child: true,
				adult: true,
			},
			"Fire Temple Highest Goron Chest": {
				name: "Fire Temple Highest Goron Chest",
				child: true,
				adult: true,
			},
			"Fire Temple GS Boss Key Loop": {
				name: "Fire Temple GS Boss Key Loop",
				child: true,
				adult: true,
			},
			"Fire Temple GS Song of Time Room": {
				name: "Fire Temple GS Song of Time Room",
				child: true,
				adult: true,
			},
			"Fire Temple GS Boulder Maze": {
				name: "Fire Temple GS Boulder Maze",
				child: true,
				adult: true,
			},
			"Fire Temple GS Scarecrow Climb": {
				name: "Fire Temple GS Scarecrow Climb",
				child: true,
				adult: true,
			},
			"Fire Temple GS Scarecrow Top": {
				name: "Fire Temple GS Scarecrow Top",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Map Room Side Chest": {
				name: "Fire Temple MQ Map Room Side Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Megaton Hammer Chest": {
				name: "Fire Temple MQ Megaton Hammer Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Map Chest": {
				name: "Fire Temple MQ Map Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Near Boss Chest": {
				name: "Fire Temple MQ Near Boss Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Big Lava Room Blocked Door Chest": {
				name: "Fire Temple MQ Big Lava Room Blocked Door Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Boss Key Chest": {
				name: "Fire Temple MQ Boss Key Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Lizalfos Maze Side Room Chest": {
				name: "Fire Temple MQ Lizalfos Maze Side Room Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Compass Chest": {
				name: "Fire Temple MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Lizalfos Maze Upper Chest": {
				name: "Fire Temple MQ Lizalfos Maze Upper Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Lizalfos Maze Lower Chest": {
				name: "Fire Temple MQ Lizalfos Maze Lower Chest",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Freestanding Key": {
				name: "Fire Temple MQ Freestanding Key",
				child: true,
				adult: true,
			},
			"Fire Temple MQ Chest On Fire": {
				name: "Fire Temple MQ Chest On Fire",
				child: true,
				adult: true,
			},
			"Fire Temple MQ GS Big Lava Room Open Door": {
				name: "Fire Temple MQ GS Big Lava Room Open Door",
				child: true,
				adult: true,
			},
			"Fire Temple MQ GS Skull On Fire": {
				name: "Fire Temple MQ GS Skull On Fire",
				child: true,
				adult: true,
			},
			"Fire Temple MQ GS Fire Wall Maze Center": {
				name: "Fire Temple MQ GS Fire Wall Maze Center",
				child: true,
				adult: true,
			},
			"Fire Temple MQ GS Fire Wall Maze Side Room": {
				name: "Fire Temple MQ GS Fire Wall Maze Side Room",
				child: true,
				adult: true,
			},
			"Fire Temple MQ GS Above Fire Wall Maze": {
				name: "Fire Temple MQ GS Above Fire Wall Maze",
				child: true,
				adult: true,
			},
			"Fire Temple Volvagia Heart": {
				name: "Fire Temple Volvagia Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Water Temple": {
		name: "Water Temple",
		adult: true,
		locations: {
			"Water Temple Compass Chest": {
				name: "Water Temple Compass Chest",
				child: true,
				adult: true,
			},
			"Water Temple Map Chest": {
				name: "Water Temple Map Chest",
				child: true,
				adult: true,
			},
			"Water Temple Cracked Wall Chest": {
				name: "Water Temple Cracked Wall Chest",
				child: true,
				adult: true,
			},
			"Water Temple Torches Chest": {
				name: "Water Temple Torches Chest",
				child: true,
				adult: true,
			},
			"Water Temple Boss Key Chest": {
				name: "Water Temple Boss Key Chest",
				child: true,
				adult: true,
			},
			"Water Temple Central Pillar Chest": {
				name: "Water Temple Central Pillar Chest",
				child: true,
				adult: true,
			},
			"Water Temple Central Bow Target Chest": {
				name: "Water Temple Central Bow Target Chest",
				child: true,
				adult: true,
			},
			"Water Temple Longshot Chest": {
				name: "Water Temple Longshot Chest",
				child: true,
				adult: true,
			},
			"Water Temple River Chest": {
				name: "Water Temple River Chest",
				child: true,
				adult: true,
			},
			"Water Temple Dragon Chest": {
				name: "Water Temple Dragon Chest",
				child: true,
				adult: true,
			},
			"Water Temple GS Behind Gate": {
				name: "Water Temple GS Behind Gate",
				child: true,
				adult: true,
			},
			"Water Temple GS Near Boss Key Chest": {
				name: "Water Temple GS Near Boss Key Chest",
				child: true,
				adult: true,
			},
			"Water Temple GS Central Pillar": {
				name: "Water Temple GS Central Pillar",
				child: true,
				adult: true,
			},
			"Water Temple GS Falling Platform Room": {
				name: "Water Temple GS Falling Platform Room",
				child: true,
				adult: true,
			},
			"Water Temple GS River": {
				name: "Water Temple GS River",
				child: true,
				adult: true,
			},
			"Water Temple MQ Longshot Chest": {
				name: "Water Temple MQ Longshot Chest",
				child: true,
				adult: true,
			},
			"Water Temple MQ Map Chest": {
				name: "Water Temple MQ Map Chest",
				child: true,
				adult: true,
			},
			"Water Temple MQ Compass Chest": {
				name: "Water Temple MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Water Temple MQ Central Pillar Chest": {
				name: "Water Temple MQ Central Pillar Chest",
				child: true,
				adult: true,
			},
			"Water Temple MQ Boss Key Chest": {
				name: "Water Temple MQ Boss Key Chest",
				child: true,
				adult: true,
			},
			"Water Temple MQ Freestanding Key": {
				name: "Water Temple MQ Freestanding Key",
				child: true,
				adult: true,
			},
			"Water Temple MQ GS Lizalfos Hallway": {
				name: "Water Temple MQ GS Lizalfos Hallway",
				child: true,
				adult: true,
			},
			"Water Temple MQ GS Before Upper Water Switch": {
				name: "Water Temple MQ GS Before Upper Water Switch",
				child: true,
				adult: true,
			},
			"Water Temple MQ GS River": {
				name: "Water Temple MQ GS River",
				child: true,
				adult: true,
			},
			"Water Temple MQ GS Freestanding Key Area": {
				name: "Water Temple MQ GS Freestanding Key Area",
				child: true,
				adult: true,
			},
			"Water Temple MQ GS Triple Wall Torch": {
				name: "Water Temple MQ GS Triple Wall Torch",
				child: true,
				adult: true,
			},
			"Water Temple Morpha Heart": {
				name: "Water Temple Morpha Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Shadow Temple": {
		name: "Shadow Temple",
		adult: true,
		locations: {
			"Shadow Temple Map Chest": {
				name: "Shadow Temple Map Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Hover Boots Chest": {
				name: "Shadow Temple Hover Boots Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Compass Chest": {
				name: "Shadow Temple Compass Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Early Silver Rupee Chest": {
				name: "Shadow Temple Early Silver Rupee Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Invisible Blades Visible Chest": {
				name: "Shadow Temple Invisible Blades Visible Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Invisible Blades Invisible Chest": {
				name: "Shadow Temple Invisible Blades Invisible Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Falling Spikes Lower Chest": {
				name: "Shadow Temple Falling Spikes Lower Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Falling Spikes Upper Chest": {
				name: "Shadow Temple Falling Spikes Upper Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Falling Spikes Switch Chest": {
				name: "Shadow Temple Falling Spikes Switch Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Invisible Spikes Chest": {
				name: "Shadow Temple Invisible Spikes Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Freestanding Key": {
				name: "Shadow Temple Freestanding Key",
				child: true,
				adult: true,
			},
			"Shadow Temple Wind Hint Chest": {
				name: "Shadow Temple Wind Hint Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple After Wind Enemy Chest": {
				name: "Shadow Temple After Wind Enemy Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple After Wind Hidden Chest": {
				name: "Shadow Temple After Wind Hidden Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Spike Walls Left Chest": {
				name: "Shadow Temple Spike Walls Left Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Boss Key Chest": {
				name: "Shadow Temple Boss Key Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple Invisible Floormaster Chest": {
				name: "Shadow Temple Invisible Floormaster Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple GS Like Like Room": {
				name: "Shadow Temple GS Like Like Room",
				child: true,
				adult: true,
			},
			"Shadow Temple GS Falling Spikes Room": {
				name: "Shadow Temple GS Falling Spikes Room",
				child: true,
				adult: true,
			},
			"Shadow Temple GS Single Giant Pot": {
				name: "Shadow Temple GS Single Giant Pot",
				child: true,
				adult: true,
			},
			"Shadow Temple GS Near Ship": {
				name: "Shadow Temple GS Near Ship",
				child: true,
				adult: true,
			},
			"Shadow Temple GS Triple Giant Pot": {
				name: "Shadow Temple GS Triple Giant Pot",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Early Gibdos Chest": {
				name: "Shadow Temple MQ Early Gibdos Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Map Chest": {
				name: "Shadow Temple MQ Map Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Near Ship Invisible Chest": {
				name: "Shadow Temple MQ Near Ship Invisible Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Compass Chest": {
				name: "Shadow Temple MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Hover Boots Chest": {
				name: "Shadow Temple MQ Hover Boots Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Invisible Blades Invisible Chest": {
				name: "Shadow Temple MQ Invisible Blades Invisible Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Invisible Blades Visible Chest": {
				name: "Shadow Temple MQ Invisible Blades Visible Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Beamos Silver Rupees Chest": {
				name: "Shadow Temple MQ Beamos Silver Rupees Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Falling Spikes Lower Chest": {
				name: "Shadow Temple MQ Falling Spikes Lower Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Falling Spikes Upper Chest": {
				name: "Shadow Temple MQ Falling Spikes Upper Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Falling Spikes Switch Chest": {
				name: "Shadow Temple MQ Falling Spikes Switch Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Invisible Spikes Chest": {
				name: "Shadow Temple MQ Invisible Spikes Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Stalfos Room Chest": {
				name: "Shadow Temple MQ Stalfos Room Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Wind Hint Chest": {
				name: "Shadow Temple MQ Wind Hint Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ After Wind Hidden Chest": {
				name: "Shadow Temple MQ After Wind Hidden Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ After Wind Enemy Chest": {
				name: "Shadow Temple MQ After Wind Enemy Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Boss Key Chest": {
				name: "Shadow Temple MQ Boss Key Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Spike Walls Left Chest": {
				name: "Shadow Temple MQ Spike Walls Left Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Freestanding Key": {
				name: "Shadow Temple MQ Freestanding Key",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ Bomb Flower Chest": {
				name: "Shadow Temple MQ Bomb Flower Chest",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ GS Falling Spikes Room": {
				name: "Shadow Temple MQ GS Falling Spikes Room",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ GS Wind Hint Room": {
				name: "Shadow Temple MQ GS Wind Hint Room",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ GS After Wind": {
				name: "Shadow Temple MQ GS After Wind",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ GS After Ship": {
				name: "Shadow Temple MQ GS After Ship",
				child: true,
				adult: true,
			},
			"Shadow Temple MQ GS Near Boss": {
				name: "Shadow Temple MQ GS Near Boss",
				child: true,
				adult: true,
			},
			"Shadow Temple Bongo Bongo Heart": {
				name: "Shadow Temple Bongo Bongo Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Spirit Temple": {
		name: "Spirit Temple",
		adult: true,
		locations: {
			"Spirit Temple Child Bridge Chest": {
				name: "Spirit Temple Child Bridge Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Child Early Torches Chest": {
				name: "Spirit Temple Child Early Torches Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Child Climb North Chest": {
				name: "Spirit Temple Child Climb North Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Child Climb East Chest": {
				name: "Spirit Temple Child Climb East Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Map Chest": {
				name: "Spirit Temple Map Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Sun Block Room Chest": {
				name: "Spirit Temple Sun Block Room Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Entrance Front Left Chest": {
				name: "Spirit Temple MQ Entrance Front Left Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Entrance Back Right Chest": {
				name: "Spirit Temple MQ Entrance Back Right Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Entrance Front Right Chest": {
				name: "Spirit Temple MQ Entrance Front Right Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Entrance Back Left Chest": {
				name: "Spirit Temple MQ Entrance Back Left Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Map Chest": {
				name: "Spirit Temple MQ Map Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Map Room Enemy Chest": {
				name: "Spirit Temple MQ Map Room Enemy Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Child Climb North Chest": {
				name: "Spirit Temple MQ Child Climb North Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Child Climb South Chest": {
				name: "Spirit Temple MQ Child Climb South Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Compass Chest": {
				name: "Spirit Temple MQ Compass Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Silver Block Hallway Chest": {
				name: "Spirit Temple MQ Silver Block Hallway Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Sun Block Room Chest": {
				name: "Spirit Temple MQ Sun Block Room Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Silver Gauntlets Chest": {
				name: "Spirit Temple Silver Gauntlets Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Compass Chest": {
				name: "Spirit Temple Compass Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Early Adult Right Chest": {
				name: "Spirit Temple Early Adult Right Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple First Mirror Left Chest": {
				name: "Spirit Temple First Mirror Left Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple First Mirror Right Chest": {
				name: "Spirit Temple First Mirror Right Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Statue Room Northeast Chest": {
				name: "Spirit Temple Statue Room Northeast Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Statue Room Hand Chest": {
				name: "Spirit Temple Statue Room Hand Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Near Four Armos Chest": {
				name: "Spirit Temple Near Four Armos Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Hallway Right Invisible Chest": {
				name: "Spirit Temple Hallway Right Invisible Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Hallway Left Invisible Chest": {
				name: "Spirit Temple Hallway Left Invisible Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Child Hammer Switch Chest": {
				name: "Spirit Temple MQ Child Hammer Switch Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Statue Room Lullaby Chest": {
				name: "Spirit Temple MQ Statue Room Lullaby Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Statue Room Invisible Chest": {
				name: "Spirit Temple MQ Statue Room Invisible Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Leever Room Chest": {
				name: "Spirit Temple MQ Leever Room Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Symphony Room Chest": {
				name: "Spirit Temple MQ Symphony Room Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Beamos Room Chest": {
				name: "Spirit Temple MQ Beamos Room Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Chest Switch Chest": {
				name: "Spirit Temple MQ Chest Switch Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Boss Key Chest": {
				name: "Spirit Temple MQ Boss Key Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Mirror Shield Chest": {
				name: "Spirit Temple Mirror Shield Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Boss Key Chest": {
				name: "Spirit Temple Boss Key Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple Topmost Chest": {
				name: "Spirit Temple Topmost Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ Mirror Puzzle Invisible Chest": {
				name: "Spirit Temple MQ Mirror Puzzle Invisible Chest",
				child: true,
				adult: true,
			},
			"Spirit Temple GS Metal Fence": {
				name: "Spirit Temple GS Metal Fence",
				child: true,
				adult: true,
			},
			"Spirit Temple GS Sun on Floor Room": {
				name: "Spirit Temple GS Sun on Floor Room",
				child: true,
				adult: true,
			},
			"Spirit Temple GS Hall After Sun Block Room": {
				name: "Spirit Temple GS Hall After Sun Block Room",
				child: true,
				adult: true,
			},
			"Spirit Temple GS Lobby": {
				name: "Spirit Temple GS Lobby",
				child: true,
				adult: true,
			},
			"Spirit Temple GS Boulder Room": {
				name: "Spirit Temple GS Boulder Room",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ GS Sun Block Room": {
				name: "Spirit Temple MQ GS Sun Block Room",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ GS Leever Room": {
				name: "Spirit Temple MQ GS Leever Room",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ GS Symphony Room": {
				name: "Spirit Temple MQ GS Symphony Room",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ GS Nine Thrones Room West": {
				name: "Spirit Temple MQ GS Nine Thrones Room West",
				child: true,
				adult: true,
			},
			"Spirit Temple MQ GS Nine Thrones Room North": {
				name: "Spirit Temple MQ GS Nine Thrones Room North",
				child: true,
				adult: true,
			},
			"Spirit Temple Twinrova Heart": {
				name: "Spirit Temple Twinrova Heart",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Gerudo Training Ground": {
		name: "Gerudo Training Ground",
		adult: true,
		locations: {
			"Gerudo Training Ground Lobby Left Chest": {
				name: "Gerudo Training Ground Lobby Left Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Lobby Right Chest": {
				name: "Gerudo Training Ground Lobby Right Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Stalfos Chest": {
				name: "Gerudo Training Ground Stalfos Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Before Heavy Block Chest": {
				name: "Gerudo Training Ground Before Heavy Block Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Heavy Block First Chest": {
				name: "Gerudo Training Ground Heavy Block First Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Heavy Block Second Chest": {
				name: "Gerudo Training Ground Heavy Block Second Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Heavy Block Third Chest": {
				name: "Gerudo Training Ground Heavy Block Third Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Heavy Block Fourth Chest": {
				name: "Gerudo Training Ground Heavy Block Fourth Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Eye Statue Chest": {
				name: "Gerudo Training Ground Eye Statue Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Near Scarecrow Chest": {
				name: "Gerudo Training Ground Near Scarecrow Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Hammer Room Clear Chest": {
				name: "Gerudo Training Ground Hammer Room Clear Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Hammer Room Switch Chest": {
				name: "Gerudo Training Ground Hammer Room Switch Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Freestanding Key": {
				name: "Gerudo Training Ground Freestanding Key",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Maze Right Central Chest": {
				name: "Gerudo Training Ground Maze Right Central Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Maze Right Side Chest": {
				name: "Gerudo Training Ground Maze Right Side Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Underwater Silver Rupee Chest": {
				name: "Gerudo Training Ground Underwater Silver Rupee Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Beamos Chest": {
				name: "Gerudo Training Ground Beamos Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Hidden Ceiling Chest": {
				name: "Gerudo Training Ground Hidden Ceiling Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Maze Path First Chest": {
				name: "Gerudo Training Ground Maze Path First Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Maze Path Second Chest": {
				name: "Gerudo Training Ground Maze Path Second Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Maze Path Third Chest": {
				name: "Gerudo Training Ground Maze Path Third Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground Maze Path Final Chest": {
				name: "Gerudo Training Ground Maze Path Final Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Lobby Left Chest": {
				name: "Gerudo Training Ground MQ Lobby Left Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Lobby Right Chest": {
				name: "Gerudo Training Ground MQ Lobby Right Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ First Iron Knuckle Chest": {
				name: "Gerudo Training Ground MQ First Iron Knuckle Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Before Heavy Block Chest": {
				name: "Gerudo Training Ground MQ Before Heavy Block Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Heavy Block Chest": {
				name: "Gerudo Training Ground MQ Heavy Block Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Eye Statue Chest": {
				name: "Gerudo Training Ground MQ Eye Statue Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Ice Arrows Chest": {
				name: "Gerudo Training Ground MQ Ice Arrows Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Second Iron Knuckle Chest": {
				name: "Gerudo Training Ground MQ Second Iron Knuckle Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Flame Circle Chest": {
				name: "Gerudo Training Ground MQ Flame Circle Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Maze Right Central Chest": {
				name: "Gerudo Training Ground MQ Maze Right Central Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Maze Right Side Chest": {
				name: "Gerudo Training Ground MQ Maze Right Side Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Underwater Silver Rupee Chest": {
				name: "Gerudo Training Ground MQ Underwater Silver Rupee Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Dinolfos Chest": {
				name: "Gerudo Training Ground MQ Dinolfos Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Hidden Ceiling Chest": {
				name: "Gerudo Training Ground MQ Hidden Ceiling Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Maze Path First Chest": {
				name: "Gerudo Training Ground MQ Maze Path First Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Maze Path Third Chest": {
				name: "Gerudo Training Ground MQ Maze Path Third Chest",
				child: true,
				adult: true,
			},
			"Gerudo Training Ground MQ Maze Path Second Chest": {
				name: "Gerudo Training Ground MQ Maze Path Second Chest",
				child: true,
				adult: true,
			},
		},
		exits: [],
	},
	"Ganon's Castle": {
		name: "Ganon's Castle",
		adult: true,
		locations: {
			"Ganons Castle Forest Trial Chest": {
				name: "Ganons Castle Forest Trial Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Water Trial Left Chest": {
				name: "Ganons Castle Water Trial Left Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Water Trial Right Chest": {
				name: "Ganons Castle Water Trial Right Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Shadow Trial Front Chest": {
				name: "Ganons Castle Shadow Trial Front Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Shadow Trial Golden Gauntlets Chest": {
				name: "Ganons Castle Shadow Trial Golden Gauntlets Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial First Left Chest": {
				name: "Ganons Castle Light Trial First Left Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial Second Left Chest": {
				name: "Ganons Castle Light Trial Second Left Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial Third Left Chest": {
				name: "Ganons Castle Light Trial Third Left Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial First Right Chest": {
				name: "Ganons Castle Light Trial First Right Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial Second Right Chest": {
				name: "Ganons Castle Light Trial Second Right Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial Third Right Chest": {
				name: "Ganons Castle Light Trial Third Right Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial Invisible Enemies Chest": {
				name: "Ganons Castle Light Trial Invisible Enemies Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Light Trial Lullaby Chest": {
				name: "Ganons Castle Light Trial Lullaby Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Spirit Trial Crystal Switch Chest": {
				name: "Ganons Castle Spirit Trial Crystal Switch Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Spirit Trial Invisible Chest": {
				name: "Ganons Castle Spirit Trial Invisible Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle Deku Scrub Left": {
				name: "Ganons Castle Deku Scrub Left",
				child: true,
				adult: true,
			},
			"Ganons Castle Deku Scrub Center-Left": {
				name: "Ganons Castle Deku Scrub Center-Left",
				child: true,
				adult: true,
			},
			"Ganons Castle Deku Scrub Center-Right": {
				name: "Ganons Castle Deku Scrub Center-Right",
				child: true,
				adult: true,
			},
			"Ganons Castle Deku Scrub Right": {
				name: "Ganons Castle Deku Scrub Right",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Forest Trial Freestanding Key": {
				name: "Ganons Castle MQ Forest Trial Freestanding Key",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Forest Trial Eye Switch Chest": {
				name: "Ganons Castle MQ Forest Trial Eye Switch Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Forest Trial Frozen Eye Switch Chest": {
				name: "Ganons Castle MQ Forest Trial Frozen Eye Switch Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Water Trial Chest": {
				name: "Ganons Castle MQ Water Trial Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Shadow Trial Bomb Flower Chest": {
				name: "Ganons Castle MQ Shadow Trial Bomb Flower Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Shadow Trial Eye Switch Chest": {
				name: "Ganons Castle MQ Shadow Trial Eye Switch Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Light Trial Lullaby Chest": {
				name: "Ganons Castle MQ Light Trial Lullaby Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Spirit Trial First Chest": {
				name: "Ganons Castle MQ Spirit Trial First Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Spirit Trial Invisible Chest": {
				name: "Ganons Castle MQ Spirit Trial Invisible Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Spirit Trial Sun Front Left Chest": {
				name: "Ganons Castle MQ Spirit Trial Sun Front Left Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Spirit Trial Sun Back Left Chest": {
				name: "Ganons Castle MQ Spirit Trial Sun Back Left Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Spirit Trial Sun Back Right Chest": {
				name: "Ganons Castle MQ Spirit Trial Sun Back Right Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Spirit Trial Golden Gauntlets Chest": {
				name: "Ganons Castle MQ Spirit Trial Golden Gauntlets Chest",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Deku Scrub Left": {
				name: "Ganons Castle MQ Deku Scrub Left",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Deku Scrub Center-Left": {
				name: "Ganons Castle MQ Deku Scrub Center-Left",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Deku Scrub Center": {
				name: "Ganons Castle MQ Deku Scrub Center",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Deku Scrub Center-Right": {
				name: "Ganons Castle MQ Deku Scrub Center-Right",
				child: true,
				adult: true,
			},
			"Ganons Castle MQ Deku Scrub Right": {
				name: "Ganons Castle MQ Deku Scrub Right",
				child: true,
				adult: true,
			},
			"Ganons Tower Boss Key Chest": {
				name: "Ganons Tower Boss Key Chest",
				child: true,
				adult: true,
			},
			Ganon: {
				name: "Ganon",
				child: false,
				adult: true,
			},
		},
		exits: [],
	},
};

const getRegions = () => ["Kokiri Forest", "Hyrule Field", "Lake Hylia"];

const getLocationsAtRegion = (region: string) => ["Check 1, Check 2, Check 3"];

export default regions;
export { getRegions, getLocationsAtRegion };
