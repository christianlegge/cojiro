import mongoose, { Schema, model, InferSchemaType } from "mongoose";

const seedSchema = new Schema({
	locations: {
		type: Map,
		of: {
			// _id: false,
			item: { type: String, required: true },
			price: Number,
		},
		required: true,
	},

	gossip_stones: {
		type: Map,
		of: String,
		required: true,
	},
});

export type ISeed = InferSchemaType<typeof seedSchema>;

const playthroughSchema = new Schema({
	seed: { type: seedSchema, required: true },
	checked: { type: [String], required: true },
	items: { type: [String], required: true },
	known_hints: { type: [String], required: true },
});

export type IPlaythrough = InferSchemaType<typeof playthroughSchema>;

export default model("Playthrough", playthroughSchema);
