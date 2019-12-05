import { Spec, Joi } from 'koa-joi-router';
import { Lotto } from '../../models';
import { findLottosByDrawNo } from '../../services';
import { LottoJoi } from '../../models/Joi';

const router: Spec = {
    method: 'get',
    path: '/:drawNoList',
    meta: {
        swagger: {
            summary: '로또 데이터를 조회한다.',
            description: '',
            tags: ['lottos'],
        },
    },
    validate: {
        params: {
            drawNoList: Joi.array()
                .items(LottoJoi.drawNo)
                .required()
                .description('lotto를 조회할 모든 회차 번호 array'),
        },
    },
    async handler(ctx) {
        const { drawNoList } = ctx.params;
        const lottos: Lotto[] = findLottosByDrawNo(drawNoList);
        ctx.status = 200;
        ctx.body = lottos;
    },
};

export default router;
