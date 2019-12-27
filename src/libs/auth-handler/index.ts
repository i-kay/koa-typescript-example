import * as jwt from 'jsonwebtoken';

import { UserId } from '../../domains/user/user.types';

export type AuthToken = string;

export const issueToken = (userId: UserId): AuthToken => {
    return jwt.sign({ userId }, 'privateKey');
};
