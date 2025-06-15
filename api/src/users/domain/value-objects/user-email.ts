export class UserEmail {
    constructor(private readonly email: string) {
        if (!this.isValidEmail(email)) {
            throw new Error(`Invalid user email: ${email}`);
        }
    }

    private isValidEmail(email: string): boolean {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    get value(): string {
        return this.email;
    }
}