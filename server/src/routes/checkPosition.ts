import prisma from "../db/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

const router = trpc
	.router()
	.query("get", {
		input: z.object({
			location: z.string(),
		}),
		async resolve({ input }) {},
	})
	.mutation("set", {
		input: z.object({
			location: z.string(),
			region: z.string(),
			top: z.number().min(0).max(100),
			left: z.number().min(0).max(100),
		}),
		async resolve({ input }) {
			await prisma.checkPosition.create({
				data: { ...input },
			});
			return true;
		},
	});

export default router;
