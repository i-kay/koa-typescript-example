import { UserId, UserPassword } from './user.types';

interface Cntr {
    userId: UserId;
    nickname: string;
    password: UserPassword;
}

export class User {
    private userId: UserId;
    private nickname: string;
    private password: UserPassword;

    constructor(user: Cntr) {
        this.userId = user.userId;
        this.nickname = user.nickname;
        this.password = user.password;
    }

    isPasswordMatched(password: UserPassword): boolean {
        return this.encodePassword(password) === this.password;
    }

    private encodePassword(password: UserPassword): string {
        // hash등의 필요한 작업
        return password;
    }

    getUserId(): UserId {
        return this.userId;
    }
    getNickname(): string {
        return this.nickname;
    }
    getPassword(): UserPassword {
        return this.password;
    }
}
