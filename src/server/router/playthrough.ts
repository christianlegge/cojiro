import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ParsedSeed } from "../../utils/parseSeed";
import parseHint from "../../utils/parseHint";

export const playthroughRouter = createRouter()
	.query("get", {
		input: z.object({
			id: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			const playthrough = await ctx.prisma.playthrough.findUnique({
				where: { id: input.id },
				include: { seed: true, user: true },
			});
			if (!playthrough) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			if (playthrough.user) {
				if (
					!ctx.session?.user ||
					ctx.session.user.id !== playthrough.userId
				) {
					throw new TRPCError({
						code: "FORBIDDEN",
						message:
							"You are not authenticated as the owner of this playthrough",
					});
				}
			}
			const seed = playthrough.seed as unknown as ParsedSeed;
			if (!seed) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}

			return {
				checked: playthrough.checked,
				locations: Array.from(Object.keys(seed.locations)),
				items: playthrough.items,
				id: playthrough.id,
				known_woth: playthrough.known_woth,
				known_barren: playthrough.known_barren,
				known_locations: playthrough.known_locations as {
					[key: string]: string;
				},
				known_paths: playthrough.known_paths as {
					[key: string]: string[];
				},
				finished: playthrough.finished,
				finishedAt: playthrough.finishedAt,
				createdAt: playthrough.createdAt,
			};
		},
	})
	.query("getFreestandingItems", {
		input: z.object({
			id: z.string().cuid(),
			locations: z.string().array(),
		}),
		async resolve({ ctx, input }) {
			const playthrough = await ctx.prisma.playthrough.findUnique({
				where: { id: input.id },
				include: { seed: true },
			});
			if (!playthrough) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			const seed = playthrough.seed as unknown as ParsedSeed;
			if (!seed) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			return input.locations.reduce((acc, loc) => {
				if (loc.includes("Freestanding")) {
					return { ...acc, [loc]: seed.locations[loc].item };
				} else {
					return acc;
				}
			}, {} as Record<string, string>);
		},
	})
	.mutation("checkLocation", {
		input: z.object({
			id: z.string().cuid(),
			location: z.string(),
		}),
		async resolve({ ctx, input }) {
			const playthrough = await ctx.prisma.playthrough.findUnique({
				where: { id: input.id },
				include: { seed: true },
			});
			if (!playthrough) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			const seed = playthrough.seed as unknown as ParsedSeed;
			if (!seed) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			if (playthrough.checked.includes(input.location)) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `Playthrough already checked location ${input.location}`,
				});
			}
			let item: string | undefined;
			let known_locations: { [key: string]: string } =
				playthrough.known_locations as { [key: string]: string };
			if (input.location in seed.locations) {
				item = seed.locations[input.location].item;
			} else if (/Check .* Dungeons/.test(input.location)) {
				if (input.location.includes("Medallion")) {
					await ctx.prisma.playthrough.update({
						where: { id: playthrough.id },
						data: {
							checked: {
								push: "Check Stone Dungeons",
							},
						},
					});
				}
				[
					"Queen Gohma",
					"King Dodongo",
					"Barinade",
					"Phantom Ganon",
					"Volvagia",
					"Morpha",
					"Bongo Bongo",
					"Twinrova",
				].forEach((boss) => {
					if (
						input.location.includes("Medallion") ||
						[
							"Kokiri Emerald",
							"Goron Ruby",
							"Zora Sapphire",
						].includes(seed.locations[boss].item)
					)
						known_locations = {
							...known_locations,
							[boss]: seed.locations[boss].item,
						};
				});
			} else if (input.location.includes("GS")) {
				item = "Gold Skulltula Token";
			} else {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Location ${input.location} not found in seed`,
				});
			}
			if (playthrough.finished) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: `Game already finished, but item was: ${item}`,
				});
			}
			if (
				item &&
				(item.includes("Medallion") ||
					["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"].includes(
						item
					))
			) {
				known_locations = {
					...known_locations,
					[input.location]: item,
				};
			}
			await ctx.prisma.playthrough.update({
				where: { id: playthrough.id },
				data: {
					checked: {
						push: input.location,
					},
					items: item
						? {
								push: item,
						  }
						: undefined,
					known_locations,
				},
			});
			return {
				item,
				checked: input.location,
				known_locations,
			};
		},
	})
	.mutation("checkStone", {
		input: z.object({
			id: z.string().cuid(),
			stone: z.string(),
		}),
		async resolve({ ctx, input }): Promise<{
			text: string;
			checked: string;
			type: "junk" | "woth" | "barren" | "item" | "path";
			region?: string;
			location?: string;
			item?: string;
			path_locations?: string[];
		}> {
			const playthrough = await ctx.prisma.playthrough.findUnique({
				where: { id: input.id },
				include: { seed: true },
			});
			if (!playthrough) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Playthrough for ID not found",
				});
			}
			const seed = playthrough.seed as unknown as ParsedSeed;
			if (!seed) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			if (playthrough.checked.includes(input.stone)) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `Playthrough already checked location ${input.stone}`,
				});
			}
			if (!(input.stone in seed.gossip_stones)) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Gossip stone ${input.stone} not found in seed`,
				});
			}
			const hint = seed.gossip_stones[input.stone];
			if (playthrough.finished) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: `Game already finished, but hint was: ${hint.replaceAll(
						"#",
						""
					)}`,
				});
			}
			const parsedHint = parseHint(hint, Object.keys(seed.locations));
			let returnObj = {
				type: parsedHint.type,
				text: hint.replaceAll("#", ""),
				checked: input.stone,
			} as {
				text: string;
				checked: string;
				type: "junk" | "woth" | "barren" | "item" | "path";
				region?: string;
				location?: string;
				item?: string;
				path_locations?: string[];
			};
			let updateObj = {};
			if (parsedHint.type === "junk") {
			} else if (parsedHint.type === "woth") {
				updateObj = { known_woth: { push: parsedHint.region } };
				returnObj = { ...returnObj, region: parsedHint.region };
			} else if (parsedHint.type === "barren") {
				updateObj = { known_barren: { push: parsedHint.region } };
				returnObj = { ...returnObj, region: parsedHint.region };
			} else if (parsedHint.type === "path") {
				updateObj = {
					known_paths: {
						...(playthrough.known_paths as {
							[key: string]: string[];
						}),
						[parsedHint.region]: [
							...(parsedHint.region in
							(playthrough.known_paths as {
								[key: string]: string[];
							})
								? (
										playthrough.known_paths as {
											[key: string]: string[];
										}
								  )[parsedHint.region]
								: []),
							parsedHint.location,
						],
					},
				};
				returnObj = {
					...returnObj,
					region: parsedHint.region,
					path_locations: [
						...(parsedHint.region in
						(playthrough.known_paths as {
							[key: string]: string[];
						})
							? (
									playthrough.known_paths as {
										[key: string]: string[];
									}
							  )[parsedHint.region]
							: []),
						parsedHint.location,
					],
				};
			} else if (parsedHint.type === "item") {
				updateObj = {
					known_locations: {
						...(playthrough.known_locations as {
							[key: string]: string;
						}),
						[parsedHint.location]: parsedHint.item,
					},
				};

				returnObj = {
					...returnObj,
					location: parsedHint.location,
					item: parsedHint.item,
				};
			}
			await ctx.prisma.playthrough.update({
				where: { id: playthrough.id },
				data: {
					...updateObj,
					checked: {
						push: input.stone,
					},
				},
			});
			// console.log(returnObj);
			return returnObj;
		},
	})
	.mutation("beatGanon", {
		input: z.object({
			id: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			await ctx.prisma.playthrough.updateMany({
				where: { id: input.id, finished: false },
				data: {
					finished: true,
					finishedAt: new Date(),
					checked: {
						push: "Ganon",
					},
				},
			});
		},
	});
