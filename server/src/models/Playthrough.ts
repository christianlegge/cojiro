import { Schema, model } from "mongoose";

const playthroughSchema = new Schema({
	seed: { type: Schema.Types.ObjectId, ref: "Seed", required: true },
	checked: [String],
	items: [String],
});

export default model("Playthrough", playthroughSchema);
