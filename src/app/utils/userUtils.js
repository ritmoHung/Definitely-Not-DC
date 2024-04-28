import { axiosFetcher } from "@/app/utils/fetcher";
import { v4 as uuidv4 } from "uuid";

// Mongoose
import connectDB from "@/app/utils/db/connectDB";
import User from "@/app/utils/db/models/user";



export async function authenticateUser(userInfo) {
    try {
        await connectDB();
        const projection = "-_id -__v";
        const user = await User.findOne({ email: userInfo.email }, projection).lean();

        // Return user document if exist
        console.log(`USER::FIND: ${user ? "Exist" : "Not found"}`);
        return user ? user : null;
    } catch (error) {
        throw new Error(`USER::FIND: ${error.message}`);
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
            throw new Error("An error occurred during the process");
        }
    } catch (error) {
        throw new Error(`USER::CREATE: ${error.message}`);
    }

    return userData;
}