import { z } from "zod";
import argon2 from "argon2";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { registerValidation, loginValidation } from "../common/form-validation";
import { Prisma } from "@prisma/client";

export const userRouter = createRouter()
	.mutation("usernameExists", {
		input: z.string(),
		async resolve({ ctx, input }) {
			return !!(await ctx.prisma.user.findUnique({
				where: {
					username: input,
				},
			}));
		},
	})
	.mutation("register", {
		input: registerValidation,
		async resolve({ ctx, input }) {
			const passhash = await argon2.hash(input.password);
			try {
				const user = await ctx.prisma.user.create({
					data: {
						email: input.email,
						passhash,
						username: input.username.toLowerCase(),
						displayname: input.username,
					},
				});
				return { username: user.username };
			} catch (err) {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					if (err.code === "P2002") {
						// failed unique constraint
						if (err.meta && "target" in err.meta) {
							if (
								(err.meta.target as string[]).includes("email")
							) {
								throw new TRPCError({
									code: "CONFLICT",
									message: "email",
								});
							} else if (
								(err.meta.target as string[]).includes(
									"username"
								)
							) {
								throw new TRPCError({
									code: "CONFLICT",
									message: "username",
								});
							}
						}
					}
				}
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Unknown server error",
				});
			}
		},
	})
	.mutation("login", {
		input: loginValidation,
		async resolve({ ctx, input }) {
			const user = await ctx.prisma.user.findUnique({
				where: {
					username: input.username.toLowerCase(),
				},
				select: {
					username: true,
					passhash: true,
				},
			});
			if (!user) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
				});
			}
			if (await argon2.verify(user.passhash, input.password)) {
				return true;
			} else {
				throw new TRPCError({
					code: "UNAUTHORIZED",
				});
			}
		},
	});
