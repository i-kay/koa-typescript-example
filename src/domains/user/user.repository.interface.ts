import { User } from './user.model';
import { UserId } from './user.types';

export interface UserRepository {
    findOneByUserId(userId: UserId): User;
    findOneByNickname(nickname: string): User;
    saveOne(user: User): void;
    nextUserId(): UserId;
}
