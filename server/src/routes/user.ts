import * as trpc from "@trpc/server";
import { z } from "zod";
import prisma from "../db/client";
import argon2 from "argon2";
import { TRPCError } from "@trpc/server";

const router = trpc
	.router()
	.mutation("register", {
		input: z.object({
			email: z.string().email({ message: "Invalid email" }),
			password: z
				.string()
				.min(4, { message: "Password must be at least 4 characters" })
				.max(256, {
					message: "Password cannot be longer than 256 characters",
				}),
			username: z
				.string()
				.min(4, { message: "Username must be at least 4 characters" })
				.max(20, {
					message: "Username cannot be longer than 20 characters",
				})
				.regex(/[A-Za-z0-9_-]+/),
		}),
		async resolve({ input }) {
			const passhash = await argon2.hash(input.password);
			const user = await prisma.user.create({
				data: {
					email: input.email,
					passhash,
					username: input.username.toLowerCase(),
					displayname: input.username,
				},
			});
		},
	})
	.mutation("login", {
		input: z.object({
			username: z.string().min(4).max(20),
			password: z.string().min(4).max(256),
		}),
		async resolve({ input }) {
			const user = await prisma.user.findUnique({
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

export default router;
