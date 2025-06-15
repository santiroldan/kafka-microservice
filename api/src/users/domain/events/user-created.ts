import {DomainEvent} from "../../../shared/domain/events/domain-event";

export class UserCreated extends DomainEvent {
    static eventName = 'user_created';

    constructor(
        private readonly email: string,
        private readonly name: string,
    ) {
        super();
    }

    getEventName(): string {
        return UserCreated.eventName;
    }

    getPayload() {
        return {
            email: this.email,
            name: this.name,
        };
    }
}