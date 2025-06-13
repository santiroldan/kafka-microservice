import { type Document, Schema } from "mongoose";

export type UserDocument = UserModel & Document;

export type UserModel = {
	name: string;
};

export const UserSchema = new Schema<UserModel>({
	name: { type: String, required: true },
});
