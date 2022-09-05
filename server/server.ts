import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./src/routes/index";
import playthroughRouter from "./src/routes/playthrough";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL as string;

mongoose.connect(mongoUrl, () => {
	console.log("Connected to MongoDB");
});

app.listen(port, () => console.log(`Server started on ${port}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/playthrough", playthroughRouter);
