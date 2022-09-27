import jwt from "jsonwebtoken";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";
import { env } from "../../env/server.mjs";
import type InProgressPlaythrough from "../../types/InProgressPlaythrough";

export const jwtRouter = createRouter()
	.query("getPlaythroughs", {
		input: z.object({
			token: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				const { playthroughs } = jwt.verify(
					input.token,
					env.JWT_SECRET
				) as { playthroughs: string[] };
				const validPlaythroughs: InProgressPlaythrough[] = [];
				for (let i = 0; i < playthroughs.length; i++) {
					const playthrough = await ctx.prisma.playthrough.findUnique(
						{
							where: { id: playthroughs[i] },
							select: {
								items: true,
								userId: true,
								id: true,
								createdAt: true,
								checked: true,
								seed: true,
							},
						}
					);
					if (playthrough && !playthrough.userId) {
						validPlaythroughs.push({
							id: playthrough.id,
							medallions: playthrough.items.filter((el) =>
								el.includes("Medallion")
							),
							startTime: playthrough.createdAt,
							checked: playthrough.checked.filter(
								(loc) =>
									loc in
									(playthrough.seed.locations as Record<
										string,
										string
									>)
							).length,
							locations: Object.keys(
								playthrough.seed.locations as Record<
									string,
									string
								>
							).length,
						});
					}
				}
				const newToken = jwt.sign(
					{ playthroughs: validPlaythroughs.map((el) => el.id) },
					env.JWT_SECRET,
					{
						expiresIn: "3d",
					}
				) as string;
				return {
					playthroughs: validPlaythroughs,
					newToken,
				};
			} catch (err) {
				throw new trpc.TRPCError({
					code: "UNAUTHORIZED",
					message: "Failed to authorize jwt",
				});
			}
		},
	})
	.mutation("addPlaythrough", {
		input: z.object({
			token: z.string().nullable(),
			playthroughId: z.string(),
		}),
		async resolve({ input }) {
			let playthroughs: string[] = [];
			if (input.token) {
				try {
					const decoded = jwt.verify(input.token, env.JWT_SECRET) as {
						playthroughs: string[];
					};
					playthroughs = decoded.playthroughs;
				} catch (err) {
					playthroughs = [];
				}
			}
			playthroughs.push(input.playthroughId);
			return {
				newToken: jwt.sign({ playthroughs }, env.JWT_SECRET, {
					expiresIn: "3d",
				}) as string,
			};
		},
	});
