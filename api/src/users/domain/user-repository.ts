import { User } from "./user";

export const USER_REPOSITORY = Symbol("UserRepository");

export interface UserRepository {
	save(user: User): Promise<void>;
	existsByEmail(email: string): Promise<boolean>;
}
