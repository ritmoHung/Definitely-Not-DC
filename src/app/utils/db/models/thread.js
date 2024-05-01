import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Member = new mongoose.Schema({
	user_id: {
        type: String,
        unique: false,  // ? Use application logic to force uniqueness
    },
    name: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
});

const threadSchema = new mongoose.Schema({
    thread_id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4(),
    },
    creator_id: {
        type: String,
        unique: false,
        required: true,
    },
    public: {
        type: Boolean,
        required: true,
        default: false,
        immutable: true,
    },
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters long."],
        maxlength: [30, "Name must be no more that 30 characters long."],
    },
    slogan: {
        type: String,
        required: true,
        minlength: [3, "Slogan must be at least 3 characters long."],
        maxlength: [60, "Slogan must be no more that 60 characters long."],
    },
    image: {
        type: String,
        required: false,
        default: "",
    },
    members: {
        type: [Member],
		default: [],
    }
}, { collection: "threads", timestamps: true });

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema, "threads");

export default Thread;