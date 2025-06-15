import { NestFactory } from "@nestjs/core";
import mongoose from "mongoose";
import { AppModule } from "./app-module";

async function bootstrap() {
	try {
		await mongoose.connect(
			process.env.MONGO_URI || "mongodb://mongo:27017/api-db",
		);
		console.log("Connected to MongoDB");

		const app = await NestFactory.create(AppModule);

		await app.listen(3000);
		console.log("API listening on port 3000");
	} catch (error) {
		console.error("Error connecting to MongoDB or starting server:", error);
		process.exit(1);
	}
}

bootstrap();
