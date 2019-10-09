import { Spec } from 'koa-joi-router';
import { deleteLotto } from '../../services/lotto';

const router: Spec = {
    method: 'delete',
    path: '/:_id',
    handler: async ctx => {
        const { _id } = ctx.params;
        deleteLotto(Number(_id));
        ctx.body = { _id };
    },
};

export default router;
