import createSeed, { sampleSeed, SeedReturnType } from "../services/createSeed";
import * as trpc from "@trpc/server";
import { z } from "zod";
import parseSeed from "../util/parseSeed";
import prisma from "../db/client";
import { ParsedSeed } from "../util/parseSeed";

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
			if ("sampleSeed" in input) {
				seed = parseSeed(sampleSeed as SeedReturnType);
			} else {
				seed = await createSeed({
					seed: input.seed,
					settingsString: input.settingsString,
				});
			}
			const playthrough = await prisma.playthrough.create({
				data: {
					seed: {
						create: {
							...seed,
						},
					},
				},
			});

			return {
				id: playthrough.id,
				locations: Object.keys(seed.locations),
				pocket: seed.locations["Links Pocket"],
			};
		},
	});

export default router;
