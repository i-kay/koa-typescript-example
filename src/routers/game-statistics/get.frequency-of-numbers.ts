import { Spec } from 'koa-joi-router';

import { GameStatisticsService } from '../../applications/game-statistics/game-statistics.service';

const router: Spec = {
    method: 'get',
    path: '/frequency-of-numbers',
    meta: {
        swagger: {
            summary: '각 번호의 출현 빈도를 조회',
            description: '',
            tags: ['game statistics'],
        },
    },
    validate: {},
    handler: async ctx => {
        const frequencyOfNumbers = await new GameStatisticsService().getFrequencyOfNumbers();
        ctx.status = 200;
        ctx.body = { frequencyOfNumbers };
    },
};

export default router;
