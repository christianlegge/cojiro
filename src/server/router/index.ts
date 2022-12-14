// src/server/router/index.ts
import { createRouter } from "./context";
import { z } from "zod";
import parseSeed, { ParsedSeed } from "../../utils/parseSeed";
import superjson from "superjson";
import { playthroughRouter } from "./playthrough";
import { jwtRouter } from "./jwt";
import createSeed from "../external/createSeed";
import { userRouter } from "./user";

const indexRouter = createRouter().mutation("startPlaythrough", {
	input: z.object({
		seed: z.string().optional(),
		settingsString: z.string(),
	}),
	async resolve({ ctx, input }) {
		let startingItems: string[] = [];

		const apiSeed = await createSeed({
			seed: input.seed,
			settingsString: input.settingsString,
		});
		const seed = parseSeed(apiSeed);
		startingItems = Object.keys(apiSeed.settings.starting_items).flatMap(
			(el) =>
				Array(Math.min(apiSeed.settings.starting_items[el], 5)).fill(el)
		);

		const playthrough = await ctx.prisma.playthrough.create({
			data: {
				seed: {
					create: {
						...seed,
						rawLog: JSON.stringify(apiSeed),
					},
				},
				known_paths: {},
				known_locations: {},
				items: startingItems,
				user: ctx.session?.user
					? {
							connect: { id: ctx.session.user.id },
					  }
					: undefined,
			},
		});

		return {
			id: playthrough.id,
		};
	},
});

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("", indexRouter)
	.merge("playthrough.", playthroughRouter)
	.merge("jwt.", jwtRouter)
	.merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
