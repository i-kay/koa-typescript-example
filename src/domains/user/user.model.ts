import { UserId, UserPassword } from './user.types';
import { Datetime } from '../common-types/datetime.type';
import { encode } from '../../libs/crypto-handler';
interface Cntr {
    id?: UserId;
    email: string;
    password: UserPassword;
    createdAt?: Datetime;
    loginAt?: Datetime;
    deletedAt?: Datetime;
}

export class User {
    readonly id: UserId;
    readonly email: string;
    readonly password: UserPassword;
    readonly createdAt: Datetime;
    readonly loginAt: Datetime;
    readonly deletedAt: Datetime;

    constructor(user: Cntr) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdAt;
        this.loginAt = user.loginAt;
        this.deletedAt = user.deletedAt;
    }

    isPasswordMatched(password: UserPassword): boolean {
        return encode(password) === this.password;
    }
}
