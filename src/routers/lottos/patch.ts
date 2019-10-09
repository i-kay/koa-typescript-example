import { Spec, Joi } from 'koa-joi-router';
import { patchLotto } from '../../services/lotto';

const router: Spec = {
    method: 'patch',
    path: '/:_id',
    validate: {
        params: {
            _id: Joi.number().required(),
        },
        body: {
            drawNo: Joi.number(),
            numbers: Joi.array()
                .items(Joi.string())
                .length(6),
            bonus: Joi.string(),
        },
        type: 'json',
        output: {
            '200': { body: {} },
            '404': { body: {} },
        },
    },
    handler: async ctx => {
        const { _id } = ctx.params;
        const { drawNo, numbers, bonus } = ctx.request.body;

        const isPatched = patchLotto(_id, drawNo, numbers, bonus);
        ctx.status = isPatched ? 200 : 404;
        ctx.body = {};
    },
};

export default router;
