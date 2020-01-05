import { Spec } from 'koa-joi-router';

import { LottoService } from '../../applications/lotto/lotto.service';
import { validateUserId } from '../../applications/user/user.validators.joi';
import { validateGameId } from '../../applications/game/game.validators.joi';
import {
    validatePurchaseId,
    validateLottoNumbersList,
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
            LottoNumbersList: validateLottoNumbersList(),
        },
        type: 'json',
    },
    handler: [
        async ctx => {
            const {
                purchaseId,
                gameId,
                userId,
                LottoNumbersList,
            } = ctx.request.body;

            await new LottoService().createLotto(
                purchaseId,
                userId,
                gameId,
                LottoNumbersList,
            );

            ctx.status = 201;
            ctx.body = {};
        },
    ],
};

export default router;
