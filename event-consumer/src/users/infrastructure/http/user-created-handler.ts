import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserCreatedHandler {
    @EventPattern('user_created')
    handleEvent(@Payload() message: any) {
        console.log('📨 Evento recibido en kafka-consumer:', message);
    }
}
