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
        console.log("USER::FIND: Success");
        if (user) return user;
        else return null;
    } catch (error) {
        console.log("USER::FIND: Failed");
        if (!error.context) error.context = "AUTH";
        throw error;
    }
}

export async function createUser(userInfo) {
    const baseUrl = process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : "http://localhost:3000";
    let userData;

    try {
        userInfo.user_id = uuidv4();

        const res = await axiosFetcher("/api/users", {
            baseUrl,
            method: "POST",
            data: userInfo,
        });

        if (res.data) {
            userData = res.data;
            delete userData["_id"];
            delete userData["__v"];
            console.log("USER::CREATE: Success");
        } else {
            throw new Error("Failed to create user.");
        }
    } catch (error) {
        console.error("USER::CREATE: Failed");
        if (!error.context) error.context = "CREATE";
        throw error;
    }

    return userData;
}