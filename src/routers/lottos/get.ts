import { Spec } from 'koa-joi-router';

import { validateUserId } from '../../applications/user/user.validators.joi';
import { LottoService } from '../../applications/lotto/lotto.service';

const router: Spec = {
    method: 'get',
    path: '/',
    meta: {
        swagger: {
            summary:
                '저장된 lotto 구매 내역을 user별로, 같이 구매된 건 단위로 조회한다.',
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
        const lottosByUserId = await new LottoService().getLottosByUserId(
            userId,
        );

        ctx.status = 200;
        ctx.body = lottosByUserId;
    },
};

export default router;
