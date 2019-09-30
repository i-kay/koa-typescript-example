import * as Router from 'koa-router';
import { patchLotto } from '../../services/lotto';

const router = new Router();

export default router.patch('/:_id', async ctx => {
    const { _id } = ctx.params;
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
});
