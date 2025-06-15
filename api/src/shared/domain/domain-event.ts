export interface DomainEvent {
    occurredOn: Date;
    getEventName(): string;
    getOccurredOn(): Date;
    getPayload(): any;
}

export interface DomainEventConstructor {
    new (...args: any[]): DomainEvent;
    eventName: string;
}