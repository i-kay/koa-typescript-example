import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import { findUserById } from '../../services/user';

const router = new Router();

export default router.post('/', async ctx => {
    const token = jwt.sign({ foo: 'bar' }, 'privateKey');
    const { userId, passWd } = ctx.request.body;
    const user = findUserById(userId);
    if (!user) {
        ctx.response.status = 404;
        // 정형화된 response status, body 메시지 작업은 실제 API 구현시 필요하다.
        ctx.body = {
            success: false,
            msg: 'User not found',
        };
    } else {
        if (user.passWd !== passWd) {
            ctx.response.status = 403;
            ctx.body = {
                success: false,
                msg: 'passWd does not match',
            };
        } else {
            ctx.response.status = 201;
            ctx.body = {
                success: true,
                msg: token,
            };
        }
    }
});
