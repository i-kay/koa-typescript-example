import * as jwt from 'jsonwebtoken';

import { User } from '../../domains/user/user.model';

// 키를 다른 곳에서 import 해야 함
const secret = 'mySecret';

export type AuthToken = string;

export const issueToken = (user: User): AuthToken => {
    return jwt.sign({ userId: user.id }, secret);
};
