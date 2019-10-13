import { Spec, Joi } from 'koa-joi-router';
import { patchLotto } from '../../services/lotto';
import { LottoJoi } from '../../models/Joi';

const router: Spec = {
    method: 'patch',
    path: '/:_id',
    meta: {
        swagger: {
            summary: '로또 데이터를 수정한다.',
            description: '',
            tags: ['lottos'],
        },
    },
    validate: {
        params: {
            _id: LottoJoi._id.required().description('수정할 data의 _id'),
        },
        body: {
            drawNo: Joi.number().description('로또 회차 번호'),
            numbers: Joi.array()
                .items(Joi.string())
                .length(6)
                .description('로또 6개 번호'),
            bonus: Joi.string().description('로또 보너스 번호'),
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
