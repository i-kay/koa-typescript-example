import { Spec } from 'koa-joi-router';

import { UserService } from '../../applications/user/user.service';
import {
    validatePassword,
    validateEmail,
} from '../../applications/user/user.validators.joi';

const router: Spec = {
    method: 'post',
    path: '/',
    meta: {
        swagger: {
            summary: 'API 인증',
            description: 'API를 사용하기 위한 jwt를 발급',
            tags: ['auth'],
        },
    },
    validate: {
        body: {
            email: validateEmail(),
            password: validatePassword(),
        },
        type: 'json',
    },
    handler: async ctx => {
        const { email, password } = ctx.request.body;

        const authToken = await new UserService().issueAuthToken(
            email,
            password,
        );
        ctx.response.status = 201;
        ctx.response.body = {
            authToken,
        };
    },
};

export default router;
