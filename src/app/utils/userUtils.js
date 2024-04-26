import { axiosFetcher } from "@/app/utils/fetcher";
import { v4 as uuidv4 } from "uuid";

// Mongoose
import connectDB from "@/app/utils/db/connectDB";
import User from "@/app/utils/db/models/user";



export async function authenticateUser(userInfo) {
    try {
        await connectDB();
        const projection = "-_id -__v";
        const user = await User.findOne({ uuid: userInfo.uuid }, projection).lean();

        // Return user document if exist
        if (user) return user;
        else return null;
    } catch (error) {
        // ? Throw the error back to the callback route
        if (!error.context) error.context = "AUTH";
        throw error;
    }
}

export async function createUser(userInfo) {
    let userData;

    try {
        userInfo.user_id = uuidv4();

        const res = await axiosFetcher("/api/users", {
            baseUrl: process.env.NEXT_PUBLIC_VERCEL_ENV ? `https://${process.env.NEXT_PUBLIC_VERCEL_ENV}` : "http://localhost:3000",
            method: "POST",
            data: userInfo,
        });

        if (res.data) {
            userData = res.data;
            delete userData["_id"];
            delete userData["__v"];
        } else {
            throw new Error("Failed to create user.");
        }
    } catch (error) {
        if (!error.context) error.context = "CREATE";
        throw error;
    }

    return userData;
}