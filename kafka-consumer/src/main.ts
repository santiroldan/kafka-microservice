import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const KAFKA_CONFIG: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'kafka-consumer-client',
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
            groupId: 'kafka-consumer-group',
        },
    },
};

async function connectWithRetry(startFn: () => Promise<void>, retries = 10, delay = 5000) {
    while (retries > 0) {
        try {
            await startFn();
            console.log('Microservice connected to Kafka');
            return;
        } catch (err) {
            console.error(`Kafka connection failed (${retries} retries left). Retrying in ${delay}ms...`);
            retries--;
            await new Promise((res) => setTimeout(res, delay));
        }
    }

    throw new Error('❌ Kafka not reachable after max retries');
}

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, KAFKA_CONFIG);

    await connectWithRetry(() => app.listen()).then(() => {
        console.log('Kafka consumer listening for messages...');
    });

}

bootstrap();
