import * as users from '../../../data/users.json';
import { User } from '../../models';

const fecthedUsers = [...users];

export const findUserById = (userId: string): User =>
    fecthedUsers.find(user => user.userId === userId);
