import { Body, Controller, Post } from '@nestjs/common';
import {UserCreator} from "../../application/user-creator";
import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    public readonly email!: string;

    @IsString()
    public readonly name!: string;
}

@Controller('users')
export class PostUserController {
    constructor(private readonly creator: UserCreator) {}

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.creator.execute(body);
    }
}
