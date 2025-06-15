export abstract class DomainEvent {
    static eventName: string;

    private readonly occurredOn: Date;

    protected constructor() {
        this.occurredOn = new Date();
    }

    getOccurredOn(): Date {
        return this.occurredOn;
    }

    abstract getEventName(): string;
    abstract getPayload(): unknown;
}

export interface DomainEventConstructor<T extends DomainEvent = DomainEvent> {
    new (...args: any[]): T;
    eventName: string;
}