import "dotenv/config";
import express, { json } from "express";
import { setupMongo } from "./database";
import { routes } from "./routes";
import { errorHandler } from "./middleware/error-handler.middleware";
import cors from "cors";


setupMongo().then(() => {
	const corsOptions = {
		origin: "https://devbills-front.vercel.app",
		credentials: true,
	}

	const app = express();

	const port = process.env.PORT || 3333;

	app.use(cors(corsOptions
		// {origin: process.env.FRONT_URL}
	))
	app.use(json());
	app.use(routes);
	app.use(errorHandler);
	app.listen(Number(port), "0.0.0.0", () => console.log("🚀app is running at port 3333"));
});
