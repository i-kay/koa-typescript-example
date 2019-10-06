import * as Router from 'koa-router';
import post from './post';

const router = new Router();

const path = '/auth';

router.use(post.routes());

export default { router, path };
