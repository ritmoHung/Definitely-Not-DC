import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: () => `User${uuidv4().substring(0, 6).toUpperCase()}`,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
        default: "",
    },
    status: {
        type: String,
        required: false,
        default: "",
    }
}, { collection: "users", timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;