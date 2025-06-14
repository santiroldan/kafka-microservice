import { Module } from '@nestjs/common';
import { ConsumerHandler } from './consumer-handler';

@Module({
    controllers: [ConsumerHandler],
    providers: [ConsumerHandler],
    exports: [ConsumerHandler],
})
export class ConsumerModule {}
