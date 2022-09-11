import express from "express";
import mongoose, { HydratedDocument } from "mongoose";
import Playthrough, { IPlaythrough } from "../models/Playthrough";
import Seed, { ISeed } from "../models/Seed";
import * as trpc from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";

// declare global {
// 	namespace Express {
// 		export interface Request {
// 			seed?: HydratedDocument<ISeed>;
// 			playthrough?: HydratedDocument<IPlaythrough>;
// 		}
// 	}
// }

export async function createContext(
	opts?: trpcExpress.CreateExpressContextOptions
) {
	return { playthroughId: "test id" };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const router = trpc
	.router()
	.query("get", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			let playthrough = await Playthrough.findById(input.id);
			if (!playthrough) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			let seed = await Seed.findById(playthrough.seed);
			if (!seed) {
				throw new trpc.TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			return {
				checked: playthrough.checked,
				locations: Array.from(seed.locations.keys()),
				items: playthrough.items,
				id: playthrough.id,
			};
		},
	})
	.mutation("checkLocation", {
		input: z.object({
			id: z.string(),
			location: z.string(),
		}),
		async resolve({ input }) {
			let playthrough = await Playthrough.findById(input.id);
			if (!playthrough) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			let seed = await Seed.findById(playthrough.seed);
			if (!seed) {
				throw new trpc.TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			if (playthrough.checked.includes(input.location)) {
				throw new trpc.TRPCError({
					code: "BAD_REQUEST",
					message: `Playthrough already checked location ${input.location}`,
				});
			}
			if (!seed.locations.has(input.location)) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: `Location ${input.location} not found in seed`,
				});
			}
			let item = seed.locations.get(input.location)!.item;
			playthrough.checked.push(input.location);
			playthrough.items.push(item);
			playthrough.save();
			return {
				item,
				checked: input.location,
			};
		},
	})
	.mutation("checkStone", {
		input: z.object({
			id: z.string(),
			stone: z.string(),
		}),
		async resolve({ input }) {},
	});

// router.get("/getAllItems", async (req, res) => {
// 	let allItems = req.seed.locations.map((el) => el.item);
// 	req.playthrough.items = allItems;
// 	req.playthrough.save();
// 	res.send(allItems);
// });

// router.get("/checkStone", async (req, res) => {
// 	if (!req.query.stone) {
// 		res.status(400).send("Request missing stone parameter");
// 		return;
// 	}
// 	if (req.playthrough.checked.includes(req.query.stone)) {
// 		res.status(400).send(
// 			`Playthrough already checked stone ${req.query.stone}`
// 		);
// 		return;
// 	}
// 	let hint = req.seed.gossip_stones.find(
// 		(el) => el.stone === req.query.stone
// 	);
// 	if (!hint) {
// 		res.status(400).send(
// 			`stone ${req.query.stone} not found in playthrough`
// 		);
// 		return;
// 	}
// 	req.playthrough.checked.push(req.query.stone);
// 	req.playthrough.known_hints.push(hint);
// 	req.playthrough.save();
// 	res.send(hint);
// });

export default router;
