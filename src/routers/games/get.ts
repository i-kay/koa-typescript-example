import { Spec } from 'koa-joi-router';

import { validateGameIdList } from '../../applications/game/game.validators.joi';
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
            gameId: validateGameIdList(),
        },
    },
    handler: async ctx => {
        const { gameId } = ctx.params;
        const games: Game[] = await new GameService().getGameByGameId(gameId);
        ctx.status = 200;
        ctx.body = games.map((game: Game) => {
            return {
                id: game.id,
                state: game.state,
                numbers: game.numbers,
                createdAt: game.createdAt,
            };
        });
    },
};

export default router;
