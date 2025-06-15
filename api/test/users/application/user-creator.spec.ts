import { describe, it, expect, vi, beforeEach } from 'vitest';
import {UserRepository} from "../../../src/users/domain/user-repository";
import {EventPublisher} from "../../../src/shared/domain/events/event-publisher";
import {UserCreator} from "../../../src/users/application/user-creator/user-creator";
import {UserCreatorInput} from "../../../src/users/application/user-creator/user-creator-input";
import {UserCreated} from "../../../src/users/domain/events/user-created";
import {User} from "../../../src/users/domain/user";

describe('UserCreator', () => {
    let repository: UserRepository;
    let publisher: EventPublisher;
    let userCreator: UserCreator;

    const input: UserCreatorInput = {
        email: 'test@example.com',
        name: 'Test User'
    };

    beforeEach(() => {
        repository = {
            existsByEmail: vi.fn(),
            save: vi.fn(),
        };

        publisher = {
            publish: vi.fn(),
        };

        userCreator = new UserCreator(repository, publisher);
    });

    it('should create a user and publish event when email does not exist', async () => {
        (repository.existsByEmail as vi.Mock).mockResolvedValue(false);

        (publisher.publish as vi.Mock).mockImplementation((event: UserCreated) => {
            expect(event).toBeInstanceOf(UserCreated);
            expect(event.getPayload().email).toBe(input.email);
            expect(event.getPayload().name).toBe(input.name);
        });

        await userCreator.execute(input);

        expect(repository.existsByEmail).toHaveBeenCalledWith(input.email);
        expect(repository.save).toHaveBeenCalled();

        const savedUser: User = (repository.save as vi.Mock).mock.calls[0][0];
        expect(savedUser.getEmail()).toBe(input.email);
        expect(savedUser.getName()).toBe(input.name);
    });

    it('should throw if user with email already exists', async () => {
        (repository.existsByEmail as vi.Mock).mockResolvedValue(true);

        await expect(() => userCreator.execute(input)).rejects.toThrowError(
            `User with email ${input.email} already exists.`
        );

        expect(repository.existsByEmail).toHaveBeenCalledWith(input.email);
        expect(repository.save).not.toHaveBeenCalled();
        expect(publisher.publish).not.toHaveBeenCalled();
    });
});
