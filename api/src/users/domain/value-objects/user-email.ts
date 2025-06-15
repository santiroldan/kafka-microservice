export class UserEmail {
    constructor(private readonly email: string) {
        if (!this.isValidEmail(email)) {
        throw new Error(`Invalid user email: ${email}`);
        }
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    get value(): string {
        return this.email;
    }
}