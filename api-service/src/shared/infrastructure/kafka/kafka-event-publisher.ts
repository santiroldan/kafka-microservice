import {EventPublisher} from '../../domain/event-publisher';
import {Inject, Injectable} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaEventPublisher implements EventPublisher {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

    publish(topic: string, payload: any): void {
        this.kafka.emit(topic, payload);
    }
}
