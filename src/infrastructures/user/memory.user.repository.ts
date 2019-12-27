import { find } from 'lodash';

import { User } from '../../domains/user/user.model';
import { UserRepository } from '../../domains/user/user.repository.interface';
import { UserId } from '../../domains/user/user.types';

import * as users from '../../../data/users.json';

const usersData = [...users];
let userId = usersData[usersData.length - 1].userId;

export class MemoryUserRepository implements UserRepository {
    findOneByUserId(userId: UserId): User {
        const user = find(usersData, user => user.userId === userId);
        if (!user) {
            return null;
        }
        const userEntity = new User({
            userId: user.userId,
            nickname: user.nickname,
            password: user.passWd,
        });
        return userEntity;
    }

    findOneByNickname(nickname: string): User {
        const user = find(usersData, user => user.nickname === nickname);
        if (!user) {
            return null;
        }
        const userEntity = new User({
            userId: user.userId,
            nickname: user.nickname,
            password: user.passWd,
        });
        return userEntity;
    }

    saveOne(user: User): void {
        const newUser = {
            userId: user.getUserId(),
            nickname: user.getNickname(),
            passWd: user.getPassword(),
            authority: 'normal',
        };
        usersData.push(newUser);
    }

    nextUserId(): UserId {
        return ++userId;
    }
}
