import { Module } from "@nestjs/common";
import {KafkaEventPublisher} from "./kafka-event-publisher";
import {EVENT_PUBLISHER} from "../../domain/event-publisher";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {KafkaTopicManager} from "./kafka-topic-manager";

const EVENT_PUBLISHER_PROVIDER = {
    provide: EVENT_PUBLISHER,
    useClass: KafkaEventPublisher
};

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'api-client',
                        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
                        connectionTimeout: 6000,
                        retry: {
                            retries: Number.MAX_SAFE_INTEGER,
                            initialRetryTime: 300,
                            factor: 0.2,
                            multiplier: 2,
                            maxRetryTime: 30000,
                        },
                    },
                },
            },
        ]),
    ],
    providers: [EVENT_PUBLISHER_PROVIDER, KafkaTopicManager],
    exports: [EVENT_PUBLISHER],
})
export class KafkaModule {}
