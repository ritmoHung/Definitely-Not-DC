import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_COLORS = [
    "#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#E91E63", "#F1C40F", "#E67E22", "#E74C3C", "#95A5A6", "#607D8B",
    "#11806A", "#1F8B4C", "#206694", "#71368A", "#AD1457", "#C27C0E", "#A84300", "#992D22", "#979C9F", "#546E7A",
];

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    account_id: {
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
    },
    color: {
        type: String,
        enum: USER_COLORS,
        required: true,
        default: USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)],
    }
}, { collection: "users", timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;