import express from "express";
import dotenv from "dotenv";
import { indexRouter } from "./src/routes/index";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on ${port}`));

app.use("/", indexRouter);
