import {EventPublisher} from '../../domain/event-publisher';
import {Inject, Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {getEventTopic} from "../../domain/event-topic-decorator";
import {DomainEvent} from "../../domain/event";

@Injectable()
export class KafkaEventPublisher implements EventPublisher, OnModuleInit, OnModuleDestroy {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

    async onModuleInit() {
        await this.kafka.connect();
    }

    publish(event: DomainEvent): void {
        const topic = getEventTopic(event.constructor);

        if (!topic) {
            throw new Error('No se encontró topic en el evento');
        }

        this.kafka.emit(topic, event.getPayload());
    }

    async onModuleDestroy() {
        await this.kafka.close();
    }
}
