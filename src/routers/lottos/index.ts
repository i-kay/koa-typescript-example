import * as router from 'koa-joi-router';

// import 할 때 method 이름으로 규칙을 둔다.
import get from './get';
import post from './post';
import del from './delete';
import patch from './patch';

import { workSomething } from '../../middlewares/lottos-handler';

const lottos = router();

// 이 router의 prefix path.
lottos.prefix('/lottos');

// 이 router에만 따로 middleware를 둘 수 있다.
lottos.use(workSomething);
lottos.route([get, post, del, patch]);

export default lottos;
