import * as koaJoirouter from 'koa-joi-router';
import * as koaJwt from 'koa-jwt';

import apiDocs from './api-docs';

import auth from './auth';
import gameStatistics from './game-statistics';
import games from './games';
import users from './users';
import lottos from './lottos';

const router = koaJoirouter();

// apiDocs를 수정해야 할 수도 있다. 지금 방식이 맘에 안 들지만 좋은 대안이 없다.
router.use(apiDocs.middleware());

// router가 route되는 로직과 각 method의 관심을 분리한다.
router.use(auth.middleware());
router.use(koaJwt({ secret: 'privateKey' }));
router.use(gameStatistics.middleware());
router.use(games.middleware());
router.use(users.middleware());
router.use(lottos.middleware());

export default router;
