import { z } from "zod";
import { createRouter } from "./context";

const router = createRouter()
	.query("get", {
		input: z.object({
			location: z.string(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.checkPosition.findUnique({
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
		async resolve({ ctx, input }) {
			await ctx.prisma.checkPosition.upsert({
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
		async resolve({ ctx }) {
			const allChecks = await ctx.prisma.checkPosition.findMany({
				select: { location: true },
			});
			return allChecks.map((el) => el.location);
		},
	});

export default router;
