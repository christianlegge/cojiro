import { TRPCError } from "@trpc/server";
import type InProgressPlaythrough from "~/types/InProgressPlaythrough";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
	getPlaythroughs: protectedProcedure.query(
		async ({ ctx }): Promise<InProgressPlaythrough[]> => {
			if (!ctx.session || !ctx.session.user) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You are not logged in",
				});
			}
			const user = await ctx.db.user.findUnique({
				where: {
					id: ctx.session.user.id,
				},
				select: {
					playthroughs: {
						include: {
							seed: true,
						},
					},
				},
			});
			if (!user) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Session valid but user not found",
				});
			}
			return user.playthroughs.map((el) => ({
				id: el.id,
				medallions: el.items.filter((item) => item.includes("Medallion")),
				startTime: el.createdAt,
				checked: el.checked.filter(
					(loc) => loc in (el.seed.locations as Record<string, string>)
				).length,
				locations: Object.keys(el.seed.locations as Record<string, string>)
					.length,
			}));
		}
	),
});
