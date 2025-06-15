import {DomainEvent} from "../../../shared/domain/domain-event";

export class UserCreated implements DomainEvent {
    static eventName = 'user_created';

    readonly occurredOn = new Date();

    constructor(
        public readonly id: string,
        public readonly name: string,
    ) {}

    getEventName(): string {
        return UserCreated.eventName;
    }

    getPayload() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}