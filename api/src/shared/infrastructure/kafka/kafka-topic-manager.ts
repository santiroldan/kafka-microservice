import {Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import { Kafka, Admin } from 'kafkajs';

@Injectable()
export class KafkaTopicManager implements OnModuleInit, OnModuleDestroy {
    private readonly kafka = new Kafka({
        clientId: 'admin-client',
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
        connectionTimeout: 6000,
        retry: {
            retries: Number.MAX_SAFE_INTEGER,
            initialRetryTime: 300,
            factor: 0.2,
            multiplier: 2,
            maxRetryTime: 30000,
        },
    });
    private admin!: Admin;

    async onModuleInit() {
        this.admin = this.kafka.admin();
        await this.admin.connect();

        await this.createTopicsIfNeeded();
    }

    async onModuleDestroy() {
        await this.admin.disconnect();
    }

    private async createTopicsIfNeeded() {
        await this.admin.createTopics({
            topics: [
                {
                    topic: 'user_created',
                    numPartitions: 1,
                    replicationFactor: 1,
                },
            ],
            waitForLeaders: true,
        });
    }
}