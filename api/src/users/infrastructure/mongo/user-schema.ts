import { type Document, Schema } from "mongoose";

export type UserDocument = UserModel & Document;

export type UserModel = {
	email: string;
	name: string;
};

export const UserSchema = new Schema<UserModel>({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
});
