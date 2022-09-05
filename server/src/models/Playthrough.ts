import { Schema, model, InferSchemaType } from "mongoose";

const playthroughSchema = new Schema({
	seed: { type: Schema.Types.ObjectId, ref: "Seed", required: true },
	checked: [String],
	items: [String],
	known_hints: [String],
});

export type IPlaythrough = InferSchemaType<typeof playthroughSchema>;

export default model("Playthrough", playthroughSchema);
