import createSeed, { sampleSeed } from "../services/createSeed";
import * as trpc from "@trpc/server";
import { z } from "zod";
import parseSeed from "../utils/parseSeed";
import prisma from "../db/client";
import { ParsedSeed } from "../utils/parseSeed";

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
			let seed: ParsedSeed;
			let startingItems: string[] = [];
			if ("sampleSeed" in input) {
				seed = parseSeed(sampleSeed);
				startingItems = Object.keys(sampleSeed.starting_items).flatMap(
					(el) =>
						Array(Math.min(sampleSeed.starting_items[el], 5)).fill(
							el
						)
				);
			} else {
				let apiSeed = await createSeed({
					seed: input.seed,
					settingsString: input.settingsString,
				});
				seed = parseSeed(apiSeed);
				startingItems = Object.keys(apiSeed.starting_items).flatMap(
					(el) =>
						Array(Math.min(apiSeed.starting_items[el], 5)).fill(el)
				);
			}
			const playthrough = await prisma.playthrough.create({
				data: {
					seed: {
						create: {
							...seed,
						},
					},
					known_locations: {},
					// known_medallions: {},
					items: startingItems,
				},
			});

			return {
				id: playthrough.id,
			};
		},
	});

export default router;
