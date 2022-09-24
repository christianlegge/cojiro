import { z } from "zod";
import argon2 from "argon2";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { registerValidation, loginValidation } from "../common/form-validation";
import { Prisma } from "@prisma/client";

export const userRouter = createRouter().query("getPlaythroughs", {
	async resolve({ ctx }) {
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
				playthroughs: true,
			},
		});
		if (!user) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Session valid but user not found",
			});
		}
		return user.playthroughs.map((el) => el.id);
	},
});
