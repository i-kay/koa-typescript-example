import * as Router from 'koa-router';

// import 할 때 method 이름으로 변경
import get from './get';
import post from './post';
import del from './delete';
import patch from './patch';

const router = new Router();

// 현재 작업 중인 router의 path.
const path = '/lottos';

router.use(get.routes(), post.routes(), del.routes(), patch.routes());

export default { router, path };
