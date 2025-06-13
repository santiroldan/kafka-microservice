import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCreator } from "../application/user-creator";
import { USER_REPOSITORY } from "../domain/user-repository";
import { PostUserController } from "./http/post-user-controller";
import { MongoUserRepository } from "./mongo/mongo-user-repository";
import { UserSchema } from "./mongo/user-schema";
import {KafkaModule} from "../../shared/infrastructure/kafka/kafka-module";

export const USERS_PROVIDERS = [
	{
		provide: USER_REPOSITORY,
		useClass: MongoUserRepository,
	},
	UserCreator,
];

@Module({
	controllers: [PostUserController],
	imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }]), KafkaModule],
	providers: [...USERS_PROVIDERS],
	exports: [...USERS_PROVIDERS],
})
export class UsersModule {}
