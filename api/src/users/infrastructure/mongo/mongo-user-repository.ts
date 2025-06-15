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
         await this.userModel.insertOne(user.toPrimitives());
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email });

        return !!user;
    }
}
