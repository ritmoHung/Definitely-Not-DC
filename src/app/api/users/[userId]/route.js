// # api/[userId]
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { CustomError, handleApiError } from "@/app/utils/error.server";

// Mongoose
import connectDB from "@/app/utils/db/connectDB";
import User from "@/app/utils/db/models/user";



// ? No POST function: Try to create an exist user


// # Get the data of a user
// ! For everyone (validate params.uuid against cookie)
export async function GET(req, { params }) {
    let message, level, status;
    let data = null, projection;

    try {
        const userId = params.userId;

        const session = await auth();
        projection = "-user_id -password";
        if (userId !== session.user.id) {
            projection = `${projection} -email`;
        }

        await connectDB();
        const user = await User.findOne({ user_id: userId }, projection).lean();

        if (!user) {
            throw new CustomError.NotFoundError(`User ${userId} not found.`);
        } else {
            data = user;
            message = `User ${userId} data received successfully.`;
            level = "log";
            status = 200;
        }
    } catch (error) {
        ({ message, level, status } = handleApiError(error));
    }

    return NextResponse.json({ data, message, level }, { status });
}