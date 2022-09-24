import { z } from "zod";
import argon2 from "argon2";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { registerValidation, loginValidation } from "../common/form-validation";
import { Prisma } from "@prisma/client";
import type InProgressPlaythrough from "../../types/InProgressPlaythrough";

export const userRouter = createRouter().query("getPlaythroughs", {
	async resolve({ ctx }): Promise<InProgressPlaythrough[]> {
		if (!ctx.session || !ctx.session.user) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "You are not logged in",
			});
		}
		const user = await ctx.prisma.user.findUnique({
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
			checked: el.checked.length,
			locations: Object.keys(el.seed.locations as {}).length,
		}));
	},
});
