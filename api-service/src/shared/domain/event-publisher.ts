export const EVENT_PUBLISHER = Symbol("EventPublisher");

export interface EventPublisher {
    publish(topic: string, payload: any): void;
}