import {DomainEvent} from "../../../shared/domain/domain-event";

export class UserCreated extends DomainEvent {
    static eventName = 'user_created';

    constructor(
        private readonly id: string,
        private readonly name: string,
    ) {
        super();
    }

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