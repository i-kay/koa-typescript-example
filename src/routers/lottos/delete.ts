import * as Router from 'koa-router';
import { deleteLotto } from '../../services/lotto';
const router = new Router();

router.delete('/:_id', async ctx => {
    const { _id } = ctx.params;
    deleteLotto(Number(_id));
    ctx.body = { _id };
});

export default router;
