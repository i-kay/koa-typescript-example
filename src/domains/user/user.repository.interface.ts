import { User } from './user.model';
import { UserId } from './user.types';

export interface UserRepository {
    findById(userId: UserId): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveOne(user: User): Promise<UserId>;
}
