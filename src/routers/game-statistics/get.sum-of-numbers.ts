import { Spec } from 'koa-joi-router';

import { GameStatisticsService } from '../../applications/game-statistics/game-statistics.service';

const router: Spec = {
    method: 'get',
    path: '/sum-of-numbers',
    meta: {
        swagger: {
            summary: '당첨된 로또 게임 통계를 조회.',
            description: '',
            tags: ['game statistics'],
        },
    },
    validate: {},
    handler: async ctx => {
        const sum = await new GameStatisticsService().getSumOfNumbers();
        ctx.status = 200;
        ctx.body = { sum };
    },
};

export default router;
