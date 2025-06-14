export const EVENT_PUBLISHER = Symbol("EventPublisher");

export interface EventPublisher {
    publish(payload: object): void;
}