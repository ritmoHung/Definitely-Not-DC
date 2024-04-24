import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_QUERY = "?retryWrites=true&w=majority&appName=ClusterDNDC";
const opts = {
	bufferCommands: false,
};

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: {}, promise: {} };
}

cached.conn = cached.conn || {};
cached.promise = cached.promise || {};

export default async function connectDB(databaseName) {
	if (!MONGODB_URI) {
		throw new Error("Please define the MONGODB_URI environment variable");
	}

	const fullURL = `${MONGODB_URI}/${databaseName}${MONGODB_QUERY}`;
	// console.log(fullURL);

	if (cached.conn[databaseName]) {
		// console.log("Use cached connection for:", databaseName);
		return cached.conn[databaseName];
	}

	if (!cached.promise[databaseName]) {
		// console.log("Create new connection promise for:", databaseName);
		cached.promise[databaseName] = mongoose.connect(fullURL, opts)
			.then(mongoose => mongoose.connection)
			.catch(err => {
				console.log(`Connection error to ${databaseName}:`, err);
				delete cached.promise[databaseName];
                throw err;
			})
	}
	cached.conn[databaseName] = await cached.promise[databaseName];
	return cached.conn[databaseName];
}