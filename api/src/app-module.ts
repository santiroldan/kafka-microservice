import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/infrastructure/users-module";

@Module({
	imports: [
		MongooseModule.forRoot(
			process.env.MONGO_URI || "mongodb://mongo:27017/api-db",
		),
		UsersModule,
	],
})
export class AppModule {}
