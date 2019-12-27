import { conflict, notFound, forbidden } from '@hapi/boom';

import { User } from '../../domains/user/user.model';
import { UserId, UserPassword } from '../../domains/user/user.types';
import { UserRepository } from '../../domains/user/user.repository.interface';
import { MemoryUserRepository } from '../../infrastructures/user/memory.user.repository';

import { issueToken, AuthToken } from '../../libs/auth-handler';

export class UserService {
    userRepository: UserRepository = new MemoryUserRepository();

    getUserByUserId(
        userId: UserId,
    ): {
        userId: UserId;
        nickname: string;
        password: UserPassword;
    } {
        const user: User = this.userRepository.findOneByUserId(userId);
        this.checkUserExists(user);
        return {
            userId: user.getUserId(),
            nickname: user.getNickname(),
            password: user.getPassword(),
        };
    }

    /**
     * 유저를 생성한다. 생성후 Token을 반환한다.
     *
     * @param nickname 생성할 유저의 nickname
     * @param password 생성할 유저의 password
     */
    createUser(nickname: string, password: UserPassword): AuthToken {
        this.checkSavingUserPossible(nickname);
        const userId = this.userRepository.nextUserId();
        const newUser = new User({ userId, nickname, password });
        this.userRepository.saveOne(newUser);
        return issueToken(userId);
    }

    issueAuthToken(nickname: string, password: UserPassword): AuthToken {
        const user: User = this.userRepository.findOneByNickname(nickname);
        this.checkUserExists(user);
        this.checkPasswordCorrect(user, password);
        return issueToken(user.getUserId());
    }

    private checkPasswordCorrect(user: User, password: UserPassword): void {
        if (!user.isPasswordMatched(password)) {
            // 에러 메시지 정의 해야함
            throw forbidden();
        }
    }

    private checkUserExists(user: User): void {
        if (!user) {
            // 에러 메시지 정의 해야함
            throw notFound();
        }
    }

    private checkSavingUserPossible(nickname: string): void {
        if (!!this.userRepository.findOneByNickname(nickname)) {
            // 에러 메시지 추가해야 함
            throw conflict();
        }
    }
}
