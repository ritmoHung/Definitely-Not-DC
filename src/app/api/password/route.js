// # api/password
import { NextResponse } from "next/server";
import { handleApiError } from "@/app/utils/error.server";
import argon2 from "argon2";



// # Get the value of password hashing or verify result
export async function POST(req) {
    const action = req.nextUrl.searchParams.get("action");
    let message, level, status;
    let data = {};

    try {
        const pwData = await req.json();

        if (action === "hash") {
            const hash = await argon2.hash(pwData?.password, {
                // Argon2id, 64MB, 3 iterations, 2 thread
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                timeCost: 3,
                parallelism: 2,
            });
            data.hash = hash;
        } else if (action === "verify") {
            const match = await argon2.verify(pwData?.hash, pwData?.password);
            data.match = match;
        }

        console.log(`PW::${action.toUpperCase()}: Success`);
        level = "info";
        status = 200;
    } catch (error) {
        console.error(`PW::${action.toUpperCase()}: Failed`);
        ({ message, level, status } = handleApiError(error));
        if (action === "verify") {
            data.match = false;
        }
    }

    return NextResponse.json({ data, message, level }, { status });
}