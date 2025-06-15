import {Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../domain/user-repository';
import { User } from '../../domain/user';
import { UserDocument } from './user-schema';
import {EVENT_PUBLISHER, EventPublisher} from "../../../shared/domain/event-publisher";
import { UserCreated } from '../events/user-created';

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        @Inject(EVENT_PUBLISHER) private readonly publisher: EventPublisher,
    ) {}

    async save(name: string): Promise<void> {
        const userSaved = await this.userModel.insertOne(
            {
                name,
            },
        );

        return this.publisher.publish(new UserCreated(userSaved.id, userSaved.name));
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
