import mongoose from "mongoose";

export const Member = new mongoose.Schema({
	user_id: {
        type: String,
        unique: true,
        unique: false,  // ? Use application logic to force uniqueness
    },
});

const threadSchema = new mongoose.Schema({
    thread_id: {
        type: String,
        unique: true,
        required: true,
    },
    members: {
        type: [Member],
		default: [],
    }
}, { collection: "threads" });

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema, "threads");

export default Thread;