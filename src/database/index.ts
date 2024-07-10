import mongoose from "mongoose";

export async function setupMongo(): Promise<void> {
	try {
		if (mongoose.connection.readyState === 1) {
			return;
		}

		console.log("🎲 connecting to db...");
		await mongoose.connect(process.env.MONGO_URL as string);
		console.log("✅ db connected");
	} catch {
		throw new Error("❌ db not connected.");
	}
}
