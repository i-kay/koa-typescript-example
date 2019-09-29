import * as Router from 'koa-router';

// import 할 때 method 이름으로 변경
import get from './get';
import post from './post';

const router = new Router();

// 현재 작업 중인 router의 path.
const path = '/lottos';

router.use(get.routes());
router.use(post.routes());

export default { router, path };
