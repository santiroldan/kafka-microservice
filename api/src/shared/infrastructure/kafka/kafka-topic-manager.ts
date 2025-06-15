import {Injectable, OnModuleInit, OnModuleDestroy, Logger, OnApplicationBootstrap} from '@nestjs/common';
import { Kafka, Admin } from 'kafkajs';
import * as path from 'path';
import {findAllEvents} from "../events/find-all-events";

@Injectable()
export class KafkaTopicManager implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap {
    private readonly logger = new Logger(KafkaTopicManager.name);
    private admin!: Admin;
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

    async onModuleInit() {
        this.admin = this.kafka.admin();
        await this.admin.connect();
    }

    async onModuleDestroy() {
        await this.admin.disconnect();
    }

    async onApplicationBootstrap() {
        await this.createTopicsIfNotExist();
    }

    async createTopicsIfNotExist() {
        const existingTopics = await this.admin.listTopics();

        const baseDir = path.resolve(__dirname, '..', '..', '..');
        const events = await findAllEvents(baseDir);

        const topicsToCreate = events
            .map(e => e.topic)
            .filter(topic => !existingTopics.includes(topic))
            .map(topic => ({
                topic,
                numPartitions: 1,
                replicationFactor: 1,
            }));

        this.logger.log(`Eventos encontrados en total: ${events.length}`);
        this.logger.log(`Topics existentes en Kafka: ${existingTopics.map(t => t).join(', ')}`);
        this.logger.log(`Topics que se van a crear: ${topicsToCreate.map(t => t.topic).join(', ')}`);

        if (topicsToCreate.length === 0) {
            return;
        }

        this.logger.log(`Creando topics: ${topicsToCreate.map(t => t.topic).join(', ')}`);

        const result = await this.admin.createTopics({
            topics: topicsToCreate,
            waitForLeaders: true,
        });

        if(result){
            this.logger.log('Topics creados correctamente');
        }
    }
}