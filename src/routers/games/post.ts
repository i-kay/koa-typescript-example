import { Spec } from 'koa-joi-router';

import { GameService } from '../../applications/game/game.service';
import { validateGameId } from '../../applications/game/game.validators.joi';

const router: Spec = {
    method: 'post',
    path: '/',
    meta: {
        swagger: {
            summary: '로또 게임을 하나 추가한다',
            description: '',
            tags: ['game'],
        },
    },
    validate: {
        body: {
            gameId: validateGameId(),
        },
        type: 'json',
    },
    handler: async ctx => {
        const { gameId } = ctx.request.body;
        await new GameService().createGame(gameId);
        ctx.response.status = 201;
        ctx.body = {};
    },
};

export default router;
