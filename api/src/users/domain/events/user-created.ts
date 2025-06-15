import {DomainEvent} from "../../../shared/domain/event";

export class UserCreated implements DomainEvent {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) {}

    getPayload() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}