// # api/users
import { NextResponse } from "next/server";
import { CustomError, handleApiError } from "@/app/utils/error.server";

// Mongoose
import connectDB from "@/app/utils/db/connectDB";
import User from "@/app/utils/db/models/user";



// # Create a new user
// TODO: Protection
export async function POST(req) {
    let message, level, status;
    let data = null;

	try {
		await connectDB();
		// Create a new user using the User model
		const userData = await req.json();
		const user = new User(userData);
		const createdUser = await user.save();

		if (!createdUser) {
			throw new CustomError.CreationError(`User ${userData.id} creation failed.`);
        } else {
            data = createdUser;
            message = `User ${userData.id} created successfully.`;
            level = "info";
            status = 200;
        }
	} catch (error) {
        ({ message, level, status } = handleApiError(error));
    }

    return NextResponse.json({ data, message, level }, { status });
}

// Search for users
// For everyone
export async function GET(req) {
    let message, level, status;
    let data = [];

	try {
        const query = req.nextUrl.searchParams.get("query");
        if (!query) throw new CustomError.BadRequestError("Query required.");

		await connectDB();
		// Create a new user using the User model
		const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { account_id: { $regex: query, $options: "i" } }
            ]
        }).select("name account_id -_id").lean();

		data = users;
        message = "Searched users successfully.";
        level = "log";
        status = 200;
	} catch (error) {
        ({ message, level, status } = handleApiError(error));
    }

    return NextResponse.json({ data, message, level }, { status });
}