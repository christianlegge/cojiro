import axios from "axios";
import express from "express";
import createSeed, { sampleSeed, SeedReturnType } from "../services/createSeed";
import Playthrough from "../models/Playthrough";
import Seed, { ISeed } from "../models/Seed";
import * as trpc from "@trpc/server";
import { z } from "zod";
import parseSeed from "../util/parseSeed";

const router = trpc
	.router()
	.query("getSampleSeed", {
		async resolve() {
			return sampleSeed;
		},
	})
	.mutation("startPlaythrough", {
		input: z
			.object({
				sampleSeed: z.literal(true),
			})
			.or(
				z.object({
					seed: z.string().optional(),
					settingsString: z.string(),
				})
			),
		async resolve({ input }) {
			let seed: ISeed;
			if ("sampleSeed" in input) {
				seed = parseSeed(sampleSeed as SeedReturnType);
			} else {
				seed = await createSeed({
					seed: input.seed,
					settingsString: input.settingsString,
				});
			}
			let seedDoc = new Seed(seed);
			seedDoc.save();
			let playthroughDoc = new Playthrough({
				seed: seedDoc,
				checked: [],
				items: [],
			});
			return {
				id: playthroughDoc.id,
				locations: Object.keys(seed.locations),
			};
		},
	});

// type Locations = {
// 	[location: string]: string | { item: string; price: number };
// };

// type GossipStones = {
// 	[stone: string]: { text: string; colors: string[] };
// };

// let router = express.Router();

// router.get("/", async (req, res) => {
// 	try {
// 		let seed = await createSeed({
// 			settingsString:
// 				"AJTWXCHYKAA8KLAHJAASAECCWCHGLTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAYMASBFAB",
// 		});

// 		res.send(seed);
// 	} catch (err) {
// 		res.status(500).send(err);
// 	}
// });

// // router.get("/getSampleSeed", (req, res) => {
// // 	res.send(sampleSeed);
// // });

// router.get("/startPlaythrough", async (req, res, next) => {
// 	let seed: typeof sampleSeed;
// 	if (req.query.sampleSeed) {
// 		seed = sampleSeed;
// 	} else {
// 		if (!req.query.settingsString) {
// 			return res.status(400).send("Request must include settings string");
// 		}
// 		try {
// 			seed = await createSeed({
// 				seed: req.query.seed as string,
// 				settingsString: req.query.settingsString as string,
// 			});
// 		} catch (err) {
// 			next(err);
// 			// if (
// 			// 	err.response.status === 403 &&
// 			// 	err.response.data.includes("Invalid API Key")
// 			// ) {
// 			// 	return res
// 			// 		.status(500)
// 			// 		.send(
// 			// 			"Invalid API key - this is a server issue, please report this!"
// 			// 		);
// 			// } else if (
// 			// 	err.response.status === 400 &&
// 			// 	err.response.data.includes("settings_string")
// 			// ) {
// 			// 	return res.status(400).send("Invalid settings string!");
// 			// } else if (
// 			// 	err.response.status === 403 &&
// 			// 	err.response.data.includes("once every")
// 			// ) {
// 			// 	return res
// 			// 		.status(429)
// 			// 		.send("Rate limited - try again in 5 seconds.");
// 			// } else {
// 			// 	console.log(err);
// 			// 	return res
// 			// 		.status(500)
// 			// 		.send("Unknown server error - please report this!");
// 			// }
// 			return;
// 		}
// 	}
// 	let locations = seed.locations as Locations;
// 	let locArray = Object.keys(locations).map((key) => {
// 		let el = locations[key];
// 		if (typeof el === "string") {
// 			return { location: key, item: el };
// 		} else {
// 			return { location: key, item: el.item, price: el.price };
// 		}
// 	});
// 	let gossip_stones = seed.gossip_stones as GossipStones;
// 	let stoneArray = Object.keys(gossip_stones).map((stone) => ({
// 		stone: stone,
// 		hint: gossip_stones[stone].text,
// 	}));
// 	let seedDocument = new Seed({
// 		locations: locArray,
// 		gossip_stones: stoneArray,
// 	});
// 	seedDocument.save();
// 	let playthroughDocument = new Playthrough({
// 		seed: seedDocument,
// 		checked: [],
// 		items: [],
// 	});
// 	playthroughDocument.save();
// 	res.send({
// 		id: playthroughDocument.id,
// 		locations: seedDocument.locations.map((el) => el.location),
// 	});
// });

export default router;
