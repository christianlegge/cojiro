import { playthroughRouter } from "~/server/api/routers/playthrough";
import { jwtRouter } from "./routers/jwt";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	playthrough: playthroughRouter,
	jwt: jwtRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
