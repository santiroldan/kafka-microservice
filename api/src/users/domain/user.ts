import {UserEmail} from "./value-objects/user-email";

export class User {
	private constructor(
		private readonly email: UserEmail,
		private readonly name: string,
	) {}

	static create(email: string, name: string): User {
		if (!email || !name) {
			throw new Error('Email and name are required to create a user.');
		}

		return new User(new UserEmail(email), name);
	}

	getEmail(): string {
		return this.email.value;
	}

	getName(): string {
		return this.name;
	}
}
