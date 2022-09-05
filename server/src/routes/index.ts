import axios from "axios";
import express from "express";
import createSeed, { sampleSeed } from "../services/createSeed";
import Playthrough from "../models/Playthrough";
import Seed from "../models/Seed";
import mongoose from "mongoose";

type Locations = {
	[location: string]: string | { item: string; price: number };
};

let router = express.Router();

router.get("/", async (req, res) => {
	let seed = await createSeed({
		settingsString:
			"AJTWXCHYKAA8KLAHJAASAECCWCHGLTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAYMASBFAB",
	});
	console.log(seed);
	res.send(seed);
});

router.get("/getSampleSeed", (req, res) => {
	res.send(sampleSeed);
});

router.get("/startPlaythrough", async (req, res) => {
	let seed: typeof sampleSeed;
	if (req.query.sampleSeed) {
		seed = sampleSeed;
	} else {
		if (!req.query.settingsString) {
			return res.status(400).send("Request must include settings string");
		}
		try {
			seed = await createSeed({
				seed: req.query.seed as string,
				settingsString: req.query.settingsString as string,
			});
		} catch (err) {
			if (
				err.response.status === 403 &&
				err.response.data.includes("Invalid API Key")
			) {
				return res
					.status(500)
					.send(
						"Invalid API key - this is a server issue, please report this!"
					);
			} else if (
				err.response.status === 400 &&
				err.response.data.includes("settings_string")
			) {
				return res.status(400).send("Invalid settings string!");
			} else if (
				err.response.status === 403 &&
				err.response.data.includes("once every")
			) {
				return res
					.status(429)
					.send("Rate limited - try again in 5 seconds.");
			} else {
				console.log(err);
				return res
					.status(500)
					.send("Unknown server error - please report this!");
			}
		}
	}
	let locations = seed.locations as Locations;
	let locArray = Object.keys(seed.locations).map((key) => {
		let el = locations[key];
		if (typeof el === "string") {
			return { location: key, item: el };
		} else {
			return { location: key, item: el.item, price: el.price };
		}
	});
	let seedDocument = new Seed({
		locations: Object.keys(seed.locations).map((key) => {
			let el = locations[key];
			if (typeof el === "string") {
				return { location: key, item: el };
			} else {
				return { location: key, item: el.item, price: el.price };
			}
		}),
	});
	seedDocument.save();
	let playthroughDocument = new Playthrough({
		seed: seedDocument,
		checked: [],
		items: [],
	});
	playthroughDocument.save();
	res.send({
		id: playthroughDocument.id,
		locations: seedDocument.locations.map((el) => el.location),
	});
});

router.get("/getPlaythrough", async (req, res) => {
	if (!req.query.id) {
		res.status(400).send("Request missing playthrough ID");
		return;
	}
	if (!mongoose.isValidObjectId(req.query.id)) {
		res.status(400).send(`${req.query.id} is not a valid MongoDB ObjectID`);
		return;
	}
	let playthrough = await Playthrough.findById(req.query.id);
	if (!playthrough) {
		res.status(404).send(`Playthrough with ID ${req.query.id} not found`);
		return;
	}
	let seed = await Seed.findById(playthrough.seed);
	if (!seed) {
		res.status(500).send("Seed data not present in playthrough object");
		return;
	}
	res.send({
		checked: playthrough.checked,
		locations: seed.locations.map((el) => el.location),
		items: playthrough.items,
		id: playthrough.id,
	});
});

router.get("/checkLocation", async (req, res) => {
	if (
		!req.query.id ||
		!req.query.location ||
		!mongoose.isValidObjectId(req.query.id)
	) {
		res.status(400).send("Request needs location and valid playthrough ID");
		return;
	}
	let playthrough = await Playthrough.findById(req.query.id);
	if (!playthrough) {
		res.status(404).send(`Playthrough not found with ID ${req.query.id}`);
		return;
	}
	if (playthrough.checked.includes(req.query.location)) {
		res.status(400).send(
			`Playthrough already checked location ${req.query.location}`
		);
		return;
	}
	let seed = await Seed.findById(playthrough.seed);
	if (!seed) {
		res.status(500).send("Seed data not present in playthrough object");
		return;
	}
	let loc = seed.locations.find((el) => el.location === req.query.location);
	if (!loc) {
		res.status(400).send(
			`Location ${req.query.location} not found in playthrough`
		);
		return;
	}
	playthrough.checked.push(req.query.location);
	playthrough.items.push(loc.item);
	playthrough.save();
	res.send(loc.item);
});

router.get("/getAllItems", async (req, res) => {
	if (!req.query.id || !mongoose.isValidObjectId(req.query.id)) {
		res.status(400).send("Request needs location and valid playthrough ID");
		return;
	}
	let playthrough = await Playthrough.findById(req.query.id);
	if (!playthrough) {
		res.status(404).send(`Playthrough not found with ID ${req.query.id}`);
		return;
	}
	if (playthrough.checked.includes(req.query.location)) {
		res.status(400).send(
			`Playthrough already checked location ${req.query.location}`
		);
		return;
	}
	let seed = await Seed.findById(playthrough.seed);
	if (!seed) {
		res.status(500).send("Seed data not present in playthrough object");
		return;
	}
	let allItems = seed.locations.map((el) => el.item);
	playthrough.items = allItems;
	playthrough.save();
	res.send(allItems);
});

export default router;
