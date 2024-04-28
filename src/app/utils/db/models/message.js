import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const messageSchema = new mongoose.Schema({
    message_id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4(),
    },
    thread_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { collection: "messages", timestamps: true });

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema, "messages");

export default Message;