import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import mongoose from "mongoose";
import indexRouter from "./src/routes/index";
import playthroughRouter from "./src/routes/playthrough";
import errorHandler from "./src/middleware/error";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL as string;

mongoose.connect(mongoUrl, () => {
	console.log("Connected to MongoDB");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const trpcRouter = trpc
	.router()
	.merge("", indexRouter)
	.merge("playthrough.", playthroughRouter);

export type AppRouter = typeof trpcRouter;

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: trpcRouter,
		createContext,
	})
);

// app.use("/", indexRouter);
// app.use("/playthrough", playthroughRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
