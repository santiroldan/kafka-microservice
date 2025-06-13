import { Module } from "@nestjs/common";
import {KafkaEventPublisher} from "./kafka-event-publisher";
import {EVENT_PUBLISHER} from "../../domain/event-publisher";
import {ClientsModule, Transport} from "@nestjs/microservices";

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
                        brokers: [process.env.KAFKA_BROKER || '0.0.0.0:9092'],
                    },
                    consumer: {
                        groupId: 'app-consumer-group',
                    },
                },
            },
        ]),
    ],
    providers: [EVENT_PUBLISHER_PROVIDER],
    exports: [EVENT_PUBLISHER],
})
export class KafkaModule {}
