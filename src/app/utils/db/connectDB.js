import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_QUERY = "?retryWrites=true&w=majority&appName=ClusterDNDC";
const opts = {
	bufferCommands: false,
};

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

export default async function connectDB(databaseName = process.env.MONGODB_DB) {
	if (!MONGODB_URI) {
		throw new Error("Please define the MONGODB_URI environment variable");
	}

    if (cached.conn && cached.conn.readyState === 1) {
        return cached.conn;
    }

	const FULL_URL = `${MONGODB_URI}/${databaseName}${MONGODB_QUERY}`;
	if (!cached.promise) {
		cached.promise = mongoose.connect(FULL_URL, opts)
			.then(mongoose => mongoose.connection)
			.catch(err => {
				console.log(`Error when connecting to ${databaseName}:`, err);
				delete cached.promise;
                throw err;
			})
	}
	cached.conn = await cached.promise;
	return cached.conn;
}