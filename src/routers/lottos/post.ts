import * as Router from 'koa-router';
import { createLotto } from '../../services/lotto';

const router = new Router();

router.post('/', async ctx => {
    const { drawNo, numbers, bonus } = ctx.request.body;
    const _id = createLotto(Number(drawNo), numbers, bonus);
    if (_id) {
        ctx.response.status = 201;
        ctx.body = {
            result: 'OK',
            lotto: { _id, drawNo, numbers, bonus },
        };
    } else {
        ctx.response.status = 409;
        ctx.body = {
            result: 'ERROR',
            message: 'duplicated drawNo',
        };
    }
});

export default router;
