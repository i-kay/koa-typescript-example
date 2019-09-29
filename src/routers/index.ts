import * as Router from 'koa-router';

// resource 하나의 routes. method에 대한 관심은 여기서 두지 않게 한다.
import helloWorld from './hello-world';

const router = new Router();
router.use(helloWorld.path, helloWorld.router.routes());

export default router;
