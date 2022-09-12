import createSeed, { sampleSeed, SeedReturnType } from "../services/createSeed";
import Playthrough, { ISeed } from "../models/Playthrough";
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
			let playthroughDoc = new Playthrough({
				seed: seed,
				checked: [],
				items: [],
			});
			playthroughDoc.save();
			return {
				id: playthroughDoc.id,
				locations: Object.keys(seed.locations),
			};
		},
	});

export default router;
