import { Spec } from 'koa-joi-router';

import { LottoService } from '../../applications/lotto/lotto.service';
import { Datetime } from '../../applications/common/common.validators.joi';
import { validateUserId } from '../../applications/user/user.validators.joi';
import {
    validateGameId,
    validateLottoNumbers,
} from '../../applications/game/game.validators.joi';

const router: Spec = {
    method: 'post',
    path: '/',
    meta: {
        swagger: {
            summary: '구매한 lotto를 등록한다',
            description: '',
            tags: ['lotto'],
        },
    },
    validate: {
        body: {
            userId: validateUserId(),
            gameId: validateGameId(),
            numbers: validateLottoNumbers(),
        },
        type: 'json',
    },
    handler: [
        async ctx => {
            const { userId, gameId, numbers } = ctx.request.body;

            new LottoService().createLotto(userId, gameId, numbers);

            ctx.status = 201;
            ctx.body = {};
        },
    ],
};

export default router;
