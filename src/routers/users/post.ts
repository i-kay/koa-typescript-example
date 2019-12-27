import { Spec } from 'koa-joi-router';

import { UserService } from '../../applications/user/user.service';
import {
    validateNickname,
    validatePassword,
} from '../../applications/user/user.validators.joi';

const router: Spec = {
    method: 'post',
    path: '/',
    meta: {
        swagger: {
            summary: 'User를 입력한다',
            description: '',
            tags: ['user'],
        },
    },
    validate: {
        body: {
            nickname: validateNickname(),
            password: validatePassword(),
        },
        type: 'json',
    },
    handler: [
        async ctx => {
            const { nickname, password } = ctx.request.body;
            const authToken = new UserService().createUser(nickname, password);
            ctx.response.status = 201;
            ctx.response.body = {
                authToken,
            };
        },
    ],
};

export default router;
