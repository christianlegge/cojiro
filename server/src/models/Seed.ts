import { Schema, model, InferSchemaType } from "mongoose";

const seedSchema = new Schema({
	locations: {
		type: Map,
		of: {
			_id: false,
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

export default model<ISeed>("Seed", seedSchema);
