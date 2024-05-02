// # /api/signUp
import { NextResponse } from "next/server"; 
import { CustomError, handleApiError } from "@/app/utils/error.server";
import { authenticateUser, createUser } from "@/app/utils/userUtils";
import { hashPassword } from "@/app/utils/pwUtils";



export async function POST(req) {
    let message, level, status;
	let data = null;

    try {
        const credData = await req.json();
        
        const existedUser = await authenticateUser(credData);
        if (existedUser) {
            // throw new CustomError.ConflictError("Either you already signed up with this email, or signed in by OAuth before.");
            console.log("EXISTED");
        } else {
            // Creates user if DNE
            credData.password = await hashPassword(credData.password);
            credData.account_id = credData.email.split("@")[0];

            const createdUser = await createUser(credData);
            if (createdUser) {
                message = "You can now sign in with your new account."
                data = createdUser;
            } else {
                throw new CustomError.CreationError("An error occurred while creating your account.");
            }
        }
    } catch (error) {
        ({ message, level, status } = handleApiError(error));
    }

    return NextResponse.json({ data, message, level }, { status });
}