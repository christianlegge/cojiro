import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./src/routes/index";

dotenv.config();

const app = express();

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL as string;

mongoose.connect(mongoUrl, () => {
	console.log("Connected to MongoDB");
});

app.listen(port, () => console.log(`Server started on ${port}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
