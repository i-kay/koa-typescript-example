import { Spec } from 'koa-joi-router';

import { UserService } from '../../applications/user/user.service';
import { validateUserId } from '../../applications/user/user.validators.joi';

const router: Spec = {
    method: 'get',
    path: '/:userId',
    meta: {
        swagger: {
            summary: 'User 정보를 조회한다.',
            description: '',
            tags: ['user'],
        },
    },
    validate: {
        params: {
            userId: validateUserId(),
        },
    },
    handler: async ctx => {
        const { userId } = ctx.params;
        const user = new UserService().getUserByUserId(userId);
        ctx.status = 200;
        ctx.body = user;
    },
};

export default router;
