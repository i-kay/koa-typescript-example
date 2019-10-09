import * as koaJoirouter from 'koa-joi-router';
import * as koaJwt from 'koa-jwt';

import auth from './auth';
import lottos from './lottos';

const router = koaJoirouter();

// router가 route되는 로직과 각 method의 관심을 분리한다.
router.use(auth.middleware());
router.use(koaJwt({ secret: 'privateKey' }));
router.use(lottos.middleware());

export default router;
