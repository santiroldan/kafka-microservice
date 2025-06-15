import {NestFactory} from '@nestjs/core';
import {AppModule} from './app-module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import * as process from "node:process";
import {Logger} from "@nestjs/common";

const logger = new Logger('EventConsumer');

const KAFKA_CONFIG: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: process.env.KAFKA_CLIENT_ID || 'event-consumer-client',
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
        consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'event-consumer-group',
        },
    },
};

async function connectWithRetry(
    startFn: () => Promise<void>,
    retries = 10,
    delay = 5000
): Promise<void> {
    try {
        await startFn();
        logger.log('Event consumer connected to Kafka');
    } catch (err) {
        if (retries <= 1) {
            logger.error('❌ Kafka not reachable after max retries', (err as Error).stack);
            throw new Error('❌ Kafka not reachable after max retries');
        }
        logger.warn(
            `Kafka connection failed (${retries - 1} retries left). Retrying in ${delay}ms...`,
            (err as Error).stack
        );
        await new Promise((res) => setTimeout(res, delay));
        await connectWithRetry(startFn, retries - 1, delay);
    }
}

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, KAFKA_CONFIG);
    await connectWithRetry(() => app.listen());
    logger.log('Event consumer listening for messages...');
}

bootstrap();
