import { Module } from '@nestjs/common';
import { UserCreatedHandler } from './http/user-created-handler';

@Module({
    controllers: [UserCreatedHandler],
    providers: [UserCreatedHandler],
    exports: [UserCreatedHandler],
})
export class UsersModule {}
