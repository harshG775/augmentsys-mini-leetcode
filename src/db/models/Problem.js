import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);
