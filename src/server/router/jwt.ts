import jwt from "jsonwebtoken";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";
import { env } from "../../env/server.mjs";

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
				const validPlaythroughs: string[] = [];
				for (let i = 0; i < playthroughs.length; i++) {
					const playthrough = await ctx.prisma.playthrough.findUnique(
						{
							where: { id: playthroughs[i] },
						}
					);
					if (playthrough && !playthrough.userId) {
						validPlaythroughs.push(playthroughs[i]);
					}
				}
				const newToken = jwt.sign(
					{ playthroughs: validPlaythroughs },
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
