import { Spec } from 'koa-joi-router';
import { patchLotto } from '../../services/lotto';

const router: Spec = {
    method: 'patch',
    path: '/:_id',
    handler: async ctx => {
        const { _id } = ctx.params;
        console.log('_id', _id);
        const { drawNo, numbers, bonus } = ctx.request.body;
        let _drawNo: number;

        if (drawNo) {
            _drawNo = Number(drawNo);
        }

        patchLotto(Number(_id), _drawNo, numbers, bonus);
        ctx.body = {
            _id,
            result: 'OK',
        };
    },
};

export default router;
