import type { User } from "./user";

export const USER_REPOSITORY = Symbol("UserRepository");

export interface UserRepository {
	save(name: string): Promise<void>;
	findByName(name: string): Promise<User>;
}
