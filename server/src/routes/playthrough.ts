import * as trpc from "@trpc/server";
import { string, z } from "zod";
import prisma from "../db/client";
import { ParsedSeed } from "../utils/parseSeed";
import parseHint from "../utils/parseHint";

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
				// known_hints: playthrough.known_hints,
				known_woth: playthrough.known_woth,
				known_barren: playthrough.known_barren,
				known_locations: playthrough.known_locations as {
					[key: string]: string;
				},
				// known_medallions: playthrough.known_medallions,
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
			let x = playthrough.known_locations as { [key: string]: string };
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
		async resolve({ input }): Promise<{
			text: string;
			checked: string;
			type: "junk" | "woth" | "barren" | "item";
			region?: string;
			location?: string;
			item?: string;
		}> {
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
			if (playthrough.checked.includes(input.stone)) {
				throw new trpc.TRPCError({
					code: "BAD_REQUEST",
					message: `Playthrough already checked location ${input.stone}`,
				});
			}
			if (!(input.stone in seed.gossip_stones)) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: `Gossip stone ${input.stone} not found in seed`,
				});
			}
			let hint = seed.gossip_stones[input.stone];
			let parsedHint = parseHint(hint);
			let returnObj = {
				type: parsedHint.type,
				text: hint,
				checked: input.stone,
			} as {
				text: string;
				checked: string;
				type: "junk" | "woth" | "barren" | "item";
				region?: string;
				location?: string;
				item?: string;
			};
			let updateObj = {};
			if (parsedHint.type === "junk") {
			} else if (parsedHint.type === "woth") {
				updateObj = { known_woth: { push: parsedHint.region } };
				returnObj = { ...returnObj, region: parsedHint.region };
			} else if (parsedHint.type === "barren") {
				updateObj = { known_barren: { push: parsedHint.region } };
				returnObj = { ...returnObj, region: parsedHint.region };
			} else if (parsedHint.type === "item") {
				updateObj = {
					known_locations: { [parsedHint.location]: parsedHint.item },
				};
				returnObj = {
					...returnObj,
					location: parsedHint.location,
					item: parsedHint.item,
				};
			}
			await prisma.playthrough.update({
				where: { id: playthrough.id },
				data: {
					...updateObj,
					checked: {
						push: input.stone,
					},
				},
			});
			console.log(returnObj);
			return returnObj;
		},
	});

export default router;
