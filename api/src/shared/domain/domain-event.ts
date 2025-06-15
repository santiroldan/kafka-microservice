export interface DomainEvent {
    occurredOn: Date;
    getEventName(): string;
    getPayload(): any;
}

export interface DomainEventConstructor {
    new (...args: any[]): DomainEvent;
    eventName: string;
}