import { Schema, model } from "mongoose";

const seedSchema = new Schema({
	locations: [
		{
			_id: false,
			location: { type: String, required: true },
			item: { type: String, required: true },
			price: Number,
		},
	],
});

export default model("Seed", seedSchema);
