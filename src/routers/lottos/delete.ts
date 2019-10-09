import { Spec } from 'koa-joi-router';
import { deleteLotto } from '../../services/lotto';
import { LottoJoi } from '../../models/Joi';

const router: Spec = {
    method: 'delete',
    path: '/:_id',
    validate: {
        params: {
            _id: LottoJoi._id.required(),
        },
        output: {
            '200': { body: {} },
            '404': { body: {} }, // 자원이 없을 때
        },
    },
    handler: async ctx => {
        const { _id } = ctx.params;
        const isDeleted = deleteLotto(_id);
        ctx.status = isDeleted ? 200 : 404;
        ctx.body = {};
    },
};

export default router;
