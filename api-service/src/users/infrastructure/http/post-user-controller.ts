import { Body, Controller, Post } from '@nestjs/common';
import {UserCreator} from "../../application/user-creator";

@Controller('users')
export class PostUserController {
    constructor(private readonly creator: UserCreator) {}

    @Post()
    async create(@Body() body: { name: string; }) {
        const { name } = body;

        const result = await this.creator.execute(name);

        return {
            message: 'User created successfully',
            data: result,
        };
    }
}
