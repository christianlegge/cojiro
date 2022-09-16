import * as trpc from "@trpc/server";
import { z } from "zod";
import prisma from "../db/client";
import { ParsedSeed } from "../util/parseSeed";

const router = trpc
	.router()
	.query("get", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			let playthrough = await prisma.playthrough.findUnique({
				where: { id: input.id },
				include: { seed: true },
			});
			if (!playthrough) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			let seed = playthrough.seed as unknown as ParsedSeed;
			if (!seed) {
				throw new trpc.TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			return {
				checked: playthrough.checked,
				locations: Array.from(Object.keys(seed.locations)),
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
			let playthrough = await prisma.playthrough.findUnique({
				where: { id: input.id },
				include: { seed: true },
			});
			if (!playthrough) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			let seed = playthrough.seed as unknown as ParsedSeed;
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
			let item: string;
			if (input.location in seed.locations) {
				item = seed.locations[input.location].item;
			} else if (input.location.includes("GS")) {
				item = "Gold Skulltula Token";
			} else {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: `Location ${input.location} not found in seed`,
				});
			}
			await prisma.playthrough.update({
				where: { id: playthrough.id },
				data: {
					checked: {
						push: input.location,
					},
					items: {
						push: item,
					},
				},
			});
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

export default router;
