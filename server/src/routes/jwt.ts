import jwt from "jsonwebtoken";
import * as trpc from "@trpc/server";
import { z } from "zod";

if (!process.env.JWT_SECRET) {
	throw "jwt secret not read properly!";
}

const router = trpc
	.router()
	.query("getPlaythroughs", {
		input: z.object({
			token: z.string(),
		}),
		async resolve({ input }) {
			try {
				let decoded = jwt.verify(
					input.token,
					process.env.JWT_SECRET!
				) as string[];
				return decoded;
			} catch (err) {
				throw new trpc.TRPCError({
					code: "UNAUTHORIZED",
					message: "Failed to authorize jwt",
				});
			}
		},
	})
	.query("addPlaythrough", {
		input: z.object({
			token: z.string().optional(),
			playthroughId: z.string(),
		}),
		async resolve({ input }) {
			let decoded: string[] = [];
			if (input.token) {
				try {
					decoded = jwt.verify(
						input.token,
						process.env.JWT_SECRET!
					) as string[];
				} catch (err) {
					decoded = [];
				}
			}
			decoded.push(input.playthroughId);
			return jwt.sign(decoded, process.env.JWT_SECRET!, {
				expiresIn: "7d",
			}) as string;
		},
	});
export default router;
