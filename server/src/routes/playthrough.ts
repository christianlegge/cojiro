import express from "express";
import mongoose, { HydratedDocument } from "mongoose";
import Playthrough, { IPlaythrough } from "../models/Playthrough";
import Seed, { ISeed } from "../models/Seed";

declare global {
	namespace Express {
		export interface Request {
			seed?: HydratedDocument<ISeed>;
			playthrough?: HydratedDocument<IPlaythrough>;
		}
	}
}

let router = express.Router();

router.use(async (req, res, next) => {
	if (!req.query.id) {
		return res.status(400).send("Request missing playthrough ID");
	}
	if (!mongoose.isValidObjectId(req.query.id)) {
		return res
			.status(400)
			.send(`${req.query.id} is not a valid MongoDB ObjectID`);
	}
	let playthrough = await Playthrough.findById(req.query.id);
	if (!playthrough) {
		return res
			.status(404)
			.send(`Playthrough with ID ${req.query.id} not found`);
	}
	let seed = await Seed.findById(playthrough.seed);
	if (!seed) {
		return res
			.status(500)
			.send("Seed data not present in playthrough object");
	}
	req.seed = seed;
	req.playthrough = playthrough;
	next();
});

router.get("/getPlaythrough", async (req, res) => {
	res.send({
		checked: req.playthrough.checked,
		locations: req.seed.locations.map((el) => el.location),
		items: req.playthrough.items,
		id: req.playthrough.id,
	});
});

router.get("/checkLocation", async (req, res) => {
	if (!req.query.location) {
		res.status(400).send("Request missing location parameter");
		return;
	}
	if (req.playthrough.checked.includes(req.query.location)) {
		res.status(400).send(
			`Playthrough already checked location ${req.query.location}`
		);
		return;
	}
	let loc = req.seed.locations.find(
		(el) => el.location === req.query.location
	);
	if (!loc) {
		res.status(400).send(
			`Location ${req.query.location} not found in playthrough`
		);
		return;
	}
	req.playthrough.checked.push(req.query.location);
	req.playthrough.items.push(loc.item);
	req.playthrough.save();
	res.send(loc.item);
});

router.get("/getAllItems", async (req, res) => {
	let allItems = req.seed.locations.map((el) => el.item);
	req.playthrough.items = allItems;
	req.playthrough.save();
	res.send(allItems);
});

export default router;
