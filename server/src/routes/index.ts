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

export default router;
