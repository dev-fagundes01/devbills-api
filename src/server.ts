import "dotenv/config";
import express, { json } from "express";
import { setupMongo } from "./database";
import { routes } from "./routes";
import { errorHandler } from "./middleware/error-handler.middleware";

setupMongo().then(() => {
	const app = express();

	app.use(json());
	app.use(routes);
	app.use(errorHandler);
	app.listen(3333, () => console.log("🚀app is running at port 3333"));
});
