import { IsString, IsDate } from 'class-validator';

export abstract class EventDto {
    @IsString()
    public readonly eventName!: string;

    @IsDate()
    public readonly occurredOn!: Date;
}