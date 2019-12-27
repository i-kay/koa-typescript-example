import { Spec } from 'koa-joi-router';

import { GameService } from '../../applications/game/game.service';
import {
    validateLottoNumbers,
    validateLottoNumber,
    validateGameId,
} from '../../applications/game/game.validators.joi';

const router: Spec = {
    method: 'put',
    path: '/:gameId/pull',
    meta: {
        swagger: {
            summary: '로또 게임 추첨 후 번호를 입력한다',
            description: '',
            tags: ['game'],
        },
    },
    validate: {
        params: {
            gameId: validateGameId(),
        },
        body: {
            numbers: validateLottoNumbers(),
            bonus: validateLottoNumber(),
        },
        type: 'json',
    },
    handler: async ctx => {
        const { gameId } = ctx.params;
        const { numbers, bonus } = ctx.request.body;

        new GameService().pullGame(gameId, numbers, bonus);

        ctx.response.status = 200;
        ctx.response.body = {};
    },
};

export default router;
