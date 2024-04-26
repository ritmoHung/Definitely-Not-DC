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

// ? No GET function: Not allowed to get all exist users