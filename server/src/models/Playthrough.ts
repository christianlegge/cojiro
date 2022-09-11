import mongoose, { Schema, model, InferSchemaType } from "mongoose";

const playthroughSchema = new Schema({
	seed: { type: mongoose.Types.ObjectId, ref: "Seed", required: true },
	checked: { type: [String], required: true },
	items: { type: [String], required: true },
	known_hints: { type: [String], required: true },
});

export type IPlaythrough = InferSchemaType<typeof playthroughSchema>;

export default model("Playthrough", playthroughSchema);
