import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {EventDto} from "../../../shared/infrastructure/event-dto";
import {IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class UserCreatedDataDto {
    @IsString()
    public readonly id!: string;

    @IsString()
    public readonly name!: string;
}

export class UserCreatedDto extends EventDto {
    @ValidateNested()
    @Type(() => UserCreatedDataDto)
    public readonly data!: UserCreatedDataDto;
}

@Controller()
export class UserCreatedHandler {
    @EventPattern('user_created')
    handleEvent(@Payload() event: UserCreatedDto) {
        console.log(`📨 Evento ${event.eventName} recibido en kafka-consumer: ${JSON.stringify(event.data)}`);
    }
}
