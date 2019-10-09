import { Spec, Joi } from 'koa-joi-router';
import { Lotto } from '../../models';
import { findLottosByDrawNo } from '../../services';

const router: Spec = {
    method: 'get',
    path: '/:drawNoList',
    validate: {
        params: {
            drawNoList: Joi.array()
                .items(Joi.number())
                .required(),
        },
    },
    handler: [
        async ctx => {
            const { drawNoList } = ctx.params;
            const lottos: Lotto[] = findLottosByDrawNo(drawNoList);
            ctx.status = 200;
            ctx.body = lottos;
        },
    ],
};

export default router;
