import {DomainEvent} from "./domain-event";

export const EVENT_PUBLISHER = Symbol("EventPublisher");

export interface EventPublisher {
    publish(event: DomainEvent): void;
}