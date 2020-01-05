import { conflict, notFound, forbidden } from '@hapi/boom';

import { Datetime } from '../../domains/common-types/datetime.type';
import { User } from '../../domains/user/user.model';
import { UserId, UserPassword } from '../../domains/user/user.types';
import { UserRepository } from '../../infrastructures/user/user.repository';

import { issueToken, AuthToken } from '../../libs/auth-handler';
import { encode } from '../../libs/crypto-handler';
import { now } from '../../libs/datetime-handler';
import { getConn } from '../../libs/mysql-client';

export class UserService {
    async getUserById(
        userId: UserId,
    ): Promise<{
        id: UserId;
        email: string;
        password: UserPassword;
        createdAt: Datetime;
        loginAt: Datetime;
        deletedAt: Datetime;
    }> {
        const dbConn = await getConn();
        const user: User = await new UserRepository(dbConn).findById(userId);
        dbConn.end();
        this.checkUserExists(user);

        return {
            id: user.id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            loginAt: user.loginAt,
            deletedAt: user.deletedAt,
        };
    }

    async createUser(
        email: string,
        password: UserPassword,
    ): Promise<AuthToken> {
        await this.checkSavingUserPossible(email);

        const user = new User({
            email,
            password: encode(password),
            createdAt: now(),
            loginAt: now(),
        });
        const dbConn = await getConn();
        const id = await new UserRepository(dbConn).saveOne(user);
        dbConn.end();
        // id를 얻어와서 새로운 user 객체를 만든다.
        const newUser: User = new User({
            id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            loginAt: user.loginAt,
        });
        return issueToken(newUser);
    }

    async issueAuthToken(
        email: string,
        password: UserPassword,
    ): Promise<AuthToken> {
        const dbConn = await getConn();
        const user = await new UserRepository(dbConn).findByEmail(email);
        dbConn.end();
        this.checkUserExists(user);
        this.checkPasswordCorrect(user, password);
        return issueToken(user);
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

    private async checkSavingUserPossible(email: string): Promise<void> {
        const dbConn = await getConn();
        const user = await new UserRepository(dbConn).findByEmail(email);
        dbConn.end();
        if (user) {
            // 에러 메시지 추가해야 함
            throw conflict();
        }
    }
}
