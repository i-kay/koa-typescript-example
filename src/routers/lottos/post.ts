import { Spec } from 'koa-joi-router';

import { LottoService } from '../../applications/lotto/lotto.service';
import { validateUserId } from '../../applications/user/user.validators.joi';
import { validateGameId } from '../../applications/game/game.validators.joi';
import {
    validatePurchaseId,
    validateLottoNumbers,
} from '../../applications/lotto/lotto.validators.joi';

type LottoNumbers = Array<[Array<number>]>;

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
            purchaseId: validatePurchaseId(),
            userId: validateUserId(),
            gameId: validateGameId(),
            LottoNumbers: validateLottoNumbers(),
        },
        type: 'json',
    },
    handler: [
        async ctx => {
            const {
                purchaseId,
                gameId,
                userId,
                LottoNumbers,
            } = ctx.request.body;

            // TODO: implements
            // await new LottoService().createLotto(userId, gameId, numbers);

            ctx.status = 201;
            ctx.body = {};
        },
    ],
};

export default router;
