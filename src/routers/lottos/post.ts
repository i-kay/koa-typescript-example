import { Spec, Joi } from 'koa-joi-router';
import { createLotto } from '../../services/lotto';
import { LottoJoi } from '../../models/Joi';

const router: Spec = {
    method: 'post',
    path: '/',
    meta: {
        swagger: {
            summary: '로또 데이터를 추가한다',
            description: '',
            tags: ['lottos'],
        },
    },
    validate: {
        body: {
            drawNo: LottoJoi.drawNo.required().description('로또 회차 번호'),
            numbers: LottoJoi.numbers.required().description('로또 6개의 번호'),
            bonus: LottoJoi.bonus.required().description('로또 보너스 번호'),
        },
        type: 'json',
        output: {
            '201': { body: {} },
            '409': {
                body: {
                    message: Joi.string(),
                },
            },
        },
    },
    handler: async ctx => {
        const { drawNo, numbers, bonus } = ctx.request.body;
        const _id = createLotto(Number(drawNo), numbers, bonus);
        if (_id) {
            ctx.response.status = 201;
            ctx.body = {};
        } else {
            ctx.response.status = 409;
            ctx.body = {
                message: 'duplicated drawNo',
            };
        }
    },
};

export default router;
