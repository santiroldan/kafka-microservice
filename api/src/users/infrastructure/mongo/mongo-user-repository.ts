import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../domain/user-repository';
import { User } from '../../domain/user';
import { UserDocument } from './user-schema';

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

    async save(user: User): Promise<void> {
         await this.userModel.insertOne(user);
    }

    async findByName(name: string): Promise<User> {
        const user = await this.userModel.findOne({
            name,
        });

        if (!user) {
            throw new Error(`User with name ${name} not found`);
        }

        return new User(user.id, user.name);
    }
}
