import * as router from 'koa-joi-router';

import post from './post';

const auth = router();

auth.prefix('/auth');
auth.route([post]);

export default auth;
