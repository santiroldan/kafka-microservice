import {UserEmail} from "./value-objects/user-email";

export class User {
	private constructor(
		private readonly email: UserEmail,
		private readonly name: string,
	) {}

	static create(email: string, name: string): User {
		return new User(new UserEmail(email), name);
	}

	getEmail(): string {
		return this.email.value;
	}

	getName(): string {
		return this.name;
	}

	toPrimitives(): { email: string; name: string } {
		return {
			email: this.email.value,
			name: this.name,
		};
	}
}
