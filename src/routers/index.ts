import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';

// resource 하나의 routes. method에 대한 관심은 여기서 두지 않게 한다.
import helloWorld from './lottos';
import auth from './auth';

const router = new Router();

router.use(auth.path, auth.router.routes());
router.use(jwt({ secret: 'privateKey' }));
router.use(helloWorld.path, helloWorld.router.routes());

export default router;
