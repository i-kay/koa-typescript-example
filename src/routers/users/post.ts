import { Spec } from 'koa-joi-router';

import { UserService } from '../../applications/user/user.service';
import {
    validateEmail,
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
            email: validateEmail(),
            password: validatePassword(),
        },
        type: 'json',
    },
    handler: [
        async ctx => {
            const { email, password } = ctx.request.body;
            const authToken = await new UserService().createUser(
                email,
                password,
            );
            ctx.response.status = 201;
            ctx.response.body = {
                authToken,
            };
        },
    ],
};

export default router;
