import { TRPCError } from "@trpc/server";
import { z } from "zod";
import parseSeed, { ParsedSeed } from "~/utils/parseSeed";
import createSeed from "~/server/external/createSeed";
import parseHint from "~/utils/parseHint";
import regions from "~/utils/regions";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import settingsPresets from "~/server/external/apiSettingPresets";

export const playthroughRouter = createTRPCRouter({
	startPlaythrough: publicProcedure
		.input(
			z.object({ seed: z.string().optional(), settingsPreset: z.string() })
		)
		.mutation(async ({ ctx, input }) => {
			let startingItems: string[] = [];
			console.log("startPlaythrough", input.settingsPreset);

			const apiSeed = await createSeed({
				seed: input.seed,
				settingsPreset: input.settingsPreset as keyof typeof settingsPresets,
			});
			console.log("apiSeed", apiSeed);
			const seed = parseSeed(apiSeed);
			startingItems = Object.keys(
				apiSeed.settings.starting_items
			).flatMap<string>(
				(el) =>
					Array(Math.min(apiSeed.settings.starting_items[el]!, 5)).fill(
						el
					) as string[]
			);

			const playthrough = await ctx.db.playthrough.create({
				data: {
					seed: {
						create: {
							...seed,
							rawLog: JSON.stringify(apiSeed),
						},
					},
					known_paths: {},
					known_locations: {},
					known_barren: [],
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
		}),
	getPlaythrough: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
			})
		)
		.query(async ({ ctx, input }) => {
			const playthrough = await ctx.db.playthrough.findUnique({
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
				if (!ctx.session?.user || ctx.session.user.id !== playthrough.userId) {
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
				known_locations: playthrough.known_locations as Record<string, string>,
				known_paths: playthrough.known_paths as Record<string, string[]>,
				finished: playthrough.finished,
				finishedAt: playthrough.finishedAt,
				createdAt: playthrough.createdAt,
			};
		}),
	getFreestandingItems: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
				locations: z.string().array(),
			})
		)
		.query(async ({ ctx, input }) => {
			const playthrough = await ctx.db.playthrough.findUnique({
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
				if (!ctx.session?.user || ctx.session.user.id !== playthrough.userId) {
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
			return input.locations.reduce((acc, loc) => {
				if (loc.includes("Freestanding")) {
					return { ...acc, [loc]: seed.locations[loc]!.item };
				} else {
					return acc;
				}
			}, {} as Record<string, string>);
		}),

	checkLocation: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
				location: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const playthrough = await ctx.db.playthrough.findUnique({
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
				if (!ctx.session?.user || ctx.session.user.id !== playthrough.userId) {
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
			if (playthrough.checked.includes(input.location)) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `Playthrough already checked location ${input.location}`,
				});
			}
			let item: string | undefined;
			let known_locations: Record<string, string> =
				playthrough.known_locations as Record<string, string>;
			if (input.location in seed.locations) {
				item = seed.locations[input.location]!.item;
			} else if (/Check .* Dungeons/.test(input.location)) {
				if (input.location.includes("Medallion")) {
					await ctx.db.playthrough.update({
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
						["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"].includes(
							seed.locations[boss]!.item
						)
					)
						known_locations = {
							...known_locations,
							[boss]: seed.locations[boss]!.item,
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
					["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"].includes(item))
			) {
				known_locations = {
					...known_locations,
					[input.location]: item,
				};
			}
			await ctx.db.playthrough.update({
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
		}),

	checkStone: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
				stone: z.string(),
			})
		)
		.mutation(
			async ({
				ctx,
				input,
			}): Promise<{
				text: string;
				checked: string;
				type: "junk" | "woth" | "barren" | "item" | "path";
				region?: string;
				location?: string;
				item?: string;
				path_locations?: string[];
			}> => {
				const playthrough = await ctx.db.playthrough.findUnique({
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
						message: `Game already finished, but hint was: ${hint!.replaceAll(
							"#",
							""
						)}`,
					});
				}
				const parsedHint = parseHint(hint!, Object.keys(seed.locations));
				let returnObj = {
					type: parsedHint.type,
					text: hint!.replaceAll("#", ""),
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
							...(playthrough.known_paths as Record<string, string[]>),
							[parsedHint.region]: [
								...(parsedHint.region in
								(playthrough.known_paths as Record<string, string[]>)
									? (playthrough.known_paths as Record<string, string[]>)[
											parsedHint.region
									  ]
									: [])!,
								parsedHint.location,
							],
						},
					};
					returnObj = {
						...returnObj,
						region: parsedHint.region,
						path_locations: [
							...(parsedHint.region in
							(playthrough.known_paths as Record<string, string[]>)
								? (playthrough.known_paths as Record<string, string[]>)[
										parsedHint.region
								  ]
								: [])!,
							parsedHint.location,
						],
					};
				} else if (parsedHint.type === "item") {
					updateObj = {
						known_locations: {
							...(playthrough.known_locations as Record<string, string>),
							[parsedHint.location]: parsedHint.item,
						},
					};

					returnObj = {
						...returnObj,
						location: parsedHint.location,
						item: parsedHint.item,
					};
				}
				await ctx.db.playthrough.update({
					where: { id: playthrough.id },
					data: {
						...updateObj,
						checked: {
							push: input.stone,
						},
					},
				});
				return returnObj;
			}
		),

	checkLightArrowsHint: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const playthrough = await ctx.db.playthrough.findUnique({
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
				if (!ctx.session?.user || ctx.session.user.id !== playthrough.userId) {
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
			if (playthrough.checked.includes("Light Arrows Hint")) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `Playthrough already checked Light Arrows Hint`,
				});
			}
			let lightArrowsRegion = "";
			try {
				const lightArrowsLocation = Object.keys(seed.locations).filter(
					(loc) => seed.locations[loc]!.item === "Light Arrows"
				)[0];
				lightArrowsRegion = Object.keys(regions).filter((region) =>
					Object.keys(regions[region]!.locations).includes(lightArrowsLocation!)
				)[0]!;
			} catch (err) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Unable to find Light Arrows in seed",
				});
			}
			if (playthrough.finished) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: `Game already finished, but Light Arrows were in ${lightArrowsRegion}`,
				});
			}
			await ctx.db.playthrough.update({
				where: { id: playthrough.id },
				data: {
					known_locations: {
						...(playthrough.known_locations as Record<string, string>),
						[lightArrowsRegion]: "Light Arrows",
					},
					checked: {
						push: "Light Arrows Hint",
					},
				},
			});
			return {
				region: lightArrowsRegion,
				message: `Ha ha ha... You'll never beat me by reflecting my lightning bolts and unleashing the arrows from ${lightArrowsRegion}!`,
			};
		}),
	beatGanon: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const playthrough = await ctx.db.playthrough.findUnique({
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
				if (!ctx.session?.user || ctx.session.user.id !== playthrough.userId) {
					throw new TRPCError({
						code: "FORBIDDEN",
						message:
							"You are not authenticated as the owner of this playthrough",
					});
				}
			}
			await ctx.db.playthrough.updateMany({
				where: { id: input.id, finished: false },
				data: {
					finished: true,
					finishedAt: new Date(),
					checked: {
						push: "Ganon",
					},
				},
			});
		}),

	downloadLog: publicProcedure
		.input(
			z.object({
				id: z.string().cuid(),
			})
		)
		.query(async ({ ctx, input }) => {
			const playthrough = await ctx.db.playthrough.findUnique({
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
				if (!ctx.session?.user || ctx.session.user.id !== playthrough.userId) {
					throw new TRPCError({
						code: "FORBIDDEN",
						message:
							"You are not authenticated as the owner of this playthrough",
					});
				}
			}
			if (!playthrough.seed) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Playthrough corrupt: seed missing",
				});
			}
			if (!playthrough.seed.rawLog) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Raw log not found on seed",
				});
			}
			return {
				log: playthrough.seed.rawLog,
			};
		}),
});
