import { Spec } from 'koa-joi-router';

import { GameStatisticsService } from '../../applications/game-statistics/game-statistics.service';

const router: Spec = {
    method: 'get',
    path: '/even-numbers',
    meta: {
        swagger: {
            summary: '각 회차에서 짝수의 개수의 평균 조회',
            description: '',
            tags: ['game statistics'],
        },
    },
    validate: {},
    handler: async ctx => {
        const evenNumbersAverage = await new GameStatisticsService().getAverageOfEvenNumbers();
        ctx.status = 200;
        ctx.body = { evenNumbersAverage };
    },
};

export default router;
