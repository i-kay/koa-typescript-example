import { Spec } from 'koa-joi-router';

import { validateGameId } from '../../applications/game/game.validators.joi';
import { GameService } from '../../applications/game/game.service';
import { Game } from '../../domains/game/game.model';

const router: Spec = {
    method: 'get',
    path: '/:gameId',
    meta: {
        swagger: {
            summary: '로또 게임을 하나 조회한다.',
            description: '',
            tags: ['game'],
        },
    },
    validate: {
        params: {
            gameId: validateGameId(),
        },
    },
    handler: async ctx => {
        const { gameId } = ctx.params;
        const game: Game = new GameService().getGameByGameId(gameId);
        ctx.status = 200;
        ctx.body = {
            gameId: game.getGameId(),
            gameState: game.getGameState(),
            numbers: game.getnumbers(),
            bonus: game.getbonus(),
        };
    },
};

export default router;
