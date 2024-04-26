// Mongoose
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";



export function handleApiError(error) {
    console.log(error);

    let message = "An unexpected error occurred.";
    let level = "error";
    let status = 500;

    if (error instanceof mongoose.Error.ValidationError) {
        message = "Oops! You may have invalid keys or value.";
        level = "error";
        status = 400;
    } else if (error instanceof MongoServerError) {
        message = error.message;
        level = "error";
        status = 500;
    } else if ("status" in error && "level" in error) {
        message = error.message;
        level = error.level;
        status = error.status;
    }

    return { message, level, status };
}

class CustomBaseError extends Error {
    constructor(message, level, status) {
        super(message);
        this.name = this.constructor.name;
        this.level = level;
        this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class AuthorizationError extends CustomBaseError {
    constructor(message = "Access denied.", level = "error", status = 403) {
        super(message, level, status);
    }
}

class NotFoundError extends CustomBaseError {
    constructor(message = "Not Found.", level = "error", status = 400) {
       super(message, level, status);
    }
}

class CreationError extends CustomBaseError {
    constructor(message = "Creation failed.", level = "error", status = 500) {
       super(message, level, status);
    }
}

class ConflictError extends CustomBaseError {
    constructor(message = "Already exists.", level = "error", status = 409) {
       super(message, level, status);
    }
}

export const CustomError = {
    AuthorizationError,
    NotFoundError,
    CreationError,
    ConflictError,
}