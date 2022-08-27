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
	let seed = sampleSeed;
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
	});
	playthroughDocument.save();
	res.send(playthroughDocument.id);
});

router.get("/checkLocation", async (req, res) => {
	if (
		!req.query.id ||
		!req.query.location ||
		!mongoose.isValidObjectId(req.query.id)
	) {
		res.sendStatus(400);
		return;
	}
	let playthrough = await Playthrough.findById(req.query.id);
	if (!playthrough) {
		res.sendStatus(404);
		return;
	}
	let seed = await Seed.findById(playthrough.seed);
	if (!seed) {
		res.sendStatus(500);
		return;
	}
	let loc = seed.locations.find((el) => el.location === req.query.location);
	if (!loc) {
		res.sendStatus(400);
		return;
	}
	res.send(loc.item);
});

export default router;
