import { Spec } from 'koa-joi-router';

import { validateUserId } from '../../applications/user/user.validators.joi';
import { LottoService } from '../../applications/lotto/lotto.service';

const router: Spec = {
    method: 'get',
    path: '/',
    meta: {
        swagger: {
            summary: 'lotto 구매 정보를 user별로 조회한다.',
            description: '',
            tags: ['lotto'],
        },
    },
    validate: {
        query: {
            userId: validateUserId(),
        },
    },
    handler: async ctx => {
        const { userId } = ctx.query;
        const lottosByUserId = new LottoService().getLottosByUserId(userId);

        ctx.status = 200;
        ctx.body = lottosByUserId;
    },
};

export default router;
