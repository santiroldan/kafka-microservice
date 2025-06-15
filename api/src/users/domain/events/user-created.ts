import {DomainEvent} from "../../../shared/domain/domain-event";

export class UserCreated implements DomainEvent {
    static eventName = 'user_created';

    readonly occurredOn = new Date();

    constructor(
        private readonly id: string,
        private readonly name: string,
    ) {}

    getEventName(): string {
        return UserCreated.eventName;
    }

    getOccurredOn(): Date {
        return this.occurredOn;
    }

    getPayload() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}