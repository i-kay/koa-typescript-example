import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx: { body: { msg: string } }, next: () => void) => {
    ctx.body = { msg: 'Hello koa!' };
    next();
});

export default router;
