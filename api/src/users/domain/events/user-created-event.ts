import {EventTopic} from "../../../shared/domain/event-topic-decorator";
import {DomainEvent} from "../../../shared/domain/event";

@EventTopic('user_created')
export class UserCreatedEvent implements DomainEvent {
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