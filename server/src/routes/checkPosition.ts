import prisma from "../db/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

const router = trpc
	.router()
	.query("get", {
		input: z.object({
			location: z.string(),
		}),
		async resolve({ input }) {
			return await prisma.checkPosition.findUnique({
				where: { location: input.location },
			});
		},
	})
	.mutation("set", {
		input: z.object({
			location: z.string(),
			region: z.string(),
			top: z.number().min(0).max(100),
			left: z.number().min(0).max(100),
			child: z.boolean(),
			adult: z.boolean(),
		}),
		async resolve({ input }) {
			await prisma.checkPosition.upsert({
				where: {
					location: input.location,
				},
				update: {
					...input,
				},
				create: {
					...input,
				},
			});
			return true;
		},
	})
	.query("getAll", {
		async resolve() {
			let allChecks = await prisma.checkPosition.findMany({
				select: { location: true },
			});
			return allChecks.map((el) => el.location);
		},
	});

export default router;
