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
});

export type ISeed = InferSchemaType<typeof seedSchema>;

export default model<ISeed>("Seed", seedSchema);
