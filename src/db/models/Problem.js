import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    title: String,
    description: String,
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);
