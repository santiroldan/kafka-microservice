import {EventPublisher} from '../../domain/event-publisher';
import {Inject, Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaEventPublisher implements EventPublisher, OnModuleInit, OnModuleDestroy {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

    async onModuleInit() {
        await this.kafka.connect();
    }

    publish(topic: string, payload: any): void {
        this.kafka.emit(topic, payload);
    }

    async onModuleDestroy() {
        await this.kafka.close();
    }
}
