import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import indexRouter from "./src/routes/index";
import playthroughRouter from "./src/routes/playthrough";
import jwtRouter from "./src/routes/jwt";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const trpcRouter = trpc
	.router()
	.merge("", indexRouter)
	.merge("playthrough.", playthroughRouter)
	.merge("jwt.", jwtRouter);

export type AppRouter = typeof trpcRouter;

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: trpcRouter,
	})
);

app.listen(port, () => console.log(`Server started on ${port}`));
