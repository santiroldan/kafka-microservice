import {USER_REPOSITORY, UserRepository} from "../domain/user-repository";
import {Inject} from "@nestjs/common";
import {EVENT_PUBLISHER, EventPublisher} from "../../shared/domain/event-publisher";
import {UserCreated} from "../domain/events/user-created";
import {User} from "../domain/user";
import {UserCreatorInput} from "./user-creator-input";

export class UserCreator {
    constructor(
        @Inject(USER_REPOSITORY) private repository: UserRepository,
        @Inject(EVENT_PUBLISHER) private readonly publisher: EventPublisher,

    ) {}

    async execute(input: UserCreatorInput): Promise<void> {
        const userToCreate = new User(input.email, input.name);

        await this.repository.save(userToCreate);

        return this.publisher.publish(new UserCreated(userToCreate.email, userToCreate.name));
    }
}
