import {USER_REPOSITORY, UserRepository} from "../domain/user-repository";
import {Inject} from "@nestjs/common";

export class UserCreator {
    constructor(
        @Inject(USER_REPOSITORY) private repository: UserRepository,
    ) {}

    async execute(name: string): Promise<void> {
        return await this.repository.save(name);
    }
}
