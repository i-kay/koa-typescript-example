import * as Router from 'koa-router';

// import 할 때 method 이름으로 변경
import get from './get';

const router = new Router();

// 현재 작업 중인 router의 path.
const path = '/hello-world';

router.use(get.routes());

export default { router, path };
