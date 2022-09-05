import { Schema, model, InferSchemaType } from "mongoose";

const seedSchema = new Schema({
	locations: [
		{
			_id: false,
			location: { type: String, required: true },
			item: { type: String, required: true },
			price: Number,
		},
	],
	gossip_stones: [
		{
			_id: false,
			stone: { type: String, required: true },
			hint: { type: String, required: true },
		},
	],
});

export type ISeed = InferSchemaType<typeof seedSchema>;

export default model<ISeed>("Seed", seedSchema);
