// # api/threads
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { CustomError, handleApiError } from "@/app/utils/error.server";

// Mongoose
import connectDB from "@/app/utils/db/connectDB";
import Thread from "@/app/utils/db/models/thread";
import User from "@/app/utils/db/models/user";



// # Create a new thread
// For everyone
export async function POST(req) {
    let message, level, status;

    try {
        const session = await auth();
        if (!session?.user.id) {
            throw new CustomError.AuthorizationError();
        }

        await connectDB();
		const threadData = await req.json();

        // Fetch member profiles
        const userProfiles = await User.find({
            "account_id": { $in: threadData.members }
        }, "user_id name image -_id").lean();
        if (userProfiles.length !== threadData.members.length) {
            throw new CustomError.NotFoundError("Some or all users not found by account IDs.");
        }

        threadData.members = userProfiles;
        const newThread = new Thread(threadData);
        const createdThread = await newThread.save();

        if (!createdThread) {
            throw new CustomError.CreationError(`Thread '${threadData.name}' creation failed.`);
        } else {
            message = `Thread '${threadData.name}' created successfully.`;
            level = "info";
            status = 200;
        }
    } catch (error) {
        ({ message, level, status } = handleApiError(error));
    }

    return NextResponse.json({ message, level }, { status });
}

// # Get all threads joined by user_id param
// For everyone
export async function GET(req) {
    let message, level, status;
	let data = [];

    try {
        const userId = req.nextUrl.searchParams.get("user_id");

        const session = await auth();
        if (!session?.user.id || userId !== session?.user.id) {
            throw new CustomError.AuthorizationError();
        }

        await connectDB();
        const projection = "-members";
		const allThreads = await Thread.find({
            $or: [
                { public: true },
                { public: false, "members.user_id": userId },
            ]
        }, projection);

        if (allThreads.length === 0) {
            message = `No joined threads.`;
            level = "info";
            status = 200;
        } else {
			data = allThreads;
            message = `Threads retrieved successfully.`;
            level = "log";
            status = 200;
        }
    } catch (error) {
        ({ message, level, status } = handleApiError(error));
    }

    return NextResponse.json({ data, message, level }, { status });
}