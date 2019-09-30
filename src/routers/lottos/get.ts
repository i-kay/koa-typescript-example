import * as Router from 'koa-router';
import { Lotto } from '../../models';
import { findLottosByDrawNo } from '../../services';

const router = new Router();

router.get(
    ['/', '/:drawNo'],
    async (
        ctx: {
            params: { drawNo: string };
            query: { offset: string; limit: string };
            body: Lotto[];
        },
        next: () => void,
    ) => {
        const { drawNo } = ctx.params;
        const { offset, limit } = ctx.query;
        let _drawNo = [];
        let _offset: number;
        let _limit: number;
        if (drawNo) {
            _drawNo = drawNo.split(',').map(d => Number(d));
        }
        if (offset === undefined) {
            _offset = 0;
        } else {
            _offset = Number(offset);
        }
        if (limit === undefined) {
            _limit = 0;
        } else {
            _limit = Number(limit);
        }
        const lottos: Lotto[] = findLottosByDrawNo(_drawNo, _offset, _limit);
        ctx.body = lottos;
        next();
    },
);

export default router;
